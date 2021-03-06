/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Functions } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { UtilService } from '../../../../../services';
import { CinerinoService } from '../../../../../services/cinerino.service';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    @Input() public isOpen: boolean;
    @Output() public close: EventEmitter<{}> = new EventEmitter();
    public environment = getEnvironment();
    public instructionUrl = getEnvironment().INSTRUCTION_URL.replace('/storage', Functions.Util.getProject().storageUrl);

    constructor(
        private cinerino: CinerinoService,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
    }

    public signOut() {
        this.close.emit();
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('menu.confirm.logout'),
            cb: async () => {
                try {
                    await this.cinerino.getServices();
                    await this.cinerino.signOut();
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    public isVisible(value: string) {
        return (this.environment.HEADER_MENU_SCOPE.find(r => r === value) !== undefined);
    }

}
