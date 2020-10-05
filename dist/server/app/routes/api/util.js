"use strict";
/**
 * API
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilRouter = void 0;
const debug = require("debug");
const express = require("express");
const http_status_1 = require("http-status");
const moment = require("moment");
const log = debug('application: /api/util');
const router = express.Router();
/**
 * プロジェクト設定取得
 */
router.post('/project', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log('project', req.body);
    try {
        const projectId = req.body.projectId;
        if (projectId !== undefined) {
            res.json({
                projectId: projectId,
                storageUrl: `${process.env.STORAGE_URL}/${projectId}`,
                gmoTokenUrl: process.env.GMO_TOKEN_URL,
                env: process.env.NODE_ENV
            });
            return;
        }
        res.json({
            projectId: (process.env.PROJECT_ID === undefined) ? '' : process.env.PROJECT_ID,
            storageUrl: (process.env.PROJECT_STORAGE_URL === undefined) ? '' : process.env.PROJECT_STORAGE_URL,
            gmoTokenUrl: process.env.GMO_TOKEN_URL,
            env: process.env.NODE_ENV
        });
    }
    catch (error) {
        log('project', error.message);
        res.status(http_status_1.NOT_FOUND);
        res.json({ error: error.message });
    }
}));
/**
 * サーバータイム取得
 */
router.get('/serverTime', (_req, res) => {
    log('serverTime');
    res.json({ date: moment().toISOString() });
});
/**
 * バージョン取得
 */
router.get('/version', (_req, res) => {
    log('version');
    res.json({ version: process.env.VERSION });
});
exports.utilRouter = router;
