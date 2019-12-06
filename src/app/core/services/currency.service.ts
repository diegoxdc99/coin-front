import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiURL: string;
  private httpOptions;

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiURL = environment.braveNewCoin.url;
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': environment.braveNewCoin.key
      })
    };
  }

  getDigital(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/digital-currency-symbols`, this.httpOptions);
  }

  getFiat(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/fiat-currency-symbols`, this.httpOptions);
  }

  convertCoin(fromQuantity: number, from: string, to: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/convert?qty=${fromQuantity}&from=${from}&to=${to}`, this.httpOptions);
  }

  GetCoins(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/prices?coin=btc`, this.httpOptions);
  }
}
