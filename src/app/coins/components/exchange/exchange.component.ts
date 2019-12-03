import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrencyInput } from '../../../model/CurrencyInput';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.sass']
})
export class ExchangeComponent implements OnInit {
  exchangeForm: FormGroup;
  currencies: Array<CurrencyInput>;

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
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.currencies = [
      {
        label: 'peso colombiano',
        value: 'COP'
      },
      {
        label: 'bitcoin',
        value: 'BTC'
      }
    ];
    this.toQuantity = 5000;
  }

  buildForm() {
    this.exchangeForm = this.formBuilder.group({
      fromQuantity: [null, [Validators.required, Validators.min(1)]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.exchangeForm.valid) {
      alert('valido');
    }
  }

}
