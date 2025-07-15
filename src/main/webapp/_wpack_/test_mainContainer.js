/*amd /test_mainContainer.xml 4306 c31f16801e90c90bee9f4146b0ebed105858d7042898db4867b3208dd8e4d5cc */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_sampleList',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'depth',name:'depth',dataType:'number'}},{T:1,N:'w2:column',A:{id:'label',name:'label',dataType:'text'}},{T:1,N:'w2:column',A:{id:'component',name:'componrnt',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sm_getSampleList',action:'/data/test_sample_list.json',method:'post',mediatype:'application/json',ref:'',target:'data:json,dlt_sampleList',encoding:'UTF-8',instance:'',replace:'',errorHandler:'',customHandler:'',mode:'asynchronous',processMsg:'','ev:submit':'','ev:submitdone':'scwin.sm_getSampleList_submitdone','ev:submiterror':'scwin.sm_getSampleList_submiterror',abortTrigger:''}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.gVar = {
  "sel_tree_label": "",
  "sel_tree_depth": -1,
  "sel_tree_comp": ""
};
let obj_main = $p.main();
let obj_left = obj_main.wfTree.getObj("scwin");

// 테스트 샘플 목록 불러오기
scwin.onpageload = function () {
  $p.executeSubmission("sm_getSampleList");
};
scwin.sm_getSampleList_submitdone = function (e) {
  console.log("샘플 데이터 조회 성공:", "PASS PASS PASS PASS");
  return;
};
scwin.sm_getSampleList_submiterror = function (e) {
  console.log("샘플 데이터 조회 에러:", "FAIL FAIL FAIL FAIL ");
  return;
};

// 탭 모두 닫기
scwin.btn_tab_allclose_onclick = async function () {
  tac_main.deleteAllTabs();
  obj_left.setSelectTree(null);
};

// 탭 생성
scwin.createTab = async function () {
  tab_lb = scwin.gVar["sel_tree_label"];
  tab_dt = scwin.gVar["sel_tree_depth"];
  tab_cp = scwin.gVar["sel_tree_comp"];

  // xml 파일인 경우만 Tab 생성
  if (tab_dt == 2) {
    await tac_main.addTab("tacMain_" + tab_lb, {
      "label": tab_lb,
      "openAction": "select"
    }, {
      "src": "/sample/" + tab_cp + "/" + tab_lb,
      "wframe": true
    });

    // 생성된 탭 선택 처리
    await tac_main.setSelectedTabIndex("tacMain_" + tab_lb);
  }
};

// 왼쪽 메뉴 show, hide 처리
scwin.ico_toggleMenu_onclick = function (e) {
  mLeft.toggleClass("col_left");
};

// 탭 변경 시 트리 선택 처리
scwin.tac_main_onchange = function (tabId, index, userTabId) {
  obj_left.setSelectTree(tac_main.getSelectedTabID());
};

// 탭이 모두 닫힌 경우 트리 처리
scwin.tac_main_ontabclose = function (tabId, index, userTabId) {
  if (tac_main.getSelectedTabID() == null) obj_left.setSelectTree(null);
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'',id:'gMain',class:'tc_main'},E:[{T:1,N:'xf:group',A:{adaptiveThreshold:'',style:'',id:'mLeft',class:'tc_left'},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{id:'',label:'테스트 샘플 목록',style:'',class:'tc_tbx_label_1'}}]},{T:1,N:'w2:wframe',A:{src:'/frame/page/test_leftContainer.xml',style:'',id:'wfTree'}}]},{T:1,N:'xf:group',A:{style:'',id:'mBody',class:'tc_body'},E:[{T:1,N:'w2:tabControl',A:{useTabKeyOnly:'true',useMoveNextTabFocus:'false',tabScroll:'true',closable:'true',useConfirmMessage:'false',confirmTrueAction:'exist',changeActiveTab:'true',confirmFalseAction:'new',alwaysDraw:'false',style:'',id:'tac_main',class:'tc_tbc_page','ev:ontabclose':'scwin.tac_main_ontabclose','ev:onchange':'scwin.tac_main_onchange'}},{T:1,N:'w2:anchor',A:{'ev:onclick':'scwin.btn_tab_allclose_onclick',outerDiv:'false',style:'',id:'btn_tab_allclose',title:'탭 전체 닫기',class:'tbc_close'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'탭 전체 닫기'}]}]},{T:1,N:'xf:image',A:{src:'/cm/images/contents/btn_toggle_menu.svg',style:'',id:'ico_toggleMenu','ev:onclick':'scwin.ico_toggleMenu_onclick',class:'toggle_menu'}}]}]}]}]}]})