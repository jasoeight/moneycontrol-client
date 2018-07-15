(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{XXAr:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("layout-main",{attrs:{row:"",wrap:""}},[n("v-flex",{staticClass:"my-3",attrs:{xs12:""}},[n("account-table",{ref:"table",on:{edit:t.onEdit,add:t.onAdd}})],1),t.showForm?n("v-flex",{attrs:{xs12:""}},[n("account-form",{ref:"form",on:{cancel:t.onCancel,stored:t.onStored},model:{value:t.form,callback:function(e){t.form=e},expression:"form"}})],1):t._e()],1)},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("v-card-title",[n("v-spacer"),n("v-btn",{attrs:{small:"",color:"primary"},on:{click:function(e){t.$emit("add")}}},[n("v-icon",[t._v("add")]),t._v(" Add\n        ")],1)],1),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.items,pagination:t.pagination,"total-items":t.totalItems,loading:t.loading},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(e.item.name))]),n("td",{staticClass:"justify-center layout px-0"},[n("v-btn",{staticClass:"mx-0",attrs:{icon:""},on:{click:function(n){t.onEdit(e.item)}}},[n("v-icon",{attrs:{color:"teal"}},[t._v("edit")])],1),n("v-btn",{staticClass:"mx-0",attrs:{icon:""},on:{click:function(n){t.onDelete(e.item)}}},[n("v-icon",{attrs:{color:"pink"}},[t._v("delete")])],1)],1)]}}])},[n("template",{slot:"no-data"},[n("v-alert",{attrs:{value:!t.loading,color:"error",icon:"warning"}},[t._v("\n                Sorry, nothing to display here\n            ")])],1)],2)],1)},s=[],c=n("yT7P"),r=n("oQp2"),l=n("lfAH"),u={data:function(){return{totalItems:0,items:[],loading:!0,pagination:{sortBy:"name",descending:!0,page:1,rowsPerPage:10},headers:[{text:"Name",sortable:!0,value:"name"},{text:"Actions",sortable:!1,value:"_id"}]}},watch:{pagination:{handler:"load",deep:!0}},methods:Object(c["a"])({},r["a"],l["a"],{load:function(){var t=this;this.loading=!0;var e=this.pagination,n=e.sortBy,o=e.descending,a=e.page,i=e.rowsPerPage;this.fetchAllAccounts({sortBy:n,sortDir:o?"desc":"asc",page:a,limit:i}).then(function(e){var n=e.data;t.loadFinished(n.rows,n.count)}).catch(function(){t.loadFinished([],0)})},loadFinished:function(t,e){this.items=t,this.totalItems=e,this.loading=!1},onEdit:function(t){this.$emit("edit",t)},onDelete:function(t){var e=this,n=t._id;this.hasNoTransactions(n).then(function(){e.deleteAccount(n).then(e.load)}).catch(function(){e.$dialog.alert("Cannot remove account because of existing references in some transactions.",{okText:"Ok"})})},hasNoTransactions:function(t){var e=this;return new Promise(function(n,o){e.fetchAllTransactions({account:t,limit:1,noPopulate:1}).then(function(t){var e=t.data;0!==e.count?o():n()}).catch(function(t){o()})})}})},d=u,f=n("KHd+"),m=Object(f["a"])(d,i,s,!1,null,null,null),h=m.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("v-card-text",[n("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-text-field",{attrs:{label:"name",rules:t.rules.name},model:{value:t.value.name,callback:function(e){t.$set(t.value,"name",e)},expression:"value.name"}}),n("v-btn",{on:{click:t.onCancel}},[t._v("Cancel")]),n("v-btn",{attrs:{color:"success"},on:{click:t.onSubmit}},[t._v("Submit")])],1)],1)],1)},p=[],g=n("5EAj"),b=n.n(g),w=n("E+oP"),A=n.n(w),x={props:{value:{type:Object,required:!0}},data:function(){return{valid:!0,rules:{name:[function(t){return!!t||"Name is required"}]}}},methods:Object(c["a"])({},r["a"],{onCancel:function(){this.$emit("cancel")},onSubmit:function(){var t=this;this.$refs.form.validate()&&this.saveAccount(this.value).then(function(){t.$emit("stored"),t.showSuccessMsg()}).catch(this.showErrorMsg)},prepare:function(){this.loading=!0,this.prepareNew()},prepareNew:function(){A()(this.value)&&this.$emit("input",{name:""})}}),watch:{value:"prepareNew"},created:function(){this.prepare()},notifications:{showSuccessMsg:{type:b.a.types.success,title:"",message:"Account successfully saved."},showErrorMsg:{type:b.a.types.error,title:"",message:"Could not save account."}}},_=x,y=Object(f["a"])(_,v,p,!1,null,null,null),k=y.exports,C=n("BkRI"),$=n.n(C),E={components:{AccountTable:h,AccountForm:k},data:function(){return{showForm:!1,form:{}}},methods:{onAdd:function(){this.form={},this.showForm=!0},onCancel:function(){this.showForm=!1,this.form={}},onEdit:function(t){t=$()(t),this.form=t,this.showForm=!0},onStored:function(){this.showForm=!1,this.form={},this.$refs.table.load()}}},F=E,j=Object(f["a"])(F,o,a,!1,null,null,null);e["default"]=j.exports},oQp2:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var o=n("L2JU"),a=Object(o["b"])("accounts",["saveAccount","deleteAccount","fetchAllAccounts","fetchOneAccount"])}}]);
//# sourceMappingURL=5.c7d2b931.js.map