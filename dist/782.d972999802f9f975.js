"use strict";(self.webpackChunksort_applicants=self.webpackChunksort_applicants||[]).push([[782],{782:(Z,l,r)=>{r.r(l),r.d(l,{default:()=>v});var d=r(5637),e=r(5879),_=r(21),u=r(1896),m=r(5457),g=r(6814),i=r(6223),h=r(2599),p=r(3999);function A(c,T){if(1&c){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td")(8,"mat-slide-toggle",10),e.NdJ("change",function(){const a=e.CHM(t).$implicit,o=e.oxw();return e.KtG(o.toggleActive(a))}),e.qZA()(),e.TgZ(9,"td")(10,"button",6),e.NdJ("click",function(){const a=e.CHM(t).$implicit,o=e.oxw();return e.KtG(o.navigateToPermissions(a.id))}),e._uU(11),e.ALo(12,"translate"),e.qZA()()()}if(2&c){const t=T.$implicit;e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.name),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Q6J("checked",1===(null==t.permissions?null:t.permissions.canActive)),e.xp6(3),e.hij(" ",e.lcZ(12,5,"Set Permissions")," ")}}const v=(()=>{class c{constructor(t,n,s){this.authService=t,this.router=n,this.translate=s,this.searchTerm=""}ngOnInit(){this.translate.setLanguage(localStorage.getItem("i18nextLng")),this.authService.getUsers().subscribe(t=>{this.users=t.users.filter(n=>"Admin"!==n.role)})}toggleActive(t){t.permissions.canActive=0===t.permissions.canActive?1:0,this.authService.updateCanActive(t.id,t.permissions.canActive).subscribe(()=>console.log("User status updated"))}navigateSignup(){this.router.navigate(["/signup"])}onUserSearch(t){this.searchTerm=t.target.value.trim().toLowerCase(),this.searchTerm?this.users=this.users.filter(s=>s.name.toLowerCase().includes(this.searchTerm)):this.authService.getUsers().subscribe(s=>{this.users=s.users.filter(a=>"Admin"!==a.role)})}navigateToPermissions(t){this.router.navigate(["/users-permissions",t])}static#e=this.\u0275fac=function(n){return new(n||c)(e.Y36(_.e),e.Y36(u.F0),e.Y36(m.D))};static#t=this.\u0275cmp=e.Xpm({type:c,selectors:[["app-admin-page"]],standalone:!0,features:[e.jDz],decls:37,vars:26,consts:[[1,"container"],[1,"row"],[1,"col-md-6",2,"display","flex"],[2,"margin","auto","width","30%"],["type","text",1,"form-control",3,"ngModel","ngModelChange","input"],[1,"col-md-6"],["mat-raised-button","",1,"btn","btn-primary",3,"click"],[1,"table-responsive"],[1,"table"],[4,"ngFor","ngForOf"],[3,"checked","change"]],template:function(n,s){1&n&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2),e.ALo(3,"translate"),e.qZA(),e.TgZ(4,"div",1)(5,"div",2)(6,"p",3),e._uU(7),e.ALo(8,"translate"),e.qZA(),e.TgZ(9,"input",4),e.NdJ("ngModelChange",function(o){return s.searchTerm=o})("input",function(o){return s.onUserSearch(o)}),e.qZA()(),e.TgZ(10,"div",5)(11,"button",6),e.NdJ("click",function(){return s.navigateSignup()}),e._uU(12),e.ALo(13,"translate"),e.qZA()()(),e._UZ(14,"br")(15,"br"),e.TgZ(16,"div",7)(17,"table",8)(18,"thead")(19,"tr")(20,"th"),e._uU(21),e.ALo(22,"translate"),e.qZA(),e.TgZ(23,"th"),e._uU(24),e.ALo(25,"translate"),e.qZA(),e.TgZ(26,"th"),e._uU(27),e.ALo(28,"translate"),e.qZA(),e.TgZ(29,"th"),e._uU(30),e.ALo(31,"translate"),e.qZA(),e.TgZ(32,"th"),e._uU(33),e.ALo(34,"translate"),e.qZA()()(),e.TgZ(35,"tbody"),e.YNc(36,A,13,7,"tr",9),e.qZA()()()()),2&n&&(e.xp6(2),e.Oqu(e.lcZ(3,10,"Manage Users")),e.xp6(5),e.hij("",e.lcZ(8,12,"Search users"),":"),e.xp6(2),e.Q6J("ngModel",s.searchTerm),e.xp6(3),e.hij(" ",e.lcZ(13,14,"Add Account")," "),e.xp6(9),e.Oqu(e.lcZ(22,16,"ID")),e.xp6(3),e.Oqu(e.lcZ(25,18,"Username")),e.xp6(3),e.Oqu(e.lcZ(28,20,"Email")),e.xp6(3),e.Oqu(e.lcZ(31,22,"Active")),e.xp6(3),e.Oqu(e.lcZ(34,24,"Permissions")),e.xp6(3),e.Q6J("ngForOf",s.users))},dependencies:[d.m,g.sg,i.Fj,i.JJ,i.On,h.Rr,p.X$],styles:[".user-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse}.user-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .user-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid #ddd;padding:8px}  .mdc-switch:enabled .mdc-switch__track:after{background:blue!important}  .mat-mdc-slide-toggle.mat-accent{--mdc-switch-selected-handle-color: blue !important;--mdc-switch-selected-focus-state-layer-color: blue;--mdc-switch-selected-handle-color: blue;--mdc-switch-selected-hover-state-layer-color: blue;--mdc-switch-selected-pressed-state-layer-color: blue;--mdc-switch-selected-focus-handle-color: blue;--mdc-switch-selected-hover-handle-color: #3f4d67;--mdc-switch-selected-hover-track-color: blue;--mdc-switch-selected-pressed-track-color: blue;--mdc-switch-selected-track-color: blue;--mdc-switch-selected-focus-track-color: #3f4d67;--mdc-switch-selected-pressed-handle-color: #3f4d67}"]})}return c})()}}]);