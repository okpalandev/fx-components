!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).FxComponents={})}(this,(function(t){"use strict";var e;function s(t){return class extends HTMLElement{constructor(...t){var e,s;super(...t),this.handleScroll=this.handleScroll.bind(this),this.isScrolling=!1,null===(e=this.shadowRoot)||void 0===e||e.addEventListener("scroll",this.handleScroll),this.attachShadow({mode:"open"}),null===(s=this.shadowRoot)||void 0===s||s.appendChild(document.createElement("slot"))}static get observedAttributes(){return["fx-data-speed","fx-data-direction","fx-data-offset"]}connectedCallback(){this.handleScroll(),window.addEventListener("scroll",this.handleScroll)}disconnectedCallback(){window.removeEventListener("scroll",this.handleScroll)}attributeChangedCallback(t,e,s){e!==s&&this.handleScroll()}handleScroll(){this.isScrolling||window.requestAnimationFrame((()=>{this.style.transform=`translateY(${window.scrollY*Number(this.speed)}px)`,this.isScrolling=!1})),this.isScrolling=!0}get speed(){return Number(this.getAttribute("fx-data-speed"))||.5}get direction(){return this.getAttribute("fx-data-direction")||"vertical"}get offset(){return this.getAttribute("fx-data-offset")||0}}}t.Fx=void 0,(e=t.Fx||(t.Fx={}))._compose=function(t=HTMLElement,...e){return e.reduce(((t,e)=>e(t)),t)},e._css=function(t,...e){return t.reduce(((t,s,o)=>t+s+(e[o]||"")),"")},e._html=function(t,...e){return new Function("return `"+t.reduce(((t,s,o)=>t+s+(e[o]||"")),"")+"`")()},e._style=function(t){const e=document.createElement("style");return e.textContent=t,e},e._template=function(t){const e=document.createElement("template");return e.innerHTML=t,e},e._uniqId=function(){return Math.random().toString(36).substr(2,9)};const o=t.Fx._compose(HTMLElement,s);function n(t){return class extends HTMLElement{constructor(...t){super(...t),this.handleMouseEnter=this.handleMouseEnter.bind(this),this.handleMouseLeave=this.handleMouseLeave.bind(this)}connectedCallback(){this.tooltip=document.createElement("div"),this.tooltip.className="fx-data-tooltip",this.tooltip.textContent=this.getAttribute("fx-data-tooltip"),this.tooltip.style.position="absolute",this.tooltip.style.zIndex="1",this.tooltip.style.display="none",this.appendChild(this.tooltip),this.addEventListener("mouseenter",this.handleMouseEnter),this.addEventListener("mouseleave",this.handleMouseLeave)}disconnectedCallback(){this.removeChild(this.tooltip),this.removeEventListener("mouseenter",this.handleMouseEnter),this.removeEventListener("mouseleave",this.handleMouseLeave)}handleMouseEnter(){this.tooltip.style.display="block"}handleMouseLeave(){this.tooltip.style.display="none"}static get observedAttributes(){return["fx-data-tooltip"]}}}customElements.define("fx-parallax",o),FxParallax;const i=t.Fx._compose(HTMLElement,n);customElements.define("fx-tooltip",FxTooltip),FxTooltip;class l extends HTMLElement{constructor(){super(),this.observers=new Map,this.observeAttributes=this.observeAttributes.bind(this)}connectedCallback(){this.observeAttributes()}observe(t,e,s){const o=new MutationObserver(s);o.observe(t,e),this.observers.set(t,o)}unobserve(t){const e=this.observers.get(t);e&&(e.disconnect(),this.observers.delete(t))}disconnect(){this.observers.forEach((t=>t.disconnect()))}getRecords(){return Array.from(this.observers.values()).flatMap((t=>t.takeRecords()))}observeAttributes(){const t=new MutationObserver((t=>{t.forEach((t=>{"attributes"===t.type&&this.attributeChangedCallback(t.attributeName,t.oldValue,t.target.nodeValue)}))}));null!==this.shadowRoot&&t.observe(this.shadowRoot,{attributes:!0})}attributeChangedCallback(t,e,s){console.log("attributeChangedCallback",t,e,s)}}class r extends(t.Fx._compose(HTMLElement,l)){constructor(){super(),this.attachShadow({mode:"open"}),this.setAttribute("role","card"),this.setInitialContent()}connectedCallback(){this.render(),this.observeAttributes(),this.setInitialContent()}render(){const t=this.shadowRoot;t&&(t.innerHTML=`\n                <style>${r.styles}</style>\n                <div>\n                    <slot name="fx-title" id="fx-title"></slot>\n                    <slot name="fx-description" id="fx-description"></slot>\n                    <slot name="fx-actions"></slot>\n                </div>\n            `)}attributeChangedCallback(t,e,s){const o=this.shadowRoot;if(o){if(new MutationObserver((()=>{})).observe(o,{attributes:!0}),e!==s)switch(t){case"fx-title":o.getElementById("fx-title").textContent=s;break;case"fx-description":o.getElementById("fx-description").textContent=s}}}observeAttributes(){}setInitialContent(){var t,e;this.hasAttribute("role")||this.setAttribute("role","card"),this.hasAttribute("fx-title")||this.setAttribute("fx-title","fx-title"),this.hasAttribute("fx-description")||this.setAttribute("fx-description","fx-description");const s=null===(t=null==this?void 0:this.shadowRoot)||void 0===t?void 0:t.getElementById("fx-title"),o=null===(e=null==this?void 0:this.shadowRoot)||void 0===e?void 0:e.getElementById("fx-description");s&&(s.textContent=this.getAttribute("fx-title")),o&&(o.textContent=this.getAttribute("fx-description"))}}r.styles="\n        undefined\n    ",customElements.define("fx-card",r);class a extends(t.Fx._compose(HTMLElement)){constructor(){super(),this.attachShadow({mode:"open"}),this.shadow.innerHTML='\n            <style>\n                undefined    \n            </style>\n            <div class="fx-modal">\n                <div class="fx-modal-content">\n                    <span class="fx-close">&times;</span>\n                    <slot></slot>\n                </div>\n            </div>\n        ',this.closeButton=this.shadow.querySelector(".fx-close"),this.modal=this.shadow.querySelector(".fx-modal"),this.closeButton.addEventListener("click",this.close.bind(this))}attachShadow(t){throw new Error("Method not implemented.")}open(){this.modal.style.display="block"}close(){this.modal.style.display="none"}}const d=t.Fx._compose(HTMLElement,a);customElements.define("fx-modal",d),t.FxCard=r,t.FxObserver=l,t.FxParallaxElement=o,t.FxParallaxMixin=s,t.FxTooltipElement=i,t.FxTooltipMixin=n}));
//# sourceMappingURL=fx-components.umd.js.map
