import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap';
import { AlertModalComponent } from '../modules/shared/components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../modules/shared/components/parts/confirm-modal/confirm-modal.component';
import { utilAction } from '../store/actions';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(
        private modal: BsModalService,
        private http: HttpClient,
        private store: Store<reducers.IState>
    ) { }

    /**
     * 警告モーダル表示
     */
    public openAlert(args: {
        title: string;
        body: string;
    }) {
        const title = args.title;
        const body = args.body;
        const modalRef = this.modal.show(AlertModalComponent, {
            initialState: { title, body },
            class: 'modal-dialog-centered'
        });
        modalRef.content.modal = modalRef;
    }

    /**
     * 確認モーダル表示
     */
    public openConfirm(args: {
        title: string;
        body: string;
        code?: string;
        cb: Function
    }) {
        const title = args.title;
        const body = args.body;
        const code = args.code;
        const cb = args.cb;
        this.modal.show(ConfirmModalComponent, {
            initialState: { title, body, code, cb },
            class: 'modal-dialog-centered'
        });
    }

    /**
     * サーバータイム取得
     */
    public async getServerTime() {
        const result = await this.http.get<{ date: string }>('/api/serverTime').toPromise();

        return result;
    }

    /**
     * json取得
     */
    public async getJson<T>(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }) {
        const result = await this.http.get<T>(url, options).toPromise();

        return result;
    }

    /**
     * json送信
     */
    public async postJson<T>(url: string, body: any, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }) {
        const result = await this.http.post<T>(url, body, options).toPromise();

        return result;
    }

    /**
     * text取得
     */
    public async getText<T>(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }) {
        const result = await this.http.get<T>(url, { ...options, responseType: (<any>'text') }).toPromise();

        return result;
    }

    /**
     * 暗号化
     */
    public async encryptionEncode(encyptText: string) {
        const encryptedResult = await this.http.post<{ salt: string; iv: string; encrypted: string; }>(
            '/api/encryption/encode', { encyptText }
        ).toPromise();
        return encryptedResult;
    }

    /**
     * 復号化
     */
    public async encryptionDecode(encryptedResult: {
        salt: string;
        iv: string;
        encrypted: string;
    }) {
        const decryptedResult = await this.http.post<{ decrypted: string; }>(
            '/api/encryption/decode', {
            salt: encryptedResult.salt,
            iv: encryptedResult.iv,
            encrypted: encryptedResult.encrypted
        }
        ).toPromise();
        return decryptedResult;
    }

    /**
     * ローディング開始
     */
    public loadStart(params?: { process: string }) {
        this.store.dispatch(new utilAction.LoadStart(params));
    }

    /**
     * ローディング終了
     */
    public loadEnd() {
        this.store.dispatch(new utilAction.LoadEnd());
    }

    /**
     * エラー設定
     */
    public setError(erorr: any) {
        this.store.dispatch(new utilAction.SetError(erorr));
    }

}
