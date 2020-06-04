import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Functions } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { UtilService } from '../../../../../services';

@Component({
    selector: 'app-purchase-terms',
    templateUrl: './purchase-terms.component.html',
    styleUrls: ['./purchase-terms.component.scss']
})
export class PurchaseTermsComponent implements OnInit, OnChanges {
    @Input() public language: string;
    @Input() public screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    public environment = getEnvironment();
    public terms: string;

    constructor(
        private utilService: UtilService
    ) { }

    public ngOnInit() {
    }

    public async ngOnChanges() {
        try {
            const path = `/text/purchase/terms/${this.language}.txt`;
            const url = (await Functions.Util.isFile(`${Functions.Util.getProject().storageUrl}${path}`))
                ? `${Functions.Util.getProject().storageUrl}${path}`
                : `/default${path}`;
            const result = await this.utilService.getText<string>(url);
            this.terms = result.replace(/\n/g, '<br>');
        } catch (error) {
            console.error(error);
        }
    }

}
