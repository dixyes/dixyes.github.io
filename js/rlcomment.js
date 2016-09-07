'use strict';
(function(){
  window.RLComments = {
    apiname: 'wdh-comment',
    pageId: null,
    dataRef: null,
    uid: null,
    container: document.body,
    comments: {},
    list: null,
    sthHidden: false,
    hintStrings:{
      nickname: "nickname",
      email: "email ( optional )",
      submit: "submit",
      inputHint: "type sth here like &lt;script&gt;",
      nicknametooolong: "nickname too long",
      nullnickname: "nickname needed",
      commenttooolong: "comment too long (max 1k ",
      nullcomment: "how do you think about word \"comment\"",
      offensivecomment: "some offensive comments were hidden, click to ",
      setoppai: "Give me OPPAI",
      oppaisetted: "OPPAI setted",
      privacytitle: "Privcy Tips",
      privacycontent: "This action will allow us recognize and track you by localStorage(sth like cookie), so you should decline.",
      privacydecline: "DECLINE",
      privacyaccept: "ACCEPT"
    },
    
    showHidden: function(){
        for(var i=0;i<$(".rl-hidden").length;i++)
          $(".rl-hidden")[i].className="collection-item";
        //console.log("fuck");
        $('.rl-show')[0].style="display:none";
        RLComments.sthHidden=false;
    },
    
    init: function (id, container) {
      var self = RLComments;
      this.pageId = id;
      if (container) {
        this.container = container;
      }
      var api='https://'+self.apiname+'.wilddogio.com/'+id;
      self.dataRef = new Wilddog(api);
//       self.dataRef.authAnonymously(function (e, d) {
//           if (!e && d.token) {
//               self.bind();
//           }
//       });
      self.bind();
    },
    
    bind: function () {
      var self = RLComments;
      //this.dataRef.orderByChild('time').once('value', function (ss) {
      //  console.log('on value ...', ss.val());
      //  self.comments = ss.val();
      //);
      self.setHtml();
      self.dataRef.on('child_added', function (ss2) {
        //console.log('on child_added', ss2.val());
        var cmt = ss2.val();
        var li = document.createElement('li');
        if(!cmt.hidden)
          li.className = 'collection-item';
        else {
          self.sthHidden=true;
          li.className = 'collection-item rl-hidden';
        }
        li.innerHTML = '<a class="rl-usr">' + cmt.nickname.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</a><span class="rl-time">' + (new Date(cmt.time)).toLocaleString('zh-CN',{formatMatcher:"basic",hour12:false}) + '</span>'+ '<a class="rl-con' + (cmt.uid?(false?"-ol":"-un"):"") + '">' +  cmt.content.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\r\n|\r|\n/g,'</br>') + '</a>';         
        //li.className = 'collection-item';
        li.style = 'padding: 10px 0';
        //li.innerHTML = '<a class="rl-usr">' + cmt.nickname.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</a><span class="rl-time">' + (new Date(cmt.time)).toLocaleString('zh-CN',{formatMatcher:"basic",hour12:false}) + '</span>'+ '<a class="rl-con">' +  cmt.content.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</a>';
        self.list.appendChild(li);
        if(self.sthHidden)
          $('.rl-show')[0].style="";
        //setTimeout(function () {
        // li.classList.add('shown');
        //}, 160);
      });
    },
    
    setHtml: function () {
      var self = RLComments;
      
      var style=document.createElement("style");
      style.innerHTML="\
        .rl-com{\
            margin: 1em 1.2em;\
        }\
        .rl-usr{\
            padding: 0 1em;\
            font-size: 1.1em;\
            color: #039be5;\
        }\
        .rl-con{\
            padding: 0.5em 01em;\
            border-left: 2px solid red;\
            color: #000000;\
            word-wrap: break-word;\
            display: block;\
        }\
        .rl-con-un{\
            padding: 0.5em 01em;\
            border-left: 2px solid #ffff8e;\
            color: #000000;\
            word-wrap: break-word;\
            display: block;\
        }\
        .rl-con-ol{\
            padding: 0.5em 01em;\
            border-left: 2px solid #a1ff8e;\
            color: #000000;\
            word-wrap: break-word;\
            display: block;\
        }\
        .rl-time{\
            font-size: 0.8em;\
            color: #666666;\
            float: right;\
            padding: 0.5em 0.5em;\
        }\
        .rl-hidden{\
            display none;\
        }\
        .rl-shadowDiv{\
            width: 100%;\
            height: 100%;\
            display: block;\
            position: fixed;\
            top: 0px;\
            left: 0px;\
            background: rgba(128, 128, 128, 0.7);\
            z-index: 65534;\
        }\
        #rlCmtsSubmit{\
            margin 1em 1.2em;\
        }\
        #rlCmtsPriTip{\
            margin-top 20px;\
        }";
      document.body.appendChild(style);
      
      self.list = document.createElement('div');
      self.list.className = 'collection rl-com';
      var cmttag = document.createElement("li");
      var sthHidden=false;
      for (var k in this.comments) {
        if (!this.comments.hasOwnProperty(k)) {
          continue;
        }
        var cmt = this.comments[k];
        
        cmttag.className="collection-item";
        cmttag.style="padding: 10px 0;"
        if(cmt.hidden){
          cmttag.className += ' rl-hidden';
          sthHidden=true;
        }
        cmttag.innerHTML += '<a class="rl-usr">' + 
        cmt.nickname.replace(/</g,'&lt;').replace(/>/g,'&gt;') +
        '</a>\
        <span class="rl-time">' + 
        (new Date(cmt.time)).toLocaleString('zh-CN',{formatMatcher:"basic",hour12:false}) + 
        '</span>'+ 
        '<a class="rl-con' + (cmt.uid?(false?"-ol":"-un"):"") + '">' +  //todo:online detect
        cmt.content.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\r\n|\r|\n/g,'</br>') + 
        '</a>';
      }
      if(self.sthHidden)
          $('.rl-show')[0].style="";
      self.hiddenHint = document.createElement('p');
      self.hiddenHint.className = "rl-show";
      self.hiddenHint.style = "display:none";
      self.hiddenHint.innerHTML = self.hintStrings.offensivecomment+'<a href="javascript:RLComments.showHidden();" id="rlShow">show</a>';
      self.container.appendChild(self.hiddenHint);
      self.list.appendChild(cmttag);
      this.container.appendChild(self.list);

      var box = document.createElement('div');
      box.className = 'row';

      box.innerHTML = '<form class="col s12">'+
      '<div class="row">'+
        '<div class="input-field col s4">'+
          '<input id="rlCmtsInputNickname" class="validate" type="text" ></input>'+
          '<label for="rlCmtsInputNickname">'+self.hintStrings.nickname+'</label>'+
        '</div>'+
        '<div class="input-field col s8">'+
          '<input id="rlCmtsInputEmail" class="validate" type="text" ></input>'+
          '<label for="rlCmtsInputEmail">'+self.hintStrings.email+'</label>'+
        '</div>'+
      '</div>'+
      '<div class="row">'+
        '<div class="input-field col s12">'+
          '<textarea id="rlCmtsInputContent" class="materialize-textarea" length="1000"></textarea>'+
          '<label for="rlCmtsInputContent">'+self.hintStrings.inputHint+'</label>'+
        '</div>'+
      '</div>'+
      '<a class="waves-effect waves-light btn" id="rlCmtsSubmit">'+
        self.hintStrings.submit+
      '</button>'+
      '<a class="waves-effect waves-light btn" id="rlCmtsSetCookie">'+
        (localStorage.rluid?self.hintStrings.oppaisetted:self.hintStrings.setoppai)+//todo: add cookdet remove cookie
      '</a>'+
      '<p id="rlErrHint" style="display: none"></p>'+
      '</form>';
    
      $(document).ready(function() {
        $('input#input_text, textarea#textarea1').characterCounter();
      });

      this.container.appendChild(box);

      var nicknameInput = document.getElementById('rlCmtsInputNickname'),
          emailInput = document.getElementById('rlCmtsInputEmail'),
          contentInput = document.getElementById('rlCmtsInputContent'),
          submitBtn = document.getElementById('rlCmtsSubmit'),
          cookieBtn = document.getElementById('rlCmtsSetCookie'),
          hintArea = document.getElementById('rlErrHint');

      if (localStorage.nickname) {
        nicknameInput.value = localStorage.nickname;
      }
      if (localStorage.email) {
        emailInput.value = localStorage.email;
      }

      submitBtn.addEventListener('click', function () {
        var nickName = nicknameInput.value.trim();
        var eMail = emailInput.value.trim();
        var content = contentInput.value;
        if (nickName.length > 20) {
          nicknameInput.className=nicknameInput.className+'invalid';
          hintArea.innerHTML=self.hintStrings.nicknametooolong;
          hintArea.style='display:inline;color:red';
          return;
        }
        if (nickName == '') {
          nicknameInput.className=nicknameInput.className+' invalid';
          hintArea.innerHTML=self.hintStrings.nullnickname;
          hintArea.style='display:inline;color:red';
          return;
        }
        if (content.length > 1000) {
          hintArea.innerHTML=self.hintStrings.commenttooolong;
          hintArea.style='display:inline;color:red';
          return;
        }
        if (content.trim() == '') {
          contentInput.className=contentInput.className+' invalid';
          hintArea.innerHTML=self.hintStrings.nullcomment;
          hintArea.style='display:inline;color:red';
          return;
        }
        var cmtData={
          nickname: nickName.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
          email: eMail.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
          content: content.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
          time: Date.now()
        }
        if(localStorage.rluid)
          cmtData.uid=localStorage.rluid;
        self.dataRef.push(cmtData);
        localStorage.nickname = nickName;
        localStorage.email = eMail;
        contentInput.value = '';
        hintArea.innerHTML = '';
      });
      
      if(!localStorage.rluid){
        cookieBtn.addEventListener('click', self.onPriBtnClick)
      };
    },
    
    onPriBtnClick: function () {
        var self = RLComments;
        var privacyTip = document.createElement('div');
        privacyTip.id = 'rlCmtsShaDiv';
        privacyTip.className = 'rl-shadowDiv row s12 m6 offset-m3';
        privacyTip.innerHTML=
        '<div class="col s12 m6 offset-m3">'+
          '<div class="card" id="rlCmtsPriTip" >'+
            '<div class="card-content">'+
              '<span class="card-title">'+self.hintStrings.privacytitle+'</span>'+
              '<p>'+self.hintStrings.privacycontent+'</p>'+
            '</div>'+
            '<div class="card-action">'+
              '<a onclick="a=document.getElementById(\'rlCmtsShaDiv\');a.parentNode.removeChild(a);" href="#233" id="233">'+self.hintStrings.privacydecline+'</a>'+
              '<a onclick="window.RLComments.setCookie();a=document.getElementById(\'rlCmtsShaDiv\');a.parentNode.removeChild(a);" href="#450" id="450">'+self.hintStrings.privacyaccept+'</a>'+
            '</div>'+
          '</div>'+
        '</div>';
        document.body.insertBefore(privacyTip,document.body.firstChild);
    },
    
    setCookie: function (){
      var self = RLComments;
      var cookieBtn = document.getElementById("rlCmtsSetCookie");
      cookieBtn.removeEventListener('click', self.onPriBtnClick);
      localStorage.rluid="test2333"//todo:random gen
      cookieBtn.innerHTML = self.hintStrings.oppaisetted;
    },
    };
})();
