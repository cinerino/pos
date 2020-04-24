import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, PurchaseTransactionGuardService, SettingGuardService, ViewTypeGuardService } from '../../canActivates';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { PurchaseCinemaCartComponent } from './components/pages/cinema/purchase-cinema-cart/purchase-cinema-cart.component';
import { PurchaseCinemaScheduleComponent } from './components/pages/cinema/purchase-cinema-schedule/purchase-cinema-schedule.component';
import { PurchaseCinemaSeatComponent } from './components/pages/cinema/purchase-cinema-seat/purchase-cinema-seat.component';
import { PurchaseCinemaTicketComponent } from './components/pages/cinema/purchase-cinema-ticket/purchase-cinema-ticket.component';
import { PurchaseEventScheduleComponent } from './components/pages/event/purchase-event-schedule/purchase-event-schedule.component';
import { PurchaseEventTicketComponent } from './components/pages/event/purchase-event-ticket/purchase-event-ticket.component';
import { PurchaseBaseComponent } from './components/pages/purchase-base/purchase-base.component';
import { PurchaseCompleteComponent } from './components/pages/purchase-complete/purchase-complete.component';
import { PurchaseConfirmComponent } from './components/pages/purchase-confirm/purchase-confirm.component';
import { PurchasePaymentComponent } from './components/pages/purchase-payment/purchase-payment.component';
import { PurchaseRootComponent } from './components/pages/purchase-root/purchase-root.component';


const routes: Routes = [
  {
    path: '',
    component: PurchaseBaseComponent,
    canActivate: [AuthGuardService, SettingGuardService],
    children: [
      { path: 'root', component: PurchaseRootComponent },
      {
        path: 'cinema',
        canActivate: [ViewTypeGuardService],
        children: [
          { path: 'seat', component: PurchaseCinemaSeatComponent },
          { path: 'ticket', component: PurchaseCinemaTicketComponent },
          { path: 'cart', component: PurchaseCinemaCartComponent }
        ]
      },
      {
        path: 'event',
        canActivate: [ViewTypeGuardService],
        children: [
          { path: 'ticket', component: PurchaseEventTicketComponent }
        ]
      },
      { path: 'payment', canActivate: [PurchaseTransactionGuardService], component: PurchasePaymentComponent },
      { path: 'confirm', canActivate: [PurchaseTransactionGuardService], component: PurchaseConfirmComponent },
      { path: 'complete', component: PurchaseCompleteComponent }
    ]
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuardService, SettingGuardService],
    children: [
      {
        path: 'cinema',
        canActivate: [ViewTypeGuardService],
        children: [
          { path: 'schedule', component: PurchaseCinemaScheduleComponent }
        ]
      },
      {
        path: 'event',
        canActivate: [ViewTypeGuardService],
        children: [
          { path: 'schedule', component: PurchaseEventScheduleComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
