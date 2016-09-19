/**
* hexo-tag-dplayer (w/ wilddog)
* Transplant recipients : dixyes
* Integrated source protocol 
* ---------------------------------
* source item
* hexo-tag-aplayer
* https://github.com/grzhan/hexo-tag-aplayer
* Copyright (c) 2016, grzhan
* Licensed under the MIT license.
* ---------------------------------
* Syntax:
*  <div id="dplayer10" class="dplayer" style="margin-bottom: 20px;"></div><p>no url specified, no dplayer _(:3」∠)_</p>
*/
'use strict'
var fs = require('hexo-fs'),
  util = require('hexo-util'),
  path = require('path'),
  counter = 0,
  srcDir = path.dirname(require.resolve('dplayer')),
  scriptDir = 'assets/js/', //change this and below to change js and css dir
  styleDir = 'assets/css/',
  dplayerScript = 'DPlayer.min.js',
  dplayerStyle = 'DPlayer.min.css',
  registers = [
    [dplayerStyle, styleDir + dplayerStyle, path.join(srcDir, dplayerStyle)],
    [dplayerScript, scriptDir + dplayerScript, path.join(srcDir, dplayerScript)],
  ];

for (var i = 0; i < registers.length; ++i) {
  (function (i) {
    var register = registers[i], regName = register[0],
      pubPath = register[1], srcPath = register[2];
    if(fs.existsSync(srcPath))
        hexo.extend.generator.register(regName, function(locals) {
          return {
            path: pubPath,
            data: function() {
              return fs.createReadStream(srcPath);
            }
          };
        });
  })(i);
}

hexo.extend.filter.register('after_post_render', function(data) {
  data.content =
    (fs.existsSync(path.join(srcDir, dplayerStyle)) ? util.htmlTag('link', {rel: 'stylesheet', type: 'text/css', href: '/' + styleDir + dplayerStyle }) : '') +
    util.htmlTag('script', {src: '/' + scriptDir + dplayerScript}, " ") +
    data.content;
  return data;
});

// <div id="dplayer11" class="dplayer" style="margin-bottom: 20px;"></div><p>no url specified, no dplayer _(:3」∠)_</p>
hexo.extend.tag.register('dplayerww', function(args) {
  let  url, domain, loop, autoplay, theme, pic, wpath, token, screenshot, lang, maximum, hotkey;
  var  id = 'dplayer' + (counter++),
       raw =  '<div id="'+ id + '" class="dplayer" style="margin-bottom: 20px;"></div>';
  for (var i = 0; i < args.length; ++i) {
    var arg=args[i];
    if(arg.split('=').length<2) continue;="" switch(arg.split('=")[0]){
      case " autoplay':="" if(arg.split('=")[1]==" true'||arg.split('=")[1]==" yes'||arg.split('=")[1]==" 1')="" autoplay="true;" else="" break;="" case="" 'theme':="" theme="arg.slice(arg.indexOf("=")+1);" 'loop':="" loop="true;" 'lang':="" lang="arg.slice(arg.indexOf("=")+1);" 'screenshot':="" screenshot="true;" 'hotkey':="" hotkey="true;" 'url':="" url="arg.slice(arg.indexOf("=")+1);" 'pic':="" pic="arg.slice(arg.indexOf("=")+1);" 'path':="" wpath="arg.slice(arg.indexOf("=")+1);" 'domain':="" domain="arg.slice(arg.indexOf("=")+1);" 'token':="" token="arg.slice(arg.indexOf("=")+1);" 'maximum':="" maximum="arg.slice(arg.indexOf("=")+1);" }="" if(url="" !="undefined)" raw="" +="<script>var " id="" '="new" dplayer('+="" json.stringify({="" element:="" "document.getelementbyid('')",="" autoplay:="" autoplay,="" theme:="" theme,="" loop:="" loop,="" lang:="" ((lang="=" 'zh'="" |="" 'en')="" ?="" :="" undefined),="" screenshot:="" screenshot,="" hotkey:="" hotkey,="" video:="" {="" url:="" url,="" pic:="" },="" danmaku:="" domain:="" domain,="" path:="" wpath,="" token:="" token,="" maximum:="" }).replace("\"document.getelementbyid('')\"",'document.getelementbyid("'+="" +'")')="" ');<="" script="">';
  else
    raw += '<p>no url specified, no dplayer _(:3」∠)_</p>';
  return raw;
});

hexo.extend.tag.register('dplayer', function(args) {
  let  url, api, loop, autoplay, theme, pic, did, token, screenshot, lang, maximum, hotkey;
  var  id = 'dplayer' + (counter++),
       raw =  '<div id="'+ id + '" class="dplayer" style="margin-bottom: 20px;"></div>';
  for (var i = 0; i < args.length; ++i) {
    var arg=args[i];
    if(arg.split('=').length<2) continue;="" switch(arg.split('=")[0]){
      case " autoplay':="" if(arg.split('=")[1]==" true'||arg.split('=")[1]==" yes'||arg.split('=")[1]==" 1')="" autoplay="true;" else="" break;="" case="" 'theme':="" theme="arg.slice(arg.indexOf("=")+1);" 'loop':="" loop="true;" 'lang':="" lang="arg.slice(arg.indexOf("=")+1);" 'screenshot':="" screenshot="true;" 'hotkey':="" hotkey="true;" 'url':="" url="arg.slice(arg.indexOf("=")+1);" 'pic':="" pic="arg.slice(arg.indexOf("=")+1);" 'api':="" api="arg.slice(arg.indexOf("=")+1);" 'id':="" did="arg.slice(arg.indexOf("=")+1);" 'token':="" token="arg.slice(arg.indexOf("=")+1);" 'maximum':="" maximum="arg.slice(arg.indexOf("=")+1);" }="" if(url="" !="undefined)" raw="" +="<script>var " id="" '="new" dplayer('+="" json.stringify({="" element:="" "document.getelementbyid('')",="" autoplay:="" autoplay,="" theme:="" theme,="" loop:="" loop,="" lang:="" ((lang="=" 'zh'="" |="" 'en')="" ?="" :="" undefined),="" screenshot:="" screenshot,="" hotkey:="" hotkey,="" video:="" {="" url:="" url,="" pic:="" },="" danmaku:="" (api="=" undefined="" :{="" api:="" api,="" id:="" did,="" token:="" token,="" maximum:="" })="" }).replace("\"document.getelementbyid('')\"",'document.getelementbyid("'+="" +'")')="" ');<="" script="">';
  else
    raw += '<p>no url specified, no dplayer _(:3」∠)_</p>';
  return raw;
});
</2)></2)>