!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{AL2A:function(n,r,o){"use strict";o.r(r),o.d(r,"SettingModule",(function(){return ut}));var i=o("2kYt"),c=o("DSWM"),a=o("sEIs"),s=o("RRjC"),l=o("nIj0"),d=o("sN6X"),u=o("ddJ1"),p=o("x8Mb"),m=o("PIN6"),f=o("cHUu"),g=o("mOXJ"),h=o("UH/6"),v=o("EM62"),y=o("s2Ay"),w=o("OSFB"),F=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function c(t){try{s(r.next(t))}catch(e){i(e)}}function a(t){try{s(r.throw(t))}catch(e){i(e)}}function s(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,a)}s((r=r.apply(t,e||[])).next())}))},I=["intlTelInput"];function P(t,e){if(1&t&&(v.Pc(0,"p"),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t){var n=v.Yc(2).$implicit;v.wc(1),v.Ad(v.ad(2,1,"form.label."+n))}}function b(t,e){if(1&t&&(v.Pc(0,"p"),v.zd(1),v.Zc(2,"changeLanguage"),v.Oc()),2&t){var n,r=v.Yc(2).$implicit,o=v.Yc(2);v.wc(1),v.Bd(" ",v.ad(2,1,null==(n=o.getAdditionalProperty(r))?null:n.label),"")}}function x(t,e){1&t&&(v.Pc(0,"p",28),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd("",v.ad(2,1,"form.required")," "))}function O(t,e){if(1&t&&(v.Kc(0,"input",29),v.Zc(1,"translate")),2&t){var n=v.Yc(2).$implicit;v.ed("formControlName",n)("id",n)("placeholder",v.ad(1,3,"form.placeholder."+n))}}function C(t,e){if(1&t&&(v.Pc(0,"option",33),v.zd(1),v.Zc(2,"changeLanguage"),v.Oc()),2&t){var n=e.$implicit;v.ed("value",n.id),v.wc(1),v.Bd(" ",v.ad(2,2,n.name),"")}}function k(t,e){if(1&t){var n=v.Qc();v.Pc(0,"select",30),v.Wc("change",(function(){return v.rd(n),v.Yc(4).changeTheater()})),v.Pc(1,"option",31),v.zd(2),v.Zc(3,"translate"),v.Oc(),v.xd(4,C,3,4,"option",32),v.Oc()}if(2&t){var r=v.Yc(2).$implicit,o=v.Yc(2);v.ed("formControlName",r),v.wc(2),v.Ad(v.ad(3,3,"setting.unselected")),v.wc(2),v.ed("ngForOf",o.theaters)}}function A(t,e){if(1&t&&(v.Pc(0,"option",33),v.zd(1),v.Oc()),2&t){var n=e.$implicit;v.ed("value",n.id),v.wc(1),v.Ad(n.name)}}function N(t,e){if(1&t&&(v.Pc(0,"select",34),v.Pc(1,"option",31),v.zd(2),v.Zc(3,"translate"),v.Oc(),v.xd(4,A,2,2,"option",32),v.Oc()),2&t){var n=v.Yc(2).$implicit,r=v.Yc(2);v.ed("formControlName",n),v.wc(2),v.Ad(v.ad(3,3,"setting.unselected")),v.wc(2),v.ed("ngForOf",r.posList)}}function S(t,e){if(1&t&&(v.Pc(0,"option",33),v.zd(1),v.Zc(2,"changeLanguage"),v.Oc()),2&t){var n=e.$implicit;v.ed("value",n.identifier),v.wc(1),v.Bd(" ",v.ad(2,2,n.name),"")}}function T(t,e){if(1&t&&(v.Pc(0,"select",34),v.Pc(1,"option",31),v.zd(2),v.Zc(3,"translate"),v.Oc(),v.xd(4,S,3,4,"option",32),v.Oc()),2&t){var n=v.Yc(2).$implicit,r=v.Yc(2);v.ed("formControlName",n),v.wc(2),v.Ad(v.ad(3,3,"setting.unselected")),v.wc(2),v.ed("ngForOf",r.entranceGateList)}}function L(t,e){if(1&t&&(v.Pc(0,"option",33),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t){var n=e.$implicit;v.ed("value",n.connectionType),v.wc(1),v.Bd(" ",v.ad(2,2,n.name),"")}}function Y(t,e){if(1&t){var n=v.Qc();v.Pc(0,"select",30),v.Wc("change",(function(){return v.rd(n),v.Yc(4).changePrinterType()})),v.xd(1,L,3,4,"option",32),v.Oc()}if(2&t){var r=v.Yc(2).$implicit,o=v.Yc(2);v.ed("formControlName",r),v.wc(1),v.ed("ngForOf",o.printers)}}function Z(t,e){if(1&t&&(v.Pc(0,"select",35),v.Pc(1,"option",36),v.zd(2),v.Zc(3,"translate"),v.Oc(),v.Pc(4,"option",37),v.zd(5),v.Zc(6,"translate"),v.Oc(),v.Oc()),2&t){var n=v.Yc(2).$implicit;v.ed("formControlName",n)("id",n),v.wc(2),v.Ad(v.ad(3,4,"form.option.false")),v.wc(3),v.Ad(v.ad(6,6,"form.option.true"))}}function z(t,e){if(1&t&&(v.Kc(0,"input",38),v.Zc(1,"translate")),2&t){var n=v.Yc(2).$implicit;v.ed("formControlName",n)("id",n)("placeholder",v.ad(1,3,"form.placeholder."+n))}}var G=function(t){return[t]},$=function(t,e){return[t,e]};function B(t,e){if(1&t&&v.Kc(0,"ngx-intl-tel-input",39,40),2&t){var n=v.Yc(4);v.ed("preferredCountries",v.hd(11,G,n.CountryISO.Japan))("enableAutoCountrySelect",!1)("enablePlaceholder",!0)("searchCountryFlag",!0)("searchCountryField",v.id(13,$,n.SearchCountryField.Iso2,n.SearchCountryField.Name))("selectFirstCountry",!1)("selectedCountryISO",n.CountryISO.Japan)("maxLength",15)("tooltipField",n.TooltipLabel.Name)("phoneValidation",!0)("separateDialCode",!1)}}function J(t,e){if(1&t&&(v.Pc(0,"option",33),v.zd(1),v.Zc(2,"changeLanguage"),v.Oc()),2&t){var n=e.$implicit;v.ed("value",n.value),v.wc(1),v.Bd(" ",v.ad(2,2,n.label)," ")}}function E(t,e){if(1&t&&(v.Pc(0,"select",35),v.xd(1,J,3,4,"option",32),v.Oc()),2&t){var n,r=v.Yc(2).$implicit,o=null==(n=v.Yc(2).getProfileProperty(r))?null:n.option;v.ed("formControlName",r)("id",r),v.wc(1),v.ed("ngForOf",o)}}function R(t,e){if(1&t&&v.Kc(0,"input",41),2&t){var n=v.Yc(2).$implicit;v.ed("formControlName",n)("id",n)}}function V(t,e){if(1&t&&v.Kc(0,"textarea",42),2&t){var n=v.Yc(2).$implicit;v.ed("formControlName",n)("id",n)}}function j(t,e){if(1&t&&(v.Pc(0,"option",33),v.zd(1),v.Zc(2,"changeLanguage"),v.Oc()),2&t){var n=e.$implicit;v.ed("value",n.value),v.wc(1),v.Bd(" ",v.ad(2,2,n.label)," ")}}function q(t,e){if(1&t&&(v.Pc(0,"select",42),v.xd(1,j,3,4,"option",32),v.Oc()),2&t){var n,r=v.Yc(2).$implicit,o=null==(n=v.Yc(2).getAdditionalProperty(r))?null:n.option;v.ed("formControlName",r)("id",r),v.wc(1),v.ed("ngForOf",o)}}function D(t,e){1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd(" ",v.ad(2,1,"form.validation.required")," "))}var K=function(t){return{value:t}};function M(t,e){if(1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t){var n=v.Yc(3).$implicit,r=v.Yc(2);v.wc(1),v.Bd(" ",v.bd(2,1,"form.validation.maxlength",v.hd(4,K,null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.maxlength.requiredLength))," ")}}function U(t,e){if(1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t){var n=v.Yc(3).$implicit,r=v.Yc(2);v.wc(1),v.Bd(" ",v.bd(2,1,"form.validation.minlength",v.hd(4,K,null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.minlength.requiredLength))," ")}}function H(t,e){1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd(" ",v.ad(2,1,"form.validation.email")," "))}function Q(t,e){1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd(" ",v.ad(2,1,"form.validation.telephone")," "))}function W(t,e){1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd(" ",v.ad(2,1,"form.validation.fullKana"),""))}function X(t,e){1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd(" ",v.ad(2,1,"form.validation.lowercaseLetters"),""))}function _(t,e){if(1&t&&(v.Pc(0,"div"),v.xd(1,W,3,3,"p",44),v.Zc(2,"async"),v.xd(3,X,3,3,"p",44),v.Zc(4,"async"),v.Oc()),2&t){var n,r,o=v.Yc(3).$implicit,i=v.Yc(2),c="ja"===(null==(n=v.ad(2,2,i.user))?null:n.language)&&(null==i.settingForm.controls[o].errors?null:i.settingForm.controls[o].errors.customPattern),a="ja"!==(null==(r=v.ad(4,4,i.user))?null:r.language)&&(null==i.settingForm.controls[o].errors?null:i.settingForm.controls[o].errors.customPattern);v.wc(1),v.ed("ngIf",c),v.wc(2),v.ed("ngIf",a)}}function tt(t,e){1&t&&(v.Pc(0,"p",45),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd(" ",v.ad(2,1,"form.validation.pattern")," "))}function et(t,e){if(1&t&&(v.Pc(0,"div",43),v.xd(1,D,3,3,"p",44),v.xd(2,M,3,6,"p",44),v.xd(3,U,3,6,"p",44),v.xd(4,H,3,3,"p",44),v.xd(5,Q,3,3,"p",44),v.xd(6,_,5,6,"div",15),v.xd(7,tt,3,3,"p",44),v.Oc()),2&t){var n=v.Yc(2).$implicit,r=v.Yc(2);v.wc(1),v.ed("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.required),v.wc(1),v.ed("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.maxlength),v.wc(1),v.ed("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.minlength),v.wc(1),v.ed("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.email),v.wc(1),v.ed("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.validatePhoneNumber),v.wc(1),v.ed("ngIf","familyName"===n||"givenName"===n),v.wc(1),v.ed("ngIf",null==r.settingForm.controls[n].errors?null:r.settingForm.controls[n].errors.pattern)}}function nt(t,e){if(1&t){var n=v.Qc();v.Pc(0,"div"),v.Pc(1,"button",46),v.Wc("click",(function(){return v.rd(n),v.Yc(4).print()})),v.zd(2),v.Zc(3,"translate"),v.Oc(),v.Oc()}if(2&t){var r=v.Yc(4);v.wc(1),v.ed("disabled",r.settingForm.controls.printerType.value===r.connectionType.None),v.wc(1),v.Ad(v.ad(3,2,"setting.testPrinting"))}}function rt(t,e){1&t&&(v.Pc(0,"p",47),v.zd(1),v.Zc(2,"translate"),v.Oc()),2&t&&(v.wc(1),v.Bd(" ",v.ad(2,1,"setting.printerIpAddressDescription")," "))}function ot(t,e){if(1&t){var n=v.Qc();v.Pc(0,"div"),v.Pc(1,"button",46),v.Wc("click",(function(){return v.rd(n),v.Yc(4).openDrawer()})),v.zd(2),v.Zc(3,"translate"),v.Oc(),v.Pc(4,"p",47),v.zd(5),v.Zc(6,"translate"),v.Oc(),v.Oc()}if(2&t){var r=v.Yc(4);v.wc(1),v.ed("disabled","0"===r.settingForm.controls.drawer.value),v.wc(1),v.Ad(v.ad(3,3,"setting.openDrawer")),v.wc(3),v.Bd(" ",v.ad(6,5,"setting.drawerDescription")," ")}}function it(t,e){if(1&t&&(v.Pc(0,"div",12),v.Pc(1,"div",13),v.Pc(2,"div",14),v.xd(3,P,3,3,"p",15),v.xd(4,b,3,3,"p",15),v.xd(5,x,3,3,"p",16),v.Oc(),v.Oc(),v.Pc(6,"div",17),v.xd(7,O,2,5,"input",18),v.xd(8,k,5,5,"select",19),v.xd(9,N,5,5,"select",20),v.xd(10,T,5,5,"select",20),v.xd(11,Y,2,2,"select",19),v.xd(12,Z,7,8,"select",21),v.xd(13,z,2,5,"input",22),v.xd(14,B,2,16,"ngx-intl-tel-input",23),v.xd(15,E,2,3,"select",21),v.xd(16,R,1,2,"input",24),v.xd(17,V,1,2,"textarea",25),v.xd(18,q,2,3,"select",25),v.xd(19,et,8,7,"div",26),v.xd(20,nt,4,4,"div",15),v.xd(21,rt,3,3,"p",27),v.xd(22,ot,7,7,"div",15),v.Oc(),v.Oc()),2&t){var n,r=v.Yc().$implicit,o=v.Yc(2),i=null,c=o.getAdditionalProperty(r)&&"input"===(null==(i=o.getAdditionalProperty(r))?null:i.inputType),a="textarea"===(null==(n=o.getAdditionalProperty(r))?null:n.inputType),s=null,l=o.getAdditionalProperty(r)&&"select"===(null==(s=o.getAdditionalProperty(r))?null:s.inputType);v.wc(3),v.ed("ngIf",!o.getAdditionalProperty(r)),v.wc(1),v.ed("ngIf",o.getAdditionalProperty(r)),v.wc(1),v.ed("ngIf",o.isRequired(r)),v.wc(2),v.ed("ngIf","theaterId"!==r&&"posId"!==r&&"entranceGateId"!==r&&"printerType"!==r&&"email"!==r&&"telephone"!==r&&"gender"!==r&&"drawer"!==r&&!o.getAdditionalProperty(r)),v.wc(1),v.ed("ngIf","theaterId"===r),v.wc(1),v.ed("ngIf","posId"===r),v.wc(1),v.ed("ngIf","entranceGateId"===r),v.wc(1),v.ed("ngIf","printerType"===r),v.wc(1),v.ed("ngIf","drawer"===r),v.wc(1),v.ed("ngIf","email"===r),v.wc(1),v.ed("ngIf","telephone"===r),v.wc(1),v.ed("ngIf","gender"===r),v.wc(1),v.ed("ngIf",c),v.wc(1),v.ed("ngIf",a),v.wc(1),v.ed("ngIf",l),v.wc(1),v.ed("ngIf",o.settingForm.controls[r].invalid&&o.settingForm.controls[r].touched),v.wc(1),v.ed("ngIf","printerType"===r),v.wc(1),v.ed("ngIf","printerIpAddress"===r),v.wc(1),v.ed("ngIf","drawer"===r)}}function ct(t,e){if(1&t&&(v.Nc(0),v.xd(1,it,23,19,"div",11),v.Mc()),2&t){var n=e.$implicit,r=v.Yc(2);v.wc(1),v.ed("ngIf",!("posId"===n&&0===r.posList.length||"entranceGateId"===n&&0===r.entranceGateList.length))}}function at(t,e){if(1&t){var n=v.Qc();v.Pc(0,"form",2),v.Pc(1,"div",3),v.Pc(2,"h2",4),v.zd(3),v.Zc(4,"translate"),v.Oc(),v.Kc(5,"p",5),v.Zc(6,"translate"),v.Pc(7,"div",6),v.xd(8,ct,2,1,"ng-container",7),v.Oc(),v.Oc(),v.Pc(9,"div",8),v.Pc(10,"button",9),v.Wc("click",(function(){return v.rd(n),v.Yc().onSubmit()})),v.Zc(11,"async"),v.zd(12),v.Zc(13,"translate"),v.Oc(),v.Pc(14,"button",10),v.zd(15),v.Zc(16,"translate"),v.Oc(),v.Oc(),v.Oc()}if(2&t){var r=v.Yc();v.ed("formGroup",r.settingForm),v.wc(3),v.Ad(v.ad(4,8,"setting.title")),v.wc(2),v.ed("innerHTML",v.ad(6,10,"setting.read"),v.sd),v.wc(3),v.ed("ngForOf",r.getProfileFormKeys()),v.wc(2),v.ed("disabled",v.ad(11,12,r.isLoading)),v.wc(2),v.Ad(v.ad(13,14,"setting.next")),v.wc(2),v.ed("routerLink",r.environment.BASE_URL),v.wc(1),v.Ad(v.ad(16,16,"setting.prev"))}}var st=function(){function n(e,r,o,i,c,a,s){t(this,n),this.formBuilder=e,this.store=r,this.utilService=o,this.actionService=i,this.masterService=c,this.translate=a,this.router=s,this.printers=p.b.Util.Printer.printers,this.connectionType=p.b.Util.Printer.ConnectionType,this.viewType=p.b.Util.ViewType,this.environment=Object(m.a)(),this.SearchCountryField=u.e,this.TooltipLabel=u.f,this.CountryISO=u.a}var r,o,i;return r=n,(o=[{key:"ngOnInit",value:function(){return F(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.user=this.store.pipe(Object(d.m)(g.i)),this.error=this.store.pipe(Object(d.m)(g.b)),this.isLoading=this.store.pipe(Object(d.m)(g.c)),this.theaters=[],this.posList=[],this.entranceGateList=[],t.prev=1,t.next=4,this.masterService.searchMovieTheaters();case 4:return this.theaters=t.sent,t.next=7,this.createSettlingForm();case 7:t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),console.error(t.t0),this.router.navigate(["/error"]);case 12:setTimeout((function(){if(void 0!==e.intlTelInput){var t=e.intlTelInput.allCountries.find((function(t){return t.iso2===u.a.Japan}));void 0!==t&&(t.placeHolder=e.translate.instant("form.placeholder.telephone"))}}),0);case 13:case"end":return t.stop()}}),t,this,[[1,9]])})))}},{key:"createSettlingForm",value:function(){return F(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,r,o,i=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.environment.PROFILE,this.settingForm=this.formBuilder.group({theaterId:["",[l.s.required]],posId:[""],entranceGateId:[""],printerType:[p.b.Util.Printer.ConnectionType.None],printerIpAddress:[""],drawer:[!1]}),e.forEach((function(t){var e=[];void 0!==t.required&&t.required&&e.push(l.s.required),void 0!==t.maxLength&&e.push(l.s.maxLength(t.maxLength)),void 0!==t.minLength&&e.push(l.s.minLength(t.minLength)),void 0!==t.pattern&&e.push(l.s.pattern(t.pattern)),"email"===t.key&&e.push(l.s.email),i.settingForm.addControl(t.key,new l.c(t.value,e))})),t.next=4,this.actionService.user.getData();case 4:if(void 0!==(n=t.sent).theater&&(this.settingForm.controls.theaterId.setValue(n.theater.id),this.changeTheater()),void 0!==n.pos&&this.settingForm.controls.posId.setValue(n.pos.id),void 0!==n.entranceGate&&void 0!==n.entranceGate.identifier&&this.settingForm.controls.entranceGateId.setValue(n.entranceGate.identifier),void 0===(r=n.customerContact)){t.next=13;break}if(Object.keys(r).forEach((function(t){var e=r[t];void 0!==e&&void 0!==i.settingForm.controls[t]&&("telephone"!==t?i.settingForm.controls[t].setValue(e):i.settingForm.controls.telephone.setValue((new h.a).transform(e)))})),void 0!==(o=r.additionalProperty)){t.next=12;break}return t.abrupt("return");case 12:o.forEach((function(t){var e="additionalProperty."+t.name,n=t.value;void 0!==n&&void 0!==i.settingForm.controls[e]&&i.settingForm.controls[e].setValue(n)}));case 13:void 0!==n.printer&&(this.settingForm.controls.printerType.setValue(n.printer.connectionType),this.settingForm.controls.printerIpAddress.setValue(n.printer.ipAddress)),this.settingForm.controls.drawer.setValue(void 0!==n.drawer&&n.drawer?"1":"0");case 14:case"end":return t.stop()}}),t,this)})))}},{key:"changeTheater",value:function(){this.settingForm.controls.posId.setValue(""),this.settingForm.controls.entranceGateId.setValue("");var t=this.settingForm.controls.theaterId.value,e=this.theaters.find((function(e){return e.id===t}));if(""===t||void 0===e)return this.posList=[],void(this.entranceGateList=[]);this.posList=void 0===e.hasPOS?[]:e.hasPOS,this.entranceGateList=void 0===e.hasEntranceGate?[]:e.hasEntranceGate}},{key:"onSubmit",value:function(){return F(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e,n,r,o,i,c,a,s=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Object.keys(this.settingForm.controls).forEach((function(t){s.settingForm.controls[t].markAsTouched()})),!this.settingForm.invalid){t.next=4;break}this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.validation")}),t.next=15;break;case 4:if(t.prev=4,e=this.settingForm.controls.theaterId.value,n=this.settingForm.controls.posId.value,r=this.settingForm.controls.entranceGateId.value,void 0!==(o=this.theaters.find((function(t){return t.id===e})))){t.next=8;break}throw new Error("theater not found");case 8:i=void 0===o.hasPOS?void 0:o.hasPOS.find((function(t){return t.id===n})),c=void 0===o.hasEntranceGate?void 0:o.hasEntranceGate.find((function(t){return t.identifier===r})),a=[],Object.keys(this.settingForm.controls).forEach((function(t){/additionalProperty/.test(t)&&a.push({name:t.replace("additionalProperty.",""),value:s.settingForm.controls[t].value})})),this.actionService.user.updateAll({theater:o,pos:i,entranceGate:c,customerContact:{familyName:void 0===this.settingForm.controls.familyName?void 0:this.settingForm.controls.familyName.value,givenName:void 0===this.settingForm.controls.givenName?void 0:this.settingForm.controls.givenName.value,email:void 0===this.settingForm.controls.email?void 0:this.settingForm.controls.email.value,telephone:void 0===this.settingForm.controls.telephone?void 0:this.settingForm.controls.telephone.value.e164Number,age:void 0===this.settingForm.controls.age?void 0:this.settingForm.controls.age.value,address:void 0===this.settingForm.controls.address?void 0:this.settingForm.controls.address.value,gender:void 0===this.settingForm.controls.gender?void 0:this.settingForm.controls.gender.value,additionalProperty:a},printer:{ipAddress:this.settingForm.controls.printerIpAddress.value,connectionType:this.settingForm.controls.printerType.value},drawer:"0"!==this.settingForm.controls.drawer.value}),this.utilService.openAlert({title:this.translate.instant("common.complete"),body:this.translate.instant("setting.alert.success")}),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(4),console.error(t.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:"",error:"{}"===JSON.stringify(t.t0)?t.t0:JSON.stringify(t.t0)});case 15:case"end":return t.stop()}}),t,this,[[4,12]])})))}},{key:"print",value:function(){return F(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value},t.prev=1,t.next=4,this.actionService.order.print({orders:[],printer:e});case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.error(t.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.print"),error:"{}"===JSON.stringify(t.t0)?t.t0:JSON.stringify(t.t0)});case 9:case"end":return t.stop()}}),t,this,[[1,6]])})))}},{key:"openDrawer",value:function(){return F(this,void 0,void 0,regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={connectionType:this.settingForm.controls.printerType.value,ipAddress:this.settingForm.controls.printerIpAddress.value},t.prev=1,t.next=4,this.actionService.order.openDrawer({printer:e});case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),this.utilService.loadEnd(),console.error(t.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("setting.alert.drawer"),error:"{}"===JSON.stringify(t.t0)?t.t0:JSON.stringify(t.t0)});case 9:case"end":return t.stop()}}),t,this,[[1,6]])})))}},{key:"changePrinterType",value:function(){this.settingForm.controls.printerType.value===p.b.Util.Printer.ConnectionType.StarBluetooth&&this.settingForm.controls.printerIpAddress.setValue(this.translate.instant("setting.starBluetoothAddress"))}},{key:"isRequired",value:function(t){return"theaterId"===t||void 0!==this.environment.PROFILE.find((function(e){return e.key===t&&e.required}))}},{key:"getProfileFormKeys",value:function(){return Object.keys(this.settingForm.controls)}},{key:"getProfileProperty",value:function(t){return this.environment.PROFILE.find((function(e){return e.key===t}))}},{key:"getAdditionalProperty",value:function(t){return this.environment.PROFILE.find((function(e){return/additionalProperty/.test(e.key)&&e.key===t}))}}])&&e(r.prototype,o),i&&e(r,i),n}();st.\u0275fac=function(t){return new(t||st)(v.Jc(l.b),v.Jc(d.b),v.Jc(f.f),v.Jc(f.a),v.Jc(f.d),v.Jc(y.d),v.Jc(a.b))},st.\u0275cmp=v.Dc({type:st,selectors:[["app-setting"]],viewQuery:function(t,e){var n;1&t&&v.Fd(I,!0),2&t&&v.nd(n=v.Xc())&&(e.intlTelInput=n.first)},decls:2,vars:1,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[3,"formGroup",4,"ngIf"],[3,"formGroup"],[1,"mb-4"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"p-3","bg-white"],[4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","submit",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"disabled","click"],["type","button",1,"btn","btn-outline-primary","btn-block","py-3",3,"routerLink"],["class","form-group row",4,"ngIf"],[1,"form-group","row"],[1,"col-md-4","py-2","text-md-right"],[1,"d-inline-flex","align-items-center"],[4,"ngIf"],["class","badge badge-danger ml-2",4,"ngIf"],[1,"col-md-8"],["type","text","class","form-control",3,"formControlName","id","placeholder",4,"ngIf"],["class","form-control",3,"formControlName","change",4,"ngIf"],["class","form-control",3,"formControlName",4,"ngIf"],["class","form-control",3,"formControlName","id",4,"ngIf"],["type","email","class","form-control",3,"formControlName","id","placeholder",4,"ngIf"],["inputId","telephone","name","telephone","formControlName","telephone",3,"preferredCountries","enableAutoCountrySelect","enablePlaceholder","searchCountryFlag","searchCountryField","selectFirstCountry","selectedCountryISO","maxLength","tooltipField","phoneValidation","separateDialCode",4,"ngIf"],["type","text","class","form-control","placeholder","",3,"formControlName","id",4,"ngIf"],["class","form-control","placeholder","",3,"formControlName","id",4,"ngIf"],["class","mt-2",4,"ngIf"],["class","text-small mt-2",4,"ngIf"],[1,"badge","badge-danger","ml-2"],["type","text",1,"form-control",3,"formControlName","id","placeholder"],[1,"form-control",3,"formControlName","change"],["value",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"form-control",3,"formControlName"],[1,"form-control",3,"formControlName","id"],["value","0"],["value","1"],["type","email",1,"form-control",3,"formControlName","id","placeholder"],["inputId","telephone","name","telephone","formControlName","telephone",3,"preferredCountries","enableAutoCountrySelect","enablePlaceholder","searchCountryFlag","searchCountryField","selectFirstCountry","selectedCountryISO","maxLength","tooltipField","phoneValidation","separateDialCode"],["intlTelInput",""],["type","text","placeholder","",1,"form-control",3,"formControlName","id"],["placeholder","",1,"form-control",3,"formControlName","id"],[1,"mt-2"],["class","text-danger",4,"ngIf"],[1,"text-danger"],["type","button",1,"btn","btn-sm","btn-primary","py-2","mt-2",3,"disabled","click"],[1,"text-small","mt-2"]],template:function(t,e){1&t&&(v.Pc(0,"div",0),v.xd(1,at,17,18,"form",1),v.Oc()),2&t&&(v.wc(1),v.ed("ngIf",e.settingForm))},directives:[i.l,l.u,l.l,l.e,i.k,a.c,l.a,l.k,l.d,u.b,l.r,l.o,l.t,u.c],pipes:[y.c,i.b,w.a],styles:[""]});var lt=[{path:"",component:s.a,children:[{path:"",component:st}]}],dt=function e(){t(this,e)};dt.\u0275mod=v.Hc({type:dt}),dt.\u0275inj=v.Gc({factory:function(t){return new(t||dt)},imports:[[a.d.forChild(lt)],a.d]});var ut=function e(){t(this,e)};ut.\u0275mod=v.Hc({type:ut}),ut.\u0275inj=v.Gc({factory:function(t){return new(t||ut)},imports:[[i.c,dt,c.a]]})}}])}();