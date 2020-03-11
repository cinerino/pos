(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-setting-setting-module"],{

/***/ "../../node_modules/raw-loader/dist/cjs.js!./app/modules/setting/components/pages/setting/setting.component.html":
/*!*******************************************************************************************************************************************************************!*\
  !*** C:/Users/hataguchi/Desktop/workspace/Cinerino/pos/node_modules/raw-loader/dist/cjs.js!./app/modules/setting/components/pages/setting/setting.component.html ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"contents-width mx-auto px-3 py-5\">\n    <form *ngIf=\"settingForm\" [formGroup]=\"settingForm\">\n        <div class=\"mb-4\">\n            <h2 class=\"text-large mb-4 text-center font-weight-bold\">{{ 'setting.title' | translate }}</h2>\n            <p class=\"mb-4 text-md-center\" [innerHTML]=\"'setting.read' | translate\"></p>\n            <div class=\"p-3 bg-white\">\n\n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.theater' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"theaterBranchCode\" (change)=\"changePosList()\">\n                                <option value=\"\">{{ 'setting.unselected' | translate }}</option>\n                                <option *ngFor=\"let theater of (master | async).theaters\"\n                                    [value]=\"theater.branchCode\">{{ theater.name | changeLanguage }}</option>\n                            </select>\n                            <div *ngIf=\"settingForm.controls.theaterBranchCode.invalid && settingForm.controls.theaterBranchCode.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.theaterBranchCode.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.unselected' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'setting.pos' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"posId\">\n                                <option value=\"\">{{ 'setting.unselected' | translate }}</option>\n                                <option *ngFor=\"let pos of posList\" [value]=\"pos.id\">{{ pos.name }}</option>\n                            </select>\n                            <div *ngIf=\"settingForm.controls.posId.invalid && settingForm.controls.posId.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.posId.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.unselected' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.familyName\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.familyName' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"familyName\" placeholder=\"モーション\">\n                            <div *ngIf=\"settingForm.controls.familyName.invalid && settingForm.controls.familyName.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.familyName.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.familyName.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.maxlength' | translate: { value: settingForm.controls.familyName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.familyName.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.fullKana' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.givenName\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.givenName' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"givenName\" placeholder=\"ピクチャー\">\n                            <div *ngIf=\"settingForm.controls.givenName.invalid && settingForm.controls.givenName.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.givenName.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.givenName.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.maxlength' | translate: { value: settingForm.controls.givenName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.givenName.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.fullKana' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.email\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.email' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"email\" class=\"form-control\" formControlName=\"email\"\n                                placeholder=\"motionpicture@example.jp\">\n                            <div *ngIf=\"settingForm.controls.email.invalid && settingForm.controls.email.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.email.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.email.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.maxlength' | translate: { value: settingForm.controls.email.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.email.errors.email\" class=\"text-danger\">\n                                    {{ 'form.validation.email' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.telephone\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.telephone' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"tel\" class=\"form-control\" formControlName=\"telephone\" placeholder=\"0362778824\">\n                            <div *ngIf=\"settingForm.controls.telephone.invalid && settingForm.controls.telephone.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.telephone.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.telephone.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.telephone.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.telephone.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.telephone.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.telephone.errors.telephone\" class=\"text-danger\">\n                                    {{ 'form.validation.telephone' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.age\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.age' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"tel\" class=\"form-control\" formControlName=\"age\" placeholder=\"\">\n                            <div *ngIf=\"settingForm.controls.age.invalid && settingForm.controls.age.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.age.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.age.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.age.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.age.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.pattern' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.address\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.address' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"tel\" class=\"form-control\" formControlName=\"address\" placeholder=\"\">\n                            <div *ngIf=\"settingForm.controls.address.invalid && settingForm.controls.address.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.address.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.address.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.address.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.address.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.pattern' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"settingForm.controls.gender\" class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'common.gender.label' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"gender\">\n                                <option value=\"\">{{ 'common.gender.unselected' | translate }}</option>\n                                <option value=\"man\">{{ 'common.gender.man' | translate }}</option>\n                                <option value=\"woman\">{{ 'common.gender.woman' | translate }}</option>\n                            </select>\n                            <div *ngIf=\"settingForm.controls.gender.invalid && settingForm.controls.gender.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.gender.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                                <p *ngIf=\"settingForm.controls.gender.errors.minlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.gender.errors.maxlength\" class=\"text-danger\">\n                                    {{ 'form.validation.minlength' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf=\"settingForm.controls.gender.errors.pattern\" class=\"text-danger\">\n                                    {{ 'form.validation.pattern' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'setting.printer' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <select class=\"form-control\" formControlName=\"printerType\" (change)=\"changePrinterType()\">\n                                <option value=\"\">{{ 'setting.unselected' | translate }}</option>\n                                <option *ngFor=\"let printer of printers\" [value]=\"printer.connectionType\">\n                                    {{ printer.name | translate }}</option>\n                            </select>\n                            <button\n                                *ngIf=\"this.settingForm.controls.printerType.value && this.settingForm.controls.printerType.value !== connectionType.None\"\n                                type=\"button\" class=\"btn btn-sm btn-primary py-2 mt-2\"\n                                (click)=\"print()\">{{ 'setting.testPrinting' | translate }}</button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"row align-items-center\">\n                        <p class=\"col-md-4 py-2 text-md-right\">{{ 'setting.printerIpAddress' | translate }}</p>\n                        <div class=\"col-md-8\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"printerIpAddress\"\n                                placeholder=\"0.0.0.0\">\n                            <div *ngIf=\"settingForm.controls.printerIpAddress.invalid && settingForm.controls.printerIpAddress.touched\"\n                                class=\"mt-2\">\n                                <p *ngIf=\"settingForm.controls.printerIpAddress.errors.required\" class=\"text-danger\">\n                                    {{ 'form.validation.required' | translate }}</p>\n                            </div>\n                            <p class=\"text-small mt-2\">\n                                {{ 'setting.printerIpAddressDescription' | translate }}\n                            </p>\n                        </div>\n                    </div>\n                </div>\n                \n\n            </div>\n        </div>\n\n        <div class=\"buttons mx-auto text-center\">\n            <button type=\"submit\" [disabled]=\"isLoading | async\" class=\"btn btn-primary btn-block py-3 mb-3\"\n                (click)=\"onSubmit()\">{{ 'setting.next' | translate }}</button>\n            <button type=\"button\" class=\"btn btn-link\"\n                [routerLink]=\"environment.BASE_URL\">{{ 'setting.prev' | translate }}</button>\n        </div>\n    </form>\n</div>");

/***/ }),

