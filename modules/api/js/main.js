!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var e
e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.mini_blog=t()}}(function(){return function t(e,n,o){function i(r,a){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require
if(!a&&c)return c(r,!0)
if(s)return s(r,!0)
var u=new Error("Cannot find module '"+r+"'")
throw u.code="MODULE_NOT_FOUND",u}var d=n[r]={exports:{}}
e[r][0].call(d.exports,function(t){var n=e[r][1][t]
return i(n?n:t)},d,d.exports,t,e,n,o)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r])
return i}({1:[function(t,e,n){function o(t){this.node=t,this.nodes={},this.setNodes(t),this.initialize()}var i=t("../helpers/utils")
o.prototype.initialize=function(){},o.prototype.setNodes=function(t){var e=i.toArray(t.querySelectorAll("[data-name]")),n=this
Object.keys(e).forEach(function(t){var o=e[t]
n.nodes[o.dataset.name]=o})},o.prototype.enable=function(){i.each(this.nodes,mini_blog.dom.makeEditable)},o.prototype.disable=function(){i.each(this.nodes,mini_blog.dom.unmakeEditable)},o.prototype.save=function(){},o.prototype.cancel=function(){},o.prototype.collectData=function(){var t={}
return i.each(this.nodes,function(e){t[e.dataset.name]=e.innerHTML}),t},e.exports=o},{"../helpers/utils":16}],2:[function(t,e,n){var o=t("./editor"),i=(t("../helpers/dom"),{components:{}})
i.register=function(t,e){this.components[t]={constructor:e}},i.create=function(t,e){return this.components[t]?new this.components[t].constructor(e):!1},i.createComponent=function(t){if(!t.component&&!t.dataset.ignore){var e=t.dataset.component,n=i.create(e,t)
if(!n)return console.warn('Component "'+e+'" does not exists!')
var s=new o.view(null,{node:t,component:n})
t.component=n,t.editor=s,t.appendChild(s.node)}},e.exports=i},{"../helpers/dom":13,"./editor":3}],3:[function(t,e,n){var o=t("../mvc"),i=t("./panel/mods"),s=!1,r='<div class="edit">    <!-- <button class="edit-button button">        <i class="fa fa-fw fa-pencil"></i>    </button> --></div><div class="editing">    <button class="save-button button">        <i class="fa fa-fw fa-floppy-o"></i>    </button>    <button class="cancel-button button">        <i class="fa fa-fw fa-times"></i>    </button>    <button class="remove-button button">        <i class="fa fa-fw fa-trash"></i>    </button></div>',a=o.view.extend({initialize:function(){this.node=document.createElement("div"),this.node.className="m-editor",this.node.innerHTML=r,this.setupEvents(),this.show(!0)},setupEvents:function(){this.data.node.addEventListener("dblclick",this.edit.bind(this)),this.bind(".save-button","click",this.save),this.bind(".cancel-button","click",this.cancel),this.bind(".remove-button","click",this.remove)},disable:function(){this.data.component.disable(),i.disableMods(),s=!1,this.show(!0)},edit:function(){s||(s=!0,i.enableMods(this.data.component.mods||[]),this.data.component.enable(),this.show(!1))},remove:function(){window.confirm("Are you sure you want to delete this entry?")&&(this.disable(),this.data.component.remove(),this.destroy())},save:function(){this.disable(),this.data.component.save()},cancel:function(){this.disable(),this.data.component.cancel()},destroy:function(){this.node.parentNode.removeChild(this.node)},show:function(t){this.find(".edit").style.display=t?"block":"none",this.find(".editing").style.display=t?"none":"block",this.data.component.notRemovable&&(this.find(".remove-button").style.display="none")}})
e.exports={view:a}},{"../mvc":20,"./panel/mods":8}],4:[function(t,e,n){var o=t("./components"),i=t("./settings"),s=t("../helpers/utils"),r=function(t){i.assign(t),s.toArray(document.querySelectorAll("[data-component]")).forEach(o.createComponent)}
e.exports=r},{"../helpers/utils":16,"./components":2,"./settings":10}],5:[function(t,e,n){function o(t){this.editor=t,this.actions={},this.init()}var i=t("../helpers/utils")
o.prototype.init=function(){},o.prototype.enable=function(){i.each(this.actions,function(t){t.button.style.display="block"})},o.prototype.disable=function(){i.each(this.actions,function(t){t.button.style.display="none"})},o.prototype.addAction=function(t,e,n){var o=document.createElement("button"),i=this
o.innerHTML=n?e:t,o.setAttribute("data-role",t),o.className="button",o.addEventListener("click",function(){i.trigger(this.dataset.role,i.editor.current)}),this.editor.container.appendChild(o),n=n||e,n.button=o,this.actions[t]=n},o.prototype.trigger=function(t,e){this.actions[t]&&this.actions[t](e)},e.exports=o},{"../helpers/utils":16}],6:[function(t,e,n){var o=t("../../mvc/view"),i=t("../../helpers/ajax"),s=t("../components"),r=o.extend({initialize:function(){this.find(".button").addEventListener("click",this.addView.bind(this))},addView:function(t){t.preventDefault(),this.createNode(document.querySelector(".posts"))},createNode:function(t){var e=this,n=function(n,o){e.appendNode(o,t)}
i.post("api/template/posts").success(n).send()},appendNode:function(t,e){var n=document.createElement("div")
n.innerHTML=t.html
var o=n.children[0]
o.removeAttribute("data-id"),e.insertBefore(o,e.children[0]),s.createComponent(o),o.component.post.merge(t.data),o.editor.edit()}})
e.exports=new r(document.querySelector("#mini_panel .add"))},{"../../helpers/ajax":11,"../../mvc/view":23,"../components":2}],7:[function(t,e,n){var o=t("../../helpers/utils"),i={status:t("./status-bar"),add:t("./add")}
o.extend(i,t("./mods")),e.exports=i},{"../../helpers/utils":16,"./add":6,"./mods":8,"./status-bar":9}],8:[function(t,e,n){function o(t,e){this.mods[t]=e}function i(){r.each(this.mods,function(t){t.disable()})}function s(t){r.each(this.mods,function(e){-1!==t.indexOf(e.name)&&e.enable()})}var r=t("../../helpers/utils"),a={mods:{},container:document.querySelector("#mini_panel .buttons"),disableMods:i,enableMods:s,addMod:o}
e.exports=a},{"../../helpers/utils":16}],9:[function(t,e,n){var o=document.querySelector("#mini_panel .status-bar"),i={errors:[],node:o,icon:o.querySelector(".fa"),success:function(){this.node.className="status-bar button success",this.icon.className="fa fa-fw fa-check-circle"},failure:function(t){this.node.className="status-bar button failure",this.icon.className="fa fa-fw fa-exclamation-circle",this.errors.concat(Array.isArray(t)?t:[t])},clear:function(){this.errors=[],this.node.className="status-bar button",this.icon.className="fa fa-fw fa-circle"},wait:function(){this.errors=[],this.node.className="status-bar button",this.icon.className="fa fa-fw fa-spinner fa-spin"}}
e.exports=i},{}],10:[function(t,e,n){var o={settings:{},get:function(t){return this.settings[t]?this.settings[t]:null},set:function(t,e){this.settings[t]=e},assign:function(t){this.settings=t}}
e.exports=o},{}],11:[function(t,e,n){var o=t("../core/settings"),i=t("../core/panel/status-bar"),s={}
s.request=function(t,e,n){var o=new this.instance(this.url(t),e,n)
return o.on("data",function(t,e){"ok"!==e.status&&o.emit("error",t,e.message)}),o.on("error",function(t,e){i.failure(e)}),o},["get","post","put","delete"].forEach(function(t){var e=t.toUpperCase()
s[t]=function(t,n){return this.request(t,e,n)}}),s.url=function(t){return t=Array.isArray(t)?["",o.get("baseurl")].concat(t):["",o.get("baseurl"),t],t.join("/").replace(/\/+/,"/")},s.instance=t("./ajax_instance"),e.exports=s},{"../core/panel/status-bar":9,"../core/settings":10,"./ajax_instance":12}],12:[function(t,e,n){var o=(t("./ajax"),t("./utils")),i=t("./events"),s=function(t,e,n){this.method=e||"GET",this.data=n||{},this.url=t,this.headers={"Content-type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}
i(s.prototype),s.prototype.send=function(){var t=new XMLHttpRequest,e=this.method.toUpperCase(),n=this.query(this.data),i=this.url,s=this
"GET"===e&&n&&(i+=(-1===i.indexOf("?")?"?":"&")+n),t.open(e,i),t.onreadystatechange=function(){var e,n=this.readyState,o=this.status
if(4===n&&200===o){try{e=JSON.parse(this.responseText)}catch(i){s.emit("error",t,"Invalid JSON")}e&&s.emit("data",this,e)}},t.onerror=function(){s.emit("error",t,"AJAX Error")},o.each(this.headers,function(e,n){t.setRequestHeader(n,e)}),t.send(n)},s.prototype.success=function(t){return this.on("data",t),this},s.prototype.error=function(t){return this.on("error",t),this},s.prototype.header=function(t,e){return this.headers[t]=e,this},s.prototype.query=function(t){var e="",n=Object.keys(t)
return n.forEach(function(n,o){e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&"}),e.substr(0,e.length-1)},e.exports=s},{"./ajax":11,"./events":14,"./utils":16}],13:[function(t,e,n){var o={}
o.attributes=function(t){for(var e={},n=t.attributes,o=0,i=n.length;i>o;o++){var s=n[o]
e[s.nodeName]=s.nodeValue}return e},o.dataAttributes=function(t){var e=mini_blog.dom.attributes(t)
return Object.keys(e).forEach(function(t){0!==t.indexOf("data-")&&delete e[t]}),e},o.hasParent=function(t,e){return e(t.parentNode)?!0:t.parentNode===document.documentElement?!1:o.hasParent(t.parentNode,e)},o.makeEditable=function(t){t.setAttribute("contenteditable","true"),t.classList.add("m-editable"),t.isEditable||(t.addEventListener("paste",function(t){t.preventDefault()
var e=t.clipboardData.getData("text/plain").replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\n\r?/g,"<br/>\n")
document.execCommand("insertHTML",!1,e)}),t.addEventListener("keyup",function(t){if(!(13!==t.keyCode||t.shiftKey&&t.ctrlKey)){var e=document.getSelection(),n=o.hasParent(e.anchorNode,function(t){var e=t.nodeName.toLowerCase()
return console.log(e),"li"===e||"pre"===e})
n||document.execCommand("formatBlock",null,"p")}}),t.isEditable=!0)},o.unmakeEditable=function(t){t.removeAttribute("contenteditable"),t.classList.remove("m-editable")},e.exports=o},{}],14:[function(t,e,n){var o=function(t){t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=mini_blog.toArray(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}}}
e.exports=o},{}],15:[function(t,e,n){var o=function(t){return t=t||(t=0),function(){return++t}}
e.exports=o},{}],16:[function(t,e,n){var o=function(t,e){for(var n in t)t.hasOwnProperty(n)&&e(t[n],n)},i=function(t,e){var n={}
for(var o in e)("undefined"==typeof t[o]||e[o]!==t[o])&&(n[o]=e[o]||t[o])
return n},s=function(t,e){var n,o={}
for(n in t)o[n]=t[n]
for(n in e)o[n]=e[n]
return o},r=function(t,e){for(var n in e)t[n]=e[n]},a=function(t){return Array.prototype.slice.call(t)},c=function(t,e){var n={}
return e.forEach(function(e){t[e]&&(n[e]=t[e])}),n}
e.exports={toArray:a,extend:r,merge:s,diff:i,each:o,pick:c}},{}],17:[function(t,e,n){var o=t("./helpers/utils"),i={components:t("./core/components"),component:t("./core/component"),settings:t("./core/settings"),editor:t("./core/editor"),panel:t("./core/panel"),init:t("./core/init"),mod:t("./core/mod"),events:t("./helpers/events"),unique:t("./helpers/unique"),ajax:t("./helpers/ajax"),dom:t("./helpers/dom"),mvc:t("./mvc")}
o.extend(i,o),e.exports=i},{"./core/component":1,"./core/components":2,"./core/editor":3,"./core/init":4,"./core/mod":5,"./core/panel":7,"./core/settings":10,"./helpers/ajax":11,"./helpers/dom":13,"./helpers/events":14,"./helpers/unique":15,"./helpers/utils":16,"./mvc":20}],18:[function(t,e,n){var o=t("../helpers/utils"),i=t("../helpers/events"),s=t("./extend"),r=t("./model"),a=function(t){this.models=t||{}}
i(a.prototype),a.prototype.get=function(t){return this.models[t]},a.prototype.add=function(t){this.models[t.id]=t,this.emit("add",t)},a.prototype.remove=function(t){var e=this.models[t]
delete this.models[t],this.emit("remove",e)},a.prototype.bootstrap=function(t){var e=this,n=function(t,n){t.id=t.id||n
var o=new r(t)
e.models[o.id]=o}
Array.isArray(t)?t.forEach(n):o.each(t,n)},a.prototype.forEach=function(t){o.each(this.models,t)},a.prototype.bindTo=function(t){var e=this
t.on("get",function(t){e.add(t)}),t.on("add",function(t){e.add(t)}),t.on("remove",function(t){e.remove(t.id)})},a.extend=s(a),e.exports=a},{"../helpers/events":14,"../helpers/utils":16,"./extend":19,"./model":22}],19:[function(t,e,n){var o=t("../helpers/utils"),i=function(t){return function(e){var n=function(){t.apply(this,o.toArray(arguments))}
return n.prototype=Object.create(t.prototype),o.each(e,function(t,e){n.prototype[e]=t}),n}}
e.exports=i},{"../helpers/utils":16}],20:[function(t,e,n){e.exports={collection:t("./collection"),mapper:t("./mapper"),model:t("./model"),view:t("./view")}},{"./collection":18,"./mapper":21,"./model":22,"./view":23}],21:[function(t,e,n){var o=t("../helpers/events"),i=t("../helpers/utils"),s=t("../helpers/ajax"),r=t("./extend"),a=t("./model"),c={baseurl:"/",model:a,get:"get",insert:"add",update:"edit",remove:"remove"},u=function(t){this.options=i.merge(c,t)}
o(u.prototype),u.prototype.parse=function(t){return t},u.prototype.create=function(t,e){return e?(e.merge(t),e):new this.options.model(t)},u.prototype.fetch=function(t,e,n){var o=this
s.get([this.options.baseurl,this.options.get,t]).success(function(t,i){var s=Boolean(e),r=o.create(o.parse(i),e)
s||(n&&n(e),o.emit("get",r))}).send()},u.prototype.insert=function(t,e){var n=this
s.post([this.options.baseurl,this.options.insert],t.all()).success(function(o,i){t.id=i.id,e&&e(t),n.emit("add",t)}).send()},u.prototype.update=function(t,e){var n=this
s.post([this.options.baseurl,this.options.update,t.id],t.diff()).success(function(){e&&e(t),n.emit("update",t)}).send()},u.prototype.save=function(t,e){t.isNew()?this.insert(t,e):this.update(t,e)},u.prototype.remove=function(t,e){var n=this
s.post([this.options.baseurl,this.options.remove,t.id]).success(function(){t.destroy(),e&&e(t),n.emit("remove",t)}).send()},u.prototype.sync=function(t){t.forEach(function(e){e.isNew()?self.insert(e):e.isEmpty()?(self.remove(e),t.remove(e)):e.isDirty()&&self.update(e)})},u.extend=r(u),e.exports=u},{"../helpers/ajax":11,"../helpers/events":14,"../helpers/utils":16,"./extend":19,"./model":22}],22:[function(t,e,n){var o=t("../helpers/events"),i=t("../helpers/utils"),s=t("../helpers/unique")(),r=t("./extend"),a=function(t){var e=t&&t.id?t.id:-s()
t&&t.id&&delete t.id,t=i.merge(this.data||{},t||{}),this.previous=i.merge({},t),this.data=t,this.id=e}
o(a.prototype),a.prototype.get=function(t){return this.data[t]?this.data[t]:!1},a.prototype.set=function(t,e){console.log(t,e),this.data[t]=e,this.emit("change")},a.prototype.clear=function(){this.previous=i.merge({},this.data)},a.prototype.revert=function(){this.data=i.merge({},this.previous),this.emit("change")},a.prototype.all=function(){return i.merge(this.data,{})},a.prototype.diff=function(){return i.diff(this.previous,this.data)},a.prototype.destroy=function(){this.data={},this.id=-s(),this.emit("destroy")},a.prototype.reset=function(t){this.data=t,this.emit("change")},a.prototype.merge=function(t){t.id&&(this.id=t.id,delete t.id),this.data=i.merge(this.data,t),this.emit("change")},a.prototype.isNew=function(){return this.id<0},a.prototype.isDirty=function(){return Object.keys(this.diff()).length>0},a.prototype.isEmpty=function(){return 0===Object.keys(this.data).length},a.extend=r(a),e.exports=a},{"../helpers/events":14,"../helpers/unique":15,"../helpers/utils":16,"./extend":19}],23:[function(t,e,n){var o=t("./extend"),i=function(t,e){this.node=t,this.data=e,this.initialize()}
i.prototype.initialize=function(){},i.prototype.render=function(){},i.prototype.find=function(t){return this.node.querySelector(t)},i.prototype.bind=function(t,e,n){this.find(t).addEventListener(e,n.bind(this))},i.extend=o(i),e.exports=i},{"./extend":19}]},{},[17])(17)})
