!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.aftool=r():e.aftool=r()}(window,(function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";t.r(r);var n={};t.r(n),t.d(n,"standardized",(function(){return o})),t.d(n,"flatTree",(function(){return u})),t.d(n,"toMap",(function(){return i})),t.d(n,"fliter",(function(){return c})),t.d(n,"search",(function(){return l})),t.d(n,"find",(function(){return f}));const o=(e,{labelProp:r,valueProp:t,keyProp:n,childrenProp:u}={},i=!1)=>{if(!e)return;return r=r||"label",t=t||"value",n=n||"key",u=u||"children",e.map(e=>{let c=e[u];c&&(c=o(c,{labelProp:r,valueProp:t,keyProp:n,childrenProp:u},i));const l=t.split(".").reduce((e,r)=>e[r],e),f=r.split(".").reduce((e,r)=>e[r],e),d=e[n];let s={};return s.value=l,s.label=f,s.key=d,c&&(s.children=c),i&&(s.meta=e),s})},u=(e,r,t)=>{if(Array.isArray(e)){let n=[];return e.forEach(e=>{const{children:t,...o}=e;r&&r(o)&&n.push(o)||!r&&n.push(o),t&&(n=[...n,...u(e.children,r)])}),t&&n.map((e,r)=>({...e,key:r}))||n}return[]};const i=(e,r="id",t)=>{if(!e)return null;let n={};return Array.isArray(e)?(n=e.reduce((e,n)=>{let o={};const{children:u,...c}=n;return u&&(o=i(n.children,r,t)),{...e,[n[r]]:t?n:c,...o}},{}),n):n},c=(e,r,t,n)=>{let o=n||0;return e.reduce((e,n)=>{if(r&&!r(n,o))return e;const u=t&&t(n,o)||{};if(n.children){let{children:i,...l}=n,f=c(i,r,t,o+1);return 0!==f.length&&(l={...l,children:f}),[...e,{...l,...u}]}return[...e,{...n,...u}]},[])};function l(e,r,t){if(!Array.isArray(e))return console.error("参数不符合！"),[];if(function(e){let r=!0;return e&&(r=!Object.keys(e).some(r=>{const t=e[r];return"string"==typeof t&&""!==t.trim()||"string"!=typeof t&&!!t||0===t||!1===t})),r}(r))return e;let n=Object.keys(r),o=[];const u=["boolean","number"];return e.forEach(e=>{const{children:i,...c}=e;if(n.every(t=>{const n=r[t];if(null==n)return!0;if("function"==typeof n)return n(e[t]);if(u.includes(typeof n))return n===e[t];if("string"==typeof n)return new RegExp(n.trim(),"g").test(e[t]);throw"查询条件不是支持的类型，支持string,number,boolean,function"})){const r=t?e:c;o.push(r)}if(i){const e=l(i,r);o=[...o,...e]}}),o}function f(e,r){const t=e.length;for(let n=0;n<t;n++){const t=e[n];if(r(t))return t;const{children:o}=t;if(o){const e=f(o,r);if(e)return e}}return null}t.d(r,"treetool",(function(){return n}))}])}));