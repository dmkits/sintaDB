//>>built
define("dojox/drawing/manager/Anchors",["dojo","../util/oo","../defaults"],function(c,h,k){var l=h.declare(function(a){this.defaults=k.copy();this.mouse=a.mouse;this.point=a.point;this.pointIdx=a.pointIdx;this.util=a.util;this.id=a.id||this.util.uid("anchor");this.org=c.mixin({},this.point);this.stencil=a.stencil;this.stencil.anchorPositionCheck&&(this.anchorPositionCheck=c.hitch(this.stencil,this.stencil.anchorPositionCheck));this.stencil.anchorConstrain&&(this.anchorConstrain=c.hitch(this.stencil,
this.stencil.anchorConstrain));this._zCon=c.connect(this.mouse,"setZoom",this,"render");this.render();this.connectMouse()},{y_anchor:null,x_anchor:null,render:function(){this.shape&&this.shape.removeShape();var a=this.defaults.anchors,b=this.mouse.zoom,e=a.size*b,d=e/2,b={width:a.width*b,style:a.style,color:a.color,cap:a.cap};this.shape=this.stencil.container.createRect({x:this.point.x-d,y:this.point.y-d,width:e,height:e}).setStroke(b).setFill(a.fill);this.shape.setTransform({dx:0,dy:0});this.util.attr(this,
"drawingType","anchor");this.util.attr(this,"id",this.id)},onRenderStencil:function(a){},onTransformPoint:function(a){},onAnchorDown:function(a){this.selected=a.id==this.id},onAnchorUp:function(a){this.selected=!1;this.stencil.onTransformEnd(this)},onAnchorDrag:function(a){if(this.selected){this.shape.getTransform();var b=this.shape.getParent().getParent().getTransform(),e=this.defaults.anchors.marginZero,d=b.dx+this.org.x,c=b.dy+this.org.y,b=a.x-d;a=a.y-c;var g=this.defaults.anchors.minSize,f;f=
this.anchorPositionCheck(b,a,this);if(0>f.x)for(console.warn("X\x3c0 Shift");0>this.anchorPositionCheck(b,a,this).x;)this.shape.getParent().getParent().applyTransform({dx:2,dy:0});if(0>f.y)for(console.warn("Y\x3c0 Shift");0>this.anchorPositionCheck(b,a,this).y;)this.shape.getParent().getParent().applyTransform({dx:0,dy:2});this.y_anchor?this.org.y>this.y_anchor.org.y?(c=this.y_anchor.point.y+g-this.org.y,f=Infinity,a<c&&(a=c)):(c=-c+e,f=this.y_anchor.point.y-g-this.org.y,a<c?a=c:a>f&&(a=f)):(c=-c+
e,a<c&&(a=c));this.x_anchor?this.org.x>this.x_anchor.org.x?(e=this.x_anchor.point.x+g-this.org.x,d=Infinity,b<e&&(b=e)):(e=-d+e,d=this.x_anchor.point.x-g-this.org.x,b<e?b=e:b>d&&(b=d)):(e=-d+e,b<e&&(b=e));e=this.anchorConstrain(b,a);null!=e&&(b=e.x,a=e.y);this.shape.setTransform({dx:b,dy:a});this.linkedAnchor&&this.linkedAnchor.shape.setTransform({dx:b,dy:a});this.onTransformPoint(this)}},anchorConstrain:function(a,b){return null},anchorPositionCheck:function(a,b,c){return{x:1,y:1}},setPoint:function(a){this.shape.applyTransform(a)},
connectMouse:function(){this._mouseHandle=this.mouse.register(this)},disconnectMouse:function(){this.mouse.unregister(this._mouseHandle)},reset:function(a){},destroy:function(){c.disconnect(this._zCon);this.disconnectMouse();this.shape.removeShape()}});return h.declare(function(a){this.mouse=a.mouse;this.undo=a.undo;this.util=a.util;this.drawing=a.drawing;this.items={}},{onAddAnchor:function(a){},onReset:function(a){var b=this.util.byId("drawing").stencils;b.onDeselect(a);b.onSelect(a)},onRenderStencil:function(){for(var a in this.items)c.forEach(this.items[a].anchors,
function(a){a.shape.moveToFront()})},onTransformPoint:function(a){var b=this.items[a.stencil.id].item,e=[];c.forEach(this.items[a.stencil.id].anchors,function(b,c){a.id!=b.id&&"group"==a.stencil.anchorType&&(a.org.y==b.org.y?b.setPoint({dx:0,dy:a.shape.getTransform().dy-b.shape.getTransform().dy}):a.org.x==b.org.x&&b.setPoint({dx:a.shape.getTransform().dx-b.shape.getTransform().dx,dy:0}),b.shape.moveToFront());var d=b.shape.getTransform();e.push({x:d.dx+b.org.x,y:d.dy+b.org.y});b.point.t&&(e[e.length-
1].t=b.point.t)},this);b.setPoints(e);b.onTransform(a);this.onRenderStencil()},onAnchorUp:function(a){},onAnchorDown:function(a){},onAnchorDrag:function(a){},onChangeStyle:function(a){for(var b in this.items)c.forEach(this.items[b].anchors,function(a){a.shape.moveToFront()})},add:function(a){this.items[a.id]={item:a,anchors:[]};if("none"!=a.anchorType){var b=a.points;c.forEach(b,function(b,e){if(!b.noAnchor){var d=new l({stencil:a,point:b,pointIdx:e,mouse:this.mouse,util:this.util});this.items[a.id]._cons=
[c.connect(d,"onRenderStencil",this,"onRenderStencil"),c.connect(d,"reset",this,"onReset"),c.connect(d,"onAnchorUp",this,"onAnchorUp"),c.connect(d,"onAnchorDown",this,"onAnchorDown"),c.connect(d,"onAnchorDrag",this,"onAnchorDrag"),c.connect(d,"onTransformPoint",this,"onTransformPoint"),c.connect(a,"onChangeStyle",this,"onChangeStyle")];this.items[a.id].anchors.push(d);this.onAddAnchor(d)}},this);if("path"==a.shortType){var e=b[0],b=b[b.length-1],d=this.items[a.id].anchors;e.x==b.x&&e.y==b.y&&(console.warn("LINK ANVHROS",
d[0],d[d.length-1]),d[0].linkedAnchor=d[d.length-1],d[d.length-1].linkedAnchor=d[0])}"group"==a.anchorType&&c.forEach(this.items[a.id].anchors,function(b){c.forEach(this.items[a.id].anchors,function(a){b.id!=a.id&&(b.org.y==a.org.y?b.x_anchor=a:b.org.x==a.org.x&&(b.y_anchor=a))},this)},this)}},remove:function(a){this.items[a.id]&&(c.forEach(this.items[a.id].anchors,function(a){a.destroy()}),c.forEach(this.items[a.id]._cons,c.disconnect,c),this.items[a.id].anchors=null,delete this.items[a.id])}})});
//# sourceMappingURL=Anchors.js.map