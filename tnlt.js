const tunli = {};

// Função para proteger contra ataques XSS
tunli.xss = function (input) {
    // Use a biblioteca DOMPurify para sanitizar entradas XSS
    return DOMPurify.sanitize(input);
};

// Função para adicionar o token CSRF a solicitações AJAX
tunli.csrf = function (token) {
    // Use uma função que aceita a configuração de solicitações específicas
    return function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', token);
    };
};

// Função para proteger contra ataques de Clickjacking
tunli.click = function () {
    // Adicione o cabeçalho Content-Security-Policy com a diretiva frame-ancestors
    const cspHeader = "frame-ancestors 'self'";
    document.setHeader('Content-Security-Policy', cspHeader);
};

// Função para proteger contra ataques de Man-in-the-Middle
tunli.mitm = function () {
    // O protocolo HTTPS deve ser configurado diretamente no servidor web.
};

// Função para proteger contra ataques de Phishing
tunli.phi = function (expectedDomain) {
    // Verifique se o domínio atual corresponde ao domínio esperado
    if (window.location.hostname !== expectedDomain) {
        // Redirecione para o domínio esperado usando HTTPS
        window.location.href = 'https://' + expectedDomain;
    }
};

// Função para proteger contra ataques de Session Hijacking
tunli.hij = function () {
    // Regenere o ID da sessão após o login
    if (typeof (sessionStorage) !== "undefined") {
        sessionStorage.setItem('sessionId', Math.random().toString(36).substring(2));
    }
};

// Função para proteger contra ataques de DDoS
tunli.ddos = function () {
    // Implementar um limite de taxa para solicitações de usuários
    let lastRequestTime = Date.now();
    let requestCount = 0;
    const maxRequests = 5; // Defina o limite máximo de solicitações por segundo

    document.onkeydown = function (e) {
        const currentTime = Date.now();
        if (currentTime - lastRequestTime < 1000) {
            requestCount++;
            if (requestCount > maxRequests) {
                alert('Você está fazendo solicitações muito rapidamente. Por favor, tente novamente mais tarde.');
                e.preventDefault();
                return false;
            }
        } else {
            lastRequestTime = currentTime;
            requestCount = 0;
        }
        return true;
    };
};

// Função para proteger contra ataques de Brute Force
tunli.brute = function () {
    // Implementar um limite de tentativas de login
    let loginAttempts = 0;
    const maxAttempts = 3; // Defina o número máximo de tentativas de login permitidas

    document.getElementById('loginButton').onclick = function () {
        loginAttempts++;
        if (loginAttempts > maxAttempts) {
            alert('Você excedeu o número máximo de tentativas de login. Por favor, tente novamente mais tarde.');
            return false;
        }
        return true;
    };
};

// Função para proteger contra ataques de Directory Traversal
tunli.dir = function (path) {
    // Remova caracteres perigosos do caminho
    // Esta função pode ser melhorada com validação de caminho mais robusta, dependendo do ambiente do servidor
    let safePath = path.replace(/(\.\.)|(\%2e%2e)/gi, "");
    return safePath;
};

// Função para proteger contra ataques de Remote File Inclusion
tunli.rfi = function (url) {
    // Verifique se a URL está no mesmo domínio
    // Esta função pode ser melhorada com validação mais abrangente da URL
    let link = document.createElement('a');
    link.href = url;
    if (link.hostname !== window.location.hostname) {
        alert('Inclusão de arquivos remotos não é permitida.');
        return false;
    }
    return true;
};

// Função para proteger contra ataques de Local File Inclusion
tunli.lfi = function (path) {
    // Verifique se o caminho está dentro do diretório raiz
    // Esta função pode ser melhorada com validação mais abrangente do caminho
    let rootDirectory = '/var/www/html/';
    if (path.indexOf(rootDirectory) !== 0) {
        alert('Inclusão de arquivos locais não é permitida.');
        return false;
    }
    return true;
};

