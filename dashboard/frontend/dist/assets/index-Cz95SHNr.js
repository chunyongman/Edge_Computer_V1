(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(l){if(l.ep)return;l.ep=!0;const a=t(l);fetch(l.href,a)}})();function f0(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var ns={exports:{}},cl={},es={exports:{}},H={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ai=Symbol.for("react.element"),u0=Symbol.for("react.portal"),h0=Symbol.for("react.fragment"),m0=Symbol.for("react.strict_mode"),y0=Symbol.for("react.profiler"),g0=Symbol.for("react.provider"),x0=Symbol.for("react.context"),k0=Symbol.for("react.forward_ref"),v0=Symbol.for("react.suspense"),w0=Symbol.for("react.memo"),z0=Symbol.for("react.lazy"),W1=Symbol.iterator;function M0(n){return n===null||typeof n!="object"?null:(n=W1&&n[W1]||n["@@iterator"],typeof n=="function"?n:null)}var ts={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},is=Object.assign,ls={};function kt(n,e,t){this.props=n,this.context=e,this.refs=ls,this.updater=t||ts}kt.prototype.isReactComponent={};kt.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};kt.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function rs(){}rs.prototype=kt.prototype;function Qr(n,e,t){this.props=n,this.context=e,this.refs=ls,this.updater=t||ts}var Kr=Qr.prototype=new rs;Kr.constructor=Qr;is(Kr,kt.prototype);Kr.isPureReactComponent=!0;var U1=Array.isArray,as=Object.prototype.hasOwnProperty,Zr={current:null},ss={key:!0,ref:!0,__self:!0,__source:!0};function os(n,e,t){var i,l={},a=null,s=null;if(e!=null)for(i in e.ref!==void 0&&(s=e.ref),e.key!==void 0&&(a=""+e.key),e)as.call(e,i)&&!ss.hasOwnProperty(i)&&(l[i]=e[i]);var o=arguments.length-2;if(o===1)l.children=t;else if(1<o){for(var d=Array(o),f=0;f<o;f++)d[f]=arguments[f+2];l.children=d}if(n&&n.defaultProps)for(i in o=n.defaultProps,o)l[i]===void 0&&(l[i]=o[i]);return{$$typeof:ai,type:n,key:a,ref:s,props:l,_owner:Zr.current}}function N0(n,e){return{$$typeof:ai,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function Yr(n){return typeof n=="object"&&n!==null&&n.$$typeof===ai}function _0(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var $1=/\/+/g;function bl(n,e){return typeof n=="object"&&n!==null&&n.key!=null?_0(""+n.key):e.toString(36)}function Ci(n,e,t,i,l){var a=typeof n;(a==="undefined"||a==="boolean")&&(n=null);var s=!1;if(n===null)s=!0;else switch(a){case"string":case"number":s=!0;break;case"object":switch(n.$$typeof){case ai:case u0:s=!0}}if(s)return s=n,l=l(s),n=i===""?"."+bl(s,0):i,U1(l)?(t="",n!=null&&(t=n.replace($1,"$&/")+"/"),Ci(l,e,t,"",function(f){return f})):l!=null&&(Yr(l)&&(l=N0(l,t+(!l.key||s&&s.key===l.key?"":(""+l.key).replace($1,"$&/")+"/")+n)),e.push(l)),1;if(s=0,i=i===""?".":i+":",U1(n))for(var o=0;o<n.length;o++){a=n[o];var d=i+bl(a,o);s+=Ci(a,e,t,d,l)}else if(d=M0(n),typeof d=="function")for(n=d.call(n),o=0;!(a=n.next()).done;)a=a.value,d=i+bl(a,o++),s+=Ci(a,e,t,d,l);else if(a==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return s}function fi(n,e,t){if(n==null)return n;var i=[],l=0;return Ci(n,i,"","",function(a){return e.call(t,a,l++)}),i}function j0(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var xn={current:null},Ei={transition:null},S0={ReactCurrentDispatcher:xn,ReactCurrentBatchConfig:Ei,ReactCurrentOwner:Zr};function ds(){throw Error("act(...) is not supported in production builds of React.")}H.Children={map:fi,forEach:function(n,e,t){fi(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return fi(n,function(){e++}),e},toArray:function(n){return fi(n,function(e){return e})||[]},only:function(n){if(!Yr(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};H.Component=kt;H.Fragment=h0;H.Profiler=y0;H.PureComponent=Qr;H.StrictMode=m0;H.Suspense=v0;H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=S0;H.act=ds;H.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=is({},n.props),l=n.key,a=n.ref,s=n._owner;if(e!=null){if(e.ref!==void 0&&(a=e.ref,s=Zr.current),e.key!==void 0&&(l=""+e.key),n.type&&n.type.defaultProps)var o=n.type.defaultProps;for(d in e)as.call(e,d)&&!ss.hasOwnProperty(d)&&(i[d]=e[d]===void 0&&o!==void 0?o[d]:e[d])}var d=arguments.length-2;if(d===1)i.children=t;else if(1<d){o=Array(d);for(var f=0;f<d;f++)o[f]=arguments[f+2];i.children=o}return{$$typeof:ai,type:n.type,key:l,ref:a,props:i,_owner:s}};H.createContext=function(n){return n={$$typeof:x0,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:g0,_context:n},n.Consumer=n};H.createElement=os;H.createFactory=function(n){var e=os.bind(null,n);return e.type=n,e};H.createRef=function(){return{current:null}};H.forwardRef=function(n){return{$$typeof:k0,render:n}};H.isValidElement=Yr;H.lazy=function(n){return{$$typeof:z0,_payload:{_status:-1,_result:n},_init:j0}};H.memo=function(n,e){return{$$typeof:w0,type:n,compare:e===void 0?null:e}};H.startTransition=function(n){var e=Ei.transition;Ei.transition={};try{n()}finally{Ei.transition=e}};H.unstable_act=ds;H.useCallback=function(n,e){return xn.current.useCallback(n,e)};H.useContext=function(n){return xn.current.useContext(n)};H.useDebugValue=function(){};H.useDeferredValue=function(n){return xn.current.useDeferredValue(n)};H.useEffect=function(n,e){return xn.current.useEffect(n,e)};H.useId=function(){return xn.current.useId()};H.useImperativeHandle=function(n,e,t){return xn.current.useImperativeHandle(n,e,t)};H.useInsertionEffect=function(n,e){return xn.current.useInsertionEffect(n,e)};H.useLayoutEffect=function(n,e){return xn.current.useLayoutEffect(n,e)};H.useMemo=function(n,e){return xn.current.useMemo(n,e)};H.useReducer=function(n,e,t){return xn.current.useReducer(n,e,t)};H.useRef=function(n){return xn.current.useRef(n)};H.useState=function(n){return xn.current.useState(n)};H.useSyncExternalStore=function(n,e,t){return xn.current.useSyncExternalStore(n,e,t)};H.useTransition=function(){return xn.current.useTransition()};H.version="18.3.1";es.exports=H;var I=es.exports;const b0=f0(I);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var C0=I,E0=Symbol.for("react.element"),P0=Symbol.for("react.fragment"),I0=Object.prototype.hasOwnProperty,A0=C0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,T0={key:!0,ref:!0,__self:!0,__source:!0};function ps(n,e,t){var i,l={},a=null,s=null;t!==void 0&&(a=""+t),e.key!==void 0&&(a=""+e.key),e.ref!==void 0&&(s=e.ref);for(i in e)I0.call(e,i)&&!T0.hasOwnProperty(i)&&(l[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)l[i]===void 0&&(l[i]=e[i]);return{$$typeof:E0,type:n,key:a,ref:s,props:l,_owner:A0.current}}cl.Fragment=P0;cl.jsx=ps;cl.jsxs=ps;ns.exports=cl;var r=ns.exports,er={},cs={exports:{}},En={},fs={exports:{}},us={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(w,S){var A=w.length;w.push(S);n:for(;0<A;){var T=A-1>>>1,D=w[T];if(0<l(D,S))w[T]=S,w[A]=D,A=T;else break n}}function t(w){return w.length===0?null:w[0]}function i(w){if(w.length===0)return null;var S=w[0],A=w.pop();if(A!==S){w[0]=A;n:for(var T=0,D=w.length,_n=D>>>1;T<_n;){var Ee=2*(T+1)-1,Sl=w[Ee],Pe=Ee+1,ci=w[Pe];if(0>l(Sl,A))Pe<D&&0>l(ci,Sl)?(w[T]=ci,w[Pe]=A,T=Pe):(w[T]=Sl,w[Ee]=A,T=Ee);else if(Pe<D&&0>l(ci,A))w[T]=ci,w[Pe]=A,T=Pe;else break n}}return S}function l(w,S){var A=w.sortIndex-S.sortIndex;return A!==0?A:w.id-S.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;n.unstable_now=function(){return a.now()}}else{var s=Date,o=s.now();n.unstable_now=function(){return s.now()-o}}var d=[],f=[],y=1,m=null,h=3,k=!1,z=!1,x=!1,E=typeof setTimeout=="function"?setTimeout:null,c=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function u(w){for(var S=t(f);S!==null;){if(S.callback===null)i(f);else if(S.startTime<=w)i(f),S.sortIndex=S.expirationTime,e(d,S);else break;S=t(f)}}function g(w){if(x=!1,u(w),!z)if(t(d)!==null)z=!0,F(N);else{var S=t(f);S!==null&&R(g,S.startTime-w)}}function N(w,S){z=!1,x&&(x=!1,c(j),j=-1),k=!0;var A=h;try{for(u(S),m=t(d);m!==null&&(!(m.expirationTime>S)||w&&!L());){var T=m.callback;if(typeof T=="function"){m.callback=null,h=m.priorityLevel;var D=T(m.expirationTime<=S);S=n.unstable_now(),typeof D=="function"?m.callback=D:m===t(d)&&i(d),u(S)}else i(d);m=t(d)}if(m!==null)var _n=!0;else{var Ee=t(f);Ee!==null&&R(g,Ee.startTime-S),_n=!1}return _n}finally{m=null,h=A,k=!1}}var M=!1,C=null,j=-1,v=5,_=-1;function L(){return!(n.unstable_now()-_<v)}function U(){if(C!==null){var w=n.unstable_now();_=w;var S=!0;try{S=C(!0,w)}finally{S?V():(M=!1,C=null)}}else M=!1}var V;if(typeof p=="function")V=function(){p(U)};else if(typeof MessageChannel<"u"){var O=new MessageChannel,cn=O.port2;O.port1.onmessage=U,V=function(){cn.postMessage(null)}}else V=function(){E(U,0)};function F(w){C=w,M||(M=!0,V())}function R(w,S){j=E(function(){w(n.unstable_now())},S)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(w){w.callback=null},n.unstable_continueExecution=function(){z||k||(z=!0,F(N))},n.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):v=0<w?Math.floor(1e3/w):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return t(d)},n.unstable_next=function(w){switch(h){case 1:case 2:case 3:var S=3;break;default:S=h}var A=h;h=S;try{return w()}finally{h=A}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(w,S){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var A=h;h=w;try{return S()}finally{h=A}},n.unstable_scheduleCallback=function(w,S,A){var T=n.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?T+A:T):A=T,w){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=A+D,w={id:y++,callback:S,priorityLevel:w,startTime:A,expirationTime:D,sortIndex:-1},A>T?(w.sortIndex=A,e(f,w),t(d)===null&&w===t(f)&&(x?(c(j),j=-1):x=!0,R(g,A-T))):(w.sortIndex=D,e(d,w),z||k||(z=!0,F(N))),w},n.unstable_shouldYield=L,n.unstable_wrapCallback=function(w){var S=h;return function(){var A=h;h=S;try{return w.apply(this,arguments)}finally{h=A}}}})(us);fs.exports=us;var F0=fs.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var L0=I,Cn=F0;function b(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var hs=new Set,Ut={};function Ve(n,e){ft(n,e),ft(n+"Capture",e)}function ft(n,e){for(Ut[n]=e,n=0;n<e.length;n++)hs.add(e[n])}var te=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tr=Object.prototype.hasOwnProperty,D0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,V1={},G1={};function O0(n){return tr.call(G1,n)?!0:tr.call(V1,n)?!1:D0.test(n)?G1[n]=!0:(V1[n]=!0,!1)}function R0(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function H0(n,e,t,i){if(e===null||typeof e>"u"||R0(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function kn(n,e,t,i,l,a,s){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=a,this.removeEmptyString=s}var pn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){pn[n]=new kn(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];pn[e]=new kn(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){pn[n]=new kn(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){pn[n]=new kn(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){pn[n]=new kn(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){pn[n]=new kn(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){pn[n]=new kn(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){pn[n]=new kn(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){pn[n]=new kn(n,5,!1,n.toLowerCase(),null,!1,!1)});var Jr=/[\-:]([a-z])/g;function qr(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(Jr,qr);pn[e]=new kn(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(Jr,qr);pn[e]=new kn(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(Jr,qr);pn[e]=new kn(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){pn[n]=new kn(n,1,!1,n.toLowerCase(),null,!1,!1)});pn.xlinkHref=new kn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){pn[n]=new kn(n,1,!1,n.toLowerCase(),null,!0,!0)});function n1(n,e,t,i){var l=pn.hasOwnProperty(e)?pn[e]:null;(l!==null?l.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(H0(e,t,l,i)&&(t=null),i||l===null?O0(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):l.mustUseProperty?n[l.propertyName]=t===null?l.type===3?!1:"":t:(e=l.attributeName,i=l.attributeNamespace,t===null?n.removeAttribute(e):(l=l.type,t=l===3||l===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var ae=L0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ui=Symbol.for("react.element"),Qe=Symbol.for("react.portal"),Ke=Symbol.for("react.fragment"),e1=Symbol.for("react.strict_mode"),ir=Symbol.for("react.profiler"),ms=Symbol.for("react.provider"),ys=Symbol.for("react.context"),t1=Symbol.for("react.forward_ref"),lr=Symbol.for("react.suspense"),rr=Symbol.for("react.suspense_list"),i1=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),gs=Symbol.for("react.offscreen"),X1=Symbol.iterator;function zt(n){return n===null||typeof n!="object"?null:(n=X1&&n[X1]||n["@@iterator"],typeof n=="function"?n:null)}var J=Object.assign,Cl;function Et(n){if(Cl===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);Cl=e&&e[1]||""}return`
`+Cl+n}var El=!1;function Pl(n,e){if(!n||El)return"";El=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(f){var i=f}Reflect.construct(n,[],e)}else{try{e.call()}catch(f){i=f}n.call(e.prototype)}else{try{throw Error()}catch(f){i=f}n()}}catch(f){if(f&&i&&typeof f.stack=="string"){for(var l=f.stack.split(`
`),a=i.stack.split(`
`),s=l.length-1,o=a.length-1;1<=s&&0<=o&&l[s]!==a[o];)o--;for(;1<=s&&0<=o;s--,o--)if(l[s]!==a[o]){if(s!==1||o!==1)do if(s--,o--,0>o||l[s]!==a[o]){var d=`
`+l[s].replace(" at new "," at ");return n.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",n.displayName)),d}while(1<=s&&0<=o);break}}}finally{El=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?Et(n):""}function B0(n){switch(n.tag){case 5:return Et(n.type);case 16:return Et("Lazy");case 13:return Et("Suspense");case 19:return Et("SuspenseList");case 0:case 2:case 15:return n=Pl(n.type,!1),n;case 11:return n=Pl(n.type.render,!1),n;case 1:return n=Pl(n.type,!0),n;default:return""}}function ar(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case Ke:return"Fragment";case Qe:return"Portal";case ir:return"Profiler";case e1:return"StrictMode";case lr:return"Suspense";case rr:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case ys:return(n.displayName||"Context")+".Consumer";case ms:return(n._context.displayName||"Context")+".Provider";case t1:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case i1:return e=n.displayName||null,e!==null?e:ar(n.type)||"Memo";case ce:e=n._payload,n=n._init;try{return ar(n(e))}catch{}}return null}function W0(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ar(e);case 8:return e===e1?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function _e(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function xs(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function U0(n){var e=xs(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var l=t.get,a=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return l.call(this)},set:function(s){i=""+s,a.call(this,s)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(s){i=""+s},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function hi(n){n._valueTracker||(n._valueTracker=U0(n))}function ks(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=xs(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function Bi(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function sr(n,e){var t=e.checked;return J({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Q1(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=_e(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function vs(n,e){e=e.checked,e!=null&&n1(n,"checked",e,!1)}function or(n,e){vs(n,e);var t=_e(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?dr(n,e.type,t):e.hasOwnProperty("defaultValue")&&dr(n,e.type,_e(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function K1(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function dr(n,e,t){(e!=="number"||Bi(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Pt=Array.isArray;function at(n,e,t,i){if(n=n.options,e){e={};for(var l=0;l<t.length;l++)e["$"+t[l]]=!0;for(t=0;t<n.length;t++)l=e.hasOwnProperty("$"+n[t].value),n[t].selected!==l&&(n[t].selected=l),l&&i&&(n[t].defaultSelected=!0)}else{for(t=""+_e(t),e=null,l=0;l<n.length;l++){if(n[l].value===t){n[l].selected=!0,i&&(n[l].defaultSelected=!0);return}e!==null||n[l].disabled||(e=n[l])}e!==null&&(e.selected=!0)}}function pr(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(b(91));return J({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Z1(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(b(92));if(Pt(t)){if(1<t.length)throw Error(b(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:_e(t)}}function ws(n,e){var t=_e(e.value),i=_e(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function Y1(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function zs(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function cr(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?zs(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var mi,Ms=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,l){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,l)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(mi=mi||document.createElement("div"),mi.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=mi.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function $t(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Tt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$0=["Webkit","ms","Moz","O"];Object.keys(Tt).forEach(function(n){$0.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Tt[e]=Tt[n]})});function Ns(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Tt.hasOwnProperty(n)&&Tt[n]?(""+e).trim():e+"px"}function _s(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,l=Ns(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,l):n[t]=l}}var V0=J({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function fr(n,e){if(e){if(V0[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(b(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(b(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(b(61))}if(e.style!=null&&typeof e.style!="object")throw Error(b(62))}}function ur(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var hr=null;function l1(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var mr=null,st=null,ot=null;function J1(n){if(n=di(n)){if(typeof mr!="function")throw Error(b(280));var e=n.stateNode;e&&(e=yl(e),mr(n.stateNode,n.type,e))}}function js(n){st?ot?ot.push(n):ot=[n]:st=n}function Ss(){if(st){var n=st,e=ot;if(ot=st=null,J1(n),e)for(n=0;n<e.length;n++)J1(e[n])}}function bs(n,e){return n(e)}function Cs(){}var Il=!1;function Es(n,e,t){if(Il)return n(e,t);Il=!0;try{return bs(n,e,t)}finally{Il=!1,(st!==null||ot!==null)&&(Cs(),Ss())}}function Vt(n,e){var t=n.stateNode;if(t===null)return null;var i=yl(t);if(i===null)return null;t=i[e];n:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break n;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(b(231,e,typeof t));return t}var yr=!1;if(te)try{var Mt={};Object.defineProperty(Mt,"passive",{get:function(){yr=!0}}),window.addEventListener("test",Mt,Mt),window.removeEventListener("test",Mt,Mt)}catch{yr=!1}function G0(n,e,t,i,l,a,s,o,d){var f=Array.prototype.slice.call(arguments,3);try{e.apply(t,f)}catch(y){this.onError(y)}}var Ft=!1,Wi=null,Ui=!1,gr=null,X0={onError:function(n){Ft=!0,Wi=n}};function Q0(n,e,t,i,l,a,s,o,d){Ft=!1,Wi=null,G0.apply(X0,arguments)}function K0(n,e,t,i,l,a,s,o,d){if(Q0.apply(this,arguments),Ft){if(Ft){var f=Wi;Ft=!1,Wi=null}else throw Error(b(198));Ui||(Ui=!0,gr=f)}}function Ge(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function Ps(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function q1(n){if(Ge(n)!==n)throw Error(b(188))}function Z0(n){var e=n.alternate;if(!e){if(e=Ge(n),e===null)throw Error(b(188));return e!==n?null:n}for(var t=n,i=e;;){var l=t.return;if(l===null)break;var a=l.alternate;if(a===null){if(i=l.return,i!==null){t=i;continue}break}if(l.child===a.child){for(a=l.child;a;){if(a===t)return q1(l),n;if(a===i)return q1(l),e;a=a.sibling}throw Error(b(188))}if(t.return!==i.return)t=l,i=a;else{for(var s=!1,o=l.child;o;){if(o===t){s=!0,t=l,i=a;break}if(o===i){s=!0,i=l,t=a;break}o=o.sibling}if(!s){for(o=a.child;o;){if(o===t){s=!0,t=a,i=l;break}if(o===i){s=!0,i=a,t=l;break}o=o.sibling}if(!s)throw Error(b(189))}}if(t.alternate!==i)throw Error(b(190))}if(t.tag!==3)throw Error(b(188));return t.stateNode.current===t?n:e}function Is(n){return n=Z0(n),n!==null?As(n):null}function As(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=As(n);if(e!==null)return e;n=n.sibling}return null}var Ts=Cn.unstable_scheduleCallback,na=Cn.unstable_cancelCallback,Y0=Cn.unstable_shouldYield,J0=Cn.unstable_requestPaint,nn=Cn.unstable_now,q0=Cn.unstable_getCurrentPriorityLevel,r1=Cn.unstable_ImmediatePriority,Fs=Cn.unstable_UserBlockingPriority,$i=Cn.unstable_NormalPriority,no=Cn.unstable_LowPriority,Ls=Cn.unstable_IdlePriority,fl=null,Kn=null;function eo(n){if(Kn&&typeof Kn.onCommitFiberRoot=="function")try{Kn.onCommitFiberRoot(fl,n,void 0,(n.current.flags&128)===128)}catch{}}var Wn=Math.clz32?Math.clz32:lo,to=Math.log,io=Math.LN2;function lo(n){return n>>>=0,n===0?32:31-(to(n)/io|0)|0}var yi=64,gi=4194304;function It(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Vi(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,l=n.suspendedLanes,a=n.pingedLanes,s=t&268435455;if(s!==0){var o=s&~l;o!==0?i=It(o):(a&=s,a!==0&&(i=It(a)))}else s=t&~l,s!==0?i=It(s):a!==0&&(i=It(a));if(i===0)return 0;if(e!==0&&e!==i&&!(e&l)&&(l=i&-i,a=e&-e,l>=a||l===16&&(a&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-Wn(e),l=1<<t,i|=n[t],e&=~l;return i}function ro(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ao(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,l=n.expirationTimes,a=n.pendingLanes;0<a;){var s=31-Wn(a),o=1<<s,d=l[s];d===-1?(!(o&t)||o&i)&&(l[s]=ro(o,e)):d<=e&&(n.expiredLanes|=o),a&=~o}}function xr(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Ds(){var n=yi;return yi<<=1,!(yi&4194240)&&(yi=64),n}function Al(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function si(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-Wn(e),n[e]=t}function so(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var l=31-Wn(t),a=1<<l;e[l]=0,i[l]=-1,n[l]=-1,t&=~a}}function a1(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-Wn(t),l=1<<i;l&e|n[i]&e&&(n[i]|=e),t&=~l}}var $=0;function Os(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var Rs,s1,Hs,Bs,Ws,kr=!1,xi=[],ge=null,xe=null,ke=null,Gt=new Map,Xt=new Map,ue=[],oo="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ea(n,e){switch(n){case"focusin":case"focusout":ge=null;break;case"dragenter":case"dragleave":xe=null;break;case"mouseover":case"mouseout":ke=null;break;case"pointerover":case"pointerout":Gt.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xt.delete(e.pointerId)}}function Nt(n,e,t,i,l,a){return n===null||n.nativeEvent!==a?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:a,targetContainers:[l]},e!==null&&(e=di(e),e!==null&&s1(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,l!==null&&e.indexOf(l)===-1&&e.push(l),n)}function po(n,e,t,i,l){switch(e){case"focusin":return ge=Nt(ge,n,e,t,i,l),!0;case"dragenter":return xe=Nt(xe,n,e,t,i,l),!0;case"mouseover":return ke=Nt(ke,n,e,t,i,l),!0;case"pointerover":var a=l.pointerId;return Gt.set(a,Nt(Gt.get(a)||null,n,e,t,i,l)),!0;case"gotpointercapture":return a=l.pointerId,Xt.set(a,Nt(Xt.get(a)||null,n,e,t,i,l)),!0}return!1}function Us(n){var e=Fe(n.target);if(e!==null){var t=Ge(e);if(t!==null){if(e=t.tag,e===13){if(e=Ps(t),e!==null){n.blockedOn=e,Ws(n.priority,function(){Hs(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Pi(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=vr(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);hr=i,t.target.dispatchEvent(i),hr=null}else return e=di(t),e!==null&&s1(e),n.blockedOn=t,!1;e.shift()}return!0}function ta(n,e,t){Pi(n)&&t.delete(e)}function co(){kr=!1,ge!==null&&Pi(ge)&&(ge=null),xe!==null&&Pi(xe)&&(xe=null),ke!==null&&Pi(ke)&&(ke=null),Gt.forEach(ta),Xt.forEach(ta)}function _t(n,e){n.blockedOn===e&&(n.blockedOn=null,kr||(kr=!0,Cn.unstable_scheduleCallback(Cn.unstable_NormalPriority,co)))}function Qt(n){function e(l){return _t(l,n)}if(0<xi.length){_t(xi[0],n);for(var t=1;t<xi.length;t++){var i=xi[t];i.blockedOn===n&&(i.blockedOn=null)}}for(ge!==null&&_t(ge,n),xe!==null&&_t(xe,n),ke!==null&&_t(ke,n),Gt.forEach(e),Xt.forEach(e),t=0;t<ue.length;t++)i=ue[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<ue.length&&(t=ue[0],t.blockedOn===null);)Us(t),t.blockedOn===null&&ue.shift()}var dt=ae.ReactCurrentBatchConfig,Gi=!0;function fo(n,e,t,i){var l=$,a=dt.transition;dt.transition=null;try{$=1,o1(n,e,t,i)}finally{$=l,dt.transition=a}}function uo(n,e,t,i){var l=$,a=dt.transition;dt.transition=null;try{$=4,o1(n,e,t,i)}finally{$=l,dt.transition=a}}function o1(n,e,t,i){if(Gi){var l=vr(n,e,t,i);if(l===null)Ul(n,e,i,Xi,t),ea(n,i);else if(po(l,n,e,t,i))i.stopPropagation();else if(ea(n,i),e&4&&-1<oo.indexOf(n)){for(;l!==null;){var a=di(l);if(a!==null&&Rs(a),a=vr(n,e,t,i),a===null&&Ul(n,e,i,Xi,t),a===l)break;l=a}l!==null&&i.stopPropagation()}else Ul(n,e,i,null,t)}}var Xi=null;function vr(n,e,t,i){if(Xi=null,n=l1(i),n=Fe(n),n!==null)if(e=Ge(n),e===null)n=null;else if(t=e.tag,t===13){if(n=Ps(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Xi=n,null}function $s(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(q0()){case r1:return 1;case Fs:return 4;case $i:case no:return 16;case Ls:return 536870912;default:return 16}default:return 16}}var me=null,d1=null,Ii=null;function Vs(){if(Ii)return Ii;var n,e=d1,t=e.length,i,l="value"in me?me.value:me.textContent,a=l.length;for(n=0;n<t&&e[n]===l[n];n++);var s=t-n;for(i=1;i<=s&&e[t-i]===l[a-i];i++);return Ii=l.slice(n,1<i?1-i:void 0)}function Ai(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function ki(){return!0}function ia(){return!1}function Pn(n){function e(t,i,l,a,s){this._reactName=t,this._targetInst=l,this.type=i,this.nativeEvent=a,this.target=s,this.currentTarget=null;for(var o in n)n.hasOwnProperty(o)&&(t=n[o],this[o]=t?t(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?ki:ia,this.isPropagationStopped=ia,this}return J(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=ki)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=ki)},persist:function(){},isPersistent:ki}),e}var vt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},p1=Pn(vt),oi=J({},vt,{view:0,detail:0}),ho=Pn(oi),Tl,Fl,jt,ul=J({},oi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:c1,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==jt&&(jt&&n.type==="mousemove"?(Tl=n.screenX-jt.screenX,Fl=n.screenY-jt.screenY):Fl=Tl=0,jt=n),Tl)},movementY:function(n){return"movementY"in n?n.movementY:Fl}}),la=Pn(ul),mo=J({},ul,{dataTransfer:0}),yo=Pn(mo),go=J({},oi,{relatedTarget:0}),Ll=Pn(go),xo=J({},vt,{animationName:0,elapsedTime:0,pseudoElement:0}),ko=Pn(xo),vo=J({},vt,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),wo=Pn(vo),zo=J({},vt,{data:0}),ra=Pn(zo),Mo={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},No={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_o={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function jo(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=_o[n])?!!e[n]:!1}function c1(){return jo}var So=J({},oi,{key:function(n){if(n.key){var e=Mo[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Ai(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?No[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:c1,charCode:function(n){return n.type==="keypress"?Ai(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ai(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),bo=Pn(So),Co=J({},ul,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),aa=Pn(Co),Eo=J({},oi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:c1}),Po=Pn(Eo),Io=J({},vt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ao=Pn(Io),To=J({},ul,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Fo=Pn(To),Lo=[9,13,27,32],f1=te&&"CompositionEvent"in window,Lt=null;te&&"documentMode"in document&&(Lt=document.documentMode);var Do=te&&"TextEvent"in window&&!Lt,Gs=te&&(!f1||Lt&&8<Lt&&11>=Lt),sa=" ",oa=!1;function Xs(n,e){switch(n){case"keyup":return Lo.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qs(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ze=!1;function Oo(n,e){switch(n){case"compositionend":return Qs(e);case"keypress":return e.which!==32?null:(oa=!0,sa);case"textInput":return n=e.data,n===sa&&oa?null:n;default:return null}}function Ro(n,e){if(Ze)return n==="compositionend"||!f1&&Xs(n,e)?(n=Vs(),Ii=d1=me=null,Ze=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Gs&&e.locale!=="ko"?null:e.data;default:return null}}var Ho={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function da(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Ho[n.type]:e==="textarea"}function Ks(n,e,t,i){js(i),e=Qi(e,"onChange"),0<e.length&&(t=new p1("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var Dt=null,Kt=null;function Bo(n){a7(n,0)}function hl(n){var e=qe(n);if(ks(e))return n}function Wo(n,e){if(n==="change")return e}var Zs=!1;if(te){var Dl;if(te){var Ol="oninput"in document;if(!Ol){var pa=document.createElement("div");pa.setAttribute("oninput","return;"),Ol=typeof pa.oninput=="function"}Dl=Ol}else Dl=!1;Zs=Dl&&(!document.documentMode||9<document.documentMode)}function ca(){Dt&&(Dt.detachEvent("onpropertychange",Ys),Kt=Dt=null)}function Ys(n){if(n.propertyName==="value"&&hl(Kt)){var e=[];Ks(e,Kt,n,l1(n)),Es(Bo,e)}}function Uo(n,e,t){n==="focusin"?(ca(),Dt=e,Kt=t,Dt.attachEvent("onpropertychange",Ys)):n==="focusout"&&ca()}function $o(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return hl(Kt)}function Vo(n,e){if(n==="click")return hl(e)}function Go(n,e){if(n==="input"||n==="change")return hl(e)}function Xo(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var $n=typeof Object.is=="function"?Object.is:Xo;function Zt(n,e){if($n(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var l=t[i];if(!tr.call(e,l)||!$n(n[l],e[l]))return!1}return!0}function fa(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function ua(n,e){var t=fa(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}n:{for(;t;){if(t.nextSibling){t=t.nextSibling;break n}t=t.parentNode}t=void 0}t=fa(t)}}function Js(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?Js(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function qs(){for(var n=window,e=Bi();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=Bi(n.document)}return e}function u1(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function Qo(n){var e=qs(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&Js(t.ownerDocument.documentElement,t)){if(i!==null&&u1(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var l=t.textContent.length,a=Math.min(i.start,l);i=i.end===void 0?a:Math.min(i.end,l),!n.extend&&a>i&&(l=i,i=a,a=l),l=ua(t,a);var s=ua(t,i);l&&s&&(n.rangeCount!==1||n.anchorNode!==l.node||n.anchorOffset!==l.offset||n.focusNode!==s.node||n.focusOffset!==s.offset)&&(e=e.createRange(),e.setStart(l.node,l.offset),n.removeAllRanges(),a>i?(n.addRange(e),n.extend(s.node,s.offset)):(e.setEnd(s.node,s.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Ko=te&&"documentMode"in document&&11>=document.documentMode,Ye=null,wr=null,Ot=null,zr=!1;function ha(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;zr||Ye==null||Ye!==Bi(i)||(i=Ye,"selectionStart"in i&&u1(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ot&&Zt(Ot,i)||(Ot=i,i=Qi(wr,"onSelect"),0<i.length&&(e=new p1("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=Ye)))}function vi(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Je={animationend:vi("Animation","AnimationEnd"),animationiteration:vi("Animation","AnimationIteration"),animationstart:vi("Animation","AnimationStart"),transitionend:vi("Transition","TransitionEnd")},Rl={},n7={};te&&(n7=document.createElement("div").style,"AnimationEvent"in window||(delete Je.animationend.animation,delete Je.animationiteration.animation,delete Je.animationstart.animation),"TransitionEvent"in window||delete Je.transitionend.transition);function ml(n){if(Rl[n])return Rl[n];if(!Je[n])return n;var e=Je[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in n7)return Rl[n]=e[t];return n}var e7=ml("animationend"),t7=ml("animationiteration"),i7=ml("animationstart"),l7=ml("transitionend"),r7=new Map,ma="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Se(n,e){r7.set(n,e),Ve(e,[n])}for(var Hl=0;Hl<ma.length;Hl++){var Bl=ma[Hl],Zo=Bl.toLowerCase(),Yo=Bl[0].toUpperCase()+Bl.slice(1);Se(Zo,"on"+Yo)}Se(e7,"onAnimationEnd");Se(t7,"onAnimationIteration");Se(i7,"onAnimationStart");Se("dblclick","onDoubleClick");Se("focusin","onFocus");Se("focusout","onBlur");Se(l7,"onTransitionEnd");ft("onMouseEnter",["mouseout","mouseover"]);ft("onMouseLeave",["mouseout","mouseover"]);ft("onPointerEnter",["pointerout","pointerover"]);ft("onPointerLeave",["pointerout","pointerover"]);Ve("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ve("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ve("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ve("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ve("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ve("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var At="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Jo=new Set("cancel close invalid load scroll toggle".split(" ").concat(At));function ya(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,K0(i,e,void 0,n),n.currentTarget=null}function a7(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],l=i.event;i=i.listeners;n:{var a=void 0;if(e)for(var s=i.length-1;0<=s;s--){var o=i[s],d=o.instance,f=o.currentTarget;if(o=o.listener,d!==a&&l.isPropagationStopped())break n;ya(l,o,f),a=d}else for(s=0;s<i.length;s++){if(o=i[s],d=o.instance,f=o.currentTarget,o=o.listener,d!==a&&l.isPropagationStopped())break n;ya(l,o,f),a=d}}}if(Ui)throw n=gr,Ui=!1,gr=null,n}function X(n,e){var t=e[Sr];t===void 0&&(t=e[Sr]=new Set);var i=n+"__bubble";t.has(i)||(s7(e,n,2,!1),t.add(i))}function Wl(n,e,t){var i=0;e&&(i|=4),s7(t,n,i,e)}var wi="_reactListening"+Math.random().toString(36).slice(2);function Yt(n){if(!n[wi]){n[wi]=!0,hs.forEach(function(t){t!=="selectionchange"&&(Jo.has(t)||Wl(t,!1,n),Wl(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[wi]||(e[wi]=!0,Wl("selectionchange",!1,e))}}function s7(n,e,t,i){switch($s(e)){case 1:var l=fo;break;case 4:l=uo;break;default:l=o1}t=l.bind(null,e,t,n),l=void 0,!yr||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(l=!0),i?l!==void 0?n.addEventListener(e,t,{capture:!0,passive:l}):n.addEventListener(e,t,!0):l!==void 0?n.addEventListener(e,t,{passive:l}):n.addEventListener(e,t,!1)}function Ul(n,e,t,i,l){var a=i;if(!(e&1)&&!(e&2)&&i!==null)n:for(;;){if(i===null)return;var s=i.tag;if(s===3||s===4){var o=i.stateNode.containerInfo;if(o===l||o.nodeType===8&&o.parentNode===l)break;if(s===4)for(s=i.return;s!==null;){var d=s.tag;if((d===3||d===4)&&(d=s.stateNode.containerInfo,d===l||d.nodeType===8&&d.parentNode===l))return;s=s.return}for(;o!==null;){if(s=Fe(o),s===null)return;if(d=s.tag,d===5||d===6){i=a=s;continue n}o=o.parentNode}}i=i.return}Es(function(){var f=a,y=l1(t),m=[];n:{var h=r7.get(n);if(h!==void 0){var k=p1,z=n;switch(n){case"keypress":if(Ai(t)===0)break n;case"keydown":case"keyup":k=bo;break;case"focusin":z="focus",k=Ll;break;case"focusout":z="blur",k=Ll;break;case"beforeblur":case"afterblur":k=Ll;break;case"click":if(t.button===2)break n;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=la;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=yo;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=Po;break;case e7:case t7:case i7:k=ko;break;case l7:k=Ao;break;case"scroll":k=ho;break;case"wheel":k=Fo;break;case"copy":case"cut":case"paste":k=wo;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=aa}var x=(e&4)!==0,E=!x&&n==="scroll",c=x?h!==null?h+"Capture":null:h;x=[];for(var p=f,u;p!==null;){u=p;var g=u.stateNode;if(u.tag===5&&g!==null&&(u=g,c!==null&&(g=Vt(p,c),g!=null&&x.push(Jt(p,g,u)))),E)break;p=p.return}0<x.length&&(h=new k(h,z,null,t,y),m.push({event:h,listeners:x}))}}if(!(e&7)){n:{if(h=n==="mouseover"||n==="pointerover",k=n==="mouseout"||n==="pointerout",h&&t!==hr&&(z=t.relatedTarget||t.fromElement)&&(Fe(z)||z[ie]))break n;if((k||h)&&(h=y.window===y?y:(h=y.ownerDocument)?h.defaultView||h.parentWindow:window,k?(z=t.relatedTarget||t.toElement,k=f,z=z?Fe(z):null,z!==null&&(E=Ge(z),z!==E||z.tag!==5&&z.tag!==6)&&(z=null)):(k=null,z=f),k!==z)){if(x=la,g="onMouseLeave",c="onMouseEnter",p="mouse",(n==="pointerout"||n==="pointerover")&&(x=aa,g="onPointerLeave",c="onPointerEnter",p="pointer"),E=k==null?h:qe(k),u=z==null?h:qe(z),h=new x(g,p+"leave",k,t,y),h.target=E,h.relatedTarget=u,g=null,Fe(y)===f&&(x=new x(c,p+"enter",z,t,y),x.target=u,x.relatedTarget=E,g=x),E=g,k&&z)e:{for(x=k,c=z,p=0,u=x;u;u=Xe(u))p++;for(u=0,g=c;g;g=Xe(g))u++;for(;0<p-u;)x=Xe(x),p--;for(;0<u-p;)c=Xe(c),u--;for(;p--;){if(x===c||c!==null&&x===c.alternate)break e;x=Xe(x),c=Xe(c)}x=null}else x=null;k!==null&&ga(m,h,k,x,!1),z!==null&&E!==null&&ga(m,E,z,x,!0)}}n:{if(h=f?qe(f):window,k=h.nodeName&&h.nodeName.toLowerCase(),k==="select"||k==="input"&&h.type==="file")var N=Wo;else if(da(h))if(Zs)N=Go;else{N=$o;var M=Uo}else(k=h.nodeName)&&k.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(N=Vo);if(N&&(N=N(n,f))){Ks(m,N,t,y);break n}M&&M(n,h,f),n==="focusout"&&(M=h._wrapperState)&&M.controlled&&h.type==="number"&&dr(h,"number",h.value)}switch(M=f?qe(f):window,n){case"focusin":(da(M)||M.contentEditable==="true")&&(Ye=M,wr=f,Ot=null);break;case"focusout":Ot=wr=Ye=null;break;case"mousedown":zr=!0;break;case"contextmenu":case"mouseup":case"dragend":zr=!1,ha(m,t,y);break;case"selectionchange":if(Ko)break;case"keydown":case"keyup":ha(m,t,y)}var C;if(f1)n:{switch(n){case"compositionstart":var j="onCompositionStart";break n;case"compositionend":j="onCompositionEnd";break n;case"compositionupdate":j="onCompositionUpdate";break n}j=void 0}else Ze?Xs(n,t)&&(j="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(j="onCompositionStart");j&&(Gs&&t.locale!=="ko"&&(Ze||j!=="onCompositionStart"?j==="onCompositionEnd"&&Ze&&(C=Vs()):(me=y,d1="value"in me?me.value:me.textContent,Ze=!0)),M=Qi(f,j),0<M.length&&(j=new ra(j,n,null,t,y),m.push({event:j,listeners:M}),C?j.data=C:(C=Qs(t),C!==null&&(j.data=C)))),(C=Do?Oo(n,t):Ro(n,t))&&(f=Qi(f,"onBeforeInput"),0<f.length&&(y=new ra("onBeforeInput","beforeinput",null,t,y),m.push({event:y,listeners:f}),y.data=C))}a7(m,e)})}function Jt(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Qi(n,e){for(var t=e+"Capture",i=[];n!==null;){var l=n,a=l.stateNode;l.tag===5&&a!==null&&(l=a,a=Vt(n,t),a!=null&&i.unshift(Jt(n,a,l)),a=Vt(n,e),a!=null&&i.push(Jt(n,a,l))),n=n.return}return i}function Xe(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function ga(n,e,t,i,l){for(var a=e._reactName,s=[];t!==null&&t!==i;){var o=t,d=o.alternate,f=o.stateNode;if(d!==null&&d===i)break;o.tag===5&&f!==null&&(o=f,l?(d=Vt(t,a),d!=null&&s.unshift(Jt(t,d,o))):l||(d=Vt(t,a),d!=null&&s.push(Jt(t,d,o)))),t=t.return}s.length!==0&&n.push({event:e,listeners:s})}var qo=/\r\n?/g,nd=/\u0000|\uFFFD/g;function xa(n){return(typeof n=="string"?n:""+n).replace(qo,`
`).replace(nd,"")}function zi(n,e,t){if(e=xa(e),xa(n)!==e&&t)throw Error(b(425))}function Ki(){}var Mr=null,Nr=null;function _r(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var jr=typeof setTimeout=="function"?setTimeout:void 0,ed=typeof clearTimeout=="function"?clearTimeout:void 0,ka=typeof Promise=="function"?Promise:void 0,td=typeof queueMicrotask=="function"?queueMicrotask:typeof ka<"u"?function(n){return ka.resolve(null).then(n).catch(id)}:jr;function id(n){setTimeout(function(){throw n})}function $l(n,e){var t=e,i=0;do{var l=t.nextSibling;if(n.removeChild(t),l&&l.nodeType===8)if(t=l.data,t==="/$"){if(i===0){n.removeChild(l),Qt(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=l}while(t);Qt(e)}function ve(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function va(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var wt=Math.random().toString(36).slice(2),Qn="__reactFiber$"+wt,qt="__reactProps$"+wt,ie="__reactContainer$"+wt,Sr="__reactEvents$"+wt,ld="__reactListeners$"+wt,rd="__reactHandles$"+wt;function Fe(n){var e=n[Qn];if(e)return e;for(var t=n.parentNode;t;){if(e=t[ie]||t[Qn]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=va(n);n!==null;){if(t=n[Qn])return t;n=va(n)}return e}n=t,t=n.parentNode}return null}function di(n){return n=n[Qn]||n[ie],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function qe(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(b(33))}function yl(n){return n[qt]||null}var br=[],nt=-1;function be(n){return{current:n}}function Q(n){0>nt||(n.current=br[nt],br[nt]=null,nt--)}function G(n,e){nt++,br[nt]=n.current,n.current=e}var je={},mn=be(je),zn=be(!1),He=je;function ut(n,e){var t=n.type.contextTypes;if(!t)return je;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var l={},a;for(a in t)l[a]=e[a];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=l),l}function Mn(n){return n=n.childContextTypes,n!=null}function Zi(){Q(zn),Q(mn)}function wa(n,e,t){if(mn.current!==je)throw Error(b(168));G(mn,e),G(zn,t)}function o7(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var l in i)if(!(l in e))throw Error(b(108,W0(n)||"Unknown",l));return J({},t,i)}function Yi(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||je,He=mn.current,G(mn,n),G(zn,zn.current),!0}function za(n,e,t){var i=n.stateNode;if(!i)throw Error(b(169));t?(n=o7(n,e,He),i.__reactInternalMemoizedMergedChildContext=n,Q(zn),Q(mn),G(mn,n)):Q(zn),G(zn,t)}var Jn=null,gl=!1,Vl=!1;function d7(n){Jn===null?Jn=[n]:Jn.push(n)}function ad(n){gl=!0,d7(n)}function Ce(){if(!Vl&&Jn!==null){Vl=!0;var n=0,e=$;try{var t=Jn;for($=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}Jn=null,gl=!1}catch(l){throw Jn!==null&&(Jn=Jn.slice(n+1)),Ts(r1,Ce),l}finally{$=e,Vl=!1}}return null}var et=[],tt=0,Ji=null,qi=0,In=[],An=0,Be=null,qn=1,ne="";function Ie(n,e){et[tt++]=qi,et[tt++]=Ji,Ji=n,qi=e}function p7(n,e,t){In[An++]=qn,In[An++]=ne,In[An++]=Be,Be=n;var i=qn;n=ne;var l=32-Wn(i)-1;i&=~(1<<l),t+=1;var a=32-Wn(e)+l;if(30<a){var s=l-l%5;a=(i&(1<<s)-1).toString(32),i>>=s,l-=s,qn=1<<32-Wn(e)+l|t<<l|i,ne=a+n}else qn=1<<a|t<<l|i,ne=n}function h1(n){n.return!==null&&(Ie(n,1),p7(n,1,0))}function m1(n){for(;n===Ji;)Ji=et[--tt],et[tt]=null,qi=et[--tt],et[tt]=null;for(;n===Be;)Be=In[--An],In[An]=null,ne=In[--An],In[An]=null,qn=In[--An],In[An]=null}var bn=null,Sn=null,K=!1,Bn=null;function c7(n,e){var t=Tn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Ma(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,bn=n,Sn=ve(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,bn=n,Sn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Be!==null?{id:qn,overflow:ne}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=Tn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,bn=n,Sn=null,!0):!1;default:return!1}}function Cr(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Er(n){if(K){var e=Sn;if(e){var t=e;if(!Ma(n,e)){if(Cr(n))throw Error(b(418));e=ve(t.nextSibling);var i=bn;e&&Ma(n,e)?c7(i,t):(n.flags=n.flags&-4097|2,K=!1,bn=n)}}else{if(Cr(n))throw Error(b(418));n.flags=n.flags&-4097|2,K=!1,bn=n}}}function Na(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;bn=n}function Mi(n){if(n!==bn)return!1;if(!K)return Na(n),K=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!_r(n.type,n.memoizedProps)),e&&(e=Sn)){if(Cr(n))throw f7(),Error(b(418));for(;e;)c7(n,e),e=ve(e.nextSibling)}if(Na(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(b(317));n:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){Sn=ve(n.nextSibling);break n}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}Sn=null}}else Sn=bn?ve(n.stateNode.nextSibling):null;return!0}function f7(){for(var n=Sn;n;)n=ve(n.nextSibling)}function ht(){Sn=bn=null,K=!1}function y1(n){Bn===null?Bn=[n]:Bn.push(n)}var sd=ae.ReactCurrentBatchConfig;function St(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(b(309));var i=t.stateNode}if(!i)throw Error(b(147,n));var l=i,a=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===a?e.ref:(e=function(s){var o=l.refs;s===null?delete o[a]:o[a]=s},e._stringRef=a,e)}if(typeof n!="string")throw Error(b(284));if(!t._owner)throw Error(b(290,n))}return n}function Ni(n,e){throw n=Object.prototype.toString.call(e),Error(b(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function _a(n){var e=n._init;return e(n._payload)}function u7(n){function e(c,p){if(n){var u=c.deletions;u===null?(c.deletions=[p],c.flags|=16):u.push(p)}}function t(c,p){if(!n)return null;for(;p!==null;)e(c,p),p=p.sibling;return null}function i(c,p){for(c=new Map;p!==null;)p.key!==null?c.set(p.key,p):c.set(p.index,p),p=p.sibling;return c}function l(c,p){return c=Ne(c,p),c.index=0,c.sibling=null,c}function a(c,p,u){return c.index=u,n?(u=c.alternate,u!==null?(u=u.index,u<p?(c.flags|=2,p):u):(c.flags|=2,p)):(c.flags|=1048576,p)}function s(c){return n&&c.alternate===null&&(c.flags|=2),c}function o(c,p,u,g){return p===null||p.tag!==6?(p=Jl(u,c.mode,g),p.return=c,p):(p=l(p,u),p.return=c,p)}function d(c,p,u,g){var N=u.type;return N===Ke?y(c,p,u.props.children,g,u.key):p!==null&&(p.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ce&&_a(N)===p.type)?(g=l(p,u.props),g.ref=St(c,p,u),g.return=c,g):(g=Hi(u.type,u.key,u.props,null,c.mode,g),g.ref=St(c,p,u),g.return=c,g)}function f(c,p,u,g){return p===null||p.tag!==4||p.stateNode.containerInfo!==u.containerInfo||p.stateNode.implementation!==u.implementation?(p=ql(u,c.mode,g),p.return=c,p):(p=l(p,u.children||[]),p.return=c,p)}function y(c,p,u,g,N){return p===null||p.tag!==7?(p=Re(u,c.mode,g,N),p.return=c,p):(p=l(p,u),p.return=c,p)}function m(c,p,u){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Jl(""+p,c.mode,u),p.return=c,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case ui:return u=Hi(p.type,p.key,p.props,null,c.mode,u),u.ref=St(c,null,p),u.return=c,u;case Qe:return p=ql(p,c.mode,u),p.return=c,p;case ce:var g=p._init;return m(c,g(p._payload),u)}if(Pt(p)||zt(p))return p=Re(p,c.mode,u,null),p.return=c,p;Ni(c,p)}return null}function h(c,p,u,g){var N=p!==null?p.key:null;if(typeof u=="string"&&u!==""||typeof u=="number")return N!==null?null:o(c,p,""+u,g);if(typeof u=="object"&&u!==null){switch(u.$$typeof){case ui:return u.key===N?d(c,p,u,g):null;case Qe:return u.key===N?f(c,p,u,g):null;case ce:return N=u._init,h(c,p,N(u._payload),g)}if(Pt(u)||zt(u))return N!==null?null:y(c,p,u,g,null);Ni(c,u)}return null}function k(c,p,u,g,N){if(typeof g=="string"&&g!==""||typeof g=="number")return c=c.get(u)||null,o(p,c,""+g,N);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ui:return c=c.get(g.key===null?u:g.key)||null,d(p,c,g,N);case Qe:return c=c.get(g.key===null?u:g.key)||null,f(p,c,g,N);case ce:var M=g._init;return k(c,p,u,M(g._payload),N)}if(Pt(g)||zt(g))return c=c.get(u)||null,y(p,c,g,N,null);Ni(p,g)}return null}function z(c,p,u,g){for(var N=null,M=null,C=p,j=p=0,v=null;C!==null&&j<u.length;j++){C.index>j?(v=C,C=null):v=C.sibling;var _=h(c,C,u[j],g);if(_===null){C===null&&(C=v);break}n&&C&&_.alternate===null&&e(c,C),p=a(_,p,j),M===null?N=_:M.sibling=_,M=_,C=v}if(j===u.length)return t(c,C),K&&Ie(c,j),N;if(C===null){for(;j<u.length;j++)C=m(c,u[j],g),C!==null&&(p=a(C,p,j),M===null?N=C:M.sibling=C,M=C);return K&&Ie(c,j),N}for(C=i(c,C);j<u.length;j++)v=k(C,c,j,u[j],g),v!==null&&(n&&v.alternate!==null&&C.delete(v.key===null?j:v.key),p=a(v,p,j),M===null?N=v:M.sibling=v,M=v);return n&&C.forEach(function(L){return e(c,L)}),K&&Ie(c,j),N}function x(c,p,u,g){var N=zt(u);if(typeof N!="function")throw Error(b(150));if(u=N.call(u),u==null)throw Error(b(151));for(var M=N=null,C=p,j=p=0,v=null,_=u.next();C!==null&&!_.done;j++,_=u.next()){C.index>j?(v=C,C=null):v=C.sibling;var L=h(c,C,_.value,g);if(L===null){C===null&&(C=v);break}n&&C&&L.alternate===null&&e(c,C),p=a(L,p,j),M===null?N=L:M.sibling=L,M=L,C=v}if(_.done)return t(c,C),K&&Ie(c,j),N;if(C===null){for(;!_.done;j++,_=u.next())_=m(c,_.value,g),_!==null&&(p=a(_,p,j),M===null?N=_:M.sibling=_,M=_);return K&&Ie(c,j),N}for(C=i(c,C);!_.done;j++,_=u.next())_=k(C,c,j,_.value,g),_!==null&&(n&&_.alternate!==null&&C.delete(_.key===null?j:_.key),p=a(_,p,j),M===null?N=_:M.sibling=_,M=_);return n&&C.forEach(function(U){return e(c,U)}),K&&Ie(c,j),N}function E(c,p,u,g){if(typeof u=="object"&&u!==null&&u.type===Ke&&u.key===null&&(u=u.props.children),typeof u=="object"&&u!==null){switch(u.$$typeof){case ui:n:{for(var N=u.key,M=p;M!==null;){if(M.key===N){if(N=u.type,N===Ke){if(M.tag===7){t(c,M.sibling),p=l(M,u.props.children),p.return=c,c=p;break n}}else if(M.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ce&&_a(N)===M.type){t(c,M.sibling),p=l(M,u.props),p.ref=St(c,M,u),p.return=c,c=p;break n}t(c,M);break}else e(c,M);M=M.sibling}u.type===Ke?(p=Re(u.props.children,c.mode,g,u.key),p.return=c,c=p):(g=Hi(u.type,u.key,u.props,null,c.mode,g),g.ref=St(c,p,u),g.return=c,c=g)}return s(c);case Qe:n:{for(M=u.key;p!==null;){if(p.key===M)if(p.tag===4&&p.stateNode.containerInfo===u.containerInfo&&p.stateNode.implementation===u.implementation){t(c,p.sibling),p=l(p,u.children||[]),p.return=c,c=p;break n}else{t(c,p);break}else e(c,p);p=p.sibling}p=ql(u,c.mode,g),p.return=c,c=p}return s(c);case ce:return M=u._init,E(c,p,M(u._payload),g)}if(Pt(u))return z(c,p,u,g);if(zt(u))return x(c,p,u,g);Ni(c,u)}return typeof u=="string"&&u!==""||typeof u=="number"?(u=""+u,p!==null&&p.tag===6?(t(c,p.sibling),p=l(p,u),p.return=c,c=p):(t(c,p),p=Jl(u,c.mode,g),p.return=c,c=p),s(c)):t(c,p)}return E}var mt=u7(!0),h7=u7(!1),nl=be(null),el=null,it=null,g1=null;function x1(){g1=it=el=null}function k1(n){var e=nl.current;Q(nl),n._currentValue=e}function Pr(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function pt(n,e){el=n,g1=it=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(wn=!0),n.firstContext=null)}function Ln(n){var e=n._currentValue;if(g1!==n)if(n={context:n,memoizedValue:e,next:null},it===null){if(el===null)throw Error(b(308));it=n,el.dependencies={lanes:0,firstContext:n}}else it=it.next=n;return e}var Le=null;function v1(n){Le===null?Le=[n]:Le.push(n)}function m7(n,e,t,i){var l=e.interleaved;return l===null?(t.next=t,v1(e)):(t.next=l.next,l.next=t),e.interleaved=t,le(n,i)}function le(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var fe=!1;function w1(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function y7(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function ee(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function we(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,W&2){var l=i.pending;return l===null?e.next=e:(e.next=l.next,l.next=e),i.pending=e,le(n,t)}return l=i.interleaved,l===null?(e.next=e,v1(i)):(e.next=l.next,l.next=e),i.interleaved=e,le(n,t)}function Ti(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,a1(n,t)}}function ja(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var l=null,a=null;if(t=t.firstBaseUpdate,t!==null){do{var s={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};a===null?l=a=s:a=a.next=s,t=t.next}while(t!==null);a===null?l=a=e:a=a.next=e}else l=a=e;t={baseState:i.baseState,firstBaseUpdate:l,lastBaseUpdate:a,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function tl(n,e,t,i){var l=n.updateQueue;fe=!1;var a=l.firstBaseUpdate,s=l.lastBaseUpdate,o=l.shared.pending;if(o!==null){l.shared.pending=null;var d=o,f=d.next;d.next=null,s===null?a=f:s.next=f,s=d;var y=n.alternate;y!==null&&(y=y.updateQueue,o=y.lastBaseUpdate,o!==s&&(o===null?y.firstBaseUpdate=f:o.next=f,y.lastBaseUpdate=d))}if(a!==null){var m=l.baseState;s=0,y=f=d=null,o=a;do{var h=o.lane,k=o.eventTime;if((i&h)===h){y!==null&&(y=y.next={eventTime:k,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});n:{var z=n,x=o;switch(h=e,k=t,x.tag){case 1:if(z=x.payload,typeof z=="function"){m=z.call(k,m,h);break n}m=z;break n;case 3:z.flags=z.flags&-65537|128;case 0:if(z=x.payload,h=typeof z=="function"?z.call(k,m,h):z,h==null)break n;m=J({},m,h);break n;case 2:fe=!0}}o.callback!==null&&o.lane!==0&&(n.flags|=64,h=l.effects,h===null?l.effects=[o]:h.push(o))}else k={eventTime:k,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},y===null?(f=y=k,d=m):y=y.next=k,s|=h;if(o=o.next,o===null){if(o=l.shared.pending,o===null)break;h=o,o=h.next,h.next=null,l.lastBaseUpdate=h,l.shared.pending=null}}while(!0);if(y===null&&(d=m),l.baseState=d,l.firstBaseUpdate=f,l.lastBaseUpdate=y,e=l.shared.interleaved,e!==null){l=e;do s|=l.lane,l=l.next;while(l!==e)}else a===null&&(l.shared.lanes=0);Ue|=s,n.lanes=s,n.memoizedState=m}}function Sa(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],l=i.callback;if(l!==null){if(i.callback=null,i=t,typeof l!="function")throw Error(b(191,l));l.call(i)}}}var pi={},Zn=be(pi),ni=be(pi),ei=be(pi);function De(n){if(n===pi)throw Error(b(174));return n}function z1(n,e){switch(G(ei,e),G(ni,n),G(Zn,pi),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:cr(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=cr(e,n)}Q(Zn),G(Zn,e)}function yt(){Q(Zn),Q(ni),Q(ei)}function g7(n){De(ei.current);var e=De(Zn.current),t=cr(e,n.type);e!==t&&(G(ni,n),G(Zn,t))}function M1(n){ni.current===n&&(Q(Zn),Q(ni))}var Z=be(0);function il(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Gl=[];function N1(){for(var n=0;n<Gl.length;n++)Gl[n]._workInProgressVersionPrimary=null;Gl.length=0}var Fi=ae.ReactCurrentDispatcher,Xl=ae.ReactCurrentBatchConfig,We=0,Y=null,ln=null,an=null,ll=!1,Rt=!1,ti=0,od=0;function fn(){throw Error(b(321))}function _1(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!$n(n[t],e[t]))return!1;return!0}function j1(n,e,t,i,l,a){if(We=a,Y=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Fi.current=n===null||n.memoizedState===null?fd:ud,n=t(i,l),Rt){a=0;do{if(Rt=!1,ti=0,25<=a)throw Error(b(301));a+=1,an=ln=null,e.updateQueue=null,Fi.current=hd,n=t(i,l)}while(Rt)}if(Fi.current=rl,e=ln!==null&&ln.next!==null,We=0,an=ln=Y=null,ll=!1,e)throw Error(b(300));return n}function S1(){var n=ti!==0;return ti=0,n}function Xn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return an===null?Y.memoizedState=an=n:an=an.next=n,an}function Dn(){if(ln===null){var n=Y.alternate;n=n!==null?n.memoizedState:null}else n=ln.next;var e=an===null?Y.memoizedState:an.next;if(e!==null)an=e,ln=n;else{if(n===null)throw Error(b(310));ln=n,n={memoizedState:ln.memoizedState,baseState:ln.baseState,baseQueue:ln.baseQueue,queue:ln.queue,next:null},an===null?Y.memoizedState=an=n:an=an.next=n}return an}function ii(n,e){return typeof e=="function"?e(n):e}function Ql(n){var e=Dn(),t=e.queue;if(t===null)throw Error(b(311));t.lastRenderedReducer=n;var i=ln,l=i.baseQueue,a=t.pending;if(a!==null){if(l!==null){var s=l.next;l.next=a.next,a.next=s}i.baseQueue=l=a,t.pending=null}if(l!==null){a=l.next,i=i.baseState;var o=s=null,d=null,f=a;do{var y=f.lane;if((We&y)===y)d!==null&&(d=d.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),i=f.hasEagerState?f.eagerState:n(i,f.action);else{var m={lane:y,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};d===null?(o=d=m,s=i):d=d.next=m,Y.lanes|=y,Ue|=y}f=f.next}while(f!==null&&f!==a);d===null?s=i:d.next=o,$n(i,e.memoizedState)||(wn=!0),e.memoizedState=i,e.baseState=s,e.baseQueue=d,t.lastRenderedState=i}if(n=t.interleaved,n!==null){l=n;do a=l.lane,Y.lanes|=a,Ue|=a,l=l.next;while(l!==n)}else l===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Kl(n){var e=Dn(),t=e.queue;if(t===null)throw Error(b(311));t.lastRenderedReducer=n;var i=t.dispatch,l=t.pending,a=e.memoizedState;if(l!==null){t.pending=null;var s=l=l.next;do a=n(a,s.action),s=s.next;while(s!==l);$n(a,e.memoizedState)||(wn=!0),e.memoizedState=a,e.baseQueue===null&&(e.baseState=a),t.lastRenderedState=a}return[a,i]}function x7(){}function k7(n,e){var t=Y,i=Dn(),l=e(),a=!$n(i.memoizedState,l);if(a&&(i.memoizedState=l,wn=!0),i=i.queue,b1(z7.bind(null,t,i,n),[n]),i.getSnapshot!==e||a||an!==null&&an.memoizedState.tag&1){if(t.flags|=2048,li(9,w7.bind(null,t,i,l,e),void 0,null),sn===null)throw Error(b(349));We&30||v7(t,e,l)}return l}function v7(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=Y.updateQueue,e===null?(e={lastEffect:null,stores:null},Y.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function w7(n,e,t,i){e.value=t,e.getSnapshot=i,M7(e)&&N7(n)}function z7(n,e,t){return t(function(){M7(e)&&N7(n)})}function M7(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!$n(n,t)}catch{return!0}}function N7(n){var e=le(n,1);e!==null&&Un(e,n,1,-1)}function ba(n){var e=Xn();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ii,lastRenderedState:n},e.queue=n,n=n.dispatch=cd.bind(null,Y,n),[e.memoizedState,n]}function li(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=Y.updateQueue,e===null?(e={lastEffect:null,stores:null},Y.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function _7(){return Dn().memoizedState}function Li(n,e,t,i){var l=Xn();Y.flags|=n,l.memoizedState=li(1|e,t,void 0,i===void 0?null:i)}function xl(n,e,t,i){var l=Dn();i=i===void 0?null:i;var a=void 0;if(ln!==null){var s=ln.memoizedState;if(a=s.destroy,i!==null&&_1(i,s.deps)){l.memoizedState=li(e,t,a,i);return}}Y.flags|=n,l.memoizedState=li(1|e,t,a,i)}function Ca(n,e){return Li(8390656,8,n,e)}function b1(n,e){return xl(2048,8,n,e)}function j7(n,e){return xl(4,2,n,e)}function S7(n,e){return xl(4,4,n,e)}function b7(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function C7(n,e,t){return t=t!=null?t.concat([n]):null,xl(4,4,b7.bind(null,e,n),t)}function C1(){}function E7(n,e){var t=Dn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&_1(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function P7(n,e){var t=Dn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&_1(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function I7(n,e,t){return We&21?($n(t,e)||(t=Ds(),Y.lanes|=t,Ue|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,wn=!0),n.memoizedState=t)}function dd(n,e){var t=$;$=t!==0&&4>t?t:4,n(!0);var i=Xl.transition;Xl.transition={};try{n(!1),e()}finally{$=t,Xl.transition=i}}function A7(){return Dn().memoizedState}function pd(n,e,t){var i=Me(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},T7(n))F7(e,t);else if(t=m7(n,e,t,i),t!==null){var l=gn();Un(t,n,i,l),L7(t,e,i)}}function cd(n,e,t){var i=Me(n),l={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(T7(n))F7(e,l);else{var a=n.alternate;if(n.lanes===0&&(a===null||a.lanes===0)&&(a=e.lastRenderedReducer,a!==null))try{var s=e.lastRenderedState,o=a(s,t);if(l.hasEagerState=!0,l.eagerState=o,$n(o,s)){var d=e.interleaved;d===null?(l.next=l,v1(e)):(l.next=d.next,d.next=l),e.interleaved=l;return}}catch{}finally{}t=m7(n,e,l,i),t!==null&&(l=gn(),Un(t,n,i,l),L7(t,e,i))}}function T7(n){var e=n.alternate;return n===Y||e!==null&&e===Y}function F7(n,e){Rt=ll=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function L7(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,a1(n,t)}}var rl={readContext:Ln,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useInsertionEffect:fn,useLayoutEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useMutableSource:fn,useSyncExternalStore:fn,useId:fn,unstable_isNewReconciler:!1},fd={readContext:Ln,useCallback:function(n,e){return Xn().memoizedState=[n,e===void 0?null:e],n},useContext:Ln,useEffect:Ca,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,Li(4194308,4,b7.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Li(4194308,4,n,e)},useInsertionEffect:function(n,e){return Li(4,2,n,e)},useMemo:function(n,e){var t=Xn();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=Xn();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=pd.bind(null,Y,n),[i.memoizedState,n]},useRef:function(n){var e=Xn();return n={current:n},e.memoizedState=n},useState:ba,useDebugValue:C1,useDeferredValue:function(n){return Xn().memoizedState=n},useTransition:function(){var n=ba(!1),e=n[0];return n=dd.bind(null,n[1]),Xn().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=Y,l=Xn();if(K){if(t===void 0)throw Error(b(407));t=t()}else{if(t=e(),sn===null)throw Error(b(349));We&30||v7(i,e,t)}l.memoizedState=t;var a={value:t,getSnapshot:e};return l.queue=a,Ca(z7.bind(null,i,a,n),[n]),i.flags|=2048,li(9,w7.bind(null,i,a,t,e),void 0,null),t},useId:function(){var n=Xn(),e=sn.identifierPrefix;if(K){var t=ne,i=qn;t=(i&~(1<<32-Wn(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=ti++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=od++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},ud={readContext:Ln,useCallback:E7,useContext:Ln,useEffect:b1,useImperativeHandle:C7,useInsertionEffect:j7,useLayoutEffect:S7,useMemo:P7,useReducer:Ql,useRef:_7,useState:function(){return Ql(ii)},useDebugValue:C1,useDeferredValue:function(n){var e=Dn();return I7(e,ln.memoizedState,n)},useTransition:function(){var n=Ql(ii)[0],e=Dn().memoizedState;return[n,e]},useMutableSource:x7,useSyncExternalStore:k7,useId:A7,unstable_isNewReconciler:!1},hd={readContext:Ln,useCallback:E7,useContext:Ln,useEffect:b1,useImperativeHandle:C7,useInsertionEffect:j7,useLayoutEffect:S7,useMemo:P7,useReducer:Kl,useRef:_7,useState:function(){return Kl(ii)},useDebugValue:C1,useDeferredValue:function(n){var e=Dn();return ln===null?e.memoizedState=n:I7(e,ln.memoizedState,n)},useTransition:function(){var n=Kl(ii)[0],e=Dn().memoizedState;return[n,e]},useMutableSource:x7,useSyncExternalStore:k7,useId:A7,unstable_isNewReconciler:!1};function Rn(n,e){if(n&&n.defaultProps){e=J({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Ir(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:J({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var kl={isMounted:function(n){return(n=n._reactInternals)?Ge(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=gn(),l=Me(n),a=ee(i,l);a.payload=e,t!=null&&(a.callback=t),e=we(n,a,l),e!==null&&(Un(e,n,l,i),Ti(e,n,l))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=gn(),l=Me(n),a=ee(i,l);a.tag=1,a.payload=e,t!=null&&(a.callback=t),e=we(n,a,l),e!==null&&(Un(e,n,l,i),Ti(e,n,l))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=gn(),i=Me(n),l=ee(t,i);l.tag=2,e!=null&&(l.callback=e),e=we(n,l,i),e!==null&&(Un(e,n,i,t),Ti(e,n,i))}};function Ea(n,e,t,i,l,a,s){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,a,s):e.prototype&&e.prototype.isPureReactComponent?!Zt(t,i)||!Zt(l,a):!0}function D7(n,e,t){var i=!1,l=je,a=e.contextType;return typeof a=="object"&&a!==null?a=Ln(a):(l=Mn(e)?He:mn.current,i=e.contextTypes,a=(i=i!=null)?ut(n,l):je),e=new e(t,a),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=kl,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=l,n.__reactInternalMemoizedMaskedChildContext=a),e}function Pa(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&kl.enqueueReplaceState(e,e.state,null)}function Ar(n,e,t,i){var l=n.stateNode;l.props=t,l.state=n.memoizedState,l.refs={},w1(n);var a=e.contextType;typeof a=="object"&&a!==null?l.context=Ln(a):(a=Mn(e)?He:mn.current,l.context=ut(n,a)),l.state=n.memoizedState,a=e.getDerivedStateFromProps,typeof a=="function"&&(Ir(n,e,a,t),l.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(e=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),e!==l.state&&kl.enqueueReplaceState(l,l.state,null),tl(n,t,l,i),l.state=n.memoizedState),typeof l.componentDidMount=="function"&&(n.flags|=4194308)}function gt(n,e){try{var t="",i=e;do t+=B0(i),i=i.return;while(i);var l=t}catch(a){l=`
Error generating stack: `+a.message+`
`+a.stack}return{value:n,source:e,stack:l,digest:null}}function Zl(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Tr(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var md=typeof WeakMap=="function"?WeakMap:Map;function O7(n,e,t){t=ee(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){sl||(sl=!0,$r=i),Tr(n,e)},t}function R7(n,e,t){t=ee(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var l=e.value;t.payload=function(){return i(l)},t.callback=function(){Tr(n,e)}}var a=n.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(t.callback=function(){Tr(n,e),typeof i!="function"&&(ze===null?ze=new Set([this]):ze.add(this));var s=e.stack;this.componentDidCatch(e.value,{componentStack:s!==null?s:""})}),t}function Ia(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new md;var l=new Set;i.set(e,l)}else l=i.get(e),l===void 0&&(l=new Set,i.set(e,l));l.has(t)||(l.add(t),n=Cd.bind(null,n,e,t),e.then(n,n))}function Aa(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Ta(n,e,t,i,l){return n.mode&1?(n.flags|=65536,n.lanes=l,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=ee(-1,1),e.tag=2,we(t,e,1))),t.lanes|=1),n)}var yd=ae.ReactCurrentOwner,wn=!1;function yn(n,e,t,i){e.child=n===null?h7(e,null,t,i):mt(e,n.child,t,i)}function Fa(n,e,t,i,l){t=t.render;var a=e.ref;return pt(e,l),i=j1(n,e,t,i,a,l),t=S1(),n!==null&&!wn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~l,re(n,e,l)):(K&&t&&h1(e),e.flags|=1,yn(n,e,i,l),e.child)}function La(n,e,t,i,l){if(n===null){var a=t.type;return typeof a=="function"&&!D1(a)&&a.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=a,H7(n,e,a,i,l)):(n=Hi(t.type,null,i,e,e.mode,l),n.ref=e.ref,n.return=e,e.child=n)}if(a=n.child,!(n.lanes&l)){var s=a.memoizedProps;if(t=t.compare,t=t!==null?t:Zt,t(s,i)&&n.ref===e.ref)return re(n,e,l)}return e.flags|=1,n=Ne(a,i),n.ref=e.ref,n.return=e,e.child=n}function H7(n,e,t,i,l){if(n!==null){var a=n.memoizedProps;if(Zt(a,i)&&n.ref===e.ref)if(wn=!1,e.pendingProps=i=a,(n.lanes&l)!==0)n.flags&131072&&(wn=!0);else return e.lanes=n.lanes,re(n,e,l)}return Fr(n,e,t,i,l)}function B7(n,e,t){var i=e.pendingProps,l=i.children,a=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(rt,jn),jn|=t;else{if(!(t&1073741824))return n=a!==null?a.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,G(rt,jn),jn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=a!==null?a.baseLanes:t,G(rt,jn),jn|=i}else a!==null?(i=a.baseLanes|t,e.memoizedState=null):i=t,G(rt,jn),jn|=i;return yn(n,e,l,t),e.child}function W7(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Fr(n,e,t,i,l){var a=Mn(t)?He:mn.current;return a=ut(e,a),pt(e,l),t=j1(n,e,t,i,a,l),i=S1(),n!==null&&!wn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~l,re(n,e,l)):(K&&i&&h1(e),e.flags|=1,yn(n,e,t,l),e.child)}function Da(n,e,t,i,l){if(Mn(t)){var a=!0;Yi(e)}else a=!1;if(pt(e,l),e.stateNode===null)Di(n,e),D7(e,t,i),Ar(e,t,i,l),i=!0;else if(n===null){var s=e.stateNode,o=e.memoizedProps;s.props=o;var d=s.context,f=t.contextType;typeof f=="object"&&f!==null?f=Ln(f):(f=Mn(t)?He:mn.current,f=ut(e,f));var y=t.getDerivedStateFromProps,m=typeof y=="function"||typeof s.getSnapshotBeforeUpdate=="function";m||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==i||d!==f)&&Pa(e,s,i,f),fe=!1;var h=e.memoizedState;s.state=h,tl(e,i,s,l),d=e.memoizedState,o!==i||h!==d||zn.current||fe?(typeof y=="function"&&(Ir(e,t,y,i),d=e.memoizedState),(o=fe||Ea(e,t,o,i,h,d,f))?(m||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=d),s.props=i,s.state=d,s.context=f,i=o):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,y7(n,e),o=e.memoizedProps,f=e.type===e.elementType?o:Rn(e.type,o),s.props=f,m=e.pendingProps,h=s.context,d=t.contextType,typeof d=="object"&&d!==null?d=Ln(d):(d=Mn(t)?He:mn.current,d=ut(e,d));var k=t.getDerivedStateFromProps;(y=typeof k=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o!==m||h!==d)&&Pa(e,s,i,d),fe=!1,h=e.memoizedState,s.state=h,tl(e,i,s,l);var z=e.memoizedState;o!==m||h!==z||zn.current||fe?(typeof k=="function"&&(Ir(e,t,k,i),z=e.memoizedState),(f=fe||Ea(e,t,f,i,h,z,d)||!1)?(y||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,z,d),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,z,d)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=z),s.props=i,s.state=z,s.context=d,i=f):(typeof s.componentDidUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||o===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),i=!1)}return Lr(n,e,t,i,a,l)}function Lr(n,e,t,i,l,a){W7(n,e);var s=(e.flags&128)!==0;if(!i&&!s)return l&&za(e,t,!1),re(n,e,a);i=e.stateNode,yd.current=e;var o=s&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&s?(e.child=mt(e,n.child,null,a),e.child=mt(e,null,o,a)):yn(n,e,o,a),e.memoizedState=i.state,l&&za(e,t,!0),e.child}function U7(n){var e=n.stateNode;e.pendingContext?wa(n,e.pendingContext,e.pendingContext!==e.context):e.context&&wa(n,e.context,!1),z1(n,e.containerInfo)}function Oa(n,e,t,i,l){return ht(),y1(l),e.flags|=256,yn(n,e,t,i),e.child}var Dr={dehydrated:null,treeContext:null,retryLane:0};function Or(n){return{baseLanes:n,cachePool:null,transitions:null}}function $7(n,e,t){var i=e.pendingProps,l=Z.current,a=!1,s=(e.flags&128)!==0,o;if((o=s)||(o=n!==null&&n.memoizedState===null?!1:(l&2)!==0),o?(a=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(l|=1),G(Z,l&1),n===null)return Er(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(s=i.children,n=i.fallback,a?(i=e.mode,a=e.child,s={mode:"hidden",children:s},!(i&1)&&a!==null?(a.childLanes=0,a.pendingProps=s):a=zl(s,i,0,null),n=Re(n,i,t,null),a.return=e,n.return=e,a.sibling=n,e.child=a,e.child.memoizedState=Or(t),e.memoizedState=Dr,n):E1(e,s));if(l=n.memoizedState,l!==null&&(o=l.dehydrated,o!==null))return gd(n,e,s,i,o,l,t);if(a){a=i.fallback,s=e.mode,l=n.child,o=l.sibling;var d={mode:"hidden",children:i.children};return!(s&1)&&e.child!==l?(i=e.child,i.childLanes=0,i.pendingProps=d,e.deletions=null):(i=Ne(l,d),i.subtreeFlags=l.subtreeFlags&14680064),o!==null?a=Ne(o,a):(a=Re(a,s,t,null),a.flags|=2),a.return=e,i.return=e,i.sibling=a,e.child=i,i=a,a=e.child,s=n.child.memoizedState,s=s===null?Or(t):{baseLanes:s.baseLanes|t,cachePool:null,transitions:s.transitions},a.memoizedState=s,a.childLanes=n.childLanes&~t,e.memoizedState=Dr,i}return a=n.child,n=a.sibling,i=Ne(a,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function E1(n,e){return e=zl({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function _i(n,e,t,i){return i!==null&&y1(i),mt(e,n.child,null,t),n=E1(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function gd(n,e,t,i,l,a,s){if(t)return e.flags&256?(e.flags&=-257,i=Zl(Error(b(422))),_i(n,e,s,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(a=i.fallback,l=e.mode,i=zl({mode:"visible",children:i.children},l,0,null),a=Re(a,l,s,null),a.flags|=2,i.return=e,a.return=e,i.sibling=a,e.child=i,e.mode&1&&mt(e,n.child,null,s),e.child.memoizedState=Or(s),e.memoizedState=Dr,a);if(!(e.mode&1))return _i(n,e,s,null);if(l.data==="$!"){if(i=l.nextSibling&&l.nextSibling.dataset,i)var o=i.dgst;return i=o,a=Error(b(419)),i=Zl(a,i,void 0),_i(n,e,s,i)}if(o=(s&n.childLanes)!==0,wn||o){if(i=sn,i!==null){switch(s&-s){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(i.suspendedLanes|s)?0:l,l!==0&&l!==a.retryLane&&(a.retryLane=l,le(n,l),Un(i,n,l,-1))}return L1(),i=Zl(Error(b(421))),_i(n,e,s,i)}return l.data==="$?"?(e.flags|=128,e.child=n.child,e=Ed.bind(null,n),l._reactRetry=e,null):(n=a.treeContext,Sn=ve(l.nextSibling),bn=e,K=!0,Bn=null,n!==null&&(In[An++]=qn,In[An++]=ne,In[An++]=Be,qn=n.id,ne=n.overflow,Be=e),e=E1(e,i.children),e.flags|=4096,e)}function Ra(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),Pr(n.return,e,t)}function Yl(n,e,t,i,l){var a=n.memoizedState;a===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:l}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=t,a.tailMode=l)}function V7(n,e,t){var i=e.pendingProps,l=i.revealOrder,a=i.tail;if(yn(n,e,i.children,t),i=Z.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)n:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Ra(n,t,e);else if(n.tag===19)Ra(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break n;for(;n.sibling===null;){if(n.return===null||n.return===e)break n;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(G(Z,i),!(e.mode&1))e.memoizedState=null;else switch(l){case"forwards":for(t=e.child,l=null;t!==null;)n=t.alternate,n!==null&&il(n)===null&&(l=t),t=t.sibling;t=l,t===null?(l=e.child,e.child=null):(l=t.sibling,t.sibling=null),Yl(e,!1,l,t,a);break;case"backwards":for(t=null,l=e.child,e.child=null;l!==null;){if(n=l.alternate,n!==null&&il(n)===null){e.child=l;break}n=l.sibling,l.sibling=t,t=l,l=n}Yl(e,!0,t,null,a);break;case"together":Yl(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Di(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function re(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Ue|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(b(153));if(e.child!==null){for(n=e.child,t=Ne(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=Ne(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function xd(n,e,t){switch(e.tag){case 3:U7(e),ht();break;case 5:g7(e);break;case 1:Mn(e.type)&&Yi(e);break;case 4:z1(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,l=e.memoizedProps.value;G(nl,i._currentValue),i._currentValue=l;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(G(Z,Z.current&1),e.flags|=128,null):t&e.child.childLanes?$7(n,e,t):(G(Z,Z.current&1),n=re(n,e,t),n!==null?n.sibling:null);G(Z,Z.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return V7(n,e,t);e.flags|=128}if(l=e.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),G(Z,Z.current),i)break;return null;case 22:case 23:return e.lanes=0,B7(n,e,t)}return re(n,e,t)}var G7,Rr,X7,Q7;G7=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Rr=function(){};X7=function(n,e,t,i){var l=n.memoizedProps;if(l!==i){n=e.stateNode,De(Zn.current);var a=null;switch(t){case"input":l=sr(n,l),i=sr(n,i),a=[];break;case"select":l=J({},l,{value:void 0}),i=J({},i,{value:void 0}),a=[];break;case"textarea":l=pr(n,l),i=pr(n,i),a=[];break;default:typeof l.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=Ki)}fr(t,i);var s;t=null;for(f in l)if(!i.hasOwnProperty(f)&&l.hasOwnProperty(f)&&l[f]!=null)if(f==="style"){var o=l[f];for(s in o)o.hasOwnProperty(s)&&(t||(t={}),t[s]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(Ut.hasOwnProperty(f)?a||(a=[]):(a=a||[]).push(f,null));for(f in i){var d=i[f];if(o=l!=null?l[f]:void 0,i.hasOwnProperty(f)&&d!==o&&(d!=null||o!=null))if(f==="style")if(o){for(s in o)!o.hasOwnProperty(s)||d&&d.hasOwnProperty(s)||(t||(t={}),t[s]="");for(s in d)d.hasOwnProperty(s)&&o[s]!==d[s]&&(t||(t={}),t[s]=d[s])}else t||(a||(a=[]),a.push(f,t)),t=d;else f==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,o=o?o.__html:void 0,d!=null&&o!==d&&(a=a||[]).push(f,d)):f==="children"?typeof d!="string"&&typeof d!="number"||(a=a||[]).push(f,""+d):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(Ut.hasOwnProperty(f)?(d!=null&&f==="onScroll"&&X("scroll",n),a||o===d||(a=[])):(a=a||[]).push(f,d))}t&&(a=a||[]).push("style",t);var f=a;(e.updateQueue=f)&&(e.flags|=4)}};Q7=function(n,e,t,i){t!==i&&(e.flags|=4)};function bt(n,e){if(!K)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function un(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var l=n.child;l!==null;)t|=l.lanes|l.childLanes,i|=l.subtreeFlags&14680064,i|=l.flags&14680064,l.return=n,l=l.sibling;else for(l=n.child;l!==null;)t|=l.lanes|l.childLanes,i|=l.subtreeFlags,i|=l.flags,l.return=n,l=l.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function kd(n,e,t){var i=e.pendingProps;switch(m1(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return un(e),null;case 1:return Mn(e.type)&&Zi(),un(e),null;case 3:return i=e.stateNode,yt(),Q(zn),Q(mn),N1(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(Mi(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Bn!==null&&(Xr(Bn),Bn=null))),Rr(n,e),un(e),null;case 5:M1(e);var l=De(ei.current);if(t=e.type,n!==null&&e.stateNode!=null)X7(n,e,t,i,l),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(b(166));return un(e),null}if(n=De(Zn.current),Mi(e)){i=e.stateNode,t=e.type;var a=e.memoizedProps;switch(i[Qn]=e,i[qt]=a,n=(e.mode&1)!==0,t){case"dialog":X("cancel",i),X("close",i);break;case"iframe":case"object":case"embed":X("load",i);break;case"video":case"audio":for(l=0;l<At.length;l++)X(At[l],i);break;case"source":X("error",i);break;case"img":case"image":case"link":X("error",i),X("load",i);break;case"details":X("toggle",i);break;case"input":Q1(i,a),X("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!a.multiple},X("invalid",i);break;case"textarea":Z1(i,a),X("invalid",i)}fr(t,a),l=null;for(var s in a)if(a.hasOwnProperty(s)){var o=a[s];s==="children"?typeof o=="string"?i.textContent!==o&&(a.suppressHydrationWarning!==!0&&zi(i.textContent,o,n),l=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(a.suppressHydrationWarning!==!0&&zi(i.textContent,o,n),l=["children",""+o]):Ut.hasOwnProperty(s)&&o!=null&&s==="onScroll"&&X("scroll",i)}switch(t){case"input":hi(i),K1(i,a,!0);break;case"textarea":hi(i),Y1(i);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(i.onclick=Ki)}i=l,e.updateQueue=i,i!==null&&(e.flags|=4)}else{s=l.nodeType===9?l:l.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=zs(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=s.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=s.createElement(t,{is:i.is}):(n=s.createElement(t),t==="select"&&(s=n,i.multiple?s.multiple=!0:i.size&&(s.size=i.size))):n=s.createElementNS(n,t),n[Qn]=e,n[qt]=i,G7(n,e,!1,!1),e.stateNode=n;n:{switch(s=ur(t,i),t){case"dialog":X("cancel",n),X("close",n),l=i;break;case"iframe":case"object":case"embed":X("load",n),l=i;break;case"video":case"audio":for(l=0;l<At.length;l++)X(At[l],n);l=i;break;case"source":X("error",n),l=i;break;case"img":case"image":case"link":X("error",n),X("load",n),l=i;break;case"details":X("toggle",n),l=i;break;case"input":Q1(n,i),l=sr(n,i),X("invalid",n);break;case"option":l=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},l=J({},i,{value:void 0}),X("invalid",n);break;case"textarea":Z1(n,i),l=pr(n,i),X("invalid",n);break;default:l=i}fr(t,l),o=l;for(a in o)if(o.hasOwnProperty(a)){var d=o[a];a==="style"?_s(n,d):a==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&Ms(n,d)):a==="children"?typeof d=="string"?(t!=="textarea"||d!=="")&&$t(n,d):typeof d=="number"&&$t(n,""+d):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Ut.hasOwnProperty(a)?d!=null&&a==="onScroll"&&X("scroll",n):d!=null&&n1(n,a,d,s))}switch(t){case"input":hi(n),K1(n,i,!1);break;case"textarea":hi(n),Y1(n);break;case"option":i.value!=null&&n.setAttribute("value",""+_e(i.value));break;case"select":n.multiple=!!i.multiple,a=i.value,a!=null?at(n,!!i.multiple,a,!1):i.defaultValue!=null&&at(n,!!i.multiple,i.defaultValue,!0);break;default:typeof l.onClick=="function"&&(n.onclick=Ki)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break n;case"img":i=!0;break n;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return un(e),null;case 6:if(n&&e.stateNode!=null)Q7(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(b(166));if(t=De(ei.current),De(Zn.current),Mi(e)){if(i=e.stateNode,t=e.memoizedProps,i[Qn]=e,(a=i.nodeValue!==t)&&(n=bn,n!==null))switch(n.tag){case 3:zi(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&zi(i.nodeValue,t,(n.mode&1)!==0)}a&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[Qn]=e,e.stateNode=i}return un(e),null;case 13:if(Q(Z),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(K&&Sn!==null&&e.mode&1&&!(e.flags&128))f7(),ht(),e.flags|=98560,a=!1;else if(a=Mi(e),i!==null&&i.dehydrated!==null){if(n===null){if(!a)throw Error(b(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(b(317));a[Qn]=e}else ht(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;un(e),a=!1}else Bn!==null&&(Xr(Bn),Bn=null),a=!0;if(!a)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||Z.current&1?rn===0&&(rn=3):L1())),e.updateQueue!==null&&(e.flags|=4),un(e),null);case 4:return yt(),Rr(n,e),n===null&&Yt(e.stateNode.containerInfo),un(e),null;case 10:return k1(e.type._context),un(e),null;case 17:return Mn(e.type)&&Zi(),un(e),null;case 19:if(Q(Z),a=e.memoizedState,a===null)return un(e),null;if(i=(e.flags&128)!==0,s=a.rendering,s===null)if(i)bt(a,!1);else{if(rn!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(s=il(n),s!==null){for(e.flags|=128,bt(a,!1),i=s.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)a=t,n=i,a.flags&=14680066,s=a.alternate,s===null?(a.childLanes=0,a.lanes=n,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=s.childLanes,a.lanes=s.lanes,a.child=s.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=s.memoizedProps,a.memoizedState=s.memoizedState,a.updateQueue=s.updateQueue,a.type=s.type,n=s.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return G(Z,Z.current&1|2),e.child}n=n.sibling}a.tail!==null&&nn()>xt&&(e.flags|=128,i=!0,bt(a,!1),e.lanes=4194304)}else{if(!i)if(n=il(s),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),bt(a,!0),a.tail===null&&a.tailMode==="hidden"&&!s.alternate&&!K)return un(e),null}else 2*nn()-a.renderingStartTime>xt&&t!==1073741824&&(e.flags|=128,i=!0,bt(a,!1),e.lanes=4194304);a.isBackwards?(s.sibling=e.child,e.child=s):(t=a.last,t!==null?t.sibling=s:e.child=s,a.last=s)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=nn(),e.sibling=null,t=Z.current,G(Z,i?t&1|2:t&1),e):(un(e),null);case 22:case 23:return F1(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?jn&1073741824&&(un(e),e.subtreeFlags&6&&(e.flags|=8192)):un(e),null;case 24:return null;case 25:return null}throw Error(b(156,e.tag))}function vd(n,e){switch(m1(e),e.tag){case 1:return Mn(e.type)&&Zi(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return yt(),Q(zn),Q(mn),N1(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return M1(e),null;case 13:if(Q(Z),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(b(340));ht()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Q(Z),null;case 4:return yt(),null;case 10:return k1(e.type._context),null;case 22:case 23:return F1(),null;case 24:return null;default:return null}}var ji=!1,hn=!1,wd=typeof WeakSet=="function"?WeakSet:Set,P=null;function lt(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){q(n,e,i)}else t.current=null}function Hr(n,e,t){try{t()}catch(i){q(n,e,i)}}var Ha=!1;function zd(n,e){if(Mr=Gi,n=qs(),u1(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else n:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var l=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{t.nodeType,a.nodeType}catch{t=null;break n}var s=0,o=-1,d=-1,f=0,y=0,m=n,h=null;e:for(;;){for(var k;m!==t||l!==0&&m.nodeType!==3||(o=s+l),m!==a||i!==0&&m.nodeType!==3||(d=s+i),m.nodeType===3&&(s+=m.nodeValue.length),(k=m.firstChild)!==null;)h=m,m=k;for(;;){if(m===n)break e;if(h===t&&++f===l&&(o=s),h===a&&++y===i&&(d=s),(k=m.nextSibling)!==null)break;m=h,h=m.parentNode}m=k}t=o===-1||d===-1?null:{start:o,end:d}}else t=null}t=t||{start:0,end:0}}else t=null;for(Nr={focusedElem:n,selectionRange:t},Gi=!1,P=e;P!==null;)if(e=P,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,P=n;else for(;P!==null;){e=P;try{var z=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(z!==null){var x=z.memoizedProps,E=z.memoizedState,c=e.stateNode,p=c.getSnapshotBeforeUpdate(e.elementType===e.type?x:Rn(e.type,x),E);c.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var u=e.stateNode.containerInfo;u.nodeType===1?u.textContent="":u.nodeType===9&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(b(163))}}catch(g){q(e,e.return,g)}if(n=e.sibling,n!==null){n.return=e.return,P=n;break}P=e.return}return z=Ha,Ha=!1,z}function Ht(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var l=i=i.next;do{if((l.tag&n)===n){var a=l.destroy;l.destroy=void 0,a!==void 0&&Hr(e,t,a)}l=l.next}while(l!==i)}}function vl(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function Br(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function K7(n){var e=n.alternate;e!==null&&(n.alternate=null,K7(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[Qn],delete e[qt],delete e[Sr],delete e[ld],delete e[rd])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Z7(n){return n.tag===5||n.tag===3||n.tag===4}function Ba(n){n:for(;;){for(;n.sibling===null;){if(n.return===null||Z7(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue n;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Wr(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Ki));else if(i!==4&&(n=n.child,n!==null))for(Wr(n,e,t),n=n.sibling;n!==null;)Wr(n,e,t),n=n.sibling}function Ur(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(Ur(n,e,t),n=n.sibling;n!==null;)Ur(n,e,t),n=n.sibling}var on=null,Hn=!1;function se(n,e,t){for(t=t.child;t!==null;)Y7(n,e,t),t=t.sibling}function Y7(n,e,t){if(Kn&&typeof Kn.onCommitFiberUnmount=="function")try{Kn.onCommitFiberUnmount(fl,t)}catch{}switch(t.tag){case 5:hn||lt(t,e);case 6:var i=on,l=Hn;on=null,se(n,e,t),on=i,Hn=l,on!==null&&(Hn?(n=on,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):on.removeChild(t.stateNode));break;case 18:on!==null&&(Hn?(n=on,t=t.stateNode,n.nodeType===8?$l(n.parentNode,t):n.nodeType===1&&$l(n,t),Qt(n)):$l(on,t.stateNode));break;case 4:i=on,l=Hn,on=t.stateNode.containerInfo,Hn=!0,se(n,e,t),on=i,Hn=l;break;case 0:case 11:case 14:case 15:if(!hn&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){l=i=i.next;do{var a=l,s=a.destroy;a=a.tag,s!==void 0&&(a&2||a&4)&&Hr(t,e,s),l=l.next}while(l!==i)}se(n,e,t);break;case 1:if(!hn&&(lt(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(o){q(t,e,o)}se(n,e,t);break;case 21:se(n,e,t);break;case 22:t.mode&1?(hn=(i=hn)||t.memoizedState!==null,se(n,e,t),hn=i):se(n,e,t);break;default:se(n,e,t)}}function Wa(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new wd),e.forEach(function(i){var l=Pd.bind(null,n,i);t.has(i)||(t.add(i),i.then(l,l))})}}function On(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var l=t[i];try{var a=n,s=e,o=s;n:for(;o!==null;){switch(o.tag){case 5:on=o.stateNode,Hn=!1;break n;case 3:on=o.stateNode.containerInfo,Hn=!0;break n;case 4:on=o.stateNode.containerInfo,Hn=!0;break n}o=o.return}if(on===null)throw Error(b(160));Y7(a,s,l),on=null,Hn=!1;var d=l.alternate;d!==null&&(d.return=null),l.return=null}catch(f){q(l,e,f)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)J7(e,n),e=e.sibling}function J7(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(On(e,n),Vn(n),i&4){try{Ht(3,n,n.return),vl(3,n)}catch(x){q(n,n.return,x)}try{Ht(5,n,n.return)}catch(x){q(n,n.return,x)}}break;case 1:On(e,n),Vn(n),i&512&&t!==null&&lt(t,t.return);break;case 5:if(On(e,n),Vn(n),i&512&&t!==null&&lt(t,t.return),n.flags&32){var l=n.stateNode;try{$t(l,"")}catch(x){q(n,n.return,x)}}if(i&4&&(l=n.stateNode,l!=null)){var a=n.memoizedProps,s=t!==null?t.memoizedProps:a,o=n.type,d=n.updateQueue;if(n.updateQueue=null,d!==null)try{o==="input"&&a.type==="radio"&&a.name!=null&&vs(l,a),ur(o,s);var f=ur(o,a);for(s=0;s<d.length;s+=2){var y=d[s],m=d[s+1];y==="style"?_s(l,m):y==="dangerouslySetInnerHTML"?Ms(l,m):y==="children"?$t(l,m):n1(l,y,m,f)}switch(o){case"input":or(l,a);break;case"textarea":ws(l,a);break;case"select":var h=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!a.multiple;var k=a.value;k!=null?at(l,!!a.multiple,k,!1):h!==!!a.multiple&&(a.defaultValue!=null?at(l,!!a.multiple,a.defaultValue,!0):at(l,!!a.multiple,a.multiple?[]:"",!1))}l[qt]=a}catch(x){q(n,n.return,x)}}break;case 6:if(On(e,n),Vn(n),i&4){if(n.stateNode===null)throw Error(b(162));l=n.stateNode,a=n.memoizedProps;try{l.nodeValue=a}catch(x){q(n,n.return,x)}}break;case 3:if(On(e,n),Vn(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{Qt(e.containerInfo)}catch(x){q(n,n.return,x)}break;case 4:On(e,n),Vn(n);break;case 13:On(e,n),Vn(n),l=n.child,l.flags&8192&&(a=l.memoizedState!==null,l.stateNode.isHidden=a,!a||l.alternate!==null&&l.alternate.memoizedState!==null||(A1=nn())),i&4&&Wa(n);break;case 22:if(y=t!==null&&t.memoizedState!==null,n.mode&1?(hn=(f=hn)||y,On(e,n),hn=f):On(e,n),Vn(n),i&8192){if(f=n.memoizedState!==null,(n.stateNode.isHidden=f)&&!y&&n.mode&1)for(P=n,y=n.child;y!==null;){for(m=P=y;P!==null;){switch(h=P,k=h.child,h.tag){case 0:case 11:case 14:case 15:Ht(4,h,h.return);break;case 1:lt(h,h.return);var z=h.stateNode;if(typeof z.componentWillUnmount=="function"){i=h,t=h.return;try{e=i,z.props=e.memoizedProps,z.state=e.memoizedState,z.componentWillUnmount()}catch(x){q(i,t,x)}}break;case 5:lt(h,h.return);break;case 22:if(h.memoizedState!==null){$a(m);continue}}k!==null?(k.return=h,P=k):$a(m)}y=y.sibling}n:for(y=null,m=n;;){if(m.tag===5){if(y===null){y=m;try{l=m.stateNode,f?(a=l.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(o=m.stateNode,d=m.memoizedProps.style,s=d!=null&&d.hasOwnProperty("display")?d.display:null,o.style.display=Ns("display",s))}catch(x){q(n,n.return,x)}}}else if(m.tag===6){if(y===null)try{m.stateNode.nodeValue=f?"":m.memoizedProps}catch(x){q(n,n.return,x)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===n)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===n)break n;for(;m.sibling===null;){if(m.return===null||m.return===n)break n;y===m&&(y=null),m=m.return}y===m&&(y=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:On(e,n),Vn(n),i&4&&Wa(n);break;case 21:break;default:On(e,n),Vn(n)}}function Vn(n){var e=n.flags;if(e&2){try{n:{for(var t=n.return;t!==null;){if(Z7(t)){var i=t;break n}t=t.return}throw Error(b(160))}switch(i.tag){case 5:var l=i.stateNode;i.flags&32&&($t(l,""),i.flags&=-33);var a=Ba(n);Ur(n,a,l);break;case 3:case 4:var s=i.stateNode.containerInfo,o=Ba(n);Wr(n,o,s);break;default:throw Error(b(161))}}catch(d){q(n,n.return,d)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function Md(n,e,t){P=n,q7(n)}function q7(n,e,t){for(var i=(n.mode&1)!==0;P!==null;){var l=P,a=l.child;if(l.tag===22&&i){var s=l.memoizedState!==null||ji;if(!s){var o=l.alternate,d=o!==null&&o.memoizedState!==null||hn;o=ji;var f=hn;if(ji=s,(hn=d)&&!f)for(P=l;P!==null;)s=P,d=s.child,s.tag===22&&s.memoizedState!==null?Va(l):d!==null?(d.return=s,P=d):Va(l);for(;a!==null;)P=a,q7(a),a=a.sibling;P=l,ji=o,hn=f}Ua(n)}else l.subtreeFlags&8772&&a!==null?(a.return=l,P=a):Ua(n)}}function Ua(n){for(;P!==null;){var e=P;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:hn||vl(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!hn)if(t===null)i.componentDidMount();else{var l=e.elementType===e.type?t.memoizedProps:Rn(e.type,t.memoizedProps);i.componentDidUpdate(l,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var a=e.updateQueue;a!==null&&Sa(e,a,i);break;case 3:var s=e.updateQueue;if(s!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Sa(e,s,t)}break;case 5:var o=e.stateNode;if(t===null&&e.flags&4){t=o;var d=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&t.focus();break;case"img":d.src&&(t.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var f=e.alternate;if(f!==null){var y=f.memoizedState;if(y!==null){var m=y.dehydrated;m!==null&&Qt(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(b(163))}hn||e.flags&512&&Br(e)}catch(h){q(e,e.return,h)}}if(e===n){P=null;break}if(t=e.sibling,t!==null){t.return=e.return,P=t;break}P=e.return}}function $a(n){for(;P!==null;){var e=P;if(e===n){P=null;break}var t=e.sibling;if(t!==null){t.return=e.return,P=t;break}P=e.return}}function Va(n){for(;P!==null;){var e=P;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{vl(4,e)}catch(d){q(e,t,d)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var l=e.return;try{i.componentDidMount()}catch(d){q(e,l,d)}}var a=e.return;try{Br(e)}catch(d){q(e,a,d)}break;case 5:var s=e.return;try{Br(e)}catch(d){q(e,s,d)}}}catch(d){q(e,e.return,d)}if(e===n){P=null;break}var o=e.sibling;if(o!==null){o.return=e.return,P=o;break}P=e.return}}var Nd=Math.ceil,al=ae.ReactCurrentDispatcher,P1=ae.ReactCurrentOwner,Fn=ae.ReactCurrentBatchConfig,W=0,sn=null,en=null,dn=0,jn=0,rt=be(0),rn=0,ri=null,Ue=0,wl=0,I1=0,Bt=null,vn=null,A1=0,xt=1/0,Yn=null,sl=!1,$r=null,ze=null,Si=!1,ye=null,ol=0,Wt=0,Vr=null,Oi=-1,Ri=0;function gn(){return W&6?nn():Oi!==-1?Oi:Oi=nn()}function Me(n){return n.mode&1?W&2&&dn!==0?dn&-dn:sd.transition!==null?(Ri===0&&(Ri=Ds()),Ri):(n=$,n!==0||(n=window.event,n=n===void 0?16:$s(n.type)),n):1}function Un(n,e,t,i){if(50<Wt)throw Wt=0,Vr=null,Error(b(185));si(n,t,i),(!(W&2)||n!==sn)&&(n===sn&&(!(W&2)&&(wl|=t),rn===4&&he(n,dn)),Nn(n,i),t===1&&W===0&&!(e.mode&1)&&(xt=nn()+500,gl&&Ce()))}function Nn(n,e){var t=n.callbackNode;ao(n,e);var i=Vi(n,n===sn?dn:0);if(i===0)t!==null&&na(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&na(t),e===1)n.tag===0?ad(Ga.bind(null,n)):d7(Ga.bind(null,n)),td(function(){!(W&6)&&Ce()}),t=null;else{switch(Os(i)){case 1:t=r1;break;case 4:t=Fs;break;case 16:t=$i;break;case 536870912:t=Ls;break;default:t=$i}t=s0(t,n0.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function n0(n,e){if(Oi=-1,Ri=0,W&6)throw Error(b(327));var t=n.callbackNode;if(ct()&&n.callbackNode!==t)return null;var i=Vi(n,n===sn?dn:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=dl(n,i);else{e=i;var l=W;W|=2;var a=t0();(sn!==n||dn!==e)&&(Yn=null,xt=nn()+500,Oe(n,e));do try{Sd();break}catch(o){e0(n,o)}while(!0);x1(),al.current=a,W=l,en!==null?e=0:(sn=null,dn=0,e=rn)}if(e!==0){if(e===2&&(l=xr(n),l!==0&&(i=l,e=Gr(n,l))),e===1)throw t=ri,Oe(n,0),he(n,i),Nn(n,nn()),t;if(e===6)he(n,i);else{if(l=n.current.alternate,!(i&30)&&!_d(l)&&(e=dl(n,i),e===2&&(a=xr(n),a!==0&&(i=a,e=Gr(n,a))),e===1))throw t=ri,Oe(n,0),he(n,i),Nn(n,nn()),t;switch(n.finishedWork=l,n.finishedLanes=i,e){case 0:case 1:throw Error(b(345));case 2:Ae(n,vn,Yn);break;case 3:if(he(n,i),(i&130023424)===i&&(e=A1+500-nn(),10<e)){if(Vi(n,0)!==0)break;if(l=n.suspendedLanes,(l&i)!==i){gn(),n.pingedLanes|=n.suspendedLanes&l;break}n.timeoutHandle=jr(Ae.bind(null,n,vn,Yn),e);break}Ae(n,vn,Yn);break;case 4:if(he(n,i),(i&4194240)===i)break;for(e=n.eventTimes,l=-1;0<i;){var s=31-Wn(i);a=1<<s,s=e[s],s>l&&(l=s),i&=~a}if(i=l,i=nn()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Nd(i/1960))-i,10<i){n.timeoutHandle=jr(Ae.bind(null,n,vn,Yn),i);break}Ae(n,vn,Yn);break;case 5:Ae(n,vn,Yn);break;default:throw Error(b(329))}}}return Nn(n,nn()),n.callbackNode===t?n0.bind(null,n):null}function Gr(n,e){var t=Bt;return n.current.memoizedState.isDehydrated&&(Oe(n,e).flags|=256),n=dl(n,e),n!==2&&(e=vn,vn=t,e!==null&&Xr(e)),n}function Xr(n){vn===null?vn=n:vn.push.apply(vn,n)}function _d(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var l=t[i],a=l.getSnapshot;l=l.value;try{if(!$n(a(),l))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function he(n,e){for(e&=~I1,e&=~wl,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-Wn(e),i=1<<t;n[t]=-1,e&=~i}}function Ga(n){if(W&6)throw Error(b(327));ct();var e=Vi(n,0);if(!(e&1))return Nn(n,nn()),null;var t=dl(n,e);if(n.tag!==0&&t===2){var i=xr(n);i!==0&&(e=i,t=Gr(n,i))}if(t===1)throw t=ri,Oe(n,0),he(n,e),Nn(n,nn()),t;if(t===6)throw Error(b(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Ae(n,vn,Yn),Nn(n,nn()),null}function T1(n,e){var t=W;W|=1;try{return n(e)}finally{W=t,W===0&&(xt=nn()+500,gl&&Ce())}}function $e(n){ye!==null&&ye.tag===0&&!(W&6)&&ct();var e=W;W|=1;var t=Fn.transition,i=$;try{if(Fn.transition=null,$=1,n)return n()}finally{$=i,Fn.transition=t,W=e,!(W&6)&&Ce()}}function F1(){jn=rt.current,Q(rt)}function Oe(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,ed(t)),en!==null)for(t=en.return;t!==null;){var i=t;switch(m1(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Zi();break;case 3:yt(),Q(zn),Q(mn),N1();break;case 5:M1(i);break;case 4:yt();break;case 13:Q(Z);break;case 19:Q(Z);break;case 10:k1(i.type._context);break;case 22:case 23:F1()}t=t.return}if(sn=n,en=n=Ne(n.current,null),dn=jn=e,rn=0,ri=null,I1=wl=Ue=0,vn=Bt=null,Le!==null){for(e=0;e<Le.length;e++)if(t=Le[e],i=t.interleaved,i!==null){t.interleaved=null;var l=i.next,a=t.pending;if(a!==null){var s=a.next;a.next=l,i.next=s}t.pending=i}Le=null}return n}function e0(n,e){do{var t=en;try{if(x1(),Fi.current=rl,ll){for(var i=Y.memoizedState;i!==null;){var l=i.queue;l!==null&&(l.pending=null),i=i.next}ll=!1}if(We=0,an=ln=Y=null,Rt=!1,ti=0,P1.current=null,t===null||t.return===null){rn=1,ri=e,en=null;break}n:{var a=n,s=t.return,o=t,d=e;if(e=dn,o.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var f=d,y=o,m=y.tag;if(!(y.mode&1)&&(m===0||m===11||m===15)){var h=y.alternate;h?(y.updateQueue=h.updateQueue,y.memoizedState=h.memoizedState,y.lanes=h.lanes):(y.updateQueue=null,y.memoizedState=null)}var k=Aa(s);if(k!==null){k.flags&=-257,Ta(k,s,o,a,e),k.mode&1&&Ia(a,f,e),e=k,d=f;var z=e.updateQueue;if(z===null){var x=new Set;x.add(d),e.updateQueue=x}else z.add(d);break n}else{if(!(e&1)){Ia(a,f,e),L1();break n}d=Error(b(426))}}else if(K&&o.mode&1){var E=Aa(s);if(E!==null){!(E.flags&65536)&&(E.flags|=256),Ta(E,s,o,a,e),y1(gt(d,o));break n}}a=d=gt(d,o),rn!==4&&(rn=2),Bt===null?Bt=[a]:Bt.push(a),a=s;do{switch(a.tag){case 3:a.flags|=65536,e&=-e,a.lanes|=e;var c=O7(a,d,e);ja(a,c);break n;case 1:o=d;var p=a.type,u=a.stateNode;if(!(a.flags&128)&&(typeof p.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(ze===null||!ze.has(u)))){a.flags|=65536,e&=-e,a.lanes|=e;var g=R7(a,o,e);ja(a,g);break n}}a=a.return}while(a!==null)}l0(t)}catch(N){e=N,en===t&&t!==null&&(en=t=t.return);continue}break}while(!0)}function t0(){var n=al.current;return al.current=rl,n===null?rl:n}function L1(){(rn===0||rn===3||rn===2)&&(rn=4),sn===null||!(Ue&268435455)&&!(wl&268435455)||he(sn,dn)}function dl(n,e){var t=W;W|=2;var i=t0();(sn!==n||dn!==e)&&(Yn=null,Oe(n,e));do try{jd();break}catch(l){e0(n,l)}while(!0);if(x1(),W=t,al.current=i,en!==null)throw Error(b(261));return sn=null,dn=0,rn}function jd(){for(;en!==null;)i0(en)}function Sd(){for(;en!==null&&!Y0();)i0(en)}function i0(n){var e=a0(n.alternate,n,jn);n.memoizedProps=n.pendingProps,e===null?l0(n):en=e,P1.current=null}function l0(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=vd(t,e),t!==null){t.flags&=32767,en=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{rn=6,en=null;return}}else if(t=kd(t,e,jn),t!==null){en=t;return}if(e=e.sibling,e!==null){en=e;return}en=e=n}while(e!==null);rn===0&&(rn=5)}function Ae(n,e,t){var i=$,l=Fn.transition;try{Fn.transition=null,$=1,bd(n,e,t,i)}finally{Fn.transition=l,$=i}return null}function bd(n,e,t,i){do ct();while(ye!==null);if(W&6)throw Error(b(327));t=n.finishedWork;var l=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(b(177));n.callbackNode=null,n.callbackPriority=0;var a=t.lanes|t.childLanes;if(so(n,a),n===sn&&(en=sn=null,dn=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Si||(Si=!0,s0($i,function(){return ct(),null})),a=(t.flags&15990)!==0,t.subtreeFlags&15990||a){a=Fn.transition,Fn.transition=null;var s=$;$=1;var o=W;W|=4,P1.current=null,zd(n,t),J7(t,n),Qo(Nr),Gi=!!Mr,Nr=Mr=null,n.current=t,Md(t),J0(),W=o,$=s,Fn.transition=a}else n.current=t;if(Si&&(Si=!1,ye=n,ol=l),a=n.pendingLanes,a===0&&(ze=null),eo(t.stateNode),Nn(n,nn()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)l=e[t],i(l.value,{componentStack:l.stack,digest:l.digest});if(sl)throw sl=!1,n=$r,$r=null,n;return ol&1&&n.tag!==0&&ct(),a=n.pendingLanes,a&1?n===Vr?Wt++:(Wt=0,Vr=n):Wt=0,Ce(),null}function ct(){if(ye!==null){var n=Os(ol),e=Fn.transition,t=$;try{if(Fn.transition=null,$=16>n?16:n,ye===null)var i=!1;else{if(n=ye,ye=null,ol=0,W&6)throw Error(b(331));var l=W;for(W|=4,P=n.current;P!==null;){var a=P,s=a.child;if(P.flags&16){var o=a.deletions;if(o!==null){for(var d=0;d<o.length;d++){var f=o[d];for(P=f;P!==null;){var y=P;switch(y.tag){case 0:case 11:case 15:Ht(8,y,a)}var m=y.child;if(m!==null)m.return=y,P=m;else for(;P!==null;){y=P;var h=y.sibling,k=y.return;if(K7(y),y===f){P=null;break}if(h!==null){h.return=k,P=h;break}P=k}}}var z=a.alternate;if(z!==null){var x=z.child;if(x!==null){z.child=null;do{var E=x.sibling;x.sibling=null,x=E}while(x!==null)}}P=a}}if(a.subtreeFlags&2064&&s!==null)s.return=a,P=s;else n:for(;P!==null;){if(a=P,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Ht(9,a,a.return)}var c=a.sibling;if(c!==null){c.return=a.return,P=c;break n}P=a.return}}var p=n.current;for(P=p;P!==null;){s=P;var u=s.child;if(s.subtreeFlags&2064&&u!==null)u.return=s,P=u;else n:for(s=p;P!==null;){if(o=P,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:vl(9,o)}}catch(N){q(o,o.return,N)}if(o===s){P=null;break n}var g=o.sibling;if(g!==null){g.return=o.return,P=g;break n}P=o.return}}if(W=l,Ce(),Kn&&typeof Kn.onPostCommitFiberRoot=="function")try{Kn.onPostCommitFiberRoot(fl,n)}catch{}i=!0}return i}finally{$=t,Fn.transition=e}}return!1}function Xa(n,e,t){e=gt(t,e),e=O7(n,e,1),n=we(n,e,1),e=gn(),n!==null&&(si(n,1,e),Nn(n,e))}function q(n,e,t){if(n.tag===3)Xa(n,n,t);else for(;e!==null;){if(e.tag===3){Xa(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ze===null||!ze.has(i))){n=gt(t,n),n=R7(e,n,1),e=we(e,n,1),n=gn(),e!==null&&(si(e,1,n),Nn(e,n));break}}e=e.return}}function Cd(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=gn(),n.pingedLanes|=n.suspendedLanes&t,sn===n&&(dn&t)===t&&(rn===4||rn===3&&(dn&130023424)===dn&&500>nn()-A1?Oe(n,0):I1|=t),Nn(n,e)}function r0(n,e){e===0&&(n.mode&1?(e=gi,gi<<=1,!(gi&130023424)&&(gi=4194304)):e=1);var t=gn();n=le(n,e),n!==null&&(si(n,e,t),Nn(n,t))}function Ed(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),r0(n,t)}function Pd(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,l=n.memoizedState;l!==null&&(t=l.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(b(314))}i!==null&&i.delete(e),r0(n,t)}var a0;a0=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||zn.current)wn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return wn=!1,xd(n,e,t);wn=!!(n.flags&131072)}else wn=!1,K&&e.flags&1048576&&p7(e,qi,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Di(n,e),n=e.pendingProps;var l=ut(e,mn.current);pt(e,t),l=j1(null,e,i,n,l,t);var a=S1();return e.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Mn(i)?(a=!0,Yi(e)):a=!1,e.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,w1(e),l.updater=kl,e.stateNode=l,l._reactInternals=e,Ar(e,i,n,t),e=Lr(null,e,i,!0,a,t)):(e.tag=0,K&&a&&h1(e),yn(null,e,l,t),e=e.child),e;case 16:i=e.elementType;n:{switch(Di(n,e),n=e.pendingProps,l=i._init,i=l(i._payload),e.type=i,l=e.tag=Ad(i),n=Rn(i,n),l){case 0:e=Fr(null,e,i,n,t);break n;case 1:e=Da(null,e,i,n,t);break n;case 11:e=Fa(null,e,i,n,t);break n;case 14:e=La(null,e,i,Rn(i.type,n),t);break n}throw Error(b(306,i,""))}return e;case 0:return i=e.type,l=e.pendingProps,l=e.elementType===i?l:Rn(i,l),Fr(n,e,i,l,t);case 1:return i=e.type,l=e.pendingProps,l=e.elementType===i?l:Rn(i,l),Da(n,e,i,l,t);case 3:n:{if(U7(e),n===null)throw Error(b(387));i=e.pendingProps,a=e.memoizedState,l=a.element,y7(n,e),tl(e,i,null,t);var s=e.memoizedState;if(i=s.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},e.updateQueue.baseState=a,e.memoizedState=a,e.flags&256){l=gt(Error(b(423)),e),e=Oa(n,e,i,t,l);break n}else if(i!==l){l=gt(Error(b(424)),e),e=Oa(n,e,i,t,l);break n}else for(Sn=ve(e.stateNode.containerInfo.firstChild),bn=e,K=!0,Bn=null,t=h7(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ht(),i===l){e=re(n,e,t);break n}yn(n,e,i,t)}e=e.child}return e;case 5:return g7(e),n===null&&Er(e),i=e.type,l=e.pendingProps,a=n!==null?n.memoizedProps:null,s=l.children,_r(i,l)?s=null:a!==null&&_r(i,a)&&(e.flags|=32),W7(n,e),yn(n,e,s,t),e.child;case 6:return n===null&&Er(e),null;case 13:return $7(n,e,t);case 4:return z1(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=mt(e,null,i,t):yn(n,e,i,t),e.child;case 11:return i=e.type,l=e.pendingProps,l=e.elementType===i?l:Rn(i,l),Fa(n,e,i,l,t);case 7:return yn(n,e,e.pendingProps,t),e.child;case 8:return yn(n,e,e.pendingProps.children,t),e.child;case 12:return yn(n,e,e.pendingProps.children,t),e.child;case 10:n:{if(i=e.type._context,l=e.pendingProps,a=e.memoizedProps,s=l.value,G(nl,i._currentValue),i._currentValue=s,a!==null)if($n(a.value,s)){if(a.children===l.children&&!zn.current){e=re(n,e,t);break n}}else for(a=e.child,a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){s=a.child;for(var d=o.firstContext;d!==null;){if(d.context===i){if(a.tag===1){d=ee(-1,t&-t),d.tag=2;var f=a.updateQueue;if(f!==null){f=f.shared;var y=f.pending;y===null?d.next=d:(d.next=y.next,y.next=d),f.pending=d}}a.lanes|=t,d=a.alternate,d!==null&&(d.lanes|=t),Pr(a.return,t,e),o.lanes|=t;break}d=d.next}}else if(a.tag===10)s=a.type===e.type?null:a.child;else if(a.tag===18){if(s=a.return,s===null)throw Error(b(341));s.lanes|=t,o=s.alternate,o!==null&&(o.lanes|=t),Pr(s,t,e),s=a.sibling}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}yn(n,e,l.children,t),e=e.child}return e;case 9:return l=e.type,i=e.pendingProps.children,pt(e,t),l=Ln(l),i=i(l),e.flags|=1,yn(n,e,i,t),e.child;case 14:return i=e.type,l=Rn(i,e.pendingProps),l=Rn(i.type,l),La(n,e,i,l,t);case 15:return H7(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,l=e.pendingProps,l=e.elementType===i?l:Rn(i,l),Di(n,e),e.tag=1,Mn(i)?(n=!0,Yi(e)):n=!1,pt(e,t),D7(e,i,l),Ar(e,i,l,t),Lr(null,e,i,!0,n,t);case 19:return V7(n,e,t);case 22:return B7(n,e,t)}throw Error(b(156,e.tag))};function s0(n,e){return Ts(n,e)}function Id(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tn(n,e,t,i){return new Id(n,e,t,i)}function D1(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Ad(n){if(typeof n=="function")return D1(n)?1:0;if(n!=null){if(n=n.$$typeof,n===t1)return 11;if(n===i1)return 14}return 2}function Ne(n,e){var t=n.alternate;return t===null?(t=Tn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function Hi(n,e,t,i,l,a){var s=2;if(i=n,typeof n=="function")D1(n)&&(s=1);else if(typeof n=="string")s=5;else n:switch(n){case Ke:return Re(t.children,l,a,e);case e1:s=8,l|=8;break;case ir:return n=Tn(12,t,e,l|2),n.elementType=ir,n.lanes=a,n;case lr:return n=Tn(13,t,e,l),n.elementType=lr,n.lanes=a,n;case rr:return n=Tn(19,t,e,l),n.elementType=rr,n.lanes=a,n;case gs:return zl(t,l,a,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case ms:s=10;break n;case ys:s=9;break n;case t1:s=11;break n;case i1:s=14;break n;case ce:s=16,i=null;break n}throw Error(b(130,n==null?n:typeof n,""))}return e=Tn(s,t,e,l),e.elementType=n,e.type=i,e.lanes=a,e}function Re(n,e,t,i){return n=Tn(7,n,i,e),n.lanes=t,n}function zl(n,e,t,i){return n=Tn(22,n,i,e),n.elementType=gs,n.lanes=t,n.stateNode={isHidden:!1},n}function Jl(n,e,t){return n=Tn(6,n,null,e),n.lanes=t,n}function ql(n,e,t){return e=Tn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function Td(n,e,t,i,l){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Al(0),this.expirationTimes=Al(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Al(0),this.identifierPrefix=i,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function O1(n,e,t,i,l,a,s,o,d){return n=new Td(n,e,t,o,d),e===1?(e=1,a===!0&&(e|=8)):e=0,a=Tn(3,null,null,e),n.current=a,a.stateNode=n,a.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},w1(a),n}function Fd(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qe,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function o0(n){if(!n)return je;n=n._reactInternals;n:{if(Ge(n)!==n||n.tag!==1)throw Error(b(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break n;case 1:if(Mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break n}}e=e.return}while(e!==null);throw Error(b(171))}if(n.tag===1){var t=n.type;if(Mn(t))return o7(n,t,e)}return e}function d0(n,e,t,i,l,a,s,o,d){return n=O1(t,i,!0,n,l,a,s,o,d),n.context=o0(null),t=n.current,i=gn(),l=Me(t),a=ee(i,l),a.callback=e??null,we(t,a,l),n.current.lanes=l,si(n,l,i),Nn(n,i),n}function Ml(n,e,t,i){var l=e.current,a=gn(),s=Me(l);return t=o0(t),e.context===null?e.context=t:e.pendingContext=t,e=ee(a,s),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=we(l,e,s),n!==null&&(Un(n,l,s,a),Ti(n,l,s)),s}function pl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Qa(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function R1(n,e){Qa(n,e),(n=n.alternate)&&Qa(n,e)}function Ld(){return null}var p0=typeof reportError=="function"?reportError:function(n){console.error(n)};function H1(n){this._internalRoot=n}Nl.prototype.render=H1.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(b(409));Ml(n,e,null,null)};Nl.prototype.unmount=H1.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;$e(function(){Ml(null,n,null,null)}),e[ie]=null}};function Nl(n){this._internalRoot=n}Nl.prototype.unstable_scheduleHydration=function(n){if(n){var e=Bs();n={blockedOn:null,target:n,priority:e};for(var t=0;t<ue.length&&e!==0&&e<ue[t].priority;t++);ue.splice(t,0,n),t===0&&Us(n)}};function B1(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function _l(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Ka(){}function Dd(n,e,t,i,l){if(l){if(typeof i=="function"){var a=i;i=function(){var f=pl(s);a.call(f)}}var s=d0(e,i,n,0,null,!1,!1,"",Ka);return n._reactRootContainer=s,n[ie]=s.current,Yt(n.nodeType===8?n.parentNode:n),$e(),s}for(;l=n.lastChild;)n.removeChild(l);if(typeof i=="function"){var o=i;i=function(){var f=pl(d);o.call(f)}}var d=O1(n,0,!1,null,null,!1,!1,"",Ka);return n._reactRootContainer=d,n[ie]=d.current,Yt(n.nodeType===8?n.parentNode:n),$e(function(){Ml(e,d,t,i)}),d}function jl(n,e,t,i,l){var a=t._reactRootContainer;if(a){var s=a;if(typeof l=="function"){var o=l;l=function(){var d=pl(s);o.call(d)}}Ml(e,s,n,l)}else s=Dd(t,e,n,l,i);return pl(s)}Rs=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=It(e.pendingLanes);t!==0&&(a1(e,t|1),Nn(e,nn()),!(W&6)&&(xt=nn()+500,Ce()))}break;case 13:$e(function(){var i=le(n,1);if(i!==null){var l=gn();Un(i,n,1,l)}}),R1(n,1)}};s1=function(n){if(n.tag===13){var e=le(n,134217728);if(e!==null){var t=gn();Un(e,n,134217728,t)}R1(n,134217728)}};Hs=function(n){if(n.tag===13){var e=Me(n),t=le(n,e);if(t!==null){var i=gn();Un(t,n,e,i)}R1(n,e)}};Bs=function(){return $};Ws=function(n,e){var t=$;try{return $=n,e()}finally{$=t}};mr=function(n,e,t){switch(e){case"input":if(or(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var l=yl(i);if(!l)throw Error(b(90));ks(i),or(i,l)}}}break;case"textarea":ws(n,t);break;case"select":e=t.value,e!=null&&at(n,!!t.multiple,e,!1)}};bs=T1;Cs=$e;var Od={usingClientEntryPoint:!1,Events:[di,qe,yl,js,Ss,T1]},Ct={findFiberByHostInstance:Fe,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Rd={bundleType:Ct.bundleType,version:Ct.version,rendererPackageName:Ct.rendererPackageName,rendererConfig:Ct.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ae.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Is(n),n===null?null:n.stateNode},findFiberByHostInstance:Ct.findFiberByHostInstance||Ld,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var bi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bi.isDisabled&&bi.supportsFiber)try{fl=bi.inject(Rd),Kn=bi}catch{}}En.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Od;En.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!B1(e))throw Error(b(200));return Fd(n,e,null,t)};En.createRoot=function(n,e){if(!B1(n))throw Error(b(299));var t=!1,i="",l=p0;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(l=e.onRecoverableError)),e=O1(n,1,!1,null,null,t,!1,i,l),n[ie]=e.current,Yt(n.nodeType===8?n.parentNode:n),new H1(e)};En.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(b(188)):(n=Object.keys(n).join(","),Error(b(268,n)));return n=Is(e),n=n===null?null:n.stateNode,n};En.flushSync=function(n){return $e(n)};En.hydrate=function(n,e,t){if(!_l(e))throw Error(b(200));return jl(null,n,e,!0,t)};En.hydrateRoot=function(n,e,t){if(!B1(n))throw Error(b(405));var i=t!=null&&t.hydratedSources||null,l=!1,a="",s=p0;if(t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),e=d0(e,null,n,1,t??null,l,!1,a,s),n[ie]=e.current,Yt(n),i)for(n=0;n<i.length;n++)t=i[n],l=t._getVersion,l=l(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,l]:e.mutableSourceEagerHydrationData.push(t,l);return new Nl(e)};En.render=function(n,e,t){if(!_l(e))throw Error(b(200));return jl(null,n,e,!1,t)};En.unmountComponentAtNode=function(n){if(!_l(n))throw Error(b(40));return n._reactRootContainer?($e(function(){jl(null,null,n,!1,function(){n._reactRootContainer=null,n[ie]=null})}),!0):!1};En.unstable_batchedUpdates=T1;En.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!_l(t))throw Error(b(200));if(n==null||n._reactInternals===void 0)throw Error(b(38));return jl(n,e,t,!1,i)};En.version="18.3.1-next-f1338f8080-20240426";function c0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c0)}catch(n){console.error(n)}}c0(),cs.exports=En;var Hd=cs.exports,Za=Hd;er.createRoot=Za.createRoot,er.hydrateRoot=Za.hydrateRoot;function Bd({sensors:n={},pumps:e=[],fans:t=[]}){var f;const i=e.slice(0,3),l=e.slice(3,6),a=e.reduce((y,m)=>y+(m.saved_kwh||0),0),s=e.reduce((y,m)=>y+(m.run_hours||0),0),o=e.filter(y=>y.running).length,d=t.filter(y=>y.running_fwd||y.running_bwd).length;return r.jsxs("div",{className:"dashboard",children:[r.jsxs("section",{className:"dashboard-section",children:[r.jsx("h2",{children:"📊 시스템 개요"}),r.jsxs("div",{className:"stats-grid",children:[r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"⚡"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:"총 절감 전력"}),r.jsxs("div",{className:"stat-value",children:[a.toLocaleString()," kWh"]})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"⏱️"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:"총 운전 시간"}),r.jsxs("div",{className:"stat-value",children:[s.toLocaleString()," h"]})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"🔄"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:"운전 중인 펌프"}),r.jsxs("div",{className:"stat-value",children:[o," / ",e.length]})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"🌀"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:"운전 중인 팬"}),r.jsxs("div",{className:"stat-value",children:[d," / ",t.length]})]})]}),r.jsxs("div",{className:"stat-card",children:[r.jsx("div",{className:"stat-icon",children:"🔥"}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:"M/E 부하"}),r.jsxs("div",{className:"stat-value",children:[((f=n.PU1)==null?void 0:f.toFixed(1))||0,"%"]})]})]})]})]}),r.jsxs("section",{className:"dashboard-section",children:[r.jsx("h2",{children:"🌡️ 센서 데이터"}),r.jsxs("div",{className:"sensor-grid",children:[r.jsx(oe,{label:"CSW 펌프 토출 온도 (TX1)",value:n.TX1,unit:"°C",icon:"🌡️"}),r.jsx(oe,{label:"FW Cooler 1 SW Out (TX2)",value:n.TX2,unit:"°C",icon:"🌡️"}),r.jsx(oe,{label:"FW Cooler 2 SW Out (TX3)",value:n.TX3,unit:"°C",icon:"🌡️"}),r.jsx(oe,{label:"FW Cooler FW In (TX4)",value:n.TX4,unit:"°C",icon:"🌡️"}),r.jsx(oe,{label:"FW Cooler FW Out (TX5)",value:n.TX5,unit:"°C",icon:"🌡️"}),r.jsx(oe,{label:"CSW 펌프 토출 압력 (DPX1)",value:n.DPX1,unit:"kg/cm²",icon:"💨"})]}),r.jsxs("div",{className:"sensor-grid",style:{marginTop:"1rem"},children:[r.jsx(oe,{label:"E/R Inside Temp (TX6)",value:n.TX6,unit:"°C",icon:"🌡️"}),r.jsx(oe,{label:"E/R Outside Temp (TX7)",value:n.TX7,unit:"°C",icon:"🌡️"})]})]}),r.jsxs("section",{className:"dashboard-section",children:[r.jsx("h2",{children:"🌊 해수 펌프 (Sea Water Pump)"}),r.jsx("div",{className:"pump-grid",children:i.map((y,m)=>r.jsx(Ya,{pump:y},m))})]}),r.jsxs("section",{className:"dashboard-section",children:[r.jsx("h2",{children:"💧 청수 펌프 (Fresh Water Pump)"}),r.jsx("div",{className:"pump-grid",children:l.map((y,m)=>r.jsx(Ya,{pump:y},m))})]}),r.jsxs("section",{className:"dashboard-section",children:[r.jsx("h2",{children:"🌀 Engine Room 팬 (E/R Fan)"}),r.jsx("div",{className:"pump-grid",style:{gridTemplateColumns:"repeat(4, 1fr)"},children:t.map((y,m)=>r.jsx(Wd,{fan:y},m))})]})]})}function oe({label:n,value:e,unit:t,icon:i}){return r.jsxs("div",{className:"sensor-card",children:[r.jsx("div",{className:"sensor-icon",children:i}),r.jsxs("div",{className:"sensor-info",children:[r.jsx("div",{className:"sensor-label",children:n}),r.jsxs("div",{className:"sensor-value",children:[e!==void 0?e.toFixed(1):"--"," ",t]})]})]})}function Ya({pump:n}){var a,s,o;const e=n.running,t=n.saved_ratio||0,l=n.auto_mode&&n.vfd_mode?{text:"⚡ ESS 모드",class:"ess-mode"}:n.auto_mode&&!n.vfd_mode?{text:"🔄 자동/Bypass",class:"auto-bypass-mode"}:!n.auto_mode&&n.vfd_mode?{text:"🔧 수동/VFD",class:"manual-vfd-mode"}:{text:"⚙️ 수동/Bypass",class:"manual-bypass-mode"};return r.jsxs("div",{className:`pump-card ${e?"running":"stopped"}`,children:[r.jsxs("div",{className:"pump-header",children:[r.jsx("h3",{children:n.name}),r.jsxs("div",{className:"pump-header-badges",children:[r.jsx("span",{className:`mode-badge ${l.class}`,children:l.text}),r.jsx("span",{className:`pump-status-badge ${e?"active":"inactive"}`,children:e?"🟢 운전중":"⚪ 정지"})]})]}),r.jsxs("div",{className:"pump-details",children:[r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"주파수"}),r.jsxs("span",{className:"detail-value",children:[((a=n.frequency)==null?void 0:a.toFixed(1))||0," Hz"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"소비 전력"}),r.jsxs("span",{className:"detail-value",children:[n.power_kw||0," kW"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"절감 전력"}),r.jsxs("span",{className:"detail-value highlight",children:[((s=n.saved_kwh)==null?void 0:s.toLocaleString())||0," kWh"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"절감률"}),r.jsxs("span",{className:"detail-value highlight",children:[t,"%"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"운전 시간"}),r.jsxs("span",{className:"detail-value",children:[((o=n.run_hours)==null?void 0:o.toLocaleString())||0," h"]})]})]})]})}function Wd({fan:n}){var a,s,o;const e=n.running_fwd||n.running_bwd,t=n.saved_ratio||0,l=n.auto_mode&&n.vfd_mode?{text:"⚡ ESS 모드",class:"ess-mode"}:n.auto_mode&&!n.vfd_mode?{text:"🔄 자동/Bypass",class:"auto-bypass-mode"}:!n.auto_mode&&n.vfd_mode?{text:"🔧 수동/VFD",class:"manual-vfd-mode"}:{text:"⚙️ 수동/Bypass",class:"manual-bypass-mode"};return r.jsxs("div",{className:`pump-card ${e?"running":"stopped"}`,children:[r.jsxs("div",{className:"pump-header",children:[r.jsx("h3",{children:n.name}),r.jsxs("div",{className:"pump-header-badges",children:[r.jsx("span",{className:`mode-badge ${l.class}`,children:l.text}),r.jsx("span",{className:`pump-status-badge ${e?"active":"inactive"}`,children:n.running_fwd?"🟢 정방향":n.running_bwd?"🟡 역방향":"⚪ 정지"})]})]}),r.jsxs("div",{className:"pump-details",children:[r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"주파수"}),r.jsxs("span",{className:"detail-value",children:[((a=n.frequency)==null?void 0:a.toFixed(1))||0," Hz"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"소비 전력"}),r.jsxs("span",{className:"detail-value",children:[n.power_kw||0," kW"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"절감 전력"}),r.jsxs("span",{className:"detail-value highlight",children:[((s=n.saved_kwh)==null?void 0:s.toLocaleString())||0," kWh"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"절감률"}),r.jsxs("span",{className:"detail-value highlight",children:[t,"%"]})]}),r.jsxs("div",{className:"pump-detail-row",children:[r.jsx("span",{className:"detail-label",children:"운전 시간"}),r.jsxs("span",{className:"detail-value",children:[((o=n.run_hours)==null?void 0:o.toLocaleString())||0," h"]})]})]})]})}const Te=[{name:"TX1",symbolId:"TX1",x:825,y:320,unit:"°C",decimal:1},{name:"TX2",symbolId:"TX2",x:568,y:154,unit:"°C",decimal:1},{name:"TX3",symbolId:"TX3",x:568,y:298,unit:"°C",decimal:1},{name:"TX4",symbolId:"TX4",x:318,y:156,unit:"°C",decimal:1},{name:"TX5",symbolId:"TX5",x:495,y:440,unit:"°C",decimal:1},{name:"TX6",symbolId:"TX6",x:0,y:0,unit:"°C",decimal:1},{name:"DPX1",symbolId:"PX1",x:945,y:439,unit:" bar",decimal:2},{name:"PX2",symbolId:"PX2",x:0,y:0,unit:" bar",decimal:2},{name:"LT Pump No.1",symbolId:"g229",x:244.243,y:372.093,type:"pump"},{name:"LT Pump No.1 Auto/Man mode",symbolId:"LT_Pump1_Mode",x:300,y:365},{name:"LT Pump No.1 VFD/ BYPASS",symbolId:"LT_Pump1_VFD",x:300,y:382},{name:"LT Pump No.1 Hz(VFD)",symbolId:"LT_Pump1_Hz",x:300,y:399,unit:" Hz"},{name:"LT Pump No.1 running hour",symbolId:"LT_Pump1_hour",x:300,y:416,unit:" h"},{name:"LT Pump No.2",symbolId:"g245",x:244.243,y:459.033,type:"pump"},{name:"LT Pump No.2 Auto/Man mode",symbolId:"LT_Pump2_Mode",x:300,y:452},{name:"LT Pump No.2 VFD/ BYPASS",symbolId:"LT_Pump2_VFD",x:300,y:469},{name:"LT Pump No.2 Hz(VFD)",symbolId:"LT_Pump2_Hz",x:300,y:486,unit:" Hz"},{name:"LT Pump No.2 running hour",symbolId:"LT_Pump2_hour",x:300,y:503,unit:" h"},{name:"LT Pump No.3",symbolId:"g261",x:244.243,y:545.963,type:"pump"},{name:"LT Pump No.3 Auto/Man mode",symbolId:"LT_Pump3_Mode",x:300,y:539},{name:"LT Pump No.3 VFD/ BYPASS",symbolId:"LT_Pump3_VFD",x:300,y:556},{name:"LT Pump No.3 Hz(VFD)",symbolId:"LT_Pump3_Hz",x:300,y:573,unit:" Hz"},{name:"LT Pump No.3 running hour",symbolId:"LT_Pump3_hour",x:300,y:590,unit:" h"},{name:"SW Pump No.1",symbolId:"g103",x:599.923,y:476.633,type:"pump"},{name:"SW Pump No.1 Auto/Man mode",symbolId:"SW_Pump1_Mode",x:640,y:470},{name:"SW Pump No.1 VFD/ BYPASS",symbolId:"SW_Pump1_VFD",x:640,y:487},{name:"SW Pump No.1 Hz(VFD)",symbolId:"SW_Pump1_Hz",x:640,y:504,unit:" Hz"},{name:"SW Pump No.1 running hour",symbolId:"SW_Pump1_hour",x:640,y:521,unit:" h"},{name:"SW Pump No.2",symbolId:"g1046",x:695.023,y:476.633,type:"pump"},{name:"SW Pump No.2 Auto/Man mode",symbolId:"SW_Pump2_Mode",x:735,y:470},{name:"SW Pump No.2 VFD/ BYPASS",symbolId:"SW_Pump2_VFD",x:735,y:487},{name:"SW Pump No.2 Hz(VFD)",symbolId:"SW_Pump2_Hz",x:735,y:504,unit:" Hz"},{name:"SW Pump No.2 running hour",symbolId:"SW_Pump2_hour",x:735,y:521,unit:" h"},{name:"SW Pump No.3",symbolId:"g119",x:786.444,y:476.633,type:"pump"},{name:"SW Pump No.3 Auto/Man mode",symbolId:"SW_Pump3_Mode",x:827,y:470},{name:"SW Pump No.3 VFD/ BYPASS",symbolId:"SW_Pump3_VFD",x:827,y:487},{name:"SW Pump No.3 Hz(VFD)",symbolId:"SW_Pump3_Hz",x:827,y:504,unit:" Hz"},{name:"SW Pump No.3 running hour",symbolId:"SW_Pump3_hour",x:827,y:521,unit:" h"}],Ud=Te.filter(n=>n.name.startsWith("TX")||n.name.startsWith("PX")||n.name.startsWith("DPX")),$d={0:{name:"LT_Pump_1",data:Te.filter(n=>n.name.includes("LT Pump No.1"))},1:{name:"LT_Pump_2",data:Te.filter(n=>n.name.includes("LT Pump No.2"))},2:{name:"LT_Pump_3",data:Te.filter(n=>n.name.includes("LT Pump No.3"))},3:{name:"SW_Pump_1",data:Te.filter(n=>n.name.includes("SW Pump No.1"))},4:{name:"SW_Pump_2",data:Te.filter(n=>n.name.includes("SW Pump No.2"))},5:{name:"SW_Pump_3",data:Te.filter(n=>n.name.includes("SW Pump No.3"))}},Vd=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 1024 768"
   version="1.1"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill-rule="evenodd"
   xml:space="preserve"
   id="svg1465"
   sodipodi:docname="도면PUMP_Final_Rev2_20251119.svg"
   inkscape:version="1.4.2 (f4327f4, 2025-05-13)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview
   id="namedview1465"
   pagecolor="#ffffff"
   bordercolor="#000000"
   borderopacity="0.25"
   inkscape:showpageshadow="2"
   inkscape:pageopacity="0.0"
   inkscape:pagecheckerboard="0"
   inkscape:deskcolor="#d1d1d1"
   inkscape:zoom="1.4860293"
   inkscape:cx="722.05844"
   inkscape:cy="424.95797"
   inkscape:window-width="1920"
   inkscape:window-height="1009"
   inkscape:window-x="-8"
   inkscape:window-y="-8"
   inkscape:window-maximized="1"
   inkscape:current-layer="svg1465" />
<defs
   id="defs1"><linearGradient
   id="linearGradient66"
   inkscape:collect="always"><stop
     style="stop-color:#ffffff;stop-opacity:1;"
     offset="0"
     id="stop75" /><stop
     style="stop-color:#ffffff;stop-opacity:0;"
     offset="1"
     id="stop76" /></linearGradient><rect
   x="478.45629"
   y="327.04607"
   width="17.496292"
   height="56.526481"
   id="rect11" /><style
   type="text/css"
   id="style1">
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    [class^=&quot;impeller-&quot;] { animation: rotate 3s linear infinite; transform-origin: center; transform-box: fill-box; }
    .impeller-SW_Pump_1 { animation-duration: 2.5s; }
    .impeller-SW_Pump_2 { animation-duration: 2.7s; }
    .impeller-SW_Pump_3 { animation-duration: 2.3s; }
    .impeller-LT_Pump_1 { animation-duration: 3.0s; }
    .impeller-LT_Pump_2 { animation-duration: 2.8s; }
    .impeller-LT_Pump_3 { animation-duration: 3.2s; }
</style>
<linearGradient
   id="metalGrad1"
   x1="0%"
   y1="0%"
   x2="100%"
   y2="100%">
  <stop
   offset="0%"
   style="stop-color:#c0c0c0;stop-opacity:1"
   id="stop1" />
  <stop
   offset="50%"
   style="stop-color:#e8e8e8;stop-opacity:1"
   id="stop2" />
  <stop
   offset="100%"
   style="stop-color:#a8a8a8;stop-opacity:1"
   id="stop3" />
</linearGradient>
<linearGradient
   id="blueFlow1"
   x1="0%"
   y1="0%"
   x2="100%"
   y2="0%">
  <stop
   offset="0%"
   style="stop-color:#00b0f0;stop-opacity:1"
   id="stop4" />
  <stop
   offset="100%"
   style="stop-color:#0077b6;stop-opacity:1"
   id="stop5" />
</linearGradient>
<linearGradient
   id="redFlow1"
   x1="0%"
   y1="0%"
   x2="100%"
   y2="0%">
  <stop
   offset="0%"
   style="stop-color:#ff4444;stop-opacity:1"
   id="stop6" />
  <stop
   offset="100%"
   style="stop-color:#cc0000;stop-opacity:1"
   id="stop7" />
</linearGradient>
<clipPath
   id="clipId0">
<path
   d="M0,768 1024,768 1024,0 0,0 z"
   id="path1"
   data-element-id="element-0-1761788125775"
   style="cursor: pointer;" />
</clipPath>
<clipPath
   id="clipId0-9">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-4"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipPath2">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path2-8"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipPath3">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path3-8"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-9-1">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-4-8"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipPath1">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-9"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipPath2-2">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path2-7"
   data-element-id="element-0-1761788125775" />
</clipPath><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow_valve"
   id="linearGradient77"
   x1="-11.17868"
   y1="-3.5842538"
   x2="-3.8296048"
   y2="-3.5842538"
   gradientTransform="scale(1.8056694,0.55381122)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow_valve"
   id="linearGradient78"
   x1="-8.8888192"
   y1="-1.1365991"
   x2="-6.615621"
   y2="-1.1365991"
   gradientTransform="scale(0.85781819,1.1657482)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow_valve"
   id="linearGradient79"
   x1="4.0511291"
   y1="-3.5842538"
   x2="11.400204"
   y2="-3.5842538"
   gradientTransform="scale(1.8056694,0.55381122)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow_valve"
   id="linearGradient80"
   x1="6.615621"
   y1="-1.1365991"
   x2="8.8888192"
   y2="-1.1365991"
   gradientTransform="scale(0.85781819,1.1657482)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow_valve"
   id="linearGradient81"
   x1="-3.4183531"
   y1="4.5380843"
   x2="3.5905626"
   y2="4.5380843"
   gradientTransform="scale(0.58068897,1.7220923)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow_valve"
   id="linearGradient82"
   x1="-1.1365991"
   y1="7.4316447"
   x2="1.1365991"
   y2="7.4316447"
   gradientTransform="scale(1.1657482,0.85781819)"
   gradientUnits="userSpaceOnUse" />

















<linearGradient
   inkscape:collect="always"
   xlink:href="#metalGrad1"
   id="linearGradient48"
   x1="9"
   y1="9"
   x2="191"
   y2="191"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient49"
   x1="-16.158884"
   y1="71.350068"
   x2="4.8589652"
   y2="71.350068"
   gradientTransform="scale(2.2124052,0.45199676)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient50"
   x1="4.0704845"
   y1="35.930085"
   x2="14.020294"
   y2="35.930085"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient51"
   x1="-16.158884"
   y1="358.96275"
   x2="4.8589652"
   y2="358.96275"
   gradientTransform="matrix(2.2124052,0,0,0.45199676,0,-1.7752663)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient52"
   x1="4.0704845"
   y1="179.65032"
   x2="14.020294"
   y2="179.65032"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient53"
   x1="83.280404"
   y1="71.350068"
   x2="104.29825"
   y2="71.350068"
   gradientTransform="scale(2.2124052,0.45199676)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient54"
   x1="166.88673"
   y1="35.930085"
   x2="176.83654"
   y2="35.930085"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient55"
   x1="83.280404"
   y1="358.96275"
   x2="104.29825"
   y2="358.96275"
   gradientTransform="matrix(2.2124052,0,0,0.45199676,0,-1.7752663)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient56"
   x1="166.88673"
   y1="179.65032"
   x2="176.83654"
   y2="179.65032"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#metalGrad1"
   id="linearGradient57"
   x1="9"
   y1="9"
   x2="191"
   y2="191"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient58"
   x1="-16.158884"
   y1="73.562473"
   x2="4.8589652"
   y2="73.562473"
   gradientTransform="scale(2.2124052,0.45199676)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient59"
   x1="4.0704845"
   y1="37.035626"
   x2="14.020294"
   y2="37.035626"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient60"
   x1="-16.158884"
   y1="361.17515"
   x2="4.8589652"
   y2="361.17515"
   gradientTransform="matrix(2.2124052,0,0,0.45199676,0,-3.5842294)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient61"
   x1="4.0704845"
   y1="180.75586"
   x2="14.020294"
   y2="180.75586"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient62"
   x1="83.280404"
   y1="73.562473"
   x2="104.29825"
   y2="73.562473"
   gradientTransform="scale(2.2124052,0.45199676)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#redFlow1"
   id="linearGradient63"
   x1="166.88673"
   y1="37.035626"
   x2="176.83654"
   y2="37.035626"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient64"
   x1="83.280404"
   y1="361.17515"
   x2="104.29825"
   y2="361.17515"
   gradientTransform="matrix(2.2124052,0,0,0.45199676,0,-3.5842294)"
   gradientUnits="userSpaceOnUse" /><linearGradient
   inkscape:collect="always"
   xlink:href="#blueFlow1"
   id="linearGradient65"
   x1="166.88673"
   y1="180.75586"
   x2="176.83654"
   y2="180.75586"
   gradientTransform="scale(1.1055403,0.90453512)"
   gradientUnits="userSpaceOnUse" /><clipPath
   id="clipId0-94">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-8"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-94-9">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-8-2"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-79">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-5"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-94-5">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-8-0"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-2">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-86"
   data-element-id="element-0-1761788125775" />
</clipPath>



































































<clipPath
   clipPathUnits="userSpaceOnUse"
   id="clipPath268"><path
     d="M 0,768 H 1024 V 0 H 0 Z"
     id="path268"
     data-element-id="element-0-1761788125775" /></clipPath><clipPath
   clipPathUnits="userSpaceOnUse"
   id="clipPath269"><path
     d="M 0,768 H 1024 V 0 H 0 Z"
     id="path269"
     data-element-id="element-0-1761788125775" /></clipPath>



<clipPath
   id="clipId0-948">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-82"
   data-element-id="element-0-1761788125775" />
</clipPath>



<linearGradient
   inkscape:collect="always"
   xlink:href="#linearGradient66"
   id="linearGradient76"
   x1="914.295"
   y1="622.231"
   x2="925.875"
   y2="622.231"
   gradientUnits="userSpaceOnUse" /><clipPath
   id="clipId0-98">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-3">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-8"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-7">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-3"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-1">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-0"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-1-4">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-0-8"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-1-5">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-0-5"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-4">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-38"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-1-0">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-0-88"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-7-0">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-3-6"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-1-4-8">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-0-8-1"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-78">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-1"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-1-58">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-0-6"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-7-1">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-3-2"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-98-1-4-4">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-80-0-8-2"
   data-element-id="element-0-1761788125775" />
</clipPath><clipPath
   id="clipId0-9488">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-2"
   data-element-id="element-0-1761788125775" />
</clipPath>

<linearGradient
   id="purpleGrad"
   x1="-21"
   y1="-21"
   x2="21"
   y2="21"
   gradientUnits="userSpaceOnUse">
  <stop
   offset="0%"
   style="stop-color:#9b59b6;stop-opacity:1"
   id="stop8" />
  <stop
   offset="100%"
   style="stop-color:#8e44ad;stop-opacity:1"
   id="stop9" />
</linearGradient>

<clipPath
   id="clipId0-94882">
<path
   d="M 0,768 H 1024 V 0 H 0 Z"
   id="path1-45"
   data-element-id="element-0-1761788125775" />
</clipPath></defs>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.1"
   id="g1"
   data-element-id="element-1-1761788125775"
   style="cursor: pointer;" />
<g
   id="g221"
   transform="translate(7.182251,8.8871244)"
   style="fill:#000000;fill-opacity:1"><path
     d="M 3.3602943,709.43517 H 1007.2811 V 40.217066 H 3.3602943 Z"
     id="path2"
     data-element-id="element-3-1761788125775"
     style="fill:#000000;fill-opacity:1;stroke:#e7e6e6;stroke-width:0.25;stroke-opacity:0.498039" /></g>


<g
   clip-path="url(#clipId0)"
   fill="rgb(204,236,255)"
   stroke="rgb(204,236,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g3"
   data-element-id="element-4-1761788125775"
   style="cursor: pointer;">
<path
   d="M579.337,548.613 867.481,548.613 867.481,461.159 579.337,461.159 z"
   id="path3"
   data-element-id="element-5-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="g4"
   data-element-id="element-6-1761788125775"
   style="cursor: pointer;">
<polyline
   points="579.337,548.613 867.481,548.613 867.481,461.159 579.337,461.159 579.337,548.613 "
   id="polyline3"
   data-element-id="element-7-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="#ccecff"
   stroke="#ccecff"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g5"
   data-element-id="element-8-1761788125775"
   transform="translate(2)">
<path
   d="M 234.623,606.128 H 336.621 V 355.479 H 234.623 Z"
   id="path4"
   data-element-id="element-9-1761788125775"
   class="" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#172c51"
   stroke-width="0.09"
   id="g6"
   data-element-id="element-10-1761788125775"
   transform="translate(2)">
<polyline
   points="234.623,606.128 336.621,606.128 336.621,355.479 234.623,355.479 234.623,606.128 "
   id="polyline5"
   data-element-id="element-11-1761788125775" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0"
   id="g8"
   data-element-id="element-12-1761788125775"
   style="cursor:pointer">
<text
   transform="scale(0.99970896,1.0002911)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081"
   id="text6"
   data-element-id="element-13-1761788125775"
   style="font-size:24.0001px;stroke-width:0"
   x="363.57785"
   y="92.379707">COOLING WATER SYSTEM</text>
<text
   transform="matrix(15.6175,0,0,15.6361,480.868,92.4016)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text7"
   data-element-id="element-14-1761788125775" />
<text
   transform="matrix(15.605,0,0,15.6361,557.939,92.4066)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text8"
   data-element-id="element-15-1761788125775" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(192,0,0)"
   stroke="rgb(192,0,0)"
   stroke-width="0"
   id="g10"
   data-element-id="element-16-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">
<text
   transform="matrix(7.85715 0 -0 7.84489 58.3613 195.696)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text9"
   data-element-id="element-17-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">To/From Aux</text>
<text
   transform="matrix(7.84277 0 -0 7.84489 58.4707 207.658)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text10"
   data-element-id="element-18-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">C.F.W. System</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,176,80)"
   stroke="rgb(0,176,80)"
   stroke-width="1"
   id="g48"
   data-element-id="element-19-1761788125775"
   style="cursor: pointer;">
<path
   d="M106.418,178.376 106.418,177.195 107.858,178.376 z"
   id="path10"
   data-element-id="element-20-1761788125775"
   style="cursor: pointer;" />
<path
   d="M107.858,178.376 106.418,177.195 107.858,177.195 z"
   id="path11"
   data-element-id="element-21-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.07,180.895 107.858,180.839 108.07,180.028 z"
   id="path12"
   data-element-id="element-22-1761788125775"
   style="cursor: pointer;" />
<path
   d="M107.858,178.376 107.858,177.195 108.07,178.376 z"
   id="path13"
   data-element-id="element-23-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.07,178.376 107.858,177.195 108.07,177.195 z"
   id="path14"
   data-element-id="element-24-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.07,175.542 107.858,174.732 108.07,174.675 z"
   id="path15"
   data-element-id="element-25-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.07,180.895 108.07,180.028 108.661,181.051 z"
   id="path16"
   data-element-id="element-26-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.661,181.051 108.07,180.028 108.661,179.684 z"
   id="path17"
   data-element-id="element-27-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.07,178.376 108.07,177.195 108.661,178.376 z"
   id="path18"
   data-element-id="element-28-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.661,178.376 108.07,177.195 108.661,177.195 z"
   id="path19"
   data-element-id="element-29-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.07,175.542 108.07,174.675 108.661,175.887 z"
   id="path20"
   data-element-id="element-30-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.661,175.887 108.07,174.675 108.661,174.519 z"
   id="path21"
   data-element-id="element-31-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.661,181.051 108.661,179.684 110.904,179.742 z"
   id="path22"
   data-element-id="element-32-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,179.742 108.661,179.684 110.904,178.376 z"
   id="path23"
   data-element-id="element-33-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.661,178.376 108.661,177.195 110.904,178.376 z"
   id="path24"
   data-element-id="element-34-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,178.376 108.661,177.195 110.904,177.195 z"
   id="path25"
   data-element-id="element-35-1761788125775"
   style="cursor: pointer;" />
<path
   d="M108.661,175.887 108.661,174.519 110.904,177.195 z"
   id="path26"
   data-element-id="element-36-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,177.195 108.661,174.519 110.904,175.828 z"
   id="path27"
   data-element-id="element-37-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,179.742 110.904,178.376 110.904,179.742 z"
   id="path28"
   data-element-id="element-38-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,179.742 110.904,178.376 110.904,178.376 z"
   id="path29"
   data-element-id="element-39-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,178.376 110.904,177.195 110.904,178.376 z"
   id="path30"
   data-element-id="element-40-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,178.376 110.904,177.195 110.904,177.195 z"
   id="path31"
   data-element-id="element-41-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,177.195 110.904,175.828 110.904,177.195 z"
   id="path32"
   data-element-id="element-42-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,177.195 110.904,175.828 110.904,175.828 z"
   id="path33"
   data-element-id="element-43-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,179.742 110.904,178.376 111.915,179.152 z"
   id="path34"
   data-element-id="element-44-1761788125775"
   style="cursor: pointer;" />
<path
   d="M111.915,179.152 110.904,178.376 111.915,178.376 z"
   id="path35"
   data-element-id="element-45-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,178.376 110.904,177.195 111.915,177.785 z"
   id="path36"
   data-element-id="element-46-1761788125775"
   style="cursor: pointer;" />
<path
   d="M110.904,177.195 110.904,175.828 111.915,177.195 z"
   id="path37"
   data-element-id="element-47-1761788125775"
   style="cursor: pointer;" />
<path
   d="M111.915,177.195 110.904,175.828 111.915,176.419 z"
   id="path38"
   data-element-id="element-48-1761788125775"
   style="cursor: pointer;" />
<path
   d="M111.915,179.152 111.915,178.376 112.792,178.64 z"
   id="path39"
   data-element-id="element-49-1761788125775"
   style="cursor: pointer;" />
<path
   d="M112.792,178.64 111.915,178.376 112.792,178.376 z"
   id="path40"
   data-element-id="element-50-1761788125775"
   style="cursor: pointer;" />
<path
   d="M112.792,178.297 111.915,177.785 112.792,177.274 z"
   id="path41"
   data-element-id="element-51-1761788125775"
   style="cursor: pointer;" />
<path
   d="M111.915,177.195 111.915,176.419 112.792,177.195 z"
   id="path42"
   data-element-id="element-52-1761788125775"
   style="cursor: pointer;" />
<path
   d="M112.792,177.195 111.915,176.419 112.792,176.931 z"
   id="path43"
   data-element-id="element-53-1761788125775"
   style="cursor: pointer;" />
<path
   d="M112.792,178.64 112.792,178.376 113.091,178.465 z"
   id="path44"
   data-element-id="element-54-1761788125775"
   style="cursor: pointer;" />
<path
   d="M113.091,178.465 112.792,178.376 113.091,178.376 z"
   id="path45"
   data-element-id="element-55-1761788125775"
   style="cursor: pointer;" />
<path
   d="M112.792,177.195 112.792,176.931 113.091,177.195 z"
   id="path46"
   data-element-id="element-56-1761788125775"
   style="cursor: pointer;" />
<path
   d="M113.091,177.195 112.792,176.931 113.091,177.105 z"
   id="path47"
   data-element-id="element-57-1761788125775"
   style="cursor: pointer;" />
<path
   d="M113.091,178.465 113.091,177.105 114.256,177.785 z"
   id="path48"
   data-element-id="element-58-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.53"
   id="g49"
   data-element-id="element-59-1761788125775"
   style="cursor:pointer;stroke-width:0.7;stroke-dasharray:none">
<polyline
   points="757.975,347.12 712.265,347.12 "
   id="polyline48"
   data-element-id="element-60-1761788125775"
   style="cursor:pointer;stroke-width:0.7;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.7"
   id="g50"
   data-element-id="element-61-1761788125775"
   style="cursor: pointer;">
<polyline
   points="757.692,355.053 711.982,355.053 "
   id="polyline49"
   data-element-id="element-62-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(64,64,64)"
   stroke="rgb(64,64,64)"
   stroke-width="0"
   id="g51"
   data-element-id="element-63-1761788125775"
   style="cursor: pointer;">
<text
   transform="matrix(5.8724 0 -0 5.90043 756.984 335.903)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text50"
   data-element-id="element-64-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#ffffff;fill-opacity:1">10K 125A</text>
<text
   transform="matrix(5.89892,0,0,5.90043,756.943,373.562)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text51"
   data-element-id="element-65-1761788125775"
   style="fill:#ffffff;fill-opacity:1">10K 8A</text>
</g>
<!-- EP CON Controller Group -->
<g
   id="g52_epcon_wrapper">
  <!-- EP CON Symbol -->
  <g
   transform="translate(261.87, 249.656) scale(0.2335, 0.2483)"
   id="g59">
    <defs
   id="defs19">
      <linearGradient
   id="epConGrad_new"
   x1="0%"
   y1="0%"
   x2="100%"
   y2="100%">
        <stop
   offset="0%"
   stop-color="#2C5282"
   id="stop10" />
        <stop
   offset="50%"
   stop-color="#2B6CB0"
   id="stop11" />
        <stop
   offset="100%"
   stop-color="#1A365D"
   id="stop12" />
      </linearGradient>
      <linearGradient
   id="metalEP_new"
   x1="0%"
   y1="0%"
   x2="100%"
   y2="100%">
        <stop
   offset="0%"
   stop-color="#e8e8e8"
   id="stop13" />
        <stop
   offset="50%"
   stop-color="#c0c0c0"
   id="stop14" />
        <stop
   offset="100%"
   stop-color="#a0a0a0"
   id="stop15" />
      </linearGradient>
      <linearGradient
   id="signalGradIn_new"
   x1="0%"
   y1="0%"
   x2="100%"
   y2="100%">
        <stop
   offset="0%"
   stop-color="#DAA520"
   id="stop16" />
        <stop
   offset="50%"
   stop-color="#FFD700"
   id="stop17" />
        <stop
   offset="100%"
   stop-color="#B8860B"
   id="stop18" />
      </linearGradient>
      <linearGradient
   id="signalGradOut_new"
   x1="0%"
   y1="0%"
   x2="100%"
   y2="100%">
        <stop
   offset="0%"
   stop-color="#2B6CB0"
   id="stop19" />
        <stop
   offset="50%"
   stop-color="#3B82F6"
   id="stop20" />
        <stop
   offset="100%"
   stop-color="#1E40AF"
   id="stop21" />
      </linearGradient>
    </defs>
    
    <!-- Input Terminal -->
    <rect
   x="5"
   y="47"
   width="20"
   height="26"
   rx="2"
   fill="url(#metalEP_new)"
   stroke="#909090"
   stroke-width="1.5"
   id="rect19" />
    <circle
   cx="15"
   cy="55"
   r="3"
   fill="url(#signalGradIn_new)"
   id="circle19" />
    <circle
   cx="15"
   cy="65"
   r="3"
   fill="#606060"
   id="circle20" />
    <path
   d="M 5 55 L -5 55 M 5 65 L -5 65"
   stroke="#DAA520"
   stroke-width="2.5"
   stroke-linecap="round"
   stroke-dasharray="4,3"
   id="path49">
      <animate
   attributeName="stroke-dashoffset"
   values="0;-7;0"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <text
   x="15"
   y="45"
   text-anchor="middle"
   fill="#B8860B"
   font-size="8"
   font-weight="bold"
   id="text49">IN</text>
    
    <!-- Main Controller Box -->
    <rect
   x="30"
   y="25"
   width="140"
   height="70"
   rx="8"
   fill="url(#epConGrad_new)"
   stroke="#1A365D"
   stroke-width="3"
   id="rect49" />
    <rect
   x="35"
   y="30"
   width="130"
   height="15"
   fill="rgba(255,255,255,0.2)"
   rx="4"
   id="rect50" />
    <rect
   x="35"
   y="30"
   width="130"
   height="5"
   fill="rgba(255,255,255,0.3)"
   rx="2"
   id="rect51" />
    
    <!-- LEDs -->
    <circle
   cx="50"
   cy="60"
   r="5"
   fill="#00ff00"
   stroke="#006600"
   stroke-width="1.5"
   id="circle51">
      <animate
   attributeName="opacity"
   values="0.5;1;0.5"
   dur="1s"
   repeatCount="indefinite" />
    </circle>
    <text
   x="50"
   y="82"
   text-anchor="middle"
   fill="rgba(255,255,255,0.8)"
   font-size="7"
   id="text52">PWR</text>
    
    <circle
   cx="70"
   cy="60"
   r="5"
   fill="#ffff00"
   stroke="#666600"
   stroke-width="1.5"
   id="circle52">
      <animate
   attributeName="opacity"
   values="0.3;0.8;0.3"
   dur="1.5s"
   repeatCount="indefinite" />
    </circle>
    <text
   x="70"
   y="82"
   text-anchor="middle"
   fill="rgba(255,255,255,0.8)"
   font-size="7"
   id="text53">SIG</text>
    
    <circle
   cx="90"
   cy="60"
   r="5"
   fill="#ff6600"
   stroke="#663300"
   stroke-width="1.5"
   id="circle53">
      <animate
   attributeName="opacity"
   values="0.4;0.9;0.4"
   dur="1.2s"
   repeatCount="indefinite" />
    </circle>
    <text
   x="90"
   y="82"
   text-anchor="middle"
   fill="rgba(255,255,255,0.8)"
   font-size="7"
   id="text54">OUT</text>
    
    <!-- Display -->
    <rect
   x="115"
   y="50"
   width="45"
   height="25"
   rx="3"
   fill="#1a1a1a"
   stroke="#0f1e36"
   stroke-width="2"
   id="rect54" />
    <rect
   x="117"
   y="52"
   width="41"
   height="4"
   fill="rgba(0,255,136,0.3)"
   id="rect55" />
    <text
   x="137.5"
   y="67"
   text-anchor="middle"
   fill="#00ff88"
   font-size="11"
   font-family="monospace"
   font-weight="bold"
   id="text55">
      AUTO
      <animate
   attributeName="opacity"
   values="0.7;1;0.7"
   dur="2s"
   repeatCount="indefinite" />
    </text>
    <text
   x="137.5"
   y="73"
   text-anchor="middle"
   fill="#00ccff"
   font-size="7"
   font-family="monospace"
   id="text56">75°C</text>
    <text
   x="100"
   y="90"
   text-anchor="middle"
   fill="rgba(255,255,255,0.6)"
   font-size="7"
   id="text57">MODEL: TC-3000</text>
    
    <!-- Output Terminal -->
    <rect
   x="175"
   y="47"
   width="20"
   height="26"
   rx="2"
   fill="url(#metalEP_new)"
   stroke="#909090"
   stroke-width="1.5"
   id="rect57" />
    <circle
   cx="185"
   cy="55"
   r="3"
   fill="url(#signalGradOut_new)"
   id="circle57" />
    <circle
   cx="185"
   cy="65"
   r="3"
   fill="#606060"
   id="circle58" />
    <path
   d="M 195 55 L 205 55 M 195 65 L 205 65"
   stroke="#2B6CB0"
   stroke-width="2.5"
   stroke-linecap="round"
   stroke-dasharray="4,3"
   id="path58">
      <animate
   attributeName="stroke-dashoffset"
   values="0;-7;0"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <text
   x="185"
   y="45"
   text-anchor="middle"
   fill="#2B6CB0"
   font-size="8"
   font-weight="bold"
   id="text58">OUT</text>
    <path
   d="M 200 58 L 205 58 L 202 55 M 205 58 L 202 61"
   stroke="#2B6CB0"
   stroke-width="2"
   fill="none"
   stroke-linecap="round"
   id="path59">
      <animateTransform
   attributeName="transform"
   type="translate"
   values="0,0; 3,0; 0,0"
   dur="1s"
   repeatCount="indefinite" />
    </path>
    
    <!-- Internal Flow -->
    <line
   x1="25"
   y1="60"
   x2="175"
   y2="60"
   stroke="rgba(59,130,246,0.3)"
   stroke-width="2"
   stroke-dasharray="5,5"
   id="line59">
      <animate
   attributeName="stroke-dashoffset"
   values="0;-10;0"
   dur="1.5s"
   repeatCount="indefinite" />
    </line>
    <text
   x="100"
   y="63"
   text-anchor="middle"
   fill="rgba(255,255,255,0.3)"
   font-size="20"
   id="text59">⚡</text>
  </g>
  
  <!-- EP CON Label (above symbol) -->
  <text
   transform="scale(1.0004792,0.99952103)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0517px"
   fill="#ffffff"
   id="text60"
   x="272.21854"
   y="252.12076"
   style="font-size:8px;stroke-width:7.84865">EP CON</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="#262626"
   stroke="#262626"
   stroke-width="0"
   id="g65"
   data-element-id="element-73-1761788125775"
   transform="translate(8.729343,-3.3646715)"
   style="fill:#ffffff;fill-opacity:1">
<text
   transform="matrix(6.17555,0,0,6.16863,396.834,475.449)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text61"
   data-element-id="element-74-1761788125775"
   style="fill:#ffffff;fill-opacity:1">3</text>
<text
   transform="matrix(6.17094,0,0,6.16863,401.463,475.46)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text62"
   data-element-id="element-75-1761788125775"
   style="fill:#ffffff;fill-opacity:1">-</text>
<text
   transform="matrix(6.17935,0,0,6.16863,405.616,475.507)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text63"
   data-element-id="element-76-1761788125775"
   style="fill:#ffffff;fill-opacity:1">Way</text>
<text
   transform="scale(0.99931566,1.0006848)"
   font-family="Bahnschrift, sans-serif"
   font-size="8.6801px"
   id="text64"
   data-element-id="element-77-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke-width:0"
   x="390.5683"
   y="485.51651">T/C Valve</text>

</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g61"
   data-element-id="element-79-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="957.5,264.113 960.609,265.066 "
   id="polyline59"
   data-element-id="element-80-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="958.917,259.494 962.025,260.446 "
   id="polyline60"
   data-element-id="element-81-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="960.333,254.866 963.442,255.826 "
   id="polyline61"
   data-element-id="element-82-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<polyline
   points="58.3465,217.168 152.694,217.168 152.694,476.884 "
   id="polyline62"
   data-element-id="element-84-1761788125775"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none" /><polyline
   points="391.067,452.612 375.484,452.612 375.484,178.163 "
   id="polyline63"
   data-element-id="element-85-1761788125775"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none"
   transform="translate(-4)" /><polyline
   points="58.3465,177.88 452.596,177.88 "
   id="polyline64"
   data-element-id="element-86-1761788125775"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none" /><polyline
   points="58.8187,437.407 135.222,437.407 135.222,220.945 "
   id="polyline65"
   data-element-id="element-87-1761788125775"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none" /><polyline
   points="202.654,563.015 365.567,563.015 365.567,388.864 202.654,388.864 202.654,563.015 "
   id="polyline66"
   data-element-id="element-88-1761788125775"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none" /><polyline
   points="393.333,459.884 393.333,476.317 58.8187,476.317 "
   id="polyline67"
   data-element-id="element-89-1761788125775"
   style="fill:none;stroke:#00b050;stroke-width:1.50948285;stroke-dasharray:none"
   transform="matrix(0.98721092,0,0,1.0002676,2.7688412,-0.12526531)" />



<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g70"
   data-element-id="element-93-1761788125775"
   style="cursor: pointer;">
<path
   d="M343.09,384.992 348.568,388.817 343.09,392.642 343.09,392.642 z"
   id="path69"
   data-element-id="element-94-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g72"
   data-element-id="element-97-1761788125775"
   style="cursor: pointer;">
<path
   d="M354.14,392.642 348.568,388.817 354.14,384.992 354.14,384.992 z"
   id="path71"
   data-element-id="element-98-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="g152"
   transform="translate(0,4)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7" /></g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g75"
   data-element-id="element-101-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="204.732,650.752 249.403,650.752 249.403,682.957 "
   id="polyline73"
   data-element-id="element-102-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="970.1,595.653 967.725,612.102 962.767,627.607 955.441,641.923 945.96,654.802 934.54,665.997 921.395,675.26 906.738,682.345 890.784,687.006 "
   id="polyline74"
   data-element-id="element-103-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="183.876,596.054 186.306,612.441 191.299,627.883 198.643,642.136 208.125,654.954 219.531,666.095 232.649,675.313 247.266,682.365 263.168,687.006 "
   id="polyline75"
   data-element-id="element-104-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,240)"
   stroke-width="0.7"
   id="g76"
   data-element-id="element-105-1761788125775"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none">
<polyline
   points="227.304,650.563 227.304,623.836 935.243,623.836 "
   id="polyline76"
   data-element-id="element-106-1761788125775"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
</g>

<path
   d="m 262.247,619.87 5.572,3.825 -5.572,3.825 v 0 z"
   id="path78"
   data-element-id="element-111-1761788125775"
   style="fill:#ffffff;fill-opacity:0.498039;stroke:#ffffff;stroke-width:0.25;stroke-opacity:0.498039" />



<path
   d="m 273.297,627.52 -5.572,-3.825 5.572,-3.825 v 0 z"
   id="path80"
   data-element-id="element-115-1761788125775"
   style="fill:#ffffff;fill-opacity:0.498039;stroke:#ffffff;stroke-width:0.25;stroke-opacity:0.498039" />



<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,240)"
   stroke-width="0.7"
   id="g85"
   data-element-id="element-118-1761788125775"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none">
<polyline
   points="519.886,249.939 627.267,249.939 627.267,394.719 "
   id="polyline82"
   data-element-id="element-119-1761788125775"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
<polyline
   points="520.453,393.964 627.267,393.964 "
   id="polyline83"
   data-element-id="element-120-1761788125775"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
<polyline
   points="519.792,322.943 622.922,322.943 "
   id="polyline84"
   data-element-id="element-121-1761788125775"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
<polyline
   points="804.441,623.647 804.441,433.063 "
   id="polyline85"
   data-element-id="element-122-1761788125775"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
</g><g
   id="g152-4-8"
   transform="translate(213.94,-136.23288)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8-8"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8-2" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2-91"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4-3"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5-5" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5-98"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1-4" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7-0" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1-76" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1-3" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5-6" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2-1"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7-5" /></g></g><g
   id="g152-4-77"
   transform="translate(213.80838,-63.153697)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8-7"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8-7" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2-33"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4-5"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5-9" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5-981"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1-82" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7-6" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1-6" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1-0" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5-38" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2-0"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7-1" /></g></g>
<text
   transform="scale(1.0019347,0.99806903)"
   font-family="Bahnschrift, sans-serif"
   font-size="9.45962px"
   id="text85"
   data-element-id="element-124-1761788125775"
   style="fill:#0000ff;stroke:#0000ff;stroke-width:0"
   x="587.45532"
   y="476.07431">NO.1</text><text
   transform="scale(1.0016139,0.9983887)"
   font-family="Bahnschrift, sans-serif"
   font-size="9.45659px"
   id="text86"
   data-element-id="element-125-1761788125775"
   style="fill:#0000ff;stroke:#0000ff;stroke-width:0"
   x="681.49719"
   y="475.92184">NO.2</text><text
   transform="scale(1.0017181,0.99828484)"
   font-family="Bahnschrift, sans-serif"
   font-size="9.45757px"
   id="text87"
   data-element-id="element-126-1761788125775"
   style="fill:#0000ff;stroke:#0000ff;stroke-width:0"
   x="772.70532"
   y="475.95737">NO.3</text>


<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#00b0f0"
   stroke-width="0.7"
   id="g89"
   data-element-id="element-127-1761788125775"
   transform="matrix(1.0297149,0,0,1.0057001,-17.845084,-0.83055197)"
   style="stroke-width:1.4740035;stroke-dasharray:none">
<polyline
   points="740.786,178.163 740.786,321.715 632.083,321.715 "
   id="polyline87"
   data-element-id="element-128-1761788125775"
   style="stroke-width:1.4740035;stroke-dasharray:none" />
<polyline
   points="521.491,177.785 855.912,177.785 855.912,232.845 "
   id="polyline88"
   data-element-id="element-129-1761788125775"
   style="stroke-width:1.4740035;stroke-dasharray:none" />
</g><g
   id="g152-4-0"
   transform="translate(214.62234,-207.55054)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8-90"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8-0" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2-6"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4-13"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5-8" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5-9"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1-34" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7-46" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1-0" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1-66" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5-18" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2-49"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7-6" /></g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#00b0f0"
   stroke-width="0.7"
   id="g89_outlet"
   data-element-id="element-127-1761788125775"
   transform="matrix(1.0001562,0,0,1.0014022,-0.09612976,-0.87504031)"
   style="stroke-width:1.4988324;stroke-dasharray:none">
<polyline
   points="617.162,623.836 617.162,433.346 804.063,433.346 "
   id="polyline89"
   data-element-id="element-130-1761788125775"
   style="stroke-width:1.4988324;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="1"
   id="g102"
   data-element-id="element-131-1761788125775"
   style="cursor: pointer;">
<path
   d="M598.865,513.204 597.329,505.595 598.865,497.985 z"
   id="path89"
   data-element-id="element-132-1761788125775"
   style="cursor: pointer;" />
<path
   d="M598.865,513.204 598.865,497.985 603.054,519.418 z"
   id="path90"
   data-element-id="element-133-1761788125775"
   style="cursor: pointer;" />
<path
   d="M603.054,519.418 598.865,497.985 603.054,491.771 z"
   id="path91"
   data-element-id="element-134-1761788125775"
   style="cursor: pointer;" />
<path
   d="M603.054,519.418 603.054,491.771 609.268,523.608 z"
   id="path92"
   data-element-id="element-135-1761788125775"
   style="cursor: pointer;" />
<path
   d="M609.268,523.608 603.054,491.771 609.268,487.581 z"
   id="path93"
   data-element-id="element-136-1761788125775"
   style="cursor: pointer;" />
<path
   d="M609.268,523.608 609.268,487.581 616.878,525.144 z"
   id="path94"
   data-element-id="element-137-1761788125775"
   style="cursor: pointer;" />
<path
   d="M616.878,525.144 609.268,487.581 616.878,486.045 z"
   id="path95"
   data-element-id="element-138-1761788125775"
   style="cursor: pointer;" />
<path
   d="M616.878,525.144 616.878,486.045 624.488,523.608 z"
   id="path96"
   data-element-id="element-139-1761788125775"
   style="cursor: pointer;" />
<path
   d="M624.488,523.608 616.878,486.045 624.488,487.581 z"
   id="path97"
   data-element-id="element-140-1761788125775"
   style="cursor: pointer;" />
<path
   d="M624.488,523.608 624.488,487.581 630.702,519.418 z"
   id="path98"
   data-element-id="element-141-1761788125775"
   style="cursor: pointer;" />
<path
   d="M630.702,519.418 624.488,487.581 630.702,491.771 z"
   id="path99"
   data-element-id="element-142-1761788125775"
   style="cursor: pointer;" />
<path
   d="M630.702,519.418 630.702,491.771 634.892,513.204 z"
   id="path100"
   data-element-id="element-143-1761788125775"
   style="cursor: pointer;" />
<path
   d="M634.892,513.204 630.702,491.771 634.892,497.985 z"
   id="path101"
   data-element-id="element-144-1761788125775"
   style="cursor: pointer;" />
<path
   d="M634.892,513.204 634.892,497.985 636.428,505.595 z"
   id="path102"
   data-element-id="element-145-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="SW_Pump_1"
   clip-path="url(#clipId0)"
   data-element-id="element-146-1761788125775"
   style="cursor: pointer;">
    <circle
   cx="616.88"
   cy="505.59"
   r="16.956521739130437"
   fill="#06b6d4"
   stroke="none"
   opacity="0.9"
   data-element-id="element-147-1761788125775"
   style="cursor: pointer;"
   id="circle1">
        <animate
   attributeName="opacity"
   values="0.8;1;0.8"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="616.88"
   cy="505.59"
   r="13.565217391304351"
   fill="#0891b2"
   stroke="none"
   data-element-id="element-148-1761788125775"
   style="cursor: pointer;"
   id="circle2" />
    <g
   class="impeller-SW_Pump_1"
   data-element-id="element-149-1761788125775"
   style="cursor: pointer;"
   id="g9">
        <circle
   cx="616.88"
   cy="505.59"
   r="10.682608695652176"
   fill="#0e7490"
   stroke="none"
   data-element-id="element-150-1761788125775"
   style="cursor: pointer;"
   class=""
   id="circle3" />
        <path
   d="M 616.88,494.9073913043478 L 619.2539130434783,499.8247826086956 L 616.88,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-151-1761788125775"
   style="cursor: pointer;"
   id="path5" />
        <path
   d="M 627.5626086956522,505.59 L 621.6278260869565,507.9639130434782 L 616.88,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-152-1761788125775"
   style="cursor: pointer;"
   id="path6" />
        <path
   d="M 616.88,516.2726086956521 L 614.5060869565217,510.3378260869565 L 616.88,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-153-1761788125775"
   style="cursor: pointer;"
   id="path7" />
        <path
   d="M 606.1973913043478,505.59 L 612.1321739130435,503.21608695652174 L 616.88,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-154-1761788125775"
   style="cursor: pointer;"
   id="path8" />
    </g>
    <circle
   cx="616.88"
   cy="505.59"
   r="3.900000000000001"
   fill="#fbbf24"
   data-element-id="element-155-1761788125775"
   style="cursor: pointer;"
   id="circle9">
        <animate
   attributeName="r"
   values="3.900000000000001;4.917391304347826;3.900000000000001"
   dur="1s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="616.88"
   cy="505.59"
   r="1.8652173913043482"
   fill="#f59e0b"
   stroke="none"
   data-element-id="element-156-1761788125775"
   style="cursor: pointer;"
   id="circle10" />
    <rect
   x="612.88"
   y="522.55"
   width="8"
   height="12"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-157-1761788125775"
   style="cursor: pointer;"
   id="rect10" />
    <path
   d="M 616.88,525.55 L 616.88,531.55"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-158-1761788125775"
   style="cursor: pointer;"
   id="path75">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <rect
   x="612.88"
   y="476.63347826086954"
   width="8"
   height="12"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-159-1761788125775"
   style="cursor: pointer;"
   id="rect75" />
    <path
   d="M 616.88,479.63347826086954 L 616.88,485.63347826086954"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-160-1761788125775"
   style="cursor: pointer;"
   id="path50">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g104"
   data-element-id="element-161-1761788125775"
   style="cursor: pointer;">

</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g105"
   data-element-id="element-163-1761788125775"
   style="cursor: pointer;">

</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="1"
   id="g118"
   data-element-id="element-165-1761788125775"
   style="cursor: pointer;">
<path
   d="M785.388,513.204 783.852,505.595 785.388,497.985 z"
   id="path105"
   data-element-id="element-166-1761788125775"
   style="cursor: pointer;" />
<path
   d="M785.388,513.204 785.388,497.985 789.578,519.418 z"
   id="path106"
   data-element-id="element-167-1761788125775"
   style="cursor: pointer;" />
<path
   d="M789.578,519.418 785.388,497.985 789.578,491.771 z"
   id="path107"
   data-element-id="element-168-1761788125775"
   style="cursor: pointer;" />
<path
   d="M789.578,519.418 789.578,491.771 795.792,523.608 z"
   id="path108"
   data-element-id="element-169-1761788125775"
   style="cursor: pointer;" />
<path
   d="M795.792,523.608 789.578,491.771 795.792,487.581 z"
   id="path109"
   data-element-id="element-170-1761788125775"
   style="cursor: pointer;" />
<path
   d="M795.792,523.608 795.792,487.581 803.402,525.144 z"
   id="path110"
   data-element-id="element-171-1761788125775"
   style="cursor: pointer;" />
<path
   d="M803.402,525.144 795.792,487.581 803.402,486.045 z"
   id="path111"
   data-element-id="element-172-1761788125775"
   style="cursor: pointer;" />
<path
   d="M803.402,525.144 803.402,486.045 811.012,523.608 z"
   id="path112"
   data-element-id="element-173-1761788125775"
   style="cursor: pointer;" />
<path
   d="M811.012,523.608 803.402,486.045 811.012,487.581 z"
   id="path113"
   data-element-id="element-174-1761788125775"
   style="cursor: pointer;" />
<path
   d="M811.012,523.608 811.012,487.581 817.226,519.418 z"
   id="path114"
   data-element-id="element-175-1761788125775"
   style="cursor: pointer;" />
<path
   d="M817.226,519.418 811.012,487.581 817.226,491.771 z"
   id="path115"
   data-element-id="element-176-1761788125775"
   style="cursor: pointer;" />
<path
   d="M817.226,519.418 817.226,491.771 821.415,513.204 z"
   id="path116"
   data-element-id="element-177-1761788125775"
   style="cursor: pointer;" />
<path
   d="M821.415,513.204 817.226,491.771 821.415,497.985 z"
   id="path117"
   data-element-id="element-178-1761788125775"
   style="cursor: pointer;" />
<path
   d="M821.415,513.204 821.415,497.985 822.951,505.595 z"
   id="path118"
   data-element-id="element-179-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="SW_Pump_3"
   clip-path="url(#clipId0)"
   data-element-id="element-180-1761788125775"
   style="cursor: pointer;">
    <circle
   cx="803.4"
   cy="505.59"
   r="16.956521739130437"
   fill="#06b6d4"
   stroke="none"
   opacity="0.9"
   data-element-id="element-181-1761788125775"
   style="cursor: pointer;"
   id="circle50">
        <animate
   attributeName="opacity"
   values="0.8;1;0.8"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="803.4"
   cy="505.59"
   r="13.565217391304351"
   fill="#0891b2"
   stroke="none"
   data-element-id="element-182-1761788125775"
   style="cursor: pointer;"
   id="circle76" />
    <g
   class="impeller-SW_Pump_3"
   data-element-id="element-183-1761788125775"
   style="cursor: pointer;"
   id="g55">
        <circle
   cx="803.4"
   cy="505.59"
   r="10.682608695652176"
   fill="#0e7490"
   stroke="none"
   data-element-id="element-184-1761788125775"
   style="cursor: pointer;"
   id="circle77" />
        <path
   d="M 803.4,494.9073913043478 L 805.7739130434783,499.8247826086956 L 803.4,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-185-1761788125775"
   style="cursor: pointer;"
   id="path52" />
        <path
   d="M 814.0826086956522,505.59 L 808.1478260869565,507.9639130434782 L 803.4,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-186-1761788125775"
   style="cursor: pointer;"
   id="path53" />
        <path
   d="M 803.4,516.2726086956521 L 801.0260869565217,510.3378260869565 L 803.4,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-187-1761788125775"
   style="cursor: pointer;"
   id="path54" />
        <path
   d="M 792.7173913043478,505.59 L 798.6521739130435,503.21608695652174 L 803.4,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-188-1761788125775"
   style="cursor: pointer;"
   id="path55" />
    </g>
    <circle
   cx="803.4"
   cy="505.59"
   r="3.900000000000001"
   fill="#fbbf24"
   data-element-id="element-189-1761788125775"
   style="cursor: pointer;"
   id="circle55">
        <animate
   attributeName="r"
   values="3.900000000000001;4.917391304347826;3.900000000000001"
   dur="1s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="803.4"
   cy="505.59"
   r="1.8652173913043482"
   fill="#f59e0b"
   stroke="none"
   data-element-id="element-190-1761788125775"
   style="cursor: pointer;"
   id="circle56" />
    <rect
   x="799.4"
   y="522.55"
   width="8"
   height="12"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-191-1761788125775"
   style="cursor: pointer;"
   id="rect56" />
    <path
   d="M 803.4,525.55 L 803.4,531.55"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-192-1761788125775"
   style="cursor: pointer;"
   id="path56">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <rect
   x="799.4"
   y="476.63347826086954"
   width="8"
   height="12"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-193-1761788125775"
   style="cursor: pointer;"
   id="rect77" />
    <path
   d="M 803.4,479.63347826086954 L 803.4,485.63347826086954"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-194-1761788125775"
   style="cursor: pointer;"
   id="path57">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g120"
   data-element-id="element-195-1761788125775"
   style="cursor: pointer;">

</g>


<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g124"
   data-element-id="element-203-1761788125775"
   style="cursor: pointer;">
<polyline
   points="620.939,445.073 617.162,450.551 613.384,445.073 620.939,445.073 "
   id="polyline123"
   data-element-id="element-204-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g125"
   data-element-id="element-205-1761788125775"
   style="cursor: pointer;">
<path
   d="M613.384,456.123 617.162,450.551 620.939,456.123 620.939,456.123 z"
   id="path124"
   data-element-id="element-206-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="g168"><g
     transform="translate(617.173,450.598) rotate(90) scale(0.3,0.27) translate(-60,-70)"
     id="g52">











<rect
   x="40"
   y="50"
   width="40"
   height="40"
   rx="4"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2.5"
   id="rect15" />
<rect
   x="42"
   y="52"
   width="36"
   height="8"
   fill="rgba(255,255,255,0.4)"
   id="rect16"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="42"
   y="80"
   width="36"
   height="8"
   fill="rgba(0,0,0,0.15)"
   id="rect17"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="52"
   y="30"
   width="16"
   height="22"
   rx="2"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2"
   id="rect18" />
<ellipse
   cx="60"
   cy="20"
   rx="20"
   ry="9"
   fill="#20B2AA"
   stroke="#006666"
   stroke-width="2.5"
   id="ellipse18" />
<ellipse
   cx="60"
   cy="17"
   rx="18"
   ry="7"
   fill="#008B8B"
   id="ellipse19" />
<line
   x1="42"
   y1="17"
   x2="78"
   y2="17"
   stroke="#004d4d"
   stroke-width="3"
   id="line19" />
<line
   x1="60"
   y1="9"
   x2="60"
   y2="25"
   stroke="#004d4d"
   stroke-width="3"
   id="line20" />
<circle
   cx="60"
   cy="17"
   r="4"
   fill="#008B8B"
   id="circle21" />
<ellipse
   cx="60"
   cy="14"
   rx="10"
   ry="3"
   fill="rgba(255,255,255,0.5)"
   id="ellipse21"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="57"
   y="24"
   width="6"
   height="8"
   fill="#a8a8a8"
   stroke="#707070"
   stroke-width="1"
   id="rect21" />
<path
   d="M 70 70 L 50 70 M 55 64 L 50 70 L 55 76"
   stroke="#008B8B"
   stroke-width="3"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill="none"
   id="path51">
<animate
   attributeName="opacity"
   values="0.5;1;0.5"
   dur="2s"
   repeatCount="indefinite" />
<animate
   attributeName="stroke-width"
   values="2.5;3.5;2.5"
   dur="2s"
   repeatCount="indefinite" />
</path></g></g>


<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g128"
   data-element-id="element-211-1761788125775"
   style="cursor: pointer;">
<path
   d="M808.266,445.057 804.441,450.535 800.616,445.057 800.616,445.057 z"
   id="path127"
   data-element-id="element-212-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g130"
   data-element-id="element-215-1761788125775"
   style="cursor: pointer;">
<path
   d="M800.616,456.107 804.441,450.535 808.266,456.107 808.266,456.107 z"
   id="path129"
   data-element-id="element-216-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="g208"><g
     transform="translate(804.405,450.582) rotate(90) scale(0.3,0.27) translate(-60,-70)"
     id="g74">











<rect
   x="40"
   y="50"
   width="40"
   height="40"
   rx="4"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2.5"
   id="rect67" />
<rect
   x="42"
   y="52"
   width="36"
   height="8"
   fill="rgba(255,255,255,0.4)"
   id="rect68"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="42"
   y="80"
   width="36"
   height="8"
   fill="rgba(0,0,0,0.15)"
   id="rect69"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="52"
   y="30"
   width="16"
   height="22"
   rx="2"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2"
   id="rect70" />
<ellipse
   cx="60"
   cy="20"
   rx="20"
   ry="9"
   fill="#20B2AA"
   stroke="#006666"
   stroke-width="2.5"
   id="ellipse70" />
<ellipse
   cx="60"
   cy="17"
   rx="18"
   ry="7"
   fill="#008B8B"
   id="ellipse71" />
<line
   x1="42"
   y1="17"
   x2="78"
   y2="17"
   stroke="#004d4d"
   stroke-width="3"
   id="line71" />
<line
   x1="60"
   y1="9"
   x2="60"
   y2="25"
   stroke="#004d4d"
   stroke-width="3"
   id="line72" />
<circle
   cx="60"
   cy="17"
   r="4"
   fill="#008B8B"
   id="circle72" />
<ellipse
   cx="60"
   cy="14"
   rx="10"
   ry="3"
   fill="rgba(255,255,255,0.5)"
   id="ellipse72"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="57"
   y="24"
   width="6"
   height="8"
   fill="#a8a8a8"
   stroke="#707070"
   stroke-width="1"
   id="rect72" />
<path
   d="M 70 70 L 50 70 M 55 64 L 50 70 L 55 76"
   stroke="#008B8B"
   stroke-width="3"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill="none"
   id="path72">
<animate
   attributeName="opacity"
   values="0.5;1;0.5"
   dur="2s"
   repeatCount="indefinite" />
<animate
   attributeName="stroke-width"
   values="2.5;3.5;2.5"
   dur="2s"
   repeatCount="indefinite" />
</path></g></g>
   points=&quot;804.441,611.748 811.335,611.748 &quot;
   id=&quot;polyline131&quot;
   data-element-id=&quot;element-219-1761788125775&quot;
   style=&quot;fill:none;stroke:#000000;stroke-width:0.53&quot; /&gt;




<g
   clip-path="url(#clipId0)"
   fill="#ffffff"
   stroke="#ffffff"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g135"
   data-element-id="element-225-1761788125775"
   transform="translate(0,-4)">
<path
   d="m 800.946,617.225 3.778,-5.572 3.778,5.572 v 0 z"
   id="path134"
   data-element-id="element-226-1761788125775" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g137"
   data-element-id="element-229-1761788125775"
   style="cursor:pointer;fill:#000000;fill-opacity:0.49803904">
<path
   d="M765.153,339.659 765.153,363.553 758.258,358.776 758.258,344.437 z"
   id="path136"
   data-element-id="element-230-1761788125775"
   style="cursor:pointer;fill:#000000;fill-opacity:0.49803904" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g138"
   data-element-id="element-231-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="765.153,339.659 765.153,363.553 758.258,358.776 758.258,344.437 765.153,339.659 "
   id="polyline137"
   data-element-id="element-232-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g139"
   data-element-id="element-233-1761788125775"
   style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-opacity:1"
   transform="matrix(0.99262426,0,0,1.0000766,5.6422872,-0.02881015)">
<polyline
   points="913.994,393.019 801.607,393.019 "
   id="polyline138"
   data-element-id="element-234-1761788125775"
   style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="802.363,392.83 802.363,359.587 765.153,359.587 "
   id="polyline139"
   data-element-id="element-235-1761788125775"
   style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g142"
   data-element-id="element-239-1761788125775"
   style="cursor: pointer;">
<path
   d="M772.897,355.715 778.375,359.492 772.897,363.27 772.897,363.27 z"
   id="path141"
   data-element-id="element-240-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g144"
   data-element-id="element-243-1761788125775"
   style="cursor: pointer;">
<path
   d="M783.947,363.27 778.375,359.492 783.947,355.715 783.947,355.715 z"
   id="path143"
   data-element-id="element-244-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,0,0)"
   stroke-width="0.35"
   id="g147"
   data-element-id="element-247-1761788125775"
   style="cursor:pointer;stroke-width:0.7;stroke-dasharray:none">
<polyline
   points="802.316,329.318 802.316,345.373 "
   id="polyline145"
   data-element-id="element-248-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;stroke-width:0.7;stroke-dasharray:none" />
<polyline
   points="802.41,307.502 802.41,285.591 852.842,285.591 "
   id="polyline146"
   data-element-id="element-249-1761788125775"
   style="stroke:#ffffff;stroke-width:0.7;stroke-dasharray:none;stroke-opacity:1"
   transform="matrix(1.0020232,0,0,0.72824727,-1.6744554,83.615524)" />
<g
   transform="translate(802, 318)"
   id="g11"
   style="stroke-width:0.7;stroke-dasharray:none">
<circle
   cx="0"
   cy="0"
   r="12"
   fill="#ecf0f1"
   stroke="#95a5a6"
   stroke-width="1.5"
   id="circle74"
   style="stroke-width:0.7;stroke-dasharray:none" />
<rect
   x="-3"
   y="-8"
   width="6"
   height="10"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   rx="1"
   id="rect8"
   style="stroke-width:0.7;stroke-dasharray:none" />
<circle
   cx="0"
   cy="4"
   r="3.5"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   id="circle75"
   style="stroke-width:0.7;stroke-dasharray:none">
<animate
   attributeName="r"
   values="3.5;4.2;3.5"
   dur="2s"
   repeatCount="indefinite" />
</circle>
</g>
</g>
<text
   transform="scale(1.0018644,0.99813906)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.067px"
   id="text147"
   data-element-id="element-252-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke:#ff0000;stroke-width:0"
   x="825.03577"
   y="306.57053">TX1</text><text
   transform="scale(1.0012395,0.99876203)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0601px"
   id="text148"
   data-element-id="element-253-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke:#ff0000;stroke-width:0"
   x="819.67999"
   y="287.7713">To ESS</text>


<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g149"
   data-element-id="element-254-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="817.096,345.515 770.536,345.515 "
   id="polyline148"
   data-element-id="element-255-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g150"
   data-element-id="element-256-1761788125775"
   style="cursor:pointer;fill:#000000;fill-opacity:0.49803904">
<path
   d="M765.341,348.726 770.064,348.726 770.064,342.304 765.341,342.304 z"
   id="path149"
   data-element-id="element-257-1761788125775"
   style="cursor:pointer;fill:#000000;fill-opacity:0.49803904" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g151"
   data-element-id="element-258-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="765.341,348.726 770.064,348.726 770.064,342.304 765.341,342.304 765.341,348.726 "
   id="polyline150"
   data-element-id="element-259-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,0,0)"
   stroke-width="0.35"
   id="g165"
   data-element-id="element-275-1761788125775"
   style="cursor: pointer;">
<polyline
   points="817.143,345.137 818.026,340.782 820.434,337.225 824.006,334.825 828.382,333.946 832.757,334.825 836.33,337.225 838.737,340.782 839.62,345.137 838.737,349.492 836.33,353.05 832.757,355.449 828.382,356.328 824.006,355.449 820.434,353.05 818.026,349.492 817.143,345.137 "
   id="polyline164"
   data-element-id="element-276-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,0,0)"
   stroke="rgb(255,0,0)"
   stroke-width="0"
   id="g166"
   data-element-id="element-277-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">
<text
   transform="matrix(7.90037 0 -0 7.84489 822.623 349.513)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text165"
   data-element-id="element-278-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">TX</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g167"
   data-element-id="element-279-1761788125775"
   style="stroke:#ffffff;stroke-opacity:1"
   transform="matrix(0.9813836,0,0,1,15.633864,0)">
<polyline
   points="913.994,345.515 840.14,345.515 "
   id="polyline166"
   data-element-id="element-280-1761788125775"
   style="stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g181"
   data-element-id="element-296-1761788125775"
   style="cursor: pointer;">
<polyline
   points="912.955,345.184 914.227,338.878 917.698,333.73 922.846,330.26 929.152,328.987 935.458,330.26 940.606,333.73 944.076,338.878 945.349,345.184 944.076,351.49 940.606,356.638 935.458,360.109 929.152,361.381 922.846,360.109 917.698,356.638 914.227,351.49 912.955,345.184 "
   id="polyline180"
   data-element-id="element-297-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g182"
   data-element-id="element-298-1761788125775"
   style="cursor: pointer;">
<text
   transform="matrix(7.92838 0 -0 7.84489 924.928 342.902)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text181"
   data-element-id="element-299-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">TI</text>
<text
   transform="matrix(7.84248 0 -0 7.84489 921.54 356.126)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text182"
   data-element-id="element-300-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">MC</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#000000"
   stroke-width="0.53"
   id="g183"
   data-element-id="element-301-1761788125775"
   transform="translate(0,0.4205839)">
<polyline
   points="912.955,345.137 945.388,345.137 "
   id="polyline182"
   data-element-id="element-302-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g197"
   data-element-id="element-318-1761788125775"
   style="cursor: pointer;">
<polyline
   points="912.955,392.972 914.227,386.666 917.698,381.518 922.846,378.048 929.152,376.775 935.458,378.048 940.606,381.518 944.076,386.666 945.349,392.972 944.076,399.278 940.606,404.426 935.458,407.897 929.152,409.169 922.846,407.897 917.698,404.426 914.227,399.278 912.955,392.972 "
   id="polyline196"
   data-element-id="element-319-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g198"
   data-element-id="element-320-1761788125775"
   style="cursor: pointer;">
<text
   transform="matrix(7.86132 0 -0 7.84489 924.184 390.69)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text197"
   data-element-id="element-321-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">PI</text>
<text
   transform="matrix(7.84248 0 -0 7.84489 921.54 403.93)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text198"
   data-element-id="element-322-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">MC</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g199"
   data-element-id="element-323-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="912.955,392.925 945.388,392.925 "
   id="polyline198"
   data-element-id="element-324-1761788125775"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g200"
   data-element-id="element-325-1761788125775"
   style="stroke:#ffffff;stroke-opacity:1"
   transform="matrix(0.99923482,0,0,1.0709396,0.68701094,-27.881943)">
<polyline
   points="913.602,435.555 882.072,435.424 882.072,393.208 "
   id="polyline199"
   data-element-id="element-326-1761788125775"
   style="stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,0,0)"
   stroke-width="0.35"
   id="g201"
   data-element-id="element-327-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;stroke-width:0.7;stroke-dasharray:none">
<polyline
   points="926.602,448.599 926.602,463.804 967.023,463.804 "
   id="polyline200"
   data-element-id="element-328-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;stroke-width:0.7;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,0,0)"
   stroke="rgb(255,0,0)"
   stroke-width="0"
   id="g202"
   data-element-id="element-329-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-opacity:1"
   transform="translate(-10)">
<text
   transform="matrix(7.85705,0,0,7.8583,941.4,474.872)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text201"
   data-element-id="element-330-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-opacity:1">To ESS for</text>
<text
   transform="matrix(7.84192,0,0,7.84489,941.507,486.795)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text202"
   data-element-id="element-331-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-opacity:1">Interlock</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#00b0f0"
   stroke-width="0.7"
   id="g203"
   data-element-id="element-332-1761788125775"
   transform="matrix(0.92293059,0,0,0.98187383,74.997985,5.7117205)"
   style="stroke-width:1.57896;stroke-dasharray:none">
<polyline
   points="955.454,258.549 855.581,231.791 "
   id="polyline202"
   data-element-id="element-333-1761788125775"
   style="stroke-width:1.57896;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g204"
   data-element-id="element-334-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="934.291,252.749 936.636,245.91 "
   id="polyline203"
   data-element-id="element-335-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="932.237,244.438 940.988,247.444 "
   id="polyline204"
   data-element-id="element-336-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g205"
   data-element-id="element-337-1761788125775"
   style="cursor: pointer;">
<path
   d="M929.238,246.689 934.346,252.662 926.649,254.236 926.649,254.236 z"
   id="path204"
   data-element-id="element-338-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g207"
   data-element-id="element-341-1761788125775"
   style="cursor: pointer;">
<path
   d="M939.462,258.636 934.346,252.662 942.051,251.088 942.051,251.088 z"
   id="path206"
   data-element-id="element-342-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g213"
   data-element-id="element-349-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="944.333,259.966 946.962,252.253 "
   id="polyline212"
   data-element-id="element-350-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="946.875,260.832 949.504,253.119 "
   id="polyline213"
   data-element-id="element-351-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g214"
   data-element-id="element-352-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:0.49803904">
<path
   d="M945.152,260.123 947.741,252.513 948.804,252.875 946.206,260.485 z"
   id="path213"
   data-element-id="element-353-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:0.49803904;fill:#000000;fill-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="#0000ff"
   stroke="#0000ff"
   stroke-width="0"
   id="g215"
   data-element-id="element-354-1761788125775"
   transform="translate(-44,-34)">
<text
   transform="scale(1.0030892,0.99692032)"
   font-family="Bahnschrift, sans-serif"
   font-size="9.47052px"
   id="text214"
   data-element-id="element-355-1761788125775"
   x="285.66058"
   y="401.49847"
   style="stroke-width:0">NO.1</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="1"
   id="g228"
   data-element-id="element-356-1761788125775"
   style="cursor: pointer;">
<path
   d="M255.189,396.663 253.653,389.053 255.189,381.443 z"
   id="path215"
   data-element-id="element-357-1761788125775"
   style="cursor: pointer;" />
<path
   d="M255.189,396.663 255.189,381.443 259.379,402.877 z"
   id="path216"
   data-element-id="element-358-1761788125775"
   style="cursor: pointer;" />
<path
   d="M259.379,402.877 255.189,381.443 259.379,375.229 z"
   id="path217"
   data-element-id="element-359-1761788125775"
   style="cursor: pointer;" />
<path
   d="M259.379,402.877 259.379,375.229 265.593,407.066 z"
   id="path218"
   data-element-id="element-360-1761788125775"
   style="cursor: pointer;" />
<path
   d="M265.593,407.066 259.379,375.229 265.593,371.039 z"
   id="path219"
   data-element-id="element-361-1761788125775"
   style="cursor: pointer;" />
<path
   d="M265.593,407.066 265.593,371.039 273.203,408.602 z"
   id="path220"
   data-element-id="element-362-1761788125775"
   style="cursor: pointer;" />
<path
   d="M273.203,408.602 265.593,371.039 273.203,369.503 z"
   id="path221"
   data-element-id="element-363-1761788125775"
   style="cursor: pointer;" />
<path
   d="M273.203,408.602 273.203,369.503 280.813,407.066 z"
   id="path222"
   data-element-id="element-364-1761788125775"
   style="cursor: pointer;" />
<path
   d="M280.813,407.066 273.203,369.503 280.813,371.039 z"
   id="path223"
   data-element-id="element-365-1761788125775"
   style="cursor: pointer;" />
<path
   d="M280.813,407.066 280.813,371.039 287.027,402.877 z"
   id="path224"
   data-element-id="element-366-1761788125775"
   style="cursor: pointer;" />
<path
   d="M287.027,402.877 280.813,371.039 287.027,375.229 z"
   id="path225"
   data-element-id="element-367-1761788125775"
   style="cursor: pointer;" />
<path
   d="M287.027,402.877 287.027,375.229 291.216,396.663 z"
   id="path226"
   data-element-id="element-368-1761788125775"
   style="cursor: pointer;" />
<path
   d="M291.216,396.663 287.027,375.229 291.216,381.443 z"
   id="path227"
   data-element-id="element-369-1761788125775"
   style="cursor: pointer;" />
<path
   d="M291.216,396.663 291.216,381.443 292.752,389.053 z"
   id="path228"
   data-element-id="element-370-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="LT_Pump_1"
   clip-path="url(#clipId0)"
   data-element-id="element-371-1761788125775"
   style="cursor: pointer;">
    <circle
   cx="273.2"
   cy="389.05"
   r="16.956521739130437"
   fill="#06b6d4"
   stroke="none"
   opacity="0.9"
   data-element-id="element-372-1761788125775"
   style="cursor: pointer;"
   id="circle78">
        <animate
   attributeName="opacity"
   values="0.8;1;0.8"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="273.2"
   cy="389.05"
   r="13.565217391304351"
   fill="#0891b2"
   stroke="none"
   data-element-id="element-373-1761788125775"
   style="cursor: pointer;"
   id="circle79" />
    <g
   class="impeller-LT_Pump_1"
   data-element-id="element-374-1761788125775"
   style="cursor: pointer;"
   id="g62">
        <circle
   cx="273.2"
   cy="389.05"
   r="10.682608695652176"
   fill="#0e7490"
   stroke="none"
   data-element-id="element-375-1761788125775"
   style="cursor: pointer;"
   id="circle80" />
        <path
   d="M 273.2,378.36739130434785 L 275.5739130434782,383.28478260869565 L 273.2,389.05 Z"
   fill="#06b6d4"
   data-element-id="element-376-1761788125775"
   style="cursor: pointer;"
   id="path79" />
        <path
   d="M 283.88260869565215,389.05 L 277.9478260869565,391.42391304347825 L 273.2,389.05 Z"
   fill="#06b6d4"
   data-element-id="element-377-1761788125775"
   style="cursor: pointer;"
   id="path60" />
        <path
   d="M 273.2,399.7326086956522 L 270.82608695652175,393.79782608695655 L 273.2,389.05 Z"
   fill="#06b6d4"
   data-element-id="element-378-1761788125775"
   style="cursor: pointer;"
   id="path61" />
        <path
   d="M 262.5173913043478,389.05 L 268.45217391304345,386.6760869565218 L 273.2,389.05 Z"
   fill="#06b6d4"
   data-element-id="element-379-1761788125775"
   style="cursor: pointer;"
   id="path62" />
    </g>
    <circle
   cx="273.2"
   cy="389.05"
   r="3.900000000000001"
   fill="#fbbf24"
   data-element-id="element-380-1761788125775"
   style="cursor: pointer;"
   id="circle81">
        <animate
   attributeName="r"
   values="3.900000000000001;4.917391304347826;3.900000000000001"
   dur="1s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="273.2"
   cy="389.05"
   r="1.8652173913043482"
   fill="#f59e0b"
   stroke="none"
   data-element-id="element-381-1761788125775"
   style="cursor: pointer;"
   id="circle82" />
    <rect
   x="244.24347826086955"
   y="385.05"
   width="12"
   height="8"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-382-1761788125775"
   style="cursor: pointer;"
   id="rect63" />
    <path
   d="M 247.24347826086955,389.05 L 253.24347826086955,389.05"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-383-1761788125775"
   style="cursor: pointer;"
   id="path63">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <rect
   x="290.1565217391304"
   y="385.05"
   width="12"
   height="8"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-384-1761788125775"
   style="cursor: pointer;"
   id="rect64" />
    <path
   d="M 293.1565217391304,389.05 L 299.1565217391304,389.05"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-385-1761788125775"
   style="cursor: pointer;"
   id="path64">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
</g>
<g
   id="g1465"
   data-element-id="element-386-1761788125775"
   style="cursor: pointer;"><g
     clip-path="url(#clipId0)"
     fill="rgb(255,255,255)"
     stroke="rgb(255,255,255)"
     stroke-width="0.25"
     fill-opacity="0.498039"
     stroke-opacity="0.498039"
     id="g230"
     data-element-id="element-387-1761788125775"
     style="cursor: pointer;">

</g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g231"
   data-element-id="element-389-1761788125775"
   style="cursor: pointer;">

</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="1"
   id="g244"
   data-element-id="element-391-1761788125775"
   style="cursor: pointer;">
<path
   d="M255.189,483.579 253.653,475.987 255.189,468.394 z"
   id="path231"
   data-element-id="element-392-1761788125775"
   style="cursor: pointer;" />
<path
   d="M255.189,483.579 255.189,468.394 259.379,489.778 z"
   id="path232"
   data-element-id="element-393-1761788125775"
   style="cursor: pointer;" />
<path
   d="M259.379,489.778 255.189,468.394 259.379,462.195 z"
   id="path233"
   data-element-id="element-394-1761788125775"
   style="cursor: pointer;" />
<path
   d="M259.379,489.778 259.379,462.195 265.593,493.957 z"
   id="path234"
   data-element-id="element-395-1761788125775"
   style="cursor: pointer;" />
<path
   d="M265.593,493.957 259.379,462.195 265.593,458.017 z"
   id="path235"
   data-element-id="element-396-1761788125775"
   style="cursor: pointer;" />
<path
   d="M265.593,493.957 265.593,458.017 273.203,495.489 z"
   id="path236"
   data-element-id="element-397-1761788125775"
   style="cursor: pointer;" />
<path
   d="M273.203,495.489 265.593,458.017 273.203,456.485 z"
   id="path237"
   data-element-id="element-398-1761788125775"
   style="cursor: pointer;" />
<path
   d="M273.203,495.489 273.203,456.485 280.813,493.957 z"
   id="path238"
   data-element-id="element-399-1761788125775"
   style="cursor: pointer;" />
<path
   d="M280.813,493.957 273.203,456.485 280.813,458.017 z"
   id="path239"
   data-element-id="element-400-1761788125775"
   style="cursor: pointer;"
   class="" />
<path
   d="M280.813,493.957 280.813,458.017 287.027,489.778 z"
   id="path240"
   data-element-id="element-401-1761788125775"
   style="cursor: pointer;"
   class="" />
<path
   d="M287.027,489.778 280.813,458.017 287.027,462.195 z"
   id="path241"
   data-element-id="element-402-1761788125775"
   style="cursor: pointer;"
   class="" />
<path
   d="M287.027,489.778 287.027,462.195 291.216,483.579 z"
   id="path242"
   data-element-id="element-403-1761788125775"
   style="cursor: pointer;" />
<path
   d="M291.216,483.579 287.027,462.195 291.216,468.394 z"
   id="path243"
   data-element-id="element-404-1761788125775"
   style="cursor: pointer;" />
<path
   d="M291.216,483.579 291.216,468.394 292.752,475.987 z"
   id="path244"
   data-element-id="element-405-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="LT_Pump_2"
   clip-path="url(#clipId0)"
   data-element-id="element-406-1761788125775"
   style="cursor: pointer;">
    <circle
   cx="273.2"
   cy="475.99"
   r="16.956521739130437"
   fill="#06b6d4"
   stroke="none"
   opacity="0.9"
   data-element-id="element-407-1761788125775"
   style="cursor: pointer;"
   class=""
   id="circle83">
        <animate
   attributeName="opacity"
   values="0.8;1;0.8"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="273.2"
   cy="475.99"
   r="13.565217391304351"
   fill="#0891b2"
   stroke="none"
   data-element-id="element-408-1761788125775"
   style="cursor: pointer;"
   class=""
   id="circle84" />
    <g
   class="impeller-LT_Pump_2"
   data-element-id="element-409-1761788125775"
   style="cursor: pointer;"
   id="g86">
        <circle
   cx="273.2"
   cy="475.99"
   r="10.682608695652176"
   fill="#0e7490"
   stroke="none"
   data-element-id="element-410-1761788125775"
   style="cursor: pointer;"
   class=""
   id="circle85" />
        <path
   d="M 273.2,465.30739130434785 L 275.5739130434782,470.22478260869565 L 273.2,475.99 Z"
   fill="#06b6d4"
   data-element-id="element-411-1761788125775"
   style="cursor: pointer;"
   id="path66" />
        <path
   d="M 283.88260869565215,475.99 L 277.9478260869565,478.36391304347825 L 273.2,475.99 Z"
   fill="#06b6d4"
   data-element-id="element-412-1761788125775"
   style="cursor: pointer;"
   id="path67" />
        <path
   d="M 273.2,486.6726086956522 L 270.82608695652175,480.73782608695655 L 273.2,475.99 Z"
   fill="#06b6d4"
   data-element-id="element-413-1761788125775"
   style="cursor: pointer;"
   id="path68" />
        <path
   d="M 262.5173913043478,475.99 L 268.45217391304345,473.61608695652177 L 273.2,475.99 Z"
   fill="#06b6d4"
   data-element-id="element-414-1761788125775"
   style="cursor: pointer;"
   id="path70" />
    </g>
    <circle
   cx="273.2"
   cy="475.99"
   r="3.900000000000001"
   fill="#fbbf24"
   data-element-id="element-415-1761788125775"
   style="cursor: pointer;"
   id="circle86">
        <animate
   attributeName="r"
   values="3.900000000000001;4.917391304347826;3.900000000000001"
   dur="1s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="273.2"
   cy="475.99"
   r="1.8652173913043482"
   fill="#f59e0b"
   stroke="none"
   data-element-id="element-416-1761788125775"
   style="cursor: pointer;"
   id="circle87" />
    <rect
   x="244.24347826086955"
   y="471.99"
   width="12"
   height="8"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-417-1761788125775"
   style="cursor: pointer;"
   id="rect81" />
    <path
   d="M 247.24347826086955,475.99 L 253.24347826086955,475.99"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-418-1761788125775"
   style="cursor: pointer;"
   id="path81">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <rect
   x="290.1565217391304"
   y="471.99"
   width="12"
   height="8"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-419-1761788125775"
   style="cursor: pointer;"
   id="rect76" />
    <path
   d="M 293.1565217391304,475.99 L 299.1565217391304,475.99"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-420-1761788125775"
   style="cursor: pointer;"
   id="path76">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g246"
   data-element-id="element-421-1761788125775"
   style="cursor: pointer;">

</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g247"
   data-element-id="element-423-1761788125775"
   style="cursor: pointer;">

</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="1"
   id="g260"
   data-element-id="element-425-1761788125775"
   style="cursor: pointer;">
<path
   d="M255.189,570.531 253.653,562.921 255.189,555.311 z"
   id="path247"
   data-element-id="element-426-1761788125775"
   style="cursor: pointer;" />
<path
   d="M255.189,570.531 255.189,555.311 259.379,576.745 z"
   id="path248"
   data-element-id="element-427-1761788125775"
   style="cursor: pointer;" />
<path
   d="M259.379,576.745 255.189,555.311 259.379,549.097 z"
   id="path249"
   data-element-id="element-428-1761788125775"
   style="cursor: pointer;" />
<path
   d="M259.379,576.745 259.379,549.097 265.593,580.934 z"
   id="path250"
   data-element-id="element-429-1761788125775"
   style="cursor: pointer;" />
<path
   d="M265.593,580.934 259.379,549.097 265.593,544.908 z"
   id="path251"
   data-element-id="element-430-1761788125775"
   style="cursor: pointer;" />
<path
   d="M265.593,580.934 265.593,544.908 273.203,582.471 z"
   id="path252"
   data-element-id="element-431-1761788125775"
   style="cursor: pointer;" />
<path
   d="M273.203,582.471 265.593,544.908 273.203,543.371 z"
   id="path253"
   data-element-id="element-432-1761788125775"
   style="cursor: pointer;" />
<path
   d="M273.203,582.471 273.203,543.371 280.813,580.934 z"
   id="path254"
   data-element-id="element-433-1761788125775"
   style="cursor: pointer;" />
<path
   d="M280.813,580.934 273.203,543.371 280.813,544.908 z"
   id="path255"
   data-element-id="element-434-1761788125775"
   style="cursor: pointer;"
   class="" />
<path
   d="M280.813,580.934 280.813,544.908 287.027,576.745 z"
   id="path256"
   data-element-id="element-435-1761788125775"
   style="cursor: pointer;" />
<path
   d="M287.027,576.745 280.813,544.908 287.027,549.097 z"
   id="path257"
   data-element-id="element-436-1761788125775"
   style="cursor: pointer;" />
<path
   d="M287.027,576.745 287.027,549.097 291.216,570.531 z"
   id="path258"
   data-element-id="element-437-1761788125775"
   style="cursor: pointer;" />
<path
   d="M291.216,570.531 287.027,549.097 291.216,555.311 z"
   id="path259"
   data-element-id="element-438-1761788125775"
   style="cursor: pointer;" />
<path
   d="M291.216,570.531 291.216,555.311 292.752,562.921 z"
   id="path260"
   data-element-id="element-439-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="LT_Pump_3"
   clip-path="url(#clipId0)"
   data-element-id="element-440-1761788125775"
   style="cursor: pointer;">
    <circle
   cx="273.2"
   cy="562.92"
   r="16.956521739130437"
   fill="#06b6d4"
   stroke="none"
   opacity="0.9"
   data-element-id="element-441-1761788125775"
   style="cursor: pointer;"
   id="circle88">
        <animate
   attributeName="opacity"
   values="0.8;1;0.8"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="273.2"
   cy="562.92"
   r="13.565217391304351"
   fill="#0891b2"
   stroke="none"
   data-element-id="element-442-1761788125775"
   style="cursor: pointer;"
   id="circle89" />
    <g
   class="impeller-LT_Pump_3"
   data-element-id="element-443-1761788125775"
   style="cursor: pointer;"
   id="g83">
        <circle
   cx="273.2"
   cy="562.92"
   r="10.682608695652176"
   fill="#0e7490"
   stroke="none"
   data-element-id="element-444-1761788125775"
   style="cursor: pointer;"
   id="circle90" />
        <path
   d="M 273.2,552.2373913043477 L 275.5739130434782,557.1547826086957 L 273.2,562.92 Z"
   fill="#06b6d4"
   data-element-id="element-445-1761788125775"
   style="cursor: pointer;"
   id="path84" />
        <path
   d="M 283.88260869565215,562.92 L 277.9478260869565,565.2939130434783 L 273.2,562.92 Z"
   fill="#06b6d4"
   data-element-id="element-446-1761788125775"
   style="cursor: pointer;"
   id="path85" />
        <path
   d="M 273.2,573.6026086956522 L 270.82608695652175,567.6678260869564 L 273.2,562.92 Z"
   fill="#06b6d4"
   data-element-id="element-447-1761788125775"
   style="cursor: pointer;"
   id="path82" />
        <path
   d="M 262.5173913043478,562.92 L 268.45217391304345,560.5460869565217 L 273.2,562.92 Z"
   fill="#06b6d4"
   data-element-id="element-448-1761788125775"
   style="cursor: pointer;"
   id="path83" />
    </g>
    <circle
   cx="273.2"
   cy="562.92"
   r="3.900000000000001"
   fill="#fbbf24"
   data-element-id="element-449-1761788125775"
   style="cursor: pointer;"
   id="circle91">
        <animate
   attributeName="r"
   values="3.900000000000001;4.917391304347826;3.900000000000001"
   dur="1s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="273.2"
   cy="562.92"
   r="1.8652173913043482"
   fill="#f59e0b"
   stroke="none"
   data-element-id="element-450-1761788125775"
   style="cursor: pointer;"
   id="circle92" />
    <rect
   x="244.24347826086955"
   y="558.92"
   width="12"
   height="8"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-451-1761788125775"
   style="cursor: pointer;"
   id="rect84" />
    <path
   d="M 247.24347826086955,562.92 L 253.24347826086955,562.92"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-452-1761788125775"
   style="cursor: pointer;"
   id="path86">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <rect
   x="290.1565217391304"
   y="558.92"
   width="12"
   height="8"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-453-1761788125775"
   style="cursor: pointer;"
   id="rect85" />
    <path
   d="M 293.1565217391304,562.92 L 299.1565217391304,562.92"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-454-1761788125775"
   style="cursor: pointer;"
   id="path87">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g262"
   data-element-id="element-455-1761788125775"
   style="cursor: pointer;">

</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g263"
   data-element-id="element-457-1761788125775"
   style="cursor: pointer;">

</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,0,0)"
   stroke-width="0.7"
   id="g264"
   data-element-id="element-459-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="297.569,161.163 297.569,177.219 "
   id="polyline263"
   data-element-id="element-460-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="297.663,145.014 297.663,131.036 348.095,131.036 "
   id="polyline264"
   data-element-id="element-461-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ff0000"
   stroke-width="0.53"
   id="g278"
   data-element-id="element-477-1761788125775"
   transform="translate(8,-6)">
<g
   transform="translate(288.347,159.06)"
   id="g12">
<circle
   cx="0"
   cy="0"
   r="12"
   fill="#ecf0f1"
   stroke="#95a5a6"
   stroke-width="1.5"
   id="circle93" />
<rect
   x="-3"
   y="-8"
   width="6"
   height="10"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   rx="1"
   id="rect12" />
<circle
   cx="0"
   cy="4"
   r="3.5"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   id="circle94">
<animate
   attributeName="r"
   values="3.5;4.2;3.5"
   dur="2s"
   repeatCount="indefinite" />
</circle>
</g>
</g>
<text
   transform="scale(1.0015139,0.99848839)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0631px"
   id="text278"
   data-element-id="element-480-1761788125775"
   style="fill:#ffffff;stroke:#ff0000;stroke-width:0;fill-opacity:1"
   x="317.86581"
   y="144.218">TX4</text><text
   transform="scale(1.0004556,0.9995446)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0514px"
   id="text279"
   data-element-id="element-481-1761788125775"
   style="fill:#ffffff;stroke:#ff0000;stroke-width:0;fill-opacity:1"
   x="349.81961"
   y="129.80711">To ESS for</text><text
   transform="scale(0.99914111,1.0008596)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0369px"
   id="text280"
   data-element-id="element-482-1761788125775"
   style="fill:#ffffff;stroke:#ff0000;stroke-width:0;fill-opacity:1"
   x="350.38995"
   y="142.8452">F.W Pump Control</text><text
   transform="scale(0.99914113,1.0008596)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0369px"
   id="text280-4"
   data-element-id="element-482-1761788125775"
   style="fill:#ffffff;fill-opacity:1;stroke:#ff0000;stroke-width:0"
   x="467.84015"
   y="475.98264">S.W Pump Control</text>


<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,80)"
   stroke-width="0.7"
   id="g281"
   data-element-id="element-483-1761788125775"
   style="cursor: pointer;">
<polyline
   points="408.822,250.128 452.596,250.128 "
   id="polyline280"
   data-element-id="element-484-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g283"
   data-element-id="element-488-1761788125775"
   style="cursor: pointer;">
<path
   d="M343.09,472.351 348.568,476.128 343.09,479.906 343.09,479.906 z"
   id="path282"
   data-element-id="element-489-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g285"
   data-element-id="element-492-1761788125775"
   style="cursor: pointer;">
<path
   d="M354.14,479.906 348.568,476.128 354.14,472.351 354.14,472.351 z"
   id="path284"
   data-element-id="element-493-1761788125775"
   style="cursor: pointer;" />
</g>



<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g288"
   data-element-id="element-498-1761788125775"
   style="cursor: pointer;">
<path
   d="M343.09,559.049 348.568,562.827 343.09,566.604 343.09,566.604 z"
   id="path287"
   data-element-id="element-499-1761788125775"
   style="cursor: pointer;" />
</g>



<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g290"
   data-element-id="element-502-1761788125775"
   style="cursor: pointer;">
<path
   d="M354.14,566.604 348.568,562.827 354.14,559.049 354.14,559.049 z"
   id="path289"
   data-element-id="element-503-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="g153"
   transform="translate(0,4)"><g
     transform="matrix(0.32,0,0,0.26,330.66,454.81)"
     id="g25"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect13" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect14"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect20"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect22" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect23"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse23" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse24" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line24" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line25" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle25" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse25"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect25" /></g></g><g
   id="g155"
   transform="translate(0,4)"><g
     transform="matrix(0.32,0,0,0.26,330.66,541.56)"
     id="g32"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect26" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect27"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect28"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect29" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect30"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse30" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse31" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line31" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line32" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle32" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse32"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect32" /></g></g>


<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g293"
   data-element-id="element-508-1761788125775"
   style="cursor: pointer;">
<path
   d="M218.237,384.992 223.809,388.817 218.237,392.642 218.237,392.642 z"
   id="path292"
   data-element-id="element-509-1761788125775"
   style="cursor: pointer;" />
</g>



<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g295"
   data-element-id="element-512-1761788125775"
   style="cursor: pointer;">
<path
   d="M229.287,392.642 223.809,388.817 229.287,384.992 229.287,384.992 z"
   id="path294"
   data-element-id="element-513-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="g146"
   transform="translate(0,2)"><g
     transform="matrix(0.32,0,0,0.26,204.562,369.153)"
     id="g119">











<rect
   x="40"
   y="50"
   width="40"
   height="40"
   rx="4"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2.5"
   id="rect104" />
<rect
   x="42"
   y="52"
   width="36"
   height="8"
   fill="rgba(255,255,255,0.4)"
   id="rect105"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="42"
   y="80"
   width="36"
   height="8"
   fill="rgba(0,0,0,0.15)"
   id="rect106"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="52"
   y="30"
   width="16"
   height="22"
   rx="2"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2"
   id="rect107" />
<ellipse
   cx="60"
   cy="20"
   rx="20"
   ry="9"
   fill="#20b2aa"
   stroke="#006666"
   stroke-width="2.5"
   id="ellipse107" />
<ellipse
   cx="60"
   cy="17"
   rx="18"
   ry="7"
   fill="#008b8b"
   id="ellipse108" />
<line
   x1="42"
   y1="17"
   x2="78"
   y2="17"
   stroke="#004d4d"
   stroke-width="3"
   id="line108" />
<line
   x1="60"
   y1="9"
   x2="60"
   y2="25"
   stroke="#004d4d"
   stroke-width="3"
   id="line109" />
<circle
   cx="60"
   cy="17"
   r="4"
   fill="#008b8b"
   id="circle109" />
<ellipse
   cx="60"
   cy="14"
   rx="10"
   ry="3"
   fill="rgba(255,255,255,0.5)"
   id="ellipse109"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="57"
   y="24"
   width="6"
   height="8"
   fill="#a8a8a8"
   stroke="#707070"
   stroke-width="1"
   id="rect109" />
<path
   d="M 70,70 H 50 m 5,-6 -5,6 5,6"
   stroke="#008b8b"
   stroke-width="3"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill="none"
   id="path119">
<animate
   attributeName="opacity"
   values="0.5;1;0.5"
   dur="2s"
   repeatCount="indefinite" />
<animate
   attributeName="stroke-width"
   values="2.5;3.5;2.5"
   dur="2s"
   repeatCount="indefinite" />
</path></g></g>


<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g298"
   data-element-id="element-518-1761788125775"
   style="cursor: pointer;">
<path
   d="M218.237,472.351 223.809,476.128 218.237,479.906 218.237,479.906 z"
   id="path297"
   data-element-id="element-519-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g300"
   data-element-id="element-522-1761788125775"
   style="cursor: pointer;">
<path
   d="M229.287,479.906 223.809,476.128 229.287,472.351 229.287,472.351 z"
   id="path299"
   data-element-id="element-523-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="g148"
   transform="translate(0,2)"><g
     transform="matrix(0.32,0,0,0.26,204.562,456.418)"
     id="g140">











<rect
   x="40"
   y="50"
   width="40"
   height="40"
   rx="4"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2.5"
   id="rect128" />
<rect
   x="42"
   y="52"
   width="36"
   height="8"
   fill="rgba(255,255,255,0.4)"
   id="rect129"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="42"
   y="80"
   width="36"
   height="8"
   fill="rgba(0,0,0,0.15)"
   id="rect130"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="52"
   y="30"
   width="16"
   height="22"
   rx="2"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2"
   id="rect131" />
<ellipse
   cx="60"
   cy="20"
   rx="20"
   ry="9"
   fill="#20b2aa"
   stroke="#006666"
   stroke-width="2.5"
   id="ellipse131" />
<ellipse
   cx="60"
   cy="17"
   rx="18"
   ry="7"
   fill="#008b8b"
   id="ellipse132" />
<line
   x1="42"
   y1="17"
   x2="78"
   y2="17"
   stroke="#004d4d"
   stroke-width="3"
   id="line132" />
<line
   x1="60"
   y1="9"
   x2="60"
   y2="25"
   stroke="#004d4d"
   stroke-width="3"
   id="line133" />
<circle
   cx="60"
   cy="17"
   r="4"
   fill="#008b8b"
   id="circle133" />
<ellipse
   cx="60"
   cy="14"
   rx="10"
   ry="3"
   fill="rgba(255,255,255,0.5)"
   id="ellipse133"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="57"
   y="24"
   width="6"
   height="8"
   fill="#a8a8a8"
   stroke="#707070"
   stroke-width="1"
   id="rect133" />
<path
   d="M 70,70 H 50 m 5,-6 -5,6 5,6"
   stroke="#008b8b"
   stroke-width="3"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill="none"
   id="path133">
<animate
   attributeName="opacity"
   values="0.5;1;0.5"
   dur="2s"
   repeatCount="indefinite" />
<animate
   attributeName="stroke-width"
   values="2.5;3.5;2.5"
   dur="2s"
   repeatCount="indefinite" />
</path></g></g>


<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g303"
   data-element-id="element-528-1761788125775"
   style="cursor: pointer;">
<path
   d="M218.237,559.049 223.809,562.827 218.237,566.604 218.237,566.604 z"
   id="path302"
   data-element-id="element-529-1761788125775"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g305"
   data-element-id="element-532-1761788125775"
   style="cursor: pointer;">
<path
   d="M229.287,566.604 223.809,562.827 229.287,559.049 229.287,559.049 z"
   id="path304"
   data-element-id="element-533-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   id="g170"
   transform="translate(0,2)"><g
     transform="matrix(0.32,0,0,0.26,204.562,543.163)"
     id="g169">











<rect
   x="40"
   y="50"
   width="40"
   height="40"
   rx="4"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2.5"
   id="rect149" />
<rect
   x="42"
   y="52"
   width="36"
   height="8"
   fill="rgba(255,255,255,0.4)"
   id="rect150"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="42"
   y="80"
   width="36"
   height="8"
   fill="rgba(0,0,0,0.15)"
   id="rect151"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="52"
   y="30"
   width="16"
   height="22"
   rx="2"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2"
   id="rect152" />
<ellipse
   cx="60"
   cy="20"
   rx="20"
   ry="9"
   fill="#20b2aa"
   stroke="#006666"
   stroke-width="2.5"
   id="ellipse152" />
<ellipse
   cx="60"
   cy="17"
   rx="18"
   ry="7"
   fill="#008b8b"
   id="ellipse153" />
<line
   x1="42"
   y1="17"
   x2="78"
   y2="17"
   stroke="#004d4d"
   stroke-width="3"
   id="line153" />
<line
   x1="60"
   y1="9"
   x2="60"
   y2="25"
   stroke="#004d4d"
   stroke-width="3"
   id="line154" />
<circle
   cx="60"
   cy="17"
   r="4"
   fill="#008b8b"
   id="circle154" />
<ellipse
   cx="60"
   cy="14"
   rx="10"
   ry="3"
   fill="rgba(255,255,255,0.5)"
   id="ellipse154"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="57"
   y="24"
   width="6"
   height="8"
   fill="#a8a8a8"
   stroke="#707070"
   stroke-width="1"
   id="rect154" />
<path
   d="M 70,70 H 50 m 5,-6 -5,6 5,6"
   stroke="#008b8b"
   stroke-width="3"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill="none"
   id="path165">
<animate
   attributeName="opacity"
   values="0.5;1;0.5"
   dur="2s"
   repeatCount="indefinite" />
<animate
   attributeName="stroke-width"
   values="2.5;3.5;2.5"
   dur="2s"
   repeatCount="indefinite" />
</path></g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.7"
   id="g307"
   data-element-id="element-536-1761788125775"
   style="cursor: pointer;">
<polyline
   points="261.492,264.483 183.105,264.483 183.105,432.591 "
   id="polyline306"
   data-element-id="element-537-1761788125775"
   style="cursor: pointer;" />
<polyline
   points="183.199,475.751 183.199,455.54 "
   id="polyline307"
   data-element-id="element-538-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.53"
   id="g308"
   data-element-id="element-539-1761788125775"
   style="cursor: pointer;">
<polyline
   points="171.583,444.065 172.463,439.71 174.862,436.153 178.419,433.754 182.774,432.874 187.129,433.754 190.687,436.153 193.086,439.71 193.966,444.065 193.086,448.42 190.687,451.978 187.129,454.377 182.774,455.257 178.419,454.377 174.862,451.978 172.463,448.42 171.583,444.065 "
   id="polyline308"
   data-element-id="element-540-1761788125775"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0"
   id="g309"
   data-element-id="element-541-1761788125775"
   style="cursor: pointer;">
<text
   transform="matrix(7.90168 0 -0 7.84489 176.622 448.452)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text308"
   data-element-id="element-542-1761788125775"
   style="cursor: pointer;">TC</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ffffff"
   stroke-width="0.7"
   id="g310"
   data-element-id="element-543-1761788125775"
   transform="matrix(0.98363197,0,0,1.0000326,4.3444586,-0.01149266)"
   style="stroke-width:0.70578861;stroke-dasharray:none">
<polyline
   points="309.563,264.483 393.333,264.483 393.333,440.618 "
   id="polyline309"
   data-element-id="element-544-1761788125775"
   style="stroke-width:0.70578861;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#00b050"
   stroke-width="0.7"
   id="g311"
   data-element-id="element-545-1761788125775"
   transform="matrix(0.86393664,0,0,1.0002426,55.727348,-0.08520935)"
   style="stroke-width:1.61360652;stroke-dasharray:none">
<polyline
   points="400.133,452.801 409.388,452.801 409.388,249.656 "
   id="polyline310"
   data-element-id="element-546-1761788125775"
   style="stroke-width:1.61360652;stroke-dasharray:none" />
</g>









<polyline
   points="412.694,323.038 452.596,323.038 "
   id="polyline330"
   data-element-id="element-577-1761788125775"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none" /><polyline
   points="410.05,394.625 452.596,394.625 "
   id="polyline331"
   data-element-id="element-578-1761788125776"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none" /><polyline
   points="404.572,323.274 405.859,320.434 408.963,319.26 412.068,320.434 413.355,323.274 "
   id="polyline332"
   data-element-id="element-579-1761788125776"
   style="fill:none;stroke:#00b050;stroke-width:1.5;stroke-dasharray:none" /><polyline
   points="375.389,323.038 405.233,323.038 "
   id="polyline333"
   data-element-id="element-580-1761788125776"
   style="fill:none;stroke:#00b050;stroke-width:1.424346;stroke-dasharray:none"
   transform="matrix(1.109051,0,0,1,-44.229247,0)" />



















<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,80)"
   stroke-width="0.7"
   id="g351"
   data-element-id="element-612-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none">
<polyline
   points="134.467,178.635 134.467,213.862 "
   id="polyline349"
   data-element-id="element-613-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
<polyline
   points="134.797,212.918 137.637,214.205 138.811,217.309 137.637,220.414 134.797,221.701 "
   id="polyline350"
   data-element-id="element-614-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
<polyline
   points="58.3465,342.682 131.445,342.682 "
   id="polyline351"
   data-element-id="element-615-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,176,80)"
   stroke="rgb(0,176,80)"
   stroke-width="1"
   id="g461"
   data-element-id="element-616-1761788125776"
   style="cursor: pointer;">
<path
   d="M106.418,305.023 106.418,303.842 107.858,305.023 z"
   id="path351"
   data-element-id="element-617-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.858,305.023 106.418,303.842 107.858,303.842 z"
   id="path352"
   data-element-id="element-618-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.07,307.542 107.858,307.486 108.07,306.675 z"
   id="path353"
   data-element-id="element-619-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.858,305.023 107.858,303.842 108.07,305.023 z"
   id="path354"
   data-element-id="element-620-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.07,305.023 107.858,303.842 108.07,303.842 z"
   id="path355"
   data-element-id="element-621-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.07,302.189 107.858,301.379 108.07,301.323 z"
   id="path356"
   data-element-id="element-622-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.07,307.542 108.07,306.675 108.661,307.699 z"
   id="path357"
   data-element-id="element-623-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.661,307.699 108.07,306.675 108.661,306.331 z"
   id="path358"
   data-element-id="element-624-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.07,305.023 108.07,303.842 108.661,305.023 z"
   id="path359"
   data-element-id="element-625-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.661,305.023 108.07,303.842 108.661,303.842 z"
   id="path360"
   data-element-id="element-626-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.07,302.189 108.07,301.323 108.661,302.534 z"
   id="path361"
   data-element-id="element-627-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.661,302.534 108.07,301.323 108.661,301.166 z"
   id="path362"
   data-element-id="element-628-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.661,307.699 108.661,306.331 110.904,306.389 z"
   id="path363"
   data-element-id="element-629-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.904,306.389 108.661,306.331 110.904,305.023 z"
   id="path364"
   data-element-id="element-630-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.661,305.023 108.661,303.842 110.904,305.023 z"
   id="path365"
   data-element-id="element-631-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.904,305.023 108.661,303.842 110.904,303.842 z"
   id="path366"
   data-element-id="element-632-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.661,302.534 108.661,301.166 110.904,303.842 z"
   id="path367"
   data-element-id="element-633-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.904,303.842 108.661,301.166 110.904,302.475 z"
   id="path368"
   data-element-id="element-634-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.904,306.389 110.904,305.023 111.915,305.799 z"
   id="path369"
   data-element-id="element-635-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.915,305.799 110.904,305.023 111.915,305.023 z"
   id="path370"
   data-element-id="element-636-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.904,305.023 110.904,303.842 111.915,304.432 z"
   id="path371"
   data-element-id="element-637-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.904,303.842 110.904,302.475 111.915,303.842 z"
   id="path372"
   data-element-id="element-638-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.915,303.842 110.904,302.475 111.915,303.066 z"
   id="path373"
   data-element-id="element-639-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.915,305.799 111.915,305.023 112.792,305.287 z"
   id="path374"
   data-element-id="element-640-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.792,305.287 111.915,305.023 112.792,305.023 z"
   id="path375"
   data-element-id="element-641-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.792,304.944 111.915,304.432 112.792,303.921 z"
   id="path376"
   data-element-id="element-642-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.915,303.842 111.915,303.066 112.792,303.842 z"
   id="path377"
   data-element-id="element-643-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.792,303.842 111.915,303.066 112.792,303.578 z"
   id="path378"
   data-element-id="element-644-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.792,305.287 112.792,305.023 113.091,305.112 z"
   id="path379"
   data-element-id="element-645-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.091,305.112 112.792,305.023 113.091,305.023 z"
   id="path380"
   data-element-id="element-646-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.792,303.842 112.792,303.578 113.091,303.842 z"
   id="path381"
   data-element-id="element-647-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.091,303.842 112.792,303.578 113.091,303.753 z"
   id="path382"
   data-element-id="element-648-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.091,305.112 113.091,303.753 114.256,304.432 z"
   id="path383"
   data-element-id="element-649-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.527,217.848 107.362,217.168 108.527,216.488 z"
   id="path384"
   data-element-id="element-650-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.527,217.848 108.527,217.758 108.826,218.022 z"
   id="path385"
   data-element-id="element-651-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,218.022 108.527,217.758 108.826,217.758 z"
   id="path386"
   data-element-id="element-652-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.527,216.577 108.527,216.488 108.826,216.577 z"
   id="path387"
   data-element-id="element-653-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,216.577 108.527,216.488 108.826,216.313 z"
   id="path388"
   data-element-id="element-654-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,218.022 108.826,217.758 109.703,218.534 z"
   id="path389"
   data-element-id="element-655-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,218.534 108.826,217.758 109.703,217.758 z"
   id="path390"
   data-element-id="element-656-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,217.679 108.826,216.656 109.703,217.168 z"
   id="path391"
   data-element-id="element-657-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,216.577 108.826,216.313 109.703,216.577 z"
   id="path392"
   data-element-id="element-658-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,216.577 108.826,216.313 109.703,215.801 z"
   id="path393"
   data-element-id="element-659-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,218.534 109.703,217.758 110.715,219.125 z"
   id="path394"
   data-element-id="element-660-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,219.125 109.703,217.758 110.715,217.758 z"
   id="path395"
   data-element-id="element-661-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,217.758 109.703,217.168 110.715,216.577 z"
   id="path396"
   data-element-id="element-662-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,216.577 109.703,215.801 110.715,216.577 z"
   id="path397"
   data-element-id="element-663-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,216.577 109.703,215.801 110.715,215.211 z"
   id="path398"
   data-element-id="element-664-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,219.125 110.715,217.758 110.715,219.125 z"
   id="path399"
   data-element-id="element-665-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,219.125 110.715,217.758 110.715,217.758 z"
   id="path400"
   data-element-id="element-666-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,217.758 110.715,216.577 110.715,217.758 z"
   id="path401"
   data-element-id="element-667-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,217.758 110.715,216.577 110.715,216.577 z"
   id="path402"
   data-element-id="element-668-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,216.577 110.715,215.211 110.715,216.577 z"
   id="path403"
   data-element-id="element-669-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,216.577 110.715,215.211 110.715,215.211 z"
   id="path404"
   data-element-id="element-670-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,219.125 110.715,217.758 112.958,220.434 z"
   id="path405"
   data-element-id="element-671-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,220.434 110.715,217.758 112.958,219.066 z"
   id="path406"
   data-element-id="element-672-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,217.758 110.715,216.577 112.958,217.758 z"
   id="path407"
   data-element-id="element-673-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,217.758 110.715,216.577 112.958,216.577 z"
   id="path408"
   data-element-id="element-674-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,216.577 110.715,215.211 112.958,215.269 z"
   id="path409"
   data-element-id="element-675-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,215.269 110.715,215.211 112.958,213.902 z"
   id="path410"
   data-element-id="element-676-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,220.434 112.958,219.066 113.548,220.278 z"
   id="path411"
   data-element-id="element-677-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,220.278 112.958,219.066 113.548,219.411 z"
   id="path412"
   data-element-id="element-678-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,217.758 112.958,216.577 113.548,217.758 z"
   id="path413"
   data-element-id="element-679-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,217.758 112.958,216.577 113.548,216.577 z"
   id="path414"
   data-element-id="element-680-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,215.269 112.958,213.902 113.548,214.925 z"
   id="path415"
   data-element-id="element-681-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,214.925 112.958,213.902 113.548,214.058 z"
   id="path416"
   data-element-id="element-682-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,220.278 113.548,219.411 113.76,220.221 z"
   id="path417"
   data-element-id="element-683-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,217.758 113.548,216.577 113.76,217.758 z"
   id="path418"
   data-element-id="element-684-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.76,217.758 113.548,216.577 113.76,216.577 z"
   id="path419"
   data-element-id="element-685-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,214.925 113.548,214.058 113.76,214.114 z"
   id="path420"
   data-element-id="element-686-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.76,217.758 113.76,216.577 114.917,217.758 z"
   id="path421"
   data-element-id="element-687-1761788125776"
   style="cursor: pointer;" />
<path
   d="M114.917,217.758 113.76,216.577 114.917,216.577 z"
   id="path422"
   data-element-id="element-688-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.362,437.809 107.362,436.628 108.519,437.809 z"
   id="path423"
   data-element-id="element-689-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.519,437.809 107.362,436.628 108.519,436.628 z"
   id="path424"
   data-element-id="element-690-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.731,440.328 108.519,440.272 108.731,439.461 z"
   id="path425"
   data-element-id="element-691-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.519,437.809 108.519,436.628 108.731,437.809 z"
   id="path426"
   data-element-id="element-692-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.731,437.809 108.519,436.628 108.731,436.628 z"
   id="path427"
   data-element-id="element-693-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.731,434.975 108.519,434.165 108.731,434.108 z"
   id="path428"
   data-element-id="element-694-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.731,440.328 108.731,439.461 109.322,440.484 z"
   id="path429"
   data-element-id="element-695-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.322,440.484 108.731,439.461 109.322,439.117 z"
   id="path430"
   data-element-id="element-696-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.731,437.809 108.731,436.628 109.322,437.809 z"
   id="path431"
   data-element-id="element-697-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.322,437.809 108.731,436.628 109.322,436.628 z"
   id="path432"
   data-element-id="element-698-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.731,434.975 108.731,434.108 109.322,435.32 z"
   id="path433"
   data-element-id="element-699-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.322,435.32 108.731,434.108 109.322,433.952 z"
   id="path434"
   data-element-id="element-700-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.322,440.484 109.322,439.117 111.565,439.175 z"
   id="path435"
   data-element-id="element-701-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,439.175 109.322,439.117 111.565,437.809 z"
   id="path436"
   data-element-id="element-702-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.322,437.809 109.322,436.628 111.565,437.809 z"
   id="path437"
   data-element-id="element-703-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,437.809 109.322,436.628 111.565,436.628 z"
   id="path438"
   data-element-id="element-704-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.322,435.32 109.322,433.952 111.565,436.628 z"
   id="path439"
   data-element-id="element-705-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,436.628 109.322,433.952 111.565,435.261 z"
   id="path440"
   data-element-id="element-706-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,439.175 111.565,437.809 111.565,439.175 z"
   id="path441"
   data-element-id="element-707-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,439.175 111.565,437.809 111.565,437.809 z"
   id="path442"
   data-element-id="element-708-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,437.809 111.565,436.628 111.565,437.809 z"
   id="path443"
   data-element-id="element-709-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,437.809 111.565,436.628 111.565,436.628 z"
   id="path444"
   data-element-id="element-710-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,436.628 111.565,435.261 111.565,436.628 z"
   id="path445"
   data-element-id="element-711-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,436.628 111.565,435.261 111.565,435.261 z"
   id="path446"
   data-element-id="element-712-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,439.175 111.565,437.809 112.577,438.585 z"
   id="path447"
   data-element-id="element-713-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.577,438.585 111.565,437.809 112.577,437.809 z"
   id="path448"
   data-element-id="element-714-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,437.809 111.565,436.628 112.577,437.218 z"
   id="path449"
   data-element-id="element-715-1761788125776"
   style="cursor: pointer;" />
<path
   d="M111.565,436.628 111.565,435.261 112.577,436.628 z"
   id="path450"
   data-element-id="element-716-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.577,436.628 111.565,435.261 112.577,435.852 z"
   id="path451"
   data-element-id="element-717-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.577,438.585 112.577,437.809 113.454,438.073 z"
   id="path452"
   data-element-id="element-718-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.454,438.073 112.577,437.809 113.454,437.809 z"
   id="path453"
   data-element-id="element-719-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.454,437.73 112.577,437.218 113.454,436.707 z"
   id="path454"
   data-element-id="element-720-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.577,436.628 112.577,435.852 113.454,436.628 z"
   id="path455"
   data-element-id="element-721-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.454,436.628 112.577,435.852 113.454,436.364 z"
   id="path456"
   data-element-id="element-722-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.454,438.073 113.454,437.809 113.753,437.898 z"
   id="path457"
   data-element-id="element-723-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.753,437.898 113.454,437.809 113.753,437.809 z"
   id="path458"
   data-element-id="element-724-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.454,436.628 113.454,436.364 113.753,436.628 z"
   id="path459"
   data-element-id="element-725-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.753,436.628 113.454,436.364 113.753,436.538 z"
   id="path460"
   data-element-id="element-726-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.753,437.898 113.753,436.538 114.917,437.218 z"
   id="path461"
   data-element-id="element-727-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(192,0,0)"
   stroke="rgb(192,0,0)"
   stroke-width="0"
   id="g464"
   data-element-id="element-728-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">
<text
   transform="matrix(7.85822 0 -0 7.84489 58.3613 321.745)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text461"
   data-element-id="element-729-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">To/From G/E</text>
<text
   transform="matrix(7.84277 0 -0 7.84489 58.4707 333.707)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text462"
   data-element-id="element-730-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">C.F.W. System</text>
<text
   transform="matrix(7.85415 0 -0 7.84489 58.3613 454.453)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text463"
   data-element-id="element-731-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">To/From M/E</text>
<text
   transform="matrix(7.84342 0 -0 7.8583 58.472 466.414)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text464"
   data-element-id="element-732-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">C.F.W. System</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ffffff"
   stroke-width="0.7"
   id="g465"
   data-element-id="element-733-1761788125776"
   transform="matrix(1,0,0,0.91928317,0,38.479571)">
<polyline
   points="167.805,519.1 167.805,477.073 "
   id="polyline464"
   data-element-id="element-734-1761788125776" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.53"
   id="g479"
   data-element-id="element-750-1761788125776"
   style="cursor: pointer;">
<polyline
   points="156.566,527.363 157.449,523.008 159.857,519.451 163.429,517.052 167.805,516.172 172.181,517.052 175.753,519.451 178.161,523.008 179.044,527.363 178.161,531.718 175.753,535.276 172.181,537.675 167.805,538.555 163.429,537.675 159.857,535.276 157.449,531.718 156.566,527.363 "
   id="polyline478"
   data-element-id="element-751-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0"
   id="g480"
   data-element-id="element-752-1761788125776"
   style="cursor: pointer;">
<text
   transform="matrix(7.86315 0 -0 7.8583 161.202 531.724)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text479"
   data-element-id="element-753-1761788125776"
   style="cursor: pointer;">PX</text>
</g>



<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g484"
   data-element-id="element-761-1761788125776"
   style="cursor: pointer;">
<path
   d="M164.122,508.333 167.9,502.761 171.677,508.333 171.677,508.333 z"
   id="path483"
   data-element-id="element-762-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   id="g267"
   style="stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1"><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(255,255,255)"
     stroke-width="0.53"
     id="g481"
     data-element-id="element-754-1761788125776"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="167.522,502.856 174.416,502.856 "
   id="polyline480"
   data-element-id="element-755-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
<polyline
   points="174.605,499.078 174.605,506.633 "
   id="polyline481"
   data-element-id="element-756-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g483"
     data-element-id="element-759-1761788125776"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="171.677,497.284 167.9,502.761 164.122,497.284 171.677,497.284 "
   id="polyline482"
   data-element-id="element-760-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g485"
     data-element-id="element-763-1761788125776"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="164.122,508.333 167.9,502.761 171.677,508.333 164.122,508.333 "
   id="polyline484"
   data-element-id="element-764-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g></g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.53"
   id="g499"
   data-element-id="element-780-1761788125776"
   style="cursor: pointer;">
<polyline
   points="151.844,572.224 153.117,565.918 156.587,560.769 161.735,557.299 168.041,556.027 174.347,557.299 179.495,560.769 182.966,565.918 184.238,572.224 182.966,578.529 179.495,583.678 174.347,587.148 168.041,588.42 161.735,587.148 156.587,583.678 153.117,578.529 151.844,572.224 "
   id="polyline498"
   data-element-id="element-781-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0"
   id="g500"
   data-element-id="element-782-1761788125776"
   style="cursor: pointer;">
<text
   transform="matrix(7.86132 0 -0 7.84489 163.034 569.973)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text499"
   data-element-id="element-783-1761788125776"
   style="cursor: pointer;">PI</text>
<text
   transform="matrix(7.84248 0 -0 7.84489 160.39 583.197)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text500"
   data-element-id="element-784-1761788125776"
   style="cursor: pointer;">MC</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g501"
   data-element-id="element-785-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="151.844,572.271 184.277,572.271 "
   id="polyline500"
   data-element-id="element-786-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.7"
   id="g502"
   data-element-id="element-787-1761788125776"
   style="cursor: pointer;">
<polyline
   points="167.805,556.688 167.805,538.555 "
   id="polyline501"
   data-element-id="element-788-1761788125776"
   style="cursor: pointer;" />
</g>





<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,240)"
   stroke-width="0.7"
   id="g508"
   data-element-id="element-800-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none">
<polyline
   points="622.922,322.707 624.209,319.868 627.314,318.693 630.419,319.868 631.706,322.707 "
   id="polyline507"
   data-element-id="element-801-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,176,80)"
   stroke="rgb(0,176,80)"
   stroke-width="1"
   id="g585"
   data-element-id="element-802-1761788125776"
   style="cursor: pointer;">
<path
   d="M253.936,178.376 253.936,177.195 255.471,178.376 z"
   id="path508"
   data-element-id="element-803-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.471,178.376 253.936,177.195 255.471,177.195 z"
   id="path509"
   data-element-id="element-804-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.684,180.895 255.471,180.839 255.684,180.028 z"
   id="path510"
   data-element-id="element-805-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.471,178.376 255.471,177.195 255.684,178.376 z"
   id="path511"
   data-element-id="element-806-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.684,178.376 255.471,177.195 255.684,177.195 z"
   id="path512"
   data-element-id="element-807-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.684,175.542 255.471,174.732 255.684,174.675 z"
   id="path513"
   data-element-id="element-808-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.684,180.895 255.684,180.028 256.274,181.051 z"
   id="path514"
   data-element-id="element-809-1761788125776"
   style="cursor: pointer;" />
<path
   d="M256.274,181.051 255.684,180.028 256.274,179.684 z"
   id="path515"
   data-element-id="element-810-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.684,178.376 255.684,177.195 256.274,178.376 z"
   id="path516"
   data-element-id="element-811-1761788125776"
   style="cursor: pointer;" />
<path
   d="M256.274,178.376 255.684,177.195 256.274,177.195 z"
   id="path517"
   data-element-id="element-812-1761788125776"
   style="cursor: pointer;" />
<path
   d="M255.684,175.542 255.684,174.675 256.274,175.887 z"
   id="path518"
   data-element-id="element-813-1761788125776"
   style="cursor: pointer;" />
<path
   d="M256.274,175.887 255.684,174.675 256.274,174.519 z"
   id="path519"
   data-element-id="element-814-1761788125776"
   style="cursor: pointer;" />
<path
   d="M256.274,181.051 256.274,179.684 258.517,179.742 z"
   id="path520"
   data-element-id="element-815-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,179.742 256.274,179.684 258.517,178.376 z"
   id="path521"
   data-element-id="element-816-1761788125776"
   style="cursor: pointer;" />
<path
   d="M256.274,178.376 256.274,177.195 258.517,178.376 z"
   id="path522"
   data-element-id="element-817-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,178.376 256.274,177.195 258.517,177.195 z"
   id="path523"
   data-element-id="element-818-1761788125776"
   style="cursor: pointer;" />
<path
   d="M256.274,175.887 256.274,174.519 258.517,177.195 z"
   id="path524"
   data-element-id="element-819-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,177.195 256.274,174.519 258.517,175.828 z"
   id="path525"
   data-element-id="element-820-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,179.742 258.517,178.376 258.517,179.742 z"
   id="path526"
   data-element-id="element-821-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,179.742 258.517,178.376 258.517,178.376 z"
   id="path527"
   data-element-id="element-822-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,178.376 258.517,177.195 258.517,178.376 z"
   id="path528"
   data-element-id="element-823-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,178.376 258.517,177.195 258.517,177.195 z"
   id="path529"
   data-element-id="element-824-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,177.195 258.517,175.828 258.517,177.195 z"
   id="path530"
   data-element-id="element-825-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,177.195 258.517,175.828 258.517,175.828 z"
   id="path531"
   data-element-id="element-826-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,179.742 258.517,178.376 259.529,179.152 z"
   id="path532"
   data-element-id="element-827-1761788125776"
   style="cursor: pointer;" />
<path
   d="M259.529,179.152 258.517,178.376 259.529,178.376 z"
   id="path533"
   data-element-id="element-828-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,178.376 258.517,177.195 259.529,177.785 z"
   id="path534"
   data-element-id="element-829-1761788125776"
   style="cursor: pointer;" />
<path
   d="M258.517,177.195 258.517,175.828 259.529,177.195 z"
   id="path535"
   data-element-id="element-830-1761788125776"
   style="cursor: pointer;" />
<path
   d="M259.529,177.195 258.517,175.828 259.529,176.419 z"
   id="path536"
   data-element-id="element-831-1761788125776"
   style="cursor: pointer;" />
<path
   d="M259.529,179.152 259.529,178.376 260.406,178.64 z"
   id="path537"
   data-element-id="element-832-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.406,178.64 259.529,178.376 260.406,178.376 z"
   id="path538"
   data-element-id="element-833-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.406,178.297 259.529,177.785 260.406,177.274 z"
   id="path539"
   data-element-id="element-834-1761788125776"
   style="cursor: pointer;" />
<path
   d="M259.529,177.195 259.529,176.419 260.406,177.195 z"
   id="path540"
   data-element-id="element-835-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.406,177.195 259.529,176.419 260.406,176.931 z"
   id="path541"
   data-element-id="element-836-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.406,178.64 260.406,178.376 260.705,178.465 z"
   id="path542"
   data-element-id="element-837-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.705,178.465 260.406,178.376 260.705,178.376 z"
   id="path543"
   data-element-id="element-838-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.406,177.195 260.406,176.931 260.705,177.195 z"
   id="path544"
   data-element-id="element-839-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.705,177.195 260.406,176.931 260.705,177.105 z"
   id="path545"
   data-element-id="element-840-1761788125776"
   style="cursor: pointer;" />
<path
   d="M260.705,178.465 260.705,177.105 261.87,177.785 z"
   id="path546"
   data-element-id="element-841-1761788125776"
   style="cursor: pointer;" />
<path
   d="M393.05,178.376 393.05,177.195 394.585,178.376 z"
   id="path547"
   data-element-id="element-842-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.585,178.376 393.05,177.195 394.585,177.195 z"
   id="path548"
   data-element-id="element-843-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.797,180.895 394.585,180.839 394.797,180.028 z"
   id="path549"
   data-element-id="element-844-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.585,178.376 394.585,177.195 394.797,178.376 z"
   id="path550"
   data-element-id="element-845-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.797,178.376 394.585,177.195 394.797,177.195 z"
   id="path551"
   data-element-id="element-846-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.797,175.542 394.585,174.732 394.797,174.675 z"
   id="path552"
   data-element-id="element-847-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.797,180.895 394.797,180.028 395.387,181.051 z"
   id="path553"
   data-element-id="element-848-1761788125776"
   style="cursor: pointer;" />
<path
   d="M395.387,181.051 394.797,180.028 395.387,179.684 z"
   id="path554"
   data-element-id="element-849-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.797,178.376 394.797,177.195 395.387,178.376 z"
   id="path555"
   data-element-id="element-850-1761788125776"
   style="cursor: pointer;" />
<path
   d="M395.387,178.376 394.797,177.195 395.387,177.195 z"
   id="path556"
   data-element-id="element-851-1761788125776"
   style="cursor: pointer;" />
<path
   d="M394.797,175.542 394.797,174.675 395.387,175.887 z"
   id="path557"
   data-element-id="element-852-1761788125776"
   style="cursor: pointer;" />
<path
   d="M395.387,175.887 394.797,174.675 395.387,174.519 z"
   id="path558"
   data-element-id="element-853-1761788125776"
   style="cursor: pointer;" />
<path
   d="M395.387,181.051 395.387,179.684 397.63,179.742 z"
   id="path559"
   data-element-id="element-854-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,179.742 395.387,179.684 397.63,178.376 z"
   id="path560"
   data-element-id="element-855-1761788125776"
   style="cursor: pointer;" />
<path
   d="M395.387,178.376 395.387,177.195 397.63,178.376 z"
   id="path561"
   data-element-id="element-856-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,178.376 395.387,177.195 397.63,177.195 z"
   id="path562"
   data-element-id="element-857-1761788125776"
   style="cursor: pointer;" />
<path
   d="M395.387,175.887 395.387,174.519 397.63,177.195 z"
   id="path563"
   data-element-id="element-858-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,177.195 395.387,174.519 397.63,175.828 z"
   id="path564"
   data-element-id="element-859-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,179.742 397.63,178.376 397.63,179.742 z"
   id="path565"
   data-element-id="element-860-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,179.742 397.63,178.376 397.63,178.376 z"
   id="path566"
   data-element-id="element-861-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,178.376 397.63,177.195 397.63,178.376 z"
   id="path567"
   data-element-id="element-862-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,178.376 397.63,177.195 397.63,177.195 z"
   id="path568"
   data-element-id="element-863-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,177.195 397.63,175.828 397.63,177.195 z"
   id="path569"
   data-element-id="element-864-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,177.195 397.63,175.828 397.63,175.828 z"
   id="path570"
   data-element-id="element-865-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,179.742 397.63,178.376 398.642,179.152 z"
   id="path571"
   data-element-id="element-866-1761788125776"
   style="cursor: pointer;" />
<path
   d="M398.642,179.152 397.63,178.376 398.642,178.376 z"
   id="path572"
   data-element-id="element-867-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,178.376 397.63,177.195 398.642,177.785 z"
   id="path573"
   data-element-id="element-868-1761788125776"
   style="cursor: pointer;" />
<path
   d="M397.63,177.195 397.63,175.828 398.642,177.195 z"
   id="path574"
   data-element-id="element-869-1761788125776"
   style="cursor: pointer;" />
<path
   d="M398.642,177.195 397.63,175.828 398.642,176.419 z"
   id="path575"
   data-element-id="element-870-1761788125776"
   style="cursor: pointer;" />
<path
   d="M398.642,179.152 398.642,178.376 399.519,178.64 z"
   id="path576"
   data-element-id="element-871-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.519,178.64 398.642,178.376 399.519,178.376 z"
   id="path577"
   data-element-id="element-872-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.519,178.297 398.642,177.785 399.519,177.274 z"
   id="path578"
   data-element-id="element-873-1761788125776"
   style="cursor: pointer;" />
<path
   d="M398.642,177.195 398.642,176.419 399.519,177.195 z"
   id="path579"
   data-element-id="element-874-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.519,177.195 398.642,176.419 399.519,176.931 z"
   id="path580"
   data-element-id="element-875-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.519,178.64 399.519,178.376 399.81,178.47 z"
   id="path581"
   data-element-id="element-876-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.81,178.47 399.519,178.376 399.81,178.376 z"
   id="path582"
   data-element-id="element-877-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.519,177.195 399.519,176.931 399.81,177.195 z"
   id="path583"
   data-element-id="element-878-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.81,177.195 399.519,176.931 399.81,177.101 z"
   id="path584"
   data-element-id="element-879-1761788125776"
   style="cursor: pointer;" />
<path
   d="M399.81,178.47 399.81,177.101 400.983,177.785 z"
   id="path585"
   data-element-id="element-880-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="#00b0f0"
   stroke="#00b0f0"
   stroke-width="1"
   id="g847"
   data-element-id="element-881-1761788125776"
   transform="matrix(0.98374974,0,0,1.0005545,16.365737,-0.10076363)">
<path
   d="m 577.53996,178.376 v -1.181 l 1.441,1.181 z"
   id="path586"
   data-element-id="element-882-1761788125776" />
<path
   d="m 578.98096,178.376 -1.441,-1.181 h 1.441 z"
   id="path587"
   data-element-id="element-883-1761788125776" />
<path
   d="m 579.19296,180.895 -0.212,-0.056 0.212,-0.811 z"
   id="path588"
   data-element-id="element-884-1761788125776" />
<path
   d="m 581.014,178.376 v -1.181 l 0.212,1.181 z"
   id="path589"
   data-element-id="element-885-1761788125776" />
<path
   d="m 579.19296,178.376 -0.212,-1.181 h 0.212 z"
   id="path590"
   data-element-id="element-886-1761788125776" />
<path
   d="m 579.19296,175.542 -0.212,-0.81 0.212,-0.057 z"
   id="path591"
   data-element-id="element-887-1761788125776" />
<path
   d="m 579.19296,180.895 v -0.867 l 0.59,1.023 z"
   id="path592"
   data-element-id="element-888-1761788125776" />
<path
   d="m 579.78296,181.051 -0.59,-1.023 0.59,-0.344 z"
   id="path593"
   data-element-id="element-889-1761788125776" />
<path
   d="m 581.226,178.376 v -1.181 l 0.59,1.181 z"
   id="path594"
   data-element-id="element-890-1761788125776" />
<path
   d="m 579.78296,178.376 -0.59,-1.181 h 0.59 z"
   id="path595"
   data-element-id="element-891-1761788125776" />
<path
   d="m 579.19296,175.542 v -0.867 l 0.59,1.212 z"
   id="path596"
   data-element-id="element-892-1761788125776" />
<path
   d="m 579.78296,175.887 -0.59,-1.212 0.59,-0.156 z"
   id="path597"
   data-element-id="element-893-1761788125776" />
<path
   d="m 579.78296,181.051 v -1.367 l 2.243,0.058 z"
   id="path598"
   data-element-id="element-894-1761788125776" />
<path
   d="m 582.02596,179.742 -2.243,-0.058 2.243,-1.308 z"
   id="path599"
   data-element-id="element-895-1761788125776" />
<path
   d="m 579.78296,178.376 v -1.181 l 2.243,1.181 z"
   id="path600"
   data-element-id="element-896-1761788125776" />
<path
   d="m 582.02596,178.376 -2.243,-1.181 h 2.243 z"
   id="path601"
   data-element-id="element-897-1761788125776" />
<path
   d="m 579.78296,175.887 v -1.368 l 2.243,2.676 z"
   id="path602"
   data-element-id="element-898-1761788125776" />
<path
   d="m 582.02596,177.195 -2.243,-2.676 2.243,1.309 z"
   id="path603"
   data-element-id="element-899-1761788125776" />
<path
   d="m 579.99292,179.742 v -1.366 l 10e-4,1.366 z"
   id="path604"
   data-element-id="element-900-1761788125776" />
<path
   d="m 582.02696,179.742 -10e-4,-1.366 h 10e-4 z"
   id="path605"
   data-element-id="element-901-1761788125776" />
<path
   d="m 579.99292,178.376 v -1.181 l 10e-4,1.181 z"
   id="path606"
   data-element-id="element-902-1761788125776" />
<path
   d="m 579.99392,178.376 -10e-4,-1.181 h 10e-4 z"
   id="path607"
   data-element-id="element-903-1761788125776" />
<path
   d="m 579.99292,177.195 v -1.367 l 10e-4,1.367 z"
   id="path608"
   data-element-id="element-904-1761788125776" />
<path
   d="m 579.99392,177.195 -10e-4,-1.367 h 10e-4 z"
   id="path609"
   data-element-id="element-905-1761788125776" />
<path
   d="m 582.02696,179.742 v -1.366 l 1.011,0.776 z"
   id="path610"
   data-element-id="element-906-1761788125776" />
<path
   d="m 583.03796,179.152 -1.011,-0.776 h 1.011 z"
   id="path611"
   data-element-id="element-907-1761788125776" />
<path
   d="m 579.99392,178.376 v -1.181 l 1.011,0.59 z"
   id="path612"
   data-element-id="element-908-1761788125776" />
<path
   d="m 582.02696,177.195 v -1.367 l 1.011,1.367 z"
   id="path613"
   data-element-id="element-909-1761788125776" />
<path
   d="m 583.03796,177.195 -1.011,-1.367 1.011,0.591 z"
   id="path614"
   data-element-id="element-910-1761788125776" />
<path
   d="m 583.03796,179.152 v -0.776 l 0.877,0.264 z"
   id="path615"
   data-element-id="element-911-1761788125776" />
<path
   d="m 583.91496,178.64 -0.877,-0.264 h 0.877 z"
   id="path616"
   data-element-id="element-912-1761788125776" />
<path
   d="m 583.91496,178.297 -0.877,-0.512 0.877,-0.511 z"
   id="path617"
   data-element-id="element-913-1761788125776" />
<path
   d="m 583.03796,177.195 v -0.776 l 0.877,0.776 z"
   id="path618"
   data-element-id="element-914-1761788125776" />
<path
   d="m 583.91496,177.195 -0.877,-0.776 0.877,0.512 z"
   id="path619"
   data-element-id="element-915-1761788125776" />
<path
   d="m 583.91496,178.64 v -0.264 l 0.292,0.094 z"
   id="path620"
   data-element-id="element-916-1761788125776" />
<path
   d="m 584.20696,178.47 -0.292,-0.094 h 0.292 z"
   id="path621"
   data-element-id="element-917-1761788125776" />
<path
   d="m 581.88192,177.195 v -0.264 l 0.292,0.264 z"
   id="path622"
   data-element-id="element-918-1761788125776" />
<path
   d="m 584.20696,177.195 -0.292,-0.264 0.292,0.17 z"
   id="path623"
   data-element-id="element-919-1761788125776" />
<path
   d="m 584.20696,178.47 v -1.369 l 1.172,0.684 z"
   id="path624"
   data-element-id="element-920-1761788125776" />
<path
   d="m 752.875,178.376 v -1.181 l 1.44,1.181 z"
   id="path625"
   data-element-id="element-921-1761788125776" />
<path
   d="m 754.315,178.376 -1.44,-1.181 h 1.44 z"
   id="path626"
   data-element-id="element-922-1761788125776" />
<path
   d="m 754.528,180.895 -0.213,-0.056 0.213,-0.811 z"
   id="path627"
   data-element-id="element-923-1761788125776" />
<path
   d="m 754.315,178.376 v -1.181 l 0.213,1.181 z"
   id="path628"
   data-element-id="element-924-1761788125776" />
<path
   d="m 754.528,178.376 -0.213,-1.181 h 0.213 z"
   id="path629"
   data-element-id="element-925-1761788125776" />
<path
   d="m 754.528,175.542 -0.213,-0.81 0.213,-0.057 z"
   id="path630"
   data-element-id="element-926-1761788125776" />
<path
   d="m 754.528,180.895 v -0.867 l 0.59,1.023 z"
   id="path631"
   data-element-id="element-927-1761788125776" />
<path
   d="m 755.118,181.051 -0.59,-1.023 0.59,-0.344 z"
   id="path632"
   data-element-id="element-928-1761788125776" />
<path
   d="m 754.528,178.376 v -1.181 l 0.59,1.181 z"
   id="path633"
   data-element-id="element-929-1761788125776" />
<path
   d="m 755.118,178.376 -0.59,-1.181 h 0.59 z"
   id="path634"
   data-element-id="element-930-1761788125776" />
<path
   d="m 754.528,175.542 v -0.867 l 0.59,1.212 z"
   id="path635"
   data-element-id="element-931-1761788125776" />
<path
   d="m 755.118,175.887 -0.59,-1.212 0.59,-0.156 z"
   id="path636"
   data-element-id="element-932-1761788125776" />
<path
   d="m 755.118,181.051 v -1.367 l 2.243,0.058 z"
   id="path637"
   data-element-id="element-933-1761788125776" />
<path
   d="m 757.361,179.742 -2.243,-0.058 2.243,-1.308 z"
   id="path638"
   data-element-id="element-934-1761788125776" />
<path
   d="m 755.118,178.376 v -1.181 l 2.243,1.181 z"
   id="path639"
   data-element-id="element-935-1761788125776" />
<path
   d="m 757.361,178.376 -2.243,-1.181 h 2.243 z"
   id="path640"
   data-element-id="element-936-1761788125776" />
<path
   d="m 755.118,175.887 v -1.368 l 2.243,2.676 z"
   id="path641"
   data-element-id="element-937-1761788125776" />
<path
   d="m 757.361,177.195 -2.243,-2.676 2.243,1.309 z"
   id="path642"
   data-element-id="element-938-1761788125776" />
<path
   d="m 757.361,179.742 v -1.366 z"
   id="path643"
   data-element-id="element-939-1761788125776" />
<path
   d="m 757.361,179.742 v -1.366 0 z"
   id="path644"
   data-element-id="element-940-1761788125776" />
<path
   d="m 757.361,178.376 v -1.181 z"
   id="path645"
   data-element-id="element-941-1761788125776" />
<path
   d="m 757.361,178.376 v -1.181 0 z"
   id="path646"
   data-element-id="element-942-1761788125776" />
<path
   d="m 757.361,177.195 v -1.367 z"
   id="path647"
   data-element-id="element-943-1761788125776" />
<path
   d="m 757.361,177.195 v -1.367 0 z"
   id="path648"
   data-element-id="element-944-1761788125776" />
<path
   d="m 757.361,179.742 v -1.366 l 1.012,0.776 z"
   id="path649"
   data-element-id="element-945-1761788125776" />
<path
   d="m 758.373,179.152 -1.012,-0.776 h 1.012 z"
   id="path650"
   data-element-id="element-946-1761788125776" />
<path
   d="m 757.361,178.376 v -1.181 l 1.012,0.59 z"
   id="path651"
   data-element-id="element-947-1761788125776" />
<path
   d="m 757.361,177.195 v -1.367 l 1.012,1.367 z"
   id="path652"
   data-element-id="element-948-1761788125776" />
<path
   d="m 758.373,177.195 -1.012,-1.367 1.012,0.591 z"
   id="path653"
   data-element-id="element-949-1761788125776" />
<path
   d="m 758.373,179.152 v -0.776 l 0.877,0.264 z"
   id="path654"
   data-element-id="element-950-1761788125776" />
<path
   d="m 759.25,178.64 -0.877,-0.264 h 0.877 z"
   id="path655"
   data-element-id="element-951-1761788125776" />
<path
   d="m 759.25,178.297 -0.877,-0.512 0.877,-0.511 z"
   id="path656"
   data-element-id="element-952-1761788125776" />
<path
   d="m 758.373,177.195 v -0.776 l 0.877,0.776 z"
   id="path657"
   data-element-id="element-953-1761788125776" />
<path
   d="m 759.25,177.195 -0.877,-0.776 0.877,0.512 z"
   id="path658"
   data-element-id="element-954-1761788125776" />
<path
   d="m 759.25,178.64 v -0.264 l 0.291,0.094 z"
   id="path659"
   data-element-id="element-955-1761788125776" />
<path
   d="m 759.541,178.47 -0.291,-0.094 h 0.291 z"
   id="path660"
   data-element-id="element-956-1761788125776" />
<path
   d="m 759.25,177.195 v -0.264 l 0.291,0.264 z"
   id="path661"
   data-element-id="element-957-1761788125776" />
<path
   d="m 759.541,177.195 -0.291,-0.264 0.291,0.17 z"
   id="path662"
   data-element-id="element-958-1761788125776" />
<path
   d="m 759.541,178.47 v -1.369 l 1.173,0.684 z"
   id="path663"
   data-element-id="element-959-1761788125776" />
<path
   d="m 576.016,250.336 -1.165,-0.68 1.165,-0.68 z"
   id="path664"
   data-element-id="element-960-1761788125776" />
<path
   d="m 576.016,250.336 v -0.09 l 0.299,0.264 z"
   id="path665"
   data-element-id="element-961-1761788125776" />
<path
   d="m 576.315,250.51 -0.299,-0.264 h 0.299 z"
   id="path666"
   data-element-id="element-962-1761788125776" />
<path
   d="m 576.016,249.066 v -0.09 l 0.299,0.09 z"
   id="path667"
   data-element-id="element-963-1761788125776" />
<path
   d="m 576.315,249.066 -0.299,-0.09 0.299,-0.175 z"
   id="path668"
   data-element-id="element-964-1761788125776" />
<path
   d="m 576.315,250.51 v -0.264 l 0.877,0.776 z"
   id="path669"
   data-element-id="element-965-1761788125776" />
<path
   d="m 577.192,251.022 -0.877,-0.776 h 0.877 z"
   id="path670"
   data-element-id="element-966-1761788125776" />
<path
   d="m 576.315,250.167 v -1.023 l 0.877,0.512 z"
   id="path671"
   data-element-id="element-967-1761788125776" />
<path
   d="m 576.315,249.066 v -0.265 l 0.877,0.265 z"
   id="path672"
   data-element-id="element-968-1761788125776" />
<path
   d="m 577.192,249.066 -0.877,-0.265 0.877,-0.511 z"
   id="path673"
   data-element-id="element-969-1761788125776" />
<path
   d="m 577.192,251.022 v -0.776 l 1.012,1.367 z"
   id="path674"
   data-element-id="element-970-1761788125776" />
<path
   d="m 578.204,251.613 -1.012,-1.367 h 1.012 z"
   id="path675"
   data-element-id="element-971-1761788125776" />
<path
   d="m 578.204,250.246 -1.012,-0.59 1.012,-0.59 z"
   id="path676"
   data-element-id="element-972-1761788125776" />
<path
   d="m 577.192,249.066 v -0.776 l 1.012,0.776 z"
   id="path677"
   data-element-id="element-973-1761788125776" />
<path
   d="m 578.204,249.066 -1.012,-0.776 1.012,-0.591 z"
   id="path678"
   data-element-id="element-974-1761788125776" />
<path
   d="m 578.204,251.613 v -1.367 z"
   id="path679"
   data-element-id="element-975-1761788125776" />
<path
   d="m 578.204,251.613 v -1.367 0 z"
   id="path680"
   data-element-id="element-976-1761788125776" />
<path
   d="m 578.204,250.246 v -1.18 z"
   id="path681"
   data-element-id="element-977-1761788125776" />
<path
   d="m 578.204,250.246 v -1.18 0 z"
   id="path682"
   data-element-id="element-978-1761788125776" />
<path
   d="m 578.204,249.066 v -1.367 z"
   id="path683"
   data-element-id="element-979-1761788125776" />
<path
   d="m 578.204,249.066 v -1.367 0 z"
   id="path684"
   data-element-id="element-980-1761788125776" />
<path
   d="m 578.204,251.613 v -1.367 l 2.243,2.676 z"
   id="path685"
   data-element-id="element-981-1761788125776" />
<path
   d="m 580.447,252.922 -2.243,-2.676 2.243,1.309 z"
   id="path686"
   data-element-id="element-982-1761788125776" />
<path
   d="m 578.204,250.246 v -1.18 l 2.243,1.18 z"
   id="path687"
   data-element-id="element-983-1761788125776" />
<path
   d="m 580.447,250.246 -2.243,-1.18 h 2.243 z"
   id="path688"
   data-element-id="element-984-1761788125776" />
<path
   d="m 578.204,249.066 v -1.367 l 2.243,0.058 z"
   id="path689"
   data-element-id="element-985-1761788125776" />
<path
   d="m 580.447,247.757 -2.243,-0.058 2.243,-1.309 z"
   id="path690"
   data-element-id="element-986-1761788125776" />
<path
   d="m 580.447,252.922 v -1.367 l 0.59,1.211 z"
   id="path691"
   data-element-id="element-987-1761788125776" />
<path
   d="m 581.037,252.766 -0.59,-1.211 0.59,0.344 z"
   id="path692"
   data-element-id="element-988-1761788125776" />
<path
   d="m 580.447,250.246 v -1.18 l 0.59,1.18 z"
   id="path693"
   data-element-id="element-989-1761788125776" />
<path
   d="m 581.037,250.246 -0.59,-1.18 h 0.59 z"
   id="path694"
   data-element-id="element-990-1761788125776" />
<path
   d="m 580.447,247.757 v -1.367 l 0.59,1.023 z"
   id="path695"
   data-element-id="element-991-1761788125776" />
<path
   d="m 581.037,247.413 -0.59,-1.023 0.59,0.156 z"
   id="path696"
   data-element-id="element-992-1761788125776" />
<path
   d="m 581.037,252.766 v -0.867 l 0.213,0.81 z"
   id="path697"
   data-element-id="element-993-1761788125776" />
<path
   d="m 581.037,250.246 v -1.18 l 0.213,1.18 z"
   id="path698"
   data-element-id="element-994-1761788125776" />
<path
   d="m 581.25,250.246 -0.213,-1.18 h 0.213 z"
   id="path699"
   data-element-id="element-995-1761788125776" />
<path
   d="m 581.037,247.413 v -0.867 l 0.213,0.056 z"
   id="path700"
   data-element-id="element-996-1761788125776" />
<path
   d="m 581.25,250.246 v -1.18 l 1.535,1.18 z"
   id="path701"
   data-element-id="element-997-1761788125776" />
<path
   d="m 582.785,250.246 -1.535,-1.18 h 1.535 z"
   id="path702"
   data-element-id="element-998-1761788125776" />
<path
   d="m 574.851,323.628 v -1.181 l 1.535,1.181 z"
   id="path703"
   data-element-id="element-999-1761788125776" />
<path
   d="m 576.386,323.628 -1.535,-1.181 h 1.535 z"
   id="path704"
   data-element-id="element-1000-1761788125776" />
<path
   d="m 576.599,326.147 -0.213,-0.056 0.213,-0.81 z"
   id="path705"
   data-element-id="element-1001-1761788125776" />
<path
   d="m 576.386,323.628 v -1.181 l 0.213,1.181 z"
   id="path706"
   data-element-id="element-1002-1761788125776" />
<path
   d="m 576.599,323.628 -0.213,-1.181 h 0.213 z"
   id="path707"
   data-element-id="element-1003-1761788125776" />
<path
   d="m 576.599,320.795 -0.213,-0.811 0.213,-0.056 z"
   id="path708"
   data-element-id="element-1004-1761788125776" />
<path
   d="m 576.599,326.147 v -0.866 l 0.59,1.023 z"
   id="path709"
   data-element-id="element-1005-1761788125776" />
<path
   d="m 577.189,326.304 -0.59,-1.023 0.59,-0.345 z"
   id="path710"
   data-element-id="element-1006-1761788125776" />
<path
   d="m 576.599,323.628 v -1.181 l 0.59,1.181 z"
   id="path711"
   data-element-id="element-1007-1761788125776" />
<path
   d="m 577.189,323.628 -0.59,-1.181 h 0.59 z"
   id="path712"
   data-element-id="element-1008-1761788125776" />
<path
   d="m 576.599,320.795 v -0.867 l 0.59,1.211 z"
   id="path713"
   data-element-id="element-1009-1761788125776" />
<path
   d="m 577.189,321.139 -0.59,-1.211 0.59,-0.157 z"
   id="path714"
   data-element-id="element-1010-1761788125776" />
<path
   d="m 577.189,326.304 v -1.368 l 2.243,0.058 z"
   id="path715"
   data-element-id="element-1011-1761788125776" />
<path
   d="m 579.432,324.994 -2.243,-0.058 2.243,-1.308 z"
   id="path716"
   data-element-id="element-1012-1761788125776" />
<path
   d="m 577.189,323.628 v -1.181 l 2.243,1.181 z"
   id="path717"
   data-element-id="element-1013-1761788125776" />
<path
   d="m 579.432,323.628 -2.243,-1.181 h 2.243 z"
   id="path718"
   data-element-id="element-1014-1761788125776" />
<path
   d="m 577.189,321.139 v -1.368 l 2.243,2.676 z"
   id="path719"
   data-element-id="element-1015-1761788125776" />
<path
   d="m 579.432,322.447 -2.243,-2.676 2.243,1.31 z"
   id="path720"
   data-element-id="element-1016-1761788125776" />
<path
   d="m 579.432,324.994 v -1.366 z"
   id="path721"
   data-element-id="element-1017-1761788125776" />
<path
   d="m 579.432,324.994 v -1.366 0 z"
   id="path722"
   data-element-id="element-1018-1761788125776" />
<path
   d="m 579.432,323.628 v -1.181 z"
   id="path723"
   data-element-id="element-1019-1761788125776" />
<path
   d="m 579.432,323.628 v -1.181 0 z"
   id="path724"
   data-element-id="element-1020-1761788125776" />
<path
   d="m 579.432,322.447 v -1.366 z"
   id="path725"
   data-element-id="element-1021-1761788125776" />
<path
   d="m 579.432,322.447 v -1.366 0 z"
   id="path726"
   data-element-id="element-1022-1761788125776" />
<path
   d="m 579.432,324.994 v -1.366 l 1.012,0.776 z"
   id="path727"
   data-element-id="element-1023-1761788125776" />
<path
   d="m 580.444,324.404 -1.012,-0.776 h 1.012 z"
   id="path728"
   data-element-id="element-1024-1761788125776" />
<path
   d="m 579.432,323.628 v -1.181 l 1.012,0.591 z"
   id="path729"
   data-element-id="element-1025-1761788125776" />
<path
   d="m 579.432,322.447 v -1.366 l 1.012,1.366 z"
   id="path730"
   data-element-id="element-1026-1761788125776" />
<path
   d="m 580.444,322.447 -1.012,-1.366 1.012,0.59 z"
   id="path731"
   data-element-id="element-1027-1761788125776" />
<path
   d="m 580.444,324.404 v -0.776 l 0.877,0.264 z"
   id="path732"
   data-element-id="element-1028-1761788125776" />
<path
   d="m 581.321,323.892 -0.877,-0.264 h 0.877 z"
   id="path733"
   data-element-id="element-1029-1761788125776" />
<path
   d="m 581.321,323.549 -0.877,-0.511 0.877,-0.512 z"
   id="path734"
   data-element-id="element-1030-1761788125776" />
<path
   d="m 580.444,322.447 v -0.776 l 0.877,0.776 z"
   id="path735"
   data-element-id="element-1031-1761788125776" />
<path
   d="m 581.321,322.447 -0.877,-0.776 0.877,0.512 z"
   id="path736"
   data-element-id="element-1032-1761788125776" />
<path
   d="m 581.321,323.892 v -0.264 l 0.299,0.089 z"
   id="path737"
   data-element-id="element-1033-1761788125776" />
<path
   d="m 581.62,323.717 -0.299,-0.089 h 0.299 z"
   id="path738"
   data-element-id="element-1034-1761788125776" />
<path
   d="m 581.321,322.447 v -0.264 l 0.299,0.264 z"
   id="path739"
   data-element-id="element-1035-1761788125776" />
<path
   d="m 581.62,322.447 -0.299,-0.264 0.299,0.175 z"
   id="path740"
   data-element-id="element-1036-1761788125776" />
<path
   d="m 581.62,323.717 v -1.359 l 1.165,0.68 z"
   id="path741"
   data-element-id="element-1037-1761788125776" />
<path
   d="m 576.106,394.569 -1.164,-0.68 1.164,-0.68 z"
   id="path742"
   data-element-id="element-1038-1761788125776" />
<path
   d="m 576.106,394.569 v -0.09 l 0.299,0.265 z"
   id="path743"
   data-element-id="element-1039-1761788125776" />
<path
   d="m 576.405,394.744 -0.299,-0.265 h 0.299 z"
   id="path744"
   data-element-id="element-1040-1761788125776" />
<path
   d="m 576.106,393.299 v -0.09 l 0.299,0.09 z"
   id="path745"
   data-element-id="element-1041-1761788125776" />
<path
   d="m 576.405,393.299 -0.299,-0.09 0.299,-0.174 z"
   id="path746"
   data-element-id="element-1042-1761788125776" />
<path
   d="m 576.405,394.744 v -0.265 l 0.877,0.776 z"
   id="path747"
   data-element-id="element-1043-1761788125776" />
<path
   d="m 577.282,395.255 -0.877,-0.776 h 0.877 z"
   id="path748"
   data-element-id="element-1044-1761788125776" />
<path
   d="m 576.405,394.401 v -1.023 l 0.877,0.511 z"
   id="path749"
   data-element-id="element-1045-1761788125776" />
<path
   d="m 576.405,393.299 v -0.264 l 0.877,0.264 z"
   id="path750"
   data-element-id="element-1046-1761788125776" />
<path
   d="m 577.282,393.299 -0.877,-0.264 0.877,-0.512 z"
   id="path751"
   data-element-id="element-1047-1761788125776" />
<path
   d="m 577.282,395.255 v -0.776 l 1.012,1.367 z"
   id="path752"
   data-element-id="element-1048-1761788125776" />
<path
   d="m 578.294,395.846 -1.012,-1.367 h 1.012 z"
   id="path753"
   data-element-id="element-1049-1761788125776" />
<path
   d="m 578.294,394.479 -1.012,-0.59 1.012,-0.59 z"
   id="path754"
   data-element-id="element-1050-1761788125776" />
<path
   d="m 577.282,393.299 v -0.776 l 1.012,0.776 z"
   id="path755"
   data-element-id="element-1051-1761788125776" />
<path
   d="m 578.294,393.299 -1.012,-0.776 1.012,-0.591 z"
   id="path756"
   data-element-id="element-1052-1761788125776" />
<path
   d="m 578.294,395.846 v -1.367 l 2.243,2.676 z"
   id="path757"
   data-element-id="element-1053-1761788125776" />
<path
   d="m 580.537,397.155 -2.243,-2.676 2.243,1.309 z"
   id="path758"
   data-element-id="element-1054-1761788125776" />
<path
   d="m 578.294,394.479 v -1.18 l 2.243,1.18 z"
   id="path759"
   data-element-id="element-1055-1761788125776" />
<path
   d="m 580.537,394.479 -2.243,-1.18 h 2.243 z"
   id="path760"
   data-element-id="element-1056-1761788125776" />
<path
   d="m 578.294,393.299 v -1.367 l 2.243,0.058 z"
   id="path761"
   data-element-id="element-1057-1761788125776" />
<path
   d="m 580.537,391.99 -2.243,-0.058 2.243,-1.309 z"
   id="path762"
   data-element-id="element-1058-1761788125776" />
<path
   d="m 580.537,397.155 v -1.367 l 0.591,1.211 z"
   id="path763"
   data-element-id="element-1059-1761788125776" />
<path
   d="m 581.128,396.999 -0.591,-1.211 0.591,0.344 z"
   id="path764"
   data-element-id="element-1060-1761788125776" />
<path
   d="m 580.537,394.479 v -1.18 l 0.591,1.18 z"
   id="path765"
   data-element-id="element-1061-1761788125776" />
<path
   d="m 581.128,394.479 -0.591,-1.18 h 0.591 z"
   id="path766"
   data-element-id="element-1062-1761788125776" />
<path
   d="m 580.537,391.99 v -1.367 l 0.591,1.023 z"
   id="path767"
   data-element-id="element-1063-1761788125776" />
<path
   d="m 581.128,391.646 -0.591,-1.023 0.591,0.156 z"
   id="path768"
   data-element-id="element-1064-1761788125776" />
<path
   d="m 581.128,396.999 v -0.867 l 0.212,0.811 z"
   id="path769"
   data-element-id="element-1065-1761788125776" />
<path
   d="m 581.128,394.479 v -1.18 l 0.212,1.18 z"
   id="path770"
   data-element-id="element-1066-1761788125776" />
<path
   d="m 581.34,394.479 -0.212,-1.18 h 0.212 z"
   id="path771"
   data-element-id="element-1067-1761788125776" />
<path
   d="m 581.128,391.646 v -0.867 l 0.212,0.057 z"
   id="path772"
   data-element-id="element-1068-1761788125776" />
<path
   d="m 581.34,394.479 v -1.18 l 1.535,1.18 z"
   id="path773"
   data-element-id="element-1069-1761788125776" />
<path
   d="m 582.875,394.479 -1.535,-1.18 h 1.535 z"
   id="path774"
   data-element-id="element-1070-1761788125776" />
<path
   d="m 695.391,339.489 -1.165,-0.68 1.165,-0.679 z"
   id="path775"
   data-element-id="element-1071-1761788125776" />
<path
   d="M 695.391,339.489 V 339.4 l 0.299,0.264 z"
   id="path776"
   data-element-id="element-1072-1761788125776" />
<path
   d="m 695.69,339.664 -0.299,-0.264 h 0.299 z"
   id="path777"
   data-element-id="element-1073-1761788125776" />
<path
   d="m 695.391,338.219 v -0.089 l 0.299,0.089 z"
   id="path778"
   data-element-id="element-1074-1761788125776" />
<path
   d="m 695.69,338.219 -0.299,-0.089 0.299,-0.175 z"
   id="path779"
   data-element-id="element-1075-1761788125776" />
<path
   d="M 695.69,339.664 V 339.4 l 0.877,0.776 z"
   id="path780"
   data-element-id="element-1076-1761788125776" />
<path
   d="M 696.567,340.176 695.69,339.4 h 0.877 z"
   id="path781"
   data-element-id="element-1077-1761788125776" />
<path
   d="m 695.69,339.321 v -1.023 l 0.877,0.511 z"
   id="path782"
   data-element-id="element-1078-1761788125776" />
<path
   d="m 695.69,338.219 v -0.264 l 0.877,0.264 z"
   id="path783"
   data-element-id="element-1079-1761788125776" />
<path
   d="m 696.567,338.219 -0.877,-0.264 0.877,-0.512 z"
   id="path784"
   data-element-id="element-1080-1761788125776" />
<path
   d="M 696.567,340.176 V 339.4 l 1.012,1.366 z"
   id="path785"
   data-element-id="element-1081-1761788125776" />
<path
   d="m 697.579,340.766 -1.012,-1.366 h 1.012 z"
   id="path786"
   data-element-id="element-1082-1761788125776" />
<path
   d="m 697.579,339.4 -1.012,-0.591 1.012,-0.59 z"
   id="path787"
   data-element-id="element-1083-1761788125776" />
<path
   d="m 696.567,338.219 v -0.776 l 1.012,0.776 z"
   id="path788"
   data-element-id="element-1084-1761788125776" />
<path
   d="m 697.579,338.219 -1.012,-0.776 1.012,-0.591 z"
   id="path789"
   data-element-id="element-1085-1761788125776" />
<path
   d="M 697.579,340.766 V 339.4 Z"
   id="path790"
   data-element-id="element-1086-1761788125776" />
<path
   d="m 697.579,340.766 v -1.366 0 z"
   id="path791"
   data-element-id="element-1087-1761788125776" />
<path
   d="m 697.579,339.4 v -1.181 z"
   id="path792"
   data-element-id="element-1088-1761788125776" />
<path
   d="m 697.579,339.4 v -1.181 0 z"
   id="path793"
   data-element-id="element-1089-1761788125776" />
<path
   d="m 697.579,338.219 v -1.367 z"
   id="path794"
   data-element-id="element-1090-1761788125776" />
<path
   d="m 697.579,338.219 v -1.367 0 z"
   id="path795"
   data-element-id="element-1091-1761788125776" />
<path
   d="M 697.579,340.766 V 339.4 l 2.243,2.676 z"
   id="path796"
   data-element-id="element-1092-1761788125776" />
<path
   d="m 699.822,342.076 -2.243,-2.676 2.243,1.308 z"
   id="path797"
   data-element-id="element-1093-1761788125776" />
<path
   d="m 697.579,339.4 v -1.181 l 2.243,1.181 z"
   id="path798"
   data-element-id="element-1094-1761788125776" />
<path
   d="m 699.822,339.4 -2.243,-1.181 h 2.243 z"
   id="path799"
   data-element-id="element-1095-1761788125776" />
<path
   d="m 697.579,338.219 v -1.367 l 2.243,0.059 z"
   id="path800"
   data-element-id="element-1096-1761788125776" />
<path
   d="m 699.822,336.911 -2.243,-0.059 2.243,-1.309 z"
   id="path801"
   data-element-id="element-1097-1761788125776" />
<path
   d="m 699.822,342.076 v -1.368 l 0.59,1.211 z"
   id="path802"
   data-element-id="element-1098-1761788125776" />
<path
   d="m 700.412,341.919 -0.59,-1.211 0.59,0.344 z"
   id="path803"
   data-element-id="element-1099-1761788125776" />
<path
   d="m 699.822,339.4 v -1.181 l 0.59,1.181 z"
   id="path804"
   data-element-id="element-1100-1761788125776" />
<path
   d="m 700.412,339.4 -0.59,-1.181 h 0.59 z"
   id="path805"
   data-element-id="element-1101-1761788125776" />
<path
   d="m 699.822,336.911 v -1.368 l 0.59,1.023 z"
   id="path806"
   data-element-id="element-1102-1761788125776" />
<path
   d="m 700.412,336.566 -0.59,-1.023 0.59,0.157 z"
   id="path807"
   data-element-id="element-1103-1761788125776" />
<path
   d="m 700.412,341.919 v -0.867 l 0.213,0.811 z"
   id="path808"
   data-element-id="element-1104-1761788125776" />
<path
   d="m 700.412,339.4 v -1.181 l 0.213,1.181 z"
   id="path809"
   data-element-id="element-1105-1761788125776" />
<path
   d="m 700.625,339.4 -0.213,-1.181 h 0.213 z"
   id="path810"
   data-element-id="element-1106-1761788125776" />
<path
   d="M 700.412,336.566 V 335.7 l 0.213,0.056 z"
   id="path811"
   data-element-id="element-1107-1761788125776" />
<path
   d="m 700.625,339.4 v -1.181 l 1.44,1.181 z"
   id="path812"
   data-element-id="element-1108-1761788125776" />
<path
   d="m 702.065,339.4 -1.44,-1.181 h 1.44 z"
   id="path813"
   data-element-id="element-1109-1761788125776" />
<path
   d="m 737.638,251.143 -0.212,-0.802 0.212,-0.364 z"
   id="path814"
   data-element-id="element-1110-1761788125776" />
<path
   d="m 737.638,251.143 v -1.166 l 0.811,0.954 z"
   id="path815"
   data-element-id="element-1111-1761788125776" />
<path
   d="m 738.449,250.931 -0.811,-0.954 0.811,-1.389 z"
   id="path816"
   data-element-id="element-1112-1761788125776" />
<path
   d="m 738.449,250.931 v -2.343 l 1.653,-0.49 z"
   id="path817"
   data-element-id="element-1113-1761788125776" />
<path
   d="m 740.102,248.098 -1.653,0.49 1.653,-2.832 z"
   id="path818"
   data-element-id="element-1114-1761788125776" />
<path
   d="m 740.102,252.584 v -4.486 l 0.078,4.486 z"
   id="path819"
   data-element-id="element-1115-1761788125776" />
<path
   d="m 740.18,252.584 -0.078,-4.486 0.078,-0.135 z"
   id="path820"
   data-element-id="element-1116-1761788125776" />
<path
   d="m 740.102,245.91 v -0.154 l 0.078,0.154 z"
   id="path821"
   data-element-id="element-1117-1761788125776" />
<path
   d="m 740.18,245.91 -0.078,-0.154 0.078,-0.135 z"
   id="path822"
   data-element-id="element-1118-1761788125776" />
<path
   d="m 740.18,252.584 v -4.621 l 0.512,4.621 z"
   id="path823"
   data-element-id="element-1119-1761788125776" />
<path
   d="m 740.692,252.584 -0.512,-4.621 0.512,-0.877 z"
   id="path824"
   data-element-id="element-1120-1761788125776" />
<path
   d="m 740.692,247.086 -0.512,-0.877 h 0.512 z"
   id="path825"
   data-element-id="element-1121-1761788125776" />
<path
   d="m 740.18,245.91 v -0.289 l 0.512,0.289 z"
   id="path826"
   data-element-id="element-1122-1761788125776" />
<path
   d="m 740.692,245.91 -0.512,-0.289 0.512,-0.876 z"
   id="path827"
   data-element-id="element-1123-1761788125776" />
<path
   d="m 740.692,252.584 v -5.498 z"
   id="path828"
   data-element-id="element-1124-1761788125776" />
<path
   d="m 740.692,252.584 v -5.498 0 z"
   id="path829"
   data-element-id="element-1125-1761788125776" />
<path
   d="m 740.692,247.086 v -0.877 z"
   id="path830"
   data-element-id="element-1126-1761788125776" />
<path
   d="m 740.692,247.086 v -0.877 0 z"
   id="path831"
   data-element-id="element-1127-1761788125776" />
<path
   d="m 740.692,245.91 v -1.165 z"
   id="path832"
   data-element-id="element-1128-1761788125776" />
<path
   d="m 740.692,245.91 v -1.165 0 z"
   id="path833"
   data-element-id="element-1129-1761788125776" />
<path
   d="m 740.692,252.584 v -5.498 l 0.512,5.498 z"
   id="path834"
   data-element-id="element-1130-1761788125776" />
<path
   d="m 741.204,252.584 -0.512,-5.498 0.512,0.877 z"
   id="path835"
   data-element-id="element-1131-1761788125776" />
<path
   d="m 740.692,247.086 v -0.877 h 0.512 z"
   id="path836"
   data-element-id="element-1132-1761788125776" />
<path
   d="m 740.692,245.91 v -1.165 l 0.512,1.165 z"
   id="path837"
   data-element-id="element-1133-1761788125776" />
<path
   d="m 741.204,245.91 -0.512,-1.165 0.512,0.876 z"
   id="path838"
   data-element-id="element-1134-1761788125776" />
<path
   d="m 741.204,252.584 v -4.621 l 0.078,4.621 z"
   id="path839"
   data-element-id="element-1135-1761788125776" />
<path
   d="m 741.282,252.584 -0.078,-4.621 0.078,0.135 z"
   id="path840"
   data-element-id="element-1136-1761788125776" />
<path
   d="m 741.204,245.91 v -0.289 l 0.078,0.289 z"
   id="path841"
   data-element-id="element-1137-1761788125776" />
<path
   d="m 741.282,245.91 -0.078,-0.289 0.078,0.135 z"
   id="path842"
   data-element-id="element-1138-1761788125776" />
<path
   d="m 741.282,248.098 v -2.342 l 1.653,5.175 z"
   id="path843"
   data-element-id="element-1139-1761788125776" />
<path
   d="m 742.935,250.931 -1.653,-5.175 1.653,2.832 z"
   id="path844"
   data-element-id="element-1140-1761788125776" />
<path
   d="m 742.935,250.931 v -2.343 l 0.811,2.555 z"
   id="path845"
   data-element-id="element-1141-1761788125776" />
<path
   d="m 743.746,251.143 -0.811,-2.555 0.811,1.388 z"
   id="path846"
   data-element-id="element-1142-1761788125776" />
<path
   d="m 743.746,251.143 v -1.167 l 0.212,0.365 z"
   id="path847"
   data-element-id="element-1143-1761788125776" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="#00b050"
   stroke="#00b050"
   stroke-width="1"
   id="g946"
   data-element-id="element-1144-1761788125776"
   transform="matrix(1.0347291,0,0,0.99988639,-18.688759,0.03662478)">
<path
   d="m 382.095,323.533 v -1.18 l 1.44,1.18 z"
   id="path848"
   data-element-id="element-1145-1761788125776" />
<path
   d="m 383.535,323.533 -1.44,-1.18 h 1.44 z"
   id="path849"
   data-element-id="element-1146-1761788125776" />
<path
   d="m 383.747,326.053 -0.212,-0.056 0.212,-0.811 z"
   id="path850"
   data-element-id="element-1147-1761788125776" />
<path
   d="m 383.535,323.533 v -1.18 l 0.212,1.18 z"
   id="path851"
   data-element-id="element-1148-1761788125776" />
<path
   d="m 383.747,323.533 -0.212,-1.18 h 0.212 z"
   id="path852"
   data-element-id="element-1149-1761788125776" />
<path
   d="m 383.747,320.7 -0.212,-0.811 0.212,-0.056 z"
   id="path853"
   data-element-id="element-1150-1761788125776" />
<path
   d="m 383.747,326.053 v -0.867 l 0.591,1.023 z"
   id="path854"
   data-element-id="element-1151-1761788125776" />
<path
   d="m 384.338,326.209 -0.591,-1.023 0.591,-0.344 z"
   id="path855"
   data-element-id="element-1152-1761788125776" />
<path
   d="m 383.747,323.533 v -1.18 l 0.591,1.18 z"
   id="path856"
   data-element-id="element-1153-1761788125776" />
<path
   d="m 384.338,323.533 -0.591,-1.18 h 0.591 z"
   id="path857"
   data-element-id="element-1154-1761788125776" />
<path
   d="m 383.747,320.7 v -0.867 l 0.591,1.211 z"
   id="path858"
   data-element-id="element-1155-1761788125776" />
<path
   d="m 384.338,321.044 -0.591,-1.211 0.591,-0.156 z"
   id="path859"
   data-element-id="element-1156-1761788125776" />
<path
   d="m 384.338,326.209 v -1.367 l 2.243,0.058 z"
   id="path860"
   data-element-id="element-1157-1761788125776" />
<path
   d="m 386.581,324.9 -2.243,-0.058 2.243,-1.309 z"
   id="path861"
   data-element-id="element-1158-1761788125776" />
<path
   d="m 384.338,323.533 v -1.18 l 2.243,1.18 z"
   id="path862"
   data-element-id="element-1159-1761788125776" />
<path
   d="m 386.581,323.533 -2.243,-1.18 h 2.243 z"
   id="path863"
   data-element-id="element-1160-1761788125776" />
<path
   d="m 384.338,321.044 v -1.367 l 2.243,2.676 z"
   id="path864"
   data-element-id="element-1161-1761788125776" />
<path
   d="m 386.581,322.353 -2.243,-2.676 2.243,1.309 z"
   id="path865"
   data-element-id="element-1162-1761788125776" />
<path
   d="m 386.581,324.9 v -1.367 l 1.012,0.776 z"
   id="path866"
   data-element-id="element-1163-1761788125776" />
<path
   d="m 387.593,324.309 -1.012,-0.776 h 1.012 z"
   id="path867"
   data-element-id="element-1164-1761788125776" />
<path
   d="m 386.581,323.533 v -1.18 l 1.012,0.59 z"
   id="path868"
   data-element-id="element-1165-1761788125776" />
<path
   d="m 386.581,322.353 v -1.367 l 1.012,1.367 z"
   id="path869"
   data-element-id="element-1166-1761788125776" />
<path
   d="m 387.593,322.353 -1.012,-1.367 1.012,0.591 z"
   id="path870"
   data-element-id="element-1167-1761788125776" />
<path
   d="m 387.593,324.309 v -0.776 l 0.876,0.265 z"
   id="path871"
   data-element-id="element-1168-1761788125776" />
<path
   d="m 388.469,323.798 -0.876,-0.265 h 0.876 z"
   id="path872"
   data-element-id="element-1169-1761788125776" />
<path
   d="m 388.469,323.455 -0.876,-0.512 0.876,-0.511 z"
   id="path873"
   data-element-id="element-1170-1761788125776" />
<path
   d="m 387.593,322.353 v -0.776 l 0.876,0.776 z"
   id="path874"
   data-element-id="element-1171-1761788125776" />
<path
   d="m 388.469,322.353 -0.876,-0.776 0.876,0.512 z"
   id="path875"
   data-element-id="element-1172-1761788125776" />
<path
   d="m 388.469,323.798 v -0.265 l 0.3,0.09 z"
   id="path876"
   data-element-id="element-1173-1761788125776" />
<path
   d="m 388.769,323.623 -0.3,-0.09 h 0.3 z"
   id="path877"
   data-element-id="element-1174-1761788125776" />
<path
   d="m 388.469,322.353 v -0.264 l 0.3,0.264 z"
   id="path878"
   data-element-id="element-1175-1761788125776" />
<path
   d="m 388.769,322.353 -0.3,-0.264 0.3,0.174 z"
   id="path879"
   data-element-id="element-1176-1761788125776" />
<path
   d="m 388.769,323.623 v -1.36 l 1.164,0.68 z"
   id="path880"
   data-element-id="element-1177-1761788125776" />
<path
   d="m 414.898,250.808 -1.165,-0.68 1.165,-0.68 z"
   id="path881"
   data-element-id="element-1178-1761788125776" />
<path
   d="m 414.898,250.808 v -0.09 l 0.299,0.265 z"
   id="path882"
   data-element-id="element-1179-1761788125776" />
<path
   d="m 415.197,250.983 -0.299,-0.265 h 0.299 z"
   id="path883"
   data-element-id="element-1180-1761788125776" />
<path
   d="m 414.898,249.538 v -0.09 l 0.299,0.09 z"
   id="path884"
   data-element-id="element-1181-1761788125776" />
<path
   d="m 415.197,249.538 -0.299,-0.09 0.299,-0.174 z"
   id="path885"
   data-element-id="element-1182-1761788125776" />
<path
   d="m 415.197,250.983 v -0.265 l 0.877,0.776 z"
   id="path886"
   data-element-id="element-1183-1761788125776" />
<path
   d="m 416.074,251.494 -0.877,-0.776 h 0.877 z"
   id="path887"
   data-element-id="element-1184-1761788125776" />
<path
   d="m 415.197,250.64 v -1.023 l 0.877,0.511 z"
   id="path888"
   data-element-id="element-1185-1761788125776" />
<path
   d="m 415.197,249.538 v -0.264 l 0.877,0.264 z"
   id="path889"
   data-element-id="element-1186-1761788125776" />
<path
   d="m 416.074,249.538 -0.877,-0.264 0.877,-0.512 z"
   id="path890"
   data-element-id="element-1187-1761788125776" />
<path
   d="m 416.074,251.494 v -0.776 l 1.012,1.367 z"
   id="path891"
   data-element-id="element-1188-1761788125776" />
<path
   d="m 417.086,252.085 -1.012,-1.367 h 1.012 z"
   id="path892"
   data-element-id="element-1189-1761788125776" />
<path
   d="m 417.086,250.718 -1.012,-0.59 1.012,-0.59 z"
   id="path893"
   data-element-id="element-1190-1761788125776" />
<path
   d="m 416.074,249.538 v -0.776 l 1.012,0.776 z"
   id="path894"
   data-element-id="element-1191-1761788125776" />
<path
   d="m 417.086,249.538 -1.012,-0.776 1.012,-0.591 z"
   id="path895"
   data-element-id="element-1192-1761788125776" />
<path
   d="m 417.086,252.085 v -1.367 l 2.242,2.676 z"
   id="path896"
   data-element-id="element-1193-1761788125776" />
<path
   d="m 419.328,253.394 -2.242,-2.676 2.242,1.309 z"
   id="path897"
   data-element-id="element-1194-1761788125776" />
<path
   d="m 417.086,250.718 v -1.18 l 2.242,1.18 z"
   id="path898"
   data-element-id="element-1195-1761788125776" />
<path
   d="m 419.328,250.718 -2.242,-1.18 h 2.242 z"
   id="path899"
   data-element-id="element-1196-1761788125776" />
<path
   d="m 417.086,249.538 v -1.367 l 2.242,0.058 z"
   id="path900"
   data-element-id="element-1197-1761788125776" />
<path
   d="m 419.328,248.229 -2.242,-0.058 2.242,-1.309 z"
   id="path901"
   data-element-id="element-1198-1761788125776" />
<path
   d="m 419.328,253.394 v -1.367 l 0.591,1.211 z"
   id="path902"
   data-element-id="element-1199-1761788125776" />
<path
   d="m 419.919,253.238 -0.591,-1.211 0.591,0.344 z"
   id="path903"
   data-element-id="element-1200-1761788125776" />
<path
   d="m 419.328,250.718 v -1.18 l 0.591,1.18 z"
   id="path904"
   data-element-id="element-1201-1761788125776" />
<path
   d="m 419.919,250.718 -0.591,-1.18 h 0.591 z"
   id="path905"
   data-element-id="element-1202-1761788125776" />
<path
   d="m 419.328,248.229 v -1.367 l 0.591,1.023 z"
   id="path906"
   data-element-id="element-1203-1761788125776" />
<path
   d="m 419.919,247.885 -0.591,-1.023 0.591,0.156 z"
   id="path907"
   data-element-id="element-1204-1761788125776" />
<path
   d="m 419.919,253.238 v -0.867 l 0.212,0.811 z"
   id="path908"
   data-element-id="element-1205-1761788125776" />
<path
   d="m 419.919,250.718 v -1.18 l 0.212,1.18 z"
   id="path909"
   data-element-id="element-1206-1761788125776" />
<path
   d="m 420.131,250.718 -0.212,-1.18 h 0.212 z"
   id="path910"
   data-element-id="element-1207-1761788125776" />
<path
   d="m 419.919,247.885 v -0.867 l 0.212,0.057 z"
   id="path911"
   data-element-id="element-1208-1761788125776" />
<path
   d="m 420.131,250.718 v -1.18 l 1.441,1.18 z"
   id="path912"
   data-element-id="element-1209-1761788125776" />
<path
   d="m 421.572,250.718 -1.441,-1.18 h 1.441 z"
   id="path913"
   data-element-id="element-1210-1761788125776" />
<path
   d="m 416.031,395.305 -1.165,-0.68 1.165,-0.68 z"
   id="path914"
   data-element-id="element-1211-1761788125776" />
<path
   d="m 416.031,395.305 v -0.09 l 0.299,0.264 z"
   id="path915"
   data-element-id="element-1212-1761788125776" />
<path
   d="m 416.33,395.479 -0.299,-0.264 h 0.299 z"
   id="path916"
   data-element-id="element-1213-1761788125776" />
<path
   d="m 416.031,394.035 v -0.09 l 0.299,0.09 z"
   id="path917"
   data-element-id="element-1214-1761788125776" />
<path
   d="m 416.33,394.035 -0.299,-0.09 0.299,-0.175 z"
   id="path918"
   data-element-id="element-1215-1761788125776" />
<path
   d="m 416.33,395.479 v -0.264 l 0.877,0.776 z"
   id="path919"
   data-element-id="element-1216-1761788125776" />
<path
   d="m 417.207,395.991 -0.877,-0.776 h 0.877 z"
   id="path920"
   data-element-id="element-1217-1761788125776" />
<path
   d="m 416.33,395.136 v -1.023 l 0.877,0.512 z"
   id="path921"
   data-element-id="element-1218-1761788125776" />
<path
   d="m 416.33,394.035 v -0.265 l 0.877,0.265 z"
   id="path922"
   data-element-id="element-1219-1761788125776" />
<path
   d="m 417.207,394.035 -0.877,-0.265 0.877,-0.511 z"
   id="path923"
   data-element-id="element-1220-1761788125776" />
<path
   d="m 417.207,395.991 v -0.776 l 1.012,1.367 z"
   id="path924"
   data-element-id="element-1221-1761788125776" />
<path
   d="m 418.219,396.582 -1.012,-1.367 h 1.012 z"
   id="path925"
   data-element-id="element-1222-1761788125776" />
<path
   d="m 418.219,395.215 -1.012,-0.59 1.012,-0.59 z"
   id="path926"
   data-element-id="element-1223-1761788125776" />
<path
   d="m 417.207,394.035 v -0.776 l 1.012,0.776 z"
   id="path927"
   data-element-id="element-1224-1761788125776" />
<path
   d="m 418.219,394.035 -1.012,-0.776 1.012,-0.591 z"
   id="path928"
   data-element-id="element-1225-1761788125776" />
<path
   d="m 418.219,396.582 v -1.367 l 2.243,2.676 z"
   id="path929"
   data-element-id="element-1226-1761788125776" />
<path
   d="m 420.462,397.891 -2.243,-2.676 2.243,1.309 z"
   id="path930"
   data-element-id="element-1227-1761788125776" />
<path
   d="m 418.219,395.215 v -1.18 l 2.243,1.18 z"
   id="path931"
   data-element-id="element-1228-1761788125776" />
<path
   d="m 420.462,395.215 -2.243,-1.18 h 2.243 z"
   id="path932"
   data-element-id="element-1229-1761788125776" />
<path
   d="m 418.219,394.035 v -1.367 l 2.243,0.058 z"
   id="path933"
   data-element-id="element-1230-1761788125776" />
<path
   d="m 420.462,392.726 -2.243,-0.058 2.243,-1.309 z"
   id="path934"
   data-element-id="element-1231-1761788125776" />
<path
   d="m 420.462,397.891 v -1.367 l 0.59,1.211 z"
   id="path935"
   data-element-id="element-1232-1761788125776" />
<path
   d="m 421.052,397.735 -0.59,-1.211 0.59,0.344 z"
   id="path936"
   data-element-id="element-1233-1761788125776" />
<path
   d="m 420.462,395.215 v -1.18 l 0.59,1.18 z"
   id="path937"
   data-element-id="element-1234-1761788125776" />
<path
   d="m 421.052,395.215 -0.59,-1.18 h 0.59 z"
   id="path938"
   data-element-id="element-1235-1761788125776" />
<path
   d="m 420.462,392.726 v -1.367 l 0.59,1.023 z"
   id="path939"
   data-element-id="element-1236-1761788125776" />
<path
   d="m 421.052,392.382 -0.59,-1.023 0.59,0.156 z"
   id="path940"
   data-element-id="element-1237-1761788125776" />
<path
   d="m 421.052,397.735 v -0.867 l 0.213,0.81 z"
   id="path941"
   data-element-id="element-1238-1761788125776" />
<path
   d="m 421.052,395.215 v -1.18 l 0.213,1.18 z"
   id="path942"
   data-element-id="element-1239-1761788125776" />
<path
   d="m 421.265,395.215 -0.213,-1.18 h 0.213 z"
   id="path943"
   data-element-id="element-1240-1761788125776" />
<path
   d="m 421.052,392.382 v -0.867 l 0.213,0.056 z"
   id="path944"
   data-element-id="element-1241-1761788125776" />
<path
   d="m 421.265,395.215 v -1.18 l 1.44,1.18 z"
   id="path945"
   data-element-id="element-1242-1761788125776" />
<path
   d="m 422.705,395.215 -1.44,-1.18 h 1.44 z"
   id="path946"
   data-element-id="element-1243-1761788125776" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g947"
   data-element-id="element-1244-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1"
   transform="matrix(2.5008271,0,0,1,-1454.1527,0)">
<polyline
   points="956.304,615.998 967.542,615.998 "
   id="polyline946"
   data-element-id="element-1245-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,176,80)"
   stroke="rgb(0,176,80)"
   stroke-width="1"
   id="g985"
   data-element-id="element-1246-1761788125776"
   style="cursor: pointer;">
<path
   d="M108.527,476.997 107.362,476.317 108.527,475.638 z"
   id="path947"
   data-element-id="element-1247-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.527,476.997 108.527,476.908 108.826,477.172 z"
   id="path948"
   data-element-id="element-1248-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,477.172 108.527,476.908 108.826,476.908 z"
   id="path949"
   data-element-id="element-1249-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.527,475.727 108.527,475.638 108.826,475.727 z"
   id="path950"
   data-element-id="element-1250-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,475.727 108.527,475.638 108.826,475.463 z"
   id="path951"
   data-element-id="element-1251-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,477.172 108.826,476.908 109.703,477.684 z"
   id="path952"
   data-element-id="element-1252-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,477.684 108.826,476.908 109.703,476.908 z"
   id="path953"
   data-element-id="element-1253-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,476.829 108.826,475.806 109.703,476.317 z"
   id="path954"
   data-element-id="element-1254-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.826,475.727 108.826,475.463 109.703,475.727 z"
   id="path955"
   data-element-id="element-1255-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,475.727 108.826,475.463 109.703,474.951 z"
   id="path956"
   data-element-id="element-1256-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,477.684 109.703,476.908 110.715,478.274 z"
   id="path957"
   data-element-id="element-1257-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,478.274 109.703,476.908 110.715,476.908 z"
   id="path958"
   data-element-id="element-1258-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,476.908 109.703,476.317 110.715,475.727 z"
   id="path959"
   data-element-id="element-1259-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.703,475.727 109.703,474.951 110.715,475.727 z"
   id="path960"
   data-element-id="element-1260-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,475.727 109.703,474.951 110.715,474.361 z"
   id="path961"
   data-element-id="element-1261-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,478.274 110.715,476.908 110.715,478.274 z"
   id="path962"
   data-element-id="element-1262-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,478.274 110.715,476.908 110.715,476.908 z"
   id="path963"
   data-element-id="element-1263-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,476.908 110.715,475.727 110.715,476.908 z"
   id="path964"
   data-element-id="element-1264-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,476.908 110.715,475.727 110.715,475.727 z"
   id="path965"
   data-element-id="element-1265-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,475.727 110.715,474.361 110.715,475.727 z"
   id="path966"
   data-element-id="element-1266-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,475.727 110.715,474.361 110.715,474.36 z"
   id="path967"
   data-element-id="element-1267-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,478.274 110.715,476.908 112.958,479.584 z"
   id="path968"
   data-element-id="element-1268-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,479.584 110.715,476.908 112.958,478.216 z"
   id="path969"
   data-element-id="element-1269-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,476.908 110.715,475.727 112.958,476.908 z"
   id="path970"
   data-element-id="element-1270-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,476.908 110.715,475.727 112.958,475.727 z"
   id="path971"
   data-element-id="element-1271-1761788125776"
   style="cursor: pointer;" />
<path
   d="M110.715,475.727 110.715,474.36 112.958,474.419 z"
   id="path972"
   data-element-id="element-1272-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,474.419 110.715,474.36 112.958,473.051 z"
   id="path973"
   data-element-id="element-1273-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,479.584 112.958,478.216 113.548,479.427 z"
   id="path974"
   data-element-id="element-1274-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,479.427 112.958,478.216 113.548,478.56 z"
   id="path975"
   data-element-id="element-1275-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,476.908 112.958,475.727 113.548,476.908 z"
   id="path976"
   data-element-id="element-1276-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,476.908 112.958,475.727 113.548,475.727 z"
   id="path977"
   data-element-id="element-1277-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.958,474.419 112.958,473.051 113.548,474.074 z"
   id="path978"
   data-element-id="element-1278-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,474.074 112.958,473.051 113.548,473.207 z"
   id="path979"
   data-element-id="element-1279-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,479.427 113.548,478.56 113.76,479.371 z"
   id="path980"
   data-element-id="element-1280-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,476.908 113.548,475.727 113.76,476.908 z"
   id="path981"
   data-element-id="element-1281-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.76,476.908 113.548,475.727 113.76,475.727 z"
   id="path982"
   data-element-id="element-1282-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.548,474.074 113.548,473.207 113.76,473.264 z"
   id="path983"
   data-element-id="element-1283-1761788125776"
   style="cursor: pointer;" />
<path
   d="M113.76,476.908 113.76,475.727 114.917,476.908 z"
   id="path984"
   data-element-id="element-1284-1761788125776"
   style="cursor: pointer;" />
<path
   d="M114.917,476.908 113.76,475.727 114.917,475.727 z"
   id="path985"
   data-element-id="element-1285-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,80)"
   stroke-width="0.7"
   id="g986"
   data-element-id="element-1286-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none">
<polyline
   points="139.756,342.682 151.844,342.682 "
   id="polyline985"
   data-element-id="element-1287-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
<polyline
   points="58.4409,304.244 134.845,304.244 "
   id="polyline986"
   data-element-id="element-1288-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,176,80)"
   stroke="rgb(0,176,80)"
   stroke-width="1"
   id="g1018"
   data-element-id="element-1289-1761788125776"
   style="cursor: pointer;">
<path
   d="M107.582,343.361 106.418,342.682 107.582,342.002 z"
   id="path986"
   data-element-id="element-1290-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.582,343.361 107.582,343.272 107.881,343.536 z"
   id="path987"
   data-element-id="element-1291-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.881,343.536 107.582,343.272 107.881,343.272 z"
   id="path988"
   data-element-id="element-1292-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.582,342.091 107.582,342.002 107.881,342.091 z"
   id="path989"
   data-element-id="element-1293-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.881,342.091 107.582,342.002 107.881,341.827 z"
   id="path990"
   data-element-id="element-1294-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.881,343.536 107.881,343.272 108.758,344.048 z"
   id="path991"
   data-element-id="element-1295-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.758,344.048 107.881,343.272 108.758,343.272 z"
   id="path992"
   data-element-id="element-1296-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.881,343.193 107.881,342.17 108.758,342.682 z"
   id="path993"
   data-element-id="element-1297-1761788125776"
   style="cursor: pointer;" />
<path
   d="M107.881,342.091 107.881,341.827 108.758,342.091 z"
   id="path994"
   data-element-id="element-1298-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.758,342.091 107.881,341.827 108.758,341.315 z"
   id="path995"
   data-element-id="element-1299-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.758,344.048 108.758,343.272 109.77,344.638 z"
   id="path996"
   data-element-id="element-1300-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.77,344.638 108.758,343.272 109.77,343.272 z"
   id="path997"
   data-element-id="element-1301-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.77,343.272 108.758,342.682 109.77,342.091 z"
   id="path998"
   data-element-id="element-1302-1761788125776"
   style="cursor: pointer;" />
<path
   d="M108.758,342.091 108.758,341.315 109.77,342.091 z"
   id="path999"
   data-element-id="element-1303-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.77,342.091 108.758,341.315 109.77,340.725 z"
   id="path1000"
   data-element-id="element-1304-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.77,344.638 109.77,343.272 112.013,345.948 z"
   id="path1001"
   data-element-id="element-1305-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.013,345.948 109.77,343.272 112.013,344.58 z"
   id="path1002"
   data-element-id="element-1306-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.77,343.272 109.77,342.091 112.013,343.272 z"
   id="path1003"
   data-element-id="element-1307-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.013,343.272 109.77,342.091 112.013,342.091 z"
   id="path1004"
   data-element-id="element-1308-1761788125776"
   style="cursor: pointer;" />
<path
   d="M109.77,342.091 109.77,340.725 112.013,340.783 z"
   id="path1005"
   data-element-id="element-1309-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.013,340.783 109.77,340.725 112.013,339.415 z"
   id="path1006"
   data-element-id="element-1310-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.013,345.948 112.013,344.58 112.604,345.791 z"
   id="path1007"
   data-element-id="element-1311-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.604,345.791 112.013,344.58 112.604,344.925 z"
   id="path1008"
   data-element-id="element-1312-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.013,343.272 112.013,342.091 112.604,343.272 z"
   id="path1009"
   data-element-id="element-1313-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.604,343.272 112.013,342.091 112.604,342.091 z"
   id="path1010"
   data-element-id="element-1314-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.013,340.783 112.013,339.415 112.604,340.439 z"
   id="path1011"
   data-element-id="element-1315-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.604,340.439 112.013,339.415 112.604,339.572 z"
   id="path1012"
   data-element-id="element-1316-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.604,345.791 112.604,344.925 112.816,345.735 z"
   id="path1013"
   data-element-id="element-1317-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.604,343.272 112.604,342.091 112.816,343.272 z"
   id="path1014"
   data-element-id="element-1318-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.816,343.272 112.604,342.091 112.816,342.091 z"
   id="path1015"
   data-element-id="element-1319-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.604,340.439 112.604,339.572 112.816,339.628 z"
   id="path1016"
   data-element-id="element-1320-1761788125776"
   style="cursor: pointer;" />
<path
   d="M112.816,343.272 112.816,342.091 114.256,343.272 z"
   id="path1017"
   data-element-id="element-1321-1761788125776"
   style="cursor: pointer;" />
<path
   d="M114.256,343.272 112.816,342.091 114.256,342.091 z"
   id="path1018"
   data-element-id="element-1322-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,80)"
   stroke-width="0.7"
   id="g1019"
   data-element-id="element-1323-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none">
<polyline
   points="130.689,343.295 131.976,340.456 135.081,339.282 138.186,340.456 139.472,343.295 "
   id="polyline1018"
   data-element-id="element-1324-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g1020"
   data-element-id="element-1325-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="959.208,242.242 958.209,250.952 955.745,259.3 951.888,267.103 946.71,274.179 "
   id="polyline1019"
   data-element-id="element-1326-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   id="g271"
   style="stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1"><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g80"
     data-element-id="element-112-1761788125775"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="262.247,619.87 267.819,623.695 262.247,627.52 262.247,619.87 "
   id="polyline79"
   data-element-id="element-113-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g82"
     data-element-id="element-116-1761788125775"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="273.297,627.52 267.725,623.695 273.297,619.87 273.297,627.52 "
   id="polyline81"
   data-element-id="element-117-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g><g
     id="g270"
     style="stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1"><polyline
       points="920.227,624.025 920.227,617.131 "
       id="polyline1020-2"
       data-element-id="element-1328-1761788125776"
       transform="translate(-652.501,-0.8145457)"
       style="fill:#000000;stroke:#ffffff;stroke-width:0.53;stroke-opacity:1;fill-opacity:1"
       clip-path="url(#clipPath269)" /><polyline
       points="916.449,616.942 924.005,616.942 "
       id="polyline1021-3"
       data-element-id="element-1329-1761788125776"
       transform="translate(-652.501,-0.8145457)"
       style="fill:#000000;stroke:#ffffff;stroke-width:0.53;stroke-opacity:1;fill-opacity:1"
       clip-path="url(#clipPath268)" /></g></g>


<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1022"
   data-element-id="element-1330-1761788125776"
   style="cursor: pointer;">
<path
   d="M914.56,619.87 920.132,623.695 914.56,627.52 914.56,627.52 z"
   id="path1021"
   data-element-id="element-1331-1761788125776"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1024"
   data-element-id="element-1334-1761788125776"
   style="cursor: pointer;">
<path
   d="M925.61,627.52 920.132,623.695 925.61,619.87 925.61,619.87 z"
   id="path1023"
   data-element-id="element-1335-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   id="g219"
   style="stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1"><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g1021"
     data-element-id="element-1327-1761788125776"
     style="cursor:pointer;stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1">
<polyline
   points="920.227,624.025 920.227,617.131 "
   id="polyline1020"
   data-element-id="element-1328-1761788125776"
   style="cursor:pointer;stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1" />
<polyline
   points="916.449,616.942 924.005,616.942 "
   id="polyline1021"
   data-element-id="element-1329-1761788125776"
   style="cursor:pointer;stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g1023"
     data-element-id="element-1332-1761788125776"
     style="cursor:pointer;stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1">
<polyline
   points="914.56,619.87 920.132,623.695 914.56,627.52 914.56,619.87 "
   id="polyline1022"
   data-element-id="element-1333-1761788125776"
   style="cursor:pointer;stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g1025"
     data-element-id="element-1336-1761788125776"
     style="cursor:pointer;stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1">
<polyline
   points="925.61,627.52 920.132,623.695 925.61,619.87 925.61,627.52 "
   id="polyline1024"
   data-element-id="element-1337-1761788125776"
   style="cursor:pointer;stroke:#ffffff;fill:#000000;fill-opacity:1;stroke-opacity:1" />
</g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g1026"
   data-element-id="element-1338-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="958.854,615.998 935.621,615.998 935.621,646.408 952.156,646.408 "
   id="polyline1025"
   data-element-id="element-1339-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>




<g
   id="g216"
   transform="translate(-2.7137546,-2)"><g
     transform="matrix(0,0.3,-0.27,0,638.38,593.75)"
     id="g95"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect65" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect66"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect71"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect73" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect74"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse74" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse75" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line75" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line76" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle95" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse95"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect95" /></g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,176,240)"
   stroke-width="0.7"
   id="g1032"
   data-element-id="element-1351-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none">
<polyline
   points="712.076,623.647 712.076,338.809 627.456,338.809 "
   id="polyline1031"
   data-element-id="element-1352-1761788125776"
   style="cursor:pointer;stroke-width:1.5;stroke-dasharray:none" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="1"
   id="g1045"
   data-element-id="element-1353-1761788125776"
   style="cursor: pointer;">
<path
   d="M693.968,513.204 692.432,505.595 693.968,497.985 z"
   id="path1032"
   data-element-id="element-1354-1761788125776"
   style="cursor: pointer;" />
<path
   d="M693.968,513.204 693.968,497.985 698.158,519.418 z"
   id="path1033"
   data-element-id="element-1355-1761788125776"
   style="cursor: pointer;" />
<path
   d="M698.158,519.418 693.968,497.985 698.158,491.771 z"
   id="path1034"
   data-element-id="element-1356-1761788125776"
   style="cursor: pointer;" />
<path
   d="M698.158,519.418 698.158,491.771 704.372,523.608 z"
   id="path1035"
   data-element-id="element-1357-1761788125776"
   style="cursor: pointer;" />
<path
   d="M704.372,523.608 698.158,491.771 704.372,487.581 z"
   id="path1036"
   data-element-id="element-1358-1761788125776"
   style="cursor: pointer;" />
<path
   d="M704.372,523.608 704.372,487.581 711.982,525.144 z"
   id="path1037"
   data-element-id="element-1359-1761788125776"
   style="cursor: pointer;" />
<path
   d="M711.982,525.144 704.372,487.581 711.982,486.045 z"
   id="path1038"
   data-element-id="element-1360-1761788125776"
   style="cursor: pointer;" />
<path
   d="M711.982,525.144 711.982,486.045 719.592,523.608 z"
   id="path1039"
   data-element-id="element-1361-1761788125776"
   style="cursor: pointer;" />
<path
   d="M719.592,523.608 711.982,486.045 719.592,487.581 z"
   id="path1040"
   data-element-id="element-1362-1761788125776"
   style="cursor: pointer;" />
<path
   d="M719.592,523.608 719.592,487.581 725.806,519.418 z"
   id="path1041"
   data-element-id="element-1363-1761788125776"
   style="cursor: pointer;" />
<path
   d="M725.806,519.418 719.592,487.581 725.806,491.771 z"
   id="path1042"
   data-element-id="element-1364-1761788125776"
   style="cursor: pointer;" />
<path
   d="M725.806,519.418 725.806,491.771 729.995,513.204 z"
   id="path1043"
   data-element-id="element-1365-1761788125776"
   style="cursor: pointer;" />
<path
   d="M729.995,513.204 725.806,491.771 729.995,497.985 z"
   id="path1044"
   data-element-id="element-1366-1761788125776"
   style="cursor: pointer;" />
<path
   d="M729.995,513.204 729.995,497.985 731.531,505.595 z"
   id="path1045"
   data-element-id="element-1367-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   id="SW_Pump_2"
   clip-path="url(#clipId0)"
   data-element-id="element-1368-1761788125776"
   style="cursor: pointer;">
    <circle
   cx="711.98"
   cy="505.59"
   r="16.956521739130437"
   fill="#06b6d4"
   stroke="none"
   opacity="0.9"
   data-element-id="element-1369-1761788125776"
   style="cursor: pointer;"
   id="circle170">
        <animate
   attributeName="opacity"
   values="0.8;1;0.8"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="711.98"
   cy="505.59"
   r="13.565217391304351"
   fill="#0891b2"
   stroke="none"
   data-element-id="element-1370-1761788125776"
   style="cursor: pointer;"
   id="circle171" />
    <g
   class="impeller-SW_Pump_2"
   data-element-id="element-1371-1761788125776"
   style="cursor: pointer;"
   id="g106">
        <circle
   cx="711.98"
   cy="505.59"
   r="10.682608695652176"
   fill="#0e7490"
   stroke="none"
   data-element-id="element-1372-1761788125776"
   style="cursor: pointer;"
   id="circle172" />
        <path
   d="M 711.98,494.9073913043478 L 714.3539130434783,499.8247826086956 L 711.98,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-1373-1761788125776"
   style="cursor: pointer;"
   id="path103" />
        <path
   d="M 722.6626086956522,505.59 L 716.7278260869565,507.9639130434782 L 711.98,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-1374-1761788125776"
   style="cursor: pointer;"
   id="path88" />
        <path
   d="M 711.98,516.2726086956521 L 709.6060869565217,510.3378260869565 L 711.98,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-1375-1761788125776"
   style="cursor: pointer;"
   id="path104" />
        <path
   d="M 701.2973913043478,505.59 L 707.2321739130435,503.21608695652174 L 711.98,505.59 Z"
   fill="#06b6d4"
   data-element-id="element-1376-1761788125776"
   style="cursor: pointer;"
   id="path181" />
    </g>
    <circle
   cx="711.98"
   cy="505.59"
   r="3.900000000000001"
   fill="#fbbf24"
   data-element-id="element-1377-1761788125776"
   style="cursor: pointer;"
   id="circle106">
        <animate
   attributeName="r"
   values="3.900000000000001;4.917391304347826;3.900000000000001"
   dur="1s"
   repeatCount="indefinite" />
    </circle>
    <circle
   cx="711.98"
   cy="505.59"
   r="1.8652173913043482"
   fill="#f59e0b"
   stroke="none"
   data-element-id="element-1378-1761788125776"
   style="cursor: pointer;"
   id="circle107" />
    <rect
   x="707.98"
   y="522.55"
   width="8"
   height="12"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-1379-1761788125776"
   style="cursor: pointer;"
   id="rect181" />
    <path
   d="M 711.98,525.55 L 711.98,531.55"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-1380-1761788125776"
   style="cursor: pointer;"
   id="path120">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
    <rect
   x="707.98"
   y="476.63347826086954"
   width="8"
   height="12"
   fill="#00b0f0"
   stroke="none"
   rx="1"
   data-element-id="element-1381-1761788125776"
   style="cursor: pointer;"
   id="rect119" />
    <path
   d="M 711.98,479.63347826086954 L 711.98,485.63347826086954"
   stroke="#ffffff"
   stroke-width="1"
   stroke-dasharray="2,2"
   data-element-id="element-1382-1761788125776"
   style="cursor: pointer;"
   id="path121">
        <animate
   attributeName="stroke-dashoffset"
   values="0;4"
   dur="0.8s"
   repeatCount="indefinite" />
    </path>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1047"
   data-element-id="element-1383-1761788125776"
   style="cursor: pointer;">

</g>




<g
   id="g2"
   transform="translate(-2.0966544)"><g
     transform="matrix(0,0.3,-0.27,0,824.81,590.91)"
     id="g103"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect96" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect97"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect98"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect99" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect100"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse100" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse101" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line101" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line102" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle102" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse102"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect102" /></g></g><g
   id="g115"
   transform="translate(-3.0483272,-2)"><g
     transform="matrix(0,0.3,-0.27,0,733.63,593.75)"
     id="g114"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect103" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect108"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect110"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect111" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect112"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse112" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse113" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line113" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line114" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle114" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse114"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect114" /></g></g>


<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1055"
   data-element-id="element-1399-1761788125776"
   style="cursor: pointer;">
<path
   d="M715.854,445.057 712.076,450.535 708.298,445.057 708.298,445.057 z"
   id="path1054"
   data-element-id="element-1400-1761788125776"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1057"
   data-element-id="element-1403-1761788125776"
   style="cursor: pointer;">
<path
   d="M708.298,456.107 712.076,450.535 715.854,456.107 715.854,456.107 z"
   id="path1056"
   data-element-id="element-1404-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   id="g185"><g
     transform="translate(712.087,450.582) rotate(90) scale(0.3,0.27) translate(-60,-70)"
     id="g209">











<rect
   x="40"
   y="50"
   width="40"
   height="40"
   rx="4"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2.5"
   id="rect190" />
<rect
   x="42"
   y="52"
   width="36"
   height="8"
   fill="rgba(255,255,255,0.4)"
   id="rect191"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="42"
   y="80"
   width="36"
   height="8"
   fill="rgba(0,0,0,0.15)"
   id="rect192"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="52"
   y="30"
   width="16"
   height="22"
   rx="2"
   fill="#d0d0d0"
   stroke="#707070"
   stroke-width="2"
   id="rect193" />
<ellipse
   cx="60"
   cy="20"
   rx="20"
   ry="9"
   fill="#20B2AA"
   stroke="#006666"
   stroke-width="2.5"
   id="ellipse193" />
<ellipse
   cx="60"
   cy="17"
   rx="18"
   ry="7"
   fill="#008B8B"
   id="ellipse194" />
<line
   x1="42"
   y1="17"
   x2="78"
   y2="17"
   stroke="#004d4d"
   stroke-width="3"
   id="line194" />
<line
   x1="60"
   y1="9"
   x2="60"
   y2="25"
   stroke="#004d4d"
   stroke-width="3"
   id="line195" />
<circle
   cx="60"
   cy="17"
   r="4"
   fill="#008B8B"
   id="circle195" />
<ellipse
   cx="60"
   cy="14"
   rx="10"
   ry="3"
   fill="rgba(255,255,255,0.5)"
   id="ellipse195"
   style="fill:#ffffff;fill-opacity:0.49803904" />
<rect
   x="57"
   y="24"
   width="6"
   height="8"
   fill="#a8a8a8"
   stroke="#707070"
   stroke-width="1"
   id="rect195" />
<path
   d="M 70 70 L 50 70 M 55 64 L 50 70 L 55 76"
   stroke="#008B8B"
   stroke-width="3"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill="none"
   id="path197">
<animate
   attributeName="opacity"
   values="0.5;1;0.5"
   dur="2s"
   repeatCount="indefinite" />
<animate
   attributeName="stroke-width"
   values="2.5;3.5;2.5"
   dur="2s"
   repeatCount="indefinite" />
</path></g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g1059"
   data-element-id="element-1407-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1"
   transform="matrix(1.0048123,0,0,1.0307561,-4.4077318,-18.202479)">
<polyline
   points="914.657,442.979 882.261,442.979 882.261,591.631 "
   id="polyline1058"
   data-element-id="element-1408-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ff0000"
   stroke-width="0.35"
   id="g1073"
   data-element-id="element-1424-1761788125776"
   transform="translate(12.084241,-2.79173)">
<g
   transform="matrix(0,0.65,-0.65,0,914.812,441.366)"
   id="g14">
<!-- PX Symbol Style 6 -->
<circle
   cx="0"
   cy="0"
   r="20"
   fill="url(#purpleGrad)"
   stroke="#8e44ad"
   stroke-width="2"
   id="circle209"
   style="fill:url(#purpleGrad)" />
<circle
   cx="0"
   cy="0"
   r="15"
   fill="none"
   stroke="rgba(255,255,255,0.3)"
   stroke-width="1"
   id="circle210" />
<text
   x="0"
   y="5"
   text-anchor="middle"
   fill="#ffffff"
   font-size="14px"
   font-weight="bold"
   id="text12">PX</text>
<line
   x1="0"
   y1="20"
   x2="0"
   y2="30"
   stroke="#8e44ad"
   stroke-width="2"
   id="line12" />
<circle
   cx="0"
   cy="25"
   r="2.5"
   fill="#8e44ad"
   id="circle211" />
</g>
</g>
<g
   clip-path="url(#clipId0)"
   fill="#ff0000"
   stroke="#ff0000"
   stroke-width="0"
   id="g1074"
   data-element-id="element-1426-1761788125776"
   transform="translate(34)"
   style="fill:#ffffff;fill-opacity:1">
<text
   transform="scale(1.0001623,0.99983769)"
   font-family="Bahnschrift, sans-serif"
   font-size="9.06517px"
   id="text1073"
   data-element-id="element-1427-1761788125776"
   x="916.66321"
   y="428.06949"
   style="font-size:11.0667px;fill:#ffffff;fill-opacity:1;stroke-width:0">PX1</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="#8faadc"
   stroke="#8faadc"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1075"
   data-element-id="element-1428-1761788125776"
   transform="translate(4)">
<path
   d="m 452.596,413.844 h 67.809 V 302.307 h -67.809 z"
   id="path1074"
   data-element-id="element-1429-1761788125776" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#2f528f"
   stroke-width="0.35"
   id="g1076"
   data-element-id="element-1430-1761788125776"
   transform="translate(4)">
<polyline
   points="452.596,413.844 520.405,413.844 520.405,302.307 452.596,302.307 452.596,413.844 "
   id="polyline1075"
   data-element-id="element-1431-1761788125776" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="#0000ff"
   stroke="#0000ff"
   stroke-width="0"
   id="g1079"
   data-element-id="element-1432-1761788125776"
   transform="translate(4)">
<!-- Cooler Design 1 - NO.2 -->
<g
   transform="matrix(0.339,0,0,0.558,452.596,302.307)"
   id="g43">
  <!-- Main Body -->
  <rect
   x="10"
   y="10"
   width="180"
   height="180"
   fill="url(#metalGrad1)"
   stroke="#666666"
   stroke-width="2"
   rx="5"
   id="rect115"
   style="fill:url(#linearGradient57)" />
  
  <!-- Plates -->
  <g
   opacity="0.7"
   id="g37">
    <line
   x1="25"
   y1="20"
   x2="25"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line27" />
    <line
   x1="40"
   y1="20"
   x2="40"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line28" />
    <line
   x1="55"
   y1="20"
   x2="55"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line29" />
    <line
   x1="70"
   y1="20"
   x2="70"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line30" />
    <line
   x1="85"
   y1="20"
   x2="85"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line115" />
    <line
   x1="100"
   y1="20"
   x2="100"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line116" />
    <line
   x1="115"
   y1="20"
   x2="115"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line33" />
    <line
   x1="130"
   y1="20"
   x2="130"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line34" />
    <line
   x1="145"
   y1="20"
   x2="145"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line35" />
    <line
   x1="160"
   y1="20"
   x2="160"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line36" />
    <line
   x1="175"
   y1="20"
   x2="175"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line37" />
  </g>
  
  <!-- HOT IN Left (Top) - y=36 matches 322.754 -->
  <rect
   x="-35"
   y="34"
   width="45"
   height="8"
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1.5"
   rx="1"
   id="rect116"
   style="fill:url(#linearGradient58)" />
  <polygon
   points="15,42 5,38 15,34 "
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1"
   id="polygon37"
   style="fill:url(#linearGradient59)" />
  <!-- Flow animation -->
  <circle
   cx="-15"
   cy="38"
   r="2.5"
   fill="#ffffff"
   id="circle37">
    <animate
   attributeName="cx"
   from="-25"
   to="10"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- COLD OUT Left (Bottom) - y=166 matches ~395 -->
  <rect
   x="-35"
   y="160.41577"
   width="45"
   height="8"
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1.5"
   rx="1"
   id="rect59"
   style="fill:url(#linearGradient60)" />
  <polygon
   points="5,168 15,164 15,172 "
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1"
   id="polygon38"
   style="fill:url(#linearGradient61)"
   transform="translate(0,-3.5842294)" />
  <!-- Flow animation (reverse) -->
  <circle
   cx="5"
   cy="164.41577"
   r="2.5"
   fill="#ffffff"
   id="circle38">
    <animate
   attributeName="cx"
   from="10"
   to="-25"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- HOT IN Right (Top) -->
  <rect
   x="185"
   y="34"
   width="45"
   height="8"
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1.5"
   rx="1"
   id="rect117"
   style="fill:url(#linearGradient62)" />
  <polygon
   points="185,42 195,38 185,34 "
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1"
   id="polygon39"
   style="fill:url(#linearGradient63)" />
  <circle
   cx="215"
   cy="38"
   r="2.5"
   fill="#ffffff"
   id="circle117">
    <animate
   attributeName="cx"
   from="190"
   to="225"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- COLD OUT Right (Bottom) -->
  <rect
   x="185"
   y="160.41577"
   width="45"
   height="8"
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1.5"
   rx="1"
   id="rect118"
   style="fill:url(#linearGradient64)" />
  <polygon
   points="195,168 185,164 185,172 "
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1"
   id="polygon40"
   style="fill:url(#linearGradient65)"
   transform="translate(0,-3.5842294)" />
  <circle
   cx="185"
   cy="164.41577"
   r="2.5"
   fill="#ffffff"
   id="circle40">
    <animate
   attributeName="cx"
   from="225"
   to="190"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- Internal flow indicators -->
  <circle
   cx="40"
   cy="60"
   r="2"
   fill="rgba(255,68,68,0.6)"
   id="circle41">
    <animate
   attributeName="cy"
   from="60"
   to="140"
   dur="2s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="0.6;0.6;0"
   dur="2s"
   repeatCount="indefinite" />
  </circle>
  <circle
   cx="100"
   cy="70"
   r="2"
   fill="rgba(255,68,68,0.6)"
   id="circle59">
    <animate
   attributeName="cy"
   from="70"
   to="150"
   dur="2.2s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="0.6;0.6;0"
   dur="2.2s"
   repeatCount="indefinite" />
  </circle>
  <circle
   cx="150"
   cy="65"
   r="2"
   fill="rgba(255,68,68,0.6)"
   id="circle43">
    <animate
   attributeName="cy"
   from="65"
   to="145"
   dur="1.8s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="0.6;0.6;0"
   dur="1.8s"
   repeatCount="indefinite" />
  </circle>
</g>

</g><text
   transform="scale(1.0010633,0.99893782)"
   font-family="Bahnschrift, sans-serif"
   font-size="11px"
   id="text1081-4"
   data-element-id="element-1442-1761788125776"
   x="490.00989"
   y="339.5191"
   style="fill:#000000;stroke-width:0;fill-opacity:1;stroke:#ff0000;stroke-opacity:1"><tspan
     sodipodi:role="line"
     id="tspan1-8"
     x="490.00989"
     y="339.5191"
     style="text-align:center;text-anchor:middle;fill:#000000;stroke-width:0;fill-opacity:1;stroke:#ff0000;stroke-opacity:1">NO.2</tspan><tspan
     sodipodi:role="line"
     id="tspan2-8"
     x="490.00989"
     y="353.2691"
     style="text-align:center;text-anchor:middle;fill:#000000;stroke-width:0;fill-opacity:1;stroke:#ff0000;stroke-opacity:1">Central</tspan><tspan
     sodipodi:role="line"
     x="490.00989"
     y="367.0191"
     id="tspan3-2"
     style="text-align:center;text-anchor:middle;fill:#000000;stroke-width:0;fill-opacity:1;stroke:#ff0000;stroke-opacity:1">F.W.</tspan><tspan
     sodipodi:role="line"
     x="490.00989"
     y="380.7691"
     id="tspan4-4"
     style="text-align:center;text-anchor:middle;fill:#000000;stroke-width:0;fill-opacity:1;stroke:#ff0000;stroke-opacity:1">CLR</tspan></text>
<g
   clip-path="url(#clipId0)"
   fill="#8faadc"
   stroke="#8faadc"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1080"
   data-element-id="element-1437-1761788125776"
   transform="translate(4)">
<path
   d="m 452.596,269.63 h 67.809 V 158.094 h -67.809 z"
   id="path1079"
   data-element-id="element-1438-1761788125776" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#2f528f"
   stroke-width="0.35"
   id="g1081"
   data-element-id="element-1439-1761788125776"
   transform="translate(4)">
<polyline
   points="452.596,269.63 520.405,269.63 520.405,158.094 452.596,158.094 452.596,269.63 "
   id="polyline1080"
   data-element-id="element-1440-1761788125776" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="#0000ff"
   stroke="#0000ff"
   stroke-width="0"
   id="g1084"
   data-element-id="element-1441-1761788125776"
   transform="translate(4)">
<!-- Cooler Design 1 - NO.1 -->
<g
   transform="matrix(0.339,0,0,0.558,452.596,158.094)"
   id="g77">
  <!-- Main Body -->
  <rect
   x="10"
   y="10"
   width="180"
   height="180"
   fill="url(#metalGrad1)"
   stroke="#666666"
   stroke-width="2"
   rx="5"
   id="rect120"
   style="fill:url(#linearGradient48)" />
  
  <!-- Plates -->
  <g
   opacity="0.7"
   id="g56">
    <line
   x1="25"
   y1="20"
   x2="25"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line43" />
    <line
   x1="40"
   y1="20"
   x2="40"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line44" />
    <line
   x1="55"
   y1="20"
   x2="55"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line120" />
    <line
   x1="70"
   y1="20"
   x2="70"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line121" />
    <line
   x1="85"
   y1="20"
   x2="85"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line47" />
    <line
   x1="100"
   y1="20"
   x2="100"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line48" />
    <line
   x1="115"
   y1="20"
   x2="115"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line49" />
    <line
   x1="130"
   y1="20"
   x2="130"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line50" />
    <line
   x1="145"
   y1="20"
   x2="145"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line51" />
    <line
   x1="160"
   y1="20"
   x2="160"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line52" />
    <line
   x1="175"
   y1="20"
   x2="175"
   y2="180"
   stroke="#888888"
   stroke-width="1.5"
   id="line53" />
  </g>
  
  <!-- HOT IN Left (Top) - y=35 matches 177.88 -->
  <rect
   x="-35"
   y="33"
   width="45"
   height="8"
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1.5"
   rx="1"
   id="rect121"
   style="fill:url(#linearGradient49)" />
  <polygon
   points="15,33 15,41 5,37 "
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1"
   id="polygon58"
   style="fill:url(#linearGradient50)" />
  <!-- Flow animation -->
  <circle
   cx="-15"
   cy="37"
   r="2.5"
   fill="#ffffff"
   id="circle213">
    <animate
   attributeName="cx"
   from="-25"
   to="10"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- COLD OUT Left (Bottom) - y=165 matches ~254 -->
  <rect
   x="-35"
   y="161.22473"
   width="45"
   height="8"
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1.5"
   rx="1"
   id="rect60"
   style="fill:url(#linearGradient51)" />
  <polygon
   points="5,167 15,163 15,171 "
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1"
   id="polygon60"
   style="fill:url(#linearGradient52)"
   transform="translate(0,-1.7752663)" />
  <!-- Flow animation (reverse) -->
  <circle
   cx="5"
   cy="165.22473"
   r="2.5"
   fill="#ffffff"
   id="circle214">
    <animate
   attributeName="cx"
   from="10"
   to="-25"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- HOT IN Right (Top) -->
  <rect
   x="185"
   y="33"
   width="45"
   height="8"
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1.5"
   rx="1"
   id="rect122"
   style="fill:url(#linearGradient53)" />
  <polygon
   points="185,33 185,41 195,37 "
   fill="url(#redFlow1)"
   stroke="#cc0000"
   stroke-width="1"
   id="polygon61"
   style="fill:url(#linearGradient54)" />
  <circle
   cx="215"
   cy="37"
   r="2.5"
   fill="#ffffff"
   id="circle215">
    <animate
   attributeName="cx"
   from="190"
   to="225"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- COLD OUT Right (Bottom) -->
  <rect
   x="185"
   y="161.22473"
   width="45"
   height="8"
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1.5"
   rx="1"
   id="rect215"
   style="fill:url(#linearGradient55)" />
  <polygon
   points="185,171 195,167 185,163 "
   fill="url(#blueFlow1)"
   stroke="#0066cc"
   stroke-width="1"
   id="polygon67"
   style="fill:url(#linearGradient56)"
   transform="translate(0.49626421,-1.6582162)" />
  <circle
   cx="185"
   cy="165.22473"
   r="2.5"
   fill="#ffffff"
   id="circle68">
    <animate
   attributeName="cx"
   from="225"
   to="190"
   dur="1.5s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="1;1;0"
   dur="1.5s"
   repeatCount="indefinite" />
  </circle>
  
  <!-- Internal flow indicators -->
  <circle
   cx="40"
   cy="60"
   r="2"
   fill="rgba(255,68,68,0.6)"
   id="circle69">
    <animate
   attributeName="cy"
   from="60"
   to="140"
   dur="2s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="0.6;0.6;0"
   dur="2s"
   repeatCount="indefinite" />
  </circle>
  <circle
   cx="100"
   cy="70"
   r="2"
   fill="rgba(255,68,68,0.6)"
   id="circle70">
    <animate
   attributeName="cy"
   from="70"
   to="150"
   dur="2.2s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="0.6;0.6;0"
   dur="2.2s"
   repeatCount="indefinite" />
  </circle>
  <circle
   cx="150"
   cy="65"
   r="2"
   fill="rgba(255,68,68,0.6)"
   id="circle71">
    <animate
   attributeName="cy"
   from="65"
   to="145"
   dur="1.8s"
   repeatCount="indefinite" />
    <animate
   attributeName="opacity"
   values="0.6;0.6;0"
   dur="1.8s"
   repeatCount="indefinite" />
  </circle>
</g>
<text
   transform="scale(1.0010633,0.99893782)"
   font-family="Bahnschrift, sans-serif"
   font-size="11px"
   id="text1081"
   data-element-id="element-1442-1761788125776"
   x="486.0144"
   y="193.87593"
   style="fill:#ffffff;stroke-width:0"><tspan
     sodipodi:role="line"
     id="tspan1"
     x="486.0144"
     y="193.87593"
     style="text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke-width:0">NO.1</tspan><tspan
     sodipodi:role="line"
     id="tspan2"
     x="486.0144"
     y="207.62593"
     style="text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke-width:0">Central</tspan><tspan
     sodipodi:role="line"
     x="486.0144"
     y="221.37593"
     id="tspan3"
     style="text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke-width:0">F.W.</tspan><tspan
     sodipodi:role="line"
     x="486.0144"
     y="235.12593"
     id="tspan4"
     style="text-align:center;text-anchor:middle;fill:#000000;fill-opacity:1;stroke-width:0">CLR</tspan></text>
</g>





<g
   clip-path="url(#clipId0)"
   fill="#00b050"
   stroke="#00b050"
   stroke-width="1"
   id="g1122"
   data-element-id="element-1457-1761788125776"
   transform="translate(-4)">
<path
   d="m 372.619,235.736 -0.213,-0.365 0.213,-0.802 z"
   id="path1089"
   data-element-id="element-1458-1761788125776" />
<path
   d="m 372.619,235.736 v -1.167 l 0.811,2.555 z"
   id="path1090"
   data-element-id="element-1459-1761788125776" />
<path
   d="m 373.43,237.124 -0.811,-2.555 0.811,0.212 z"
   id="path1091"
   data-element-id="element-1460-1761788125776" />
<path
   d="m 373.43,237.124 v -2.343 l 1.652,5.175 z"
   id="path1092"
   data-element-id="element-1461-1761788125776" />
<path
   d="m 375.082,239.956 -1.652,-5.175 1.652,2.833 z"
   id="path1093"
   data-element-id="element-1462-1761788125776" />
<path
   d="m 375.082,239.956 v -0.154 l 0.079,0.289 z"
   id="path1094"
   data-element-id="element-1463-1761788125776" />
<path
   d="m 375.161,240.091 -0.079,-0.289 h 0.079 z"
   id="path1095"
   data-element-id="element-1464-1761788125776" />
<path
   d="m 375.082,237.614 v -4.486 l 0.079,4.621 z"
   id="path1096"
   data-element-id="element-1465-1761788125776" />
<path
   d="m 375.161,237.749 -0.079,-4.621 h 0.079 z"
   id="path1097"
   data-element-id="element-1466-1761788125776" />
<path
   d="m 375.161,240.091 v -0.289 l 0.512,1.165 z"
   id="path1098"
   data-element-id="element-1467-1761788125776" />
<path
   d="m 375.673,240.967 -0.512,-1.165 0.512,-0.004 z"
   id="path1099"
   data-element-id="element-1468-1761788125776" />
<path
   d="m 375.673,239.503 h -0.512 l 0.512,-0.877 z"
   id="path1100"
   data-element-id="element-1469-1761788125776" />
<path
   d="m 375.161,237.749 v -4.621 l 0.512,5.498 z"
   id="path1101"
   data-element-id="element-1470-1761788125776" />
<path
   d="m 375.673,238.626 -0.512,-5.498 h 0.512 z"
   id="path1102"
   data-element-id="element-1471-1761788125776" />
<path
   d="m 375.673,240.967 v -1.169 z"
   id="path1103"
   data-element-id="element-1472-1761788125776" />
<path
   d="m 375.673,240.967 v -1.169 0 z"
   id="path1104"
   data-element-id="element-1473-1761788125776" />
<path
   d="m 375.673,239.503 v -0.877 z"
   id="path1105"
   data-element-id="element-1474-1761788125776" />
<path
   d="m 375.673,239.503 v -0.877 0 z"
   id="path1106"
   data-element-id="element-1475-1761788125776" />
<path
   d="m 375.673,238.626 v -5.498 z"
   id="path1107"
   data-element-id="element-1476-1761788125776" />
<path
   d="m 375.673,238.626 v -5.498 0 z"
   id="path1108"
   data-element-id="element-1477-1761788125776" />
<path
   d="m 375.673,240.967 v -1.169 l 0.511,0.293 z"
   id="path1109"
   data-element-id="element-1478-1761788125776" />
<path
   d="m 376.184,240.091 -0.511,-0.293 0.511,-0.003 z"
   id="path1110"
   data-element-id="element-1479-1761788125776" />
<path
   d="m 375.673,239.503 v -0.877 l 0.511,0.877 z"
   id="path1111"
   data-element-id="element-1480-1761788125776" />
<path
   d="m 375.673,238.626 v -5.498 l 0.511,4.621 z"
   id="path1112"
   data-element-id="element-1481-1761788125776" />
<path
   d="m 376.184,237.749 -0.511,-4.621 h 0.511 z"
   id="path1113"
   data-element-id="element-1482-1761788125776" />
<path
   d="m 376.184,240.091 v -0.296 l 0.079,0.161 z"
   id="path1114"
   data-element-id="element-1483-1761788125776" />
<path
   d="m 376.263,239.956 -0.079,-0.161 h 0.079 z"
   id="path1115"
   data-element-id="element-1484-1761788125776" />
<path
   d="m 376.184,237.749 v -4.621 l 0.079,4.486 z"
   id="path1116"
   data-element-id="element-1485-1761788125776" />
<path
   d="m 376.263,237.614 -0.079,-4.486 h 0.079 z"
   id="path1117"
   data-element-id="element-1486-1761788125776" />
<path
   d="m 376.263,239.956 v -2.342 l 1.653,-0.49 z"
   id="path1118"
   data-element-id="element-1487-1761788125776" />
<path
   d="m 377.916,237.124 -1.653,0.49 1.653,-2.833 z"
   id="path1119"
   data-element-id="element-1488-1761788125776" />
<path
   d="m 377.916,237.124 v -2.343 l 0.81,0.955 z"
   id="path1120"
   data-element-id="element-1489-1761788125776" />
<path
   d="m 378.726,235.736 -0.81,-0.955 0.81,-0.212 z"
   id="path1121"
   data-element-id="element-1490-1761788125776" />
<path
   d="m 378.726,235.736 v -1.167 l 0.213,0.802 z"
   id="path1122"
   data-element-id="element-1491-1761788125776" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.7"
   id="g1123"
   data-element-id="element-1492-1761788125776"
   style="cursor: pointer;">
<polyline
   points="543.685,162.58 543.685,177.313 "
   id="polyline1122"
   data-element-id="element-1493-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,0,0)"
   stroke-width="0.7"
   id="g1124"
   data-element-id="element-1494-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="543.78,140.764 543.78,129.147 594.212,129.147 "
   id="polyline1123"
   data-element-id="element-1495-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ff0000"
   stroke-width="0.53"
   id="g1125"
   data-element-id="element-1496-1761788125776"
   transform="translate(8,-4)">
<g
   transform="translate(534.92,156.221)"
   id="g16">
<circle
   cx="0"
   cy="0"
   r="12"
   fill="#ecf0f1"
   stroke="#95a5a6"
   stroke-width="1.5"
   id="circle216" />
<rect
   x="-3"
   y="-8"
   width="6"
   height="10"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   rx="1"
   id="rect216" />
<circle
   cx="0"
   cy="4"
   r="3.5"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   id="circle16">
<animate
   attributeName="r"
   values="3.5;4.2;3.5"
   dur="2s"
   repeatCount="indefinite" />
</circle>
</g>
</g>
<text
   transform="scale(1.001461,0.99854113)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0625px"
   id="text1125"
   data-element-id="element-1499-1761788125776"
   style="fill:#ffffff;stroke:#ff0000;stroke-width:0;fill-opacity:1"
   x="568.08978"
   y="141.20599">TX2</text><text
   transform="scale(1.0012395,0.998762)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0601px"
   id="text1126"
   data-element-id="element-1500-1761788125776"
   style="fill:#ffffff;stroke:#ff0000;stroke-width:0;fill-opacity:1"
   x="595.47491"
   y="132.96661">To ESS</text>


<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g1127"
   data-element-id="element-1501-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:0.49803904;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="540.569,168.247 547.085,168.247 "
   id="polyline1126"
   data-element-id="element-1502-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:0.49803904;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="540.569,170.608 547.085,170.608 "
   id="polyline1127"
   data-element-id="element-1503-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:0.49803904;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.53"
   id="g1128"
   data-element-id="element-1504-1761788125776"
   style="cursor:pointer;stroke:#000000;stroke-opacity:1">
<polyline
   points="540.569,169.38 547.085,169.38 "
   id="polyline1128"
   data-element-id="element-1505-1761788125776"
   style="cursor:pointer;stroke:#000000;stroke-opacity:1" />
</g>

















<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g1145"
   data-element-id="element-1537-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="543.685,307.36 543.685,322.093 "
   id="polyline1144"
   data-element-id="element-1538-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ff0000"
   stroke-width="0.7"
   id="g1146"
   data-element-id="element-1539-1761788125776"
   transform="translate(0,-4)"
   style="stroke:#ffffff;stroke-opacity:1">
<polyline
   points="543.78,285.638 543.78,277.989 587.412,277.989 "
   id="polyline1145"
   data-element-id="element-1540-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ff0000"
   stroke-width="0.53"
   id="g1147"
   data-element-id="element-1541-1761788125776"
   transform="translate(8,-6)">
<g
   transform="translate(534.826,301.027)"
   id="g28">
<circle
   cx="0"
   cy="0"
   r="12"
   fill="#ecf0f1"
   stroke="#95a5a6"
   stroke-width="1.5"
   id="circle162" />
<rect
   x="-3"
   y="-8"
   width="6"
   height="10"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   rx="1"
   id="rect162" />
<circle
   cx="0"
   cy="4"
   r="3.5"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   id="circle28">
<animate
   attributeName="r"
   values="3.5;4.2;3.5"
   dur="2s"
   repeatCount="indefinite" />
</circle>
</g>
</g>
<text
   transform="scale(1.0018371,0.99816627)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0667px"
   id="text1147"
   data-element-id="element-1544-1761788125776"
   style="fill:#ffffff;stroke:#ff0000;stroke-width:0;fill-opacity:1"
   x="567.78302"
   y="288.52908">TX3</text><text
   transform="scale(1.0012395,0.99876203)"
   font-family="Bahnschrift, sans-serif"
   font-size="11.0601px"
   id="text1148"
   data-element-id="element-1545-1761788125776"
   style="fill:#ffffff;fill-opacity:1;stroke:#ff0000;stroke-width:0"
   x="551.83398"
   y="271.87961">To ESS</text>


<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g1149"
   data-element-id="element-1546-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="540.569,313.121 547.085,313.121 "
   id="polyline1148"
   data-element-id="element-1547-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="540.569,315.482 547.085,315.482 "
   id="polyline1149"
   data-element-id="element-1548-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.53"
   id="g1150"
   data-element-id="element-1549-1761788125776"
   style="cursor:pointer;stroke:#000000;stroke-opacity:1">
<polyline
   points="540.569,314.349 547.085,314.349 "
   id="polyline1150"
   data-element-id="element-1550-1761788125776"
   style="cursor:pointer;stroke:#000000;stroke-opacity:1" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#ff0000"
   stroke-width="0.53"
   id="g1151"
   data-element-id="element-1551-1761788125776"
   transform="translate(12,-4)">
<g
   transform="translate(435.96,456.534)"
   id="g30">
<circle
   cx="0"
   cy="0"
   r="12"
   fill="#ecf0f1"
   stroke="#95a5a6"
   stroke-width="1.5"
   id="circle29" />
<rect
   x="-3"
   y="-8"
   width="6"
   height="10"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   rx="1"
   id="rect163" />
<circle
   cx="0"
   cy="4"
   r="3.5"
   fill="#e74c3c"
   stroke="#c0392b"
   stroke-width="0.8"
   id="circle30">
<animate
   attributeName="r"
   values="3.5;4.2;3.5"
   dur="2s"
   repeatCount="indefinite" />
</circle>
</g>
</g>
<g
   clip-path="url(#clipId0)"
   fill="#ff0000"
   stroke="#ff0000"
   stroke-width="0"
   id="g1152"
   data-element-id="element-1553-1761788125776"
   transform="translate(34,4)"
   style="fill:#ffffff;fill-opacity:1">
<text
   transform="matrix(7.87402,0,0,7.84489,435.96,443)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text1151"
   data-element-id="element-1554-1761788125776"
   style="fill:#ffffff;fill-opacity:1">TX5</text>
</g><g
   clip-path="url(#clipId0-98-7-1)"
   fill="#ff0000"
   stroke="#ff0000"
   stroke-width="0"
   id="g1152-7-9-6"
   data-element-id="element-1553-1761788125776"
   transform="translate(391.178,68.087481)"
   style="fill:#ffffff;fill-opacity:1"
   inkscape:transform-center-x="-13.799255"
   inkscape:transform-center-y="-64.713748">

</g>
<polyline
   points="410.144,452.707 433.188,452.707 "
   id="polyline1152"
   data-element-id="element-1556-1761788125776"
   style="fill:none;stroke:#ffffff;stroke-width:0.7;stroke-opacity:1"
   transform="matrix(1.0851712,0,0,1,-34.90264,0)" /><polyline
   points="456.421,452.707 505.247,452.707 "
   id="polyline1153"
   data-element-id="element-1557-1761788125776"
   style="fill:none;stroke:#ffffff;stroke-width:0.7;stroke-opacity:1"
   transform="translate(4)" />


<g
   clip-path="url(#clipId0)"
   fill="rgb(255,0,0)"
   stroke="rgb(255,0,0)"
   stroke-width="0"
   id="g1154"
   data-element-id="element-1558-1761788125776"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">
<text
   transform="matrix(7.86435,0,0,7.84489,468.354,464.279)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text1153"
   data-element-id="element-1559-1761788125776"
   style="fill:#ffffff;fill-opacity:1">To ESS for</text>
</g>

<text
   transform="scale(1.0002457,0.99975436)"
   font-family="Calibri, sans-serif"
   font-weight="bold"
   font-size="14.1692px"
   id="text1157"
   data-element-id="element-1566-1761788125776"
   style="fill:#ffffff;stroke:#ffffff;stroke-width:0"
   x="492.09509"
   y="513.03802">Main Cooling</text><text
   transform="scale(0.98491222,1.0153189)"
   font-family="Calibri, sans-serif"
   font-weight="bold"
   font-size="13.9706px"
   id="text1158"
   data-element-id="element-1567-1761788125776"
   style="fill:#ffffff;stroke:#ffffff;stroke-width:0"
   x="503.03064"
   y="521.91974">S.W. Pump</text><text
   transform="scale(0.9910849,1.0089953)"
   font-family="Calibri, sans-serif"
   font-weight="bold"
   font-size="14.0395px"
   id="text1159"
   data-element-id="element-1568-1761788125776"
   style="fill:#ffffff;stroke:#ffffff;stroke-width:0"
   x="257.66409"
   y="327.03424">LT Cooling</text><text
   transform="scale(0.9768332,1.0237162)"
   font-family="Calibri, sans-serif"
   font-weight="bold"
   font-size="13.8376px"
   id="text1160"
   data-element-id="element-1569-1761788125776"
   style="fill:#ffffff;stroke:#ffffff;stroke-width:0"
   x="261.45099"
   y="338.93768">F.W. Pump</text>


<g
   id="g217"
   transform="translate(0,4)"
   style="stroke:#ffffff;stroke-opacity:1"><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="#000000"
     stroke-width="0.7"
     id="g1157"
     data-element-id="element-1560-1761788125776"
     style="stroke:#ffffff;stroke-opacity:1">
<polyline
   points="881.694,561.41 808.124,561.41 "
   id="polyline1154"
   data-element-id="element-1561-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="707.732,562.26 709.018,559.456 712.123,558.293 715.228,559.456 716.515,562.26 "
   id="polyline1155"
   data-element-id="element-1562-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="799.341,562.449 716.231,562.449 "
   id="polyline1156"
   data-element-id="element-1563-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="707.921,562.165 617.162,562.165 "
   id="polyline1157"
   data-element-id="element-1564-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="#000000"
     stroke-width="0.7"
     id="g1161"
     data-element-id="element-1570-1761788125776"
     style="stroke:#ffffff;stroke-opacity:1">
<polyline
   points="799.057,562.26 800.344,559.456 803.449,558.293 806.554,559.456 807.841,562.26 "
   id="polyline1160"
   data-element-id="element-1571-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
</g></g>




<g
   id="g222"
   transform="translate(0,8)"><g
     transform="matrix(0.32,0,0,0.26,610.5,540.61)"
     id="g173"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect164" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect165"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect166"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect167" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect168"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse168" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse169" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line169" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line170" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle173" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse173"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect173" /></g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g1167"
   data-element-id="element-1583-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1">
<polyline
   points="799.907,577.985 801.194,575.145 804.299,573.971 807.404,575.145 808.691,577.985 "
   id="polyline1166"
   data-element-id="element-1584-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="799.53,578.315 711.982,578.315 "
   id="polyline1167"
   data-element-id="element-1585-1761788125776"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1170"
   data-element-id="element-1589-1761788125776"
   style="cursor: pointer;">
<path
   d="M717.459,573.971 722.937,577.748 717.459,581.526 717.459,581.526 z"
   id="path1169"
   data-element-id="element-1590-1761788125776"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1172"
   data-element-id="element-1593-1761788125776"
   style="cursor: pointer;">
<path
   d="M728.509,581.526 722.937,577.748 728.509,573.971 728.509,573.971 z"
   id="path1171"
   data-element-id="element-1594-1761788125776"
   style="cursor: pointer;" />
</g>
<g
   id="g210"
   transform="translate(0,4)"><g
     transform="matrix(0.32,0,0,0.26,705.03,556.38)"
     id="g184"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect174" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect175"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect176"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect177" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect178"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse178" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse179" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line179" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line180" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle180" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse180"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect180" /></g></g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.7"
   id="g1174"
   data-element-id="element-1597-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1"
   transform="matrix(0.98498802,0,0,1.0003887,12.08077,-0.22734624)">
<polyline
   points="883.017,578.315 809.446,578.315 "
   id="polyline1173"
   data-element-id="element-1598-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
<polyline
   points="882.922,591.537 804.913,591.537 "
   id="polyline1174"
   data-element-id="element-1599-1761788125776"
   style="stroke:#ffffff;stroke-opacity:1" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1177"
   data-element-id="element-1603-1761788125777"
   style="cursor: pointer;">
<path
   d="M812.94,588.137 818.418,591.915 812.94,595.692 812.94,595.692 z"
   id="path1176"
   data-element-id="element-1604-1761788125777"
   style="cursor: pointer;" />
</g>

<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g1179"
   data-element-id="element-1607-1761788125777"
   style="cursor: pointer;">
<path
   d="M823.99,595.692 818.418,591.915 823.99,588.137 823.99,588.137 z"
   id="path1178"
   data-element-id="element-1608-1761788125777"
   style="cursor: pointer;" />
</g>
<g
   id="g212"
   transform="translate(0,4)"><g
     transform="matrix(0.32,0,0,0.26,800.51,570.55)"
     id="g194"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect184" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect185"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect186"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect187" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect188"
       style="fill:#ffffff;fill-opacity:0.49803904" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse188" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse189" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line189" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line190" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle190" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse190"
       style="fill:#ffffff;fill-opacity:0.49803904" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect194" /></g></g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g1185"
   data-element-id="element-1611-1761788125777"
   style="cursor: pointer;">
<text
   transform="matrix(9.00314,0,0,8.99231,131.062,650.571)"
   font-family="Calibri, sans-serif"
   font-weight="bold"
   font-size="1.57532px"
   id="text1180"
   data-element-id="element-1612-1761788125777"><tspan
     style="fill:#ffffff;fill-opacity:1"
     id="tspan76">High</tspan></text>
<text
   transform="matrix(9.01045,0,0,8.99231,108.302,667.57)"
   font-family="Calibri, sans-serif"
   font-weight="bold"
   font-size="1.57532px"
   id="text1181"
   data-element-id="element-1613-1761788125777"><tspan
     style="fill:#ffffff;fill-opacity:1"
     id="tspan78">Sea</tspan></text>
<text
   transform="matrix(8.971,0,0,8.99231,132.286,667.577)"
   font-family="Calibri, sans-serif"
   font-weight="bold"
   font-size="1.57532px"
   id="text1182"
   data-element-id="element-1614-1761788125777"><tspan
     style="fill:#ffffff;fill-opacity:1"
     id="tspan77">Chest(P)</tspan></text>
<text
   transform="matrix(8.9835 0 -0 9.0043 953.674 673.274)"
   font-family="Calibri,'sans-serif'"
   font-weight="bold"
   font-size="1.57532"
   id="text1183"
   data-element-id="element-1615-1761788125777"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">Low</text>
<text
   transform="matrix(9.01045 0 -0 8.99231 930.91 690.293)"
   font-family="Calibri,'sans-serif'"
   font-weight="bold"
   font-size="1.57532"
   id="text1184"
   data-element-id="element-1616-1761788125777"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">Sea</text>
<text
   transform="matrix(8.97242 0 -0 8.99231 954.894 690.3)"
   font-family="Calibri,'sans-serif'"
   font-weight="bold"
   font-size="1.57532"
   id="text1185"
   data-element-id="element-1617-1761788125777"
   style="cursor:pointer;fill:#ffffff;fill-opacity:1">Chest(S)</text>
</g>














<g
   clip-path="url(#clipId0)"
   fill="#0000ff"
   stroke="#0000ff"
   stroke-width="0"
   id="g1264"
   data-element-id="element-1717-1761788125777"
   transform="translate(-62,-36)">
<text
   transform="matrix(6.71726,0,0,6.70503,304.547,488.51)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text1263"
   data-element-id="element-1718-1761788125777">NO</text>
<text
   transform="matrix(6.74281,0,0,6.70503,317.312,488.508)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text1264"
   data-element-id="element-1719-1761788125777">.2</text>
</g>





<g
   clip-path="url(#clipId0)"
   fill="#0000ff"
   stroke="#0000ff"
   stroke-width="0"
   id="g1292"
   data-element-id="element-1753-1761788125777"
   transform="translate(-62,-36)">
<text
   transform="matrix(6.71726,0,0,6.70503,304.547,575.342)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text1291"
   data-element-id="element-1754-1761788125777">NO</text>
<text
   transform="matrix(6.74281,0,0,6.70503,317.312,575.34)"
   font-family="Bahnschrift, sans-serif"
   font-size="1.4081px"
   id="text1292"
   data-element-id="element-1755-1761788125777">.3</text>
</g>











































<text
   xml:space="preserve"
   id="text11"
   style="text-align:start;writing-mode:lr-tb;direction:ltr;white-space:pre;shape-inside:url(#rect11);display:inline;fill:#ffffff" /><g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="#000000"
   stroke-width="0.53"
   id="g78"
   data-element-id="element-107-1761788125775"
   transform="matrix(0.78530909,0,0,0.81148132,203.11445,11.073799)">
<!-- 3-Way Valve -->
<g
   id="valve_3way"
   transform="translate(239.54118,543.45621)">
    <defs
   id="defs17">
        <linearGradient
   id="bodyGrad_valve"
   x1="-8.1999998"
   y1="-8.1999998"
   x2="8.1999998"
   y2="8.1999998"
   gradientUnits="userSpaceOnUse">
            <stop
   offset="0%"
   style="stop-color:#d0d0d0;stop-opacity:1"
   id="stop65" />
            <stop
   offset="50%"
   style="stop-color:#f0f0f0;stop-opacity:1"
   id="stop66" />
            <stop
   offset="100%"
   style="stop-color:#b0b0b0;stop-opacity:1"
   id="stop67" />
        </linearGradient>
        <linearGradient
   id="blueFlow_valve"
   x1="0"
   y1="0"
   x2="1"
   y2="0">
            <stop
   offset="0%"
   style="stop-color:#00b0f0;stop-opacity:1"
   id="stop68" />
            <stop
   offset="100%"
   style="stop-color:#0077b6;stop-opacity:1"
   id="stop69" />
        </linearGradient>
        <linearGradient
   id="redFlow_valve"
   x1="0"
   y1="0"
   x2="1"
   y2="0">
            <stop
   offset="0%"
   style="stop-color:#ff4444;stop-opacity:1"
   id="stop70" />
            <stop
   offset="100%"
   style="stop-color:#cc0000;stop-opacity:1"
   id="stop71" />
        </linearGradient>
        <radialGradient
   id="mixingGrad_valve"
   cx="0"
   cy="0"
   fx="0"
   fy="0"
   r="5.625"
   gradientUnits="userSpaceOnUse">
            <stop
   offset="0%"
   style="stop-color:#ff6b6b;stop-opacity:0.5"
   id="stop72" />
            <stop
   offset="50%"
   style="stop-color:#a855f7;stop-opacity:0.5"
   id="stop73" />
            <stop
   offset="100%"
   style="stop-color:#3b82f6;stop-opacity:0.7"
   id="stop74" />
        </radialGradient>
    </defs>
    
    <!-- Central Body -->
    <circle
   cx="0"
   cy="0"
   r="8"
   fill="url(#bodyGrad_valve)"
   stroke="#555555"
   stroke-width="0.4"
   id="circle17"
   style="fill:url(#bodyGrad_valve)" />
    
    <!-- Mixing chamber -->
    <circle
   cx="0"
   cy="0"
   r="5.5"
   fill="url(#mixingGrad_valve)"
   stroke="#666666"
   stroke-width="0.25"
   id="circle18"
   style="fill:url(#mixingGrad_valve)" />
    
    <!-- Valve element -->
    <circle
   cx="0"
   cy="0"
   r="3.4000001"
   fill="#ffd700"
   stroke="#cc8800"
   stroke-width="0.25"
   id="circle222" />
    
    <!-- TOP: Controller -->
    <rect
   x="-3.7"
   y="-15.6"
   width="7.4000001"
   height="8.6000004"
   fill="#34495e"
   stroke="#2c3e50"
   stroke-width="0.37"
   rx="0.60000002"
   id="rect196"
   style="fill:#adbfd2;fill-opacity:1;stroke:#6b8dad;stroke-opacity:1" />
    <circle
   cx="0"
   y="-11.3"
   r="2.5"
   fill="#3498db"
   stroke="#2980b9"
   stroke-width="0.25"
   id="circle223"
   cy="0" />
    <rect
   x="-2.5"
   y="-8.8000002"
   width="2.5"
   height="6.8000002"
   fill="#95a5a6"
   stroke="#7f8c8d"
   stroke-width="0.25"
   id="rect197" />
    
    <!-- LEFT: HOT IN -->
    <rect
   x="-20"
   y="-2.5"
   width="12.9"
   height="5"
   fill="url(#redFlow_valve)"
   stroke="#cc0000"
   stroke-width="0.37"
   rx="0.37"
   id="rect223"
   style="fill:url(#linearGradient77)" />
    <polygon
   points="-5.8,1.2 -7.5,0 -5.8,-1.2 "
   fill="url(#redFlow_valve)"
   stroke="#cc0000"
   stroke-width="0.25"
   id="polygon21"
   style="fill:url(#linearGradient78)" />
    <circle
   cx="-12"
   cy="0"
   r="1.5"
   fill="#ffffff"
   id="circle224">
        <animate
   attributeName="cx"
   from="-18"
   to="-6"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    
    <!-- RIGHT: COLD IN -->
    <rect
   x="7.5"
   y="-2.5"
   width="12.9"
   height="5"
   fill="url(#blueFlow_valve)"
   stroke="#0066cc"
   stroke-width="0.37"
   rx="0.37"
   id="rect198"
   style="fill:url(#linearGradient79)" />
    <polygon
   points="5.8,1.2 7.5,0 5.8,-1.2 "
   fill="url(#blueFlow_valve)"
   stroke="#0066cc"
   stroke-width="0.25"
   id="polygon22"
   style="fill:url(#linearGradient80)" />
    <circle
   cx="14"
   cy="0"
   r="1.5"
   fill="#ffffff"
   id="circle22">
        <animate
   attributeName="cx"
   from="19"
   to="8"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    
    <!-- BOTTOM: COLD OUT -->
    <rect
   x="-2.5"
   y="8"
   width="5"
   height="11.7"
   fill="url(#blueFlow_valve)"
   stroke="#0066cc"
   stroke-width="0.37"
   rx="0.37"
   id="rect199"
   style="fill:url(#linearGradient81)" />
    <polygon
   points="1.2,6.5 0,8.2 -1.2,6.5 "
   fill="url(#blueFlow_valve)"
   stroke="#0066cc"
   stroke-width="0.25"
   id="polygon23"
   style="fill:url(#linearGradient82)" />
    <circle
   cx="0"
   cy="11"
   r="1.5"
   fill="#ffffff"
   id="circle23">
        <animate
   attributeName="cy"
   from="7"
   to="18.5"
   dur="2s"
   repeatCount="indefinite" />
    </circle>
    
    <!-- Control panel -->
    <rect
   x="9"
   y="-10.3"
   width="8.6000004"
   height="5.5"
   fill="#ecf0f1"
   stroke="#bdc3c7"
   stroke-width="0.25"
   rx="0.5"
   id="rect113" />
    <circle
   cx="11"
   cy="-7.8000002"
   r="0.69999999"
   fill="#27ae60"
   id="circle24"
   style="stroke:#ffffff;stroke-opacity:1" />
    <rect
   x="9.8000002"
   y="-5.6999998"
   width="3.0999999"
   height="1.2"
   fill="#ff4444"
   id="rect200"
   style="stroke:#ffffff;stroke-opacity:0.49803904" />
    <rect
   x="12.9"
   y="-5.6999998"
   width="3.7"
   height="1.2"
   fill="#00b0f0"
   id="rect201"
   style="stroke:#ffffff;stroke-opacity:0.49803904" />
</g>

</g><g
   id="g152-4"
   transform="translate(82.029219,9.2566545)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7" /></g></g><g
   id="g152-4-4"
   transform="translate(79.653754,-63.445941)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8-2"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8-3" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2-2"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4-2"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5-1" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5-6"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1-8" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7-5" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1-7" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1-6" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5-1" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2-8"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7-9" /></g></g><g
   id="g152-4-9"
   transform="translate(79.220058,-136.28928)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8-5"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8-4" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2-3"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4-1"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5-2" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5-3"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1-3" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7-4" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1-1" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1-1" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5-3" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2-87"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7-4" /></g></g><g
   id="g152-4-7"
   transform="translate(77.285868,-208.28928)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8-9"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8-31" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2-9"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4-8"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5-6" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5-5"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1-0" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7-2" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1-8" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1-60" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5-2" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2-4"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7-8" /></g></g><g
   id="g152-4-09"
   transform="translate(215.02461,8.0471871)"><g
     transform="matrix(0.32,0,0,0.26,330.66,367.5)"
     id="g7-8-4"><rect
       x="40"
       y="50"
       width="40"
       height="40"
       rx="4"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2.5"
       id="rect1-8-78" /><rect
       x="42"
       y="52"
       width="36"
       height="8"
       fill="rgba(255,255,255,0.4)"
       id="rect2-2-35"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="42"
       y="80"
       width="36"
       height="8"
       fill="rgba(0,0,0,0.15)"
       id="rect3-4-12"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="52"
       y="30"
       width="16"
       height="22"
       rx="2"
       fill="#d0d0d0"
       stroke="#707070"
       stroke-width="2"
       id="rect4-5-0" /><rect
       x="53"
       y="31"
       width="14"
       height="5"
       fill="rgba(255,255,255,0.4)"
       id="rect5-5-1"
       style="fill:#ffffff;fill-opacity:0.498039" /><ellipse
       cx="60"
       cy="20"
       rx="20"
       ry="9"
       fill="#ff8c00"
       stroke="#cc5500"
       stroke-width="2.5"
       id="ellipse5-1-6" /><ellipse
       cx="60"
       cy="17"
       rx="18"
       ry="7"
       fill="#ff7f00"
       id="ellipse6-7-40" /><line
       x1="42"
       y1="17"
       x2="78"
       y2="17"
       stroke="#994400"
       stroke-width="3"
       id="line6-1-61" /><line
       x1="60"
       y1="9"
       x2="60"
       y2="25"
       stroke="#994400"
       stroke-width="3"
       id="line7-1-8" /><circle
       cx="60"
       cy="17"
       r="4"
       fill="#ff7f00"
       id="circle7-5-9" /><ellipse
       cx="60"
       cy="14"
       rx="10"
       ry="3"
       fill="rgba(255,255,255,0.5)"
       id="ellipse7-2-84"
       style="fill:#ffffff;fill-opacity:0.498039" /><rect
       x="57"
       y="24"
       width="6"
       height="8"
       fill="#a8a8a8"
       stroke="#707070"
       stroke-width="1"
       id="rect7-7-14" /></g></g><g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g482"
   data-element-id="element-757-1761788125776"
   style="cursor:pointer;fill:#000000;fill-opacity:1;stroke:#ffffff;stroke-opacity:0.49803904">
<path
   d="M171.677,497.284 167.9,502.761 164.122,497.284 164.122,497.284 z"
   id="path481"
   data-element-id="element-758-1761788125776"
   style="cursor:pointer;fill:#000000;fill-opacity:1;stroke:#ffffff;stroke-opacity:0.49803904" />
</g><g
   id="g220"
   style="stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1"><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g141"
     data-element-id="element-236-1761788125775"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="778.469,359.87 778.469,352.976 "
   id="polyline140"
   data-element-id="element-237-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
<polyline
   points="774.691,352.787 782.247,352.787 "
   id="polyline141"
   data-element-id="element-238-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g143"
     data-element-id="element-241-1761788125775"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="772.897,355.715 778.375,359.492 772.897,363.27 772.897,355.715 "
   id="polyline142"
   data-element-id="element-242-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g><g
     clip-path="url(#clipId0)"
     fill="none"
     stroke="rgb(0,0,0)"
     stroke-width="0.53"
     id="g145"
     data-element-id="element-245-1761788125775"
     style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="783.947,363.27 778.375,359.492 783.947,355.715 783.947,363.27 "
   id="polyline144"
   data-element-id="element-246-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g></g><g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g206"
   data-element-id="element-339-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="929.238,246.689 934.346,252.662 926.649,254.236 929.238,246.689 "
   id="polyline205"
   data-element-id="element-340-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g><g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.53"
   id="g211"
   data-element-id="element-343-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1">
<polyline
   points="939.462,258.636 934.346,252.662 942.051,251.088 939.462,258.636 "
   id="polyline207"
   data-element-id="element-344-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
<polyline
   points="932.898,242.612 941.429,245.54 "
   id="polyline208"
   data-element-id="element-345-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
<polyline
   points="933.378,240.629 942.279,243.682 "
   id="polyline209"
   data-element-id="element-346-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
<polyline
   points="942.09,243.619 940.76,247.499 "
   id="polyline210"
   data-element-id="element-347-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
<polyline
   points="933.764,240.77 932.434,244.65 "
   id="polyline211"
   data-element-id="element-348-1761788125775"
   style="cursor:pointer;stroke:#ffffff;stroke-opacity:1;fill:#000000;fill-opacity:1" />
</g></svg>
`;function Gd({sensors:n={},pumps:e=[],onPumpCommand:t}){var h,k,z;const i=I.useRef(null),[l,a]=I.useState(!1),[s,o]=I.useState(null);I.useEffect(()=>{if(i.current&&!l){i.current.innerHTML=Vd;const x=i.current.querySelector("svg");if(x){const E=x.querySelector("defs")||document.createElementNS("http://www.w3.org/2000/svg","defs");x.querySelector("defs")||x.insertBefore(E,x.firstChild);const c=document.createElementNS("http://www.w3.org/2000/svg","filter");c.setAttribute("id","sensorValueGlow"),c.setAttribute("x","-50%"),c.setAttribute("y","-50%"),c.setAttribute("width","200%"),c.setAttribute("height","200%");const p=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");p.setAttribute("in","SourceAlpha"),p.setAttribute("stdDeviation","2"),p.setAttribute("result","blur");const u=document.createElementNS("http://www.w3.org/2000/svg","feOffset");u.setAttribute("in","blur"),u.setAttribute("dx","0"),u.setAttribute("dy","1"),u.setAttribute("result","offsetBlur");const g=document.createElementNS("http://www.w3.org/2000/svg","feFlood");g.setAttribute("flood-color","#22d3ee"),g.setAttribute("flood-opacity","0.4"),g.setAttribute("result","color");const N=document.createElementNS("http://www.w3.org/2000/svg","feComposite");N.setAttribute("in","color"),N.setAttribute("in2","offsetBlur"),N.setAttribute("operator","in"),N.setAttribute("result","shadow");const M=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),C=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");C.setAttribute("in","shadow");const j=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");j.setAttribute("in","SourceGraphic"),M.appendChild(C),M.appendChild(j),c.appendChild(p),c.appendChild(u),c.appendChild(g),c.appendChild(N),c.appendChild(M),E.appendChild(c);const v=document.createElementNS("http://www.w3.org/2000/svg","filter");v.setAttribute("id","textGlow"),v.setAttribute("x","-50%"),v.setAttribute("y","-50%"),v.setAttribute("width","200%"),v.setAttribute("height","200%");const _=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");_.setAttribute("in","SourceGraphic"),_.setAttribute("stdDeviation","1.5"),_.setAttribute("result","blur");const L=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),U=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");U.setAttribute("in","blur");const V=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");V.setAttribute("in","SourceGraphic"),L.appendChild(U),L.appendChild(V),v.appendChild(_),v.appendChild(L),E.appendChild(v)}a(!0),d()}},[]);const d=()=>{if(!i.current)return;const x=i.current.querySelector("svg");if(!x)return;[{index:0,name:"LT Pump No.1",x:240,y:360,width:65,height:60},{index:1,name:"LT Pump No.2",x:240,y:447,width:65,height:60},{index:2,name:"LT Pump No.3",x:240,y:557,width:65,height:60},{index:3,name:"SW Pump No.1",x:585,y:478,width:65,height:60},{index:4,name:"SW Pump No.2",x:680,y:478,width:65,height:60},{index:5,name:"SW Pump No.3",x:770,y:478,width:65,height:60}].forEach(c=>{const p=document.createElementNS("http://www.w3.org/2000/svg","rect");p.setAttribute("x",c.x),p.setAttribute("y",c.y),p.setAttribute("width",c.width),p.setAttribute("height",c.height),p.setAttribute("fill","transparent"),p.setAttribute("cursor","pointer"),p.setAttribute("data-pump-index",c.index),p.addEventListener("click",()=>{f(c.index)}),x.appendChild(p)})},f=x=>{e[x]&&(o({...e[x],index:x}),console.log(`펌프 ${x} 클릭됨`))};I.useEffect(()=>{s&&e[s.index]&&o(x=>({...e[x.index],index:x.index}))},[e]),I.useEffect(()=>{l&&y()},[n,e,l]);const y=()=>{if(!i.current)return;const x=i.current.querySelector("svg");if(!x){console.warn("SVG 요소를 찾을 수 없습니다");return}console.log("📊 데이터 업데이트:",{sensors:n,pumps:e}),(()=>{const c=x.querySelector("defs")||document.createElementNS("http://www.w3.org/2000/svg","defs");if(!x.querySelector("#glassGlow")){const p=document.createElementNS("http://www.w3.org/2000/svg","filter");p.setAttribute("id","glassGlow"),p.setAttribute("x","-50%"),p.setAttribute("y","-50%"),p.setAttribute("width","200%"),p.setAttribute("height","200%");const u=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");u.setAttribute("stdDeviation","1"),u.setAttribute("result","coloredBlur");const g=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),N=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");N.setAttribute("in","coloredBlur");const M=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");M.setAttribute("in","SourceGraphic"),g.appendChild(N),g.appendChild(M),p.appendChild(u),p.appendChild(g),c.appendChild(p)}if(!x.querySelector("#neonGlow")){const p=document.createElementNS("http://www.w3.org/2000/svg","filter");p.setAttribute("id","neonGlow"),p.setAttribute("x","-50%"),p.setAttribute("y","-50%"),p.setAttribute("width","200%"),p.setAttribute("height","200%");const u=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");u.setAttribute("stdDeviation","2.5"),u.setAttribute("result","coloredBlur");const g=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),N=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");N.setAttribute("in","coloredBlur");const M=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");M.setAttribute("in","SourceGraphic"),g.appendChild(N),g.appendChild(M),p.appendChild(u),p.appendChild(g),c.appendChild(p)}if(!x.querySelector("#cardShadow")){const p=document.createElementNS("http://www.w3.org/2000/svg","filter");p.setAttribute("id","cardShadow"),p.setAttribute("x","-50%"),p.setAttribute("y","-50%"),p.setAttribute("width","200%"),p.setAttribute("height","200%");const u=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");u.setAttribute("stdDeviation","1.5"),u.setAttribute("result","coloredBlur");const g=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),N=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");N.setAttribute("in","coloredBlur");const M=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");M.setAttribute("in","SourceGraphic"),g.appendChild(N),g.appendChild(M),p.appendChild(u),p.appendChild(g),c.appendChild(p)}if(!x.querySelector("#softGlow")){const p=document.createElementNS("http://www.w3.org/2000/svg","filter");p.setAttribute("id","softGlow"),p.setAttribute("x","-50%"),p.setAttribute("y","-50%"),p.setAttribute("width","200%"),p.setAttribute("height","200%");const u=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");u.setAttribute("stdDeviation","3"),u.setAttribute("result","coloredBlur");const g=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),N=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");N.setAttribute("in","coloredBlur");const M=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");M.setAttribute("in","SourceGraphic"),g.appendChild(N),g.appendChild(M),p.appendChild(u),p.appendChild(g),c.appendChild(p)}if(!x.querySelector("#sharpShadow")){const p=document.createElementNS("http://www.w3.org/2000/svg","filter");p.setAttribute("id","sharpShadow"),p.setAttribute("x","-50%"),p.setAttribute("y","-50%"),p.setAttribute("width","200%"),p.setAttribute("height","200%");const u=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");u.setAttribute("stdDeviation","0.5"),u.setAttribute("result","coloredBlur");const g=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),N=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");N.setAttribute("in","coloredBlur");const M=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");M.setAttribute("in","SourceGraphic"),g.appendChild(N),g.appendChild(M),p.appendChild(u),p.appendChild(g),c.appendChild(p)}x.querySelector("defs")||x.insertBefore(c,x.firstChild)})(),Ud.forEach(c=>{const p=c.name,u=n[p];if(u!==void 0&&c.x>0&&c.y>0){const g=u.toFixed(c.decimal),N=`${p}_value`;x.querySelectorAll(`#${N}_group`).forEach(w=>w.remove());const C=document.createElementNS("http://www.w3.org/2000/svg","g");C.setAttribute("id",`${N}_group`);const j="rgba(0, 0, 0, 0.95)",v="#00ff00",_="rgba(0, 255, 0, 0.4)",L="1",U="url(#ledGlow)",V="10",O=document.createElementNS("http://www.w3.org/2000/svg","text");O.setAttribute("id",N),O.setAttribute("x",c.x+6),O.setAttribute("y",c.y+4),O.setAttribute("font-family","Arial, sans-serif"),O.setAttribute("font-size",V),O.setAttribute("fill",v),O.setAttribute("font-weight","bold"),O.setAttribute("filter",U),O.textContent=`${g}${c.unit}`,x.appendChild(O);const cn=O.getBBox();x.removeChild(O);const F=document.createElementNS("http://www.w3.org/2000/svg","rect");F.setAttribute("x",c.x-2),F.setAttribute("y",c.y-8),F.setAttribute("width",cn.width+14),F.setAttribute("height",18),F.setAttribute("rx","4"),F.setAttribute("ry","4"),F.setAttribute("fill",j),F.setAttribute("stroke",_),F.setAttribute("stroke-width",L);const R=x.querySelector("defs")||document.createElementNS("http://www.w3.org/2000/svg","defs");if(!x.querySelector("#ledGlow")){const w=document.createElementNS("http://www.w3.org/2000/svg","filter");w.setAttribute("id","ledGlow"),w.setAttribute("x","-50%"),w.setAttribute("y","-50%"),w.setAttribute("width","200%"),w.setAttribute("height","200%");const S=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");S.setAttribute("stdDeviation","2"),S.setAttribute("result","coloredBlur");const A=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),T=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");T.setAttribute("in","coloredBlur");const D=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");D.setAttribute("in","SourceGraphic"),A.appendChild(T),A.appendChild(D),w.appendChild(S),w.appendChild(A),R.appendChild(w),x.querySelector("defs")||x.insertBefore(R,x.firstChild)}C.appendChild(F),C.appendChild(O),x.appendChild(C),console.log(`✅ 센서 ${p} 표시 (스타일 ${p}): x=${c.x}, y=${c.y}, 값=${g}${c.unit}`)}}),e.forEach((c,p)=>{const u=$d[p];if(!u){console.warn(`펌프 ${p} 매핑 정보 없음`);return}console.log(`펌프 ${p} 업데이트:`,c),u.data.forEach(j=>{var D;if(j.x===0||j.y===0)return;const v=`${j.symbolId}_value`;x.querySelectorAll(`#${v}_group`).forEach(_n=>_n.remove());let L="";if(j.name.includes("Auto/Man mode"))L=c.auto_mode?"AUTO":"MANU";else if(j.name.includes("running hour"))L=`${c.run_hours||0}${j.unit||""}`;else if(j.name.includes("VFD")&&j.name.includes("BYPASS"))L=c.vfd_mode?"VFD":"BYPASS";else if(j.name.includes("Hz(VFD)"))L=`${((D=c.frequency)==null?void 0:D.toFixed(1))||"0.0"}${j.unit||""}`;else if(j.type==="pump")return;if(console.log(`펌프 ${p} - ${j.name}: ${L}, 좌표: (${j.x}, ${j.y})`),!L)return;const U=document.createElementNS("http://www.w3.org/2000/svg","g");U.setAttribute("id",`${v}_group`);const V="rgba(255, 255, 255, 0.1)";let O="#ffffff";const cn="rgba(255, 255, 255, 0.3)",F="0.5",R="9",w="Arial, sans-serif";j.name.includes("Auto/Man mode")?O=c.auto_mode?"#ffffff":"#000000":j.name.includes("VFD")&&j.name.includes("BYPASS")&&(O=c.vfd_mode?"#ffffff":"#000000");const S=document.createElementNS("http://www.w3.org/2000/svg","text");S.setAttribute("id",v),S.setAttribute("x",j.x+4),S.setAttribute("y",j.y+3.5),S.setAttribute("font-family",w),S.setAttribute("font-size",R),S.setAttribute("fill",O),S.setAttribute("font-weight","bold"),S.textContent=L,x.appendChild(S);const A=S.getBBox();x.removeChild(S);const T=document.createElementNS("http://www.w3.org/2000/svg","rect");T.setAttribute("x",j.x-1.5),T.setAttribute("y",j.y-7.5),T.setAttribute("width",A.width+10),T.setAttribute("height",15),T.setAttribute("rx","3"),T.setAttribute("ry","3"),T.setAttribute("fill",V),T.setAttribute("stroke",cn),T.setAttribute("stroke-width",F),U.appendChild(T),U.appendChild(S),x.appendChild(U)});const g=u.name,N=`impeller-${g}`,M=x.querySelector(`.${N}`),C=x.querySelector(`#${g}`);if(M&&C){const j=C.querySelectorAll("[fill]");c.running?(M.style.animationPlayState="running",j.forEach(v=>{if(!v.closest(".impeller-"+g)||v===M){const _=v.getAttribute("fill");v.hasAttribute("data-original-fill")||v.setAttribute("data-original-fill",_),_.includes("#06b6d4")?v.setAttribute("fill","#22d3ee"):_.includes("#0891b2")?v.setAttribute("fill","#06b6d4"):_.includes("#0e7490")?v.setAttribute("fill","#0891b2"):_.includes("url")||v.setAttribute("fill","#22d3ee")}})):(M.style.animationPlayState="paused",j.forEach(v=>{if(!v.closest(".impeller-"+g)||v===M){const _=v.getAttribute("data-original-fill");v.getAttribute("fill").includes("url")||(_&&_.includes("#06b6d4")?v.setAttribute("fill","#94a3b8"):_&&_.includes("#0891b2")?v.setAttribute("fill","#64748b"):_&&_.includes("#0e7490")?v.setAttribute("fill","#475569"):v.setAttribute("fill","#94a3b8"))}})),console.log(`✅ 펌프 ${p} (${g}) 상태: ${c.running?"🔵 운전중 (파란색)":"⚪ 정지 (회색)"}`)}else console.warn(`❌ 펌프 ${p} 요소 없음 - impeller: ${!!M}, group: ${!!C}`)})},m=async(x,E)=>{t&&(await t(x,E)?(alert(`펌프 ${x+1} ${E==="start"?"시작":"정지"} 명령 전송 완료`),o(null)):alert("명령 전송 실패"))};return r.jsxs("div",{className:"dynamic-svg-diagram",children:[r.jsx("div",{ref:i,className:"svg-container"}),s&&r.jsx("div",{className:"pump-popup-overlay",onClick:()=>o(null),children:r.jsxs("div",{className:"pump-popup",onClick:x=>x.stopPropagation(),children:[r.jsxs("div",{className:"pump-popup-header",children:[r.jsxs("h3",{children:[s.index<3?"LT":"SW"," Pump No.",s.index%3+1]}),r.jsx("button",{className:"popup-close",onClick:()=>o(null),children:"×"})]}),r.jsxs("div",{className:"pump-popup-body",children:[r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"상태:"}),r.jsx("span",{className:`info-value ${s.running?"status-running":"status-stopped"}`,children:s.running?"🟢 운전 중":"⚪ 정지"})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"운전 모드:"}),r.jsx("span",{className:"info-value",style:{color:s.auto_mode?"#00FF00":"#FFA500",fontWeight:"bold"},children:s.auto_mode!==void 0&&s.auto_mode?"AUTO":"MANUAL"})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"VFD 모드:"}),r.jsx("span",{className:"info-value",style:{color:s.vfd_mode?"#00BFFF":"#FF69B4",fontWeight:"bold"},children:s.vfd_mode!==void 0?s.vfd_mode?"VFD":"BYPASS":"VFD"})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"주파수:"}),r.jsxs("span",{className:"info-value",children:[((h=s.frequency)==null?void 0:h.toFixed(1))||"0.0"," Hz"]})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"전력:"}),r.jsxs("span",{className:"info-value",children:[s.power_kw||0," kW"]})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"평균 전력:"}),r.jsxs("span",{className:"info-value",children:[s.avg_power||0," kW"]})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"절감 전력:"}),r.jsxs("span",{className:"info-value",children:[((k=s.saved_kwh)==null?void 0:k.toLocaleString())||0," kWh"]})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"운전 시간:"}),r.jsxs("span",{className:"info-value",children:[((z=s.run_hours)==null?void 0:z.toLocaleString())||0," h"]})]}),r.jsxs("div",{className:"pump-info-row",children:[r.jsx("span",{className:"info-label",children:"ESS 모드:"}),r.jsx("span",{className:"info-value",children:s.ess_mode?"🟢 활성":"⚪ 비활성"})]})]}),r.jsxs("div",{className:"pump-popup-controls",children:[r.jsx("button",{className:"btn-pump-start",onClick:()=>m(s.index,"start"),disabled:s.running,children:"▶️ START"}),r.jsx("button",{className:"btn-pump-stop",onClick:()=>m(s.index,"stop"),disabled:!s.running,children:"⏹️ STOP"})]})]})})]})}const Ja={TX6:{labelId:"TX6",unit:"°C",decimal:1},TX7:{labelId:"TX7",unit:"°C",decimal:1},DPX2:{labelId:"DPX2",unit:" Pa",decimal:1},PU1:{labelId:"ME_Load",unit:"%",decimal:1}},Xd={0:{name:"FAN1",symbolIds:{mode:"FAN1_Mode",modeText:"text428",auto:"Fan1_Auto",hz:"Fan1_Hz",runningHour:"Fan1_hour"}},1:{name:"FAN2",symbolIds:{mode:"FAN2_Mode",modeText:"text411",auto:"Fan2_Auto",hz:"Fan2_Hz",runningHour:"Fan2_hour"}},2:{name:"FAN3",symbolIds:{mode:"FAN3_Mode",modeText:"text464",auto:"Fan3_Auto",hz:"Fan3_Hz",runningHour:"Fan3_hour"}},3:{name:"FAN4",symbolIds:{mode:"FAN4_Mode",modeText:"text447",auto:"Fan4_Auto",hz:"Fan4_Hz",runningHour:"Fan4_hour"}}},Qd=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 1024 768"
   version="1.1"
   stroke-linecap="round"
   stroke-linejoin="round"
   fill-rule="evenodd"
   xml:space="preserve"
   id="svg542"
   sodipodi:docname="ESS연구 verison2-Model.svg"
   inkscape:version="1.4.2 (f4327f4, 2025-05-13)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview
   id="namedview542"
   pagecolor="#ffffff"
   bordercolor="#000000"
   borderopacity="0.25"
   inkscape:showpageshadow="2"
   inkscape:pageopacity="0.0"
   inkscape:pagecheckerboard="0"
   inkscape:deskcolor="#d1d1d1"
   inkscape:zoom="2.1015625"
   inkscape:cx="534.12639"
   inkscape:cy="369.01115"
   inkscape:window-width="1920"
   inkscape:window-height="1009"
   inkscape:window-x="1912"
   inkscape:window-y="-8"
   inkscape:window-maximized="1"
   inkscape:current-layer="g386" />
<defs
   id="defs1">
<clipPath
   id="clipId0">
<path
   d="M0,768 1024,768 1024,0 0,0 z"
   id="path1" />
</clipPath>
</defs>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.1"
   id="g1" />
<g
   clip-path="url(#clipId0)"
   fill="rgb(231,230,230)"
   stroke="rgb(231,230,230)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g2">
<path
   d="M10.0392,718.609 1013.96,718.609 1013.96,49.3909 10.0392,49.3909 z"
   id="path2" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g5">
<polyline
   points="193.635,399.205 420.958,399.205 "
   id="polyline2" />
<polyline
   points="421.241,396.939 421.241,401.472 "
   id="polyline3" />
<polyline
   points="585.098,399.205 824.321,399.205 "
   id="polyline4" />
<polyline
   points="585.004,396.939 585.004,401.472 "
   id="polyline5" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(143,170,220)"
   stroke="rgb(143,170,220)"
   stroke-width="1"
   id="g48">
<path
   d="M558.56,414.458 558.56,409.995 565.265,414.458 z"
   id="path5" />
<path
   d="M565.265,414.458 558.56,409.995 565.265,409.995 z"
   id="path6" />
<path
   d="M565.265,422.706 565.265,409.995 569.728,422.706 z"
   id="path7" />
<path
   d="M569.728,422.706 565.265,409.995 569.728,409.995 z"
   id="path8" />
<path
   d="M569.728,414.458 569.728,409.995 603.641,414.458 z"
   id="path9" />
<path
   d="M603.641,414.458 569.728,409.995 603.641,409.995 z"
   id="path10" />
<path
   d="M603.641,517.172 603.641,512.709 614.635,517.172 z"
   id="path11" />
<path
   d="M614.635,517.172 603.641,512.709 614.635,512.709 z"
   id="path12" />
<path
   d="M603.641,414.458 603.641,409.995 614.635,414.458 z"
   id="path13" />
<path
   d="M614.635,414.458 603.641,409.995 614.635,409.995 z"
   id="path14" />
<path
   d="M614.635,522.075 614.635,503.375 616.146,522.075 z"
   id="path15" />
<path
   d="M616.146,522.075 614.635,503.375 616.146,503.375 z"
   id="path16" />
<path
   d="M614.635,414.458 614.635,409.995 616.146,414.458 z"
   id="path17" />
<path
   d="M616.146,414.458 614.635,409.995 616.146,409.995 z"
   id="path18" />
<path
   d="M616.146,522.075 616.146,503.296 619.098,522.075 z"
   id="path19" />
<path
   d="M619.098,522.075 616.146,503.296 619.098,503.296 z"
   id="path20" />
<path
   d="M616.146,414.458 616.146,409.995 619.098,414.458 z"
   id="path21" />
<path
   d="M619.098,414.458 616.146,409.995 619.098,409.995 z"
   id="path22" />
<path
   d="M619.098,507.759 619.098,503.296 631.989,507.759 z"
   id="path23" />
<path
   d="M631.989,507.759 619.098,503.296 631.989,503.296 z"
   id="path24" />
<path
   d="M619.098,414.458 619.098,409.995 631.989,414.458 z"
   id="path25" />
<path
   d="M631.989,414.458 619.098,409.995 631.989,409.995 z"
   id="path26" />
<path
   d="M631.989,507.759 631.989,403.235 632.02,507.759 z"
   id="path27" />
<path
   d="M632.02,507.759 631.989,403.235 632.02,402.023 z"
   id="path28" />
<path
   d="M632.02,507.759 632.02,402.023 638.12,507.759 z"
   id="path29" />
<path
   d="M638.12,507.759 632.02,402.023 638.12,402.023 z"
   id="path30" />
<path
   d="M638.12,498.503 638.12,494.041 642.008,498.503 z"
   id="path31" />
<path
   d="M642.008,498.503 638.12,494.041 642.008,494.041 z"
   id="path32" />
<path
   d="M638.12,406.485 638.12,402.023 642.008,406.485 z"
   id="path33" />
<path
   d="M642.008,406.485 638.12,402.023 642.008,402.023 z"
   id="path34" />
<path
   d="M642.008,498.503 642.008,494.041 666.334,498.503 z"
   id="path35" />
<path
   d="M666.334,498.503 642.008,494.041 666.334,494.041 z"
   id="path36" />
<path
   d="M642.008,406.485 642.008,402.023 666.334,406.485 z"
   id="path37" />
<path
   d="M666.334,406.485 642.008,402.023 666.334,402.023 z"
   id="path38" />
<path
   d="M642.008,369.031 642.008,360.106 666.334,369.031 z"
   id="path39" />
<path
   d="M666.334,369.031 642.008,360.106 666.334,360.106 z"
   id="path40" />
<path
   d="M666.334,498.503 666.334,494.041 669.097,498.503 z"
   id="path41" />
<path
   d="M669.097,498.503 666.334,494.041 669.097,494.041 z"
   id="path42" />
<path
   d="M666.334,406.485 666.334,360.106 669.097,406.485 z"
   id="path43" />
<path
   d="M669.097,406.485 666.334,360.106 669.097,360.106 z"
   id="path44" />
<path
   d="M669.097,406.485 669.097,360.106 673.024,406.485 z"
   id="path45" />
<path
   d="M673.024,406.485 669.097,360.106 673.024,360.106 z"
   id="path46" />
<path
   d="M673.024,369.031 673.024,360.106 743.384,369.031 z"
   id="path47" />
<path
   d="M743.384,369.031 673.024,360.106 743.384,360.106 z"
   id="path48" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g49">
<polyline
   points="642.008,360.106 743.384,360.106 743.384,369.031 673.024,369.031 673.024,402.023 673.024,404.101 673.024,406.485 638.12,406.485 638.12,494.041 669.097,494.041 669.097,498.503 638.12,498.503 638.12,503.296 638.12,505.004 638.12,507.759 619.098,507.759 619.098,522.075 614.635,522.075 614.635,517.172 603.641,517.172 603.641,512.709 614.635,512.709 614.635,503.375 616.146,503.375 616.146,503.296 631.989,503.296 631.989,414.458 569.728,414.458 569.728,422.706 565.265,422.706 565.265,414.458 558.56,414.458 558.56,409.995 631.989,409.995 631.989,403.235 632.02,403.235 632.02,402.023 666.334,402.023 666.334,369.031 642.008,369.031 642.008,360.106 "
   id="polyline48" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(143,170,220)"
   stroke="rgb(143,170,220)"
   stroke-width="1"
   id="g88">
<path
   d="M279.105,368.984 279.105,360.106 303.826,368.984 z"
   id="path49" />
<path
   d="M303.826,368.984 279.105,360.106 303.826,360.106 z"
   id="path50" />
<path
   d="M303.826,378.971 303.826,374.516 342.933,378.971 z"
   id="path51" />
<path
   d="M342.933,378.971 303.826,374.516 342.933,374.516 z"
   id="path52" />
<path
   d="M303.826,368.984 303.826,360.106 342.933,368.984 z"
   id="path53" />
<path
   d="M342.933,368.984 303.826,360.106 342.933,360.106 z"
   id="path54" />
<path
   d="M342.933,446.962 342.933,442.499 360.452,446.962 z"
   id="path55" />
<path
   d="M360.452,446.962 342.933,442.499 360.452,442.499 z"
   id="path56" />
<path
   d="M342.933,378.971 342.933,374.516 360.452,378.971 z"
   id="path57" />
<path
   d="M360.452,378.971 342.933,374.516 360.452,374.516 z"
   id="path58" />
<path
   d="M342.933,368.984 342.933,360.106 360.452,368.984 z"
   id="path59" />
<path
   d="M360.452,368.984 342.933,360.106 360.452,360.106 z"
   id="path60" />
<path
   d="M360.452,508.947 360.452,360.106 366.929,508.947 z"
   id="path61" />
<path
   d="M366.929,508.947 360.452,360.106 366.929,360.106 z"
   id="path62" />
<path
   d="M366.929,501.62 366.929,497.158 399.826,501.62 z"
   id="path63" />
<path
   d="M399.826,501.62 366.929,497.158 399.826,497.158 z"
   id="path64" />
<path
   d="M366.929,408.555 366.929,404.093 399.826,408.555 z"
   id="path65" />
<path
   d="M399.826,408.555 366.929,404.093 399.826,404.093 z"
   id="path66" />
<path
   d="M366.929,368.984 366.929,360.106 399.826,368.984 z"
   id="path67" />
<path
   d="M399.826,368.984 366.929,360.106 399.826,360.106 z"
   id="path68" />
<path
   d="M399.826,517.73 399.826,497.158 400.983,517.73 z"
   id="path69" />
<path
   d="M400.983,517.73 399.826,497.158 400.983,497.158 z"
   id="path70" />
<path
   d="M399.826,408.555 399.826,404.093 400.983,408.555 z"
   id="path71" />
<path
   d="M400.983,408.555 399.826,404.093 400.983,404.093 z"
   id="path72" />
<path
   d="M399.826,368.984 399.826,360.106 400.983,368.984 z"
   id="path73" />
<path
   d="M400.983,368.984 399.826,360.106 400.983,360.106 z"
   id="path74" />
<path
   d="M400.983,517.73 400.983,497.158 403.808,517.73 z"
   id="path75" />
<path
   d="M403.808,517.73 400.983,497.158 403.808,497.158 z"
   id="path76" />
<path
   d="M400.983,408.555 400.983,404.093 403.808,408.555 z"
   id="path77" />
<path
   d="M403.808,408.555 400.983,404.093 403.808,404.093 z"
   id="path78" />
<path
   d="M403.808,517.73 403.808,497.158 404.289,517.73 z"
   id="path79" />
<path
   d="M404.289,517.73 403.808,497.158 404.289,497.189 z"
   id="path80" />
<path
   d="M403.808,408.555 403.808,404.093 404.289,408.555 z"
   id="path81" />
<path
   d="M404.289,408.555 403.808,404.093 404.289,404.093 z"
   id="path82" />
<path
   d="M404.289,511.182 404.289,506.72 412.521,511.182 z"
   id="path83" />
<path
   d="M412.521,511.182 404.289,506.72 412.521,506.72 z"
   id="path84" />
<path
   d="M404.289,408.555 404.289,404.093 412.521,408.555 z"
   id="path85" />
<path
   d="M412.521,408.555 404.289,404.093 412.521,404.093 z"
   id="path86" />
<path
   d="M412.521,408.555 412.521,404.093 422.374,408.555 z"
   id="path87" />
<path
   d="M422.374,408.555 412.521,404.093 422.374,404.093 z"
   id="path88" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g91">
<polyline
   points="279.105,360.106 400.983,360.106 400.983,368.984 366.929,368.984 366.929,404.093 422.374,404.093 422.374,408.555 366.929,408.555 366.929,497.158 403.808,497.158 403.808,497.189 404.289,497.189 404.289,506.72 412.521,506.72 412.521,511.182 404.289,511.182 404.289,517.73 399.826,517.73 399.826,501.62 366.929,501.62 366.929,508.947 360.452,508.947 360.452,446.962 342.933,446.962 342.933,442.499 360.452,442.499 360.452,378.971 303.826,378.971 303.826,374.516 360.452,374.516 360.452,368.984 279.105,368.984 279.105,360.106 "
   id="polyline88" />
<polyline
   points="447.874,177.36 574.71,177.36 "
   id="polyline89" />
<polyline
   points="429.552,179.155 429.552,360.106 "
   id="polyline90" />
<polyline
   points="589.254,179.155 589.254,360.106 "
   id="polyline91" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g92">
<text
   transform="matrix(7.88404 0 -0 7.90963 484.706 168.538)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text91">FUNNEL</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g96">
<polyline
   points="750.656,239.126 750.656,179.155 "
   id="polyline92" />
<polyline
   points="267.678,179.155 750.467,179.155 "
   id="polyline93" />
<polyline
   points="350.126,154.789 350.126,179.155 "
   id="polyline94" />
<polyline
   points="350.409,155.355 380.662,155.141 409.964,154.536 437.367,153.595 461.918,152.374 472.828,151.677 482.668,150.931 491.321,150.142 498.667,149.319 504.587,148.468 508.963,147.596 511.675,146.71 512.606,145.817 513.537,144.924 516.249,144.037 520.624,143.165 526.544,142.314 533.89,141.491 542.542,140.703 552.382,139.956 563.291,139.259 587.842,138.038 615.244,137.098 644.548,136.492 674.803,136.278 "
   id="polyline95" />
<polyline
   points="674.441,136.372 674.441,179.344 "
   id="polyline96" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g98">
<text
   transform="matrix(7.89942 0 -0 7.90963 477.156 202.388)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text96">E/R CASING</text>
<text
   transform="matrix(7.89886 0 -0 7.90963 472.616 602.619)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text97">MAIN ENGINE</text>
<text
   transform="matrix(5.6255 0 -0 5.61111 205.548 497.331)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text98">PURIFIER ROOM</text>
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_2407094ac3eb7042c848a1b7e7a2760bd47bbc.PNG"
   preserveAspectRatio="none"
   transform="matrix(-34.377 0 -0 40.5157 343.987 492.798)"
   id="image98" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   id="g102">
<polyline
   points="343.987,533.313 309.61,533.313 309.61,492.798 343.987,492.798 343.987,533.313 "
   id="polyline98" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_240709d3815b3245b4484681519078dbeb1e94.PNG"
   preserveAspectRatio="none"
   transform="matrix(-34.377 0 -0 40.5157 303.755 492.798)"
   id="image99" />
<polyline
   points="303.755,533.313 269.378,533.313 269.378,492.798 303.755,492.798 303.755,533.313 "
   id="polyline99" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_24070927a171ef759d4083ad6cc564da53837e.PNG"
   preserveAspectRatio="none"
   transform="matrix(-25.405 0 -0 29.8438 264.467 503.47)"
   id="image100" />
<polyline
   points="264.467,533.313 239.062,533.313 239.062,503.47 264.467,503.47 264.467,533.313 "
   id="polyline100" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_24070960c1851515054f7f8a04915fe8e24d82.PNG"
   preserveAspectRatio="none"
   transform="matrix(-25.405 0 -0 29.8438 233.584 503.47)"
   id="image101" />
<polyline
   points="233.584,533.313 208.179,533.313 208.179,503.47 233.584,503.47 233.584,533.313 "
   id="polyline101" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_240709c59dcb2fe34244f783b18ec1ce2bb765.PNG"
   preserveAspectRatio="none"
   transform="matrix(50.0544 0 -0 34.9436 212.807 451.999)"
   id="image102" />
<polyline
   points="212.807,486.942 262.861,486.942 262.861,451.999 212.807,451.999 212.807,486.942 "
   id="polyline102" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g103">
<text
   transform="matrix(5.60926 0 -0 5.61111 223.387 448.98)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text102">No.3 D/G</text>
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_24070968e55b4a84c74231bea72d3f03a2d8c5.PNG"
   preserveAspectRatio="none"
   transform="matrix(50.0544 0 -0 34.9436 272.683 451.999)"
   id="image103" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   id="g104">
<polyline
   points="272.683,486.942 322.738,486.942 322.738,451.999 272.683,451.999 272.683,486.942 "
   id="polyline103" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g106">
<text
   transform="matrix(5.60926 0 -0 5.61111 283.208 448.977)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text104">No.2 D/G</text>
<text
   transform="matrix(5.60973 0 -0 5.61111 280.808 226.644)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text105">E/R FAN</text>
<text
   transform="matrix(5.61461 0 -0 5.61111 287.985 235.145)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text106">No.4</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g107">
<polyline
   points="267.678,216.271 381.764,216.271 381.764,359.539 "
   id="polyline106" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g110">
<text
   transform="matrix(5.60973 0 -0 5.61111 336.852 226.644)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text107">E/R FAN</text>
<text
   transform="matrix(5.61479 0 -0 5.61111 344.028 235.147)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text108">No.3</text>
<text
   transform="matrix(7.84487 0 -0 7.90963 662.467 194.376)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text109">M/E T/C</text>
<text
   transform="matrix(7.88182 0 -0 7.90963 635.831 206.276)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text110">DIRECT SUCTION</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g111">
<polyline
   points="750.278,215.704 635.719,215.704 635.719,360.484 "
   id="polyline110" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g114">
<text
   transform="matrix(5.60973 0 -0 5.61111 650.55 229.508)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text111">E/R FAN</text>
<text
   transform="matrix(5.61636 0 -0 5.61111 657.726 238.01)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text112">No.2</text>
<text
   transform="matrix(5.60973 0 -0 5.61111 706.593 229.508)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text113">E/R FAN</text>
<text
   transform="matrix(5.61497 0 -0 5.61111 713.77 238.01)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text114">No.1</text>
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_2407099a204d988776466abedf146388680849.PNG"
   preserveAspectRatio="none"
   transform="matrix(50.0544 0 -0 34.9436 736.867 451.999)"
   id="image114" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   id="g115">
<polyline
   points="736.867,486.942 786.922,486.942 786.922,451.999 736.867,451.999 736.867,486.942 "
   id="polyline114" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g130">
<text
   transform="matrix(5.60926 0 -0 5.61111 747.431 450.189)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text115">No.1 D/G</text>
<text
   transform="matrix(5.61753 0 -0 5.61111 683.427 450.189)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text116">Turbo GEN</text>
<text
   transform="matrix(6.78186 0 -0 6.77389 755.752 183.499)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text117">C</text>
<text
   transform="matrix(6.77779 0 -0 6.77389 762.558 183.499)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text118">-</text>
<text
   transform="matrix(6.76321 0 -0 6.77389 765.672 183.499)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text119">DK</text>
<text
   transform="matrix(6.78124 0 -0 6.76037 755.742 311.846)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text120">A</text>
<text
   transform="matrix(6.76426 0 -0 6.76037 762.085 311.846)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text121">-</text>
<text
   transform="matrix(6.75712 0 -0 6.76037 765.199 311.846)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text122">DK</text>
<text
   transform="matrix(6.76141 0 -0 6.76037 755.758 248.153)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text123">B</text>
<text
   transform="matrix(6.76426 0 -0 6.76037 762.085 248.153)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text124">-</text>
<text
   transform="matrix(6.76642 0 -0 6.76037 765.198 248.153)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text125">D</text>
<text
   transform="matrix(6.73658 0 -0 6.76037 787.301 356.345)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text126">UPP DK</text>
<text
   transform="matrix(6.77556 0 -0 6.76037 766.936 396.105)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text127">RECESS DK</text>
<text
   transform="matrix(6.74943 0 -0 6.76037 786.975 485.546)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text128">3RD DK</text>
<text
   transform="matrix(6.7681 0 -0 6.76037 787.919 529.575)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text129">4TH DK</text>
<text
   transform="matrix(6.77852 0 -0 6.76037 788.955 557.129)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text130">FLOOR</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(64,64,64)"
   stroke="rgb(64,64,64)"
   stroke-width="1"
   id="g160">
<path
   d="M363.238,521.429 362.057,515.527 363.238,515.527 z"
   id="path130" />
<path
   d="M363.238,521.429 363.238,516.314 363.631,523.397 z"
   id="path131" />
<path
   d="M363.631,523.397 363.238,516.314 363.631,516.314 z"
   id="path132" />
<path
   d="M363.238,515.527 363.238,508.947 363.631,515.527 z"
   id="path133" />
<path
   d="M363.631,515.527 363.238,508.947 363.631,508.947 z"
   id="path134" />
<path
   d="M363.631,523.397 363.631,516.314 364.025,521.429 z"
   id="path135" />
<path
   d="M364.025,521.429 363.631,516.314 364.025,516.314 z"
   id="path136" />
<path
   d="M363.631,515.527 363.631,508.947 364.025,515.527 z"
   id="path137" />
<path
   d="M364.025,515.527 363.631,508.947 364.025,508.947 z"
   id="path138" />
<path
   d="M364.025,521.429 364.025,515.527 365.205,515.527 z"
   id="path139" />
<path
   d="M412.08,509.435 412.08,508.648 418.66,509.435 z"
   id="path140" />
<path
   d="M418.66,509.435 412.08,508.648 418.66,508.648 z"
   id="path141" />
<path
   d="M418.66,510.616 418.66,509.435 419.447,510.458 z"
   id="path142" />
<path
   d="M419.447,510.458 418.66,509.435 419.447,509.435 z"
   id="path143" />
<path
   d="M418.66,508.648 418.66,507.468 419.447,508.648 z"
   id="path144" />
<path
   d="M419.447,508.648 418.66,507.468 419.447,507.625 z"
   id="path145" />
<path
   d="M419.447,510.458 419.447,507.625 426.53,509.042 z"
   id="path146" />
<path
   d="M595.959,515.936 588.876,514.519 595.959,513.103 z"
   id="path147" />
<path
   d="M595.959,515.936 595.959,514.913 596.746,516.093 z"
   id="path148" />
<path
   d="M596.746,516.093 595.959,514.913 596.746,514.913 z"
   id="path149" />
<path
   d="M595.959,514.126 595.959,513.103 596.746,514.126 z"
   id="path150" />
<path
   d="M596.746,514.126 595.959,513.103 596.746,512.945 z"
   id="path151" />
<path
   d="M596.746,514.913 596.746,514.126 603.42,514.913 z"
   id="path152" />
<path
   d="M603.42,514.913 596.746,514.126 603.42,514.126 z"
   id="path153" />
<path
   d="M669.058,496.78 669.058,495.993 675.731,496.78 z"
   id="path154" />
<path
   d="M675.731,496.78 669.058,495.993 675.731,495.993 z"
   id="path155" />
<path
   d="M675.731,497.96 675.731,496.78 676.518,497.803 z"
   id="path156" />
<path
   d="M676.518,497.803 675.731,496.78 676.518,496.78 z"
   id="path157" />
<path
   d="M675.731,495.993 675.731,494.812 676.518,495.993 z"
   id="path158" />
<path
   d="M676.518,495.993 675.731,494.812 676.518,494.97 z"
   id="path159" />
<path
   d="M676.518,497.803 676.518,494.97 683.602,496.386 z"
   id="path160" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g173">
<polyline
   points="374.87,480.331 374.87,488.453 "
   id="polyline160" />
<polyline
   points="372.698,479.953 377.231,479.953 "
   id="polyline161" />
<polyline
   points="352.676,524.625 352.676,532.747 "
   id="polyline162" />
<polyline
   points="350.504,524.247 354.942,524.247 "
   id="polyline163" />
<polyline
   points="352.676,496.764 352.676,488.642 "
   id="polyline164" />
<polyline
   points="350.504,497.048 354.942,497.048 "
   id="polyline165" />
<polyline
   points="193.729,488.359 420.958,488.359 "
   id="polyline166" />
<polyline
   points="421.241,486.281 421.241,490.72 "
   id="polyline167" />
<polyline
   points="193.729,532.841 420.958,532.841 "
   id="polyline168" />
<polyline
   points="421.241,530.669 421.241,535.202 "
   id="polyline169" />
<polyline
   points="587.743,532.841 824.321,532.841 "
   id="polyline170" />
<polyline
   points="587.648,530.669 587.648,535.202 "
   id="polyline171" />
<polyline
   points="622.592,480.142 622.592,488.264 "
   id="polyline172" />
<polyline
   points="620.42,479.859 624.859,479.859 "
   id="polyline173" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_240709e4aad4b89b274b45b93a2b35febbaae3.PNG"
   preserveAspectRatio="none"
   transform="matrix(53.0766 0 -0 35.0381 677.935 452.471)"
   id="image173" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   id="g174">
<polyline
   points="677.935,487.509 731.012,487.509 731.012,452.471 677.935,452.471 677.935,487.509 "
   id="polyline174" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g203">
<polyline
   points="748.389,236.953 751.978,245.548 "
   id="polyline175" />
<polyline
   points="748.389,242.431 751.978,251.025 "
   id="polyline176" />
<polyline
   points="748.389,247.909 751.978,256.503 "
   id="polyline177" />
<polyline
   points="748.389,253.386 751.978,262.075 "
   id="polyline178" />
<polyline
   points="748.389,258.864 751.978,267.553 "
   id="polyline179" />
<polyline
   points="748.389,264.342 751.978,273.03 "
   id="polyline180" />
<polyline
   points="748.389,311.279 751.978,319.968 "
   id="polyline181" />
<polyline
   points="748.389,316.757 751.978,325.446 "
   id="polyline182" />
<polyline
   points="748.389,322.329 751.978,330.923 "
   id="polyline183" />
<polyline
   points="748.389,327.807 751.978,336.401 "
   id="polyline184" />
<polyline
   points="748.389,333.285 751.978,341.879 "
   id="polyline185" />
<polyline
   points="748.389,338.762 751.978,347.451 "
   id="polyline186" />
<polyline
   points="751.128,315.34 751.128,271.991 "
   id="polyline187" />
<polyline
   points="750.183,360.201 750.183,342.918 "
   id="polyline188" />
<polyline
   points="267.583,238.087 267.583,179.155 "
   id="polyline189" />
<polyline
   points="269.661,235.915 266.072,244.603 "
   id="polyline190" />
<polyline
   points="269.661,241.392 266.072,250.081 "
   id="polyline191" />
<polyline
   points="269.661,246.964 266.167,255.559 "
   id="polyline192" />
<polyline
   points="269.661,252.442 266.072,261.036 "
   id="polyline193" />
<polyline
   points="269.661,257.92 266.072,266.514 "
   id="polyline194" />
<polyline
   points="269.661,263.397 266.072,272.086 "
   id="polyline195" />
<polyline
   points="269.85,311.279 266.261,319.968 "
   id="polyline196" />
<polyline
   points="269.85,316.757 266.261,325.446 "
   id="polyline197" />
<polyline
   points="269.85,322.329 266.261,330.923 "
   id="polyline198" />
<polyline
   points="269.85,327.807 266.261,336.401 "
   id="polyline199" />
<polyline
   points="269.85,333.285 266.261,341.879 "
   id="polyline200" />
<polyline
   points="269.85,338.762 266.261,347.451 "
   id="polyline201" />
<polyline
   points="267.678,329.885 267.678,269.63 "
   id="polyline202" />
<polyline
   points="268.056,360.201 268.056,342.918 "
   id="polyline203" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_2407095a7514ccd7c44bbc87aa0953e1750c94.PNG"
   preserveAspectRatio="none"
   transform="matrix(36.3603 0 -0 42.5935 278.822 270.386)"
   id="image203" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   id="g207">
<polyline
   points="278.822,312.979 315.182,312.979 315.182,270.386 278.822,270.386 278.822,312.979 "
   id="polyline204" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_2407094f2f9ee5e65d4979a76acb672dfacce9.PNG"
   preserveAspectRatio="none"
   transform="matrix(36.4547 0 -0 42.5935 334.449 270.386)"
   id="image204" />
<polyline
   points="334.449,312.979 370.903,312.979 370.903,270.386 334.449,270.386 334.449,312.979 "
   id="polyline205" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_240709a67590d5b1bd4b279526d40f9234dbdd.PNG"
   preserveAspectRatio="none"
   transform="matrix(36.3603 0 -0 42.5935 648.469 269.725)"
   id="image205" />
<polyline
   points="648.469,312.318 684.829,312.318 684.829,269.725 648.469,269.725 648.469,312.318 "
   id="polyline206" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_240709a6f6f06d8d8f48018a8af00e3420570d.PNG"
   preserveAspectRatio="none"
   transform="matrix(36.4547 0 -0 42.5935 704.096 269.725)"
   id="image206" />
<polyline
   points="704.096,312.318 740.55,312.318 740.55,269.725 704.096,269.725 704.096,312.318 "
   id="polyline207" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g211">
<polyline
   points="773.385,609.528 244.571,609.528 "
   id="polyline208" />
<polyline
   points="244.571,609.528 234.306,608.493 224.746,605.525 216.094,600.828 208.555,594.608 202.335,587.07 197.638,578.418 194.67,568.857 193.635,558.592 "
   id="polyline209" />
<polyline
   points="193.635,558.592 193.635,360.106 824.321,360.106 824.321,558.592 "
   id="polyline210" />
<polyline
   points="824.321,558.592 823.286,568.857 820.317,578.418 815.621,587.07 809.401,594.608 801.862,600.828 793.21,605.525 783.649,608.493 773.385,609.528 "
   id="polyline211" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(217,217,217)"
   stroke="rgb(217,217,217)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g212">
<path
   d="M443.152,361.523 574.804,361.523 574.804,357.651 443.152,357.651 z"
   id="path211" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g213">
<polyline
   points="443.057,362.278 443.057,357.84 "
   id="polyline212" />
<polyline
   points="574.71,362.278 574.71,357.84 "
   id="polyline213" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(217,217,217)"
   stroke="rgb(217,217,217)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g214">
<path
   d="M443.152,180.76 574.804,180.76 574.804,176.983 443.152,176.983 z"
   id="path213" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g216">
<polyline
   points="443.057,181.61 443.057,177.077 "
   id="polyline214" />
<polyline
   points="574.71,181.61 574.71,177.077 "
   id="polyline215" />
<polyline
   points="395.08,309.107 395.8,305.541 397.763,302.629 400.675,300.666 404.241,299.946 407.808,300.666 410.72,302.629 412.683,305.541 413.402,309.107 412.683,312.674 410.72,315.585 407.808,317.548 404.241,318.268 400.675,317.548 397.763,315.585 395.8,312.674 395.08,309.107 "
   id="polyline216" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g217">
<text
   transform="matrix(5.00482 0 -0 5.07028 397.875 311.807)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text216">TX7</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g218">
<polyline
   points="382.047,308.824 395.08,308.824 "
   id="polyline217" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g219">
<text
   transform="matrix(4.52618 0 -0 4.52945 384.883 326.241)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text218">E/R OUTSIDE</text>
<text
   transform="matrix(4.52181 0 -0 4.52945 384.88 333.041)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text219">TEMP</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g220">
<polyline
   points="438.902,309.485 439.621,305.919 441.584,303.007 444.496,301.044 448.063,300.324 451.629,301.044 454.541,303.007 456.504,305.919 457.223,309.485 456.504,313.051 454.541,315.963 451.629,317.926 448.063,318.646 444.496,317.926 441.584,315.963 439.621,313.051 438.902,309.485 "
   id="polyline219" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g221">
<text
   transform="matrix(5.00139 0 -0 5.07028 441.752 312.169)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text220">TX6</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g222">
<text
   transform="matrix(4.52921 0 -0 4.52945 436.936 327.508)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text221">E/R INSIDE</text>
<text
   transform="matrix(4.52181 0 -0 4.52945 436.933 334.308)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text222">TEMP</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g223">
<polyline
   points="438.713,256.881 439.433,253.314 441.396,250.403 444.307,248.44 447.874,247.72 451.44,248.44 454.352,250.403 456.315,253.314 457.035,256.881 456.315,260.447 454.352,263.359 451.44,265.322 447.874,266.042 444.307,265.322 441.396,263.359 439.433,260.447 438.713,256.881 "
   id="polyline222" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g224">
<text
   transform="matrix(4.485 0 -0 4.52945 439.811 259.281)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text223">DPX2</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g226">
<text
   transform="matrix(4.52517 0 -0 4.54297 436.923 274.691)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text224">E/R IN/OUT</text>
<text
   transform="matrix(4.53381 0 -0 4.52945 436.917 281.514)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text225">DIFFEREMTIAL</text>
<text
   transform="matrix(4.53143 0 -0 4.52945 436.917 288.315)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text226">PRESSURE</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g230">
<polyline
   points="192.974,438.682 420.958,438.682 "
   id="polyline226" />
<polyline
   points="420.769,436.416 420.769,440.949 "
   id="polyline227" />
<polyline
   points="374.87,446.804 374.87,438.682 "
   id="polyline228" />
<polyline
   points="372.698,447.088 377.231,447.088 "
   id="polyline229" />
<polyline
   points="614.47,438.777 824.321,438.777 "
   id="polyline230" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g231">
<text
   transform="matrix(6.74821 0 -0 6.76037 786.981 435.605)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text230">2ND DK</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g232">
<polyline
   points="622.592,446.899 622.592,438.777 "
   id="polyline231" />
<polyline
   points="620.42,447.182 624.859,447.182 "
   id="polyline232" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_2407092c5e058b2f8d41d583ea1836b9a4f46f.PNG"
   preserveAspectRatio="none"
   transform="matrix(25.5939 0 -0 32.2048 249.545 366.528)"
   id="image232" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   id="g233">
<polyline
   points="249.545,398.733 275.139,398.733 275.139,366.528 249.545,366.528 249.545,398.733 "
   id="polyline233" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(64,64,64)"
   stroke="rgb(64,64,64)"
   stroke-width="1"
   id="g249">
<path
   d="M551.477,413.466 544.394,412.049 551.477,410.633 z"
   id="path233" />
<path
   d="M551.477,413.466 551.477,412.443 552.264,413.623 z"
   id="path234" />
<path
   d="M552.264,413.623 551.477,412.443 552.264,412.443 z"
   id="path235" />
<path
   d="M551.477,411.656 551.477,410.633 552.264,411.656 z"
   id="path236" />
<path
   d="M552.264,411.656 551.477,410.633 552.264,410.475 z"
   id="path237" />
<path
   d="M552.264,412.443 552.264,411.656 558.843,412.443 z"
   id="path238" />
<path
   d="M558.843,412.443 552.264,411.656 558.843,411.656 z"
   id="path239" />
<path
   d="M567.044,435.204 565.864,429.301 567.044,429.301 z"
   id="path240" />
<path
   d="M567.044,435.204 567.044,430.088 567.438,437.171 z"
   id="path241" />
<path
   d="M567.438,437.171 567.044,430.088 567.438,430.088 z"
   id="path242" />
<path
   d="M567.044,429.301 567.044,422.721 567.438,429.301 z"
   id="path243" />
<path
   d="M567.438,429.301 567.044,422.721 567.438,422.721 z"
   id="path244" />
<path
   d="M567.438,437.171 567.438,430.088 567.831,435.204 z"
   id="path245" />
<path
   d="M567.831,435.204 567.438,430.088 567.831,430.088 z"
   id="path246" />
<path
   d="M567.438,429.301 567.438,422.721 567.831,429.301 z"
   id="path247" />
<path
   d="M567.831,429.301 567.438,422.721 567.831,422.721 z"
   id="path248" />
<path
   d="M567.831,435.204 567.831,429.301 569.012,429.301 z"
   id="path249" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g250">
<polyline
   points="587.648,488.359 824.321,488.359 "
   id="polyline249" />
<polyline
   points="587.648,486.281 587.648,490.72 "
   id="polyline250" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(244,177,131)"
   stroke="rgb(244,177,131)"
   stroke-width="1"
   id="g264">
<path
   d="M508.954,520.564 503.689,515.298 508.954,510.037 z"
   id="path250" />
<path
   d="M508.954,520.564 508.954,510.037 568.941,460.62 z"
   id="path251" />
<path
   d="M568.941,460.62 508.954,510.037 568.941,450.094 z"
   id="path252" />
<path
   d="M568.941,460.62 568.941,449.842 574.175,455.391 z"
   id="path253" />
<path
   d="M574.175,455.391 568.941,449.842 574.175,449.842 z"
   id="path254" />
<path
   d="M574.175,455.391 574.175,449.842 599.957,455.391 z"
   id="path255" />
<path
   d="M599.957,455.391 574.175,449.842 599.957,449.842 z"
   id="path256" />
<path
   d="M599.957,455.391 599.957,449.842 600.044,455.391 z"
   id="path257" />
<path
   d="M600.044,455.391 599.957,449.842 600.044,449.842 z"
   id="path258" />
<path
   d="M599.957,433.039 599.957,360.106 600.044,433.039 z"
   id="path259" />
<path
   d="M600.044,433.039 599.957,360.106 600.044,360.106 z"
   id="path260" />
<path
   d="M600.044,455.391 600.044,360.106 605.584,455.391 z"
   id="path261" />
<path
   d="M605.584,455.391 600.044,360.106 605.584,360.106 z"
   id="path262" />
<path
   d="M605.584,455.391 605.584,369.81 605.592,455.391 z"
   id="path263" />
<path
   d="M605.592,455.391 605.584,369.81 605.592,452.778 z"
   id="path264" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g265">
<polyline
   points="599.957,360.106 605.584,360.106 605.584,369.81 605.592,369.81 605.592,452.778 605.592,455.391 574.175,455.391 508.954,520.564 503.689,515.298 568.941,450.094 568.941,449.842 600.044,449.842 600.044,433.039 599.957,433.039 599.957,360.106 "
   id="polyline264" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(244,177,131)"
   stroke="rgb(244,177,131)"
   stroke-width="1"
   id="g280">
<path
   d="M523.876,520.469 518.611,515.204 523.876,509.94 z"
   id="path265" />
<path
   d="M523.876,520.469 523.876,509.94 574.946,469.399 z"
   id="path266" />
<path
   d="M574.946,469.399 523.876,509.94 574.946,458.877 z"
   id="path267" />
<path
   d="M574.946,469.399 574.946,458.751 580.046,464.3 z"
   id="path268" />
<path
   d="M580.046,464.3 574.946,458.751 580.046,458.751 z"
   id="path269" />
<path
   d="M580.046,464.3 580.046,458.751 608.835,464.3 z"
   id="path270" />
<path
   d="M608.835,464.3 580.046,458.751 608.835,458.751 z"
   id="path271" />
<path
   d="M608.835,464.3 608.835,458.751 608.921,464.3 z"
   id="path272" />
<path
   d="M608.921,464.3 608.835,458.751 608.921,458.751 z"
   id="path273" />
<path
   d="M608.835,433.063 608.835,360.106 608.921,433.063 z"
   id="path274" />
<path
   d="M608.921,433.063 608.835,360.106 608.921,360.106 z"
   id="path275" />
<path
   d="M608.921,464.3 608.921,360.106 614.36,464.3 z"
   id="path276" />
<path
   d="M614.36,464.3 608.921,360.106 614.36,360.106 z"
   id="path277" />
<path
   d="M614.36,460.994 614.36,360.106 614.462,460.994 z"
   id="path278" />
<path
   d="M614.462,460.994 614.36,360.106 614.462,360.106 z"
   id="path279" />
<path
   d="M614.462,460.994 614.462,369.81 614.47,460.994 z"
   id="path280" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g281">
<polyline
   points="608.835,360.106 614.462,360.106 614.462,369.81 614.47,369.81 614.47,460.994 614.36,460.994 614.36,464.3 580.046,464.3 523.876,520.469 518.611,515.204 574.946,458.877 574.946,458.751 608.921,458.751 608.921,433.063 608.835,433.063 608.835,360.106 "
   id="polyline280" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(244,177,131)"
   stroke="rgb(244,177,131)"
   stroke-width="1"
   id="g295">
<path
   d="M494.379,520.304 489.114,515.039 494.379,509.774 z"
   id="path281" />
<path
   d="M494.379,520.304 494.379,509.774 563.085,451.597 z"
   id="path282" />
<path
   d="M563.085,451.597 494.379,509.774 563.085,441.067 z"
   id="path283" />
<path
   d="M563.085,451.597 563.085,440.964 568.17,446.513 z"
   id="path284" />
<path
   d="M568.17,446.513 563.085,440.964 568.17,440.964 z"
   id="path285" />
<path
   d="M568.17,446.513 568.17,440.964 591.095,446.513 z"
   id="path286" />
<path
   d="M591.095,446.513 568.17,440.964 591.095,440.964 z"
   id="path287" />
<path
   d="M591.095,446.513 591.095,440.964 591.158,446.513 z"
   id="path288" />
<path
   d="M591.158,446.513 591.095,440.964 591.158,440.964 z"
   id="path289" />
<path
   d="M591.095,433.031 591.095,360.067 591.158,433.031 z"
   id="path290" />
<path
   d="M591.158,433.031 591.095,360.067 591.158,360.067 z"
   id="path291" />
<path
   d="M591.158,446.513 591.158,360.067 596.707,446.513 z"
   id="path292" />
<path
   d="M596.707,446.513 591.158,360.067 596.707,360.067 z"
   id="path293" />
<path
   d="M596.707,442.735 596.707,360.067 596.723,433.031 z"
   id="path294" />
<path
   d="M596.723,433.031 596.707,360.067 596.723,360.067 z"
   id="path295" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g296">
<polyline
   points="591.095,360.067 596.723,360.067 596.723,433.031 596.707,433.031 596.707,442.735 596.707,446.513 568.17,446.513 494.379,520.304 489.114,515.039 563.085,441.067 563.085,440.964 591.158,440.964 591.158,433.031 591.095,433.031 591.095,360.067 "
   id="polyline295" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(64,64,64)"
   stroke="rgb(64,64,64)"
   stroke-width="1"
   id="g329">
<path
   d="M335.582,446.049 328.499,444.632 335.582,443.215 z"
   id="path296" />
<path
   d="M335.582,446.049 335.582,445.026 336.369,446.206 z"
   id="path297" />
<path
   d="M336.369,446.206 335.582,445.026 336.369,445.026 z"
   id="path298" />
<path
   d="M335.582,444.238 335.582,443.215 336.369,444.238 z"
   id="path299" />
<path
   d="M336.369,444.238 335.582,443.215 336.369,443.058 z"
   id="path300" />
<path
   d="M336.369,445.026 336.369,444.238 342.948,445.026 z"
   id="path301" />
<path
   d="M342.948,445.026 336.369,444.238 342.948,444.238 z"
   id="path302" />
<path
   d="M421.902,406.304 421.902,405.517 428.482,406.304 z"
   id="path303" />
<path
   d="M428.482,406.304 421.902,405.517 428.482,405.517 z"
   id="path304" />
<path
   d="M428.482,407.485 428.482,406.304 429.269,407.327 z"
   id="path305" />
<path
   d="M429.269,407.327 428.482,406.304 429.269,406.304 z"
   id="path306" />
<path
   d="M428.482,405.517 428.482,404.337 429.269,405.517 z"
   id="path307" />
<path
   d="M429.269,405.517 428.482,404.337 429.269,404.494 z"
   id="path308" />
<path
   d="M429.269,407.327 429.269,404.494 436.352,405.911 z"
   id="path309" />
<path
   d="M411.214,420.754 410.034,414.851 411.214,414.851 z"
   id="path310" />
<path
   d="M411.214,420.754 411.214,415.638 411.608,422.721 z"
   id="path311" />
<path
   d="M411.608,422.721 411.214,415.638 411.608,415.638 z"
   id="path312" />
<path
   d="M411.214,414.851 411.214,408.272 411.608,414.851 z"
   id="path313" />
<path
   d="M411.608,414.851 411.214,408.272 411.608,408.272 z"
   id="path314" />
<path
   d="M411.608,422.721 411.608,415.638 412.001,420.754 z"
   id="path315" />
<path
   d="M412.001,420.754 411.608,415.638 412.001,415.638 z"
   id="path316" />
<path
   d="M411.608,414.851 411.608,408.272 412.001,414.851 z"
   id="path317" />
<path
   d="M412.001,414.851 411.608,408.272 412.001,408.272 z"
   id="path318" />
<path
   d="M412.001,420.754 412.001,414.851 413.182,414.851 z"
   id="path319" />
<path
   d="M401.581,529.929 400.401,524.027 401.581,524.027 z"
   id="path320" />
<path
   d="M401.581,529.929 401.581,524.814 401.975,531.897 z"
   id="path321" />
<path
   d="M401.975,531.897 401.581,524.814 401.975,524.814 z"
   id="path322" />
<path
   d="M401.581,524.027 401.581,517.353 401.975,524.027 z"
   id="path323" />
<path
   d="M401.975,524.027 401.581,517.353 401.975,517.353 z"
   id="path324" />
<path
   d="M401.975,531.897 401.975,524.814 402.368,529.929 z"
   id="path325" />
<path
   d="M402.368,529.929 401.975,524.814 402.368,524.814 z"
   id="path326" />
<path
   d="M401.975,524.027 401.975,517.353 402.368,524.027 z"
   id="path327" />
<path
   d="M402.368,524.027 401.975,517.353 402.368,517.353 z"
   id="path328" />
<path
   d="M402.368,529.929 402.368,524.027 403.549,524.027 z"
   id="path329" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g330">
<text
   transform="matrix(5.61349 0 -0 5.61111 198.306 369.039)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text329">AUX. BOILER</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(64,64,64)"
   stroke="rgb(64,64,64)"
   stroke-width="1"
   id="g366">
<path
   d="M363.238,395.916 362.057,390.013 363.238,390.013 z"
   id="path330" />
<path
   d="M363.238,395.916 363.238,390.8 363.631,397.883 z"
   id="path331" />
<path
   d="M363.631,397.883 363.238,390.8 363.631,390.8 z"
   id="path332" />
<path
   d="M363.238,390.013 363.238,383.433 363.631,390.013 z"
   id="path333" />
<path
   d="M363.631,390.013 363.238,383.433 363.631,383.433 z"
   id="path334" />
<path
   d="M363.631,397.883 363.631,390.8 364.025,395.916 z"
   id="path335" />
<path
   d="M364.025,395.916 363.631,390.8 364.025,390.8 z"
   id="path336" />
<path
   d="M363.631,390.013 363.631,383.433 364.025,390.013 z"
   id="path337" />
<path
   d="M364.025,390.013 363.631,383.433 364.025,383.433 z"
   id="path338" />
<path
   d="M364.025,395.916 364.025,390.013 365.205,390.013 z"
   id="path339" />
<path
   d="M634.665,457.397 633.484,451.495 634.665,451.495 z"
   id="path340" />
<path
   d="M634.665,457.397 634.665,452.282 635.058,459.365 z"
   id="path341" />
<path
   d="M635.058,459.365 634.665,452.282 635.058,452.282 z"
   id="path342" />
<path
   d="M634.665,451.495 634.665,444.821 635.058,451.495 z"
   id="path343" />
<path
   d="M635.058,451.495 634.665,444.821 635.058,444.821 z"
   id="path344" />
<path
   d="M635.058,459.365 635.058,452.282 635.452,457.397 z"
   id="path345" />
<path
   d="M635.452,457.397 635.058,452.282 635.452,452.282 z"
   id="path346" />
<path
   d="M635.058,451.495 635.058,444.821 635.452,451.495 z"
   id="path347" />
<path
   d="M635.452,451.495 635.058,444.821 635.452,444.821 z"
   id="path348" />
<path
   d="M635.452,457.397 635.452,451.495 636.632,451.495 z"
   id="path349" />
<path
   d="M296.86,378.05 289.777,376.634 296.86,375.217 z"
   id="path350" />
<path
   d="M296.86,378.05 296.86,377.027 297.647,378.208 z"
   id="path351" />
<path
   d="M297.647,378.208 296.86,377.027 297.647,377.027 z"
   id="path352" />
<path
   d="M296.86,376.24 296.86,375.217 297.647,376.24 z"
   id="path353" />
<path
   d="M297.647,376.24 296.86,375.217 297.647,375.06 z"
   id="path354" />
<path
   d="M297.647,377.027 297.647,376.24 304.227,377.027 z"
   id="path355" />
<path
   d="M304.227,377.027 297.647,376.24 304.227,376.24 z"
   id="path356" />
<path
   d="M616.532,531.157 615.351,525.254 616.532,525.254 z"
   id="path357" />
<path
   d="M616.532,531.157 616.532,526.041 616.925,533.124 z"
   id="path358" />
<path
   d="M616.925,533.124 616.532,526.041 616.925,526.041 z"
   id="path359" />
<path
   d="M616.532,525.254 616.532,522.452 616.925,525.254 z"
   id="path360" />
<path
   d="M616.925,525.254 616.532,522.452 616.925,522.452 z"
   id="path361" />
<path
   d="M616.925,533.124 616.925,526.041 617.319,531.157 z"
   id="path362" />
<path
   d="M617.319,531.157 616.925,526.041 617.319,526.041 z"
   id="path363" />
<path
   d="M616.925,525.254 616.925,522.452 617.319,525.254 z"
   id="path364" />
<path
   d="M617.319,525.254 616.925,522.452 617.319,522.452 z"
   id="path365" />
<path
   d="M617.319,531.157 617.319,525.254 618.499,525.254 z"
   id="path366" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g367">
<polyline
   points="287.322,357.651 287.322,362.089 "
   id="polyline366" />
<polyline
   points="313.199,357.651 313.199,362.089 "
   id="polyline367" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(217,217,217)"
   stroke="rgb(217,217,217)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g368">
<path
   d="M287.794,360.484 312.821,360.484 312.821,357.367 287.794,357.367 z"
   id="path367" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g369">
<polyline
   points="342.759,357.651 342.759,362.089 "
   id="polyline368" />
<polyline
   points="368.542,357.651 368.542,362.089 "
   id="polyline369" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(217,217,217)"
   stroke="rgb(217,217,217)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g370">
<path
   d="M343.137,360.484 368.164,360.484 368.164,357.367 343.137,357.367 z"
   id="path369" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g371">
<polyline
   points="655.363,357.651 655.363,362.089 "
   id="polyline370" />
<polyline
   points="681.146,357.651 681.146,362.089 "
   id="polyline371" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(217,217,217)"
   stroke="rgb(217,217,217)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g372">
<path
   d="M655.741,360.484 680.768,360.484 680.768,357.367 655.741,357.367 z"
   id="path371" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g373">
<polyline
   points="710.707,357.651 710.707,362.089 "
   id="polyline372" />
<polyline
   points="736.584,357.651 736.584,362.089 "
   id="polyline373" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(217,217,217)"
   stroke="rgb(217,217,217)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g374">
<path
   d="M711.179,360.484 736.206,360.484 736.206,357.367 711.179,357.367 z"
   id="path373" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(64,64,64)"
   stroke-width="0.35"
   id="g378">
<polyline
   points="443.34,179.249 574.993,179.249 "
   id="polyline374" />
<polyline
   points="443.34,360.012 574.993,360.012 "
   id="polyline375" />
<polyline
   points="429.174,244.698 588.782,244.698 "
   id="polyline376" />
<polyline
   points="429.174,296.83 589.254,296.83 "
   id="polyline377" />
<polyline
   points="194.202,561.174 823.754,561.174 "
   id="polyline378" />
<image
   width="1"
   height="1"
   xlink:href="ESS_Hapag%20Lloyd_RHL%20C_Class_HMI%20Design_ER%20VENT_2407093400fc3466424028a37d125d9b1dc1f1.PNG"
   preserveAspectRatio="none"
   transform="matrix(157.152 0 -0 158.096 430.402 433.016)"
   id="image378" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.25"
   id="g379">
<polyline
   points="430.402,591.112 587.554,591.112 587.554,433.016 430.402,433.016 430.402,591.112 "
   id="polyline379" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(0,0,0)"
   stroke-width="0.35"
   id="g383">
<polyline
   points="273.533,354.629 321.132,354.629 321.132,254.897 273.533,254.897 273.533,354.629 "
   id="polyline380" />
<polyline
   points="327.365,354.062 374.87,354.062 374.87,254.331 327.365,254.331 327.365,354.062 "
   id="polyline381" />
<polyline
   points="643.18,353.59 690.685,353.59 690.685,252.442 643.18,252.442 643.18,353.59 "
   id="polyline382" />
<polyline
   points="696.918,353.023 744.517,353.023 744.517,252.82 696.918,252.82 696.918,353.023 "
   id="polyline383" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(217,217,217)"
   stroke="rgb(217,217,217)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g386">
<path
   d="M273.344,254.614 321.415,254.614 321.415,244.32 273.344,244.32 z"
   id="Fan4_hour" />
<path
   d="M326.988,254.236 375.153,254.236 375.153,243.942 326.988,243.942 z"
   id="Fan3_hour" />
<path
   d="M642.897,252.253 690.874,252.253 690.874,241.959 642.897,241.959 z"
   id="Fan2_hour" />
<path
   d="m 696.54,252.347 h 48.071 V 242.053 H 696.54 Z"
   id="Fan1_hour"
   sodipodi:nodetypes="ccccc" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g387">
<path
   d="M285.811,272.464 309.421,272.464 309.421,263.019 285.811,263.019 z"
   id="path387" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.35"
   id="g388">
<polyline
   points="285.811,272.464 309.421,272.464 309.421,263.019 285.811,263.019 285.811,272.464 "
   id="polyline387" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g389">
<path
   d="M340.871,272.464 364.576,272.464 364.576,263.019 340.871,263.019 z"
   id="path388" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.35"
   id="g390">
<polyline
   points="340.871,272.464 364.576,272.464 364.576,263.019 340.871,263.019 340.871,272.464 "
   id="polyline389" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g391">
<path
   d="M655.363,272.464 678.974,272.464 678.974,263.019 655.363,263.019 z"
   id="path390" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.35"
   id="g392">
<polyline
   points="655.363,272.464 678.974,272.464 678.974,263.019 655.363,263.019 655.363,272.464 "
   id="polyline391" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g393">
<path
   d="M709.196,272.464 732.806,272.464 732.806,263.019 709.196,263.019 z"
   id="path392" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.35"
   id="g394">
<polyline
   points="709.196,272.464 732.806,272.464 732.806,263.019 709.196,263.019 709.196,272.464 "
   id="polyline393" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,102)"
   stroke="rgb(0,0,102)"
   stroke-width="0"
   id="g395">
<text
   transform="matrix(15.6361 0 -0 15.6227 397.551 108.454)"
   font-family="Bahnschrift,'sans-serif'"
   font-size="1.4081"
   id="text394">E/R VENTILATION SYSTEM</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(231,230,230)"
   stroke="rgb(231,230,230)"
   stroke-width="1"
   id="g404">
<path
   d="M650.452,324.564 650.452,316.883 651.014,325.923 z"
   id="path395" />
<path
   d="M651.014,325.923 650.452,316.883 651.014,315.524 z"
   id="path396" />
<path
   d="M651.014,325.923 651.014,315.524 652.373,326.485 z"
   id="path397" />
<path
   d="M652.373,326.485 651.014,315.524 652.373,314.963 z"
   id="path398" />
<path
   d="M652.373,326.485 652.373,314.963 680.926,326.485 z"
   id="path399" />
<path
   d="M680.926,326.485 652.373,314.963 680.926,314.963 z"
   id="path400" />
<path
   d="M680.926,326.485 680.926,314.963 682.284,325.923 z"
   id="path401" />
<path
   d="M682.284,325.923 680.926,314.963 682.284,315.524 z"
   id="path402" />
<path
   d="M682.284,325.923 682.284,315.524 682.846,324.564 z"
   id="path403" />
<path
   d="M682.846,324.564 682.284,315.524 682.846,316.883 z"
   id="path404" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="FAN2_Mode">
<polyline
   points="650.452,316.883 651.014,315.524 652.373,314.963 "
   id="polyline404" />
<polyline
   points="652.373,314.963 680.926,314.963 "
   id="polyline405" />
<polyline
   points="680.926,314.963 682.284,315.524 682.846,316.883 "
   id="polyline406" />
<polyline
   points="682.846,316.883 682.846,324.564 "
   id="polyline407" />
<polyline
   points="682.846,324.564 682.284,325.923 680.926,326.485 "
   id="polyline408" />
<polyline
   points="680.926,326.485 652.373,326.485 "
   id="polyline409" />
<polyline
   points="652.373,326.485 651.014,325.923 650.452,324.564 "
   id="polyline410" />
<polyline
   points="650.452,324.564 650.452,316.883 "
   id="polyline411" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g412">
<text
   transform="matrix(5.27611 0 -0 5.28748 658.05 323.539)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="text411">MAN</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(231,230,230)"
   stroke="rgb(231,230,230)"
   stroke-width="1"
   id="g421">
<path
   d="M706.079,324.564 706.079,316.883 706.641,325.923 z"
   id="path412" />
<path
   d="M706.641,325.923 706.079,316.883 706.641,315.524 z"
   id="path413" />
<path
   d="M706.641,325.923 706.641,315.524 707.999,326.485 z"
   id="path414" />
<path
   d="M707.999,326.485 706.641,315.524 707.999,314.963 z"
   id="path415" />
<path
   d="M707.999,326.485 707.999,314.963 736.458,326.485 z"
   id="path416" />
<path
   d="M736.458,326.485 707.999,314.963 736.458,314.963 z"
   id="path417" />
<path
   d="M736.458,326.485 736.458,314.963 737.816,325.923 z"
   id="path418" />
<path
   d="M737.816,325.923 736.458,314.963 737.816,315.524 z"
   id="path419" />
<path
   d="M737.816,325.923 737.816,315.524 738.378,324.564 z"
   id="path420" />
<path
   d="M738.378,324.564 737.816,315.524 738.378,316.883 z"
   id="path421" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="FAN1_Mode">
<polyline
   points="706.079,316.883 706.641,315.524 707.999,314.963 "
   id="polyline421" />
<polyline
   points="707.999,314.963 736.458,314.963 "
   id="polyline422" />
<polyline
   points="736.458,314.963 737.816,315.524 738.378,316.883 "
   id="polyline423" />
<polyline
   points="738.378,316.883 738.378,324.564 "
   id="polyline424" />
<polyline
   points="738.378,324.564 737.816,325.923 736.458,326.485 "
   id="polyline425" />
<polyline
   points="736.458,326.485 707.999,326.485 "
   id="polyline426" />
<polyline
   points="707.999,326.485 706.641,325.923 706.079,324.564 "
   id="polyline427" />
<polyline
   points="706.079,324.564 706.079,316.883 "
   id="polyline428" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g429">
<text
   transform="matrix(5.27611 0 -0 5.28748 713.598 323.539)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="text428">MAN</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(237,237,237)"
   stroke="rgb(237,237,237)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="ME_Load">
<path
   d="M488.389,428.482 515.4,428.482 515.4,411.294 488.389,411.294 z"
   id="path429" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(38,38,38)"
   stroke="rgb(38,38,38)"
   stroke-width="0"
   id="g431">
<text
   transform="matrix(4.51442 0 -0 4.52945 487.555 406.478)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text430">M/E</text>
<text
   transform="matrix(4.5257 0 -0 4.52945 500.496 406.478)"
   font-family="Arial,'sans-serif'"
   font-size="1.39636"
   id="text431">LOAD</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(231,230,230)"
   stroke="rgb(231,230,230)"
   stroke-width="1"
   id="g440">
<path
   d="M280.711,324.564 280.711,316.883 281.273,325.923 z"
   id="path431" />
<path
   d="M281.273,325.923 280.711,316.883 281.273,315.524 z"
   id="path432" />
<path
   d="M281.273,325.923 281.273,315.524 282.631,326.485 z"
   id="path433" />
<path
   d="M282.631,326.485 281.273,315.524 282.631,314.963 z"
   id="path434" />
<path
   d="M282.631,326.485 282.631,314.963 311.09,326.485 z"
   id="path435" />
<path
   d="M311.09,326.485 282.631,314.963 311.09,314.963 z"
   id="path436" />
<path
   d="M311.09,326.485 311.09,314.963 312.448,325.923 z"
   id="path437" />
<path
   d="M312.448,325.923 311.09,314.963 312.448,315.524 z"
   id="path438" />
<path
   d="M312.448,325.923 312.448,315.524 313.01,324.564 z"
   id="path439" />
<path
   d="M313.01,324.564 312.448,315.524 313.01,316.883 z"
   id="path440" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="FAN4_Mode">
<polyline
   points="280.711,316.883 281.273,315.524 282.631,314.963 "
   id="polyline440" />
<polyline
   points="282.631,314.963 311.09,314.963 "
   id="polyline441" />
<polyline
   points="311.09,314.963 312.448,315.524 313.01,316.883 "
   id="polyline442" />
<polyline
   points="313.01,316.883 313.01,324.564 "
   id="polyline443" />
<polyline
   points="313.01,324.564 312.448,325.923 311.09,326.485 "
   id="polyline444" />
<polyline
   points="311.09,326.485 282.631,326.485 "
   id="polyline445" />
<polyline
   points="282.631,326.485 281.273,325.923 280.711,324.564 "
   id="polyline446" />
<polyline
   points="280.711,324.564 280.711,316.883 "
   id="polyline447" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g448">
<text
   transform="matrix(5.27611 0 -0 5.28748 288.23 323.539)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="text447">MAN</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(231,230,230)"
   stroke="rgb(231,230,230)"
   stroke-width="1"
   id="g457">
<path
   d="M335.298,324.564 335.298,316.883 335.86,325.923 z"
   id="path448" />
<path
   d="M335.86,325.923 335.298,316.883 335.86,315.524 z"
   id="path449" />
<path
   d="M335.86,325.923 335.86,315.524 337.219,326.485 z"
   id="path450" />
<path
   d="M337.219,326.485 335.86,315.524 337.219,314.963 z"
   id="path451" />
<path
   d="M337.219,326.485 337.219,314.963 365.677,326.485 z"
   id="path452" />
<path
   d="M365.677,326.485 337.219,314.963 365.677,314.963 z"
   id="path453" />
<path
   d="M365.677,326.485 365.677,314.963 367.036,325.923 z"
   id="path454" />
<path
   d="M367.036,325.923 365.677,314.963 367.036,315.524 z"
   id="path455" />
<path
   d="M367.036,325.923 367.036,315.524 367.598,324.564 z"
   id="path456" />
<path
   d="M367.598,324.564 367.036,315.524 367.598,316.883 z"
   id="path457" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="FAN3_Mode">
<polyline
   points="335.298,316.883 335.86,315.524 337.219,314.963 "
   id="polyline457" />
<polyline
   points="337.219,314.963 365.677,314.963 "
   id="polyline458" />
<polyline
   points="365.677,314.963 367.036,315.524 367.598,316.883 "
   id="polyline459" />
<polyline
   points="367.598,316.883 367.598,324.564 "
   id="polyline460" />
<polyline
   points="367.598,324.564 367.036,325.923 365.677,326.485 "
   id="polyline461" />
<polyline
   points="365.677,326.485 337.219,326.485 "
   id="polyline462" />
<polyline
   points="337.219,326.485 335.86,325.923 335.298,324.564 "
   id="polyline463" />
<polyline
   points="335.298,324.564 335.298,316.883 "
   id="polyline464" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g465">
<text
   transform="matrix(5.27611 0 -0 5.28748 342.841 323.539)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="text464">MAN</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g466">
<path
   d="M460.812,315.624 491.884,315.624 491.884,303.63 460.812,303.63 z"
   id="path465" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.35"
   id="TX6">
<polyline
   points="460.812,315.624 491.884,315.624 491.884,303.63 460.812,303.63 460.812,315.624 "
   id="polyline466" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g468">
<path
   d="M460.812,263.775 491.884,263.775 491.884,251.781 460.812,251.781 z"
   id="path467" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.35"
   id="DPX2">
<polyline
   points="460.812,263.775 491.884,263.775 491.884,251.781 460.812,251.781 460.812,263.775 "
   id="polyline468" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(255,255,255)"
   stroke="rgb(255,255,255)"
   stroke-width="0.25"
   fill-opacity="0.498039"
   stroke-opacity="0.498039"
   id="g470">
<path
   d="M389.508,296.83 420.485,296.83 420.485,284.93 389.508,284.93 z"
   id="path469" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(255,255,255)"
   stroke-width="0.35"
   id="TX7">
<polyline
   points="389.508,296.83 420.485,296.83 420.485,284.93 389.508,284.93 389.508,296.83 "
   id="polyline470" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(204,236,255)"
   stroke="rgb(204,236,255)"
   stroke-width="1"
   id="g480">
<path
   d="M279.578,346.129 279.578,333.662 280.489,348.333 z"
   id="path471" />
<path
   d="M280.489,348.333 279.578,333.662 280.489,331.458 z"
   id="path472" />
<path
   d="M280.489,348.333 280.489,331.458 282.694,349.245 z"
   id="path473" />
<path
   d="M282.694,349.245 280.489,331.458 282.694,330.546 z"
   id="path474" />
<path
   d="M282.694,349.245 282.694,330.546 311.877,349.245 z"
   id="path475" />
<path
   d="M311.877,349.245 282.694,330.546 311.877,330.546 z"
   id="path476" />
<path
   d="M311.877,349.245 311.877,330.546 314.081,348.333 z"
   id="path477" />
<path
   d="M314.081,348.333 311.877,330.546 314.081,331.458 z"
   id="path478" />
<path
   d="M314.081,348.333 314.081,331.458 314.993,346.129 z"
   id="path479" />
<path
   d="M314.993,346.129 314.081,331.458 314.993,333.662 z"
   id="path480" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="g487">
<polyline
   points="279.578,333.662 280.489,331.458 282.694,330.546 "
   id="polyline480" />
<polyline
   points="282.694,330.546 311.877,330.546 "
   id="polyline481" />
<polyline
   points="311.877,330.546 314.081,331.458 314.993,333.662 "
   id="polyline482" />
<polyline
   points="314.993,333.662 314.993,346.129 "
   id="polyline483" />
<polyline
   points="314.993,346.129 314.081,348.333 311.877,349.245 "
   id="polyline484" />
<polyline
   points="311.877,349.245 282.694,349.245 "
   id="polyline485" />
<polyline
   points="282.694,349.245 280.489,348.333 279.578,346.129 "
   id="polyline486" />
<polyline
   points="279.578,346.129 279.578,333.662 "
   id="polyline487" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g488">
<text
   transform="matrix(4.49152 0 -0 4.49615 288.832 338.021)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="Fan4_Auto">AUTO</text>
<text
   transform="matrix(4.46296 0 -0 4.49615 286.662 346.52)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="Fan4_Hz">50.3 Hz</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(204,236,255)"
   stroke="rgb(204,236,255)"
   stroke-width="1"
   id="g497">
<path
   d="M333.882,346.129 333.882,333.662 334.794,348.333 z"
   id="path488" />
<path
   d="M334.794,348.333 333.882,333.662 334.794,331.458 z"
   id="path489" />
<path
   d="M334.794,348.333 334.794,331.458 336.998,349.245 z"
   id="path490" />
<path
   d="M336.998,349.245 334.794,331.458 336.998,330.546 z"
   id="path491" />
<path
   d="M336.998,349.245 336.998,330.546 366.181,349.245 z"
   id="path492" />
<path
   d="M366.181,349.245 336.998,330.546 366.181,330.546 z"
   id="path493" />
<path
   d="M366.181,349.245 366.181,330.546 368.386,348.333 z"
   id="path494" />
<path
   d="M368.386,348.333 366.181,330.546 368.386,331.458 z"
   id="path495" />
<path
   d="M368.386,348.333 368.386,331.458 369.298,346.129 z"
   id="path496" />
<path
   d="M369.298,346.129 368.386,331.458 369.298,333.662 z"
   id="path497" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="g504">
<polyline
   points="333.882,333.662 334.794,331.458 336.998,330.546 "
   id="polyline497" />
<polyline
   points="336.998,330.546 366.181,330.546 "
   id="polyline498" />
<polyline
   points="366.181,330.546 368.386,331.458 369.298,333.662 "
   id="polyline499" />
<polyline
   points="369.298,333.662 369.298,346.129 "
   id="polyline500" />
<polyline
   points="369.298,346.129 368.386,348.333 366.181,349.245 "
   id="polyline501" />
<polyline
   points="366.181,349.245 336.998,349.245 "
   id="polyline502" />
<polyline
   points="336.998,349.245 334.794,348.333 333.882,346.129 "
   id="polyline503" />
<polyline
   points="333.882,346.129 333.882,333.662 "
   id="polyline504" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g505">
<text
   transform="matrix(4.49152 0 -0 4.49615 343.136 338.021)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="Fan3_Auto">AUTO</text>
<text
   transform="matrix(4.46296 0 -0 4.49615 340.966 346.52)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="Fan3_Hz">50.3 Hz</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(204,236,255)"
   stroke="rgb(204,236,255)"
   stroke-width="1"
   id="g514">
<path
   d="M648.941,346.129 648.941,333.662 649.853,348.333 z"
   id="path505" />
<path
   d="M649.853,348.333 648.941,333.662 649.853,331.458 z"
   id="path506" />
<path
   d="M649.853,348.333 649.853,331.458 652.058,349.245 z"
   id="path507" />
<path
   d="M652.058,349.245 649.853,331.458 652.058,330.546 z"
   id="path508" />
<path
   d="M652.058,349.245 652.058,330.546 681.241,349.245 z"
   id="path509" />
<path
   d="M681.241,349.245 652.058,330.546 681.241,330.546 z"
   id="path510" />
<path
   d="M681.241,349.245 681.241,330.546 683.445,348.333 z"
   id="path511" />
<path
   d="M683.445,348.333 681.241,330.546 683.445,331.458 z"
   id="path512" />
<path
   d="M683.445,348.333 683.445,331.458 684.357,346.129 z"
   id="path513" />
<path
   d="M684.357,346.129 683.445,331.458 684.357,333.662 z"
   id="path514" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="g521">
<polyline
   points="648.941,333.662 649.853,331.458 652.058,330.546 "
   id="polyline514" />
<polyline
   points="652.058,330.546 681.241,330.546 "
   id="polyline515" />
<polyline
   points="681.241,330.546 683.445,331.458 684.357,333.662 "
   id="polyline516" />
<polyline
   points="684.357,333.662 684.357,346.129 "
   id="polyline517" />
<polyline
   points="684.357,346.129 683.445,348.333 681.241,349.245 "
   id="polyline518" />
<polyline
   points="681.241,349.245 652.058,349.245 "
   id="polyline519" />
<polyline
   points="652.058,349.245 649.853,348.333 648.941,346.129 "
   id="polyline520" />
<polyline
   points="648.941,346.129 648.941,333.662 "
   id="polyline521" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g522">
<text
   transform="matrix(4.49152 0 -0 4.49615 658.235 338.021)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="Fan2_Auto">AUTO</text>
<text
   transform="scale(0.99630223,1.0037115)"
   font-family="Calibri, sans-serif"
   font-size="7.05668px"
   id="Fan2_Hz"
   x="658.50043"
   y="345.13864"
   style="stroke-width:0">50.3 Hz</text>
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(204,236,255)"
   stroke="rgb(204,236,255)"
   stroke-width="1"
   id="g531">
<path
   d="M704.473,346.129 704.473,333.662 705.385,348.333 z"
   id="path522" />
<path
   d="M705.385,348.333 704.473,333.662 705.385,331.458 z"
   id="path523" />
<path
   d="M705.385,348.333 705.385,331.458 707.59,349.245 z"
   id="path524" />
<path
   d="M707.59,349.245 705.385,331.458 707.59,330.546 z"
   id="path525" />
<path
   d="M707.59,349.245 707.59,330.546 736.773,349.245 z"
   id="path526" />
<path
   d="M736.773,349.245 707.59,330.546 736.773,330.546 z"
   id="path527" />
<path
   d="M736.773,349.245 736.773,330.546 738.977,348.333 z"
   id="path528" />
<path
   d="M738.977,348.333 736.773,330.546 738.977,331.458 z"
   id="path529" />
<path
   d="M738.977,348.333 738.977,331.458 739.889,346.129 z"
   id="path530" />
<path
   d="M739.889,346.129 738.977,331.458 739.889,333.662 z"
   id="path531" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="none"
   stroke="rgb(23,44,81)"
   stroke-width="0.09"
   id="g538">
<polyline
   points="704.473,333.662 705.385,331.458 707.59,330.546 "
   id="polyline531" />
<polyline
   points="707.59,330.546 736.773,330.546 "
   id="polyline532" />
<polyline
   points="736.773,330.546 738.977,331.458 739.889,333.662 "
   id="polyline533" />
<polyline
   points="739.889,333.662 739.889,346.129 "
   id="polyline534" />
<polyline
   points="739.889,346.129 738.977,348.333 736.773,349.245 "
   id="polyline535" />
<polyline
   points="736.773,349.245 707.59,349.245 "
   id="polyline536" />
<polyline
   points="707.59,349.245 705.385,348.333 704.473,346.129 "
   id="polyline537" />
<polyline
   points="704.473,346.129 704.473,333.662 "
   id="polyline538" />
</g>
<g
   clip-path="url(#clipId0)"
   fill="rgb(0,0,0)"
   stroke="rgb(0,0,0)"
   stroke-width="0"
   id="g539">
<text
   transform="matrix(4.49152 0 -0 4.49615 713.767 338.021)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="Fan1_Auto">AUTO</text>
<text
   transform="matrix(4.46296 0 -0 4.49615 711.597 346.52)"
   font-family="Calibri,'sans-serif'"
   font-size="1.57532"
   id="Fan1_Hz">50.3 Hz</text>
</g>


</svg>
`;function Kd({sensors:n={},fans:e=[],equipment:t=[],onCommand:i}){const l=I.useRef(null),[a,s]=I.useState(!1),[o,d]=I.useState(null),f=e.length>0?e:t.length>=10?t.slice(6,10):[];I.useEffect(()=>{y()},[]);const y=async()=>{try{l.current&&(l.current.innerHTML=Qd,s(!0))}catch(h){console.error("SVG 로드 오류:",h)}};I.useEffect(()=>{a&&m()},[n,f,a]);const m=()=>{if(!l.current)return;const h=l.current.querySelector("svg");h&&(Object.keys(Ja).forEach(k=>{const z=Ja[k],x=h.querySelector(`#${z.labelId}`);if(x&&n[k]!==void 0){const E=n[k].toFixed(z.decimal),c=`${k}_text`;let p=h.querySelector(`#${c}`);p&&p.remove();const u=x.getBBox(),g=u.x+u.width/2,N=u.y+u.height/2+2,M=document.createElementNS("http://www.w3.org/2000/svg","text");M.setAttribute("id",c),M.setAttribute("x",g),M.setAttribute("y",N),M.setAttribute("text-anchor","middle"),M.setAttribute("fill","#000000"),M.setAttribute("font-size","8"),M.setAttribute("font-family","Arial, sans-serif"),M.setAttribute("font-weight","bold"),M.textContent=`${E}${z.unit}`,h.appendChild(M)}}),f.forEach((k,z)=>{var g;const x=Xd[z];if(!x)return;const E=k.auto_mode!==void 0?k.auto_mode:!1,c=h.querySelector(`#${x.symbolIds.modeText}`);c&&(c.textContent=E?"AUTO":"MANU",c.setAttribute("fill",E?"#00AA00":"#FF0000"),c.setAttribute("font-weight","bold"),c.setAttribute("stroke","#000000"),c.setAttribute("stroke-width","0.3"),c.setAttribute("paint-order","stroke fill"));const p=h.querySelector(`#${x.symbolIds.auto}`);p&&(p.textContent=E?"AUTO":"MANU",p.setAttribute("fill",E?"#00AA00":"#FF0000"),p.setAttribute("font-weight","bold"),p.setAttribute("stroke","#000000"),p.setAttribute("stroke-width","0.3"),p.setAttribute("paint-order","stroke fill"));const u=h.querySelector(`#${x.symbolIds.hz}`);u&&(u.textContent=`${((g=k.frequency)==null?void 0:g.toFixed(1))||0} Hz`)}))};return r.jsxs("div",{className:"fan-diagram-wrapper",children:[r.jsx("div",{className:"fan-diagram-header",children:r.jsx("h2",{children:"🌀 E/R Ventilation System"})}),r.jsx("div",{className:"fan-diagram-content",ref:l})]})}function qa({pumps:n=[],onCommand:e,onPumpCommand:t,isFanMode:i=!1}){var f,y,m;const[l,a]=I.useState(null),[s,o]=I.useState(!1),d=async(h,k)=>{o(!0);try{let z=!1;if(e&&h.name)z=await e(h.name,k);else if(t){const E=n.findIndex(c=>c===h);z=await t(E,k)}const x=k==="start"?"시작":k==="start_fwd"?"정방향 시작":k==="start_bwd"?"역방향 시작":"정지";alert(z?`✅ ${h.name} ${x} 명령 성공`:"❌ 명령 실패")}catch(z){alert(`❌ 오류: ${z.message}`)}finally{o(!1)}};return r.jsxs("div",{className:`pump-control ${i?"fan-mode":""}`,children:[r.jsxs("div",{className:"control-header",children:[r.jsx("h2",{children:i?"🌀 팬 제어":"⚙️ 펌프 제어"}),r.jsx("p",{children:i?"팬을 선택하고 정방향/역방향/정지 명령을 내릴 수 있습니다.":"펌프를 선택하고 시작/정지 명령을 내릴 수 있습니다."})]}),r.jsx("div",{className:"control-grid",children:i?r.jsxs("section",{className:"control-section",children:[r.jsx("h3",{children:"🌀 Engine Room 팬 (E/R Fan)"}),r.jsx("div",{className:"pump-control-list",children:n.map((h,k)=>r.jsx(nr,{pump:h,pumpIndex:k,isFan:!0,onStart:()=>d(h,"start_fwd"),onStartBwd:()=>d(h,"start_bwd"),onStop:()=>d(h,"stop"),disabled:s,isSelected:l===k,onSelect:()=>a(k)},k))})]}):r.jsxs(r.Fragment,{children:[r.jsxs("section",{className:"control-section",children:[r.jsx("h3",{children:"🌊 해수 펌프 (Sea Water Pump)"}),r.jsx("div",{className:"pump-control-list",children:n.slice(0,3).map((h,k)=>r.jsx(nr,{pump:h,pumpIndex:k,isFan:!1,onStart:()=>d(h,"start"),onStop:()=>d(h,"stop"),disabled:s,isSelected:l===k,onSelect:()=>a(k)},k))})]}),r.jsxs("section",{className:"control-section",children:[r.jsx("h3",{children:"💧 청수 펌프 (Fresh Water Pump)"}),r.jsx("div",{className:"pump-control-list",children:n.slice(3,6).map((h,k)=>r.jsx(nr,{pump:h,pumpIndex:k+3,isFan:!1,onStart:()=>d(h,"start"),onStop:()=>d(h,"stop"),disabled:s,isSelected:l===k+3,onSelect:()=>a(k+3)},k+3))})]})]})}),l!==null&&n[l]&&r.jsxs("div",{className:"pump-detail-panel",children:[r.jsxs("h3",{children:["📋 ",n[l].name," 상세 정보"]}),r.jsxs("div",{className:"detail-grid",children:[r.jsx(de,{label:"운전 상태",value:n[l].running?"🟢 운전중":"⚪ 정지"}),r.jsx(de,{label:"ESS 모드",value:n[l].ess_mode?"⚡ 활성":"⚫ 비활성"}),r.jsx(de,{label:"현재 주파수",value:`${(f=n[l].frequency)==null?void 0:f.toFixed(1)} Hz`}),r.jsx(de,{label:"현재 전력",value:`${n[l].power_kw} kW`}),r.jsx(de,{label:"평균 전력",value:`${n[l].avg_power} kW`}),r.jsx(de,{label:"절감 전력량",value:`${(y=n[l].saved_kwh)==null?void 0:y.toLocaleString()} kWh`}),r.jsx(de,{label:"절감률",value:`${n[l].saved_ratio}%`}),r.jsx(de,{label:"운전 시간",value:`${(m=n[l].run_hours)==null?void 0:m.toLocaleString()} h`})]})]})]})}function nr({pump:n,pumpIndex:e,isFan:t,onStart:i,onStartBwd:l,onStop:a,disabled:s,isSelected:o,onSelect:d}){var y;const f=t?n.running_fwd||n.running_bwd:n.running;return r.jsxs("div",{className:`pump-control-card ${o?"selected":""} ${f?"running":"stopped"}`,onClick:d,children:[r.jsxs("div",{className:"control-card-header",children:[r.jsx("h4",{children:n.name}),r.jsx("span",{className:`status-indicator ${f?"active":"inactive"}`,children:t?n.running_fwd?"🟢 정방향":n.running_bwd?"🟡 역방향":"⚪ 정지":n.running?"🟢 운전중":"⚪ 정지"})]}),r.jsxs("div",{className:"control-card-info",children:[r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:"주파수"}),r.jsxs("span",{className:"info-value",children:[((y=n.frequency)==null?void 0:y.toFixed(1))||0," Hz"]})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:"전력"}),r.jsxs("span",{className:"info-value",children:[n.power_kw||0," kW"]})]})]}),r.jsx("div",{className:"control-buttons",children:t?r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"btn-start",onClick:m=>{m.stopPropagation(),i()},disabled:s||n.running_fwd,children:"▶️ 정방향"}),r.jsx("button",{className:"btn-start-bwd",onClick:m=>{m.stopPropagation(),l()},disabled:s||n.running_bwd,children:"◀️ 역방향"}),r.jsx("button",{className:"btn-stop",onClick:m=>{m.stopPropagation(),a()},disabled:s||!f,children:"⏸️ 정지"})]}):r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"btn-start",onClick:m=>{m.stopPropagation(),i()},disabled:s||n.running,children:"▶️ 시작"}),r.jsx("button",{className:"btn-stop",onClick:m=>{m.stopPropagation(),a()},disabled:s||!n.running,children:"⏸️ 정지"})]})})]})}function de({label:n,value:e}){return r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"detail-item-label",children:n}),r.jsx("span",{className:"detail-item-value",children:e})]})}function Zd({sensors:n={},pumps:e=[]}){const[t,i]=I.useState([]),l=50;return I.useEffect(()=>{if(Object.keys(n).length>0){const s={time:new Date().toLocaleTimeString("ko-KR"),TX1:n.TX1||0,TX2:n.TX2||0,TX3:n.TX3||0,TX4:n.TX4||0,TX5:n.TX5||0,TX6:n.TX6||0,TX7:n.TX7||0,DPX1:n.DPX1||0,PU1:n.PU1||0,totalPower:e.reduce((o,d)=>o+(d.power_kw||0),0)};i(o=>{const d=[...o,s];return d.length>l?d.slice(-l):d})}},[n,e]),r.jsxs("div",{className:"trend-chart",children:[r.jsxs("div",{className:"chart-header",children:[r.jsx("h2",{children:"📈 실시간 트렌드"}),r.jsxs("p",{children:["최근 ",l,"개 데이터 포인트"]})]}),r.jsxs("div",{className:"charts-grid",children:[r.jsx(Gn,{title:"CSW 펌프 토출 온도 (TX1)",data:t,dataKey:"TX1",unit:"°C",color:"#ef4444"}),r.jsx(Gn,{title:"FW Cooler 1 SW Out (TX2)",data:t,dataKey:"TX2",unit:"°C",color:"#f97316"}),r.jsx(Gn,{title:"FW Cooler 2 SW Out (TX3)",data:t,dataKey:"TX3",unit:"°C",color:"#fb923c"}),r.jsx(Gn,{title:"FW Cooler FW In (TX4)",data:t,dataKey:"TX4",unit:"°C",color:"#dc2626"}),r.jsx(Gn,{title:"FW Cooler FW Out (TX5)",data:t,dataKey:"TX5",unit:"°C",color:"#06b6d4"}),r.jsx(Gn,{title:"CSW 펌프 토출 압력 (DPX1)",data:t,dataKey:"DPX1",unit:"kg/cm²",color:"#3b82f6"}),r.jsx(Gn,{title:"E/R Inside Temp (TX6)",data:t,dataKey:"TX6",unit:"°C",color:"#b91c1c"}),r.jsx(Gn,{title:"E/R Outside Temp (TX7)",data:t,dataKey:"TX7",unit:"°C",color:"#0891b2"}),r.jsx(Gn,{title:"M/E 부하 트렌드 (PU1)",data:t,dataKey:"PU1",unit:"%",color:"#10b981"}),r.jsx(Gn,{title:"총 소비 전력",data:t,dataKey:"totalPower",unit:"kW",color:"#f59e0b"})]})]})}function Gn({title:n,data:e,dataKey:t,unit:i,color:l}){const a=e.map(y=>y[t]),s=Math.max(...a,1),o=Math.min(...a,0),d=s-o||1,f=a[a.length-1]||0;return r.jsxs("div",{className:"chart-panel",children:[r.jsxs("div",{className:"chart-panel-header",children:[r.jsx("h3",{children:n}),r.jsxs("span",{className:"current-value",style:{color:l},children:[f.toFixed(2)," ",i]})]}),r.jsx("div",{className:"chart-container",children:r.jsxs("svg",{className:"chart-svg",viewBox:"0 0 500 200",children:[r.jsx("line",{x1:"0",y1:"0",x2:"500",y2:"0",stroke:"#334155",strokeWidth:"1"}),r.jsx("line",{x1:"0",y1:"50",x2:"500",y2:"50",stroke:"#334155",strokeWidth:"1",strokeDasharray:"5,5"}),r.jsx("line",{x1:"0",y1:"100",x2:"500",y2:"100",stroke:"#334155",strokeWidth:"1",strokeDasharray:"5,5"}),r.jsx("line",{x1:"0",y1:"150",x2:"500",y2:"150",stroke:"#334155",strokeWidth:"1",strokeDasharray:"5,5"}),r.jsx("line",{x1:"0",y1:"200",x2:"500",y2:"200",stroke:"#334155",strokeWidth:"1"}),a.length>1&&r.jsx("polyline",{fill:"none",stroke:l,strokeWidth:"3",points:a.map((y,m)=>{const h=m/(a.length-1)*500,k=200-(y-o)/d*200;return`${h},${k}`}).join(" ")}),a.map((y,m)=>{const h=m/Math.max(a.length-1,1)*500,k=200-(y-o)/d*200;return r.jsx("circle",{cx:h,cy:k,r:"3",fill:l},m)})]})}),r.jsxs("div",{className:"chart-footer",children:[r.jsxs("span",{children:["최소: ",o.toFixed(2)]}),r.jsxs("span",{children:["최대: ",s.toFixed(2)]})]})]})}function Yd({alarms:n,alarmSummary:e,alarmSoundMuted:t,onToggleMute:i}){const[l,a]=I.useState([]),s=I.useRef(new Set);I.useEffect(()=>{n&&Array.isArray(n)&&a(n)},[n]);const o=l,d=h=>{switch(h){case"critical":return"🔴";case"warning":return"🟡";case"info":return"🟢";default:return"⚪"}},f=h=>{switch(h){case"critical":return"alarm-critical";case"warning":return"alarm-warning";case"info":return"alarm-info";default:return"alarm-normal"}},y=async h=>{if(s.current.has(h)){console.log("⏳ 이미 확인 요청 중:",h);return}try{console.log("✅ 알람 확인 버튼 클릭:",h),s.current.add(h),(await fetch("http://localhost:8000/api/alarms/acknowledge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({alarm_id:h,user:"Operator"})})).ok?console.log("✅ 알람 확인 성공 - WebSocket 업데이트 대기 중"):console.error("❌ 알람 확인 실패")}catch(k){console.error("❌ 알람 확인 오류:",k)}finally{setTimeout(()=>{s.current.delete(h)},2e3)}},m=o.some(h=>!h.acknowledged);return r.jsxs("div",{className:"alarm-panel",children:[r.jsxs("div",{className:`alarm-header ${m?"has-alarms":""}`,children:[r.jsx("h2",{children:"🔔 알람 시스템"}),r.jsxs("div",{className:"alarm-summary-row",children:[r.jsxs("div",{className:"alarm-summary",children:[r.jsxs("span",{className:"summary-item critical",children:["위험: ",(e==null?void 0:e.critical)||0]}),r.jsxs("span",{className:"summary-item warning",children:["경고: ",(e==null?void 0:e.warning)||0]}),r.jsxs("span",{className:"summary-item info",children:["정보: ",(e==null?void 0:e.info)||0]})]}),m&&i&&r.jsx("button",{className:`btn-mute ${t?"muted":""}`,onClick:i,title:t?"경고음 켜기":"경고음 끄기",children:t?"🔇 소리 켜기":"🔊 음소거"})]})]}),r.jsx("div",{className:"alarm-list",children:o.length===0?r.jsx("div",{className:"no-alarms",children:r.jsx("span",{children:"✅ 활성 알람이 없습니다"})}):o.map(h=>r.jsxs("div",{className:`alarm-item ${f(h.level)} ${h.acknowledged?"acknowledged":""}`,children:[r.jsx("div",{className:"alarm-icon",children:d(h.level)}),r.jsxs("div",{className:"alarm-content",children:[r.jsx("div",{className:"alarm-message",children:h.message}),r.jsx("div",{className:"alarm-time",children:new Date(h.time).toLocaleString("ko-KR")})]}),r.jsx("div",{className:"alarm-actions",children:!h.acknowledged&&r.jsx("button",{className:"btn-acknowledge",onClick:()=>y(h.id),children:"확인"})})]},h.id))})]})}function Jd(){const[n,e]=I.useState("temp"),[t,i]=I.useState({swp_op_temp:35,swp_lo_temp:32,swp_hi_temp:38,swp_temp_limit:40,swp_prs:3.5,fwp_1p_op_temp:45,fwp_1p_lo_temp:40,fwp_1p_hi_temp:50,fwp_2p_op_temp:45,fwp_2p_lo_temp:40,fwp_2p_hi_temp:50,swp_adj_cycle:60,swp_adj_hz:5,swp_min_hz:40,swp_max_hz:60,fwp_adj_cycle:60,fwp_adj_hz:5,fwp_min_hz:40,fwp_max_hz:60,fan_adj_cycle:60,fan_adj_hz:5,fan_min_hz:40,fan_max_hz:60,swp_1p_time:240,swp_2p_time:240,swp_op_time:1,swp_speed_limit:300,fwp_1p_chg_time:240,fwp_2p_chg_time:240,fwp_op_time:1,fwp_speed_limit:300,meg_load_lmt1:30,meg_load_lmt2:20}),[l,a]=I.useState(!1),s=(d,f)=>{i(y=>({...y,[d]:parseFloat(f)}))},o=async()=>{console.log("저장할 설정:",t),a(!0),setTimeout(()=>a(!1),2e3)};return r.jsxs("div",{className:"settings",children:[r.jsxs("div",{className:"settings-header",children:[r.jsx("h2",{children:"⚙️ 시스템 설정"}),r.jsx("p",{children:"펌프 운전 파라미터 및 제어 설정"})]}),r.jsxs("div",{className:"settings-tabs",children:[r.jsx("button",{className:n==="temp"?"active":"",onClick:()=>e("temp"),children:"🌡️ 온도 설정"}),r.jsx("button",{className:n==="vfd"?"active":"",onClick:()=>e("vfd"),children:"⚡ VFD 설정"}),r.jsx("button",{className:n==="operation"?"active":"",onClick:()=>e("operation"),children:"🔧 운전 설정"}),r.jsx("button",{className:n==="departure"?"active":"",onClick:()=>e("departure"),children:"🚢 출항 모드"}),r.jsx("button",{className:n==="system"?"active":"",onClick:()=>e("system"),children:"💻 시스템"})]}),r.jsxs("div",{className:"settings-content",children:[n==="temp"&&r.jsx(qd,{settings:t,onChange:s}),n==="vfd"&&r.jsx(n5,{settings:t,onChange:s}),n==="operation"&&r.jsx(e5,{settings:t,onChange:s}),n==="departure"&&r.jsx(t5,{settings:t,onChange:s}),n==="system"&&r.jsx(i5,{})]}),r.jsxs("div",{className:"settings-footer",children:[r.jsx("button",{className:"btn-save",onClick:o,children:"💾 설정 저장"}),l&&r.jsx("span",{className:"save-success",children:"✅ 저장 완료!"})]})]})}function qd({settings:n,onChange:e}){return r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{children:"🌊 해수 펌프 온도(TX5) 설정"}),r.jsxs("div",{className:"settings-grid",children:[r.jsx(B,{label:"운전 온도",value:n.swp_op_temp,unit:"°C",onChange:t=>e("swp_op_temp",t),min:-30,max:100}),r.jsx(B,{label:"저온 온도",value:n.swp_lo_temp,unit:"°C",onChange:t=>e("swp_lo_temp",t),min:-30,max:100}),r.jsx(B,{label:"고온 온도",value:n.swp_hi_temp,unit:"°C",onChange:t=>e("swp_hi_temp",t),min:-30,max:100}),r.jsx(B,{label:"온도 제한",value:n.swp_temp_limit,unit:"°C",onChange:t=>e("swp_temp_limit",t),min:-30,max:100}),r.jsx(B,{label:"압력 설정",value:n.swp_prs,unit:"kg/cm²",onChange:t=>e("swp_prs",t),min:0,max:10,step:.1})]}),r.jsx("h3",{children:"💧 청수 펌프 온도(TX4) 설정"}),r.jsxs("div",{className:"settings-grid",children:[r.jsxs("div",{className:"settings-subsection",children:[r.jsx("h4",{children:"펌프 1대 운전시"}),r.jsx(B,{label:"운전 온도",value:n.fwp_1p_op_temp,unit:"°C",onChange:t=>e("fwp_1p_op_temp",t)}),r.jsx(B,{label:"저온 온도",value:n.fwp_1p_lo_temp,unit:"°C",onChange:t=>e("fwp_1p_lo_temp",t)}),r.jsx(B,{label:"고온 온도",value:n.fwp_1p_hi_temp,unit:"°C",onChange:t=>e("fwp_1p_hi_temp",t)})]}),r.jsxs("div",{className:"settings-subsection",children:[r.jsx("h4",{children:"펌프 2대 운전시"}),r.jsx(B,{label:"운전 온도",value:n.fwp_2p_op_temp,unit:"°C",onChange:t=>e("fwp_2p_op_temp",t)}),r.jsx(B,{label:"저온 온도",value:n.fwp_2p_lo_temp,unit:"°C",onChange:t=>e("fwp_2p_lo_temp",t)}),r.jsx(B,{label:"고온 온도",value:n.fwp_2p_hi_temp,unit:"°C",onChange:t=>e("fwp_2p_hi_temp",t)})]})]})]})}function n5({settings:n,onChange:e}){return r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{children:"🌊 해수 펌프 VFD 설정"}),r.jsxs("div",{className:"settings-grid",children:[r.jsx(B,{label:"조정 주기",value:n.swp_adj_cycle,unit:"초",onChange:t=>e("swp_adj_cycle",t),min:1,max:300}),r.jsx(B,{label:"조정 주파수",value:n.swp_adj_hz,unit:"Hz",onChange:t=>e("swp_adj_hz",t),min:1,max:10}),r.jsx(B,{label:"최소 주파수",value:n.swp_min_hz,unit:"Hz",onChange:t=>e("swp_min_hz",t),min:10,max:60}),r.jsx(B,{label:"최대 주파수",value:n.swp_max_hz,unit:"Hz",onChange:t=>e("swp_max_hz",t),min:30,max:60})]}),r.jsx("h3",{children:"💧 청수 펌프 VFD 설정"}),r.jsxs("div",{className:"settings-grid",children:[r.jsx(B,{label:"조정 주기",value:n.fwp_adj_cycle,unit:"초",onChange:t=>e("fwp_adj_cycle",t),min:1,max:300}),r.jsx(B,{label:"조정 주파수",value:n.fwp_adj_hz,unit:"Hz",onChange:t=>e("fwp_adj_hz",t),min:1,max:10}),r.jsx(B,{label:"최소 주파수",value:n.fwp_min_hz,unit:"Hz",onChange:t=>e("fwp_min_hz",t),min:10,max:60}),r.jsx(B,{label:"최대 주파수",value:n.fwp_max_hz,unit:"Hz",onChange:t=>e("fwp_max_hz",t),min:30,max:60})]}),r.jsx("h3",{children:"🌀 E/R Fan VFD 설정"}),r.jsxs("div",{className:"settings-grid",children:[r.jsx(B,{label:"조정 주기",value:n.fan_adj_cycle,unit:"초",onChange:t=>e("fan_adj_cycle",t),min:1,max:300}),r.jsx(B,{label:"조정 주파수",value:n.fan_adj_hz,unit:"Hz",onChange:t=>e("fan_adj_hz",t),min:1,max:10}),r.jsx(B,{label:"최소 주파수",value:n.fan_min_hz,unit:"Hz",onChange:t=>e("fan_min_hz",t),min:10,max:60}),r.jsx(B,{label:"최대 주파수",value:n.fan_max_hz,unit:"Hz",onChange:t=>e("fan_max_hz",t),min:30,max:60})]})]})}function e5({settings:n,onChange:e}){return r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{children:"🔧 펌프 운전 설정"}),r.jsxs("div",{className:"settings-grid",children:[r.jsx(B,{label:"SWP 1펌프 운전 시간",value:n.swp_1p_time,unit:"분",onChange:t=>e("swp_1p_time",t),min:1,max:1e3}),r.jsx(B,{label:"SWP 2펌프 운전 시간",value:n.swp_2p_time,unit:"분",onChange:t=>e("swp_2p_time",t),min:1,max:1e3}),r.jsx(B,{label:"SWP 운전 순서",value:n.swp_op_time,unit:"",onChange:t=>e("swp_op_time",t),min:1,max:6}),r.jsx(B,{label:"최적속도 운전 시간",value:n.swp_speed_limit,unit:"초",onChange:t=>e("swp_speed_limit",t),min:0,max:600}),r.jsx(B,{label:"FWP 1펌프 운전 시간",value:n.fwp_1p_chg_time,unit:"분",onChange:t=>e("fwp_1p_chg_time",t),min:1,max:1e3}),r.jsx(B,{label:"FWP 2펌프 운전 시간",value:n.fwp_2p_chg_time,unit:"분",onChange:t=>e("fwp_2p_chg_time",t),min:1,max:1e3}),r.jsx(B,{label:"FWP 운전 순서",value:n.fwp_op_time,unit:"",onChange:t=>e("fwp_op_time",t),min:1,max:6}),r.jsx(B,{label:"최적속도 운전 시간",value:n.fwp_speed_limit,unit:"초",onChange:t=>e("fwp_speed_limit",t),min:0,max:600})]}),r.jsx("h3",{children:"🔥 M/E 부하 설정"}),r.jsxs("div",{className:"settings-grid",children:[r.jsx(B,{label:"운항 부하 기준값",value:n.meg_load_lmt1,unit:"%",onChange:t=>e("meg_load_lmt1",t),min:0,max:100}),r.jsx(B,{label:"정박 부하 기준값",value:n.meg_load_lmt2,unit:"%",onChange:t=>e("meg_load_lmt2",t),min:0,max:100})]})]})}function t5({settings:n,onChange:e}){const[t,i]=I.useState(!1);return r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{children:"🚢 출항 모드 설정"}),r.jsxs("div",{className:"departure-mode-card",children:[r.jsxs("div",{className:"departure-status",children:[r.jsx("span",{className:"status-label",children:"현재 상태:"}),r.jsx("span",{className:`status-badge ${t?"active":"inactive"}`,children:t?"🟢 출항 모드 활성":"⚪ 정상 모드"})]}),r.jsxs("div",{className:"departure-description",children:[r.jsxs("p",{children:[r.jsx("strong",{children:"출항 모드란?"}),r.jsx("br",{}),"선박 출항 시 엔진 부하가 낮을 때 자동으로 ESS 모드로 전환되는 것을 방지합니다."]}),r.jsxs("p",{children:[r.jsx("strong",{children:"해제 조건:"}),r.jsx("br",{}),"M/E 부하가 ",n.meg_load_lmt2,"% 이상일 때 자동으로 정상 모드로 전환됩니다."]})]}),r.jsx("button",{className:`btn-departure ${t?"active":""}`,onClick:()=>i(!t),children:t?"🔓 정상 모드로 전환":"🔒 출항 모드 활성화"})]}),r.jsx("div",{className:"settings-grid",children:r.jsx(B,{label:"M/E 부하 해제 설정",value:n.meg_load_lmt2,unit:"%",onChange:l=>e("meg_load_lmt2",l),min:0,max:100})})]})}function i5(){return r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{children:"💻 시스템 설정"}),r.jsxs("div",{className:"system-info",children:[r.jsxs("div",{className:"info-card",children:[r.jsx("h4",{children:"🔌 PLC 연결 정보"}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"IP 주소:"}),r.jsx("span",{children:"127.0.0.1"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"포트:"}),r.jsx("span",{children:"502"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"프로토콜:"}),r.jsx("span",{children:"Modbus TCP"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"Node ID:"}),r.jsx("span",{children:"3"})]})]}),r.jsxs("div",{className:"info-card",children:[r.jsx("h4",{children:"📊 시스템 정보"}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"버전:"}),r.jsx("span",{children:"1.0.0"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"화면 해상도:"}),r.jsx("span",{children:"1280 x 1024"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"업데이트 주기:"}),r.jsx("span",{children:"1초"})]})]}),r.jsxs("div",{className:"info-card",children:[r.jsx("h4",{children:"💾 데이터 저장"}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"데이터 폴더:"}),r.jsx("span",{children:"C:\\HMI_DATA"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"로그 보관 기간:"}),r.jsx("span",{children:"30일"})]})]})]})]})}function B({label:n,value:e,unit:t,onChange:i,min:l=0,max:a=100,step:s=1}){return r.jsxs("div",{className:"setting-item",children:[r.jsx("label",{children:n}),r.jsxs("div",{className:"setting-input-group",children:[r.jsx("input",{type:"number",value:e,onChange:o=>i(o.target.value),min:l,max:a,step:s}),r.jsx("span",{className:"unit",children:t})]})]})}function l5({equipment:n=[],pumps:e=[],fans:t=[],onCommand:i}){const[l,a]=I.useState("automan"),s=n.length>0?n:e;return r.jsxs("div",{className:"advanced-control",children:[r.jsxs("div",{className:"control-header",children:[r.jsx("h2",{children:"🎛️ 고급 제어"}),r.jsx("p",{children:"자동/수동 전환, PID 제어, VFD 상세 정보"})]}),r.jsxs("div",{className:"control-tabs",children:[r.jsx("button",{className:l==="automan"?"active":"",onClick:()=>a("automan"),children:"🔄 자동/수동"}),r.jsx("button",{className:l==="pid"?"active":"",onClick:()=>a("pid"),children:"📐 PID 제어"}),r.jsx("button",{className:l==="vfdinfo"?"active":"",onClick:()=>a("vfdinfo"),children:"⚡ VFD 정보"})]}),r.jsxs("div",{className:"control-content",children:[l==="automan"&&r.jsx(r5,{equipment:s,pumps:e,fans:t,onCommand:i}),l==="pid"&&r.jsx(s5,{}),l==="vfdinfo"&&r.jsx(o5,{equipment:s})]})]})}function r5({equipment:n=[],pumps:e=[],fans:t=[],onCommand:i}){const l=n.length>0?n:e,[a,s]=I.useState({SWP1:{auto:!0,vfd:!0},SWP2:{auto:!0,vfd:!0},SWP3:{auto:!0,vfd:!0},FWP1:{auto:!0,vfd:!0},FWP2:{auto:!0,vfd:!0},FWP3:{auto:!0,vfd:!0},FAN1:{auto:!0,vfd:!0},FAN2:{auto:!0,vfd:!0},FAN3:{auto:!0,vfd:!0},FAN4:{auto:!0,vfd:!0}});I.useEffect(()=>{if(l.length>0){const d={};l.forEach(f=>{d[f.name]={auto:f.auto_mode!==void 0?f.auto_mode:!0,vfd:f.vfd_mode!==void 0?f.vfd_mode:!0}}),s(d),console.log("🔄 모드 상태 동기화:",d)}},[l]);const o=async(d,f,y)=>{if(s(m=>({...m,[d]:{...m[d],[f]:y}})),i){let m="";f==="auto"?m=y?"auto":"manual":f==="vfd"&&(m=y?"vfd":"bypass"),console.log(`🔧 모드 변경: ${d} ${m}`),await i(d,m)?console.log(`✅ ${d} ${m} 모드 설정 완료`):(console.error(`❌ ${d} ${m} 모드 설정 실패`),s(k=>({...k,[d]:{...k[d],[f]:!y}})))}};return r.jsxs("div",{className:"automan-section",children:[r.jsxs("div",{className:"automan-description",children:[r.jsx("h3",{children:"🔄 운전 모드 설정"}),r.jsx("p",{children:"각 장비의 운전 모드(자동/수동)와 VFD 모드를 설정할 수 있습니다."})]}),r.jsx("div",{className:"mode-grid",children:l.map((d,f)=>r.jsx(a5,{equipment:d,modes:a[d.name],onSetMode:(y,m)=>o(d.name,y,m),isFan:f>=6},f))})]})}function a5({equipment:n,modes:e,onSetMode:t,isFan:i=!1}){var a;const l=i?n.running_fwd||n.running_bwd:n.running;return r.jsxs("div",{className:"pump-mode-card",children:[r.jsxs("div",{className:"mode-card-header",children:[r.jsx("h5",{children:n.name}),r.jsx("span",{className:`status-dot ${l?"running":"stopped"}`})]}),r.jsxs("div",{className:"mode-switches",children:[r.jsxs("div",{className:"mode-switch",children:[r.jsx("span",{className:"switch-label",children:"운전 모드"}),r.jsxs("div",{className:"switch-buttons",children:[r.jsx("button",{className:e!=null&&e.auto?"active":"",onClick:()=>t("auto",!0),children:"🤖 자동"}),r.jsx("button",{className:e!=null&&e.auto?"":"active",onClick:()=>t("auto",!1),children:"👤 수동"})]})]}),r.jsxs("div",{className:"mode-switch",children:[r.jsx("span",{className:"switch-label",children:"VFD 모드"}),r.jsxs("div",{className:"switch-buttons",children:[r.jsx("button",{className:e!=null&&e.vfd?"active":"",onClick:()=>t("vfd",!0),children:"⚡ VFD"}),r.jsx("button",{className:e!=null&&e.vfd?"":"active",onClick:()=>t("vfd",!1),children:"🔌 Bypass"})]})]})]}),r.jsxs("div",{className:"mode-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"주파수:"}),r.jsxs("span",{children:[((a=n.frequency)==null?void 0:a.toFixed(1))||0," Hz"]})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"전력:"}),r.jsxs("span",{children:[n.power_kw||0," kW"]})]}),i&&r.jsxs("div",{className:"info-row",children:[r.jsx("span",{children:"방향:"}),r.jsx("span",{children:n.running_fwd?"정방향":n.running_bwd?"역방향":"정지"})]})]})]})}function s5(){const[n,e]=I.useState({swp_kp:1,swp_ki:.1,swp_kd:.05,swp_setpoint:30,fwp_kp:1,fwp_ki:.1,fwp_kd:.05,fwp_setpoint:75}),t=(i,l)=>{e(a=>({...a,[i]:parseFloat(l)}))};return r.jsxs("div",{className:"pid-section",children:[r.jsxs("div",{className:"pid-description",children:[r.jsx("h3",{children:"📐 PID 제어 파라미터"}),r.jsx("p",{children:"온도 제어를 위한 PID 게인값을 설정합니다."}),r.jsxs("div",{className:"pid-formula",children:[r.jsx("strong",{children:"제어식:"})," Output = Kp × e(t) + Ki × ∫e(t)dt + Kd × de(t)/dt"]})]}),r.jsxs("div",{className:"pid-controller-section",children:[r.jsx("h4",{children:"🌊 해수 펌프 PID 파라미터"}),r.jsxs("div",{className:"pid-grid",children:[r.jsx(pe,{label:"비례 게인 (Kp)",value:n.swp_kp,onChange:i=>t("swp_kp",i),min:0,max:10,step:.1}),r.jsx(pe,{label:"적분 게인 (Ki)",value:n.swp_ki,onChange:i=>t("swp_ki",i),min:0,max:5,step:.01}),r.jsx(pe,{label:"미분 게인 (Kd)",value:n.swp_kd,onChange:i=>t("swp_kd",i),min:0,max:1,step:.01}),r.jsx(pe,{label:"목표값 (Setpoint)",value:n.swp_setpoint,onChange:i=>t("swp_setpoint",i),min:-30,max:100,step:.5,unit:"°C"})]})]}),r.jsxs("div",{className:"pid-controller-section",children:[r.jsx("h4",{children:"💧 청수 펌프 PID 파라미터"}),r.jsxs("div",{className:"pid-grid",children:[r.jsx(pe,{label:"비례 게인 (Kp)",value:n.fwp_kp,onChange:i=>t("fwp_kp",i),min:0,max:10,step:.1}),r.jsx(pe,{label:"적분 게인 (Ki)",value:n.fwp_ki,onChange:i=>t("fwp_ki",i),min:0,max:5,step:.01}),r.jsx(pe,{label:"미분 게인 (Kd)",value:n.fwp_kd,onChange:i=>t("fwp_kd",i),min:0,max:1,step:.01}),r.jsx(pe,{label:"목표값 (Setpoint)",value:n.fwp_setpoint,onChange:i=>t("fwp_setpoint",i),min:0,max:100,step:.5,unit:"°C"})]})]}),r.jsx("div",{className:"pid-footer",children:r.jsx("button",{className:"btn-apply",children:"💾 PID 파라미터 적용"})})]})}function pe({label:n,value:e,onChange:t,min:i,max:l,step:a,unit:s=""}){return r.jsxs("div",{className:"pid-parameter",children:[r.jsx("label",{children:n}),r.jsxs("div",{className:"pid-input-group",children:[r.jsx("input",{type:"number",value:e,onChange:o=>t(o.target.value),min:i,max:l,step:a}),s&&r.jsx("span",{className:"unit",children:s})]}),r.jsx("input",{type:"range",value:e,onChange:o=>t(o.target.value),min:i,max:l,step:a,className:"pid-slider"})]})}function o5({equipment:n=[]}){const[e,t]=I.useState(0);return r.jsxs("div",{className:"vfdinfo-section",children:[r.jsxs("div",{className:"vfdinfo-description",children:[r.jsx("h3",{children:"⚡ VFD 상세 정보"}),r.jsx("p",{children:"각 장비의 VFD(인버터) 상세 운전 정보를 확인합니다."})]}),r.jsx("div",{className:"pump-selector",children:n.slice(0,6).map((i,l)=>r.jsx("button",{className:`pump-select-btn ${e===l?"active":""}`,onClick:()=>t(l),children:i.name},l))}),r.jsx("div",{className:"pump-selector",style:{marginTop:"0.5rem"},children:n.slice(6,10).map((i,l)=>r.jsx("button",{className:`pump-select-btn ${e===l+6?"active":""}`,onClick:()=>t(l+6),children:i.name},l+6))}),n[e]&&r.jsx(d5,{equipment:n[e],isFan:e>=6})]})}function d5({equipment:n,isFan:e=!1}){var i,l,a,s;const t=e?n.running_fwd||n.running_bwd:n.running;return r.jsxs("div",{className:"vfd-detail-card",children:[r.jsxs("div",{className:"vfd-header",children:[r.jsxs("h4",{children:[n.name," VFD 상세 정보"]}),r.jsx("span",{className:`vfd-status ${t?"running":"stopped"}`,children:e?n.running_fwd?"🟢 정방향 운전중":n.running_bwd?"🟡 역방향 운전중":"⚪ 정지":n.running?"🟢 운전중":"⚪ 정지"})]}),r.jsxs("div",{className:"vfd-info-grid",children:[r.jsxs("div",{className:"vfd-info-column",children:[r.jsxs("div",{className:"vfd-info-section",children:[r.jsx("h5",{children:"📊 운전 데이터"}),r.jsx(tn,{label:"현재 주파수",value:`${((i=n.frequency)==null?void 0:i.toFixed(1))||0} Hz`}),r.jsx(tn,{label:"출력 주파수",value:`${((l=n.frequency)==null?void 0:l.toFixed(1))||0} Hz`}),r.jsx(tn,{label:"목표 주파수",value:"60.0 Hz"}),r.jsx(tn,{label:"현재 전류",value:`${(n.power_kw*2.5).toFixed(1)} A`}),r.jsx(tn,{label:"출력 전압",value:"440 V"}),e&&r.jsx(tn,{label:"운전 방향",value:n.running_fwd?"정방향 (FWD)":n.running_bwd?"역방향 (BWD)":"정지"})]}),r.jsxs("div",{className:"vfd-info-section",children:[r.jsx("h5",{children:"⚡ 전력 데이터"}),r.jsx(tn,{label:"순시 전력",value:`${n.power_kw||0} kW`}),r.jsx(tn,{label:"평균 전력",value:`${n.avg_power||0} kW`}),r.jsx(tn,{label:"역률",value:"0.95"}),r.jsx(tn,{label:"효율",value:"94.5 %"}),r.jsx(tn,{label:"절감률",value:`${n.saved_ratio||0} %`,highlight:!0})]})]}),r.jsxs("div",{className:"vfd-info-column",children:[r.jsxs("div",{className:"vfd-info-section",children:[r.jsx("h5",{children:"🕐 운전 시간"}),r.jsx(tn,{label:"ESS 운전 시간",value:`${((a=n.run_hours)==null?void 0:a.toLocaleString())||0} h`}),r.jsx(tn,{label:"총 운전 시간",value:`${(n.run_hours*1.5).toLocaleString()||0} h`}),r.jsx(tn,{label:"절감 전력량",value:`${((s=n.saved_kwh)==null?void 0:s.toLocaleString())||0} kWh`,highlight:!0})]}),r.jsxs("div",{className:"vfd-info-section",children:[r.jsx("h5",{children:"🛡️ 상태 정보"}),r.jsx(tn,{label:"운전 모드",value:n.ess_mode?"ESS 모드":"일반 모드"}),r.jsx(tn,{label:"제어 모드",value:"자동"}),r.jsx(tn,{label:"VFD 온도",value:"42 °C"}),r.jsx(tn,{label:"모터 온도",value:"38 °C"}),r.jsx(tn,{label:"알람 상태",value:"정상",success:!0})]})]})]})]})}function tn({label:n,value:e,highlight:t,success:i}){return r.jsxs("div",{className:"vfd-info-row",children:[r.jsx("span",{className:"vfd-label",children:n}),r.jsx("span",{className:`vfd-value ${t?"highlight":""} ${i?"success":""}`,children:e})]})}function p5(){const[n,e]=I.useState("alarms"),[t,i]=I.useState([]),[l,a]=I.useState([]),[s,o]=I.useState([]),[d,f]=I.useState(!1);I.useEffect(()=>{n==="alarms"?y():n==="events"?m():n==="operation"&&h()},[n]);const y=async()=>{f(!0);try{const x=await(await fetch("http://localhost:8000/api/alarms/history?limit=100")).json();x.success&&i(x.data)}catch(z){console.error("알람 이력 조회 오류:",z)}finally{f(!1)}},m=async()=>{f(!0);try{const x=await(await fetch("http://localhost:8000/api/events?limit=100")).json();x.success&&a(x.data)}catch(z){console.error("이벤트 로그 조회 오류:",z)}finally{f(!1)}},h=async()=>{f(!0);try{const x=await(await fetch("http://localhost:8000/api/operations")).json();x.success&&o(x.data)}catch(z){console.error("운전 이력 조회 오류:",z)}finally{f(!1)}},k=(z,x)=>{if(!z||z.length===0){alert("내보낼 데이터가 없습니다.");return}const E=Object.keys(z[0]),c=[E.join(","),...z.map(M=>E.map(C=>{const j=M[C];return typeof j=="string"&&j.includes(",")?`"${j}"`:j}).join(","))].join(`
`),p="\uFEFF",u=new Blob([p+c],{type:"text/csv;charset=utf-8;"}),g=document.createElement("a"),N=URL.createObjectURL(u);g.setAttribute("href",N),g.setAttribute("download",`${x}_${new Date().toISOString().slice(0,10)}.csv`),g.style.visibility="hidden",document.body.appendChild(g),g.click(),document.body.removeChild(g)};return r.jsxs("div",{className:"history",children:[r.jsxs("div",{className:"history-header",children:[r.jsx("h2",{children:"📋 이력 관리"}),r.jsx("p",{children:"알람 이력, 이벤트 로그, 운전 이력 조회"})]}),r.jsxs("div",{className:"history-tabs",children:[r.jsx("button",{className:n==="alarms"?"active":"",onClick:()=>e("alarms"),children:"🔔 알람 이력"}),r.jsx("button",{className:n==="events"?"active":"",onClick:()=>e("events"),children:"📝 이벤트 로그"}),r.jsx("button",{className:n==="operation"?"active":"",onClick:()=>e("operation"),children:"⚙️ 운전 이력"})]}),r.jsxs("div",{className:"history-content",children:[d&&r.jsx("div",{className:"loading",children:"데이터 로딩 중..."}),!d&&n==="alarms"&&r.jsx(c5,{data:t,onExport:k}),!d&&n==="events"&&r.jsx(f5,{data:l,onExport:k}),!d&&n==="operation"&&r.jsx(u5,{data:s,onExport:k})]})]})}function c5({data:n,onExport:e}){const[t,i]=I.useState("all"),[l,a]=I.useState(""),s=n.filter(o=>!(t!=="all"&&o.level!==t||l&&!o.message.toLowerCase().includes(l.toLowerCase())));return r.jsxs("div",{className:"alarm-history",children:[r.jsxs("div",{className:"history-controls",children:[r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{children:"필터:"}),r.jsxs("select",{value:t,onChange:o=>i(o.target.value),children:[r.jsx("option",{value:"all",children:"전체"}),r.jsx("option",{value:"critical",children:"위험"}),r.jsx("option",{value:"warning",children:"경고"}),r.jsx("option",{value:"info",children:"정보"})]})]}),r.jsx("div",{className:"search-group",children:r.jsx("input",{type:"text",placeholder:"🔍 알람 검색...",value:l,onChange:o=>a(o.target.value)})}),r.jsx("button",{className:"btn-export",onClick:()=>e(s,"alarm_history"),children:"📥 CSV 내보내기"})]}),r.jsx("div",{className:"history-table",children:r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"시간"}),r.jsx("th",{children:"등급"}),r.jsx("th",{children:"메시지"}),r.jsx("th",{children:"확인"})]})}),r.jsx("tbody",{children:s.map(o=>r.jsxs("tr",{children:[r.jsx("td",{children:o.time}),r.jsx("td",{children:r.jsxs("span",{className:`level-badge ${o.level}`,children:[o.level==="critical"&&"🔴 위험",o.level==="warning"&&"🟡 경고",o.level==="info"&&"🟢 정보"]})}),r.jsx("td",{children:o.message}),r.jsx("td",{children:r.jsx("span",{className:`ack-badge ${o.acknowledged?"ack":"unack"}`,children:o.acknowledged?"✅ 확인됨":"⏳ 대기중"})})]},o.id))})]})}),r.jsxs("div",{className:"history-summary",children:[r.jsxs("div",{className:"summary-item",children:[r.jsx("span",{className:"summary-label",children:"총 알람:"}),r.jsxs("span",{className:"summary-value",children:[n.length,"건"]})]}),r.jsxs("div",{className:"summary-item",children:[r.jsx("span",{className:"summary-label",children:"위험:"}),r.jsxs("span",{className:"summary-value critical",children:[n.filter(o=>o.level==="critical").length,"건"]})]}),r.jsxs("div",{className:"summary-item",children:[r.jsx("span",{className:"summary-label",children:"경고:"}),r.jsxs("span",{className:"summary-value warning",children:[n.filter(o=>o.level==="warning").length,"건"]})]})]})]})}function f5({data:n,onExport:e}){const[t,i]=I.useState("all"),l=n.filter(s=>!(t!=="all"&&s.type!==t)),a=s=>{switch(s){case"control":return"🎮";case"alarm":return"🔔";case"setting":return"⚙️";case"system":return"💻";default:return"📝"}};return r.jsxs("div",{className:"event-history",children:[r.jsxs("div",{className:"history-controls",children:[r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{children:"이벤트 유형:"}),r.jsxs("select",{value:t,onChange:s=>i(s.target.value),children:[r.jsx("option",{value:"all",children:"전체"}),r.jsx("option",{value:"control",children:"제어"}),r.jsx("option",{value:"alarm",children:"알람"}),r.jsx("option",{value:"setting",children:"설정"}),r.jsx("option",{value:"system",children:"시스템"})]})]}),r.jsx("button",{className:"btn-export",onClick:()=>e(l,"event_history"),children:"📥 CSV 내보내기"})]}),r.jsx("div",{className:"event-list",children:l.map(s=>r.jsxs("div",{className:"event-item",children:[r.jsx("div",{className:"event-icon",children:a(s.type)}),r.jsxs("div",{className:"event-content",children:[r.jsxs("div",{className:"event-header",children:[r.jsx("span",{className:"event-time",children:s.time}),r.jsx("span",{className:"event-user",children:s.user})]}),r.jsx("div",{className:"event-message",children:s.message})]})]},s.id))})]})}function u5({data:n,onExport:e}){return r.jsxs("div",{className:"operation-history",children:[r.jsxs("div",{className:"history-controls",children:[r.jsxs("div",{className:"date-range",children:[r.jsx("label",{children:"조회 기간:"}),r.jsx("input",{type:"date",defaultValue:new Date().toISOString().slice(0,10)}),r.jsx("span",{children:"~"}),r.jsx("input",{type:"date",defaultValue:new Date().toISOString().slice(0,10)})]}),r.jsx("button",{className:"btn-search",children:"🔍 조회"}),r.jsx("button",{className:"btn-export",onClick:()=>e(n,"operation_history"),children:"📥 리포트 생성"})]}),r.jsx("div",{className:"operation-table",children:r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"펌프"}),r.jsx("th",{children:"날짜"}),r.jsx("th",{children:"운전 시간"}),r.jsx("th",{children:"소비 전력"}),r.jsx("th",{children:"절감 전력"}),r.jsx("th",{children:"절감률"})]})}),r.jsx("tbody",{children:n&&n.length>0?n.map((t,i)=>{var l,a,s;return r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("strong",{children:t.equipment_name})}),r.jsx("td",{children:t.date}),r.jsxs("td",{children:[(l=t.runtime_hours)==null?void 0:l.toFixed(1)," h"]}),r.jsxs("td",{children:[(a=t.energy_kwh)==null?void 0:a.toFixed(1)," kWh"]}),r.jsxs("td",{className:"highlight",children:[(s=t.saved_kwh)==null?void 0:s.toFixed(1)," kWh"]}),r.jsxs("td",{className:"highlight",children:[t.energy_kwh>0?(t.saved_kwh/t.energy_kwh*100).toFixed(1):0,"%"]})]},i)}):r.jsx("tr",{children:r.jsx("td",{colSpan:"6",style:{textAlign:"center",padding:"20px"},children:"운전 이력 데이터가 없습니다."})})}),n&&n.length>0&&r.jsx("tfoot",{children:r.jsxs("tr",{className:"total-row",children:[r.jsx("td",{colSpan:"2",children:r.jsx("strong",{children:"합계"})}),r.jsx("td",{children:r.jsxs("strong",{children:[n.reduce((t,i)=>t+(i.runtime_hours||0),0).toFixed(1)," h"]})}),r.jsx("td",{children:r.jsxs("strong",{children:[n.reduce((t,i)=>t+(i.energy_kwh||0),0).toFixed(1)," kWh"]})}),r.jsx("td",{className:"highlight",children:r.jsxs("strong",{children:[n.reduce((t,i)=>t+(i.saved_kwh||0),0).toFixed(1)," kWh"]})}),r.jsx("td",{className:"highlight",children:r.jsxs("strong",{children:[(n.reduce((t,i)=>t+(i.saved_kwh||0),0)/n.reduce((t,i)=>t+(i.energy_kwh||0),0)*100).toFixed(1),"%"]})})]})})]})}),r.jsxs("div",{className:"operation-chart",children:[r.jsx("h4",{children:"📊 일별 절감 전력 추이"}),r.jsx("div",{className:"chart-placeholder",children:r.jsx("p",{children:"차트는 실제 데이터가 누적되면 표시됩니다"})})]})]})}const h5=()=>{const[n,e]=I.useState(null),[t,i]=I.useState(!0),[l,a]=I.useState(null),[s,o]=I.useState(null),[d,f]=I.useState({}),[y,m]=I.useState({}),h=async()=>{try{const _=await(await fetch("/api/vfd/diagnostics")).json();_.success&&_.data.vfd_diagnostics?(console.log("📊 VFD 진단 데이터 로드:",_.data),e(_.data),m(L=>{const U={...L};return Object.entries(_.data.vfd_diagnostics).forEach(([V,O])=>{const cn=O.anomaly_patterns||[],F=L[V]||[],R=[...new Set([...F,...cn])];R.length>0&&(U[V]=R)}),U}),a(null)):(console.error("❌ VFD 진단 데이터 없음"),a("VFD 진단 데이터를 사용할 수 없습니다."))}catch(v){console.error("❌ VFD 진단 데이터 로드 실패:",v),a(`데이터 로드 실패: ${v.message}`)}finally{i(!1)}};I.useEffect(()=>{h();const v=setInterval(h,2e3);return()=>clearInterval(v)},[]);const k=v=>{switch(v){case"normal":return"#4CAF50";case"caution":return"#FFC107";case"warning":return"#FF9800";case"critical":return"#F44336";default:return"#9E9E9E"}},z=v=>{switch(v){case"normal":return"정상";case"caution":return"주의";case"warning":return"경고";case"critical":return"위험";default:return"알 수 없음"}},x=v=>{switch(v){case 0:return"정상";case 1:return"정기 점검";case 3:return"1주일 내 점검";case 5:return"즉시 점검";default:return"-"}},E=v=>{switch(v){case"rising":return"↑ 상승";case"falling":return"↓ 하강";case"stable":return"→ 안정";default:return"-"}},c=(v,_)=>{console.log(`✅ ${v} 이상 감지 확인 - 패턴:`,_),f(L=>({...L,[v]:_})),m(L=>{const U={...L};return delete U[v],U})},p=v=>{const _=y[v]||[];if(_.length===0)return[];const L=d[v]||[],U=[..._].sort().join(","),V=[...L].sort().join(",");return U===V&&L.length>0?[]:_.filter(O=>!L.includes(O))};if(t)return r.jsx("div",{className:"vfd-diagnostics loading",children:"데이터 로드 중..."});if(l)return r.jsx("div",{className:"vfd-diagnostics error",children:l});if(!n||!n.vfd_diagnostics)return r.jsx("div",{className:"vfd-diagnostics",children:"VFD 진단 데이터가 없습니다."});const u=Object.entries(n.vfd_diagnostics),g=u.filter(([v])=>v.startsWith("SW_PUMP")),N=u.filter(([v])=>v.startsWith("FW_PUMP")),M=u.filter(([v])=>v.startsWith("ER_FAN")),C=([v,_])=>{var V,O,cn,F,R,w,S;const L=k(_.status_grade),U=z(_.status_grade);return r.jsxs("div",{className:`vfd-card ${s===v?"selected":""}`,style:{borderLeft:`4px solid ${L}`},onClick:()=>o(v),children:[r.jsxs("div",{className:"vfd-card-header",children:[r.jsx("h4",{children:v.replace("_"," ")}),r.jsx("span",{className:"vfd-status-badge",style:{backgroundColor:L},children:U})]}),r.jsxs("div",{className:"vfd-card-body",children:[r.jsxs("div",{className:"vfd-metric",children:[r.jsx("span",{className:"label",children:"주파수"}),r.jsxs("span",{className:"value",children:[((V=_.current_frequency_hz)==null?void 0:V.toFixed(1))||"0.0"," Hz"]})]}),r.jsxs("div",{className:"vfd-metric",children:[r.jsx("span",{className:"label",children:"출력 전류"}),r.jsxs("span",{className:"value",children:[((O=_.output_current_a)==null?void 0:O.toFixed(1))||"0.0"," A"]})]}),r.jsxs("div",{className:"vfd-metric",children:[r.jsx("span",{className:"label",children:"모터 온도"}),r.jsxs("span",{className:"value",style:{color:_.motor_temperature_c>75?"#f44336":_.motor_temperature_c>70?"#ff9800":"#e2e8f0"},children:[((cn=_.motor_temperature_c)==null?void 0:cn.toFixed(1))||"0.0","°C"]})]}),r.jsxs("div",{className:"vfd-metric",children:[r.jsx("span",{className:"label",children:"온도 추세"}),r.jsxs("span",{className:"value predicted",children:[E(_.temp_trend)," ",((F=_.temp_rise_rate)==null?void 0:F.toFixed(2))||"0.00","°C/min"]})]}),r.jsxs("div",{className:"vfd-metric",children:[r.jsx("span",{className:"label",children:"이상 점수"}),r.jsxs("span",{className:"value",style:{color:_.anomaly_score>75?"#f44336":_.anomaly_score>50?"#ff9800":_.anomaly_score>25?"#ffc107":"#4caf50"},children:[((R=_.anomaly_score)==null?void 0:R.toFixed(0))||"0","/100"]})]}),r.jsxs("div",{className:"vfd-metric",children:[r.jsx("span",{className:"label",children:"정비 권고"}),r.jsx("span",{className:"value",style:{color:_.maintenance_priority===5?"#f44336":_.maintenance_priority===3?"#ff9800":_.maintenance_priority===1?"#ffc107":"#4caf50"},children:x(_.maintenance_priority)})]})]}),r.jsxs("div",{className:"vfd-card-footer",children:[r.jsxs("div",{className:"footer-row",children:[r.jsxs("span",{className:"runtime",children:["⏱ ",((w=_.cumulative_runtime_hours)==null?void 0:w.toFixed(0))||0,"h"]}),r.jsxs("span",{className:"life",children:["💚 수명 ",((S=_.remaining_life_percent)==null?void 0:S.toFixed(0))||100,"%"]})]}),(()=>{const A=p(v);return A.length>0&&r.jsxs("div",{className:"footer-row warning",title:A.join(", "),children:["⚠️ ",A.length,"개 이상 감지",r.jsxs("div",{className:"anomaly-preview",children:[A.slice(0,2).map((T,D)=>r.jsx("span",{className:"anomaly-tag",children:T.replace("_"," ")},D)),A.length>2&&r.jsxs("span",{className:"anomaly-more",children:["+",A.length-2]})]})]})})()]})]},v)},j=()=>{var _,L,U,V,O,cn,F,R,w,S,A;if(!s)return null;const v=n.vfd_diagnostics[s];return v?r.jsxs("div",{className:"vfd-detail-panel",children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("h3",{children:[s.replace("_"," ")," 상세 정보"]}),r.jsx("button",{className:"close-btn",onClick:()=>o(null),children:"✕"})]}),r.jsxs("div",{className:"detail-body",children:[r.jsxs("section",{className:"detail-section",children:[r.jsx("h4",{children:"실시간 운전 데이터"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"주파수"}),r.jsxs("span",{className:"value",children:[(_=v.current_frequency_hz)==null?void 0:_.toFixed(1)," Hz"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"출력 전류"}),r.jsxs("span",{className:"value",children:[(L=v.output_current_a)==null?void 0:L.toFixed(1)," A"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"출력 전압"}),r.jsxs("span",{className:"value",children:[(U=v.output_voltage_v)==null?void 0:U.toFixed(0)," V"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"DC 버스 전압"}),r.jsxs("span",{className:"value",children:[(V=v.dc_bus_voltage_v)==null?void 0:V.toFixed(0)," V"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"모터 온도"}),r.jsxs("span",{className:"value",children:[(O=v.motor_temperature_c)==null?void 0:O.toFixed(1),"°C"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"히트싱크 온도"}),r.jsxs("span",{className:"value",children:[(cn=v.heatsink_temperature_c)==null?void 0:cn.toFixed(1),"°C"]})]})]})]}),r.jsxs("section",{className:"detail-section",children:[r.jsx("h4",{children:"예측 분석"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"30분 후 예측 온도"}),r.jsxs("span",{className:"value predicted",children:[(F=v.predicted_temp_30min)==null?void 0:F.toFixed(1),"°C"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"온도 상승률"}),r.jsxs("span",{className:"value",children:[(R=v.temp_rise_rate)==null?void 0:R.toFixed(3),"°C/min"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"온도 트렌드"}),r.jsx("span",{className:"value",children:E(v.temp_trend)})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"수명 잔여율"}),r.jsxs("span",{className:"value",children:[(w=v.remaining_life_percent)==null?void 0:w.toFixed(1),"%"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"정비 예상 일수"}),r.jsxs("span",{className:"value",children:[v.estimated_days_to_maintenance," days"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"이상 점수"}),r.jsx("span",{className:"value",children:(S=v.anomaly_score)==null?void 0:S.toFixed(1)})]})]})]}),r.jsxs("section",{className:"detail-section",children:[r.jsx("h4",{children:"진단 결과"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"상태 등급"}),r.jsx("span",{className:"value",style:{color:k(v.status_grade)},children:z(v.status_grade)})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"심각도 점수"}),r.jsxs("span",{className:"value",children:[v.severity_score,"/100"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"정비 우선순위"}),r.jsx("span",{className:"value",children:x(v.maintenance_priority)})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"예측 신뢰도"}),r.jsxs("span",{className:"value",children:[(v.prediction_confidence*100).toFixed(0),"%"]})]})]})]}),(()=>{const T=p(s);return T.length>0&&r.jsxs("section",{className:"detail-section",children:[r.jsx("h4",{children:"이상 패턴"}),r.jsx("ul",{className:"anomaly-list",children:T.map((D,_n)=>r.jsx("li",{children:D},_n))}),r.jsx("button",{className:"acknowledge-btn",onClick:()=>{c(s,T)},children:"✓ 이상 감지 확인"})]})})(),v.recommendation&&r.jsxs("section",{className:"detail-section",children:[r.jsx("h4",{children:"권고사항"}),r.jsx("div",{className:"recommendation-box",children:v.recommendation})]}),r.jsxs("section",{className:"detail-section",children:[r.jsx("h4",{children:"누적 통계"}),r.jsxs("div",{className:"detail-grid",children:[r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"누적 운전시간"}),r.jsxs("span",{className:"value",children:[(A=v.cumulative_runtime_hours)==null?void 0:A.toFixed(1)," h"]})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"트립 횟수"}),r.jsx("span",{className:"value",children:v.trip_count})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"에러 횟수"}),r.jsx("span",{className:"value",children:v.error_count})]}),r.jsxs("div",{className:"detail-item",children:[r.jsx("span",{className:"label",children:"경고 횟수"}),r.jsx("span",{className:"value",children:v.warning_count})]})]})]})]})]}):null};return r.jsxs("div",{className:"vfd-diagnostics",children:[r.jsxs("div",{className:"diagnostics-header",children:[r.jsxs("div",{className:"header-title",children:[r.jsx("h2",{children:"VFD 예방진단"}),r.jsxs("div",{className:"header-info",children:[r.jsxs("span",{children:["마지막 업데이트: ",new Date(n.timestamp).toLocaleTimeString("ko-KR")]}),r.jsxs("span",{children:["총 ",n.vfd_count,"대"]})]})]}),r.jsxs("div",{className:"status-legend",children:[r.jsx("div",{className:"legend-title",children:"📊 상태 등급"}),r.jsxs("div",{className:"legend-items",children:[r.jsxs("span",{className:"legend-item",children:[r.jsx("span",{className:"legend-dot",style:{backgroundColor:"#4CAF50"}}),"정상 (0-20점)"]}),r.jsxs("span",{className:"legend-item",children:[r.jsx("span",{className:"legend-dot",style:{backgroundColor:"#FFC107"}}),"주의 (21-50점)"]}),r.jsxs("span",{className:"legend-item",children:[r.jsx("span",{className:"legend-dot",style:{backgroundColor:"#FF9800"}}),"경고 (51-75점)"]}),r.jsxs("span",{className:"legend-item",children:[r.jsx("span",{className:"legend-dot",style:{backgroundColor:"#F44336"}}),"위험 (76-100점)"]})]})]})]}),r.jsxs("div",{className:"guide-panel",children:[r.jsx("h4",{children:"📖 항목 설명"}),r.jsxs("div",{className:"guide-items",children:[r.jsxs("div",{className:"guide-item",children:[r.jsx("strong",{children:"온도 추세:"})," ↑상승 (모터 온도가 계속 오르는 중) / →안정 / ↓하강"]}),r.jsxs("div",{className:"guide-item",children:[r.jsx("strong",{children:"이상 점수:"})," 0-25(정상), 25-50(주의), 50-75(경고), 75+(위험)"]}),r.jsxs("div",{className:"guide-item",children:[r.jsx("strong",{children:"정비 권고:"})," 즉시점검(위험), 1주일내(경고), 정기점검(주의), 정상"]}),r.jsxs("div",{className:"guide-item",children:[r.jsx("strong",{children:"수명 잔여:"})," 베어링/냉각팬 기준 예상 잔여 수명 (70% 이하 시 부품 준비)"]})]})]}),r.jsxs("div",{className:`diagnostics-content ${s?"panel-open":""}`,children:[r.jsxs("div",{className:"vfd-groups",children:[r.jsxs("div",{className:"vfd-group",children:[r.jsx("h3",{children:"해수 펌프 (SW Pumps)"}),r.jsx("div",{className:"vfd-grid",children:g.map(C)})]}),r.jsxs("div",{className:"vfd-group",children:[r.jsx("h3",{children:"청수 펌프 (FW Pumps)"}),r.jsx("div",{className:"vfd-grid",children:N.map(C)})]}),r.jsxs("div",{className:"vfd-group",children:[r.jsx("h3",{children:"기관실 팬 (E/R Fans)"}),r.jsx("div",{className:"vfd-grid",children:M.map(C)})]})]}),s&&j()]})]})};function m5(){const[n,e]=I.useState({}),[t,i]=I.useState([]),[l,a]=I.useState([]),[s,o]=I.useState([]),[d,f]=I.useState([]),[y,m]=I.useState({}),[h,k]=I.useState(!1),[z,x]=I.useState(null),[E,c]=I.useState("dashboard"),[p,u]=I.useState(null),[g,N]=I.useState(!1);I.useRef(new Set);const M=I.useRef(new Set);I.useRef(!0);const C=I.useRef(null),j=I.useRef([]);I.useEffect(()=>{const F=new(window.AudioContext||window.webkitAudioContext);console.log("🎵 [App] AudioContext 생성됨, 초기 상태:",F.state),(async()=>{try{await F.resume(),console.log("🔊 [App] AudioContext 즉시 활성화 시도:",F.state)}catch{console.log("⚠️ [App] AudioContext 즉시 활성화 실패, 사용자 인터랙션 필요")}})(),u(F);const w=async()=>{console.log("👆 [App] 사용자 인터랙션 감지, AudioContext 상태:",F.state),F.state==="suspended"&&(await F.resume(),console.log("🔊 [App] AudioContext 활성화됨"),d.some(S=>!S.acknowledged)&&!C.current&&(console.log("🔔 [App] AudioContext 활성화 후 경고음 시작"),_()))};return document.addEventListener("click",w,{once:!0}),document.addEventListener("keydown",w,{once:!0}),()=>{document.removeEventListener("click",w),document.removeEventListener("keydown",w),F&&F.close()}},[]),I.useEffect(()=>(V(),()=>{z&&z.close()}),[]);const v=async()=>{if(!(!p||g))try{p.state==="suspended"&&await p.resume();const R=j.current.filter(T=>!T.acknowledged),w=R.some(T=>T.level==="critical"),S=R.some(T=>T.level==="warning");let A=1;w?A=3:S&&(A=2),console.log(`🔊 [App] 경고음 재생: ${A}번 (Critical: ${w}, Warning: ${S}, 총 미확인: ${R.length})`);for(let T=0;T<A;T++)setTimeout(()=>{const D=p.createOscillator(),_n=p.createGain();D.connect(_n),_n.connect(p.destination),D.frequency.value=880,D.type="sine",_n.gain.setValueAtTime(.3,p.currentTime),_n.gain.exponentialRampToValueAtTime(.01,p.currentTime+.15),D.start(p.currentTime),D.stop(p.currentTime+.15)},T*200)}catch(F){console.error("❌ [App] 경고음 재생 오류:",F)}},_=()=>{console.log("🔊 [App] 연속 경고음 시작"),C.current&&clearInterval(C.current),v(),C.current=setInterval(()=>{v()},2e3)},L=()=>{console.log("🔇 [App] 연속 경고음 정지"),C.current&&(clearInterval(C.current),C.current=null)},U=()=>{N(!g),g?d.some(R=>!R.acknowledged)&&_():L()};I.useEffect(()=>{j.current=d},[d]),I.useEffect(()=>{const F=d.some(S=>!S.acknowledged),R=new Set(d.filter(S=>!S.acknowledged&&S.level==="critical").map(S=>S.id)),w=Array.from(R).filter(S=>!M.current.has(S));return console.log("🔍 [App] 알람 상태 체크:",{총알람:d.length,미확인알람:F,현재위험알람:R.size,새위험알람:w.length,muted:g,audioContext:!!p,intervalActive:!!C.current}),console.log("📋 [App] 알람 목록:",d.map(S=>({id:S.id,tag:S.tag,level:S.level,message:S.message,acknowledged:S.acknowledged}))),w.length>0&&g&&(console.log("🔴 [App] 새로운 위험 알람 발생 - 음소거 자동 해제",w),N(!1)),M.current=R,F&&p&&!g?C.current||(console.log("🔊 [App] 미확인 알람 감지 - 연속 경고음 시작"),_()):C.current&&(console.log("✅ [App] 모든 알람 확인됨 - 경고음 정지"),L()),()=>{C.current&&L()}},[d,p,g]);const V=()=>{const R=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.hostname}:8000/ws`;console.log("WebSocket 연결 시도:",R);const w=new WebSocket(R);w.onopen=()=>{console.log("✅ WebSocket 연결 성공"),k(!0)},w.onmessage=S=>{var A,T;try{const D=JSON.parse(S.data);D.type==="realtime_update"&&(e(D.sensors),o(D.equipment||[]),i(D.pumps||((A=D.equipment)==null?void 0:A.slice(0,6))||[]),a(((T=D.equipment)==null?void 0:T.slice(6,10))||[]),f(D.alarms||[]),m(D.alarm_summary||{}))}catch(D){console.error("WebSocket 메시지 파싱 오류:",D)}},w.onerror=S=>{console.error("❌ WebSocket 오류:",S),k(!1)},w.onclose=()=>{console.log("WebSocket 연결 종료, 5초 후 재연결..."),k(!1),setTimeout(V,5e3)},x(w)},O=async(F,R)=>{try{console.log(`🔧 장비 명령 전송 시도: equipment=${F}, command=${R}`);const w=await fetch("http://localhost:8000/api/equipment/command",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({equipment_name:F,command:R})});if(console.log(`📡 응답 상태: ${w.status}`),!w.ok){const A=await w.text();return console.error("❌ HTTP 오류:",w.status,A),alert(`명령 전송 실패: ${w.status}`),!1}const S=await w.json();return console.log("📦 응답 데이터:",S),S.success?(console.log(`✅ ${F} ${R} 명령 성공`),!0):(console.error("❌ 장비 명령 실패:",S),alert("명령 전송 실패"),!1)}catch(w){return console.error("❌ 장비 명령 오류:",w),alert(`오류 발생: ${w.message}`),!1}},cn=async(F,R)=>{const w=["SWP1","SWP2","SWP3","FWP1","FWP2","FWP3"];return F>=0&&F<6?await O(w[F],R):!1};return r.jsxs("div",{className:"app",children:[r.jsxs("header",{className:"app-header",children:[r.jsx("h1",{children:"🚢 ESS HMI - Energy Saving System"}),r.jsxs("div",{className:"status-indicator",children:[r.jsx("span",{className:`status-dot ${h?"connected":"disconnected"}`}),r.jsx("span",{children:h?"PLC 연결됨":"PLC 연결 안됨"})]})]}),r.jsxs("nav",{className:"tab-nav",children:[r.jsx("button",{className:E==="dashboard"?"active":"",onClick:()=>c("dashboard"),children:"📊 대시보드"}),r.jsx("button",{className:E==="diagram"?"active":"",onClick:()=>c("diagram"),children:"🔧 배관 계통도"}),r.jsx("button",{className:E==="fan_diagram"?"active":"",onClick:()=>c("fan_diagram"),children:"🌀 E/R 환기"}),r.jsx("button",{className:E==="control"?"active":"",onClick:()=>c("control"),children:"⚙️ 펌프 제어"}),r.jsx("button",{className:E==="fan"?"active":"",onClick:()=>c("fan"),children:"🌀 팬 제어"}),r.jsx("button",{className:E==="advanced"?"active":"",onClick:()=>c("advanced"),children:"🎛️ 고급 제어"}),r.jsx("button",{className:E==="settings"?"active":"",onClick:()=>c("settings"),children:"⚙️ 설정"}),r.jsx("button",{className:E==="trend"?"active":"",onClick:()=>c("trend"),children:"📈 트렌드"}),r.jsx("button",{className:E==="history"?"active":"",onClick:()=>c("history"),children:"📋 이력"}),r.jsx("button",{className:`${E==="alarm"?"active":""} ${d.some(F=>!F.acknowledged)?"has-unack-alarms":""}`,onClick:()=>c("alarm"),children:"🔔 알람"}),r.jsx("button",{className:E==="vfd_diagnostics"?"active":"",onClick:()=>c("vfd_diagnostics"),children:"🔍 VFD 진단"})]}),r.jsxs("main",{className:"app-content",children:[E==="dashboard"&&r.jsx(Bd,{sensors:n,equipment:s,pumps:t,fans:l}),E==="diagram"&&r.jsx(Gd,{sensors:n,equipment:s,pumps:t,fans:l,onCommand:O,onPumpCommand:cn}),E==="fan_diagram"&&r.jsx(Kd,{sensors:n,fans:l,equipment:s,onCommand:O}),E==="control"&&r.jsx(qa,{pumps:t,onCommand:O,onPumpCommand:cn}),E==="fan"&&r.jsx(qa,{pumps:l,isFanMode:!0,onCommand:O}),E==="advanced"&&r.jsx(l5,{equipment:s,pumps:t,fans:l,onCommand:O}),E==="settings"&&r.jsx(Jd,{}),E==="trend"&&r.jsx(Zd,{sensors:n,equipment:s,pumps:t,fans:l}),E==="history"&&r.jsx(p5,{}),E==="alarm"&&r.jsx(Yd,{alarms:d,alarmSummary:y,alarmSoundMuted:g,onToggleMute:U}),E==="vfd_diagnostics"&&r.jsx(h5,{})]}),r.jsxs("footer",{className:"app-footer",children:[r.jsx("span",{children:"© 2025 ESS HMI System"}),r.jsxs("span",{children:["마지막 업데이트: ",new Date().toLocaleTimeString("ko-KR")]})]})]})}er.createRoot(document.getElementById("root")).render(r.jsx(b0.StrictMode,{children:r.jsx(m5,{})}));
