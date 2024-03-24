"use strict";(self.webpackChunksort_applicants=self.webpackChunksort_applicants||[]).push([[397],{5397:(y,A,s)=>{s.r(A),s.d(A,{default:()=>L});var m=s(8445),o=s(2296),e=s(617),D=s(1894),u=s(5637),N=s(1326),c=s(6223),g=s(7700),t=s(5879),Z=s(4190),f=s(5457),T=s(21),p=s(6814),w=s(220),_=s(3999);function b(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"div",14)(1,"div",15)(2,"div",16),t._UZ(3,"label",17),t.ALo(4,"translate"),t._UZ(5,"input",18),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"div",7)(8,"i",19),t.NdJ("click",function(){const d=t.CHM(n).index,h=t.oxw();return t.KtG(h.removeSet(d,"region"))}),t.qZA()()()()}2&l&&(t.Q6J("formGroupName",x.index),t.xp6(3),t.s9C("for",t.lcZ(4,3,"Region")),t.xp6(2),t.s9C("placeholder",t.lcZ(6,5,"Region")))}function v(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"div",14)(1,"div",15)(2,"div",16),t._UZ(3,"label",17),t.ALo(4,"translate"),t._UZ(5,"input",20),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"div",7)(8,"i",19),t.NdJ("click",function(){const d=t.CHM(n).index,h=t.oxw();return t.KtG(h.removeSet(d,"township"))}),t.qZA()()()()}2&l&&(t.Q6J("formGroupName",x.index),t.xp6(3),t.s9C("for",t.lcZ(4,3,"Township")),t.xp6(2),t.s9C("placeholder",t.lcZ(6,5,"Township")))}function G(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"div",14)(1,"div",15)(2,"div",16),t._UZ(3,"label",17),t.ALo(4,"translate"),t._UZ(5,"input",21),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"div",7)(8,"i",19),t.NdJ("click",function(){const d=t.CHM(n).index,h=t.oxw();return t.KtG(h.removeSet(d,"village"))}),t.qZA()()()()}2&l&&(t.Q6J("formGroupName",x.index),t.xp6(3),t.s9C("for",t.lcZ(4,3,"Village")),t.xp6(2),t.s9C("placeholder",t.lcZ(6,5,"Village")))}function E(l,x){1&l&&(t.TgZ(0,"button",22),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&l&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Submit")))}const S=(()=>{class l{constructor(n,r,a,d,h,i){this.dialogRef=n,this.fb=r,this.governorateService=a,this.translate=d,this.data=h,this.authService=i}ngOnInit(){this.data&&this.governorateService.getGovernorateDataId(this.data).subscribe(n=>{const r=n.data;this.mainForm.get("governorate").setValue(r.name);const a=r.regions.map(i=>this.fb.group({region:i.name}));this.regionSets=this.fb.array(a),this.mainForm.setControl("regionData",this.regionSets);const d=r.townships.map(i=>this.fb.group({township:i.name}));this.townshipSets=this.fb.array(d),this.mainForm.setControl("townshipData",this.townshipSets);const h=r.villages.map(i=>this.fb.group({village:i.name}));this.villageSets=this.fb.array(h),this.mainForm.setControl("villageData",this.villageSets)}),this.initForm(),this.title=this.translate.getTranslation(this.data?"Show Governorate":"Add Governorate"),this.translate.setLanguage(localStorage.getItem("i18nextLng")),this.role=localStorage.getItem("role"),this.permissions=this.authService.permissionsService()}initForm(){this.mainForm=this.fb.group({governorate:["",c.kI.required],regionData:this.fb.array([]),townshipData:this.fb.array([]),villageData:this.fb.array([])}),this.regionSets=this.mainForm.get("regionData"),this.townshipSets=this.mainForm.get("townshipData"),this.villageSets=this.mainForm.get("villageData")}addSets(n){let r=this.fb.group({region:[""]}),a=this.fb.group({township:[""]}),d=this.fb.group({village:[""]});"region"===n?this.regionSets.push(r):"township"===n?this.townshipSets.push(a):"village"===n&&this.villageSets.push(d)}removeSet(n,r){let a;switch(r){case"region":a=this.regionSets;break;case"township":a=this.townshipSets;break;case"village":a=this.villageSets;break;default:return}a&&a.length>0&&a.removeAt(n)}submit(){if(this.mainForm.valid){const n=this.mainForm.value,r=this.regionSets.controls.map(i=>i.get("region").value),a=this.townshipSets.controls.map(i=>i.get("township").value),d=this.villageSets.controls.map(i=>i.get("village").value),h={name:n.governorate,regions:r,townships:a,villages:d};this.data?this.governorateService.updateGovernorateData(this.data,h).subscribe(i=>{i&&this.dialogRef.close()}):this.governorateService.createGovernorateData(h).subscribe(i=>{i&&this.dialogRef.close()})}else this.mainForm.markAllAsTouched()}static#t=this.\u0275fac=function(r){return new(r||l)(t.Y36(g.so),t.Y36(c.qu),t.Y36(Z.y),t.Y36(f.D),t.Y36(g.WI),t.Y36(T.e))};static#e=this.\u0275cmp=t.Xpm({type:l,selectors:[["app-add-governorate-dialog"]],standalone:!0,features:[t.jDz],decls:33,vars:27,consts:[[1,"row",2,"width","100%"],[1,"col-sm-12"],[3,"cardTitle","options"],["action","javascript:",3,"formGroup","submit"],[1,"form-group","col-md-12"],["for","card_number"],["type","text","id","card_number","formControlName","governorate",1,"form-control",3,"placeholder"],[1,"col-md-1"],[1,"fa-solid","fa-plus",3,"click"],["formArrayName","regionData"],[3,"formGroupName",4,"ngFor","ngForOf"],["formArrayName","townshipData"],["formArrayName","villageData"],["type","submit","class","btn btn-primary",4,"ngIf"],[3,"formGroupName"],[1,"oneForm","row"],[1,"form-group","col-md-11"],[3,"for"],["type","text","id","region","formControlName","region",1,"form-control",3,"placeholder"],[1,"fa-solid","fa-minus","alignment",3,"click"],["type","text","id","township","formControlName","township",1,"form-control",3,"placeholder"],["type","text","id","village","formControlName","village",1,"form-control",3,"placeholder"],["type","submit",1,"btn","btn-primary"]],template:function(r,a){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"app-card",2),t.ALo(3,"translate"),t.TgZ(4,"form",3),t.NdJ("submit",function(){return a.submit()}),t.TgZ(5,"div",4)(6,"label",5),t._uU(7),t.ALo(8,"translate"),t.TgZ(9,"span"),t._uU(10," *"),t.qZA()(),t._UZ(11,"input",6),t.ALo(12,"translate"),t.qZA(),t._UZ(13,"br"),t.TgZ(14,"app-card",2),t.ALo(15,"translate"),t.TgZ(16,"div",7)(17,"i",8),t.NdJ("click",function(){return a.addSets("region")}),t.qZA()(),t.TgZ(18,"div",9),t.YNc(19,b,9,7,"div",10),t.qZA()(),t.TgZ(20,"app-card",2),t.ALo(21,"translate"),t.TgZ(22,"div",7)(23,"i",8),t.NdJ("click",function(){return a.addSets("township")}),t.qZA()(),t.TgZ(24,"div",11),t.YNc(25,v,9,7,"div",10),t.qZA()(),t.TgZ(26,"app-card",2),t.ALo(27,"translate"),t.TgZ(28,"div",7)(29,"i",8),t.NdJ("click",function(){return a.addSets("village")}),t.qZA()(),t.TgZ(30,"div",12),t.YNc(31,G,9,7,"div",10),t.qZA()(),t.YNc(32,E,3,3,"button",13),t.qZA()()()()),2&r&&(t.xp6(2),t.s9C("cardTitle",t.lcZ(3,15,a.title)),t.Q6J("options",!1),t.xp6(2),t.Q6J("formGroup",a.mainForm),t.xp6(3),t.hij(" ",t.lcZ(8,17,"Name"),""),t.xp6(4),t.s9C("placeholder",t.lcZ(12,19,"governorate")),t.xp6(3),t.s9C("cardTitle",t.lcZ(15,21,"Add Region")),t.Q6J("options",!1),t.xp6(5),t.Q6J("ngForOf",a.regionSets.controls),t.xp6(1),t.s9C("cardTitle",t.lcZ(21,23,"Add Township")),t.Q6J("options",!1),t.xp6(5),t.Q6J("ngForOf",a.townshipSets.controls),t.xp6(1),t.s9C("cardTitle",t.lcZ(27,25,"Add Village")),t.Q6J("options",!1),t.xp6(5),t.Q6J("ngForOf",a.villageSets.controls),t.xp6(1),t.Q6J("ngIf","Admin"===a.role||"User"===a.role&&1===a.permissions.editGovernorate&&a.data))},dependencies:[u.m,p.sg,p.O5,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u,c.x0,c.CE,w.A,_.X$],styles:[".error-label[_ngcontent-%COMP%]{color:red}"]})}return l})();var I=s(247);function U(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"button",6),t.NdJ("click",function(){t.CHM(n);const a=t.oxw();return t.KtG(a.addGovernorate())}),t._UZ(1,"i",7),t._uU(2),t.ALo(3,"translate"),t.qZA()}2&l&&(t.xp6(2),t.hij("",t.lcZ(3,1,"Add")," "))}function J(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"button",13),t.NdJ("click",function(){t.CHM(n);const a=t.oxw().$implicit,d=t.oxw();return t.KtG(d.onDelete(a))}),t._UZ(1,"i",14),t.qZA()}}function R(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"mat-tree-node",8),t._UZ(1,"button",9),t._uU(2),t.YNc(3,J,2,0,"button",10),t.TgZ(4,"button",11),t.NdJ("click",function(){const d=t.CHM(n).$implicit,h=t.oxw();return t.KtG(h.onPreview(d))}),t._UZ(5,"i",12),t.qZA()()}if(2&l){const n=x.$implicit,r=t.oxw();t.xp6(2),t.hij(" ",n.name," "),t.xp6(1),t.Q6J("ngIf","Admin"===r.role||"User"===r.role&&1===r.permissions.deleteGovernorate)}}function M(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"button",13),t.NdJ("click",function(){t.CHM(n);const a=t.oxw().$implicit,d=t.oxw();return t.KtG(d.onDelete(a))}),t._UZ(1,"i",14),t.qZA()}}function O(l,x){if(1&l){const n=t.EpF();t.TgZ(0,"button",11),t.NdJ("click",function(){t.CHM(n);const a=t.oxw().$implicit,d=t.oxw();return t.KtG(d.onPreview(a))}),t._UZ(1,"i",12),t.qZA()}}function k(l,x){if(1&l&&(t.TgZ(0,"mat-tree-node",8)(1,"button",15)(2,"mat-icon",16),t._uU(3),t.qZA()(),t._uU(4),t.YNc(5,M,2,0,"button",10),t.YNc(6,O,2,0,"button",17),t.qZA()),2&l){const n=x.$implicit,r=t.oxw();t.xp6(1),t.uIk("aria-label","Toggle "+n.name),t.xp6(2),t.hij(" ",r.treeControl.isExpanded(n)?"expand_more":"chevron_right"," "),t.xp6(1),t.hij(" ",n.name," "),t.xp6(1),t.Q6J("ngIf","Admin"===r.role||"User"===r.role&&1===r.permissions.deleteGovernorate),t.xp6(1),t.Q6J("ngIf",0===n.level)}}const L=(()=>{class l{constructor(n,r,a,d,h){this.governorateService=n,this.dialog=r,this.translate=a,this.excelService=d,this.authService=h,this._transformer=(i,C)=>({id:i.id,governorate_id:i.governorate_id,expandable:!!i.children&&i.children.length>0,name:i.name,level:C,parentName:i.parentName}),this.treeControl=new D.C2(i=>i.level,i=>i.expandable),this.treeFlattener=new m.JZ(this._transformer,i=>i.level,i=>i.expandable,i=>i.children),this.dataSource=new m.kc(this.treeControl,this.treeFlattener),this.hasChild=(i,C)=>C.expandable}ngOnInit(){this.getData(),this.translate.setLanguage(localStorage.getItem("i18nextLng")),this.role=localStorage.getItem("role"),this.permissions=this.authService.permissionsService()}performDelete(n){let a,d,r=[];if("Regions"===n.name||"Townships"===n.name||"Villages"===n.name){const h=this.dataSource.data.find(i=>i.children);if(h){const i=h.children.find(C=>C.name===n.name);i&&(r=i.children?.flatMap(C=>C.id)||[],a=i.children?.[0].governorate_id,d=i.children?.[0].parentName,this.governorateService.deleteGovernorateData(a,r,d).subscribe(C=>{this.getData()}))}}else 2==n.level?this.governorateService.deleteGovernorateData(n.governorate_id,n.id,n.parentName).subscribe(h=>{this.getData()}):this.governorateService.deleteGovernorateData(n.id).subscribe(h=>{this.getData()})}getData(){this.governorateService.getGovernorateData().subscribe(n=>{const r=n.data.map(a=>{const d=a.regions.map(C=>({...C,parentName:"Regions"})),h=a.townships.map(C=>({...C,parentName:"Townships"})),i=a.villages.map(C=>({...C,parentName:"Villages"}));return{id:a.id,name:a.name,children:[{id:0,name:"Regions",children:d},{id:0,name:"Townships",children:h},{id:0,name:"Villages",children:i}].filter(C=>C.children.length>0)}});this.dataSource.data=r})}onPreview(n){this.dialog.open(S,{data:n.id,width:"50%",height:"90%"}).afterClosed().subscribe(a=>{this.getData()})}onDelete(n){this.dialog.open(N.z,{data:{message:"Are you sure you want to delete ?"}}).afterClosed().subscribe(a=>{a&&(this.performDelete(n),this.getData())})}addGovernorate(){this.dialog.open(S,{width:"50%",height:"90%"}).afterClosed().subscribe(r=>{r&&this.getData()})}exportGovernorate(){this.excelService.exportGovernorateExcel().subscribe(n=>{this.downloadFile(n)})}downloadFile(n){const r=document.createElement("a");r.href=window.URL.createObjectURL(n),r.download="governorate_data.xlsx",r.click()}static#t=this.\u0275fac=function(r){return new(r||l)(t.Y36(Z.y),t.Y36(g.uw),t.Y36(f.D),t.Y36(I.x),t.Y36(T.e))};static#e=this.\u0275cmp=t.Xpm({type:l,selectors:[["app-governorate"]],standalone:!0,features:[t.jDz],decls:8,vars:8,consts:[[1,"row"],[3,"cardTitle","options"],["type","button","class","btn btn-primary",3,"click",4,"ngIf"],[3,"dataSource","treeControl"],["matTreeNodePadding","",4,"matTreeNodeDef"],["matTreeNodePadding","",4,"matTreeNodeDef","matTreeNodeDefWhen"],["type","button",1,"btn","btn-primary",3,"click"],[1,"feather","icon-thumbs-up"],["matTreeNodePadding",""],["mat-icon-button","","disabled",""],["mat-icon-button","","color","warn",3,"click",4,"ngIf"],["mat-icon-button","","color","primary",3,"click"],[1,"feather","icon-eye"],["mat-icon-button","","color","warn",3,"click"],[1,"feather","icon-x"],["mat-icon-button","","matTreeNodeToggle",""],[1,"mat-icon-rtl-mirror"],["mat-icon-button","","color","primary",3,"click",4,"ngIf"]],template:function(r,a){1&r&&(t.TgZ(0,"div",0)(1,"app-card",1),t.ALo(2,"translate"),t.YNc(3,U,4,3,"button",2),t._UZ(4,"hr"),t.TgZ(5,"mat-tree",3),t.YNc(6,R,6,2,"mat-tree-node",4),t.YNc(7,k,7,5,"mat-tree-node",5),t.qZA()()()),2&r&&(t.xp6(1),t.s9C("cardTitle",t.lcZ(2,6,"Administrative Divisions")),t.Q6J("options",!1),t.xp6(2),t.Q6J("ngIf","Admin"===a.role||"User"===a.role&&1===a.permissions.addGovernorate),t.xp6(2),t.Q6J("dataSource",a.dataSource)("treeControl",a.treeControl),t.xp6(2),t.Q6J("matTreeNodeDefWhen",a.hasChild))},dependencies:[m.dp,m.fQ,m.ah,m.eu,m.gi,m.uo,o.ot,o.RK,e.Ps,e.Hw,u.m,p.O5,w.A,_.X$]})}return l})()},220:(y,A,s)=>{s.d(A,{A:()=>T});var m=s(5399),o=s(6825),e=s(5879),D=s(6814);function u(p,w){if(1&p&&(e.TgZ(0,"h5"),e._uU(1),e.qZA()),2&p){const _=e.oxw(2);e.xp6(1),e.Oqu(_.cardTitle)}}function N(p,w){if(1&p){const _=e.EpF();e.TgZ(0,"div",8)(1,"div",9)(2,"button",10),e._UZ(3,"i",11),e.qZA(),e.TgZ(4,"ul",12)(5,"li",13),e.NdJ("click",function(){e.CHM(_);const v=e.oxw(2),G=e.MAs(1);return e.KtG(v.fullCardToggle(G,"",!0))}),e.TgZ(6,"a",14)(7,"span"),e._UZ(8,"i",15),e._uU(9),e.qZA()()(),e.TgZ(10,"li",16),e.NdJ("click",function(v){e.CHM(_);const G=e.oxw(2);return e.KtG(G.collapsedCardToggle(v))}),e.TgZ(11,"a",14)(12,"span"),e._UZ(13,"i",15),e._uU(14),e.qZA(),e.TgZ(15,"span",17),e._UZ(16,"i",18),e.qZA()()(),e.TgZ(17,"li",19),e.NdJ("click",function(){e.CHM(_);const v=e.oxw(2);return e.KtG(v.cardRefresh())}),e.TgZ(18,"a",14),e._UZ(19,"i",20),e._uU(20," Reload"),e.qZA()(),e.TgZ(21,"li",21),e.NdJ("click",function(){e.CHM(_);const v=e.oxw(2);return e.KtG(v.cardRemoveAction())}),e.TgZ(22,"a",14),e._UZ(23,"i",22),e._uU(24," Remove"),e.qZA()()()()()}if(2&p){const _=e.oxw(2);e.xp6(8),e.Q6J("ngClass",_.fullIcon),e.xp6(1),e.hij(" ","full-card"===_.cardClass?"Restore":"Maximize",""),e.xp6(4),e.Q6J("ngClass",_.collapsedIcon),e.xp6(1),e.hij(" ","collapsed"===_.collapsedCard?"Expand":"Collapse"," ")}}function c(p,w){1&p&&e.Hsn(0,1,["*ngIf","customHeader"])}function g(p,w){if(1&p&&(e.TgZ(0,"div",5),e.YNc(1,u,2,1,"h5",6),e.YNc(2,N,25,4,"div",7),e.YNc(3,c,1,0,"ng-content",6),e.qZA()),2&p){const _=e.oxw();e.Q6J("ngClass",_.headerClass),e.xp6(1),e.Q6J("ngIf",!_.customHeader),e.xp6(1),e.Q6J("ngIf",_.options&&!_.customHeader),e.xp6(1),e.Q6J("ngIf",_.customHeader)}}function t(p,w){1&p&&(e.TgZ(0,"div",23),e._UZ(1,"i",24),e.qZA())}const Z=["*",[["",8,"app-card-header"]]],f=["*",".app-card-header"];let T=(()=>{class p{constructor(_){_.placement="bottom-right",this.customHeader=!1,this.options=!0,this.hidHeader=!1,this.cardTitle="Card Title",this.fullIcon="icon-maximize",this.isAnimating=!1,this.collapsedCard="expanded",this.collapsedIcon="icon-minus",this.loadCard=!1,this.cardRemove="open"}ngOnInit(){(!this.options||this.hidHeader||this.customHeader)&&(this.collapsedCard="false")}fullCardToggle(_,b,v){b="full-card"===this.cardClass?"zoomOut":"zoomIn",this.fullIcon="full-card"===this.cardClass?"icon-maximize":"icon-minimize",this.cardClass="full-card"===this.cardClass?this.cardClass:"full-card",v&&(this.animation=b),this.isAnimating=!0,setTimeout(()=>{this.cardClass="zoomOut"===b?"":this.cardClass,"full-card"===this.cardClass?document.querySelector("body").style.overflow="hidden":document.querySelector("body").removeAttribute("style")},500)}collapsedCardToggle(_){this.collapsedCard="collapsed"===this.collapsedCard?"expanded":"collapsed",this.collapsedIcon="collapsed"===this.collapsedCard?"icon-plus":"icon-minus"}cardRefresh(){this.loadCard=!0,this.cardClass="card-load",setTimeout(()=>{this.loadCard=!1,this.cardClass="expanded"},3e3)}cardRemoveAction(){this.cardRemove="closed"===this.cardRemove?"open":"closed"}static#t=this.\u0275fac=function(b){return new(b||p)(e.Y36(m.jL))};static#e=this.\u0275cmp=e.Xpm({type:p,selectors:[["app-card"]],inputs:{cardTitle:"cardTitle",cardClass:"cardClass",blockClass:"blockClass",headerClass:"headerClass",options:"options",hidHeader:"hidHeader",customHeader:"customHeader"},features:[e._Bn([m.jL])],ngContentSelectors:f,decls:7,vars:6,consts:[[1,"card",3,"ngClass"],["toAnimate",""],["class","card-header",3,"ngClass",4,"ngIf"],[1,"card-block",3,"ngClass"],["class","card-loader",4,"ngIf"],[1,"card-header",3,"ngClass"],[4,"ngIf"],["class","card-header-right",4,"ngIf"],[1,"card-header-right"],["ngbDropdown","",1,"btn-group","card-option","dropdown"],["type","button","ngbDropdownToggle","",1,"btn","dropdown-toggle","btn-icon"],[1,"feather","icon-more-horizontal"],["ngbDropdownMenu","",1,"list-unstyled","card-option","dropdown-menu","dropdown-menu-right"],[1,"dropdown-item","full-card",3,"click"],["href","javascript:"],[1,"feather",3,"ngClass"],[1,"dropdown-item","minimize-card",3,"click"],[2,"display","none"],[1,"feather","icon-plus"],[1,"dropdown-item","reload-card",3,"click"],[1,"feather","icon-refresh-cw"],[1,"dropdown-item","close-card",3,"click"],[1,"feather","icon-trash"],[1,"card-loader"],[1,"pct-loader1","anim-rotate"]],template:function(b,v){1&b&&(e.F$t(Z),e.TgZ(0,"div",0,1),e.YNc(2,g,4,4,"div",2),e.TgZ(3,"div")(4,"div",3),e.Hsn(5),e.qZA()(),e.YNc(6,t,2,0,"div",4),e.qZA()),2&b&&(e.Q6J("ngClass",v.cardClass)("@cardRemove",v.cardRemove),e.xp6(2),e.Q6J("ngIf",!v.hidHeader),e.xp6(1),e.Q6J("@collapsedCard",v.collapsedCard),e.xp6(1),e.Q6J("ngClass",v.blockClass),e.xp6(2),e.Q6J("ngIf",v.loadCard))},dependencies:[D.mk,D.O5,m.jt,m.iD,m.Vi],styles:[".card.full-card[_ngcontent-%COMP%]{position:fixed!important;top:0!important;left:0!important;z-index:99999;border-radius:0;width:100vw!important;height:100vh!important}"],data:{animation:[(0,o.X$)("collapsedCard",[(0,o.SB)("collapsed, void",(0,o.oB)({overflow:"hidden",height:"0px"})),(0,o.SB)("expanded",(0,o.oB)({overflow:"hidden",height:o.l3})),(0,o.eR)("collapsed <=> expanded",[(0,o.jt)("400ms ease-in-out")])]),(0,o.X$)("cardRemove",[(0,o.SB)("open",(0,o.oB)({opacity:1})),(0,o.SB)("closed",(0,o.oB)({opacity:0,display:"none"})),(0,o.eR)("open <=> closed",(0,o.jt)("400ms"))])]}})}return p})()},1326:(y,A,s)=>{s.d(A,{z:()=>g});var m=s(7700),o=s(5879),e=s(6814),D=s(2296),u=s(3999);function N(t,Z){if(1&t){const f=o.EpF();o.TgZ(0,"button",6),o.NdJ("click",function(){o.CHM(f);const p=o.oxw();return o.KtG(p.dialogRef.close(!0))}),o._uU(1),o.ALo(2,"translate"),o.qZA()}2&t&&(o.xp6(1),o.hij(" ",o.lcZ(2,1,"Delete")," "))}function c(t,Z){if(1&t){const f=o.EpF();o.TgZ(0,"button",3),o.NdJ("click",function(){o.CHM(f);const p=o.oxw();return o.KtG(p.dialogRef.close(!0))}),o._uU(1),o.ALo(2,"translate"),o.qZA()}2&t&&(o.xp6(1),o.hij(" ",o.lcZ(2,1,"Confirm")," "))}let g=(()=>{class t{constructor(f,T){this.dialogRef=f,this.data=T}static#t=this.\u0275fac=function(T){return new(T||t)(o.Y36(m.so),o.Y36(m.WI))};static#e=this.\u0275cmp=o.Xpm({type:t,selectors:[["app-confirmation-dialog"]],decls:12,vars:11,consts:[["mat-dialog-title","",2,"text-align","center"],["mat-dialog-content",""],["mat-dialog-actions",""],["mat-button","",1,"color-blue",3,"click"],["mat-button","","class","color-red",3,"click",4,"ngIf"],["mat-button","","class","color-blue",3,"click",4,"ngIf"],["mat-button","",1,"color-red",3,"click"]],template:function(T,p){1&T&&(o.TgZ(0,"h1",0),o._uU(1),o.ALo(2,"translate"),o.qZA(),o.TgZ(3,"div",1),o._uU(4),o.ALo(5,"translate"),o.qZA(),o.TgZ(6,"div",2)(7,"button",3),o.NdJ("click",function(){return p.dialogRef.close(!1)}),o._uU(8),o.ALo(9,"translate"),o.qZA(),o.YNc(10,N,3,3,"button",4),o.YNc(11,c,3,3,"button",5),o.qZA()),2&T&&(o.xp6(1),o.hij(" ",o.lcZ(2,5,"Confirmation"),"\n"),o.xp6(3),o.Oqu(o.lcZ(5,7,p.data.message)),o.xp6(4),o.hij(" ",o.lcZ(9,9,"Cancel")," "),o.xp6(2),o.Q6J("ngIf",!p.data.flag),o.xp6(1),o.Q6J("ngIf",p.data.flag))},dependencies:[e.O5,D.lW,m.uh,m.xY,m.H8,u.X$],styles:[".cdk-global-overlay-wrapper{justify-content:center!important;align-items:center!important}  .mat-mdc-dialog-actions{justify-content:center}.color-blue[_ngcontent-%COMP%]{color:#fff!important;background-color:#04a9f5!important}.color-red[_ngcontent-%COMP%]{color:#fff!important;background-color:red!important}"]})}return t})()},247:(y,A,s)=>{s.d(A,{x:()=>D});var m=s(9862),o=s(7337),e=s(5879);let D=(()=>{class u{constructor(c){this.http=c}exportGovernorateExcel(){return this.http.get(o.N.api+"export-governorate",{responseType:"blob"})}exportJobDescriptionExcel(){return this.http.get(o.N.api+"export-job-description",{responseType:"blob"})}exportJobDescriptionHeader(){return this.http.get(o.N.api+"export-job-description-headers",{responseType:"blob"})}exportApplicants(c){const g=o.N.api+"export-applicants",t=new m.LE({fromObject:c});return this.http.get(g,{params:t,responseType:"blob"})}exportApplicantsHeader(){return this.http.get(o.N.api+"export-applicants-headers",{responseType:"blob"})}importJobDescriptionHeader(c){const g=new FormData;return g.append("file",c),this.http.post(o.N.api+"import-job-description-data",g)}importApplicantsHeader(c){const g=new FormData;return g.append("file",c),this.http.post(o.N.api+"import-applicants-data",g)}static#t=this.\u0275fac=function(g){return new(g||u)(e.LFG(m.eN))};static#e=this.\u0275prov=e.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})()},4190:(y,A,s)=>{s.d(A,{y:()=>D});var m=s(9862),o=s(7337),e=s(5879);let D=(()=>{class u{constructor(c){this.http=c}getGovernorateData(){return this.http.get(o.N.api+"get-governorates")}getGovernorateDataId(c){return this.http.get(`${o.N.api}governorates-get/${c}`)}createGovernorateData(c){return this.http.post(o.N.api+"create-governorates",c)}updateGovernorateData(c,g){return this.http.put(`${o.N.api}update-governorates/${c}`,g)}deleteGovernorateData(c,g,t){let Z;if(t)switch(t){case"Regions":Z="region_ids[]";break;case"Townships":Z="township_ids[]";break;case"Villages":Z="village_ids[]";break;default:Z=""}let f=new m.LE;return g&&Array.isArray(g)?g.forEach(T=>{f=f.append(Z,T.toString())}):f=f.set(Z,g?.toString()||""),this.http.delete(`${o.N.api}delete-governorates/${c}`,{params:f})}static#t=this.\u0275fac=function(g){return new(g||u)(e.LFG(m.eN))};static#e=this.\u0275prov=e.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})()}}]);