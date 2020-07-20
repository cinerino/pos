import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { Functions } from '../../../../../..';

@Component({
    selector: 'app-purchase-event-performances-confirm',
    templateUrl: './performances-confirm.component.html',
    styleUrls: ['./performances-confirm.component.scss']
})
export class PurchaseEventPerformancesConfirmComponent implements OnInit {

    @Input() public screeningWorkEvent: Functions.Purchase.IScreeningEventWork;
    @Input() public readonly: boolean;
    @Output() public select = new EventEmitter<factory.chevre.event.screeningEvent.IEvent>();
    public moment: typeof moment = moment;

    constructor() { }

    public ngOnInit() { }

}
