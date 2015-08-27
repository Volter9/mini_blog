!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var e
e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.mini_blog=t()}}(function(){return function t(e,n,i){function o(r,a){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require
if(!a&&c)return c(r,!0)
if(s)return s(r,!0)
var d=new Error("Cannot find module '"+r+"'")
throw d.code="MODULE_NOT_FOUND",d}var u=n[r]={exports:{}}
e[r][0].call(u.exports,function(t){var n=e[r][1][t]
return o(n?n:t)},u,u.exports,t,e,n,i)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r])
return o}({1:[function(t,e,n){var i=t("../editor"),o=(t("../../helpers/dom"),{components:{}})
o.register=function(t,e){this.components[t]={constructor:e}},o.create=function(t,e){return this.components[t]?new this.components[t].constructor(e):!1},o.createComponent=function(t){if(!t.component&&!t.dataset.ignore){var e=t.dataset.component,n=o.create(e,t)
if(!n)return console.warn('Component "'+e+'" does not exists!')
var s=new i.view(null,{node:t,component:n})
t.setAttribute("title","Double-click to edit"),t.component=n,t.editor=s,t.appendChild(s.node)}},e.exports=o},{"../../helpers/dom":15,"../editor":4}],2:[function(t,e,n){function i(t){this.node=t,this.initialize()}t("../../helpers/utils")
i.prototype.initialize=function(){},i.prototype.enable=function(){this.view.activate()},i.prototype.disable=function(){this.view.deactivate()},i.prototype.save=function(){},i.prototype.cancel=function(){},e.exports=i},{"../../helpers/utils":18}],3:[function(t,e,n){var i=t("../../mvc/view"),o=t("../../helpers/utils"),s=t("../../mvc/extend"),r=t("../fields"),a=i.extend({initialize:function(){this.nodes={},this.setNodes(this.node),this.data.model.on("change",this.render.bind(this))},render:function(){var t=this.data.model.all()
o.each(this.nodes,function(e,n){t[n]&&(e.node.innerHTML=t[n])})},setNodes:function(t){var e=o.toArray(t.querySelectorAll("[data-name]")),n=this
e.forEach(function(t){var e=(t.dataset.name,t.dataset.type||"input")
t.dataset.type=e,n.nodes[t.dataset.name]=new r[t.dataset.type](t)})},collectData:function(){var t={}
return o.each(this.nodes,function(e){t[e.name]=e.value()}),t},activate:function(){o.each(this.nodes,function(t){t.activate()})},deactivate:function(){o.each(this.nodes,function(t){t.deactivate()})}})
a.extend=s(a),e.exports=a},{"../../helpers/utils":18,"../../mvc/extend":22,"../../mvc/view":26,"../fields":6}],4:[function(t,e,n){var i=t("../mvc"),o=!1,s='<div class="edit">    <!-- <button class="edit-button button">        <i class="fa fa-fw fa-pencil"></i>    </button> --></div><div class="editing">    <button class="save-button button">        <i class="fa fa-fw fa-floppy-o"></i>    </button>    <button class="cancel-button button">        <i class="fa fa-fw fa-times"></i>    </button>    <button class="remove-button button">        <i class="fa fa-fw fa-trash"></i>    </button></div>',r=i.view.extend({initialize:function(){this.node=document.createElement("div"),this.node.className="m-editor",this.node.innerHTML=s,this.setupEvents(),this.show(!0)},setupEvents:function(){this.data.node.addEventListener("dblclick",this.edit.bind(this)),this.bind(".save-button","click",this.save),this.bind(".cancel-button","click",this.cancel),this.bind(".remove-button","click",this.remove)},disable:function(){this.data.component.disable(),o=!1,this.show(!0)},edit:function(){o||(o=!0,this.data.component.enable(),this.show(!1))},remove:function(){window.confirm("Are you sure you want to delete this entry?")&&(this.disable(),this.data.component.remove(),this.destroy())},save:function(){this.disable(),this.data.component.save()},cancel:function(){this.disable(),this.data.component.cancel()},destroy:function(){this.node.parentNode.removeChild(this.node)},show:function(t){this.find(".edit").style.display=t?"block":"none",this.find(".editing").style.display=t?"none":"block",this.data.component.notRemovable&&(this.find(".remove-button").style.display="none")}})
e.exports={view:r}},{"../mvc":23}],5:[function(t,e,n){var i=function(t,e){this.field=this.create(t,e),this.name=t.dataset.name,this.node=t}
i.prototype.create=function(t,e){return t},i.prototype.activate=function(){},i.prototype.deactivate=function(){},i.prototype.value=function(){return this.field.value},e.exports=i},{}],6:[function(t,e,n){e.exports={input:t("./input"),text:t("./text")}},{"./input":7,"./text":8}],7:[function(t,e,n){var i=t("../../helpers/dom"),o=t("./field"),s=function(){o.apply(this,arguments)}
s.prototype=Object.create(o.prototype),s.prototype.create=function(t){var e=document.createElement("input")
return e.classList.add("m-input-field"),e.classList.add("m-hidden"),e.value=t.innerHTML.trim(),e.className+=" "+t.className,i.insertAfter(t,e),e},s.prototype.activate=function(){this.field.classList.add("m-editable"),this.field.classList.remove("m-hidden"),this.node.classList.add("m-hidden")},s.prototype.deactivate=function(){this.field.classList.remove("m-editable"),this.field.classList.add("m-hidden"),this.node.classList.remove("m-hidden")},e.exports=s},{"../../helpers/dom":15,"./field":5}],8:[function(t,e,n){var i=t("../../helpers/dom"),o=t("./field"),s=function(){o.apply(this,arguments)}
s.prototype=Object.create(o.prototype),s.prototype.create=function(t){var e=document.createElement("textarea")
return e.classList.add("m-text-field"),e.classList.add("m-hidden"),e.value=t.innerHTML.trim(),e.className+=" "+t.className,i.insertAfter(t,e),e},s.prototype.activate=function(){this.field.classList.add("m-editable"),this.field.classList.remove("m-hidden"),this.node.classList.add("m-hidden")},s.prototype.deactivate=function(){this.field.classList.remove("m-editable"),this.field.classList.add("m-hidden"),this.node.classList.remove("m-hidden")},e.exports=s},{"../../helpers/dom":15,"./field":5}],9:[function(t,e,n){var i=t("./components/collection"),o=t("./settings"),s=t("../helpers/utils")
e.exports=function(t){o.assign(t),s.toArray(document.querySelectorAll("[data-component]")).forEach(i.createComponent)}},{"../helpers/utils":18,"./components/collection":1,"./settings":12}],10:[function(t,e,n){var i=t("../components/collection"),o=t("../../helpers/ajax"),s=t("../../mvc/view"),r=s.extend({initialize:function(){this.bind(".button","click",this.addView.bind(this))},addView:function(t){t.preventDefault(),this.createNode(document.querySelector(".posts"))},createNode:function(t){var e=this,n=function(n,i){e.appendNode(i,t)}
o.post("api/template/posts").success(n).send()},appendNode:function(t,e){var n=document.createElement("div")
n.innerHTML=t.html
var o=n.children[0]
o.removeAttribute("data-id"),e.insertBefore(o,e.children[0]),i.createComponent(o),o.component.post.merge(t.data),o.editor.edit()}})
e.exports=new r(document.querySelector("#mini_panel .add"))},{"../../helpers/ajax":13,"../../mvc/view":26,"../components/collection":1}],11:[function(t,e,n){t("../../helpers/utils")
e.exports={add:t("./add")}},{"../../helpers/utils":18,"./add":10}],12:[function(t,e,n){var i={settings:{},get:function(t){return this.settings[t]?this.settings[t]:null},set:function(t,e){this.settings[t]=e},assign:function(t){this.settings=t}}
e.exports=i},{}],13:[function(t,e,n){var i=t("../../core/settings"),o={}
o.request=function(t,e,n){var i=new this.instance(this.url(t),e,n)
return i.on("data",function(t,e){"ok"===e.status?i.emit("success",t,e):i.emit("error",t,e.message)}),i.on("error",function(t,e){console.error(e)}),i},["get","post","put","delete"].forEach(function(t){var e=t.toUpperCase()
o[t]=function(t,n){return this.request(t,e,n)}}),o.url=function(t){return t=Array.isArray(t)?["",i.get("baseurl")].concat(t):["",i.get("baseurl"),t],t.join("/").replace(/\/+/,"/")},o.instance=t("./request"),e.exports=o},{"../../core/settings":12,"./request":14}],14:[function(t,e,n){var i=t("../utils"),o=t("../events"),s=function(t,e,n){this.method=e||"GET",this.data=n||{},this.url=t,this.headers={"Content-type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}
o(s.prototype),s.prototype.send=function(){var t=new XMLHttpRequest,e=this.method.toUpperCase(),n=this.query(this.data),o=this.url,s=this
"GET"===e&&n&&(o+=(-1===o.indexOf("?")?"?":"&")+n),t.open(e,o),t.onreadystatechange=function(){var e,n=this.readyState,i=this.status
if(4===n&&200===i){try{e=JSON.parse(this.responseText)}catch(o){s.emit("error",t,"Invalid JSON")}e&&s.emit("data",this,e)}},t.onerror=function(){s.emit("error",t,"Connection error")},i.each(this.headers,function(e,n){t.setRequestHeader(n,e)}),t.send(n)},s.prototype.success=function(t){return this.on("success",t),this},s.prototype.error=function(t){return this.on("error",t),this},s.prototype.header=function(t,e){return this.headers[t]=e,this},s.prototype.query=function(t){var e="",n=Object.keys(t)
return n.forEach(function(n,i){e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&"}),e.substr(0,e.length-1)},e.exports=s},{"../events":16,"../utils":18}],15:[function(t,e,n){var i={}
i.attributes=function(t){for(var e={},n=t.attributes,i=0,o=n.length;o>i;i++){var s=n[i]
e[s.nodeName]=s.nodeValue}return e},i.dataAttributes=function(t){var e=mini_blog.dom.attributes(t)
return Object.keys(e).forEach(function(t){0!==t.indexOf("data-")&&delete e[t]}),e},i.hasParent=function(t,e){return e(t.parentNode)?!0:t.parentNode===document.documentElement?!1:i.hasParent(t.parentNode,e)},i.insertAfter=function(t,e){t.parentNode.insertBefore(e,t.nextSibling)},e.exports=i},{}],16:[function(t,e,n){var i=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=mini_blog.toArray(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}}}
e.exports=i},{}],17:[function(t,e,n){var i=function(t){return t=t||(t=0),function(){return++t}}
e.exports=i},{}],18:[function(t,e,n){var i=function(t,e){for(var n in t)t.hasOwnProperty(n)&&e(t[n],n)},o=function(t,e){var n={}
for(var i in e)("undefined"==typeof t[i]||e[i]!==t[i])&&(n[i]=e[i]||t[i])
return n},s=function(t,e){var n,i={}
for(n in t)i[n]=t[n]
for(n in e)i[n]=e[n]
return i},r=function(t,e){for(var n in e)t[n]=e[n]},a=function(t){return Array.prototype.slice.call(t)},c=function(t,e){var n={}
return e.forEach(function(e){t[e]&&(n[e]=t[e])}),n}
e.exports={toArray:a,extend:r,merge:s,diff:o,each:i,pick:c}},{}],19:[function(t,e,n){var i=t("./helpers/utils"),o={components:t("./core/components/collection"),component:t("./core/components/component"),settings:t("./core/settings"),editor:t("./core/editor"),panel:t("./core/panel"),init:t("./core/init"),events:t("./helpers/events"),unique:t("./helpers/unique"),ajax:t("./helpers/ajax"),dom:t("./helpers/dom"),mvc:t("./mvc")}
i.extend(o,i),o.component.view=t("./core/components/view"),e.exports=o},{"./core/components/collection":1,"./core/components/component":2,"./core/components/view":3,"./core/editor":4,"./core/init":9,"./core/panel":11,"./core/settings":12,"./helpers/ajax":13,"./helpers/dom":15,"./helpers/events":16,"./helpers/unique":17,"./helpers/utils":18,"./mvc":23}],20:[function(t,e,n){var i=t("../../helpers/ajax")
e.exports={fetch:function(t,e,n){var o=t.options,s=isNaN(e)?e.id:e
i.get([o.baseurl,o.get,s]).success(function(i,o){var s=isNaN(e),r=t.create(t.parse(o),e)
s||(n&&n(e),t.emit("get",r))}).send()},insert:function(t,e,n){var o=t.options
i.post([o.baseurl,o.insert],e.all()).success(function(i,o){e.id=o.id,n&&n(e),t.emit("add",e)}).send()},update:function(t,e,n){var o=t.options
i.post([o.baseurl,o.update,e.id],e.diff()).success(function(){n&&n(e),t.emit("update",e)}).send()},remove:function(t,e,n){var o=t.options
i.post([o.baseurl,o.remove,e.id]).success(function(){e.destroy(),n&&n(e),t.emit("remove",e)}).send()}}},{"../../helpers/ajax":13}],21:[function(t,e,n){var i=t("../helpers/utils"),o=t("../helpers/events"),s=t("./extend"),r=t("./model"),a=function(t){this.models=t||{}}
o(a.prototype),a.prototype.get=function(t){return this.models[t]},a.prototype.add=function(t){this.models[t.id]=t,this.emit("add",t)},a.prototype.remove=function(t){var e=this.models[t]
delete this.models[t],this.emit("remove",e)},a.prototype.bootstrap=function(t){var e=this,n=function(t,n){t.id=t.id||n
var i=new r(t)
e.models[i.id]=i}
Array.isArray(t)?t.forEach(n):i.each(t,n)},a.prototype.forEach=function(t){i.each(this.models,t)},a.prototype.bindTo=function(t){var e=this.add.bind(this)
t.on("get",e),t.on("add",e),t.on("remove",this.remove.bind(this))},a.extend=s(a),e.exports=a},{"../helpers/events":16,"../helpers/utils":18,"./extend":22,"./model":25}],22:[function(t,e,n){var i=t("../helpers/utils"),o=function(t){return function(e){var n=function(){t.apply(this,i.toArray(arguments))}
return n.prototype=Object.create(t.prototype),i.each(e,function(t,e){n.prototype[e]=t}),n}}
e.exports=o},{"../helpers/utils":18}],23:[function(t,e,n){e.exports={collection:t("./collection"),mapper:t("./mapper"),model:t("./model"),view:t("./view")}},{"./collection":21,"./mapper":24,"./model":25,"./view":26}],24:[function(t,e,n){var i=t("../helpers/events"),o=t("./extend"),s=t("./model"),r=t("../helpers/utils"),a=t("./adapters/ajax"),c={baseurl:"/",adapter:a,model:s,get:"get",insert:"add",update:"edit",remove:"remove"},d=function(t){this.options=r.merge(c,t),this.adapter=this.options.adapter}
i(d.prototype),d.prototype.parse=function(t){return t},d.prototype.create=function(t,e){return e&&e instanceof s?(e.merge(t),e):new this.options.model(t)},d.prototype.fetch=function(t,e){this.adapter.fetch(this,t,e)},d.prototype.insert=function(t,e){this.adapter.insert(this,t,e)},d.prototype.update=function(t,e){this.adapter.update(this,t,e)},d.prototype.save=function(t,e){t.isNew()?this.insert(t,e):this.update(t,e)},d.prototype.remove=function(t,e){this.adapter.remove(this,t,e)},d.prototype.sync=function(t){t.forEach(function(e){e.isNew()?self.insert(e):e.isEmpty()?(self.remove(e),t.remove(e.id)):e.isDirty()&&self.update(e)})},d.extend=o(d),e.exports=d},{"../helpers/events":16,"../helpers/utils":18,"./adapters/ajax":20,"./extend":22,"./model":25}],25:[function(t,e,n){var i=t("../helpers/events"),o=t("../helpers/utils"),s=t("../helpers/unique")(),r=t("./extend"),a=function(t){var e=t&&t.id?t.id:-s()
t&&t.id&&delete t.id,t=o.merge(this.data||{},t||{}),this.previous=o.merge({},t),this.data=t,this.id=e}
i(a.prototype),a.prototype.get=function(t){return this.data[t]?this.data[t]:!1},a.prototype.set=function(t,e){this.data[t]=e,this.emit("change")},a.prototype.clear=function(){this.previous=o.merge({},this.data)},a.prototype.revert=function(){this.data=o.merge({},this.previous),this.emit("change")},a.prototype.all=function(){return o.merge(this.data,{})},a.prototype.diff=function(){return o.diff(this.previous,this.data)},a.prototype.destroy=function(){this.data={},this.id=-s(),this.emit("destroy")},a.prototype.reset=function(t){this.data=t,this.emit("change")},a.prototype.merge=function(t){t.id&&(this.id=t.id,delete t.id),this.data=o.merge(this.data,t),this.emit("change")},a.prototype.isNew=function(){return this.id<0},a.prototype.isDirty=function(){return Object.keys(this.diff()).length>0},a.prototype.isEmpty=function(){return 0===Object.keys(this.data).length},a.extend=r(a),e.exports=a},{"../helpers/events":16,"../helpers/unique":17,"../helpers/utils":18,"./extend":22}],26:[function(t,e,n){var i=t("./extend"),o=function(t,e){this.node=t,this.data=e,this.initialize()}
o.prototype.initialize=function(){},o.prototype.find=function(t){var e=this.node.querySelector(t)
return e||console.warn('Could not find node by selector "'+t+'"'),e},o.prototype.bind=function(t,e,n){var i=t instanceof Node?t:this.find(t)
i?i.addEventListener(e,n.bind(this)):console.warn("Node is not suitable for attaching events!")},o.extend=i(o),e.exports=o},{"./extend":22}]},{},[19])(19)})