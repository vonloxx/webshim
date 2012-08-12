jQuery.webshims.register("track",function(d,c,o,s){var h=c.mediaelement;(new Date).getTime();var t={subtitles:1,captions:1},p=function(){c.error("not implemented yet")},u={getCueById:p},v={shimActiveCues:null,cues:null,kind:"subtitles",label:"",language:"",mode:0,oncuechange:null,toString:function(){return"[object TextTrack]"},addCue:function(a){if(!this.cues)this.cues=[];a.track&&c.error("cue already part of a track element");a.track=this;this.cues.push(a)},removeCue:p,DISABLED:0,OFF:0,HIDDEN:1,
SHOWING:2},w=["kind","label","srclang"],m=function(){var a=d.prop(this,"textTracks"),b=c.data(this,"mediaelementBase"),f=a.splice(0),g,e;d("track",this).each(function(){a.push(d.prop(this,"track"))});if(b.scriptedTextTracks)for(g=0,e=b.scriptedTextTracks.length;g<e;g++)a.push(b.scriptedTextTracks[g]);if(h.trackDisplay&&b.trackDisplay)for(g=0,e=f.length;g<e;g++)-1==a.indexOf(f[g])&&h.trackDisplay.hide(f[g],b)},q=function(a,b){var f;b||(b=c.data(a,"trackData"));if(b&&!b.isTriggering)b.isTriggering=
!0,f=(b.track||{}).mode,setTimeout(function(){if(f!==(b.track||{}).mode)b.readyState?d(a).parent().triggerHandler("updatetrackdisplay"):d(a).triggerHandler("checktrackmode");b.isTriggering=!1},9)};o.TextTrackCue=function(a,b,f,g,e,d){this.id=a;this.startTime=b;this.endTime=f;this.text=g;this.pauseOnExit=d;e&&c.warn("webshims currently does not support any cue settings")};o.TextTrackCue.prototype={onenter:null,onexit:null,pauseOnExit:!1,getCueAsHTML:function(){},track:null,id:"",snapToLines:!0,line:-1,
size:100,position:50,vertical:"",align:"middle"};h.createCueList=function(){return d.extend([],u)};h.createTextTrack=function(a,b){var f,g,e;if(b.nodeName&&(g=c.data(b,"trackData")))q(b,g),f=g.track;if(!f)if(f=c.objectCreate(v),w.forEach(function(a){var c=d.prop(b,a);c&&("srclang"==a&&(a="language"),f[a]=c)}),b.nodeName){if(e=function(){var n,r;if(f.mode&&(d(a).unbind("play playing timeupdate updatetrackdisplay",e),d(b).unbind("checktrackmode",e),!g.readyState)){n=function(){g.readyState=3;d(b).triggerHandler("error")};
g.readyState=1;try{r=d.ajax({dataType:"text",url:d.prop(b,"src"),success:function(e){"text/vtt"!=r.getResponseHeader("content-type")&&c.warn("set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt");h.parseCaptions(e,f,function(c){c&&"length"in c?(f.cues=c,f.shimActiveCues=h.createCueList(),g.readyState=2,d(b).triggerHandler("load"),d(a).triggerHandler("updatetrackdisplay")):n()})},error:n})}catch(j){n(),c.warn(j)}}},g=c.data(b,"trackData",{track:f,readyState:0}),
d(a).bind("play playing timeupdate updatetrackdisplay",e),d(b).bind("checktrackmode",e),d.prop(b,"default"))f.mode=t[f.kind]?2:1,e()}else f.cues=h.createCueList(),f.shimActiveCues=h.createCueList(),f.mode=1;return f};h.parseCaptionChunk=function(){var a=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,b=/^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,c=/^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,g=/^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;return function(e,d){var h="",j=[],
i,l,k,m;if(j=b.exec(e))return j=j.slice(2).join(""),j=j.split(/\s+/g).filter(function(a){return a&&!!a.length}),null;if(j=c.exec(e))return h+=j[j.length-1],null;if(j=g.exec(e))return null;for(i=e.split(/\n/g);!i[0].replace(/\s+/ig,"").length&&0<i.length;)i.shift();for(j=i[0].match(/^\s*[a-z0-9]+\s*$/ig)?""+i.shift().replace(/\s*/ig,""):d;0<i.length;){if(m=a.exec(i[0]))k=m.slice(1),l=parseInt(3600*(k[0]||0),10)+parseInt(60*(k[1]||0),10)+parseInt(k[2]||0,10)+parseFloat("0."+(k[3]||0)),k=parseInt(3600*
(k[4]||0),10)+parseInt(60*(k[5]||0),10)+parseInt(k[6]||0,10)+parseFloat("0."+(k[7]||0));i=i.slice(0,0).concat(i.slice(1));break}if(!l&&!k)return null;i=i.join("\n");l=new TextTrackCue(j,l,k,i,"",!1);l.styleData=h;return l}}();h.parseCaptions=function(a,b,f){var d=h.createCueList(),e,n,m,j,i;if(a)m=/^WEBVTT(\s*FILE)?/ig,n=function(l,k){for(;l<k;l++){e=a[l];if(m.test(e))i=!0;else if(e.replace(/\s*/ig,"").length){if(!i){c.error("please use WebVTT format. This is the standard");f(null);break}if(e=h.parseCaptionChunk(e,
l))e.track=b,d.push(e)}if(j<(new Date).getTime()-9){l++;setTimeout(function(){j=(new Date).getTime();n(l,k)},90);break}}l>=k&&(i||c.error("please use WebVTT format. This is the standard"),f(d))},a=a.replace(/\r\n/g,"\n"),setTimeout(function(){a=a.replace(/\r/g,"\n");setTimeout(function(){j=(new Date).getTime();a=a.split(/\n\n+/g);n(0,a.length)},9)},9);else throw Error("Required parameter captionData not supplied.");};h.createTrackList=function(a){a=c.data(a,"mediaelementBase")||c.data(a,"mediaelementBase",
{});if(!a.textTracks)a.textTracks=[],c.defineProperties(a.textTracks,{onaddtrack:{value:null},onremovetrack:{value:null}});return a.textTracks};c.defineNodeNamesBooleanProperty(["track"],"default");c.reflectProperties(["track"],["srclang","label"]);c.defineNodeNameProperty("track","src",{reflect:!0,propType:"src"});c.defineNodeNameProperty("track","kind",{reflect:!0,propType:"enumarated",defaultValue:"subtitles",limitedTo:["subtitles","captions","descriptions","chapters","metadata"]});c.defineNodeNameProperty("track",
"readyState",{prop:{get:function(){return(c.data(this,"trackData")||{readyState:0}).readyState}}});c.defineNodeNamesProperties(["audio","video"],{textTracks:{prop:{get:function(){d("track",this).each(function(){q(this)});return h.createTrackList(this)}}},addTextTrack:{prop:{value:function(a,b,d){a=h.createTextTrack(this,{kind:a||"",label:b||"",srclang:d||""});b=c.data(this,"mediaelementBase")||c.data(this,"mediaelementBase",{});if(!b.scriptedTextTracks)b.scriptedTextTracks=[];b.scriptedTextTracks.push(a);
m.call(this);return a}}}});c.defineNodeNameProperty("track","track",{prop:{get:function(){return h.createTextTrack(d(this).closest("audio, video")[0],this)}}});d(s).bind("emptied",function(a){d(a.target).is("audio, video")&&setTimeout(function(){m.call(a.target)},9)});c.addReady(function(a,b){d("video, audio",a).add(b.filter("video, audio")).each(m);b.filter("track").parent("audio, video").each(m)})});
