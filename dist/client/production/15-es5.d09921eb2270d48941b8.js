function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"744H":function(t,e,n){"use strict";n.r(e),e.default='<div class="contents-width mx-auto px-3 py-5">\n    <form *ngIf="settingForm" [formGroup]="settingForm">\n        <div class="mb-4">\n            <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'setting.title\' | translate }}</h2>\n            <p class="mb-4 text-md-center" [innerHTML]="\'setting.read\' | translate"></p>\n            <div class="p-3 bg-white">\n\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.theater\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="theaterBranchCode" (change)="changePosList()">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let theater of (master | async).theaters"\n                                    [value]="theater.branchCode">{{ theater.name | changeLanguage }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.theaterBranchCode.invalid && settingForm.controls.theaterBranchCode.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.theaterBranchCode.errors.required" class="text-danger">\n                                    {{ \'form.validation.unselected\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.pos\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="posId">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let pos of posList" [value]="pos.id">{{ pos.name }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.posId.invalid && settingForm.controls.posId.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.posId.errors.required" class="text-danger">\n                                    {{ \'form.validation.unselected\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.familyName" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.familyName\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="familyName" placeholder="\u30e2\u30fc\u30b7\u30e7\u30f3">\n                            <div *ngIf="settingForm.controls.familyName.invalid && settingForm.controls.familyName.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.familyName.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.familyName.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.familyName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.familyName.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.fullKana\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.givenName" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.givenName\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="givenName" placeholder="\u30d4\u30af\u30c1\u30e3\u30fc">\n                            <div *ngIf="settingForm.controls.givenName.invalid && settingForm.controls.givenName.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.givenName.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.givenName.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.givenName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.givenName.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.fullKana\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.email" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.email\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="email" class="form-control" formControlName="email"\n                                placeholder="motionpicture@example.jp">\n                            <div *ngIf="settingForm.controls.email.invalid && settingForm.controls.email.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.email.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.email.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.email.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.email.errors.email" class="text-danger">\n                                    {{ \'form.validation.email\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.telephone" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.telephone\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="tel" class="form-control" formControlName="telephone" placeholder="0362778824">\n                            <div *ngIf="settingForm.controls.telephone.invalid && settingForm.controls.telephone.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.telephone.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.telephone.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.telephone.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.telephone.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.telephone.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.telephone.errors.telephone" class="text-danger">\n                                    {{ \'form.validation.telephone\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.age" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.age\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="tel" class="form-control" formControlName="age" placeholder="">\n                            <div *ngIf="settingForm.controls.age.invalid && settingForm.controls.age.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.age.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.age.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.age.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.age.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.pattern\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.address" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.address\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="tel" class="form-control" formControlName="address" placeholder="">\n                            <div *ngIf="settingForm.controls.address.invalid && settingForm.controls.address.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.address.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.address.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.address.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.address.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.pattern\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.gender" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.gender.label\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="gender">\n                                <option value="">{{ \'common.gender.unselected\' | translate }}</option>\n                                <option value="man">{{ \'common.gender.man\' | translate }}</option>\n                                <option value="woman">{{ \'common.gender.woman\' | translate }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.gender.invalid && settingForm.controls.gender.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.gender.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.gender.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.gender.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.gender.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.pattern\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.printer\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="printerType" (change)="changePrinterType()">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let printer of printers" [value]="printer.connectionType">\n                                    {{ printer.name | translate }}</option>\n                            </select>\n                            <button\n                                *ngIf="this.settingForm.controls.printerType.value && this.settingForm.controls.printerType.value !== connectionType.None"\n                                type="button" class="btn btn-sm btn-primary py-2 mt-2"\n                                (click)="print()">{{ \'setting.testPrinting\' | translate }}</button>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.printerIpAddress\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="printerIpAddress"\n                                placeholder="0.0.0.0">\n                            <div *ngIf="settingForm.controls.printerIpAddress.invalid && settingForm.controls.printerIpAddress.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.printerIpAddress.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                            </div>\n                            <p class="text-small mt-2">\n                                {{ \'setting.printerIpAddressDescription\' | translate }}\n                            </p>\n                        </div>\n                    </div>\n                </div>\n                \n\n            </div>\n        </div>\n\n        <div class="buttons mx-auto text-center">\n            <button type="submit" [disabled]="isLoading | async" class="btn btn-primary btn-block py-3 mb-3"\n                (click)="onSubmit()">{{ \'setting.next\' | translate }}</button>\n            <button type="button" class="btn btn-link"\n                [routerLink]="environment.BASE_URL">{{ \'setting.prev\' | translate }}</button>\n        </div>\n    </form>\n</div>'},AL2A:function(t,e,n){"use strict";n.r(e);var r=n("An66"),o=n("kZht"),s=n("DSWM"),i=n("3kIJ"),a=n("1VvW"),l=n("ofez"),c=n("aDqW"),d=n("WxsR"),m=n("PIN6"),g=n("i7xV"),p=n("cHUu"),u=n("mOXJ"),v=n("UH/6"),h=function(t,e,n,r){return new(n||(n=Promise))((function(o,s){function i(t){try{l(r.next(t))}catch(e){s(e)}}function a(t){try{l(r.throw(t))}catch(e){s(e)}}function l(t){t.done?o(t.value):new n((function(e){e(t.value)})).then(i,a)}l((r=r.apply(t,e||[])).next())}))},f=function(t){return t&&t.__esModule?t:{default:t}},F=function(){function t(e,n,r,o,s,i,a,l){_classCallCheck(this,t),this.formBuilder=e,this.store=n,this.utilService=r,this.userService=o,this.masterService=s,this.orderService=i,this.translate=a,this.router=l,this.printers=g.i,this.connectionType=g.h,this.viewType=g.g,this.environment=Object(m.a)()}return _createClass(t,[{key:"ngOnInit",value:function(){return h(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,r,o,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.user=this.store.pipe(Object(l.j)(u.i)),this.master=this.store.pipe(Object(l.j)(u.d)),this.error=this.store.pipe(Object(l.j)(u.b)),this.isLoading=this.store.pipe(Object(l.j)(u.c)),this.posList=[],t.prev=1,t.next=4,this.masterService.getSellers();case 4:return t.next=6,this.masterService.getTheaters();case 6:return t.next=8,this.userService.getData();case 8:return e=t.sent,t.next=11,this.masterService.getData();case 11:return n=t.sent,void 0!==e.seller&&void 0!==e.pos&&void 0!==e.customerContact&&void 0!==e.printer&&void 0===e.theater&&(r=e.seller,o=n.theaters.find((function(t){return void 0!==r.location&&t.branchCode===r.location.branchCode})),s=void 0===o?n.theaters[0]:o,this.userService.updateAll({seller:e.seller,pos:e.pos,theater:s,customerContact:e.customerContact,printer:e.printer})),t.next=15,this.createSettlingForm();case 15:t.next=20;break;case 17:t.prev=17,t.t0=t.catch(1),console.error(t.t0),this.router.navigate(["/error"]);case 20:case"end":return t.stop()}}),t,this,[[1,17]])})))}},{key:"createSettlingForm",value:function(){return h(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,r,o=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.environment.PROFILE,this.settingForm=this.formBuilder.group({theaterBranchCode:["",[i.g.required]],posId:["",[i.g.required]],printerType:[""],printerIpAddress:[""]}),e.forEach((function(t){var e=[];void 0!==t.required&&t.required&&e.push(i.g.required),void 0!==t.maxLength&&e.push(i.g.maxLength(t.maxLength)),void 0!==t.minLength&&e.push(i.g.minLength(t.minLength)),void 0!==t.pattern&&e.push(i.g.pattern(t.pattern)),"email"===t.key&&e.push(i.g.email),"telephone"===t.key&&e.push((function(t){var e=t.root.get("telephone");if(null!==e){if(""===e.value)return null;var n=new RegExp(/^\+/).test(e.value)?d.c(e.value):d.c(e.value,"JP");if(void 0===n.phone)return{telephone:!0};if(!d.b(n))return{telephone:!0}}return null})),o.settingForm.addControl(t.key,new i.b(t.value,e))})),t.next=4,this.userService.getData();case 4:void 0!==(n=t.sent).theater&&this.settingForm.controls.theaterBranchCode.setValue(n.theater.branchCode),void 0!==n.pos&&(this.changePosList(),this.settingForm.controls.posId.setValue(n.pos.id)),void 0!==(r=n.customerContact)&&Object.keys(r).forEach((function(t){var e=r[t];void 0!==e&&void 0!==o.settingForm.controls[t]&&("telephone"!==t?o.settingForm.controls[t].setValue(e):o.settingForm.controls.telephone.setValue((new v.a).transform(e)))})),void 0!==n.printer&&(this.settingForm.controls.printerType.setValue(n.printer.connectionType),this.settingForm.controls.printerIpAddress.setValue(n.printer.ipAddress)),console.log(this.settingForm);case 8:case"end":return t.stop()}}),t,this)})))}},{key:"changePosList",value:function(){var t=this;this.settingForm.controls.posId.setValue("");var e=this.settingForm.controls.theaterBranchCode.value;""!==e?this.master.subscribe((function(n){var r=n.sellers.find((function(t){return void 0!==t.location&&t.location.branchCode===e}));t.posList=void 0!==r?void 0===r.hasPOS?[]:r.hasPOS:[]})).unsubscribe():this.posList=[]}},{key:"onSubmit",value:function(){return h(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,r,o,s,i,a=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Object.keys(this.settingForm.controls).forEach((function(t){a.settingForm.controls[t].markAsTouched()})),!this.settingForm.invalid){t.next=4;break}this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.validation")}),t.next=25;break;case 4:return t.prev=4,t.next=7,this.masterService.getData();case 7:if(e=t.sent,n=this.settingForm.controls.theaterBranchCode.value,r=this.settingForm.controls.posId.value,void 0!==(o=e.sellers.find((function(t){return void 0!==t.location&&t.location.branchCode===n})))&&void 0!==o.hasPOS){t.next=13;break}throw new Error("seller not found").message;case 13:if(void 0!==(s=o.hasPOS.find((function(t){return t.id===r})))){t.next=16;break}throw new Error("pos not found").message;case 16:if(void 0!==(i=e.theaters.find((function(t){return t.branchCode===n})))){t.next=19;break}throw new Error("theater not found").message;case 19:this.userService.updateAll({seller:o,pos:s,theater:i,customerContact:{familyName:void 0===this.settingForm.controls.familyName?void 0:this.settingForm.controls.familyName.value,givenName:void 0===this.settingForm.controls.givenName?void 0:this.settingForm.controls.givenName.value,email:void 0===this.settingForm.controls.email?void 0:this.settingForm.controls.email.value,telephone:void 0===this.settingForm.controls.telephone?void 0:this.settingForm.controls.telephone.value,age:void 0===this.settingForm.controls.age?void 0:this.settingForm.controls.age.value,address:void 0===this.settingForm.controls.address?void 0:this.settingForm.controls.address.value,gender:void 0===this.settingForm.controls.gender?void 0:this.settingForm.controls.gender.value},printer:{ipAddress:this.settingForm.controls.printerIpAddress.value,connectionType:this.settingForm.controls.printerType.value}}),this.utilService.openAlert({title:this.translate.instant("common.complete"),body:this.translate.instant("setting.alert.success")}),t.next=25;break;case 22:t.prev=22,t.t0=t.catch(4),console.error(t.t0);case 25:case"end":return t.stop()}}),t,this,[[4,22]])})))}},{key:"print",value:function(){return h(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value},t.prev=1,t.next=4,this.orderService.print({orders:[],printer:e});case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.error(t.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:'\n                <p class="mb-4">'.concat(this.translate.instant("setting.alert.print"),'</p>\n                    <div class="p-3 bg-light-gray select-text">\n                    <code>').concat(t.t0,"</code>\n                </div>")});case 9:case"end":return t.stop()}}),t,this,[[1,6]])})))}},{key:"changePrinterType",value:function(){this.settingForm.controls.printerType.value===g.h.StarBluetooth&&this.settingForm.controls.printerIpAddress.setValue(this.translate.instant("setting.starBluetoothAddress"))}}]),t}();F.ctorParameters=function(){return[{type:i.a},{type:l.b},{type:p.k},{type:p.j},{type:p.d},{type:p.e},{type:c.c},{type:a.b}]},F=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}([Object(o.n)({selector:"app-setting",template:f(n("744H")).default,styles:[f(n("uSBn")).default]}),function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}("design:paramtypes",[i.a,l.b,p.k,p.j,p.d,p.e,c.c,a.b])],F);var y=[{path:"",component:n("RRjC").a,children:[{path:"",component:F}]}],x=function t(){_classCallCheck(this,t)};x=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}([Object(o.I)({imports:[a.c.forChild(y)],exports:[a.c]})],x),n.d(e,"SettingModule",(function(){return b}));var b=function t(){_classCallCheck(this,t)};b=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}([Object(o.I)({declarations:[F],imports:[r.b,x,s.a]})],b)},uSBn:function(t,e,n){"use strict";n.r(e),e.default=""}}]);