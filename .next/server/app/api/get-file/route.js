"use strict";(()=>{var e={};e.id=774,e.ids=[774],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4770:e=>{e.exports=require("crypto")},5329:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>c,staticGenerationAsyncStorage:()=>f});var o={};r.r(o),r.d(o,{default:()=>l});var i=r(3278),n=r(5002),a=r(4877),s=r(9741);let u={};function l(e,t){if("POST"===e.method){let{fileId:r}=e.body;if(!r)return t.status(400).json({error:"File ID is required"});let o=`http://localhost:3000/shared/${(0,s.Z)()}`;u[o]=r,t.status(200).json({link:o})}else t.setHeader("Allow",["POST"]),t.status(405).end(`Method ${e.method} Not Allowed`)}let p=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/get-file/route",pathname:"/api/get-file",filename:"route",bundlePath:"app/api/get-file/route"},resolvedPagePath:"C:\\Users\\v-muhammadg\\Desktop\\Projects\\my-next-app\\app\\api\\get-file\\route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:f,serverHooks:c}=p,g="/api/get-file/route";function h(){return(0,a.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:f})}},3278:(e,t,r)=>{e.exports=r(517)},1017:(e,t,r)=>{r.d(t,{Z:()=>s});var o=r(4770),i=r.n(o);let n=new Uint8Array(256),a=n.length;function s(){return a>n.length-16&&(i().randomFillSync(n),a=0),n.slice(a,a+=16)}},2698:(e,t,r)=>{r.d(t,{Z:()=>n});var o=r(3416);let i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).substr(1));let n=function(e,t=0){let r=(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase();if(!(0,o.Z)(r))throw TypeError("Stringified UUID is invalid");return r}},9741:(e,t,r)=>{r.d(t,{Z:()=>n});var o=r(1017),i=r(2698);let n=function(e,t,r){let n=(e=e||{}).random||(e.rng||o.Z)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=n[e];return t}return(0,i.Z)(n)}},3416:(e,t,r)=>{r.d(t,{Z:()=>i});let o=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,i=function(e){return"string"==typeof e&&o.test(e)}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[379],()=>r(5329));module.exports=o})();