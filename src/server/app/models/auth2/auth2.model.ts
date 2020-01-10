import * as cinerino from '@cinerino/api-nodejs-client';
import * as express from 'express';
import { getEnvironment } from '../../functions/util';

/**
 * 認証セッション
 * @interface IAuth2Session
 */
export interface IAuth2Session {
    /**
     * 状態
     */
    state: string;
    /**
     * スコープ
     */
    scopes: string[];
    /**
     * 資格情報
     */
    credentials?: any;
    /**
     * コード検証
     */
    codeVerifier?: string;
}

/**
 * 認証モデル
 * @class Auth2Model
 */
export class Auth2Model {
    /**
     * 状態（固定値）
     */
    private static STATE = 'STATE';
    /**
     * 検証コード（固定値）
     */
    private static CODE_VERIFIER = 'CODE_VERIFIER';
    /**
     * 状態
     */
    public state: string;
    /**
     * スコープ
     */
    public scopes: string[];
    /**
     * 資格情報
     */
    public credentials?: any;
    /**
     * コード検証
     */
    public codeVerifier?: string;

    /**
     * @constructor
     * @param {any} session
     */
    constructor(session?: any) {
        if (session === undefined) {
            session = {};
        }
        this.scopes = [];
        this.credentials = session.credentials;
        this.state = Auth2Model.STATE;
        this.codeVerifier = Auth2Model.CODE_VERIFIER;
    }

    /**
     * 認証クラス作成
     * @memberof Auth2Model
     */
    public async create(req: express.Request) {
        const env = await getEnvironment(req);
        if (env === undefined) {
            throw new Error('project not found');
        }
        const auth = new cinerino.auth.OAuth2({
            domain: env.OAUTH2_SERVER_DOMAIN,
            clientId: env.CLIENT_ID_OAUTH2,
            clientSecret: env.CLIENT_SECRET_OAUTH2,
            redirectUri: `${req.protocol}://${req.hostname}/signIn`,
            logoutUri: `${req.protocol}://${req.hostname}/signOut`,
            state: this.state,
            scopes: <any>this.scopes.join(' ')
        });
        if (this.credentials !== undefined) {
            auth.setCredentials(this.credentials);
        }

        return auth;
    }

    /**
     * セッションへ保存
     * @memberof Auth2Model
     * @method save
     * @returns {Object}
     */
    public save(session: any): void {
        const authSession: IAuth2Session = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
