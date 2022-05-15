
var tswUtilsComponentResourcesDirectory=null;function tswUtilsGetResourcesDirectory()
{if(tswUtilsComponentResourcesDirectory==null)
{var scripts=document.getElementsByTagName('script');for(var i=0;i<scripts.length;i++)
{var scriptTag=scripts[i];var scriptSrc=scriptTag.getAttribute('src');if(scriptSrc!=null)
{var fileNameIndex=scriptSrc.indexOf('TSWUtils.js');if(fileNameIndex!=-1)
{tswUtilsComponentResourcesDirectory=scriptSrc.substr(0,fileNameIndex);break;}}}}
return tswUtilsComponentResourcesDirectory;}
function tswUtilsSetDimensions(element,coords)
{element.style.left=coords[0]+'px';element.style.top=coords[1]+'px';element.style.width=coords[2]+'px';element.style.height=coords[3]+'px';}
function tswUtilsSetOpacity(element,alpha){element.style.opacity=alpha;element.style.filter='alpha(opacity='+alpha*100.0+')';}
function tswUtilsPreloadImage(imageObject,imageUrl,successCallback,errorCallback,context)
{if(successCallback!=null)
{imageObject.onload=function(){successCallback(imageObject,context)};}
if(errorCallback!=null)
{imageObject.onerror=function(){errorCallback(imageObject,context)};imageObject.onabort=function(){errorCallback(imageObject,context)};}
imageObject.src=imageUrl;return imageObject;}
function tswUtilsIsBody(element)
{return(/^(?:body|html)$/i).test(element.tagName);}
function tswUtilsBorderBox(element)
{return tswUtilsGetStyle(element,'-moz-box-sizing')=='border-box';}
function tswUtilsTopBorder(element)
{return parseInt(tswUtilsGetStyle(element,'border-top-width'));}
function tswUtilsLeftBorder(element)
{return parseInt(tswUtilsGetStyle(element,'border-left-width'));}
function tswUtilsGetScroll(element)
{if(tswUtilsIsBody(element))
{var win=window;doc=(!element.ownerDocument.compatMode||element.ownerDocument.compatMode=='CSS1Compat')?element.ownerDocument.getElementsByTagName('html')[0]:element.ownerDocument.body;return{x:win.pageXOffset||doc.scrollLeft,y:win.pageYOffset||doc.scrollTop};}
return{x:element.scrollLeft,y:element.scrollTop};}
function tswUtilsGetAbsolutePosition(element)
{if(element.getBoundingClientRect)
{var bound=element.getBoundingClientRect(),html=element.ownerDocument.documentElement,scroll=tswUtilsGetScroll(html),isFixed=(tswUtilsGetStyle(element,'position')=='fixed');return[parseInt(bound.left,10)+((isFixed)?0:scroll.x)-html.clientLeft,parseInt(bound.top,10)+((isFixed)?0:scroll.y)-html.clientTop];}
var pos=[0,0];var orig=element;var isGecko=(document.getBoxObjectFor==undefined||element.clientTop==undefined)?false:true;var isWebkit=(navigator.taintEnabled)?false:true;if(tswUtilsIsBody(element))return pos;while(element&&!tswUtilsIsBody(element))
{pos[0]+=element.offsetLeft;pos[1]+=element.offsetTop;if(isGecko)
{if(!tswUtilsBorderBox(element))
{pos[0]+=tswUtilsLeftBorder(element);pos[1]+=tswUtilsTopBorder(element);}
var parent=element.parentNode;if(parent&&tswUtilsGetStyle(parent,'overflow')!='visible')
{pos[0]+=tswUtilsLeftBorder(parent);pos[1]+=tswUtilsTopBorder(parent);}}
else if(element!=orig&&isWebkit)
{pos[0]+=tswUtilsLeftBorder(element);pos[1]+=tswUtilsTopBorder(element);}
element=element.offsetParent;}
if(isGecko&&!tswUtilsBorderBox(orig))
{pos[0]-=tswUtilsLeftBorder(orig);pos[1]-=tswUtilsTopBorder(orig);}
return pos;}
function tswUtilsGetVisibleRect()
{var width,height,x,y;if(document.all)
{width=(document.documentElement.clientWidth)?document.documentElement.clientWidth:document.body.clientWidth;height=(document.documentElement.clientHeight)?document.documentElement.clientHeight:document.body.clientHeight;y=(document.documentElement.scrollTop)?document.documentElement.scrollTop:document.body.scrollTop;x=(document.documentElement.scrollLeft)?document.documentElement.scrollLeft:document.body.scrollLeft;}
else
{width=window.innerWidth;height=window.innerHeight;y=window.pageYOffset;x=window.pageXOffset;}
return[x,y,width,height];}
function tswUtilsGetPixelsAsInteger(pixelValue)
{var str=String(pixelValue);var val=parseInt(str.replace('px',''));if(isNaN(val))
{return 0;}
return val;}
function tswUtilsGetStyle(el,cssprop)
{if(el.currentStyle)
return el.currentStyle[cssprop]
else if(document.defaultView&&document.defaultView.getComputedStyle)
return document.defaultView.getComputedStyle(el,"")[cssprop]
else
return el.style[cssprop]}
function tswUtilsAddEventHandler(obj,eventName,funct)
{if(obj.addEventListener)
{obj.addEventListener(eventName,funct,false);}
else if(obj.attachEvent)
{obj.attachEvent('on'+eventName,funct);}}
function tswUtilsCancelBubble(e)
{if(!e&&!(e=window.event))
return;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation();}
function tswUtilsGetInitializedEvent(e)
{var evt=window.event||e;if(!evt.target)
evt.target=evt.srcElement
return evt;}
var tswTabbedContentMap=new Object();function tswTabbedContentGetForId(id)
{var tc=tswTabbedContentMap[id];if(tc==null)
{tc=new TSWTabbedContent(id);tswTabbedContentMap[id]=tc;}
return tc;}
function TSWTabbedContent(id)
{this.id=id;this.selectedTab=0;this.animationDuration=0;this.reserveSpaceForTallestTab=false;var tabs=this.getTabElements();for(var i=0;i<tabs.length;i++)
{var tab=tabs[i];var outerDiv=document.createElement('div');outerDiv.className='tswTabOuterDiv';var innerDiv=document.createElement('div');innerDiv.className='tswTabInnerDiv';outerDiv.appendChild(innerDiv);while(tab.hasChildNodes())
{innerDiv.appendChild(tab.removeChild(tab.firstChild));}
tab.appendChild(outerDiv);this.generateOnClick(tab,this,i);if(tab.className=='tswTabSelected')
this.selectedTab=i;}
this.getTabbedContentElement().insertBefore(document.createElement('br'),this.getTabContentContainerElement());this.animationIntervalId=null;this.animationStartDate=null;this.previousSelectedTab=-1;this.previousTabContentRect;this.init(this);};TSWTabbedContent.prototype.init=function(tabbedContent)
{tswUtilsAddEventHandler(window,'resize',function(){if(tabbedContent.reserveSpaceForTallestTab)
tabbedContent.setReserveSpaceForTallestTab(true);});tswUtilsAddEventHandler(window,'load',function(){if(tabbedContent.reserveSpaceForTallestTab)
tabbedContent.setReserveSpaceForTallestTab(true);});}
TSWTabbedContent.prototype.setReserveSpaceForTallestTab=function(bool)
{if(!TSWBrowserDetect.browserMatches('Explorer',null,null)||this.reserveSpaceForTallestTab!=bool)
{this.reserveSpaceForTallestTab=bool;if(bool)
{var maxHeight=0;var tabContents=this.getTabContentElements();for(var i=0;i<tabContents.length;i++)
{var h=tabContents[i].offsetHeight;if(h>maxHeight)
maxHeight=h;}
this.getTabContentContainerElement().style.height=maxHeight+'px';var tabContents=this.getTabContentElements();tabContents[this.selectedTab].className='tswTabContentSelected';}
else
{this.getTabContentContainerElement().style.height=null;}}};TSWTabbedContent.prototype.getTabbedContentElement=function()
{return document.getElementById(this.id);};TSWTabbedContent.prototype.getTabListElement=function()
{var lists=TSWDomUtils.getChildrenWithTagName(this.getTabbedContentElement(),'ul');if(lists.length>0)
return lists[0];return null;};TSWTabbedContent.prototype.getTabElements=function()
{return TSWDomUtils.getChildrenWithTagName(this.getTabListElement(),'li');};TSWTabbedContent.prototype.getTabContentContainerElement=function()
{var divs=TSWDomUtils.getChildrenWithTagName(this.getTabbedContentElement(),'div');for(var i=0;i<divs.length;i++)
{if(divs[i].className=='tswTabContent')
return divs[i];}
return null;}
TSWTabbedContent.prototype.getTabContentElements=function()
{return TSWDomUtils.getChildrenWithTagName(this.getTabContentContainerElement(),'div');};TSWTabbedContent.prototype.generateOnClick=function(tabElement,tabbedContent,index)
{tabElement.onclick=function(){tabbedContent.selectTab(index);};};TSWTabbedContent.prototype.selectTab=function(index)
{if(this.selectedTab==index)
return;this.cleanupAnimation();var tabs=this.getTabElements();var tabContents=this.getTabContentElements();var previousTabContents=tabContents[this.selectedTab];var prevPos=tswUtilsGetAbsolutePosition(previousTabContents);if(TSWBrowserDetect.browserMatches('Explorer',null,6.0)||(TSWBrowserDetect.browserMatches('Explorer',null,null)&&document.compatMode=='BackCompat'))
{this.previousTabContentRect=[prevPos[0],prevPos[1],previousTabContents.offsetWidth,previousTabContents.offsetHeight];}
else
{this.previousTabContentRect=[prevPos[0],prevPos[1],previousTabContents.offsetWidth
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'borderLeftWidth'))
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'borderRightWidth'))
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'paddingLeft'))
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'paddingRight')),previousTabContents.offsetHeight
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'borderTopWidth'))
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'borderBottomWidth'))
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'paddingTop'))
-tswUtilsGetPixelsAsInteger(tswUtilsGetStyle(previousTabContents,'paddingBottom'))];}
tabs[this.selectedTab].className=null;tabContents[this.selectedTab].className='tswTabContentUnselected';this.previousSelectedTab=this.selectedTab;this.selectedTab=index;tabs[this.selectedTab].className='tswTabSelected';tabContents[this.selectedTab].className='tswTabContentSelected';this.beginAnimation();};TSWTabbedContent.prototype.cleanupAnimation=function()
{if(this.animationDuration<=0||this.previousSelectedTab<0)
return;var tabContents=this.getTabContentElements();var previousTabContents=tabContents[this.previousSelectedTab];previousTabContents.style.display='none';previousTabContents.style.position='';previousTabContents.style.left='';previousTabContents.style.top='';previousTabContents.style.width='';previousTabContents.style.height='';previousTabContents.style.zIndex=0;tswUtilsSetOpacity(previousTabContents,1.0);var currentTabContents=tabContents[this.selectedTab];tswUtilsSetOpacity(currentTabContents,1.0);clearInterval(this.animationIntervalId)
this.animationIntervalId=null;};TSWTabbedContent.prototype.beginAnimation=function()
{if(this.animationDuration<=0)
return;this.animationStartDate=new Date();var tabContents=this.getTabContentElements();var previousTabContents=tabContents[this.previousSelectedTab];previousTabContents.style.display='block';previousTabContents.style.visibility='visible';previousTabContents.style.position='absolute';previousTabContents.style.left=this.previousTabContentRect[0]+'px';previousTabContents.style.top=this.previousTabContentRect[1]+'px';previousTabContents.style.width=this.previousTabContentRect[2]+'px';previousTabContents.style.height=this.previousTabContentRect[3]+'px';previousTabContents.style.zIndex=1;tswUtilsSetOpacity(previousTabContents,1.0);var currentTabContents=tabContents[this.selectedTab];tswUtilsSetOpacity(currentTabContents,0.0);currentTabContents.style.display='';this.animationIntervalId=setInterval("_tswTabbedContentAnimate('"+this.id+"')",25);};function _tswTabbedContentAnimate(id)
{tswTabbedContentGetForId(id).continueAnimation();}
TSWTabbedContent.prototype.continueAnimation=function()
{var currentDate=new Date();var tabContents=this.getTabContentElements();var previousTabContents=tabContents[this.previousSelectedTab];var currentTabContents=tabContents[this.selectedTab];var delta=(currentDate.getTime()-this.animationStartDate.getTime())/this.animationDuration;if(delta>=1.0)
{this.cleanupAnimation();return;}
tswUtilsSetOpacity(previousTabContents,1.0-delta);tswUtilsSetOpacity(currentTabContents,delta);}
var TSWBrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS";},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)
return data[i].identity;}
else if(dataProp)
return data[i].identity;}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1));},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};TSWBrowserDetect.browserMatches=function(browser,minVersion,maxVersion)
{if(browser!=null&&browser!=this.browser)
return false;if(minVersion!=null&&this.version<minVersion)
return false;if(maxVersion!=null&&this.version>maxVersion)
return false;return true;};TSWBrowserDetect.browserPropertyName=function(propName,element)
{var prefixes=['Moz','Webkit','Khtml','O','Ms'];element=element||document.documentElement;var style=element.style,prefixed;if(typeof style[propName]=='string')return propName;propName=propName.charAt(0).toUpperCase()+propName.slice(1);for(var i=0,l=prefixes.length;i<l;i++)
{prefixed=prefixes[i]+propName;if(typeof style[prefixed]=='string')return prefixed;}
return null;}
TSWBrowserDetect.init();var TSWDomUtils=new Object;TSWDomUtils.getChildrenWithTagName=function(element,tagName)
{tagName=tagName.toUpperCase();var results=new Array();var children=element.childNodes;for(var i=0;i<children.length;i++)
{var child=children[i];if(child.tagName!=null&&child.tagName.toUpperCase()==tagName)
{results.push(child);}}
return results;};TSWDomUtils.getChildWithClassName=function(element,className)
{var children=element.childNodes;for(var i=0;i<children.length;i++)
{var child=children[i];if(child.tagName!=null&&child.className==className)
{return child;}}
return null;};