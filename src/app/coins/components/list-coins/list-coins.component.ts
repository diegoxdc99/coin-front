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

  displayCoins: ItemCoin[] = [];
  coins: ItemCoin[];
  page = 0;
  size = 20;
  mapCoins = ({ id_currency, name, price, crypto }) => ({ id: id_currency, name, price, isCryptocurrency: crypto === '1' });

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
        const coins = data.prices.map(this.mapCoins);
        this.coins = coins;
        this.addPage();
      }
    });
  }


  redirectChange(coin) {
    this.router.navigateByUrl('/coin/exchange', { state: { data: coin.id } });
  }

  onScroll() {
    this.addPage();
  }

  addPage() {
    this.displayCoins = this.displayCoins.concat(this.coins.slice(this.page * this.size, (this.page + 1) * this.size));
    this.page++;
  }


}
