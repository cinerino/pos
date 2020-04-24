function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var s=n[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"+r+q":function(e,n,t){"use strict";t.r(n),n.default=":host {\n  display: block;\n}\n\nul {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;\n  grid-gap: 0.5rem;\n}\n\n@media (max-width: 767.98px) {\n  ul {\n    grid-template-columns: 1fr;\n  }\n}\n\n.status {\n  line-height: 30px;\n}\n\n.status img {\n  width: 30px;\n  height: 30px;\n}"},"5Yqj":function(e,n,t){"use strict";t.r(n),n.default='<div class="contents-width mx-auto px-3 py-5">\n    <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'admission.schedule.title\' | translate }}</h2>\n    <p class="mb-4 text-md-center" [innerHTML]="\'admission.schedule.read\' | translate"></p>\n\n    <div class="mb-3">\n        <div class="input-group">\n            <input type="text" placeholder="Datepicker" class="form-control" #datepicker="bsDatepicker" bsDatepicker\n                [(ngModel)]="scheduleDate"\n                [bsConfig]="{ dateInputFormat: \'YYYY/MM/DD\', adaptivePosition: true, showWeekNumbers: false }"\n                (bsValueChange)="selectDate($event)" readonly (click)="setDatePicker()"\n                (onShown)="onShowPicker($event)">\n            <div class="input-group-append pointer" (click)="toggleDatepicker()">\n                <span class="input-group-text"><i class="fas fa-caret-down"></i></span>\n            </div>\n        </div>\n    </div>\n    <p *ngIf="(admission | async).scheduleDate" class="text-primary text-large mb-3">{{ (admission |\n        async).scheduleDate | formatDate: \'YYYY/MM/DD (ddd)\' }}</p>\n    <p *ngIf="screeningWorkEvents.length === 0" class="mb-3" [innerHTML]="\'admission.schedule.notfound\' | translate">\n    </p>\n    <div class="mb-4">\n        <app-admission-schedule-work *ngFor="let screeningWorkEvent of screeningWorkEvents"\n            [screeningWorkEvent]="screeningWorkEvent" (select)="selectSchedule($event)" class="mb-3">\n        </app-admission-schedule-work>\n    </div>\n    <div class="buttons mx-auto text-center">\n        <button type="button" class="btn btn-primary btn-block py-3 mb-3"\n            (click)="notSpecified()">{{ \'admission.schedule.next\' | translate }}</button>\n    </div>\n</div>'},BMVQ:function(e,n,t){"use strict";t.r(n),n.default='<div class="bg-white">\n    <div class="p-3">\n        <div class="mb-2">\n            <p class="font-weight-bold text-large">{{ screeningWorkEvent.info.name | changeLanguage }}</p>\n            <p\n                *ngIf="screeningWorkEvent.info.superEvent.headline && (screeningWorkEvent.info.superEvent.headline | changeLanguage)">\n                {{ screeningWorkEvent.info.superEvent.headline | changeLanguage }}</p>\n            <p\n                *ngIf="screeningWorkEvent.info.superEvent.description && (screeningWorkEvent.info.superEvent.description | changeLanguage)">{{\n                    screeningWorkEvent.info.superEvent.description | changeLanguage }}</p>\n        </div>\n        <div class="d-flex align-items-center">\n            <div *ngIf="screeningWorkEvent.info.workPerformed?.contentRating"\n                class="text-small bg-dark-gray text-white py-1 px-3 mr-2">{{\n                    screeningWorkEvent.info.workPerformed.contentRating }}</div>\n            <div *ngIf="screeningWorkEvent.info.superEvent.dubLanguage"\n                class="text-small bg-dark-gray text-white py-1 px-3 mr-2">{{ \'common.dubbing\' | translate }}</div>\n            <div *ngIf="screeningWorkEvent.info.superEvent.subtitleLanguage"\n                class="text-small bg-dark-gray text-white py-1 px-3 mr-2">{{ \'common.subtitles\' | translate }}</div>\n            <div *ngIf="screeningWorkEvent.info.workPerformed?.duration && moment.duration(screeningWorkEvent.info.workPerformed.duration).asMinutes() > 0"\n                class="text-small ml-auto">\n                <span\n                    class="mr-1">{{ \'common.duration\' | translate }}</span>{{ moment.duration(screeningWorkEvent.info.workPerformed.duration).asMinutes() }}{{ \'common.date.minute\' | translate }}\n            </div>\n        </div>\n    </div>\n    <ul class="p-3">\n        <li *ngFor="let performance of screeningWorkEvent.data"\n            class="border boder-gray rounded p-2 py-md-3 text-md-center d-md-block d-flex justify-content-between align-items-center pointer"\n            [ngClass]="{ \n          \'bg-white\': performance.isOpenDoor() || performance.isScreening(), \n          \'bg-dark-gray text-light-gray\': !(performance.isOpenDoor() || performance.isScreening())\n          }" (click)="select.emit(performance.screeningEvent)">\n            <div>\n                <div class="mb-2 text-small screen-name">\n                    <span *ngIf="performance.screeningEvent.location.address" class="mr-2">\n                        {{ performance.screeningEvent.location.address | changeLanguage }}\n                    </span>\n                    {{ performance.screeningEvent.location.name | changeLanguage }}\n                </div>\n                <div>\n                    <strong\n                        class="text-large">{{ moment(performance.screeningEvent.startDate).format(\'HH:mm\') }}</strong>\n                    <span>-</span>\n                    <span>{{ moment(performance.screeningEvent.endDate).format(\'HH:mm\') }}</span>\n                </div>\n            </div>\n            <hr class="border-0 bg-light-gray my-2">\n            <div class="text-center">\n                <div *ngIf="performance.isOpenDoor() || performance.isScreening()">\n                    <div class="status mb-2" *ngIf="performance.isOpenDoor()">\n                        {{ \'admission.schedule.status.opening\' | translate }}</div>\n                    <div class="status mb-2" *ngIf="performance.isScreening()">\n                        {{ \'admission.schedule.status.nowShowing\' | translate }}</div>\n                </div>\n\n                <div class="status mb-2" *ngIf="performance.isOpenDoor(\'before\')">\n                    {{ \'admission.schedule.status.beforeOpening\' | translate }}</div>\n                <div class="status mb-2" *ngIf="performance.isScreening(\'after\')">\n                    {{ \'admission.schedule.status.filmCompletion\' | translate }}</div>\n                <div *ngIf="!performance.isInfinitetock() && environment.DISPLAY_TICKETED_SEAT" class="mb-2 text-small">\n                    {{ \'common.seat\' | translate }}\n                    {{ performance.screeningEvent.remainingAttendeeCapacity }} /\n                    {{ performance.screeningEvent.maximumAttendeeCapacity }}\n                </div>\n                <div *ngIf="performance.isInfinitetock()" class="mb-2 text-small">\n                    {{ \'admission.schedule.infiniteStock\' | translate }}</div>\n                <div class="text-small mb-1">{{ \'common.ticketing\' | translate }}\n                    {{ performance.screeningEvent.checkInCount }}</div>\n                <div class="text-small">{{ \'common.admission\' | translate }}\n                    {{ performance.screeningEvent.attendeeCount }}</div>\n            </div>\n        </li>\n    </ul>\n</div>'},OqUh:function(e,n,t){"use strict";t.r(n),n.default='.condition select {\n  width: 100%;\n}\n\n.schedule-slider .swiper-slide::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 4px;\n  background-color: #000;\n  opacity: 0.3;\n}\n\n.schedule-slider .swiper-button-next,\n.schedule-slider .swiper-button-prev {\n  width: 27px;\n  height: 27px;\n  background-image: url(/assets/images/icon/slider_arrow.svg);\n  background-size: 27px;\n  margin-top: -13px;\n}\n\n.schedule-slider .swiper-button-next {\n  right: -38px;\n}\n\n.schedule-slider .swiper-button-prev {\n  left: -38px;\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}'},dzKq:function(e,n,t){"use strict";t.r(n);var s=t("An66"),i=t("kZht"),a=t("DSWM"),r=t("1VvW"),o=t("unpb"),c=t("RRjC"),d=t("ofez"),l=t("aDqW"),u=t("wgY5"),m=t("PIN6"),p=t("cHUu"),g=t("mOXJ"),v=function(e,n,t,s){var i,a=arguments.length,r=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,n,t,s);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(a<3?i(r):a>3?i(n,t,r):i(n,t))||r);return a>3&&r&&Object.defineProperty(n,t,r),r},f=function(e,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,n)},h=function(e,n,t,s){return new(t||(t=Promise))((function(i,a){function r(e){try{c(s.next(e))}catch(n){a(n)}}function o(e){try{c(s.throw(e))}catch(n){a(n)}}function c(e){e.done?i(e.value):new t((function(n){n(e.value)})).then(r,o)}c((s=s.apply(e,n||[])).next())}))},b=function(e){return e&&e.__esModule?e:{default:e}},k=function(){function e(n,t,s,i,a){_classCallCheck(this,e),this.store=n,this.admissionService=t,this.utilService=s,this.qrcodeService=i,this.translate=a,this.moment=u,this.environment=Object(m.a)()}return _createClass(e,[{key:"ngOnInit",value:function(){this.inputCode="",this.isLoading=this.store.pipe(Object(d.j)(g.c)),this.admission=this.store.pipe(Object(d.j)(g.a)),this.admissionService.initializeQrcodeToken()}},{key:"ngOnDestroy",value:function(){clearInterval(this.updateLoop)}},{key:"handleKeyboardEvent",value:function(e){"Enter"===e.key&&this.inputCode.length>0?(this.check(this.inputCode),this.inputCode=""):"Escape"!==e.key&&(this.inputCode+=e.key)}},{key:"check",value:function(e){return h(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,this.admissionService.checkQrcodeToken(e);case 3:n.next=8;break;case 5:n.prev=5,n.t0=n.catch(0),console.error(n.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("admission.check.alert.check")});case 8:case"end":return n.stop()}}),n,this,[[0,5]])})))}},{key:"openQRCodeReader",value:function(){var e=this;this.qrcodeService.openQRCodeReader({cb:function(n){return h(e,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.check(n);case 2:case"end":return e.stop()}}),e,this)})))}})}},{key:"update",value:function(){var e=this;clearInterval(this.updateLoop),this.updateLoop=setInterval((function(){return h(e,void 0,void 0,regeneratorRuntime.mark((function e(){var n,t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.admissionService.getData();case 2:if(n=e.sent,t=n.screeningEvent,e.t0=void 0!==t,!e.t0){e.next=8;break}return e.next=8,this.admissionService.getScreeningEvent(t);case 8:case"end":return e.stop()}}),e,this)})))}),6e5)}}]),e}();k.ctorParameters=function(){return[{type:d.b},{type:p.a},{type:p.k},{type:p.g},{type:l.c}]},v([Object(i.y)("document:keypress",["$event"]),f("design:type",Function),f("design:paramtypes",[KeyboardEvent]),f("design:returntype",void 0)],k.prototype,"handleKeyboardEvent",null),k=v([Object(i.n)({selector:"app-admission-check",template:b(t("mfvb")).default,styles:[b(t("oN8W")).default]}),f("design:paramtypes",[d.b,p.a,p.k,p.g,l.c])],k);var y=t("aroP"),x=t("cF7s"),w=function(e,n,t,s){var i,a=arguments.length,r=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,n,t,s);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(a<3?i(r):a>3?i(n,t,r):i(n,t))||r);return a>3&&r&&Object.defineProperty(n,t,r),r},E=function(e,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,n)},D=function(e,n,t,s){return new(t||(t=Promise))((function(i,a){function r(e){try{c(s.next(e))}catch(n){a(n)}}function o(e){try{c(s.throw(e))}catch(n){a(n)}}function c(e){e.done?i(e.value):new t((function(n){n(e.value)})).then(r,o)}c((s=s.apply(e,n||[])).next())}))},R=function(e){return e&&e.__esModule?e:{default:e}},j=function(){function e(n,t,s,i,a,r){_classCallCheck(this,e),this.store=n,this.router=t,this.localeService=s,this.admissionService=i,this.masterService=a,this.userService=r,this.moment=u}return _createClass(e,[{key:"ngOnInit",value:function(){return D(this,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.admission=this.store.pipe(Object(d.j)(g.a)),this.user=this.store.pipe(Object(d.j)(g.i)),this.screeningWorkEvents=[];case 1:case"end":return e.stop()}}),e,this)})))}},{key:"ngOnDestroy",value:function(){clearTimeout(this.updateTimer)}},{key:"update",value:function(){var e=this;void 0!==this.updateTimer&&clearTimeout(this.updateTimer),this.updateTimer=setTimeout((function(){e.selectDate()}),6e5)}},{key:"selectDate",value:function(e){return D(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t,s,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return null!=e&&(this.scheduleDate=e),n.prev=1,n.next=4,this.userService.getData();case 4:if(void 0!==(t=n.sent.theater)){n.next=7;break}return n.abrupt("return",void this.router.navigate(["/error"]));case 7:return void 0!==this.scheduleDate&&null!==this.scheduleDate||(this.scheduleDate=u().toDate()),s=u(this.scheduleDate).format("YYYY-MM-DD"),this.admissionService.selectScheduleDate(s),n.next=12,this.masterService.getSchedule({superEvent:{locationBranchCodes:[t.branchCode]},startFrom:u(s).toDate(),startThrough:u(s).add(1,"day").toDate()});case 12:i=n.sent,this.screeningWorkEvents=Object(x.F)({screeningEvents:i}),this.update(),n.next=19;break;case 16:n.prev=16,n.t0=n.catch(1),console.error(n.t0),this.router.navigate(["/error"]);case 19:case"end":return n.stop()}}),n,this,[[1,16]])})))}},{key:"selectSchedule",value:function(e){return D(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,this.admissionService.getScreeningEvent(e);case 3:this.router.navigate(["/admission/check"]),n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),console.error(n.t0),this.router.navigate(["/error"]);case 9:case"end":return n.stop()}}),n,this,[[0,6]])})))}},{key:"notSpecified",value:function(){this.admissionService.delete(),this.router.navigate(["/admission/check"])}},{key:"setDatePicker",value:function(){var e=this;this.user.subscribe((function(n){e.localeService.use(n.language)})).unsubscribe()}},{key:"toggleDatepicker",value:function(){this.setDatePicker(),this.datepicker.toggle()}},{key:"onShowPicker",value:function(e){Object(x.t)(e,[this.datepicker])}}]),e}();j.ctorParameters=function(){return[{type:d.b},{type:r.b},{type:y.c},{type:p.a},{type:p.d},{type:p.j}]},w([Object(i.jb)("datepicker",{static:!0}),E("design:type",y.a)],j.prototype,"datepicker",void 0),j=w([Object(i.n)({selector:"app-admission-schedule",template:R(t("5Yqj")).default,styles:[R(t("OqUh")).default]}),E("design:paramtypes",[d.b,r.b,y.c,p.a,p.d,p.j])],j);var I=[{path:"",component:c.a,canActivate:[o.a,o.c],children:[{path:"schedule",component:j},{path:"check",component:k}]}],O=function e(){_classCallCheck(this,e)};O=function(e,n,t,s){var i,a=arguments.length,r=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,n,t,s);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(a<3?i(r):a>3?i(n,t,r):i(n,t))||r);return a>3&&r&&Object.defineProperty(n,t,r),r}([Object(i.I)({imports:[r.c.forChild(I)],exports:[r.c]})],O);var C=function(e,n,t,s){var i,a=arguments.length,r=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,n,t,s);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(a<3?i(r):a>3?i(n,t,r):i(n,t))||r);return a>3&&r&&Object.defineProperty(n,t,r),r},S=function(e,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,n)},T=function(e){return e&&e.__esModule?e:{default:e}},P=function(){function e(){_classCallCheck(this,e),this.select=new i.v,this.moment=u,this.environment=Object(m.a)()}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}();C([Object(i.D)(),S("design:type",Object)],P.prototype,"screeningWorkEvent",void 0),C([Object(i.P)(),S("design:type",Object)],P.prototype,"select",void 0),P=C([Object(i.n)({selector:"app-admission-schedule-work",template:T(t("BMVQ")).default,styles:[T(t("+r+q")).default]}),S("design:paramtypes",[])],P),t.d(n,"AdmissionModule",(function(){return L}));var L=function e(){_classCallCheck(this,e)};L=function(e,n,t,s){var i,a=arguments.length,r=a<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,n,t,s);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(a<3?i(r):a>3?i(n,t,r):i(n,t))||r);return a>3&&r&&Object.defineProperty(n,t,r),r}([Object(i.I)({declarations:[j,k,P],imports:[s.b,O,a.a]})],L)},mfvb:function(e,n,t){"use strict";t.r(n),n.default='\x3c!-- <div class="contents-width mx-auto px-3 pt-5">\n    <h2 class="text-large mb-4 text-center font-weight-bold">{{ \'admission.check.title\' | translate }}</h2>\n    <p class="mb-4 text-md-center" [innerHTML]="\'admission.check.read\' | translate"></p>\n</div> --\x3e\n\n<div class="contents-width mx-auto px-3 pt-4">\n    <div class="buttons mx-auto text-center mb-4">\n        <button type="button" class="btn btn-success btn-block py-3"\n            (click)="openQRCodeReader()">{{ \'admission.check.camera.start\' | translate }}</button>\n    </div>\n</div>\n\n\n<div *ngIf="!(isLoading | async)" class="mb-4">\n    <div *ngIf="(admission | async).qrcodeToken">\n        <div *ngIf="(admission | async).qrcodeToken.availableReservation" class="position-relative p-4 bg-success text-white text-center">\n            <div class="color rounded border border-white" [ngStyle]="{\'background-color\': (admission | async).qrcodeToken.availableReservation.reservedTicket.ticketType.color}"></div>\n            <div *ngIf="(admission | async).qrcodeToken.checkTokenActions.length === 0"\n                class="flash-text text-xx-large font-weight-bold mb-2">{{ \'admission.check.success\' | translate }}</div>\n            <div *ngIf="(admission | async).qrcodeToken.checkTokenActions.length > 0"\n                class="flash-text text-xx-large font-weight-bold mb-2">{{ \'admission.check.reEntry\' | translate }}</div>\n            <p *ngIf="(admission | async).qrcodeToken.availableReservation.reservedTicket.ticketedSeat">\n                <strong class="mr-2">{{ \'common.seat\' | translate }}</strong>\n                {{ (admission | async).qrcodeToken.availableReservation.reservedTicket.ticketedSeat.seatNumber }}\n            </p>\n            <p>\n                <strong class="mr-2">{{ \'common.ticket\' | translate }}</strong>\n                {{ (admission | async).qrcodeToken.availableReservation.reservedTicket.ticketType.name | changeLanguage }}\n            </p>\n            <p>\n                <strong class="mr-2">{{ \'admission.check.entryCount\' | translate }}</strong>\n                {{ (admission | async).qrcodeToken.checkTokenActions.length }}\n            </p>\n        </div>\n        <div *ngIf="!(admission | async).qrcodeToken.availableReservation" class="p-4 bg-danger text-white text-center">\n            <div class="flash-text text-xx-large font-weight-bold mb-2">{{ \'admission.check.danger\' | translate }}</div>\n            <p *ngIf="(admission | async).qrcodeToken.statusCode === 200">\n                {{ \'admission.check.alert.event\' | translate }}<br>\n                <strong>{{ (admission | async).qrcodeToken.statusCode }}</strong>\n\n            </p>\n            <p *ngIf="(admission | async).qrcodeToken.statusCode !== 200">\n                {{ \'admission.check.alert.qrcode\' | translate }}<br>\n                <strong>{{ (admission | async).qrcodeToken.statusCode }}</strong>\n            </p>\n        </div>\n    </div>\n    <div *ngIf="!(admission | async).qrcodeToken" class="p-4 bg-dark text-white text-center">\n        <div class="text-xx-large font-weight-bold mb-2">{{ \'admission.check.waiting\' | translate }}</div>\n        <p>{{ \'admission.check.alert.waiting\' | translate }}</p>\n    </div>\n</div>\n\n\n<div class="contents-width mx-auto px-3 pb-5">\n    <div *ngIf="(admission | async).screeningEvent" class="mb-4 bg-white">\n        <div class="p-3">\n            <div class="mb-2">\n                <p class="font-weight-bold text-large">{{ (admission | async).screeningEvent.name | changeLanguage }}</p>\n                <p *ngIf="(admission | async).screeningEvent.workPerformed.headline" class="text-small">\n                    {{ (admission | async).screeningEvent.workPerformed.headline }}\n                </p>\n                <p *ngIf="(admission | async).screeningEvent.superEvent.description && ((admission | async).screeningEvent.superEvent.description | changeLanguage)"\n                    class="text-small">\n                    {{ (admission | async).screeningEvent.superEvent.description | changeLanguage }}\n                </p>\n            </div>\n            <div class="d-flex align-items-center mb-2">\n                <div *ngIf="(admission | async).screeningEvent.workPerformed.contentRating"\n                    class="text-small text-white bg-dark py-1 px-3 mr-2">{{\n                (admission | async).screeningEvent.workPerformed.contentRating }}</div>\n                <div *ngIf="(admission | async).screeningEvent.superEvent.dubLanguage"\n                    class="text-small text-white bg-dark py-1 px-3 mr-2">{{ \'common.dubbing\' | translate }}</div>\n                <div *ngIf="(admission | async).screeningEvent.superEvent.subtitleLanguage"\n                    class="text-small text-white bg-dark py-1 px-3 mr-2">{{ \'common.subtitles\' | translate }}</div>\n                <div *ngIf="(admission | async).screeningEvent.workPerformed?.duration && moment.duration((admission | async).screeningEvent.workPerformed?.duration).asMinutes() > 0"\n                    class="text-small ml-auto">\n                    <span class="mr-1">{{ \'common.duration\' | translate }}</span>{{ moment.duration((admission | async).screeningEvent.workPerformed?.duration).asMinutes() }}{{ \'common.date.minute\' | translate }}\n                </div>\n            </div>\n        </div>\n        <div class="p-3">\n            <p class="theater-name">{{ (admission | async).screeningEvent.superEvent.location.name | changeLanguage }}</p>\n            <p class="screen-name">\n                <span *ngIf="(admission | async).screeningEvent.location.address" class="mr-2">\n                    {{ (admission | async).screeningEvent.location.address | changeLanguage }}\n                </span>\n                <span>\n                    {{ (admission | async).screeningEvent.location.name | changeLanguage }}\n                </span>\n            </p>\n            <div>\n                <p class="mr-3">\n                    <strong class="mr-2">{{ \'common.doorTime\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.doorTime | formatDate: \'MM/DD (ddd) HH:mm\' }}\n                </p>\n                <p>\n                    <strong class="mr-2">{{ \'common.startDate\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.startDate | formatDate: \'MM/DD (ddd) HH:mm\' }} -\n                    {{ (admission | async).screeningEvent.endDate | formatDate: \'HH:mm\' }}\n                </p>\n                <p class="mr-3">\n                    <strong class="mr-2">{{ \'common.reservation\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.maximumAttendeeCapacity - (admission |\n                async).screeningEvent.remainingAttendeeCapacity }}\n                </p>\n                <p>\n                    <strong class="mr-2">{{ \'common.admission\' | translate }}</strong>\n                    {{ (admission | async).screeningEvent.attendeeCount }}\n                </p>\n            </div>\n        </div>\n    </div>\n    \x3c!-- <div class="p-3 mb-4 bg-light-gray">\n        <p><strong class="mr-2">\u672a\u9001\u4fe1\u4ef6\u6570</strong> {{ (admission | async).usentList.length }}</p>\n        <p>\u203b1\u5206\u306b1\u56de\u9001\u4fe1\u3055\u308c\u307e\u3059</p>\n    </div> --\x3e\n\n    <div class="buttons mx-auto text-center">\n        <button type="button" class="btn btn-link"\n            routerLink="/admission/schedule">{{ \'admission.schedule.prev\' | translate }}</button>\n    </div>\n\n</div>'},oN8W:function(e,n,t){"use strict";t.r(n),n.default=".video-area {\n  height: 25vh;\n  overflow: hidden;\n}\n\n.flash-text {\n  -webkit-animation-duration: 3s;\n          animation-duration: 3s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-name: flash-text;\n          animation-name: flash-text;\n}\n\n.color {\n  position: absolute;\n  top: 0.5rem;\n  left: 0.5rem;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n@-webkit-keyframes flash-text {\n  from, 20%, 40%, 60%, 80%, to {\n    color: #FFF;\n  }\n  10%, 30%, 50%, 70%, 90% {\n    color: transparent;\n  }\n}\n\n@keyframes flash-text {\n  from, 20%, 40%, 60%, 80%, to {\n    color: #FFF;\n  }\n  10%, 30%, 50%, 70%, 90% {\n    color: transparent;\n  }\n}"}}]);