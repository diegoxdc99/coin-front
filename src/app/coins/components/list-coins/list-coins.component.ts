import { Component, OnInit } from '@angular/core';
import { ItemCoin } from 'src/app/model/item-coin';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/core/services/currency.service';

@Component({
  selector: 'app-list-coins',
  templateUrl: './list-coins.component.html',
  styleUrls: ['./list-coins.component.sass']
})
export class ListCoinsComponent implements OnInit {

  displayCoins: ItemCoin[];
  coins: ItemCoin[];

  constructor(
    private router: Router,
    private currecyService: CurrencyService
  ) { }

  ngOnInit() {
    this.getCoins();
  }

  getCoins() {
    return this.currecyService.GetCoins().subscribe((data) => {
      if (data.success) {
        const coins = data.prices.map(({ id_currency, name, price, crypto }) => ({ id: id_currency, name, price, crypto: crypto === '1' }));
        this.coins = coins;
        this.displayCoins = coins.slice(0, 20);
      }
    });
  }


  redirectChange(coin) {
    this.router.navigateByUrl('/coin/exchange', { state: { data: coin.id } });
  }

}
