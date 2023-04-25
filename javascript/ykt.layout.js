onUiLoaded(function () {
  $footer = gradioApp().getElementById("footer");
  $footer.style.display = "none";

  $yktHeader = document.createElement("div");
  $yktHeader.innerHTML = '<div class="ykt-all">ykt header</div>';
  $yktfooter = document.createElement("div");
  $yktfooter.innerHTML = `<div class="m-yktfoot" id="j-yktfoot">
      <div class="m-yktfoot_wrapper f-cb g-flow ">
          <div class="m-yktfoot_lf f-fl">
              <p class="m-yktfoot_txt f-fs1">
                  网易云课堂 是网易公司（163.com）旗下专注职业技能提升的在线学习平台。
              </p>
              <div class="m-yktfoot_about f-cb">
                  <a href="//study.163.com/about/aboutus.htm#/about?aboutType=1" target="_blank" data-index="关于我们">关于我们</a>
                  <a href="//study.163.com/about/aboutus.htm#/about?aboutType=2" target="_blank" data-index="联系我们">联系我们</a>
                  <a href="//study.163.com/about/aboutus.htm#/about?aboutType=4" target="_blank" data-index="帮助中心">帮助中心</a>
                  <a href="//www.icourse163.org/" target="_blank" data-index="中国大学MOOC">中国大学MOOC</a>
                  <a href="//geek.163.com/?utm_source=study.163.com&utm_medium=web_bottombanner&utm_campaign=business&utm_content=qxq20180720" target="_blank" data-index="网易卡搭编程">网易卡搭编程</a>
                  <a href="//codecombat.163.com/" target="_blank" data-index="极客战记">极客战记</a>
                  <a href="//ai.youdao.com/gw.s" target="_blank" data-index="有道智云">有道智云</a>
              </div>
              <div class="m-yktfoot_copy">&copy;<span>1997-${new Date().getFullYear()}</span> 网易公司 版权所有<span style="margin-left:20px">粤B2-20090191-18</span>
              <span style="margin-left:20px"><a class="m-yktfoot_copy_link" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank;">工业和信息化部备案管理系统网站</a></span>
              </div>
          </div>
          <div class="m-yktfoot_rt f-fr">
              <div class="f-cb m-yktfoot_mobile">
                  <a target="_blank" class="m-yktfoot_mlogo1"
                     href="https://itunes.apple.com/cn/app/wang-yi-yun-ke-tang-for-iphone/id880452926?mt=8"></a>
                  <a target="_blank" class="m-yktfoot_mlogo2"
                     href="//study.163.com/pub/study-android-official.apk"></a>
              </div>
              <div class="m-yktfoot_share f-cb">
                  <span class="m-yktfoot_share_weibo">
                      <a href="//weibo.com/study163" target="_blank;">
                          <img src="//edu-image.nosdn.127.net/16f92d45ee7445e99ddc17cb542deaad.png?imageView&quality=100" />
                      </a>
                  </span>
                  <span class="m-yktfoot_share_weixin">
                      <img src="//edu-image.nosdn.127.net/9cb303b948d3464d956443004ef900f6.png?imageView&quality=100" />
                  </span>
                  <div id="j-footer-focus-code" style="display:inline-block"></div>
                  <p class="m-yktfoot_tit">关注我们：</p>
              </div>
          </div>
      </div>
  </div>`;

  document.body.insertBefore($yktHeader, document.body.firstChild);
  document.body.appendChild($yktfooter);
});