/***/ "./app/modules/setting/components/pages/setting/setting.component.scss":
/*!*****************************************************************************!*\
  !*** ./app/modules/setting/components/pages/setting/setting.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvY2xpZW50L2FwcC9tb2R1bGVzL3NldHRpbmcvY29tcG9uZW50cy9wYWdlcy9zZXR0aW5nL3NldHRpbmcuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./app/modules/setting/components/pages/setting/setting.component.ts":
/*!***************************************************************************!*\
  !*** ./app/modules/setting/components/pages/setting/setting.component.ts ***!
  \***************************************************************************/
/*! exports provided: SettingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingComponent", function() { return SettingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "../../node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libphonenumber-js */ "../../node_modules/libphonenumber-js/index.es6.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../environments/environment */ "./environments/environment.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../models */ "./app/models/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../services */ "./app/services/index.ts");
/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../store/reducers */ "./app/store/reducers/index.ts");
/* harmony import */ var _shared_pipes_libphonenumber_format_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/pipes/libphonenumber-format.pipe */ "./app/modules/shared/pipes/libphonenumber-format.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











let SettingComponent = class SettingComponent {
    constructor(formBuilder, store, utilService, userService, masterService, orderService, translate, router) {
        this.formBuilder = formBuilder;
        this.store = store;
        this.utilService = utilService;
        this.userService = userService;
        this.masterService = masterService;
        this.orderService = orderService;
        this.translate = translate;
        this.router = router;
        this.printers = _models__WEBPACK_IMPORTED_MODULE_7__["printers"];
        this.connectionType = _models__WEBPACK_IMPORTED_MODULE_7__["connectionType"];
        this.viewType = _models__WEBPACK_IMPORTED_MODULE_7__["ViewType"];
        this.environment = Object(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["getEnvironment"])();
    }
    /**
     * 初期化
     */
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getUser"]));
            this.master = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getMaster"]));
            this.error = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getError"]));
            this.isLoading = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_store_reducers__WEBPACK_IMPORTED_MODULE_9__["getLoading"]));
            this.posList = [];
            try {
                yield this.masterService.getSellers();
                yield this.masterService.getTheaters();
                const userData = yield this.userService.getData();
                const masterData = yield this.masterService.getData();
                if (userData.seller !== undefined
                    && userData.pos !== undefined
                    && userData.customerContact !== undefined
                    && userData.printer !== undefined
                    && userData.theater === undefined) {
                    // 互換性担保
                    const seller = userData.seller;
                    const findResult = masterData.theaters.find(t => {
                        return (seller.location !== undefined
                            && t.branchCode === seller.location.branchCode);
                    });
                    const theater = (findResult === undefined) ? masterData.theaters[0] : findResult;
                    this.userService.updateAll({
                        seller: userData.seller,
                        pos: userData.pos,
                        theater: theater,
                        customerContact: userData.customerContact,
                        printer: userData.printer
                    });
                }
                yield this.createSettlingForm();
            }
            catch (error) {
                console.error(error);
                this.router.navigate(['/error']);
            }
        });
    }
    /**
     * フォーム作成
     */
    createSettlingForm() {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = this.environment.PROFILE;
            this.settingForm = this.formBuilder.group({
                theaterBranchCode: ['', [
                        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
                    ]],
                posId: ['', [
                        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
                    ]],
                printerType: [''],
                printerIpAddress: ['']
            });
            profile.forEach(p => {
                const validators = [];
                if (p.required !== undefined && p.required) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                }
                if (p.maxLength !== undefined) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(p.maxLength));
                }
                if (p.minLength !== undefined) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(p.minLength));
                }
                if (p.pattern !== undefined) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(p.pattern));
                }
                if (p.key === 'email') {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email);
                }
                if (p.key === 'telephone') {
                    validators.push((control) => {
                        const field = control.root.get('telephone');
                        if (field !== null) {
                            if (field.value === '') {
                                return null;
                            }
                            const parsedNumber = (new RegExp(/^\+/).test(field.value))
                                ? libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__["parse"](field.value)
                                : libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__["parse"](field.value, 'JP');
                            if (parsedNumber.phone === undefined) {
                                return { telephone: true };
                            }
                            const isValid = libphonenumber_js__WEBPACK_IMPORTED_MODULE_5__["isValidNumber"](parsedNumber);
                            if (!isValid) {
                                return { telephone: true };
                            }
                        }
                        return null;
                    });
                }
                this.settingForm.addControl(p.key, new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](p.value, validators));
            });
            const user = yield this.userService.getData();
            if (user.theater !== undefined) {
                this.settingForm.controls.theaterBranchCode.setValue(user.theater.branchCode);
            }
            if (user.pos !== undefined) {
                this.changePosList();
                this.settingForm.controls.posId.setValue(user.pos.id);
            }
            const customerContact = user.customerContact;
            if (customerContact !== undefined) {
                Object.keys(customerContact).forEach(key => {
                    const value = customerContact[key];
                    if (value === undefined || this.settingForm.controls[key] === undefined) {
                        return;
                    }
                    if (key === 'telephone') {
                        this.settingForm.controls.telephone
                            .setValue(new _shared_pipes_libphonenumber_format_pipe__WEBPACK_IMPORTED_MODULE_10__["LibphonenumberFormatPipe"]().transform(value));
                        return;
                    }
                    this.settingForm.controls[key].setValue(value);
                });
            }
            if (user.printer !== undefined) {
                this.settingForm.controls.printerType.setValue(user.printer.connectionType);
                this.settingForm.controls.printerIpAddress.setValue(user.printer.ipAddress);
            }
            console.log(this.settingForm);
        });
    }
    /**
     * POS変更
     */
    changePosList() {
        this.settingForm.controls.posId.setValue('');
        const theaterBranchCode = this.settingForm.controls.theaterBranchCode.value;
        if (theaterBranchCode === '') {
            this.posList = [];
            return;
        }
        this.master.subscribe((master) => {
            const findResult = master.sellers.find(s => (s.location !== undefined && s.location.branchCode === theaterBranchCode));
            if (findResult === undefined) {
                this.posList = [];
                return;
            }
            this.posList = (findResult.hasPOS === undefined) ? [] : findResult.hasPOS;
        }).unsubscribe();
    }
    /**
     * 設定変更
     */
    onSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            Object.keys(this.settingForm.controls).forEach((key) => {
                this.settingForm.controls[key].markAsTouched();
            });
            if (this.settingForm.invalid) {
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('setting.alert.validation')
                });
                return;
            }
            try {
                const masterData = yield this.masterService.getData();
                const theaterBranchCode = this.settingForm.controls.theaterBranchCode.value;
                const posId = this.settingForm.controls.posId.value;
                const seller = masterData.sellers.find(s => (s.location !== undefined && s.location.branchCode === theaterBranchCode));
                if (seller === undefined || seller.hasPOS === undefined) {
                    throw new Error('seller not found').message;
                }
                const pos = seller.hasPOS.find(p => p.id === posId);
                if (pos === undefined) {
                    throw new Error('pos not found').message;
                }
                const theater = masterData.theaters.find(t => (t.branchCode === theaterBranchCode));
                if (theater === undefined) {
                    throw new Error('theater not found').message;
                }
                this.userService.updateAll({
                    seller,
                    pos,
                    theater,
                    customerContact: {
                        familyName: (this.settingForm.controls.familyName === undefined)
                            ? undefined : this.settingForm.controls.familyName.value,
                        givenName: (this.settingForm.controls.givenName === undefined)
                            ? undefined : this.settingForm.controls.givenName.value,
                        email: (this.settingForm.controls.email === undefined)
                            ? undefined : this.settingForm.controls.email.value,
                        telephone: (this.settingForm.controls.telephone === undefined)
                            ? undefined : this.settingForm.controls.telephone.value,
                        age: (this.settingForm.controls.age === undefined)
                            ? undefined : this.settingForm.controls.age.value,
                        address: (this.settingForm.controls.address === undefined)
                            ? undefined : this.settingForm.controls.address.value,
                        gender: (this.settingForm.controls.gender === undefined)
                            ? undefined : this.settingForm.controls.gender.value
                    },
                    printer: {
                        ipAddress: this.settingForm.controls.printerIpAddress.value,
                        connectionType: this.settingForm.controls.printerType.value
                    }
                });
                this.utilService.openAlert({
                    title: this.translate.instant('common.complete'),
                    body: this.translate.instant('setting.alert.success')
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * 印刷
     */
    print() {
        return __awaiter(this, void 0, void 0, function* () {
            const printer = {
                connectionType: this.settingForm.controls.printerType.value,
                ipAddress: this.settingForm.controls.printerIpAddress.value
            };
            try {
                yield this.orderService.print({ orders: [], printer });
            }
            catch (error) {
                console.error(error);
                this.utilService.openAlert({
                    title: this.translate.instant('common.error'),
                    body: `
                <p class="mb-4">${this.translate.instant('setting.alert.print')}</p>
                    <div class="p-3 bg-light-gray select-text">
                    <code>${error}</code>
                </div>`
                });
            }
        });
    }
    /**
     * プリンター変更
     */
    changePrinterType() {
        if (this.settingForm.controls.printerType.value === _models__WEBPACK_IMPORTED_MODULE_7__["connectionType"].StarBluetooth) {
            this.settingForm.controls.printerIpAddress.setValue(this.translate.instant('setting.starBluetoothAddress'));
        }
    }
};
SettingComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_8__["UtilService"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_8__["UserService"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_8__["MasterService"] },
    { type: _services__WEBPACK_IMPORTED_MODULE_8__["OrderService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
SettingComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-setting',
        template: __importDefault(__webpack_require__(/*! raw-loader!./setting.component.html */ "../../node_modules/raw-loader/dist/cjs.js!./app/modules/setting/components/pages/setting/setting.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./setting.component.scss */ "./app/modules/setting/components/pages/setting/setting.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"],
        _services__WEBPACK_IMPORTED_MODULE_8__["UtilService"],
        _services__WEBPACK_IMPORTED_MODULE_8__["UserService"],
        _services__WEBPACK_IMPORTED_MODULE_8__["MasterService"],
        _services__WEBPACK_IMPORTED_MODULE_8__["OrderService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], SettingComponent);



/***/ }),

/***/ "./app/modules/setting/setting-routing.module.ts":
/*!*******************************************************!*\
  !*** ./app/modules/setting/setting-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: SettingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingRoutingModule", function() { return SettingRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/components/pages/base/base.component */ "./app/modules/shared/components/pages/base/base.component.ts");
/* harmony import */ var _components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pages/setting/setting.component */ "./app/modules/setting/components/pages/setting/setting.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




const routes = [{
        path: '',
        component: _shared_components_pages_base_base_component__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"],
        children: [
            { path: '', component: _components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__["SettingComponent"] }
        ]
    }];
let SettingRoutingModule = class SettingRoutingModule {
};
SettingRoutingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], SettingRoutingModule);



/***/ }),

/***/ "./app/modules/setting/setting.module.ts":
/*!***********************************************!*\
  !*** ./app/modules/setting/setting.module.ts ***!
  \***********************************************/
/*! exports provided: SettingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingModule", function() { return SettingModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./app/modules/shared/shared.module.ts");
/* harmony import */ var _components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pages/setting/setting.component */ "./app/modules/setting/components/pages/setting/setting.component.ts");
/* harmony import */ var _setting_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setting-routing.module */ "./app/modules/setting/setting-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let SettingModule = class SettingModule {
};
SettingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _components_pages_setting_setting_component__WEBPACK_IMPORTED_MODULE_3__["SettingComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _setting_routing_module__WEBPACK_IMPORTED_MODULE_4__["SettingRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        ]
    })
], SettingModule);



/***/ })

}]);
//# sourceMappingURL=modules-setting-setting-module-es2015.js.map