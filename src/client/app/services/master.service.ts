import { Injectable } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { masterAction } from '../store/actions';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class MasterService {
    public master: Observable<reducers.IMasterState>;
    public error: Observable<string | null>;
    constructor(
        private actions: Actions,
        private store: Store<reducers.IState>,
    ) {
        this.master = this.store.pipe(select(reducers.getMaster));
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     * マスタデータ取得
     */
    public async getData() {
        return new Promise<reducers.IMasterState>((resolve) => {
            this.master.subscribe((master) => {
                resolve(master);
            }).unsubscribe();
        });
    }

    /**
     * マスタデータ削除
     */
    public delete() {

    }

    /**
     * 販売者一覧取得
     */
    public getSellers(params?: factory.seller.ISearchConditions) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new masterAction.GetSellers(params));
            const success = this.actions.pipe(
                ofType(masterAction.ActionTypes.GetSellersSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(masterAction.ActionTypes.GetSellersFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * スケジュール一覧取得
     */
    public async getSchedule(params: {
        superEvent: {
            ids?: string[];
            locationBranchCodes?: string[];
            workPerformedIdentifiers?: string[];
        };
        startFrom: Date;
        startThrough: Date;
    }) {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new masterAction.GetSchedule(params));
            const success = this.actions.pipe(
                ofType(masterAction.ActionTypes.GetScheduleSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(masterAction.ActionTypes.GetScheduleFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    /**
     * プロジェクト一覧取得
     */
    public async getProjects() {
        return new Promise<void>((resolve, reject) => {
            this.store.dispatch(new masterAction.GetProjects());
            const success = this.actions.pipe(
                ofType(masterAction.ActionTypes.GetProjectsSuccess),
                tap(() => { resolve(); })
            );
            const fail = this.actions.pipe(
                ofType(masterAction.ActionTypes.GetScheduleFail),
                tap(() => { this.error.subscribe((error) => { reject(error); }).unsubscribe(); })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }
}