// DOMPUrify CODE:
/*! @license DOMPurify 2.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.0/LICENSE */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).DOMPurify=t()}(this,(function(){"use strict";var e=Object.hasOwnProperty,t=Object.setPrototypeOf,n=Object.isFrozen,r=Object.getPrototypeOf,o=Object.getOwnPropertyDescriptor,i=Object.freeze,a=Object.seal,l=Object.create,c="undefined"!=typeof Reflect&&Reflect,s=c.apply,u=c.construct;s||(s=function(e,t,n){return e.apply(t,n)}),i||(i=function(e){return e}),a||(a=function(e){return e}),u||(u=function(e,t){return new(Function.prototype.bind.apply(e,[null].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(t))))});var f,m=x(Array.prototype.forEach),d=x(Array.prototype.pop),p=x(Array.prototype.push),g=x(String.prototype.toLowerCase),h=x(String.prototype.match),y=x(String.prototype.replace),v=x(String.prototype.indexOf),b=x(String.prototype.trim),A=x(RegExp.prototype.test),T=(f=TypeError,function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return u(f,t)});function x(e){return function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return s(e,t,r)}}function w(e,r){t&&t(e,null);for(var o=r.length;o--;){var i=r[o];if("string"==typeof i){var a=g(i);a!==i&&(n(r)||(r[o]=a),i=a)}e[i]=!0}return e}function S(t){var n=l(null),r=void 0;for(r in t)s(e,t,[r])&&(n[r]=t[r]);return n}function k(e,t){for(;null!==e;){var n=o(e,t);if(n){if(n.get)return x(n.get);if("function"==typeof n.value)return x(n.value)}e=r(e)}return function(e){return console.warn("fallback value for",e),null}}var E=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),D=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),R=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_=i(["animate","color-profile","cursor","discard","fedropshadow","feimage","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),N=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),O=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),M=i(["#text"]),L=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),F=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),I=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),C=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),z=a(/\{\{[\s\S]*|[\s\S]*\}\}/gm),U=a(/<%[\s\S]*|[\s\S]*%>/gm),H=a(/^data-[\-\w.\u00B7-\uFFFF]/),j=a(/^aria-[\-\w]+$/),P=a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),B=a(/^(?:\w+script|data):/i),W=a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function q(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var K=function(){return"undefined"==typeof window?null:window},V=function(e,t){if("object"!==(void 0===e?"undefined":G(e))||"function"!=typeof e.createPolicy)return null;var n=null,r="data-tt-policy-suffix";t.currentScript&&t.currentScript.hasAttribute(r)&&(n=t.currentScript.getAttribute(r));var o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}};return function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K(),n=function(t){return e(t)};if(n.version="2.3.0",n.removed=[],!t||!t.document||9!==t.document.nodeType)return n.isSupported=!1,n;var r=t.document,o=t.document,a=t.DocumentFragment,l=t.HTMLTemplateElement,c=t.Node,s=t.Element,u=t.NodeFilter,f=t.NamedNodeMap,x=void 0===f?t.NamedNodeMap||t.MozNamedAttrMap:f,Y=t.Text,X=t.Comment,$=t.DOMParser,Z=t.trustedTypes,J=s.prototype,Q=k(J,"cloneNode"),ee=k(J,"nextSibling"),te=k(J,"childNodes"),ne=k(J,"parentNode");if("function"==typeof l){var re=o.createElement("template");re.content&&re.content.ownerDocument&&(o=re.content.ownerDocument)}var oe=V(Z,r),ie=oe&&ze?oe.createHTML(""):"",ae=o,le=ae.implementation,ce=ae.createNodeIterator,se=ae.createDocumentFragment,ue=ae.getElementsByTagName,fe=r.importNode,me={};try{me=S(o).documentMode?o.documentMode:{}}catch(e){}var de={};n.isSupported="function"==typeof ne&&le&&void 0!==le.createHTMLDocument&&9!==me;var pe=z,ge=U,he=H,ye=j,ve=B,be=W,Ae=P,Te=null,xe=w({},[].concat(q(E),q(D),q(R),q(N),q(M))),we=null,Se=w({},[].concat(q(L),q(F),q(I),q(C))),ke=null,Ee=null,De=!0,Re=!0,_e=!1,Ne=!1,Oe=!1,Me=!1,Le=!1,Fe=!1,Ie=!1,Ce=!0,ze=!1,Ue=!0,He=!0,je=!1,Pe={},Be=w({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),We=null,Ge=w({},["audio","video","img","source","image","track"]),qe=null,Ke=w({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),Ve="http://www.w3.org/1998/Math/MathML",Ye="http://www.w3.org/2000/svg",Xe="http://www.w3.org/1999/xhtml",$e=Xe,Ze=!1,Je=null,Qe=o.createElement("form"),et=function(e){Je&&Je===e||(e&&"object"===(void 0===e?"undefined":G(e))||(e={}),e=S(e),Te="ALLOWED_TAGS"in e?w({},e.ALLOWED_TAGS):xe,we="ALLOWED_ATTR"in e?w({},e.ALLOWED_ATTR):Se,qe="ADD_URI_SAFE_ATTR"in e?w(S(Ke),e.ADD_URI_SAFE_ATTR):Ke,We="ADD_DATA_URI_TAGS"in e?w(S(Ge),e.ADD_DATA_URI_TAGS):Ge,ke="FORBID_TAGS"in e?w({},e.FORBID_TAGS):{},Ee="FORBID_ATTR"in e?w({},e.FORBID_ATTR):{},Pe="USE_PROFILES"in e&&e.USE_PROFILES,De=!1!==e.ALLOW_ARIA_ATTR,Re=!1!==e.ALLOW_DATA_ATTR,_e=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ne=e.SAFE_FOR_TEMPLATES||!1,Oe=e.WHOLE_DOCUMENT||!1,Fe=e.RETURN_DOM||!1,Ie=e.RETURN_DOM_FRAGMENT||!1,Ce=!1!==e.RETURN_DOM_IMPORT,ze=e.RETURN_TRUSTED_TYPE||!1,Le=e.FORCE_BODY||!1,Ue=!1!==e.SANITIZE_DOM,He=!1!==e.KEEP_CONTENT,je=e.IN_PLACE||!1,Ae=e.ALLOWED_URI_REGEXP||Ae,$e=e.NAMESPACE||Xe,Ne&&(Re=!1),Ie&&(Fe=!0),Pe&&(Te=w({},[].concat(q(M))),we=[],!0===Pe.html&&(w(Te,E),w(we,L)),!0===Pe.svg&&(w(Te,D),w(we,F),w(we,C)),!0===Pe.svgFilters&&(w(Te,R),w(we,F),w(we,C)),!0===Pe.mathMl&&(w(Te,N),w(we,I),w(we,C))),e.ADD_TAGS&&(Te===xe&&(Te=S(Te)),w(Te,e.ADD_TAGS)),e.ADD_ATTR&&(we===Se&&(we=S(we)),w(we,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&w(qe,e.ADD_URI_SAFE_ATTR),He&&(Te["#text"]=!0),Oe&&w(Te,["html","head","body"]),Te.table&&(w(Te,["tbody"]),delete ke.tbody),i&&i(e),Je=e)},tt=w({},["mi","mo","mn","ms","mtext"]),nt=w({},["foreignobject","desc","title","annotation-xml"]),rt=w({},D);w(rt,R),w(rt,_);var ot=w({},N);w(ot,O);var it=function(e){var t=ne(e);t&&t.tagName||(t={namespaceURI:Xe,tagName:"template"});var n=g(e.tagName),r=g(t.tagName);if(e.namespaceURI===Ye)return t.namespaceURI===Xe?"svg"===n:t.namespaceURI===Ve?"svg"===n&&("annotation-xml"===r||tt[r]):Boolean(rt[n]);if(e.namespaceURI===Ve)return t.namespaceURI===Xe?"math"===n:t.namespaceURI===Ye?"math"===n&&nt[r]:Boolean(ot[n]);if(e.namespaceURI===Xe){if(t.namespaceURI===Ye&&!nt[r])return!1;if(t.namespaceURI===Ve&&!tt[r])return!1;var o=w({},["title","style","font","a","script"]);return!ot[n]&&(o[n]||!rt[n])}return!1},at=function(e){p(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=ie}catch(t){e.remove()}}},lt=function(e,t){try{p(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){p(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!we[e])if(Fe||Ie)try{at(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},ct=function(e){var t=void 0,n=void 0;if(Le)e="<remove></remove>"+e;else{var r=h(e,/^[\r\n\t ]+/);n=r&&r[0]}var i=oe?oe.createHTML(e):e;if($e===Xe)try{t=(new $).parseFromString(i,"text/html")}catch(e){}if(!t||!t.documentElement){t=le.createDocument($e,"template",null);try{t.documentElement.innerHTML=Ze?"":i}catch(e){}}var a=t.body||t.documentElement;return e&&n&&a.insertBefore(o.createTextNode(n),a.childNodes[0]||null),$e===Xe?ue.call(t,Oe?"html":"body")[0]:Oe?t.documentElement:a},st=function(e){return ce.call(e.ownerDocument||e,e,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT,null,!1)},ut=function(e){return!(e instanceof Y||e instanceof X)&&!("string"==typeof e.nodeName&&"string"==typeof e.textContent&&"function"==typeof e.removeChild&&e.attributes instanceof x&&"function"==typeof e.removeAttribute&&"function"==typeof e.setAttribute&&"string"==typeof e.namespaceURI&&"function"==typeof e.insertBefore)},ft=function(e){return"object"===(void 0===c?"undefined":G(c))?e instanceof c:e&&"object"===(void 0===e?"undefined":G(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},mt=function(e,t,r){de[e]&&m(de[e],(function(e){e.call(n,t,r,Je)}))},dt=function(e){var t=void 0;if(mt("beforeSanitizeElements",e,null),ut(e))return at(e),!0;if(h(e.nodeName,/[\u0080-\uFFFF]/))return at(e),!0;var r=g(e.nodeName);if(mt("uponSanitizeElement",e,{tagName:r,allowedTags:Te}),!ft(e.firstElementChild)&&(!ft(e.content)||!ft(e.content.firstElementChild))&&A(/<[/\w]/g,e.innerHTML)&&A(/<[/\w]/g,e.textContent))return at(e),!0;if(!Te[r]||ke[r]){if(He&&!Be[r]){var o=ne(e)||e.parentNode,i=te(e)||e.childNodes;if(i&&o)for(var a=i.length-1;a>=0;--a)o.insertBefore(Q(i[a],!0),ee(e))}return at(e),!0}return e instanceof s&&!it(e)?(at(e),!0):"noscript"!==r&&"noembed"!==r||!A(/<\/no(script|embed)/i,e.innerHTML)?(Ne&&3===e.nodeType&&(t=e.textContent,t=y(t,pe," "),t=y(t,ge," "),e.textContent!==t&&(p(n.removed,{element:e.cloneNode()}),e.textContent=t)),mt("afterSanitizeElements",e,null),!1):(at(e),!0)},pt=function(e,t,n){if(Ue&&("id"===t||"name"===t)&&(n in o||n in Qe))return!1;if(Re&&!Ee[t]&&A(he,t));else if(De&&A(ye,t));else{if(!we[t]||Ee[t])return!1;if(qe[t]);else if(A(Ae,y(n,be,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==v(n,"data:")||!We[e]){if(_e&&!A(ve,y(n,be,"")));else if(n)return!1}else;}return!0},gt=function(e){var t=void 0,r=void 0,o=void 0,i=void 0;mt("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var l={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:we};for(i=a.length;i--;){var c=t=a[i],s=c.name,u=c.namespaceURI;if(r=b(t.value),o=g(s),l.attrName=o,l.attrValue=r,l.keepAttr=!0,l.forceKeepAttr=void 0,mt("uponSanitizeAttribute",e,l),r=l.attrValue,!l.forceKeepAttr&&(lt(s,e),l.keepAttr))if(A(/\/>/i,r))lt(s,e);else{Ne&&(r=y(r,pe," "),r=y(r,ge," "));var f=e.nodeName.toLowerCase();if(pt(f,o,r))try{u?e.setAttributeNS(u,s,r):e.setAttribute(s,r),d(n.removed)}catch(e){}}}mt("afterSanitizeAttributes",e,null)}},ht=function e(t){var n=void 0,r=st(t);for(mt("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)mt("uponSanitizeShadowNode",n,null),dt(n)||(n.content instanceof a&&e(n.content),gt(n));mt("afterSanitizeShadowDOM",t,null)};return n.sanitize=function(e,o){var i=void 0,l=void 0,s=void 0,u=void 0,f=void 0;if((Ze=!e)&&(e="\x3c!--\x3e"),"string"!=typeof e&&!ft(e)){if("function"!=typeof e.toString)throw T("toString is not a function");if("string"!=typeof(e=e.toString()))throw T("dirty is not a string, aborting")}if(!n.isSupported){if("object"===G(t.toStaticHTML)||"function"==typeof t.toStaticHTML){if("string"==typeof e)return t.toStaticHTML(e);if(ft(e))return t.toStaticHTML(e.outerHTML)}return e}if(Me||et(o),n.removed=[],"string"==typeof e&&(je=!1),je);else if(e instanceof c)1===(l=(i=ct("\x3c!----\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===l.nodeName||"HTML"===l.nodeName?i=l:i.appendChild(l);else{if(!Fe&&!Ne&&!Oe&&-1===e.indexOf("<"))return oe&&ze?oe.createHTML(e):e;if(!(i=ct(e)))return Fe?null:ie}i&&Le&&at(i.firstChild);for(var m=st(je?e:i);s=m.nextNode();)3===s.nodeType&&s===u||dt(s)||(s.content instanceof a&&ht(s.content),gt(s),u=s);if(u=null,je)return e;if(Fe){if(Ie)for(f=se.call(i.ownerDocument);i.firstChild;)f.appendChild(i.firstChild);else f=i;return Ce&&(f=fe.call(r,f,!0)),f}var d=Oe?i.outerHTML:i.innerHTML;return Ne&&(d=y(d,pe," "),d=y(d,ge," ")),oe&&ze?oe.createHTML(d):d},n.setConfig=function(e){et(e),Me=!0},n.clearConfig=function(){Je=null,Me=!1},n.isValidAttribute=function(e,t,n){Je||et({});var r=g(e),o=g(t);return pt(r,o,n)},n.addHook=function(e,t){"function"==typeof t&&(de[e]=de[e]||[],p(de[e],t))},n.removeHook=function(e){de[e]&&d(de[e])},n.removeHooks=function(e){de[e]&&(de[e]=[])},n.removeAllHooks=function(){de={}},n}()}));
//# sourceMappingURL=purify.min.js.map
