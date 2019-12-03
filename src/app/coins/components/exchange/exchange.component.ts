import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrencyInput } from '../../../model/CurrencyInput';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  toQuantity: number;

  validationMessages = {
    fromQuantity: [
      { type: 'required', message: 'La cantidad a convertir es requerida.' },
      { type: 'min', message: 'La cantidad a convertir debe ser mayor a 0' }
    ],
    from: [
      { type: 'required', message: 'La criptomoneda/moneda es requerida'},
    ],
    to: [
      { type: 'required', message: 'La criptomoneda/moneda es requerida'},
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.toQuantity = null;
    this.buildForm();
  }

  ngOnInit() {
    this.getInputValues();
  }

  buildForm() {
    this.exchangeForm = this.formBuilder.group({
      fromQuantity: [null, [Validators.required, Validators.min(1)]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]]
    });
  }

  getInputValues() {
    this.fiat$ = this.currencyService.getFiat()
      .pipe(map(fiatResponse => {
        const input = fiatResponse.fiat_currencies.map(mapKeyValue);
        return input;
      }));
    this.digital$ = this.currencyService.getDigital()
      .pipe(map(digitalResponse => {
        const input = digitalResponse.digital_currencies.map(mapKeyValue);
        return input;
      }));
  }

  submit() {
    if (this.exchangeForm.valid) {
      this.currencyService.convertCoin(
        this.exchangeForm.value.fromQuantity,
        this.exchangeForm.value.from,
        this.exchangeForm.value.to
      ).subscribe(response => {
        this.toQuantity = response.to_quantity;
      });
    }
  }

  change() {
    const from = this.exchangeForm.value.from;
    const to = this.exchangeForm.value.to;

    this.exchangeForm.controls.from.patchValue(to);
    this.exchangeForm.controls.to.patchValue(from);
  }
}
