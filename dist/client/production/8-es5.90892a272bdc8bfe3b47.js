function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var c=n[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{dzKq:function(e,n,t){"use strict";t.r(n),t.d(n,"AdmissionModule",(function(){return fe}));var c=t("2kYt"),i=t("DSWM"),d=t("sEIs"),r=t("unpb"),s=t("RRjC"),a=t("sN6X"),o=t("wgY5"),l=t("PIN6"),u=t("cHUu"),m=t("mOXJ"),g=t("EM62"),f=t("s2Ay"),v=t("OSFB"),p=t("NSn/"),h=function(e,n,t,c){return new(t||(t=Promise))((function(i,d){function r(e){try{a(c.next(e))}catch(n){d(n)}}function s(e){try{a(c.throw(e))}catch(n){d(n)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,s)}a((c=c.apply(e,n||[])).next())}))};function y(e,n){1&e&&(g.Rc(0,"div",17),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Ed(g.dd(2,1,"admission.check.success")))}function k(e,n){1&e&&(g.Rc(0,"div",17),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Ed(g.dd(2,1,"admission.check.reEntry")))}function b(e,n){if(1&e&&(g.Rc(0,"p"),g.Rc(1,"strong",16),g.Dd(2),g.cd(3,"translate"),g.Qc(),g.Dd(4),g.cd(5,"async"),g.Qc()),2&e){var t,c=g.bd(4);g.yc(2),g.Ed(g.dd(3,2,"common.seat")),g.yc(2),g.Fd(" ",null==(t=g.dd(5,4,c.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketedSeat.seatNumber," ")}}var x=function(e){return{"background-color":e}};function E(e,n){if(1&e&&(g.Rc(0,"div",13),g.Mc(1,"div",14),g.cd(2,"async"),g.Bd(3,y,3,3,"div",15),g.cd(4,"async"),g.Bd(5,k,3,3,"div",15),g.cd(6,"async"),g.Bd(7,b,6,6,"p",9),g.cd(8,"async"),g.Rc(9,"p"),g.Rc(10,"strong",16),g.Dd(11),g.cd(12,"translate"),g.Qc(),g.Dd(13),g.cd(14,"changeLanguage"),g.cd(15,"async"),g.Qc(),g.Rc(16,"p"),g.Rc(17,"strong",16),g.Dd(18),g.cd(19,"translate"),g.Qc(),g.Dd(20),g.cd(21,"async"),g.Qc(),g.Qc()),2&e){var t,c,i,d,r,s,a=g.bd(3),o=g.ld(26,x,null==(t=g.dd(2,8,a.admission))?null:t.qrcodeToken.availableReservation.reservedTicket.ticketType.color),l=0===(null==(c=g.dd(4,10,a.admission))?null:c.qrcodeToken.checkTokenActions.length),u=(null==(i=g.dd(6,12,a.admission))?null:i.qrcodeToken.checkTokenActions.length)>0,m=null==(d=g.dd(8,14,a.admission))?null:d.qrcodeToken.availableReservation.reservedTicket.ticketedSeat;g.yc(1),g.id("ngStyle",o),g.yc(2),g.id("ngIf",l),g.yc(2),g.id("ngIf",u),g.yc(2),g.id("ngIf",m),g.yc(4),g.Ed(g.dd(12,16,"common.ticket")),g.yc(2),g.Fd(" ",g.dd(14,18,null==(r=g.dd(15,20,a.admission))?null:r.qrcodeToken.availableReservation.reservedTicket.ticketType.name)," "),g.yc(5),g.Ed(g.dd(19,22,"admission.check.entryCount")),g.yc(2),g.Fd(" ",null==(s=g.dd(21,24,a.admission))?null:s.qrcodeToken.checkTokenActions.length," ")}}function w(e,n){if(1&e&&(g.Rc(0,"p"),g.Dd(1),g.cd(2,"translate"),g.Mc(3,"br"),g.Rc(4,"strong"),g.Dd(5),g.cd(6,"async"),g.Qc(),g.Qc()),2&e){var t,c=g.bd(4);g.yc(1),g.Fd(" ",g.dd(2,2,"admission.check.alert.event"),""),g.yc(4),g.Ed(null==(t=g.dd(6,4,c.admission))?null:t.qrcodeToken.statusCode)}}function R(e,n){if(1&e&&(g.Rc(0,"p"),g.Dd(1),g.cd(2,"translate"),g.Mc(3,"br"),g.Rc(4,"strong"),g.Dd(5),g.cd(6,"async"),g.Qc(),g.Qc()),2&e){var t,c=g.bd(4);g.yc(1),g.Fd(" ",g.dd(2,2,"admission.check.alert.qrcode"),""),g.yc(4),g.Ed(null==(t=g.dd(6,4,c.admission))?null:t.qrcodeToken.statusCode)}}function D(e,n){if(1&e&&(g.Rc(0,"div",18),g.Rc(1,"div",17),g.Dd(2),g.cd(3,"translate"),g.Qc(),g.Bd(4,w,7,6,"p",9),g.cd(5,"async"),g.Bd(6,R,7,6,"p",9),g.cd(7,"async"),g.Qc()),2&e){var t,c,i=g.bd(3),d=200===(null==(t=g.dd(5,5,i.admission))?null:t.qrcodeToken.statusCode),r=200!==(null==(c=g.dd(7,7,i.admission))?null:c.qrcodeToken.statusCode);g.yc(2),g.Ed(g.dd(3,3,"admission.check.danger")),g.yc(2),g.id("ngIf",d),g.yc(2),g.id("ngIf",r)}}function Q(e,n){if(1&e&&(g.Rc(0,"div"),g.Bd(1,E,22,28,"div",11),g.cd(2,"async"),g.Bd(3,D,8,9,"div",12),g.cd(4,"async"),g.Qc()),2&e){var t,c,i=g.bd(2),d=null==(t=g.dd(2,2,i.admission))?null:t.qrcodeToken.availableReservation,r=!(null!=(c=g.dd(4,4,i.admission))&&c.qrcodeToken.availableReservation);g.yc(1),g.id("ngIf",d),g.yc(2),g.id("ngIf",r)}}function C(e,n){1&e&&(g.Rc(0,"div",19),g.Rc(1,"div",20),g.Dd(2),g.cd(3,"translate"),g.Qc(),g.Rc(4,"p"),g.Dd(5),g.cd(6,"translate"),g.Qc(),g.Qc()),2&e&&(g.yc(2),g.Ed(g.dd(3,2,"admission.check.waiting")),g.yc(3),g.Ed(g.dd(6,4,"admission.check.alert.waiting")))}function I(e,n){if(1&e&&(g.Rc(0,"div",8),g.Bd(1,Q,5,6,"div",9),g.cd(2,"async"),g.Bd(3,C,7,6,"div",10),g.cd(4,"async"),g.Qc()),2&e){var t,c,i=g.bd(),d=null==(t=g.dd(2,2,i.admission))?null:t.qrcodeToken,r=!(null!=(c=g.dd(4,4,i.admission))&&c.qrcodeToken);g.yc(1),g.id("ngIf",d),g.yc(2),g.id("ngIf",r)}}function P(e,n){if(1&e&&(g.Rc(0,"p",33),g.Dd(1),g.cd(2,"async"),g.Qc()),2&e){var t,c=g.bd(2);g.yc(1),g.Fd(" ",null==(t=g.dd(2,1,c.admission))||null==t.screeningEvent.workPerformed?null:t.screeningEvent.workPerformed.headline," ")}}function M(e,n){if(1&e&&(g.Rc(0,"p",33),g.Dd(1),g.cd(2,"changeLanguage"),g.cd(3,"async"),g.Qc()),2&e){var t,c=g.bd(2);g.yc(1),g.Fd(" ",g.dd(2,1,null==(t=g.dd(3,3,c.admission))?null:t.screeningEvent.superEvent.description)," ")}}function O(e,n){if(1&e&&(g.Rc(0,"div",34),g.Dd(1),g.cd(2,"async"),g.Qc()),2&e){var t,c=g.bd(2);g.yc(1),g.Ed(null==(t=g.dd(2,1,c.admission))||null==t.screeningEvent.workPerformed?null:t.screeningEvent.workPerformed.contentRating)}}function S(e,n){1&e&&(g.Rc(0,"div",34),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Ed(g.dd(2,1,"common.dubbing")))}function T(e,n){1&e&&(g.Rc(0,"div",34),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Ed(g.dd(2,1,"common.subtitles")))}function L(e,n){if(1&e&&(g.Rc(0,"div",35),g.Rc(1,"span",36),g.Dd(2),g.cd(3,"translate"),g.Qc(),g.Dd(4),g.cd(5,"async"),g.cd(6,"translate"),g.Qc()),2&e){var t,c=g.bd(2);g.yc(2),g.Ed(g.dd(3,3,"common.duration")),g.yc(2),g.Gd("",c.moment.duration(null==(t=g.dd(5,5,c.admission))||null==t.screeningEvent.workPerformed?null:t.screeningEvent.workPerformed.duration).asMinutes(),"",g.dd(6,7,"common.date.minute")," ")}}function _(e,n){if(1&e&&(g.Rc(0,"span",16),g.Dd(1),g.cd(2,"changeLanguage"),g.cd(3,"async"),g.Qc()),2&e){var t,c=g.bd(2);g.yc(1),g.Fd(" ",g.dd(2,1,null==(t=g.dd(3,3,c.admission))?null:t.screeningEvent.location.address)," ")}}function B(e,n){if(1&e&&(g.Rc(0,"div",21),g.Rc(1,"div",22),g.Rc(2,"div",23),g.Rc(3,"p",24),g.Dd(4),g.cd(5,"changeLanguage"),g.cd(6,"async"),g.Qc(),g.Bd(7,P,3,3,"p",25),g.cd(8,"async"),g.Bd(9,M,4,5,"p",25),g.cd(10,"async"),g.cd(11,"changeLanguage"),g.cd(12,"async"),g.Qc(),g.Rc(13,"div",26),g.Bd(14,O,3,3,"div",27),g.cd(15,"async"),g.Bd(16,S,3,3,"div",27),g.cd(17,"async"),g.Bd(18,T,3,3,"div",27),g.cd(19,"async"),g.Bd(20,L,7,9,"div",28),g.cd(21,"async"),g.cd(22,"async"),g.Qc(),g.Qc(),g.Rc(23,"div",22),g.Rc(24,"p",29),g.Dd(25),g.cd(26,"changeLanguage"),g.cd(27,"async"),g.Qc(),g.Rc(28,"p",30),g.Bd(29,_,4,5,"span",31),g.cd(30,"changeLanguage"),g.cd(31,"async"),g.Rc(32,"span"),g.Dd(33),g.cd(34,"changeLanguage"),g.cd(35,"async"),g.Qc(),g.Qc(),g.Rc(36,"div"),g.Rc(37,"p",32),g.Rc(38,"strong",16),g.Dd(39),g.cd(40,"translate"),g.Qc(),g.Dd(41),g.cd(42,"formatDate"),g.cd(43,"async"),g.Qc(),g.Rc(44,"p"),g.Rc(45,"strong",16),g.Dd(46),g.cd(47,"translate"),g.Qc(),g.Dd(48),g.cd(49,"formatDate"),g.cd(50,"async"),g.cd(51,"formatDate"),g.cd(52,"async"),g.Qc(),g.Rc(53,"p",32),g.Rc(54,"strong",16),g.Dd(55),g.cd(56,"translate"),g.Qc(),g.Dd(57),g.cd(58,"async"),g.cd(59,"async"),g.Qc(),g.Rc(60,"p"),g.Rc(61,"strong",16),g.Dd(62),g.cd(63,"translate"),g.Qc(),g.Dd(64),g.cd(65,"async"),g.Qc(),g.Qc(),g.Qc(),g.Qc()),2&e){var t,c,i,d,r,s,a,o,l,u,m=g.bd(),f=null==(c=g.dd(8,23,m.admission))||null==c.screeningEvent.workPerformed?null:c.screeningEvent.workPerformed.headline,v=null,p=(null==(v=g.dd(10,25,m.admission))?null:v.screeningEvent.superEvent.description)&&g.dd(11,27,null==(v=g.dd(12,29,m.admission))?null:v.screeningEvent.superEvent.description),h=null==(i=g.dd(15,31,m.admission))||null==i.screeningEvent.workPerformed?null:i.screeningEvent.workPerformed.contentRating,y=null==(d=g.dd(17,33,m.admission))?null:d.screeningEvent.superEvent.dubLanguage,k=null==(r=g.dd(19,35,m.admission))?null:r.screeningEvent.superEvent.subtitleLanguage,b=null,x=(null==(b=g.dd(21,37,m.admission))||null==b.screeningEvent.workPerformed?null:b.screeningEvent.workPerformed.duration)&&m.moment.duration(null==(b=g.dd(22,39,m.admission))||null==b.screeningEvent.workPerformed?null:b.screeningEvent.workPerformed.duration).asMinutes()>0,E=g.dd(30,45,null==(a=g.dd(31,47,m.admission))?null:a.screeningEvent.location.address),w=null,R=null;g.yc(4),g.Ed(g.dd(5,19,null==(t=g.dd(6,21,m.admission))?null:t.screeningEvent.name)),g.yc(3),g.id("ngIf",f),g.yc(2),g.id("ngIf",p),g.yc(5),g.id("ngIf",h),g.yc(2),g.id("ngIf",y),g.yc(2),g.id("ngIf",k),g.yc(2),g.id("ngIf",x),g.yc(5),g.Ed(g.dd(26,41,null==(s=g.dd(27,43,m.admission))?null:s.screeningEvent.superEvent.location.name)),g.yc(4),g.id("ngIf",E),g.yc(4),g.Fd(" ",g.dd(34,49,null==(o=g.dd(35,51,m.admission))?null:o.screeningEvent.location.name)," "),g.yc(6),g.Ed(g.dd(40,53,"common.doorTime")),g.yc(2),g.Fd(" ",g.ed(42,55,null==(l=g.dd(43,58,m.admission))?null:l.screeningEvent.doorTime,"MM/DD (ddd) HH:mm")," "),g.yc(5),g.Ed(g.dd(47,60,"common.startDate")),g.yc(2),g.Gd(" ",g.ed(49,62,null==(w=g.dd(50,65,m.admission))?null:w.screeningEvent.startDate,"MM/DD (ddd) HH:mm")," - ",g.ed(51,67,null==(w=g.dd(52,70,m.admission))?null:w.screeningEvent.endDate,"HH:mm")," "),g.yc(7),g.Ed(g.dd(56,72,"common.reservation")),g.yc(2),g.Fd(" ",(null==(R=g.dd(58,74,m.admission))?null:R.screeningEvent.maximumAttendeeCapacity)-(null==(R=g.dd(59,76,m.admission))?null:R.screeningEvent.remainingAttendeeCapacity)," "),g.yc(5),g.Ed(g.dd(63,78,"common.admission")),g.yc(2),g.Fd(" ",null==(u=g.dd(65,80,m.admission))?null:u.screeningEvent.attendeeCount," ")}}var F=function(){function e(n,t,c,i,d){_classCallCheck(this,e),this.store=n,this.admissionService=t,this.utilService=c,this.qrcodeService=i,this.translate=d,this.moment=o,this.environment=Object(l.a)()}return _createClass(e,[{key:"ngOnInit",value:function(){this.inputCode="",this.isLoading=this.store.pipe(Object(a.m)(m.c)),this.admission=this.store.pipe(Object(a.m)(m.a)),this.admissionService.initializeQrcodeToken()}},{key:"ngOnDestroy",value:function(){clearInterval(this.updateLoop)}},{key:"handleKeyboardEvent",value:function(e){"Enter"===e.key&&this.inputCode.length>0?(this.check(this.inputCode),this.inputCode=""):"Escape"!==e.key&&(this.inputCode+=e.key)}},{key:"check",value:function(e){return h(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,this.admissionService.checkQrcodeToken(e);case 3:n.next=8;break;case 5:n.prev=5,n.t0=n.catch(0),console.error(n.t0),this.utilService.openAlert({title:this.translate.instant("common.error"),body:this.translate.instant("admission.check.alert.check")});case 8:case"end":return n.stop()}}),n,this,[[0,5]])})))}},{key:"openQRCodeReader",value:function(){var e=this;this.qrcodeService.openQRCodeReader({cb:function(n){return h(e,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.check(n);case 2:case"end":return e.stop()}}),e,this)})))}})}},{key:"update",value:function(){var e=this;clearInterval(this.updateLoop),this.updateLoop=setInterval((function(){return h(e,void 0,void 0,regeneratorRuntime.mark((function e(){var n,t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.admissionService.getData();case 2:if(n=e.sent,t=n.screeningEvent,e.t0=void 0!==t,!e.t0){e.next=8;break}return e.next=8,this.admissionService.getScreeningEvent(t);case 8:case"end":return e.stop()}}),e,this)})))}),6e5)}}]),e}();F.\u0275fac=function(e){return new(e||F)(g.Lc(a.b),g.Lc(u.a),g.Lc(u.l),g.Lc(u.h),g.Lc(f.d))},F.\u0275cmp=g.Fc({type:F,selectors:[["app-admission-check"]],hostBindings:function(e,n){1&e&&g.Zc("keypress",(function(e){return n.handleKeyboardEvent(e)}),!1,g.td)},decls:14,vars:12,consts:[[1,"contents-width","mx-auto","px-3","pt-4"],[1,"buttons","mx-auto","text-center","mb-4"],["type","button",1,"btn","btn-success","btn-block","py-3",3,"click"],["class","mb-4",4,"ngIf"],[1,"contents-width","mx-auto","px-3","pb-5"],["class","mb-4 bg-white",4,"ngIf"],[1,"buttons","mx-auto","text-center"],["type","button","routerLink","/admission/schedule",1,"btn","btn-link"],[1,"mb-4"],[4,"ngIf"],["class","p-4 bg-dark text-white text-center",4,"ngIf"],["class","position-relative p-4 bg-success text-white text-center",4,"ngIf"],["class","p-4 bg-danger text-white text-center",4,"ngIf"],[1,"position-relative","p-4","bg-success","text-white","text-center"],[1,"color","rounded","border","border-white",3,"ngStyle"],["class","flash-text text-xx-large font-weight-bold mb-2",4,"ngIf"],[1,"mr-2"],[1,"flash-text","text-xx-large","font-weight-bold","mb-2"],[1,"p-4","bg-danger","text-white","text-center"],[1,"p-4","bg-dark","text-white","text-center"],[1,"text-xx-large","font-weight-bold","mb-2"],[1,"mb-4","bg-white"],[1,"p-3"],[1,"mb-2"],[1,"font-weight-bold","text-large"],["class","text-small",4,"ngIf"],[1,"d-flex","align-items-center","mb-2"],["class","text-small text-white bg-dark py-1 px-3 mr-2",4,"ngIf"],["class","text-small ml-auto",4,"ngIf"],[1,"theater-name"],[1,"screen-name"],["class","mr-2",4,"ngIf"],[1,"mr-3"],[1,"text-small"],[1,"text-small","text-white","bg-dark","py-1","px-3","mr-2"],[1,"text-small","ml-auto"],[1,"mr-1"]],template:function(e,n){if(1&e&&(g.Rc(0,"div",0),g.Rc(1,"div",1),g.Rc(2,"button",2),g.Zc("click",(function(){return n.openQRCodeReader()})),g.Dd(3),g.cd(4,"translate"),g.Qc(),g.Qc(),g.Qc(),g.Bd(5,I,5,6,"div",3),g.cd(6,"async"),g.Rc(7,"div",4),g.Bd(8,B,66,82,"div",5),g.cd(9,"async"),g.Rc(10,"div",6),g.Rc(11,"button",7),g.Dd(12),g.cd(13,"translate"),g.Qc(),g.Qc(),g.Qc()),2&e){var t,c=null==(t=g.dd(9,8,n.admission))?null:t.screeningEvent;g.yc(3),g.Ed(g.dd(4,4,"admission.check.camera.start")),g.yc(2),g.id("ngIf",!g.dd(6,6,n.isLoading)),g.yc(3),g.id("ngIf",c),g.yc(4),g.Ed(g.dd(13,10,"admission.schedule.prev"))}},directives:[c.l,d.c,c.m],pipes:[f.c,c.b,v.a,p.a],styles:[".video-area[_ngcontent-%COMP%]{height:25vh;overflow:hidden}.flash-text[_ngcontent-%COMP%]{-webkit-animation-duration:3s;animation-duration:3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:flash-text;animation-name:flash-text}.color[_ngcontent-%COMP%]{position:absolute;top:.5rem;left:.5rem;width:1.5rem;height:1.5rem}@-webkit-keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}@keyframes flash-text{0%,20%,40%,60%,80%,to{color:#fff}10%,30%,50%,70%,90%{color:transparent}}"]});var W=t("QN9p"),q=t("x8Mb"),H=t("nIj0");function Y(e,n){if(1&e&&(g.Rc(0,"p",13),g.Dd(1),g.cd(2,"changeLanguage"),g.Qc()),2&e){var t=g.bd();g.yc(1),g.Fd(" ",g.dd(2,1,t.performance.screeningEvent.location.address),"")}}function j(e,n){1&e&&(g.Rc(0,"div",14),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Fd(" ",g.dd(2,1,"admission.schedule.status.opening"),""))}function A(e,n){1&e&&(g.Rc(0,"div",14),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Fd(" ",g.dd(2,1,"admission.schedule.status.nowShowing"),""))}function Z(e,n){if(1&e&&(g.Rc(0,"div"),g.Bd(1,j,3,3,"div",9),g.Bd(2,A,3,3,"div",9),g.Qc()),2&e){var t=g.bd();g.yc(1),g.id("ngIf",t.performance.isOpenDoor()),g.yc(1),g.id("ngIf",t.performance.isScreening())}}function N(e,n){1&e&&(g.Rc(0,"div",14),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Fd(" ",g.dd(2,1,"admission.schedule.status.beforeOpening"),""))}function G(e,n){1&e&&(g.Rc(0,"div",14),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Fd(" ",g.dd(2,1,"admission.schedule.status.filmCompletion"),""))}function J(e,n){if(1&e&&(g.Rc(0,"div",15),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e){var t=g.bd();g.yc(1),g.Hd(" ",g.dd(2,3,"common.seat")," ",t.performance.screeningEvent.remainingAttendeeCapacity," / ",t.performance.screeningEvent.maximumAttendeeCapacity," ")}}function z(e,n){1&e&&(g.Rc(0,"div",15),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Fd(" ",g.dd(2,1,"admission.schedule.infiniteStock"),""))}var K=function(e,n){return{"bg-white":e,"bg-dark-gray text-light-gray":n}},U=function(){function e(){_classCallCheck(this,e),this.select=new g.w,this.moment=o}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}();function V(e,n){if(1&e&&(g.Rc(0,"p"),g.Dd(1),g.cd(2,"changeLanguage"),g.Qc()),2&e){var t=g.bd();g.yc(1),g.Fd(" ",g.dd(2,1,t.screeningWorkEvent.info.superEvent.headline),"")}}function X(e,n){if(1&e&&(g.Rc(0,"p"),g.Dd(1),g.cd(2,"changeLanguage"),g.Qc()),2&e){var t=g.bd();g.yc(1),g.Ed(g.dd(2,1,t.screeningWorkEvent.info.superEvent.description))}}function $(e,n){if(1&e&&(g.Rc(0,"div",10),g.Dd(1),g.Qc()),2&e){var t=g.bd();g.yc(1),g.Ed(null==t.screeningWorkEvent.info.workPerformed?null:t.screeningWorkEvent.info.workPerformed.contentRating)}}function ee(e,n){1&e&&(g.Rc(0,"div",10),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Ed(g.dd(2,1,"common.dubbing")))}function ne(e,n){1&e&&(g.Rc(0,"div",10),g.Dd(1),g.cd(2,"translate"),g.Qc()),2&e&&(g.yc(1),g.Ed(g.dd(2,1,"common.subtitles")))}function te(e,n){if(1&e&&(g.Rc(0,"div",11),g.Rc(1,"span",12),g.Dd(2),g.cd(3,"translate"),g.Qc(),g.Dd(4),g.cd(5,"translate"),g.Qc()),2&e){var t=g.bd();g.yc(2),g.Ed(g.dd(3,3,"common.duration")),g.yc(2),g.Gd("",t.moment.duration(null==t.screeningWorkEvent.info.workPerformed?null:t.screeningWorkEvent.info.workPerformed.duration).asMinutes(),"",g.dd(5,5,"common.date.minute")," ")}}function ce(e,n){if(1&e){var t=g.Sc();g.Rc(0,"li",13),g.Rc(1,"app-admission-performance",14),g.Zc("select",(function(e){return g.vd(t),g.bd().select.emit(e)})),g.Qc(),g.Qc()}if(2&e){var c=n.$implicit;g.yc(1),g.id("performance",c)}}U.\u0275fac=function(e){return new(e||U)},U.\u0275cmp=g.Fc({type:U,selectors:[["app-admission-performance"]],inputs:{performance:"performance"},outputs:{select:"select"},decls:28,vars:25,consts:[[1,"row","mx-0","border","boder-gray","rounded","p-3","py-md-3","text-md-center","d-md-block","align-items-center","pointer","h-100",3,"ngClass","click"],[1,"col-md-12","col-8","px-0"],[1,"mb-1","text-small","screen-name"],["class","text-overflow-ellipsis mr-2 d-inline-block d-md-block",4,"ngIf"],[1,"text-overflow-ellipsis","d-inline-block","d-md-block"],[1,"text-large"],[1,"border-0","bg-light-gray","my-2"],[1,"col-md-12","col-4","px-0","text-center"],[4,"ngIf"],["class","status mb-2",4,"ngIf"],["class","mb-2 text-small",4,"ngIf"],[1,"text-small","mb-1"],[1,"text-small"],[1,"text-overflow-ellipsis","mr-2","d-inline-block","d-md-block"],[1,"status","mb-2"],[1,"mb-2","text-small"]],template:function(e,n){1&e&&(g.Rc(0,"div",0),g.Zc("click",(function(){return n.select.emit(n.performance.screeningEvent)})),g.Rc(1,"div",1),g.Rc(2,"div",2),g.Bd(3,Y,3,3,"p",3),g.cd(4,"changeLanguage"),g.Rc(5,"p",4),g.Dd(6),g.cd(7,"changeLanguage"),g.Qc(),g.Qc(),g.Rc(8,"div"),g.Rc(9,"strong",5),g.Dd(10),g.Qc(),g.Rc(11,"span"),g.Dd(12,"-"),g.Qc(),g.Rc(13,"span"),g.Dd(14),g.Qc(),g.Qc(),g.Qc(),g.Mc(15,"hr",6),g.Rc(16,"div",7),g.Bd(17,Z,3,2,"div",8),g.Bd(18,N,3,3,"div",9),g.Bd(19,G,3,3,"div",9),g.Bd(20,J,3,5,"div",10),g.Bd(21,z,3,3,"div",10),g.Rc(22,"div",11),g.Dd(23),g.cd(24,"translate"),g.Qc(),g.Rc(25,"div",12),g.Dd(26),g.cd(27,"translate"),g.Qc(),g.Qc(),g.Qc()),2&e&&(g.id("ngClass",g.md(22,K,n.performance.isOpenDoor()||n.performance.isScreening(),!(n.performance.isOpenDoor()||n.performance.isScreening()))),g.yc(3),g.id("ngIf",g.dd(4,14,n.performance.screeningEvent.location.address)),g.yc(3),g.Ed(g.dd(7,16,n.performance.screeningEvent.location.name)),g.yc(4),g.Ed(n.moment(n.performance.screeningEvent.startDate).format("HH:mm")),g.yc(4),g.Ed(n.moment(n.performance.screeningEvent.endDate).format("HH:mm")),g.yc(3),g.id("ngIf",n.performance.isOpenDoor()||n.performance.isScreening()),g.yc(1),g.id("ngIf",n.performance.isOpenDoor("before")),g.yc(1),g.id("ngIf",n.performance.isScreening("after")),g.yc(1),g.id("ngIf",!n.performance.isInfinitetock()),g.yc(1),g.id("ngIf",n.performance.isInfinitetock()),g.yc(2),g.Gd("",g.dd(24,18,"common.ticketing")," ",n.performance.screeningEvent.checkInCount,""),g.yc(3),g.Gd("",g.dd(27,20,"common.admission")," ",n.performance.screeningEvent.attendeeCount,""))},directives:[c.j,c.l],pipes:[v.a,f.c],styles:[".status[_ngcontent-%COMP%]{line-height:30px}.status[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;height:30px}@media (max-width:767.98px){.text-overflow-ellipsis[_ngcontent-%COMP%]{overflow:auto;width:auto;white-space:normal}}"]});var ie=function(){function e(){_classCallCheck(this,e),this.select=new g.w,this.moment=o}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}();ie.\u0275fac=function(e){return new(e||ie)},ie.\u0275cmp=g.Fc({type:ie,selectors:[["app-admission-performances"]],inputs:{screeningWorkEvent:"screeningWorkEvent"},outputs:{select:"select"},decls:17,vars:14,consts:[[1,"bg-white"],[1,"p-3","bg-gray"],[1,"mb-2"],[1,"font-weight-bold","text-large"],[4,"ngIf"],[1,"d-flex","align-items-center"],["class","text-small bg-dark-gray text-white py-1 px-3 mr-2",4,"ngIf"],["class","text-small ml-auto",4,"ngIf"],[1,"py-2","px-3","px-md-2","d-flex","flex-wrap"],["class","px-md-2 my-2",4,"ngFor","ngForOf"],[1,"text-small","bg-dark-gray","text-white","py-1","px-3","mr-2"],[1,"text-small","ml-auto"],[1,"mr-1"],[1,"px-md-2","my-2"],[1,"mb-3",3,"performance","select"]],template:function(e,n){1&e&&(g.Rc(0,"div",0),g.Rc(1,"div",1),g.Rc(2,"div",2),g.Rc(3,"p",3),g.Dd(4),g.cd(5,"changeLanguage"),g.Qc(),g.Bd(6,V,3,3,"p",4),g.cd(7,"changeLanguage"),g.Bd(8,X,3,3,"p",4),g.cd(9,"changeLanguage"),g.Qc(),g.Rc(10,"div",5),g.Bd(11,$,2,1,"div",6),g.Bd(12,ee,3,3,"div",6),g.Bd(13,ne,3,3,"div",6),g.Bd(14,te,6,7,"div",7),g.Qc(),g.Qc(),g.Rc(15,"ul",8),g.Bd(16,ce,2,1,"li",9),g.Qc(),g.Qc()),2&e&&(g.yc(4),g.Ed(g.dd(5,8,n.screeningWorkEvent.info.name)),g.yc(2),g.id("ngIf",n.screeningWorkEvent.info.superEvent.headline&&g.dd(7,10,n.screeningWorkEvent.info.superEvent.headline)),g.yc(2),g.id("ngIf",n.screeningWorkEvent.info.superEvent.description&&g.dd(9,12,n.screeningWorkEvent.info.superEvent.description)),g.yc(3),g.id("ngIf",null==n.screeningWorkEvent.info.workPerformed?null:n.screeningWorkEvent.info.workPerformed.contentRating),g.yc(1),g.id("ngIf",n.screeningWorkEvent.info.superEvent.dubLanguage),g.yc(1),g.id("ngIf",n.screeningWorkEvent.info.superEvent.subtitleLanguage),g.yc(1),g.id("ngIf",(null==n.screeningWorkEvent.info.workPerformed?null:n.screeningWorkEvent.info.workPerformed.duration)&&n.moment.duration(null==n.screeningWorkEvent.info.workPerformed?null:n.screeningWorkEvent.info.workPerformed.duration).asMinutes()>0),g.yc(2),g.id("ngForOf",n.screeningWorkEvent.data))},directives:[c.l,c.k,U],pipes:[v.a,f.c],styles:["[_nghost-%COMP%]{display:block}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:20%}@media (max-width:991.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:25%}}@media (max-width:767.98px){ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:100%}}"]});var de=function(e,n,t,c){return new(t||(t=Promise))((function(i,d){function r(e){try{a(c.next(e))}catch(n){d(n)}}function s(e){try{a(c.throw(e))}catch(n){d(n)}}function a(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(r,s)}a((c=c.apply(e,n||[])).next())}))},re=["datepicker"];function se(e,n){if(1&e&&(g.Rc(0,"p",16),g.Dd(1),g.cd(2,"formatDate"),g.cd(3,"async"),g.Qc()),2&e){var t,c=g.bd();g.yc(1),g.Fd(" ",g.ed(2,1,null==(t=g.dd(3,4,c.admission))?null:t.scheduleDate,"YYYY/MM/DD (ddd)"),"")}}function ae(e,n){1&e&&(g.Mc(0,"p",17),g.cd(1,"translate")),2&e&&g.id("innerHTML",g.dd(1,1,"admission.schedule.notfound"),g.wd)}function oe(e,n){if(1&e){var t=g.Sc();g.Rc(0,"app-admission-performances",18),g.Zc("select",(function(e){return g.vd(t),g.bd().selectSchedule(e)})),g.Qc()}if(2&e){var c=n.$implicit;g.id("screeningWorkEvent",c)}}var le=function(){return{dateInputFormat:"YYYY/MM/DD",adaptivePosition:!0,showWeekNumbers:!1}},ue=function(){function e(n,t,c,i,d,r){_classCallCheck(this,e),this.store=n,this.router=t,this.localeService=c,this.admissionService=i,this.masterService=d,this.userService=r,this.moment=o}return _createClass(e,[{key:"ngOnInit",value:function(){return de(this,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.admission=this.store.pipe(Object(a.m)(m.a)),this.user=this.store.pipe(Object(a.m)(m.i)),this.screeningWorkEvents=[];case 1:case"end":return e.stop()}}),e,this)})))}},{key:"ngOnDestroy",value:function(){clearTimeout(this.updateTimer)}},{key:"update",value:function(){var e=this;void 0!==this.updateTimer&&clearTimeout(this.updateTimer),this.updateTimer=setTimeout((function(){e.selectDate()}),6e5)}},{key:"selectDate",value:function(e){return de(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t,c,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return null!=e&&(this.scheduleDate=e),n.prev=1,n.next=4,this.userService.getData();case 4:if(void 0!==(t=n.sent.theater)){n.next=7;break}return n.abrupt("return",void this.router.navigate(["/error"]));case 7:return void 0!==this.scheduleDate&&null!==this.scheduleDate||(this.scheduleDate=o().toDate()),c=o(this.scheduleDate).format("YYYY-MM-DD"),this.admissionService.selectScheduleDate(c),n.next=12,this.masterService.getSchedule({superEvent:{locationBranchCodes:[t.branchCode]},startFrom:o(c).toDate(),startThrough:o(c).add(1,"day").toDate()});case 12:i=n.sent,this.screeningWorkEvents=q.a.Purchase.screeningEvents2WorkEvents({screeningEvents:i}),this.update(),n.next=19;break;case 16:n.prev=16,n.t0=n.catch(1),console.error(n.t0),this.router.navigate(["/error"]);case 19:case"end":return n.stop()}}),n,this,[[1,16]])})))}},{key:"selectSchedule",value:function(e){return de(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,this.admissionService.getScreeningEvent(e);case 3:this.router.navigate(["/admission/check"]),n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),console.error(n.t0),this.router.navigate(["/error"]);case 9:case"end":return n.stop()}}),n,this,[[0,6]])})))}},{key:"notSpecified",value:function(){this.admissionService.delete(),this.router.navigate(["/admission/check"])}},{key:"setDatePicker",value:function(){var e=this;this.user.subscribe((function(n){e.localeService.use(n.language)})).unsubscribe()}},{key:"toggleDatepicker",value:function(){this.setDatePicker(),this.datepicker.toggle()}},{key:"onShowPicker",value:function(e){q.a.Util.iOSDatepickerTapBugFix(e,[this.datepicker])}}]),e}();ue.\u0275fac=function(e){return new(e||ue)(g.Lc(a.b),g.Lc(d.b),g.Lc(W.d),g.Lc(u.a),g.Lc(u.e),g.Lc(u.k))},ue.\u0275cmp=g.Fc({type:ue,selectors:[["app-admission-schedule"]],viewQuery:function(e,n){var t;1&e&&g.zd(re,!0),2&e&&g.rd(t=g.ad())&&(n.datepicker=t.first)},decls:22,vars:17,consts:[[1,"contents-width","mx-auto","px-3","py-5"],[1,"text-large","mb-4","text-center","font-weight-bold"],[1,"mb-4","text-md-center",3,"innerHTML"],[1,"mb-3"],[1,"input-group"],["type","text","placeholder","Datepicker","bsDatepicker","","readonly","",1,"form-control",3,"ngModel","bsConfig","ngModelChange","bsValueChange","click","onShown"],["datepicker","bsDatepicker"],[1,"input-group-append","pointer",3,"click"],[1,"input-group-text"],[1,"fas","fa-caret-down"],["class","text-primary text-large mb-3",4,"ngIf"],["class","mb-3",3,"innerHTML",4,"ngIf"],[1,"mb-4"],["class","mb-3",3,"screeningWorkEvent","select",4,"ngFor","ngForOf"],[1,"buttons","mx-auto","text-center"],["type","button",1,"btn","btn-primary","btn-block","py-3","mb-3",3,"click"],[1,"text-primary","text-large","mb-3"],[1,"mb-3",3,"innerHTML"],[1,"mb-3",3,"screeningWorkEvent","select"]],template:function(e,n){if(1&e&&(g.Rc(0,"div",0),g.Rc(1,"h2",1),g.Dd(2),g.cd(3,"translate"),g.Qc(),g.Mc(4,"p",2),g.cd(5,"translate"),g.Rc(6,"div",3),g.Rc(7,"div",4),g.Rc(8,"input",5,6),g.Zc("ngModelChange",(function(e){return n.scheduleDate=e}))("bsValueChange",(function(e){return n.selectDate(e)}))("click",(function(){return n.setDatePicker()}))("onShown",(function(e){return n.onShowPicker(e)})),g.Qc(),g.Rc(10,"div",7),g.Zc("click",(function(){return n.toggleDatepicker()})),g.Rc(11,"span",8),g.Mc(12,"i",9),g.Qc(),g.Qc(),g.Qc(),g.Qc(),g.Bd(13,se,4,6,"p",10),g.cd(14,"async"),g.Bd(15,ae,2,3,"p",11),g.Rc(16,"div",12),g.Bd(17,oe,1,1,"app-admission-performances",13),g.Qc(),g.Rc(18,"div",14),g.Rc(19,"button",15),g.Zc("click",(function(){return n.notSpecified()})),g.Dd(20),g.cd(21,"translate"),g.Qc(),g.Qc(),g.Qc()),2&e){var t,c=null==(t=g.dd(14,12,n.admission))?null:t.scheduleDate;g.yc(2),g.Ed(g.dd(3,8,"admission.schedule.title")),g.yc(2),g.id("innerHTML",g.dd(5,10,"admission.schedule.read"),g.wd),g.yc(4),g.id("ngModel",n.scheduleDate)("bsConfig",g.kd(16,le)),g.yc(5),g.id("ngIf",c),g.yc(2),g.id("ngIf",0===n.screeningWorkEvents.length),g.yc(2),g.id("ngForOf",n.screeningWorkEvents),g.yc(3),g.Ed(g.dd(21,14,"admission.schedule.next"))}},directives:[W.b,H.a,W.a,H.j,H.m,c.l,c.k,ie],pipes:[f.c,c.b,p.a],styles:['.condition[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%}.schedule-slider[_ngcontent-%COMP%]   .swiper-slide[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background-color:#000;opacity:.3}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%], .schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{width:27px;height:27px;background-image:url(/assets/images/icon/slider_arrow.svg);background-size:27px;margin-top:-13px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%]{right:-38px}.schedule-slider[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]{left:-38px;transform:rotate(180deg)}']});var me=[{path:"",component:s.a,canActivate:[r.a,r.c],children:[{path:"schedule",component:ue},{path:"check",component:F}]}],ge=function e(){_classCallCheck(this,e)};ge.\u0275mod=g.Jc({type:ge}),ge.\u0275inj=g.Ic({factory:function(e){return new(e||ge)},imports:[[d.d.forChild(me)],d.d]});var fe=function e(){_classCallCheck(this,e)};fe.\u0275mod=g.Jc({type:fe}),fe.\u0275inj=g.Ic({factory:function(e){return new(e||fe)},imports:[[c.c,ge,i.a]]})}}]);