"use strict";(()=>{var e={};e.id=362,e.ids=[362],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},5830:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>y,patchFetch:()=>S,requestAsyncStorage:()=>h,routeModule:()=>m,serverHooks:()=>x,staticGenerationAsyncStorage:()=>g});var a={};r.r(a),r.d(a,{POST:()=>f});var s=r(3278),n=r(5002),o=r(4877),i=r(2048),p=r.n(i),u=r(5315);let l=r.n(u)().join(process.cwd(),"data.json"),d=()=>JSON.parse(p().readFileSync(l)),c=e=>{p().writeFileSync(l,JSON.stringify(e,null,2))};async function f(e){let{username:t,file:r,tags:a}=await e.json(),s=d(),n=s.users.find(e=>e.username===t);if(!n)return new Response(JSON.stringify({error:"User not found"}),{status:404,headers:{"Content-Type":"application/json"}});let o=`https://herogram-next-fullstack-ghazanfar.netlify.app/files/${t}/${r.name}`,i={name:r.name,type:r.type,tags:a,uploadedAt:new Date().toISOString(),shareableLink:o};return n.uploadedFiles.push(i),c(s),new Response(JSON.stringify({file:i}),{status:200,headers:{"Content-Type":"application/json"}})}let m=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/files/upload/route",pathname:"/api/files/upload",filename:"route",bundlePath:"app/api/files/upload/route"},resolvedPagePath:"C:\\Users\\v-muhammadg\\Desktop\\Projects\\my-next-app\\app\\api\\files\\upload\\route.js",nextConfigOutput:"",userland:a}),{requestAsyncStorage:h,staticGenerationAsyncStorage:g,serverHooks:x}=m,y="/api/files/upload/route";function S(){return(0,o.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:g})}},3278:(e,t,r)=>{e.exports=r(517)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[379],()=>r(5830));module.exports=a})();