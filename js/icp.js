'use strict';
var env = null;
var envDomainName = null;
var frame = null;
window.onbeforeunload = function() {
  if(frame == null) {}
  else frame.contentWindow.postMessage({"evt":"closeChild"},'*');

};
function getDomain() {
  var srcName = document.getElementById('context').src;
  if(srcName.indexOf("sbox") > -1) {
    env = "sandbox";
    envDomainName = "https://sboxcontext.citruspay.com";
    prefetcher();
  }
  else if(srcName.indexOf("stg") > -1) {
    env = "staging";
    envDomainName = "https://stgcontext.citruspay.com";
    prefetcher();
  }
  else {
    env = "prod";
    envDomainName = "https://context.citruspay.com";
    prefetcher();
  }
};

var nbBanks = null;
var isCached = false;
var frameContent = null;
var frameMain = null;
var cardCachedData = {};
var userDetailsCachedData = {};
var isMob = !(/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i.test(navigator.userAgent)) && /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4));
var iOS = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var macOs = (navigator.appVersion.indexOf("Mac")!=-1 && navigator.userAgent.search("Safari") >= 0) ? true : false;
function prefetcher() {
	var url = envDomainName+"/kiwi/prefetcher";
 	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
  			  var loadIframe = document.createElement("iframe");
  				loadIframe.src = url;
  				loadIframe.id = 'loadIframe';
  				loadIframe.setAttribute("style", "display:none;position:fixed;width:0%;height:0%;left:0;bottom:0;overflow:hidden;");
  				loadIframe.setAttribute('allowtransparency', 'true');
  				loadIframe.setAttribute('frameborder', '0');
  				document.getElementsByTagName("body")[0].appendChild(loadIframe);
          document.getElementById("loadIframe").onload = function() {
            var lodedIremove = document.getElementById("loadIframe");
            try {lodedIremove.parentNode.removeChild(lodedIremove);}
            catch(e) {lodedIremove.removeChild(lodedIremove);}
          }
        }
    };
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
};
getDomain();
var citrusICP = (function() {
    var configObj;
    var requiredKeysArr;
    var allowedKeysArr;
    var iframeRef;
    var imageLoader;
    var imageLoaderImg;
    var dataObject = null;
   //IE8 indexOf fix
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) { return i; }
            }
            return -1;
        }
    }

    var validationMap = {
        orderAmount: {
            required: true,
            validator: function(val){
                return regexValidator(val, 'is not valid amount', /^\d+(\.\d+)?$/);
            }
        },
        currency: {
            required: true,
            validator: checkStr
        },
        returnUrl : {
            required: true,
            validator: function(val){
                return regexValidator(val, 'is not a valid url', /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
            }
        },
        merchantTxnId: {
            required: true,
            validator: checkStr
        },
        vanityUrl: {
            required: true,
            validator: checkStr
        },
        secSignature: {
            required: true,
            validator: checkStr
        }
    };


    function validate(confObj){
        if(typeof  confObj !== 'object') return 'argument should be an object';
        var errMsg = [];
        var newConfigObj = {};
        var allowedKeys = allowedKeysArr || findKeys(validationMap).allowedKeys;
        var requiredKeys = requiredKeysArr || findKeys(validationMap).requiredKeys;
        for(var it=0, len = requiredKeys.length; it < len; it++){
            var el = requiredKeys[it];
            if(confObj[el] === undefined || confObj[el] === null){
                errMsg.push('"'+ el + '" is a required field');
            }
        }

        for(var key in confObj){
            if(confObj.hasOwnProperty(key)){
                var val = confObj[key];
                if(isString(val) || isNumeric(val)){
                    if(allowedKeys.indexOf(key) < 0){
                        newConfigObj[key] = val;
                    }else{
                        var validationObj = validationMap[key];
                        var validationResult = validationObj.validator(val);
                        if(validationResult.valid === false){
                            errMsg.push('"' +  key + '" ' + validationResult.msg);
                        }else {
                            newConfigObj[key]  =  validationResult.newVal ? validationResult.newVal : val;
                        }
                    }
                }else{
                    errMsg.push( '"' + key + '"  should be String or Number');
                }

            }
        }

        return errMsg.length ? errMsg.join('. '): newConfigObj;

    };

    function findKeys(obj){
        var retObj ={
            allowedKeys: [],
            requiredKeys: []
        };

        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                retObj.allowedKeys.push(key);
                if(obj[key].required === true) retObj.requiredKeys.push(key);
            }
        }

        requiredKeysArr = retObj.requiredKeys;
        allowedKeysArr = retObj.allowedKeys;
        return retObj;
    };

    function checkStr(val){
        var bool = isString(val) && val !== '';
        var retObj = {
            valid : bool
        };
        if(!bool) retObj.msg = " is not a valid string";
        return retObj
    };

    function isString(val){
       return typeof val === 'string' || val instanceof String
    };

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function regexValidator(val, msg, regEx){
        var valid = regEx.test(val);
        var retObj = {
            valid: valid
        };
        !valid ? retObj.msg = msg : '';
        return retObj;
    };

    function appendLoader() {
      var body = document.body, html = document.documentElement;
      var BodyHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
      imageLoader = document.createElement('div');
      imageLoader.id = "icpLoader";
      if(!macOs)
        imageLoader.setAttribute("style", "height:"+BodyHeight+"px;display:block;position:absolute;width:100%;top:0;z-index:10000;overflow:hidden;background:rgba(0, 0, 0, 0.75);");
      else {
        imageLoader.setAttribute("style", "height:"+BodyHeight+"px;display:block;position:absolute;width:100%;top:0;z-index:10000;overflow:hidden;background:rgba(0, 0, 0, 0.6);");
      }
      imageLoaderImg = document.createElement('div');
      imageLoaderImg.setAttribute("style", "height:"+screen.height+"px;display:block;position:fixed;width:100%;left:0;z-index:10000;overflow:hidden;background:url("+envDomainName+"/static/kiwi/images/oval.svg) center 45% no-repeat;");
      imageLoader.appendChild(imageLoaderImg);
      document.body.appendChild(imageLoader);
    }

    function checkForChange(o1,o2) {
      if(o1 == null) return false;
      else {
        if(JSON.stringify(o1) === JSON.stringify(o2)) return true;
        else {
          cardCachedData = {};
          userDetailsCachedData = {};
          isCached = false;
          return false;
        }
      }
    }

    function launchIcp(dataObj, confObj) {

      if (navigator.userAgent.indexOf('Opera Mini') == -1) {
        appendLoader();
        dataObj.paymentSource = "icp";
        localStorage.setItem('env',env);
        var check = checkForChange(dataObject,dataObj);
        confObj && (configObj = confObj);
        var url = envDomainName+"/kiwi/kiwi-popover";
        var ICPConf = validate(dataObj);
        if(typeof ICPConf === 'string'){
            document.body.removeChild(imageLoader);
            isCached = false;
            throw new Error(ICPConf);
        }
        if(isCached && check) {
          document.body.appendChild(frameMain);
          var ifrm = document.getElementsByName("icpFrame");
          var doc = ifrm[0].contentDocument;
          if(iOS && isMob){window.scrollTo(0,0);}
          doc.open();
          doc.write(frameContent);
          doc.close();
        }
        else {
	      localStorage.removeItem('env');
              localStorage.removeItem('nbBanks');
              localStorage.removeItem('cardCachedData');
              localStorage.removeItem('userDetailsCachedData');
            var ICPConf = dataObj;
            var formTarget;
            dataObject = dataObj;
            var citrusIframe = document.createElement("iframe");
            iframeRef = citrusIframe;
            citrusIframe.name = 'icpFrame';
            citrusIframe.id = 'icpFrame';
            if(screen.width < 767){
              if(!iOS){
                citrusIframe.setAttribute("style", "display:block;position:fixed;width:100%;height:100%;height:100vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;");
              }else{
                citrusIframe.setAttribute("style", "display:block;position:absolute;width:100%;height:100%;height:100vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;");
              }
            }else{
              citrusIframe.setAttribute("style", "display:block;position:fixed;width:100%;height:100%;height:100vh;left:0;top:0;z-index:10000;overflow:hidden;background: rgba(0, 0, 0, 0.0) none repeat scroll 0 0;");
            }
            citrusIframe.setAttribute('allowtransparency', 'true');
            citrusIframe.setAttribute('frameborder', '0');
            document.getElementsByTagName("body")[0].appendChild(citrusIframe);
            if(iOS){window.scrollTo(0,0);}
            formTarget = 'icpFrame';

            var f = document.createElement("form");
            f.setAttribute('method',"POST");
            f.setAttribute('action', url);
            f.setAttribute('target',formTarget);

            for(var key in ICPConf){
              if(ICPConf.hasOwnProperty(key)){
                  var i = document.createElement("input");
                  i.setAttribute('type',"hidden");
                  i.setAttribute('name', key);
                  var t = ICPConf[key].toString();
                  i.setAttribute('value',t.replace(/ /g,""));
                  f.appendChild(i);
              }
            };
            document.body.appendChild(f);
            f.submit();
        }
      }
      else {
        window.alert("Sorry ! This browser is not supported. Please choose another.");
      }
    };


    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent, function(e) {
        var key = e.message ? "message" : "data";
        var data = e[key];
        var evt = data.evt;
        delete data.evt;
        var eventHandler =  configObj && (configObj.eventHandler);
        if (evt === 'closeIcp') {
            try{document.body.removeChild(imageLoader);}
            catch(e){}
            try {iframeRef.parentNode.removeChild(iframeRef);}
            catch(e) {iframeRef.removeChild(iframeRef);}

            if(Object.keys(data).length === 0) {
              //Do not send event furhter to event listener
            }
            else {
              localStorage.setItem('env',env);
              localStorage.setItem('nbBanks',JSON.stringify(nbBanks));
              localStorage.setItem('cardCachedData',JSON.stringify(cardCachedData));
              localStorage.setItem('userDetailsCachedData',JSON.stringify(userDetailsCachedData));
              eventHandler && eventHandler({
                  message: data,
                  event: 'icpClosed'
              });
            }
        } else if (evt === 'icpLaunched') {
            frame = document.getElementById('icpFrame');
            var tempObject = {
              env: env,
              nbBanks: nbBanks,
              cardCachedData: cardCachedData,
              userDetailsCachedData: userDetailsCachedData
            };
            frame.contentWindow.postMessage(tempObject, '*');
            if(isCached == false) {
              frameContent = data.data;
              frameMain = iframeRef;
              isCached = true;
            }
            eventHandler && eventHandler({
                message: data,
                event: 'icpLaunched'
            });
          } else if (evt === 'icpCached') {
            var getIncomingData = data.data;
            env = getIncomingData.env;
            nbBanks = getIncomingData.nbBanks;
            cardCachedData = getIncomingData.cardCachedData;
            userDetailsCachedData = getIncomingData.userDetailsCachedData;
            if(isCached == false) {
              frameMain = iframeRef;
              isCached = true;
            }
            localStorage.setItem('env',env);
            localStorage.setItem('nbBanks',JSON.stringify(nbBanks));
            localStorage.setItem('cardCachedData',JSON.stringify(cardCachedData));
            localStorage.setItem('userDetailsCachedData',JSON.stringify(userDetailsCachedData));
          }
    }, false);

    return {
        launchIcp: launchIcp,
        version: "1.5-19.2.16"
    };
})();