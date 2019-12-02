import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ListCoinsComponent } from './components/list-coins/list-coins.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'exchange',
    pathMatch: 'full',
  },
  {
    path: 'exchange',
    component: ExchangeComponent
  },
  {
    path: 'list',
    component: ListCoinsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
