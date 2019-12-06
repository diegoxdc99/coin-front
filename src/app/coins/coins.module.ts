import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinsRoutingModule } from './coins-routing.module';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ListCoinsComponent } from './components/list-coins/list-coins.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ExchangeComponent, ListCoinsComponent],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class CoinsModule { }
