function docViewerScrollChanged(a,b){b>0&&a>studySize&&(studySize=a)}function docLoaded(a){type=1,TimerStartLoad()}function InitFrist(){if("1"==$("#hidNeedMobile").val())return ShowBindPhone(),!1}function TimerStartLoad(){if($("#hfTipBytitle").length>0&&""!=$("#hfTipBytitle").val())CheatWarming($("#hfTipBytitle").val());else if(SyncSchedule(),standardStudyHours<=0)"PostStudy"==masterType?submitPostStudy():completedStudy(),completeDivShow();else if(standardStudyHours>0&&standardStudyHours<120){if("VideoKnowledge"==knowledgeType&&videoLength<15&&videoLength>0)return void completeDivShow();var a=15,b="";timersmall=setInterval(function(){a>=0?(a>0?b=a+secondtime:InitLoadStudy(),$("#spanCountdown").html(b),a-=1):clearInterval(timersmall)},1e3)}else InitLoadStudy()}function AddUserKnowledge(){if("1"==isSingle&&""!=curTitle)CheatWarming(curTitle);else{var a='{"orgID":"'+orgID+'","userID":"'+userID+'","knowledgeID":"'+key+'","packageID":"'+packageID+'","masterID":"'+masterID+'","masterType":"'+masterType+'","isSingle":"'+isSingle+'"}';$.ajax({type:"POST",contentType:"text/json",url:"/Services/StyService.svc/AutoCreateUserKnowledge",data:a,dataType:"json",cache:!1,success:function(a){""!=a?CheatWarming(a):(SyncSchedule(),existsUserKnowledge=1,InitLoadStudy(),studySize=1,SpecialControl(),$("#divProcessArea").show(),$("#ScheduleText").show(),$("#divStartArea").show(),$("#divNotStartArea").hide(),$("#divWarkup").show(),$("#spantalscore").text(standardStudyScore),0==initiativeCreditMode&&$("#spanStudyScroeShow").show())}})}}function CheatWarming(a){$("#divProcessArea").hide(),$("#ScheduleText").hide(),$("#divNotStartArea").hide(),$("#divCompletedArea").hide(),$("#divStartArea").hide(),isHere=1,"-2"==a||"-2."==a?AppendEditPlanHtml():"-1"==a||"-1."==a?AppendFilePlanHtml():(a=escape2Html(a),a.length>8&&(a=a.substring(0,8)+"…"),a="["+a+"]",showSingleTrack(a))}function SpecialControl(){}function GetCurSchedule(){SyncSchedule()}function InitLoadStudy(){if(standardStudyHours<validtimeSpan)"ScormCourse"!=fileType||1.2!=parseFloat(curversion)&&1.3!=parseFloat(curversion)&&2004!=parseFloat(curversion)||stopScormSubmit?completedStudy():(stopScormSubmit=!0,submitStudy());else{countDown(standardStudyHours-actualStudyHours,function(a){$("#spanLeavTimes").html(a)}),standardStudyHours-actualStudyHours>=validtimeSpan&&(UserActionTimer.fn.Start(key,validtimeSpan),timecheck=setInterval(CheckIsMove,1e3*validtimeSpan)),SpecialControl()}}function countDown(a,b){if(clearInterval(timer),!autoStop){if($("#hidSpeed").val()){var c=$("#hidSpeed").val();c=parseFloat(c),a=parseInt(a/c)}timer=setInterval(function(){if(a>0){var c="",d=$("#ScheduleText").text();daysold=Math.floor(a/86400),daysold>0&&(c+=daysold+daytime);var e=a-86400*daysold;hrsold=Math.floor(e/3600),hrsold>0&&(c+=hrsold+hourtime);var f=e-3600*hrsold;if(minsold=Math.floor(f/60),minsold>0&&(c+=minsold+minutetime),seconds=f-60*minsold,seconds>0&&(c+=seconds+secondtime),reZero>=validtimeSpan&&reZero%validtimeSpan==0&&1==isPostback&&d.indexOf("100%")<0&&submitStudy(),"1"==antionhook&&reZero>=phaseTrackIntervalTime&&reZero%phaseTrackIntervalTime==0)try{var g=document.getElementById("iframeScorm");null!=g&&(g.style.display="none"),autoStop=!0,AppendWarningHtml()}catch(i){}reZero++,actualStudyHours++,isPostback=1,b(c),--a}else{var d=$("#ScheduleText").text(),h=1;type>0&&(h=0,studySize>=pageSize&&(h=1)),1==h?0==initiativeCreditMode&&0==getCreditMode&&standardStudyHours>0&&($("#spanFinishScroeShow").show(),$("#spanFinishScore").show(),$("#spanActCmpScore").text(standardStudyScore),$("#spanTalCmpScore").text(standardStudyScore)):$("#spanLeavTimes").html("0"+secondtime),d.indexOf("100%")<0&&submitStudy(),clearInterval(timer),clearInterval(timecheck)}},1e3)}}function MinuteChange(a){if(a<100)if(a>0){$("#divScheduleWidth").css("width",1.13*a+"px"),$("#ScheduleText").html(a+"%"),$("#hidStudySchedule").val(a),$("div.select").find(".percent").html(a+"%");var b=(a*standardStudyScore/100).toFixed(2);0==getCreditMode&&$("#spanobscore").text(b),a>=studyRate&&($("#spanCmp").html('<input type="button" class="btn btn-warning" value="'+ifinishstudy+'" onclick="completedStudy();" />'),$("#divHead2").show()),$("#hidUserActualStudyScore").val(b),$("#hidUserActualStudyHours").val(actualStudyHours)}else $("#divScheduleWidth").css("width","0px");else $("#divScheduleWidth").css("width","113px"),"100%"!==$("#ScheduleText").html()&&$("#ScheduleText").html("100%"),$("#hidStudySchedule").val("100"),$("div.select").find(".percent").html("100%"),$("#divStartArea").hide(),$("#divCompletedArea").show(),actualStudyHours=standardStudyHours,studySize=pageSize,0==initiativeCreditMode&&standardStudyScore>0&&($("#spanFinishScroeShow").show(),$("#spanFinishScore").show(),$("#spanActCmpScore").text(standardStudyScore),$("#spanTalCmpScore").text(standardStudyScore))}function CheckIsMove(){UserActionTimer.fn.Start(key,validtimeSpan)}function fullScreenAction(a){UserActionTimer.fn.SetValidTimeSpan(a)}function ResetTimer(){$("#divNotStartArea").is(":visible")||window.setTimeout(function(){isHere=1;try{thisU.MouseActionTime=new Date,thisU.LastMouseActionTime=thisU.MouseActionTime}catch(a){}isHere=0,InitLoadStudy()},1e3)}function StopTimer(){clearInterval(timer)}function submitStudy(){if("PostStudy"==masterType)return void submitPostStudy();var a=0;$("#hidViewSchedule").length>0&&(a=$("#hidViewSchedule").val());var b=masterType;"Plan"!=masterType&&"PlanStudy"!=masterType&&"Position"!=masterType&&"PositionStudy"!=masterType&&(b="",masterID=""),$("#hidSpeed").val()&&(speed=$("#hidSpeed").val(),speed=parseFloat(speed)),submitStudyMethod('{"knowledgeId":"'+key+'","masterId":"'+masterID+'","masterType":"'+b+'","packageId":"'+packageID+'","pageSize":'+pageSize+',"studySize":'+pageSize+',"studyTime":'+120*speed+',"type":'+type+',"offLine":false,"end":false,"care":true,"deviceId":"","studyChapterIds":"'+stuChpIDs+'","viewSchedule":'+parseFloat(a)+"}",'{"knowledgeId":"'+key+'","masterId":"'+masterID+'","masterType":"'+b+'","packageId":"'+packageID+'","pageSize":'+pageSize+',"studySize":'+pageSize+',"studyTime":'+120*speed+',"type":'+type+',"offLine":false,"end":false,"care":true,"deviceId":"","studyChapterIds":"'+stuChpIDs+'","viewSchedule":'+parseFloat(a)+',"multiple":'+parseFloat(speed)+',"realHour":120}',"study","submit")}function submitPostStudy(){var a=0;$("#hidViewSchedule").length>0&&(a=$("#hidViewSchedule").val());var b=masterType;"PostStudy"!=masterType&&"Position"!=masterType&&"Plan"!=masterType&&(b="");var c=getQueryString("taskId");c||(c=masterID),$("#hidSpeed").val()&&(speed=$("#hidSpeed").val(),speed=parseFloat(speed)),submitStudyMethod('{"knowledgeId":"'+key+'","masterId":"'+c+'","masterType":"'+b+'","sourceId":"'+packageID+'","studyTime":'+120*speed+',"deviceId":"","offLine":false,"end":false,"viewSchedule":'+parseFloat(a)+"}",'{"knowledgeId":"'+key+'","masterId":"'+c+'","masterType":"'+b+'","sourceId":"'+packageID+'","studyTime":'+120*speed+',"deviceId":"","offLine":false,"end":false,"viewSchedule":'+parseFloat(a)+',"multiple":'+parseFloat(speed)+',"realHour":120}',"poststudy","submit")}function completeDivShow(){$("#divCheat").hide(),$("#divProcessArea").show(),$("#ScheduleText").show(),$("#divNotStartArea").hide(),$("#divCompletedArea").show(),$("#divStartArea").hide(),0==initiativeCreditMode&&0==getCreditMode&&standardStudyScore>0&&($("#spanFinishScore").show(),$("#spanActCmpScore").text(standardStudyScore),$("#spanTalCmpScore").text(standardStudyScore)),$("#icon"+key)&&($("#icon"+key).prop("class","pic2"),iscurfinish=1),actualStudyHours=standardStudyHours,studySize=pageSize,MinuteChange(100),isHere=1,clearInterval(timer),clearInterval(timecheck)}function completedStudy(){if("PostStudy"==masterType)return void completedPostStudy();var a=0;$("#hidViewSchedule").length>0&&(a=$("#hidViewSchedule").val());var b=masterType;"Plan"!=masterType&&"Position"!=masterType&&(b=""),$("#hidSpeed").val()&&(speed=$("#hidSpeed").val(),speed=parseFloat(speed));var c='{"knowledgeId":"'+key+'","masterId":"'+masterID+'","masterType":"'+b+'","packageId":"'+packageID+'","pageSize":'+pageSize+',"studySize":'+pageSize+',"studyTime":'+120*speed+',"type":'+type+',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"'+stuChpIDs+'","viewSchedule":'+parseFloat(a)+"}",d='{"knowledgeId":"'+key+'","masterId":"'+masterID+'","masterType":"'+b+'","packageId":"'+packageID+'","pageSize":'+pageSize+',"studySize":'+pageSize+',"studyTime":'+120*speed+',"type":'+type+',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"'+stuChpIDs+'","viewSchedule":'+parseFloat(a)+',"multiple":'+parseFloat(speed)+',"realHour":120}';submitStudyMethod(c,d,"study","completed"),console.log("completedStudy encryptRequest = "+c+" || request ="+d)}function completedLaveTimeStudy(){if("PostStudy"==masterType)return void completedPostStudy();var a=0;$("#hidViewSchedule").length>0&&(a=$("#hidViewSchedule").val());var b=masterType;"Plan"!=masterType&&"Position"!=masterType&&(b=""),$("#hidSpeed").val()&&(speed=$("#hidSpeed").val(),speed=parseFloat(speed)),submitStudyMethod('{"knowledgeId":"'+key+'","masterId":"'+masterID+'","masterType":"'+b+'","packageId":"'+packageID+'","pageSize":'+pageSize+',"studySize":'+pageSize+',"studyTime":'+120*speed+',"type":'+type+',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"'+stuChpIDs+'","viewSchedule":'+parseFloat(a)+"}",'{"knowledgeId":"'+key+'","masterId":"'+masterID+'","masterType":"'+b+'","packageId":"'+packageID+'","pageSize":'+pageSize+',"studySize":'+pageSize+',"studyTime":'+120*speed+',"type":'+type+',"offLine":false,"end":true,"care":true,"deviceId":"","studyChapterIds":"'+stuChpIDs+'","viewSchedule":'+parseFloat(a)+',"multiple":'+parseFloat(speed)+',"realHour":120}',"study","completed")}function completedPostStudy(){var a=0;$("#hidViewSchedule").length>0&&(a=$("#hidViewSchedule").val());var b=masterType;"Plan"!=masterType&&"Position"!=masterType&&"PostStudy"!=masterType&&(b="");var c=getQueryString("taskId");c||(c=masterID),$("#hidSpeed").val()&&(speed=$("#hidSpeed").val(),speed=parseFloat(speed)),submitStudyMethod('{"knowledgeId":"'+key+'","masterId":"'+c+'","masterType":"'+b+'","sourceId":"'+packageID+'","studyTime":'+120*speed+',"deviceId":"","offLine":false,"end":true,"viewSchedule":'+parseFloat(a)+"}",'{"knowledgeId":"'+key+'","masterId":"'+c+'","masterType":"'+b+'","sourceId":"'+packageID+'","studyTime":'+120*speed+',"deviceId":"","offLine":false,"end":true,"viewSchedule":'+parseFloat(a)+',"multiple":'+parseFloat(speed)+',"realHour":120}',"poststudy","completed")}function escape2Html(a){var b={lt:"<",gt:">",nbsp:" ",amp:"&",quot:'"'};return a.replace(/&(lt|gt|nbsp|amp|quot);/gi,function(a,c){return b[c]})}function AppendWarningHtml(){if($("#dvWarningView").length<=0){var a="<div class='playgoon' id='dvWarningView'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>"+$("#hfTip").val()+"</div><input type='button' class='btnok' value='"+iheretitle+"' onclick='RemoveWarningHtml();' /></div>";"DocumentKnowledge"==knowledgeType?$("#docplayercontainer").append(a):($("#playervideocontainer").append(a),$("#playeraudiocontainer").append(a),$("#playercontainer").append(a)),"VideoKnowledge"==knowledgeType&&void 0!==myPlayer&&"playing"==myPlayer.getState()?myPlayer.pause():clearInterval(timer)}}function RemoveWarningHtml(){$("#dvWarningView").remove();var a=document.getElementById("iframeScorm");null!=a&&(a.style.display=""),"VideoKnowledge"==knowledgeType?(autoStop=!1,void 0!==myPlayer&&"paused"==myPlayer.getState()?myPlayer.play():(autoStop=!1,ResetTimer())):(autoStop=!1,ResetTimer())}function showSingleTrack(a){var b=document.getElementById("iframeScorm");if(null!=b&&(b.style.display="none"),$("#dvSingleTrack").length<=0){var c="<div id='dvSingleTrack' class='playgoon'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>"+trackanticheat1+a+trackanticheat2+"</div><input type='button' style='width: 150px; margin-left: 175px;' onclick='StartCurStudy();' value='"+iwantstudy+"' class='btnok' /></div>";"DocumentKnowledge"==knowledgeType?$("#docplayercontainer").append(c):($("#playervideocontainer").append(c),$("#playeraudiocontainer").append(c),$("#playercontainer").append(c)),"VideoKnowledge"==knowledgeType&&void 0!==myPlayer&&"playing"==myPlayer.getState()?myPlayer.pause():(clearInterval(timer),clearInterval(timecheck))}}function AppendFilePlanHtml(){if($("#dvWarningView").length<=0){var a="<div class='playgoon' id='divEditPlan'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>"+planfiled+"</div><input type='button' class='btnok' value='"+iknow+"' onclick='RemoveEditPlanHtml();' /></div>";"DocumentKnowledge"==knowledgeType?$("#playercontainerdiv").append(a):$("#playercontainer").append(a),"VideoKnowledge"==knowledgeType&&void 0!==myPlayer&&"playing"==myPlayer.getState()?myPlayer.pause():clearInterval(timer)}}function AppendEditPlanHtml(){if($("#dvWarningView").length<=0){var a="<div class='playgoon' id='divEditPlan'><div class='el-playgoon-shadow'></div><div class='playgoonbg'></div><div class='playgooncontent'>"+planupdated+"</div><input type='button' class='btnok' value='"+iknow+"' onclick='RemoveEditPlanHtml();' /></div>";"DocumentKnowledge"==knowledgeType?$("#playercontainerdiv").append(a):$("#playercontainer").append(a),"VideoKnowledge"==knowledgeType&&void 0!==myPlayer&&"playing"==myPlayer.getState()?myPlayer.pause():clearInterval(timer)}}function RemoveEditPlanHtml(){$("#divEditPlan").remove();var a=document.getElementById("iframeScorm");null!=a&&(a.style.display="")}function ShowBindPhone(){return $("#hidNeedMobile").val("1"),AppendBindPhone(),!1}function AppendBindPhone(){if($("#dvWarningBindPhone").length<=0){var a="<div id='dvWarningBindPhone' class=''><div class='chaos-bg-color text-center'><div class='clearfix ph30'><div class='no-phone-img'></div><div class='font-size-18 text-center'><span data-localize='sys_msg_needphone'></span></div><div class='font-szie-14 text-grey text-center mv10'><span data-localize='sys_msg_bindingmobile'></span></div><div class='text-center'><input type='button' class='btn btn-primary mt15 binding-phone' data-localize='mine_lbl_bindimmediately' onclick='openBindPhone();' /></div></div><div class='chaos-shade-close' onclick='closeWebPage();'></div></div><div class='ui-widget-overlay' style='width: 100%; height: 100%; z-index: 100;'></div></div>";"DocumentKnowledge"==knowledgeType?$("#playercontainerdiv").append(a):$("#playercontainer").append(a),"VideoKnowledge"==knowledgeType&&void 0!==myPlayer&&"playing"==myPlayer.getState()?myPlayer.pause():clearInterval(timer)}}function openBindPhone(){ShowIFrameDialog(jQuery.i18n.map.mine_lbl_bindphone,550,420,"/udp/Usm/Personal/Daliogs/BindMobilePhone.aspx")}function closeWebPage(){var a=navigator.userAgent;-1!=a.indexOf("Firefox")||-1!=a.indexOf("Presto")?window.location.replace("about:blank"):(window.opener=null,window.open("","_self"),window.close())}function refresh(){window.location.reload()}function SyncPostStudySchedule(){var arr='{"knowledgeId":"'+key+'","sourceId":"'+packageID+'","taskId":"'+masterID+'","orgId":"'+orgID+'","userId":"'+userID+'"}';AjaxCallApiMethod({type:"POST",url:"studyapi/uk/singlepostsync",data:arr,cache:!1,async:!1,success:function(result){""!=result?(result=eval("("+result+")"),actualStudyHours=60*result.actualStudyHours,MinuteChange(result.studySchedule)):MinuteChange(0)},error:function(a){console.log(a)}})}function SyncSchedule(){var masterTypeStr=masterType;if("PostStudy"==masterType)return void SyncPostStudySchedule();"Plan"!=masterType&&"Position"!=masterType&&(masterTypeStr="");var arr='{"knowledgeId":"'+key+'","packageId":"'+packageID+'","masterId":"'+masterID+'","masterType":"'+masterTypeStr+'"}';AjaxCallApiMethodSubmitStudy({type:"POST",url:"study/updateprogress",data:arr,cache:!1,async:!1,success:function(result){result=eval("("+result+")"),actualStudyHours=60*result.actualstudyhours,MinuteChange(result.studyschedule)},error:function(a){}})}function submitStudyMethod(encryptRquest,request,type,postType){var studyBody=request;encryptRquest=JSON.stringify(encryptRquest);var arr='{"body":'+encryptRquest+"}",studyUrl="study"==type?"study/submit?encryption=":"studyapi/study/postsubmit?encryption=",requsetBody="";jQuery.ajax({type:"POST",contentType:"text/json",url:"/kng/services/KngComService.svc/GetEncryptRequest",data:arr,dataType:"json",cache:!1,async:!1,success:function(result){result=eval("("+result+")"),"OK"==result.Status&&(requsetBody=result.Data,AjaxCallApiMethodSubmitStudy({type:"POST",url:studyUrl+requsetBody,data:studyBody,success:function(a){"submit"==postType&&"study"==type?submitStudySuccess(a):"submit"==postType&&"poststudy"==type?submitPostStudySuccess(a):"completed"==postType&&"study"==type?studyCompletedSuccess(a):"completed"==postType&&"poststudy"==type&&poststudyCompletedSuccess(a)},error:function(a){SyncSchedule(),console.log(a),submitStudyError(a)}}))},error:function(a){console.log("EncryptBody error"+arr)}})}function submitStudySuccess(a){if(""==a)GetCurSchedule(),InitLoadStudy();else{if(a.indexOf("﹡")>-1){var b=a.split("﹡");b.length>0&&(a=b[1],a.length>8&&(a=a.substring(0,8)+"..."),a="["+a+"]")}CheatWarming(a)}}function submitStudyError(xhr){var msg=eval("("+xhr.responseText+")"),result=msg.error.message;if(result.indexOf("﹡")>-1){var arrResult=result.split("﹡");arrResult.length>0&&(result=arrResult[1],result.length>8&&(result=result.substring(0,8)+"..."),result="["+result+"]")}CheatWarming(result)}function submitPostStudySuccess(a){if(a){if(a.indexOf("﹡")>-1){var b=a.split("﹡");b.length>0&&(a=b[1],a.length>8&&(a=a.substring(0,8)+"..."),a="["+a+"]")}CheatWarming(a)}else GetCurSchedule(),InitLoadStudy()}function studyCompletedSuccess(a){if(""==a)GetCurSchedule(),completeDivShow();else{if(a.indexOf("﹡")>-1){var b=a.split("﹡");b.length>0&&(a=b[1],a.length>8&&(a=a.substring(0,8)+"..."),a="["+a+"]")}CheatWarming(a)}}function poststudyCompletedSuccess(a){if(a){if(a.indexOf("﹡")>-1){var b=a.split("﹡");b.length>0&&(a=b[1],a.length>8&&(a=a.substring(0,8)+"..."),a="["+a+"]")}CheatWarming(a)}else completeDivShow()}function AjaxCallApiMethodSubmitStudy(a){var b={Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",Source:501};jQuery.extend(b,{token:token});var c=a.url,d=lecaiAPiUrl+c;isLteIE9()&&(d="/forie9/qidaapi/v1/"+c),a.url=d;var e={contentType:"application/json",dataType:"text",headers:b};jQuery.extend(e,a),jQuery.ajax(e)}var timerspan=void 0,timerminute=void 0,timecheck=void 0,timersmall=void 0,speed=1,isPostback=0,type=0,stuChpIDs="",iscurfinish=void 0,reZero=0,myPlayer,curversion,autoStop=!1,stopScormSubmit=!1,timer,daysold,hrsold,minsold,seconds,thisU,UserActionTimer=function(){return new UserActionTimer.fn.init};UserActionTimer.fn=UserActionTimer.prototype={Key:void 0,LastMouseActionTime:new Date,shadowTimer:void 0,TotalActionTime:0,ValidTimeSpan:void 0,MouseActionTime:void 0,TempTimeSpan:void 0,PostInterval:void 0,LastPostTotalActionTime:new Date,init:function(){return this.LastMouseActionTime=new Date,this.TotalActionTime=0,this},SetValidTimeSpan:function(a){if(thisU=this,a)thisU.TempTimeSpan=thisU.ValidTimeSpan,thisU.ValidTimeSpan=1e4;else if(thisU.TempTimeSpan){var b=0;thisU.MouseActionTime=new Date,b=thisU.MouseActionTime.getTime()-thisU.LastMouseActionTime.getTime(),b<=1e3*thisU.ValidTimeSpan&&(thisU.TotalActionTime=thisU.TotalActionTime+b),thisU.LastMouseActionTime=thisU.MouseActionTime,thisU.ValidTimeSpan=thisU.TempTimeSpan,thisU.TempTimeSpan=0}},Start:function(a,b){if(thisU=this,!a||""==a)return!1;this.Key=a,this.ValidTimeSpan=b&&""!=b?b:200,$("body").bind("click",{actionType:"click",thisUserActionTimer:this},this.mouseActionHandler),$("body").bind("mousewheel",{actionType:"mousewheel",thisUserActionTimer:this},this.mouseActionHandler),$("body").bind("mousemove",{actionType:"mousemove",thisUserActionTimer:this},this.mouseActionHandler),$("body").bind("keydown",{actionType:"keydown",thisUserActionTimer:this},this.mouseActionHandler);thisU.MouseActionTime=new Date,thisU.MouseActionTime.getTime(),thisU.LastMouseActionTime.getTime()},mouseActionHandler:function(a){var b=$("#bodyShadow");b&&(b.hide(),this.shadowTimer&&clearTimeout(this.shadowTimer),this.shadowTimer=setTimeout(function(){b.show()},15e3)),thisU=a.data.thisUserActionTimer;var c=0;thisU.MouseActionTime=new Date,c=thisU.MouseActionTime.getTime()-thisU.LastMouseActionTime.getTime(),c<=1e3*thisU.ValidTimeSpan&&(thisU.TotalActionTime=thisU.TotalActionTime+c),thisU.LastMouseActionTime=thisU.MouseActionTime,clearInterval(timecheck),timecheck=setInterval(CheckIsMove,1e3*validtimeSpan)},version:"1.0.0"};