"use strict";function o(t,n){Array.isArray(t)||(t=t.split(`
`));let{lines:r,quartoArgs:s}=a(t);return{files:c(r,n),quartoArgs:s}}function a(t){let n=[...t],r={},s=!0;for(;s&&n.length>0;){let i=n[0].match(/^#\|\s(?<prop>\w+):\s*(?<val>\w+)$/);if(i){n.splice(0,1);let{prop:e,val:l}=i.groups;!e||!l?console.warn("Invalid format of layout args. Ignoring...",i.groups):r[e]=l}else s=!1,Object.keys(r).length!==0&&n.length>=1&&n[0]===""&&n.splice(0,1)}return{lines:n,quartoArgs:r}}function c(t,n){let r=[],s={name:n,content:"",type:"text"},i="START";for(let e of t)if(i==="START")e.match(/^##\s?file:/)?(i="HEADER",s={name:e.replace(/^##\s?file:/,"").trim(),content:"",type:"text"}):e===""||(i="FILE_CONTENT",s.content+=e);else if(i==="HEADER")if(e.match(/^##\s?file:/))i="HEADER",r.push(s),s={name:e.replace(/^##\s?file:/,"").trim(),content:"",type:"text"};else if(e.match(/^##\s?type:/)){let l=e.replace(/^##\s?type:/,"").trim();l==="text"||l==="binary"?s.type=l:console.warn(`Invalid type string: "${e}".`)}else i="FILE_CONTENT",s.content+=e;else i==="FILE_CONTENT"&&(e.match(/^##\s?file:/)?(i="HEADER",r.push(s),s={name:e.replace(/^##\s?file:/,"").trim(),content:"",type:"text"}):s.content+=`
`+e);return r.push(s),r}import{runApp as f}from"./shinylive.js";var p=[{class:"pyshiny",appMode:"editor-viewer",defaultFilename:"app.py"},{class:"pyshinyapp",appMode:"viewer",defaultFilename:"app.py"},{class:"pyterminal",appMode:"editor-terminal",defaultFilename:"code.py"},{class:"pycell",appMode:"editor-cell",defaultFilename:"code.py"}],m=p.map(t=>"."+t.class).join(", "),g=document.querySelectorAll(m);g.forEach(t=>{let n=null;for(let l of p)if(t.className.split(" ").includes(l.class)){n=l;break}if(!n){console.log("No mapping found for block ",t);return}let r=document.createElement("div");r.className="pyshiny-container",r.style.cssText=t.style.cssText,t.parentNode.replaceChild(r,t);let{files:s,quartoArgs:i}=o(t.innerText,n.defaultFilename),e={startFiles:s,...i};f(r,n.appMode,e)});