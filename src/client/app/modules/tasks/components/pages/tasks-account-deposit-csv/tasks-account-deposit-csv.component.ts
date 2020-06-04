import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as csvtojson from 'csvtojson';
import * as json2csv from 'json2csv';
import * as moment from 'moment';
import { BsDatepickerContainerComponent, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Functions } from '../../../../..';
import { CinerinoService, DownloadService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

interface IData {
    id: string;
    userName: string;
    person: factory.person.IPerson;
    programMembership: factory.ownershipInfo.IOwnershipInfo<factory.programMembership.IProgramMembership>;
    account: factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount<factory.accountType>>;
    validityMember: boolean;
    programMembershipCount: number;
    depositedCount: number;
    depositCount: number;
    pointTransferActions: factory.pecorino.action.transfer.moneyTransfer.IAction<factory.accountType.Point>[];
    status?: boolean;
}

@Component({
    selector: 'app-tasks-account-deposit-csv',
    templateUrl: './tasks-account-deposit-csv.component.html',
    styleUrls: ['./tasks-account-deposit-csv.component.scss']
})
export class TasksAccountDepositCSVComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public years: number;
    public message: string;
    public amount: number;
    public json: {
        '購入者ID': string;
        '購入者お名前': string;
        '購入者会員番号': string;
        '購入者メールアドレス': string;
        '購入者電話番号': string;
    }[];
    public targetTable: IData[];
    public successTable: IData[];
    public failTable: IData[];
    public conditions: {
        orderDateFrom: Date;
        orderDateThrough: Date;
        itemId: string;
    };
    @ViewChild('orderDateFrom', { static: true }) private orderDateFrom: BsDatepickerDirective;
    @ViewChild('orderDateThrough', { static: true }) private orderDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private translate: TranslateService,
        private cinerinoService: CinerinoService,
        private downloadService: DownloadService,
        private localeService: BsLocaleService,
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.json = [];
        this.targetTable = [];
        this.successTable = [];
        this.failTable = [];
        this.years = 0;
        this.message = this.translate.instant('tasks.accountDepositCSV.defaultMessage');
        this.amount = 1;
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            orderDateFrom: moment(today).add(-7, 'days').toDate(),
            orderDateThrough: moment(today).toDate(),
            // orderDateFrom: moment(today).add(-2, 'day').toDate(),
            // orderDateThrough: moment(today).add(1, 'day').toDate(),
            itemId: ''
        };
    }

    /**
     * ファイルダウンロード
     */
    public async download() {
        // iOS bugfix
        this.conditions.itemId
            = (<HTMLInputElement>document.getElementById('itemId')).value;
        try {
            const params: factory.order.ISearchConditions & {
                format: factory.encodingFormat.Application | factory.encodingFormat.Text;
            } = {
                orderDateFrom: (this.conditions.orderDateFrom === undefined)
                    ? undefined
                    : moment(moment(this.conditions.orderDateFrom).format('YYYYMMDD')).toDate(),
                orderDateThrough: (this.conditions.orderDateThrough === undefined)
                    ? undefined
                    : moment(moment(this.conditions.orderDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
                acceptedOffers: {
                    itemOffered: {
                        ids: [this.conditions.itemId]
                    }
                },
                sort: {
                    orderDate: factory.sortType.Descending
                },
                format: factory.encodingFormat.Text.csv
            };
            this.downloadService.order(params);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('tasks.accountDepositCSV.alert.download')
            });
        }
    }

    /**
     * ファイルアップロード
     */
    public async onChangeInput(event: any) {
        this.json = [];
        const file = event.target.files[0];
        const limit = 100000000;
        if (file.size > limit) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.upload')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>File size upper limit 100MB</code>
                </div>`
            });
            return;
        }
        const text = await this.fileToText(file);
        if (typeof text !== 'string') {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.upload')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>File format error</code>
                </div>`
            });
            return;
        }
        this.json = await this.csvToJson(text);
        // console.log(this.json);
    }

    /**
     * ファイルをテキストへ変換
     */
    private async fileToText(file: any) {
        const reader = new FileReader();
        reader.readAsText(file);
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
        });
    }

    /**
     * CSVをJSONへ変換
     */
    private async csvToJson(csv: string) {
        return new Promise<any[]>((resolve) => {
            csvtojson().fromString(csv).then((data) => {
                return resolve(data);
            });
        });
    }

    /**
     * 絞り込み
     */
    public async refine() {
        this.utilService.loadStart({ process: 'load' });
        try {
            this.targetTable = [];
            this.successTable = [];
            this.failTable = [];
            const deduplication: {
                userName: string;
                name: string;
                id: string;
                email: string;
                telephone: string;
            }[] = [];
            this.json.forEach((row) => {
                // console.log(row);
                const id = row.購入者ID;
                const userName = row.購入者会員番号;
                const name = row.購入者お名前;
                const email = row.購入者メールアドレス;
                const telephone = row.購入者電話番号;
                if (deduplication.find(d => d.id === id) === undefined) {
                    deduplication.push({ id, userName, name, email, telephone });
                }
            });
            const data: IData[] = [];
            const now = (await this.utilService.getServerTime()).date;
            let loopCount = 0;
            for (const d of deduplication) {
                if (loopCount % 10 === 0) {
                    await this.cinerinoService.getServices();
                }
                // 会員情報取得
                const person = await this.cinerinoService.person.search({ id: d.id });
                // 会員プログラム取得
                const programMembership = await this.cinerinoService.ownershipInfo.search({
                    sort: { ownedFrom: factory.sortType.Descending },
                    limit: 10,
                    id: d.id,
                    typeOfGood: {
                        typeOf: factory.programMembership.ProgramMembershipType.ProgramMembership
                    }
                });
                // ポイント口座取得
                const account = await this.cinerinoService.ownershipInfo.search({
                    id: d.id,
                    typeOfGood: {
                        typeOf: factory.ownershipInfo.AccountGoodType.Account,
                        accountType: factory.accountType.Point
                    }
                });
                // ポイント遷移
                // const getPointTransferActions = async () => {
                //     const limit = 100;
                //     let page = 1;
                //     let roop = true;
                //     let result: factory.pecorino.action.transfer.moneyTransfer.IAction<factory.accountType.Point>[] = [];
                //     while (roop) {
                //         const pointTransferActionsResult =
                //             await this.cinerinoService.ownershipInfo
                //                 .searchAccountMoneyTransferActions<factory.accountType.Point>({
                //                     page,
                //                     limit,
                //                     id: d.id,
                //                     accountType: factory.accountType.Point,
                //                     accountNumber: account.data[0].typeOfGood.accountNumber
                //                 });
                //         result = result.concat(pointTransferActionsResult.data);
                //         const lastPage = Math.ceil(pointTransferActionsResult.totalCount / limit);
                //         page++;
                //         roop = !(page > lastPage);
                //     }
                //     return result;
                // };
                // const pointTransferActions = await getPointTransferActions();
                const pointTransferActions: any[] = [];
                const depositedCount = pointTransferActions.filter(p => p.description === this.message).length;
                if (programMembership.totalCount === undefined) {
                    throw new Error('programMembership.totalCount undefined');
                }
                data.push({
                    id: (person.data.length === 0) ? d.id : person.data[0].id,
                    userName: (person.data.length === 0
                        || person.data[0].memberOf === undefined
                        || person.data[0].memberOf.membershipNumber === undefined)
                        ? d.userName : person.data[0].memberOf.membershipNumber,
                    person: person.data[0],
                    programMembership: programMembership.data[0],
                    account: account.data[0],
                    validityMember: (programMembership.data[0] === undefined)
                        ? false : (moment(programMembership.data[0].ownedFrom).unix() < moment(now).unix()
                            && moment(programMembership.data[0].ownedThrough).unix() > moment(now).unix()),
                    programMembershipCount: programMembership.totalCount,
                    depositedCount,
                    depositCount: ((programMembership.totalCount - 1 - depositedCount) > 0)
                        ? programMembership.totalCount - 1 - depositedCount : 0, // 初年度は自動なので-1
                    pointTransferActions,
                });
                await Functions.Util.sleep(1000);
                loopCount++;
            }
            if (this.years === 0) {
                this.targetTable = data;
                // console.log(this.targetTable);
                this.utilService.loadEnd();
                return;
            }
            this.targetTable = data.filter(d => d.programMembershipCount === this.years);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.refine')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error.message}</code>
                </div>`
            });
        }
        // console.log(this.targetTable);
        this.utilService.loadEnd();
    }

    /**
     * ポイント付与
     */
    public async deposit() {
        this.utilService.loadStart({ process: 'load' });
        this.successTable = [];
        this.failTable = [];
        try {
            await this.cinerinoService.getServices();
            for (const data of this.targetTable) {
                try {
                    await this.cinerinoService.account.deposit4sskts({
                        object: {
                            amount: this.amount,
                            toLocation: { accountNumber: data.account.typeOfGood.accountNumber },
                            description: this.message
                        },
                        recipient: {
                            id: data.account.typeOfGood.accountNumber,
                            name: `${data.person.givenName} ${data.person.familyName}`,
                            url: ''
                        }
                    });
                    data.status = true;
                } catch (error) {
                    data.status = false;
                    console.error(error);
                }
                await Functions.Util.sleep(1000);
            }
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.deposit')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error.message}</code>
                </div>`
            });
        }
        try {
            const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
            const fields = [
                { label: '購入者ID', value: 'id' },
                { label: '購入者お名前（姓）', value: 'person.familyName' },
                { label: '購入者お名前（名）', value: 'person.givenName' },
                { label: '購入者会員番号', value: 'userName' },
                { label: '購入者メールアドレス', value: 'person.email' },
                { label: '購入者電話番号', value: 'person.telephone' },
                { label: '会員年数', value: 'programMembershipCount' },
                { label: 'ステータス', value: 'status' }
            ];
            const opts = { fields, unwind: [] };
            const csv = await json2csv.parseAsync(this.targetTable, opts);
            const blob = new Blob([bom, csv], { 'type': 'text/csv' });
            this.downloadService.download(blob, 'deposit.csv');
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant('tasks.accountDepositCSV.alert.download')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error.message}</code>
                </div>`
            });
        }
        this.utilService.loadEnd();
    }

    /**
     * DatePicker設定
     */
    public setDatePicker() {
        this.user.subscribe((user) => {
            this.localeService.use(user.language);
        }).unsubscribe();
    }

    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    public onShowPicker(container: BsDatepickerContainerComponent) {
        Functions.Util.iOSDatepickerTapBugFix(container, [
            this.orderDateFrom,
            this.orderDateThrough
        ]);
    }


}
