import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrencyInput } from '../../../model/CurrencyInput';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

const mapKeyValue: any = item => {
  const info = Object.entries(item)[0];
  return { key: info[0], value: info[1] };
};

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.sass']
})
export class ExchangeComponent implements OnInit {
  exchangeForm: FormGroup;
  currencies: Array<CurrencyInput>;
  fiat$: Observable<any>;
  digital$: Observable<any>;
  messageError = '';

  toQuantity: number;

  validationMessages: any;
  canNotExchange: string;
  canNotLoadCurrencies: string;

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService,
    private translateService: TranslateService
  ) {
    this.toQuantity = null;
    this.buildForm();
  }

  ngOnInit() {
    this.getInputValues();
    this.setInitialValues();
    this.loadLabelsErrors();
  }

  loadLabelsErrors() {
    this.translateService.get([
      'errors.exchange.quantityRequired',
      'errors.exchange.quantityNegative',
      'errors.exchange.fromRequired',
      'errors.exchange.toRequired',
      'errors.exchange.canNotExchange',
      'errors.exchange.canNotLoadCurrencies'
    ]).subscribe(data => {
      this.canNotExchange = data['errors.exchange.canNotExchange'];
      this.canNotLoadCurrencies = data['errors.exchange.canNotLoadCurrencies'];
      this.validationMessages =  {
        fromQuantity: [
          { type: 'required', message: data['errors.exchange.fromRequired'] },
          { type: 'min', message: data['errors.exchange.quantityNegative'] }
        ],
        from: [
          { type: 'required', message: data['errors.exchange.fromRequired'] }
        ],
        to: [{ type: 'required', message: data['errors.exchange.toRequired'] }]
      };
    });
  }

  setInitialValues() {
    this.exchangeForm.controls.to.patchValue('USD');
    window.history.state.data ?
      this.exchangeForm.controls.from.patchValue(window.history.state.data) :
      this.exchangeForm.controls.from.patchValue('BTC');
  }

  buildForm() {
    this.exchangeForm = this.formBuilder.group({
      fromQuantity: [null, [Validators.required, Validators.min(1)]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]]
    });
  }

  getInputValues() {
    this.clearError();
    this.fiat$ = this.currencyService.getFiat().pipe(
      map(fiatResponse => {
        const input = fiatResponse.fiat_currencies.map(mapKeyValue);
        return input;
      }),
      catchError(_ => {
        this.messageError = this.canNotLoadCurrencies;
        this.exchangeForm.controls.from.patchValue(null);
        this.exchangeForm.controls.to.patchValue(null);
        return throwError(this.canNotLoadCurrencies);
      })
    );
    this.digital$ = this.currencyService.getDigital().pipe(
      map(digitalResponse => {
        const input = digitalResponse.digital_currencies.map(mapKeyValue);
        return input;
      })
    );
  }

  submit() {
    this.clearError();
    if (this.exchangeForm.valid) {
      this.currencyService
        .convertCoin(
          this.exchangeForm.value.fromQuantity,
          this.exchangeForm.value.from,
          this.exchangeForm.value.to
        )
        .subscribe(response => {
          this.toQuantity = response.to_quantity;
        }, (error) => this.showError(this.canNotExchange));
    }
  }

  change() {
    const from = this.exchangeForm.value.from;
    const to = this.exchangeForm.value.to;

    this.exchangeForm.controls.from.patchValue(to);
    this.exchangeForm.controls.to.patchValue(from);

    this.submit();
  }

  showError(error: string) {
    this.messageError = error;
    console.log(error);
  }

  clearError() {
    this.messageError = '';
  }
}
