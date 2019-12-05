import { Component, OnInit } from '@angular/core';
import { ItemCoin } from 'src/app/model/item-coin';

@Component({
  selector: 'app-list-coins',
  templateUrl: './list-coins.component.html',
  styleUrls: ['./list-coins.component.sass']
})
export class ListCoinsComponent implements OnInit {

  displayCoins: ItemCoin[];

  constructor() { }

  ngOnInit() {
    this.displayCoins = [
      {
        name: 'AsiaCoin',
        price: 14,
        isCryptocurrency: true
      },
      {
        name: '808Coin',
        price: 14,
        isCryptocurrency: true
      },
      {
        name: 'USD',
        price: 14,
        isCryptocurrency: false
      }
    ];
  }

}
