var t,e=t;function s(t){return class extends HTMLElement{constructor(...t){var e,s;super(...t),this.handleScroll=this.handleScroll.bind(this),this.isScrolling=!1,null===(e=this.shadowRoot)||void 0===e||e.addEventListener("scroll",this.handleScroll),this.attachShadow({mode:"open"}),null===(s=this.shadowRoot)||void 0===s||s.appendChild(document.createElement("slot"))}static get observedAttributes(){return["fx-data-speed","fx-data-direction","fx-data-offset"]}connectedCallback(){this.handleScroll(),window.addEventListener("scroll",this.handleScroll)}disconnectedCallback(){window.removeEventListener("scroll",this.handleScroll)}attributeChangedCallback(t,e,s){e!==s&&this.handleScroll()}handleScroll(){this.isScrolling||window.requestAnimationFrame((()=>{this.style.transform=`translateY(${window.scrollY*Number(this.speed)}px)`,this.isScrolling=!1})),this.isScrolling=!0}get speed(){return Number(this.getAttribute("fx-data-speed"))||.5}get direction(){return this.getAttribute("fx-data-direction")||"vertical"}get offset(){return this.getAttribute("fx-data-offset")||0}}}!function(t){t._compose=function(t=HTMLElement,...e){return e.reduce(((t,e)=>e(t)),t)},t._css=function(t,...e){return t.reduce(((t,s,n)=>t+s+(e[n]||"")),"")},t._html=function(t,...e){return new Function("return `"+t.reduce(((t,s,n)=>t+s+(e[n]||"")),"")+"`")()},t._style=function(t){const e=document.createElement("style");return e.textContent=t,e},t._template=function(t){const e=document.createElement("template");return e.innerHTML=t,e},t._uniqId=function(){return Math.random().toString(36).substr(2,9)}}(t||(t={}));const n=t._compose(HTMLElement,s);customElements.define("fx-parallax",n);class o extends HTMLElement{constructor(){super(),this.observers=new Map,this.observeAttributes=this.observeAttributes.bind(this)}connectedCallback(){this.observeAttributes()}observe(t,e,s){const n=new MutationObserver(s);n.observe(t,e),this.observers.set(t,n)}unobserve(t){const e=this.observers.get(t);e&&(e.disconnect(),this.observers.delete(t))}disconnect(){this.observers.forEach((t=>t.disconnect()))}getRecords(){return Array.from(this.observers.values()).flatMap((t=>t.takeRecords()))}observeAttributes(){const t=new MutationObserver((t=>{t.forEach((t=>{"attributes"===t.type&&this.attributeChangedCallback(t.attributeName,t.oldValue,t.target.nodeValue)}))}));null!==this.shadowRoot&&t.observe(this.shadowRoot,{attributes:!0})}attributeChangedCallback(t,e,s){console.log("attributeChangedCallback",t,e,s)}}const i=t=>class extends HTMLElement{static get observedAttributes(){return["fx-neu-radius","fx-neu-shadow-light","fx-neu-shadow-dark","fx-neu-shadow-x","fx-neu-shadow-y","fx-neu-blur"]}static get styles(){return"\n          undefined\n        "}constructor(){super(),this.handleMouseEnter=this.handleMouseEnter.bind(this),this.handleMouseLeave=this.handleMouseLeave.bind(this)}connectedCallback(){this.addEventListener("mouseenter",this.handleMouseEnter),this.addEventListener("mouseleave",this.handleMouseLeave)}disconnectedCallback(){this.removeEventListener("mouseenter",this.handleMouseEnter),this.removeEventListener("mouseleave",this.handleMouseLeave)}handleMouseEnter(){this.style.boxShadow="var(--fx-neu-shadow-light) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-dark), var(--fx-neu-shadow-dark) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-light)",this.style.borderRadius="var(--fx-neu-radius)"}handleMouseLeave(){this.style.boxShadow="none",this.style.borderRadius="var(--fx-neu-radius)"}attributeChangedCallback(t,e,s){e!==s&&this.style.setProperty(`--${t}`,s)}},r=e._compose(HTMLElement,i);class a extends(t._compose(HTMLElement,o)){constructor(){super(),this.attachShadow({mode:"open"}),this.setAttribute("role","card"),this.setInitialContent()}connectedCallback(){this.render(),this.observeAttributes(),this.setInitialContent()}render(){const t=this.shadowRoot;t&&(t.innerHTML=`\n                <style>${a.styles}</style>\n                <div>\n                    <slot name="fx-title" id="fx-title"></slot>\n                    <slot name="fx-description" id="fx-description"></slot>\n                    <slot name="fx-actions"></slot>\n                </div>\n            `)}attributeChangedCallback(t,e,s){const n=this.shadowRoot;if(n){if(new MutationObserver((()=>{})).observe(n,{attributes:!0}),e!==s)switch(t){case"fx-title":n.getElementById("fx-title").textContent=s;break;case"fx-description":n.getElementById("fx-description").textContent=s}}}setInitialContent(){var t,e;this.hasAttribute("role")||this.setAttribute("role","card"),this.hasAttribute("fx-title")||this.setAttribute("fx-title","fx-title"),this.hasAttribute("fx-description")||this.setAttribute("fx-description","fx-description");const s=null===(t=null==this?void 0:this.shadowRoot)||void 0===t?void 0:t.getElementById("fx-title"),n=null===(e=null==this?void 0:this.shadowRoot)||void 0===e?void 0:e.getElementById("fx-description");s&&(s.textContent=this.getAttribute("fx-title")),n&&(n.textContent=this.getAttribute("fx-description"))}}function l(t){return class extends HTMLElement{constructor(...t){super(...t),this.handleMouseEnter=this.handleMouseEnter.bind(this),this.handleMouseLeave=this.handleMouseLeave.bind(this)}connectedCallback(){this.tooltip=document.createElement("div"),this.tooltip.className="fx-data-tooltip",this.tooltip.textContent=this.getAttribute("fx-data-tooltip"),this.tooltip.style.position="absolute",this.tooltip.style.zIndex="1",this.tooltip.style.display="none",this.appendChild(this.tooltip),this.addEventListener("mouseenter",this.handleMouseEnter),this.addEventListener("mouseleave",this.handleMouseLeave)}disconnectedCallback(){this.removeChild(this.tooltip),this.removeEventListener("mouseenter",this.handleMouseEnter),this.removeEventListener("mouseleave",this.handleMouseLeave)}handleMouseEnter(){this.tooltip.style.display="block"}handleMouseLeave(){this.tooltip.style.display="none"}static get observedAttributes(){return["fx-data-tooltip"]}}}a.styles="\n        undefined\n    ",customElements.define("fx-card",a);const d=t._compose(HTMLElement,l);customElements.define("fx-tooltip",d);function h(t){return class extends t{constructor(...t){super(...t),this.attachShadow({mode:"open"}),this.shadow.innerHTML='\n                <style>\n                    undefined    \n                </style>\n                <div class="fx-modal">\n                    <div class="fx-modal-content">\n                        <span class="fx-close">&times;</span>\n                        <slot></slot>\n                    </div>\n                </div>\n            ',this.closeButton=this.shadow.querySelector(".fx-close"),this.modal=this.shadow.querySelector(".fx-modal"),this.closeButton.addEventListener("click",this.close.bind(this))}open(){this.modal.style.display="block"}close(){this.modal.style.display="none"}}}const u=t._compose(HTMLElement,h);customElements.define("fx-modal",u);export{t as Fx,a as FxCard,h as FxModalMixin,r as FxNeu,r as FxNeuElement,i as FxNeuromorphicMixin,o as FxObserver,n as FxParallaxElement,s as FxParallaxMixin,d as FxTooltipElement,l as FxTooltipMixin};
//# sourceMappingURL=fx-components.js.map
