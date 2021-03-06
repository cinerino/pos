import { Injectable } from '@angular/core';
import { AdmissionService } from './action/admission.service';
import { CustomerService } from './action/customer.service';
import { OrderService } from './action/order.service';
import { ActionProductService } from './action/product.service';
import { PurchaseService } from './action/purchase.service';
import { ReservationService } from './action/reservation.service';
import { ActionStoreService } from './action/store.service';
import { UserService } from './action/user.service';

@Injectable({
    providedIn: 'root',
})
export class ActionService {
    constructor(
        public admission: AdmissionService,
        public order: OrderService,
        public purchase: PurchaseService,
        public reservation: ReservationService,
        public user: UserService,
        public customer: CustomerService,
        public product: ActionProductService,
        public store: ActionStoreService
    ) {}
}
