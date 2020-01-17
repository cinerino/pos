import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { ViewType } from '../../../../../models';
import { PurchaseService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-root',
    templateUrl: './purchase-root.component.html',
    styleUrls: ['./purchase-root.component.scss']
})
export class PurchaseRootComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private purchaseService: PurchaseService,
        private router: Router
    ) { }

    public async ngOnInit() {
        this.user = this.store.pipe(select(reducers.getUser));
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        try {
            const purchase = await this.purchaseService.getData();
            if (purchase.transaction !== undefined) {
                await this.purchaseService.cancelTransaction();
            }
            this.purchaseService.delete();
            if (this.environment.VIEW_TYPE === ViewType.Cinema) {
                this.router.navigate(['/purchase/cinema/schedule']);
                return;
            }
            this.router.navigate(['/purchase/event/schedule']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }
}
