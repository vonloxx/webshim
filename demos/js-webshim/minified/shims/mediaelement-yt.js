jQuery.webshims.register("mediaelement-yt",function(d,e,i,r,m){var n=e.mediaelement,p=jQuery.Deferred();i.onYouTubePlayerAPIReady=function(){p.resolve()};if(i.YT&&YT.Player)i.onYouTubePlayerAPIReady();var i={paused:!0,ended:!1,currentSrc:"",duration:i.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(b){if(b)e.error("buffered index size error");else return 0},end:function(b){if(b)e.error("buffered index size error");else return 0},length:0}},u=Object.keys(i),
s={currentTime:0,volume:1,muted:!1};Object.keys(s);var v=d.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_metadata:!1,_callMeta:!1,currentTime:0,_buffered:0,_ppFlag:m},i,s),k=function(b,c){c=d.Event(c);c.preventDefault();d.event.trigger(c,m,b)},w=function(){var b="_buffered,_metadata,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth,_callMeta".split(","),c=b.length;return function(a){if(a){var d=c,h=a.networkState;for(a.readyState=0;--d;)delete a[b[d]];
a.buffered.length=0;clearInterval(a._timeInterval);h&&k(a._elem,"emptied")}}}(),x=function(b){var c=b._elem;b.shadowElem.css({width:c.style.width||d(c).width(),height:c.style.height||d(c).height()})},j=function(b){return(b=e.data(b,"mediaelement"))&&"third"==b.isActive?b:null},y=function(b){var c,b=b.split("?");-1!=b[0].indexOf("youtube.com/watch")&&b[1]?(b=b[1].split("&"),d.each(b,function(a,d){d=d.split("=");if("v"==d[0])return b=d[1],c=!0,!1})):-1!=b[0].indexOf("youtube.com/v/")&&(b=b[0].split("/"),
d.each(b,function(a,d){if(c)return b=d,!1;"v"==d&&(c=!0)}));c||e.warn("no youtube id found: "+b);return b},t=function(b){b&&(b._ppFlag===m&&d.prop(b._elem,"autoplay")||!b.paused)&&setTimeout(function(){if("third"==b.isActive&&(b._ppFlag===m||!b.paused))try{d(b._elem).play()}catch(c){}},1)},q=d.noop;(function(){var b={play:1,playing:1},c="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),a=c.map(function(a){return a+".webshimspolyfill"}).join(" "),
g=function(a){var c=e.data(a.target,"mediaelement");c&&(a.originalEvent&&a.originalEvent.type===a.type)==("third"==c.activating)&&(a.stopImmediatePropagation(),b[a.type]&&c.isActive!=c.activating&&d(a.target).pause())};q=function(b){d(b).unbind(a).bind(a,g);c.forEach(function(a){e.moveToFirstEvent(b,a)})};q(r)})();d(r).bind("emptied",function(b){b=j(b.target);t(b)});n.setActive=function(b,c,a){a||(a=e.data(b,"mediaelement"));if(a&&a.isActive!=c){"html5"!=c&&"third"!=c&&e.warn("wrong type for mediaelement activating: "+
c);var g=e.data(b,"shadowData");a.activating=c;d(b).pause();a.isActive=c;"third"==c?(g.shadowElement=g.shadowFocusElement=a.shadowElem[0],d(b).addClass("yt-api-active nonnative-api-active").hide().getShadowElement().show()):(clearInterval(a._timeInterval),d(b).removeClass("yt-api-active nonnative-api-active").show().getShadowElement().hide(),g.shadowElement=g.shadowFocusElement=!1);d(b).trigger("mediaelementapichange")}};var o=function(b,c){c._ppFlag=!0;if("playing"==b){o("play",c);if(3>c.readyState)c.readyState=
3,k(c._elem,"canplay");d(c._elem).trigger("playing")}if("play"==b&&c.paused)c.paused=!1,k(c._elem,"play");else if("pause"==b&&!c.paused)c.paused=!0,k(c._elem,"pause")},z=function(b,c,a,e){p.done(function(){var h=function(){var c,f;if(a._metadata&&a._ytAPI.getVideoLoadedFraction&&(f=a._ytAPI.getVideoLoadedFraction(),c=f*a.duration,a._buffered!==c)){a._buffered=c;a.buffered.length=1;d(b).trigger("progress");if(4>a.readyState&&a.currentTime&&(9<a._buffered-a.currentTime||0.99<f))a.readyState=4,k(a._elem,
"canplaythrough");if(0.99<f)a.networkState=1}},f=function(){if("third"==a.isActive&&a._ytAPI&&a._ytAPI.getVolume){var c=a._ytAPI.getVolume()/100,f=a._ytAPI.isMuted(),l;if(c!=a.volume)a.volume=c,l=!0;if(f!=a.muted)a.muted=f,l=!0;if(a._ytAPI&&a._ytAPI.getCurrentTime){c=a._ytAPI.getCurrentTime();if(a.currentTime!=c)a.currentTime=c,d(b).trigger("timeupdate");0.95>a._buffered&&h()}h();l&&d(b).trigger("volumechange")}},l=function(){clearInterval(a._timeInterval);a._timeInterval=setInterval(function(){var c=
a._ytAPI.getCurrentTime();if(a.currentTime!=c)a.currentTime=c,d(b).trigger("timeupdate")},350)};a._ytAPI=new YT.Player(c,{height:"100%",width:"100%",playerVars:{allowfullscreen:!0,fs:1,rel:0,showinfo:0,autohide:1,controls:d.prop(b,"controls")?1:0},videoId:e,events:{onReady:function(){t(a);setTimeout(f,9);setInterval(f,999)},onStateChange:function(c){if(c.target.getDuration){var f;if(!a._metadata){var e=c.target.getDuration();if(e){a._metadata=!0;a.duration=e;if(1>a.readyState)a.readyState=1;if(1>
a.networkState)a.networkState=2;f=!0}}f&&d(b).trigger("durationchange").trigger("loadedmetadata");if(1==c.data)o("playing",a),l();else if(2==c.data)clearInterval(a._timeInterval),o("pause",a);else if(3==c.data){if(2<a.readyState)a.readyState=2;a.networkState=2;d(b).trigger("waiting")}else if(0===c.data){if(4<a.readyState)a.readyState=4;a.networkState=1;clearInterval(a._timeInterval);d(b).trigger("ended")}}}}});d(b).bind("updateytdata",f)})};n.createSWF=function(b,c,a){a||(a=e.data(b,"mediaelement"));
var g=y(c.src);if(a)n.setActive(b,"third",a),w(a),a.currentSrc=c.srcProp,p.done(function(){a._ytAPI.loadVideoById&&a._ytAPI.loadVideoById(g)});else{d.prop(b,"controls");var h="yt-"+e.getID(b),f=d('<div class="polyfill-video polyfill-mediaelement" id="wrapper-'+h+'"><div id="'+h+'"></div>').css({position:"relative",overflow:"hidden"}),a=e.data(b,"mediaelement",e.objectCreate(v,{shadowElem:{value:f},_elem:{value:b},currentSrc:{value:c.srcProp},buffered:{value:{start:function(b){if(b>=a.buffered.length)e.error("buffered index size error");
else return 0},end:function(b){if(b>=a.buffered.length)e.error("buffered index size error");else return a._buffered},length:0}}}));x(a);f.insertBefore(b);e.addShadowDom(b,f);n.setActive(b,"third",a);q(b);z(b,h,a,g)}};(function(){var b=function(a){clearTimeout(a.updateDataTimer);a.updateDataTimer=setTimeout(function(){d(a._elem).triggerHandler("updateytdata")},9)},c={},a,g=function(b){c[b]={get:function(){var c=j(this);return c?c[b]:a[b].prop._supget.apply(this)},writeable:!1}},h=function(a,b){g(a);
delete c[a].writeable;c[a].set=b};u.forEach(g);h("currentTime",function(c){var d=j(this);if(d)c*=1,!isNaN(c)&&d._ytAPI&&d._ytAPI.seekTo&&(d._ytAPI.seekTo(c),b(d));else return a.currentTime.prop._supset.apply(this,arguments)});h("muted",function(c){var d=j(this);if(d)d._ytAPI&&d._ytAPI.mute&&(d._ytAPI[c?"mute":"unMute"](),b(d));else return a.muted.prop._supset.apply(this,arguments)});h("volume",function(c){var d=j(this);if(d)c*=100,!isNaN(c)&&d._ytAPI&&d._ytAPI.setVolume&&((0>c||100<c)&&e.error("volume greater or less than allowed "+
c/100),d._ytAPI.setVolume(c),b(d));else return a.volume.prop._supset.apply(this,arguments)});d.each(["play","pause"],function(b,d){var e=d+"Video";c[d]={value:function(){var b=j(this);if(b)b._ytAPI&&b._ytAPI[e]&&(b._ytAPI[e](),o(d,b));else return a[d].prop._supvalue.apply(this,arguments)}}});a=e.defineNodeNameProperties("video",c,"prop")})()});
