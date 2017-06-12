//>>built
define("dojox/drawing/ui/dom/Pan",["dojo","../../util/oo","../../plugins/_Plugin","../../manager/_registry"],function(a,c,t,u){a.deprecated("dojox.drawing.ui.dom.Pan","It may not even make it to the 1.4 release.",1.4);c=c.declare(t,function(b){this.domNode=b.node;var l;a.connect(this.domNode,"click",this,"onSetPan");a.connect(this.keys,"onKeyUp",this,"onKeyUp");a.connect(this.keys,"onKeyDown",this,"onKeyDown");a.connect(this.anchors,"onAnchorUp",this,"checkBounds");a.connect(this.stencils,"register",
this,"checkBounds");a.connect(this.canvas,"resize",this,"checkBounds");a.connect(this.canvas,"setZoom",this,"checkBounds");a.connect(this.canvas,"onScroll",this,function(){this._blockScroll?this._blockScroll=!1:(l&&clearTimeout(l),l=setTimeout(a.hitch(this,"checkBounds"),200))});this._mouseHandle=this.mouse.register(this)},{selected:!1,type:"dojox.drawing.ui.dom.Pan",onKeyUp:function(b){if(32==b.keyCode)this.onSetPan(!1)},onKeyDown:function(b){if(32==b.keyCode)this.onSetPan(!0)},onSetPan:function(b){if(!0===
b||!1===b)this.selected=!b;this.selected?(this.selected=!1,a.removeClass(this.domNode,"selected")):(this.selected=!0,a.addClass(this.domNode,"selected"));this.mouse.setEventMode(this.selected?"pan":"")},onPanDrag:function(b){this.canvas.domNode.parentNode.scrollTop-=b.move.y;this.canvas.domNode.parentNode.scrollLeft-=b.move.x;this.canvas.onScroll()},onStencilUp:function(b){this.checkBounds()},onStencilDrag:function(b){},checkBounds:function(){var b=-Infinity,a=-Infinity,c=0,m=0,n=this.stencils.group?
this.stencils.group.getTransform():{dx:0,dy:0},e=this.mouse.scrollOffset(),f=this.canvas.height,g=this.canvas.width,p=this.canvas.zoom,h=this.canvas.parentHeight,k=this.canvas.parentWidth;this.stencils.withSelected(function(d){d=d.getBounds();b=Math.max(d.x2+n.dx,b);a=Math.max(d.y2+n.dy,a)});this.stencils.withUnselected(function(d){d=d.getBounds();b=Math.max(d.x2,b);a=Math.max(d.y2,a)});var a=a*p,q=0,r=0;a>h||e.top?(f=Math.max(a,h+e.top),m=e.top,q+=this.canvas.getScrollWidth()):!m&&f>h&&(f=h);b*=
p;b>k||e.left?(g=Math.max(b,k+e.left),c=e.left,r+=this.canvas.getScrollWidth()):!c&&g>k&&(g=k);g+=2*q;f+=2*r;this._blockScroll=!0;this.stencils.group&&this.stencils.group.applyTransform({dx:0,dy:0});this.stencils.withUnselected(function(a){a.transformPoints({dx:0,dy:0})});this.canvas.setDimensions(g,f,c,m)}});a.setObject("dojox.drawing.ui.dom.Pan",c);c.setup={name:"dojox.drawing.ui.dom.Pan",tooltip:"Pan Tool",iconClass:"iconPan"};u.register(c.setup,"plugin");return c});
//# sourceMappingURL=Pan.js.map