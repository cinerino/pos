(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"744H":function(t,e,n){"use strict";n.r(e),e.default='<div class="contents-width mx-auto px-3 py-5">\n    <form *ngIf="settingForm" [formGroup]="settingForm">\n        <div class="mb-4">\n            <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'setting.title\' | translate }}</h2>\n            <p class="mb-4 text-md-center" [innerHTML]="\'setting.read\' | translate"></p>\n            <div class="p-3 bg-white">\n\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.theater\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="theaterBranchCode" (change)="changePosList()">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let theater of (master | async).theaters"\n                                    [value]="theater.branchCode">{{ theater.name | changeLanguage }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.theaterBranchCode.invalid && settingForm.controls.theaterBranchCode.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.theaterBranchCode.errors.required" class="text-danger">\n                                    {{ \'form.validation.unselected\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.pos\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="posId">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let pos of posList" [value]="pos.id">{{ pos.name }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.posId.invalid && settingForm.controls.posId.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.posId.errors.required" class="text-danger">\n                                    {{ \'form.validation.unselected\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.familyName" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.familyName\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="familyName" placeholder="\u30e2\u30fc\u30b7\u30e7\u30f3">\n                            <div *ngIf="settingForm.controls.familyName.invalid && settingForm.controls.familyName.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.familyName.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.familyName.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.familyName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.familyName.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.fullKana\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.givenName" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.givenName\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="givenName" placeholder="\u30d4\u30af\u30c1\u30e3\u30fc">\n                            <div *ngIf="settingForm.controls.givenName.invalid && settingForm.controls.givenName.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.givenName.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.givenName.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.givenName.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.givenName.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.fullKana\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.email" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.email\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="email" class="form-control" formControlName="email"\n                                placeholder="motionpicture@example.jp">\n                            <div *ngIf="settingForm.controls.email.invalid && settingForm.controls.email.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.email.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.email.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.maxlength\' | translate: { value: settingForm.controls.email.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.email.errors.email" class="text-danger">\n                                    {{ \'form.validation.email\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.telephone" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.telephone\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="tel" class="form-control" formControlName="telephone" placeholder="0362778824">\n                            <div *ngIf="settingForm.controls.telephone.invalid && settingForm.controls.telephone.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.telephone.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.telephone.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.telephone.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.telephone.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.telephone.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.telephone.errors.telephone" class="text-danger">\n                                    {{ \'form.validation.telephone\' | translate }}</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.age" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.age\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="tel" class="form-control" formControlName="age" placeholder="">\n                            <div *ngIf="settingForm.controls.age.invalid && settingForm.controls.age.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.age.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.age.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.age.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.age.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.pattern\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.address" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.address\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="tel" class="form-control" formControlName="address" placeholder="">\n                            <div *ngIf="settingForm.controls.address.invalid && settingForm.controls.address.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.address.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.address.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.address.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.address.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.pattern\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf="settingForm.controls.gender" class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'common.gender.label\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="gender">\n                                <option value="">{{ \'common.gender.unselected\' | translate }}</option>\n                                <option value="man">{{ \'common.gender.man\' | translate }}</option>\n                                <option value="woman">{{ \'common.gender.woman\' | translate }}</option>\n                            </select>\n                            <div *ngIf="settingForm.controls.gender.invalid && settingForm.controls.gender.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.gender.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                                <p *ngIf="settingForm.controls.gender.errors.minlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.minlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.gender.errors.maxlength" class="text-danger">\n                                    {{ \'form.validation.minlength\' | translate: { value: settingForm.controls.age.errors.maxlength.requiredLength } }}\n                                </p>\n                                <p *ngIf="settingForm.controls.gender.errors.pattern" class="text-danger">\n                                    {{ \'form.validation.pattern\' | translate }}\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.printer\' | translate }}</p>\n                        <div class="col-md-8">\n                            <select class="form-control" formControlName="printerType" (change)="changePrinterType()">\n                                <option value="">{{ \'setting.unselected\' | translate }}</option>\n                                <option *ngFor="let printer of printers" [value]="printer.connectionType">\n                                    {{ printer.name | translate }}</option>\n                            </select>\n                            <button\n                                *ngIf="this.settingForm.controls.printerType.value && this.settingForm.controls.printerType.value !== connectionType.None"\n                                type="button" class="btn btn-sm btn-primary py-2 mt-2"\n                                (click)="print()">{{ \'setting.testPrinting\' | translate }}</button>\n                        </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="row align-items-center">\n                        <p class="col-md-4 py-2 text-md-right">{{ \'setting.printerIpAddress\' | translate }}</p>\n                        <div class="col-md-8">\n                            <input type="text" class="form-control" formControlName="printerIpAddress"\n                                placeholder="0.0.0.0">\n                            <div *ngIf="settingForm.controls.printerIpAddress.invalid && settingForm.controls.printerIpAddress.touched"\n                                class="mt-2">\n                                <p *ngIf="settingForm.controls.printerIpAddress.errors.required" class="text-danger">\n                                    {{ \'form.validation.required\' | translate }}</p>\n                            </div>\n                            <p class="text-small mt-2">\n                                {{ \'setting.printerIpAddressDescription\' | translate }}\n                            </p>\n                        </div>\n                    </div>\n                </div>\n                \n\n            </div>\n        </div>\n\n        <div class="buttons mx-auto text-center">\n            <button type="submit" [disabled]="isLoading | async" class="btn btn-primary btn-block py-3 mb-3"\n                (click)="onSubmit()">{{ \'setting.next\' | translate }}</button>\n            <button type="button" class="btn btn-link"\n                [routerLink]="environment.BASE_URL">{{ \'setting.prev\' | translate }}</button>\n        </div>\n    </form>\n</div>'},AL2A:function(t,e,n){"use strict";n.r(e);var r=n("An66"),o=n("kZht"),s=n("DSWM"),i=n("3kIJ"),a=n("1VvW"),l=n("ofez"),c=n("aDqW"),d=n("WxsR"),m=n("PIN6"),g=n("i7xV"),p=n("cHUu"),h=n("mOXJ"),v=n("UH/6"),u=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i},f=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},F=function(t,e,n,r){return new(n||(n=Promise))((function(o,s){function i(t){try{l(r.next(t))}catch(e){s(e)}}function a(t){try{l(r.throw(t))}catch(e){s(e)}}function l(t){t.done?o(t.value):new n((function(e){e(t.value)})).then(i,a)}l((r=r.apply(t,e||[])).next())}))},y=function(t){return t&&t.__esModule?t:{default:t}};let x=class{constructor(t,e,n,r,o,s,i,a){this.formBuilder=t,this.store=e,this.utilService=n,this.userService=r,this.masterService=o,this.orderService=s,this.translate=i,this.router=a,this.printers=g.i,this.connectionType=g.h,this.viewType=g.g,this.environment=Object(m.a)()}ngOnInit(){return F(this,void 0,void 0,(function*(){this.user=this.store.pipe(Object(l.j)(h.i)),this.master=this.store.pipe(Object(l.j)(h.d)),this.error=this.store.pipe(Object(l.j)(h.b)),this.isLoading=this.store.pipe(Object(l.j)(h.c)),this.posList=[];try{yield this.masterService.getSellers(),yield this.masterService.getTheaters();const t=yield this.userService.getData(),e=yield this.masterService.getData();if(void 0!==t.seller&&void 0!==t.pos&&void 0!==t.customerContact&&void 0!==t.printer&&void 0===t.theater){const n=t.seller,r=e.theaters.find(t=>void 0!==n.location&&t.branchCode===n.location.branchCode),o=void 0===r?e.theaters[0]:r;this.userService.updateAll({seller:t.seller,pos:t.pos,theater:o,customerContact:t.customerContact,printer:t.printer})}yield this.createSettlingForm()}catch(t){console.error(t),this.router.navigate(["/error"])}}))}createSettlingForm(){return F(this,void 0,void 0,(function*(){const t=this.environment.PROFILE;this.settingForm=this.formBuilder.group({theaterBranchCode:["",[i.g.required]],posId:["",[i.g.required]],printerType:[""],printerIpAddress:[""]}),t.forEach(t=>{const e=[];void 0!==t.required&&t.required&&e.push(i.g.required),void 0!==t.maxLength&&e.push(i.g.maxLength(t.maxLength)),void 0!==t.minLength&&e.push(i.g.minLength(t.minLength)),void 0!==t.pattern&&e.push(i.g.pattern(t.pattern)),"email"===t.key&&e.push(i.g.email),"telephone"===t.key&&e.push(t=>{const e=t.root.get("telephone");if(null!==e){if(""===e.value)return null;const t=new RegExp(/^\+/).test(e.value)?d.c(e.value):d.c(e.value,"JP");if(void 0===t.phone)return{telephone:!0};if(!d.b(t))return{telephone:!0}}return null}),this.settingForm.addControl(t.key,new i.b(t.value,e))});const e=yield this.userService.getData();void 0!==e.theater&&this.settingForm.controls.theaterBranchCode.setValue(e.theater.branchCode),void 0!==e.pos&&(this.changePosList(),this.settingForm.controls.posId.setValue(e.pos.id));const n=e.customerContact;void 0!==n&&Object.keys(n).forEach(t=>{const e=n[t];void 0!==e&&void 0!==this.settingForm.controls[t]&&("telephone"!==t?this.settingForm.controls[t].setValue(e):this.settingForm.controls.telephone.setValue((new v.a).transform(e)))}),void 0!==e.printer&&(this.settingForm.controls.printerType.setValue(e.printer.connectionType),this.settingForm.controls.printerIpAddress.setValue(e.printer.ipAddress)),console.log(this.settingForm)}))}changePosList(){this.settingForm.controls.posId.setValue("");const t=this.settingForm.controls.theaterBranchCode.value;""!==t?this.master.subscribe(e=>{const n=e.sellers.find(e=>void 0!==e.location&&e.location.branchCode===t);this.posList=void 0!==n?void 0===n.hasPOS?[]:n.hasPOS:[]}).unsubscribe():this.posList=[]}onSubmit(){return F(this,void 0,void 0,(function*(){if(Object.keys(this.settingForm.controls).forEach(t=>{this.settingForm.controls[t].markAsTouched()}),this.settingForm.invalid)this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.validation")});else try{const t=yield this.masterService.getData(),e=this.settingForm.controls.theaterBranchCode.value,n=this.settingForm.controls.posId.value,r=t.sellers.find(t=>void 0!==t.location&&t.location.branchCode===e);if(void 0===r||void 0===r.hasPOS)throw new Error("seller not found").message;const o=r.hasPOS.find(t=>t.id===n);if(void 0===o)throw new Error("pos not found").message;const s=t.theaters.find(t=>t.branchCode===e);if(void 0===s)throw new Error("theater not found").message;this.userService.updateAll({seller:r,pos:o,theater:s,customerContact:{familyName:void 0===this.settingForm.controls.familyName?void 0:this.settingForm.controls.familyName.value,givenName:void 0===this.settingForm.controls.givenName?void 0:this.settingForm.controls.givenName.value,email:void 0===this.settingForm.controls.email?void 0:this.settingForm.controls.email.value,telephone:void 0===this.settingForm.controls.telephone?void 0:this.settingForm.controls.telephone.value,age:void 0===this.settingForm.controls.age?void 0:this.settingForm.controls.age.value,address:void 0===this.settingForm.controls.address?void 0:this.settingForm.controls.address.value,gender:void 0===this.settingForm.controls.gender?void 0:this.settingForm.controls.gender.value},printer:{ipAddress:this.settingForm.controls.printerIpAddress.value,connectionType:this.settingForm.controls.printerType.value}}),this.utilService.openAlert({title:this.translate.instant("common.complete"),body:this.translate.instant("setting.alert.success")})}catch(t){console.error(t)}}))}print(){return F(this,void 0,void 0,(function*(){const t={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value};try{yield this.orderService.print({orders:[],printer:t})}catch(e){console.error(e),this.utilService.openAlert({title:this.translate.instant("common.error"),body:`\n                <p class="mb-4">${this.translate.instant("setting.alert.print")}</p>\n                    <div class="p-3 bg-light-gray select-text">\n                    <code>${e}</code>\n                </div>`})}}))}changePrinterType(){this.settingForm.controls.printerType.value===g.h.StarBluetooth&&this.settingForm.controls.printerIpAddress.setValue(this.translate.instant("setting.starBluetoothAddress"))}};x.ctorParameters=()=>[{type:i.a},{type:l.b},{type:p.k},{type:p.j},{type:p.d},{type:p.e},{type:c.c},{type:a.b}],x=u([Object(o.n)({selector:"app-setting",template:y(n("744H")).default,styles:[y(n("uSBn")).default]}),f("design:paramtypes",[i.a,l.b,p.k,p.j,p.d,p.e,c.c,a.b])],x);var b=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i};const I=[{path:"",component:n("RRjC").a,children:[{path:"",component:x}]}];let w=class{};w=b([Object(o.I)({imports:[a.c.forChild(I)],exports:[a.c]})],w),n.d(e,"SettingModule",(function(){return N}));let N=class{};N=function(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}([Object(o.I)({declarations:[x],imports:[r.b,w,s.a]})],N)},uSBn:function(t,e,n){"use strict";n.r(e),e.default=""}}]);