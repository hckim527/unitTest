/*amd /sample/group/group_E_onclick_1.xml 6515 a4324e43d2c3e198df9dee3527051a80ed2054fbd7f4b2085a5b5179b2f011d9 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:historyInfo',E:[{T:1,N:'w2:history',A:{}},{T:1,N:'w2:history',A:{}}]},{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',id:'dlt_keepDisabled',repeatNode:'map',saveRemovedData:'true',style:''},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{dataType:'number',id:'code',name:'code'}},{T:1,N:'w2:column',A:{dataType:'text',id:'label',name:'label'}}]},{T:1,N:'w2:data',A:{use:'true'},E:[{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'1'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'2'}]},{T:1,N:'label',E:[{T:4,cdata:'true'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'3'}]},{T:1,N:'label',E:[{T:4,cdata:'false'}]}]}]}]}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){let objReturn = wf_return.getObj("tbx_return");
scwin.onpageload = function () {
  // 초기 comp 생성
  scwin.comp_init();
};

// comp 생성
scwin.comp_init = async function () {
  // 조건값으로 옵션 설정
  let options = {};

  // comp 동적 생성
  scwin.grp_1 = await $p.dynamicCreate("grp_1", "group", {
    text: "그룹",
    style: "display: flex; flex-direction: column; background-color:#B0E0E6; width:300px; height:100px; margin-bottom:6px;"
  }, grp_comp);
  scwin.grp_1.bind("onclick", "scwin.grp_1_onclick");
  scwin.btn_1 = await $p.dynamicCreate("btn_1", "button", {
    label: "그룹하위버튼"
  }, grp_1);
  scwin.btn_1.bind("onclick", "scwin.btn_1_onclick");
  scwin.ibx_1 = await $p.dynamicCreate("ibx_1", "input", {
    initValue: "그룹하위입력창"
  }, grp_1);
  scwin.ibx_1.bind("onclick", "scwin.ibx_1_onclick");
};

// comp 초기화
scwin.btn_set_condition_onclick = function () {
  // 기존 component 삭제
  scwin.grp_1.remove();

  // 조건 설정
  scwin.set_condition_1();

  // comp_init
  scwin.comp_init();
};

// 조건1 값 저장
scwin.set_condition_1 = function (info) {
  cKeepDisabled = con_keepDisabled.getText();
};
scwin.grp_1_onclick = function (e) {
  objReturn = wf_return.getObj("tbx_return");
  objReturn.setValue(objReturn.getValue() + "=====grp_1_onclick 이벤트 발생=====<br/>");
  objReturn.setValue(objReturn.getValue() + "e:" + e + "<br/>");
  objReturn.setValue(objReturn.getValue() + "e.altKey:" + e.altKey + "<br/><br/>");
};
scwin.btn_1_onclick = function (e) {
  objReturn = wf_return.getObj("tbx_return");
  objReturn.setValue(objReturn.getValue() + "=====btn_1_onclick 이벤트 발생===== <br/>");
  objReturn.setValue(objReturn.getValue() + "e:" + e + "<br/>");
  objReturn.setValue(objReturn.getValue() + "e.altKey:" + e.altKey + "<br/><br/>");
};
scwin.ibx_1_onclick = function (e) {
  objReturn = wf_return.getObj("tbx_return");
  objReturn.setValue(objReturn.getValue() + "=====ibx_1_onclick 이벤트 발생===== <br/>");
  objReturn.setValue(objReturn.getValue() + "e:" + e + "<br/>");
  objReturn.setValue(objReturn.getValue() + "e.altKey:" + e.altKey + "<br/><br/>");
};

// 테스트 수행
scwin.btn_setDisabled_onclick = function (e) {
  grp_1.setDisabled(sbx_disabledValue.getText());
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'tc_body_main',id:'',style:'display: flex;'},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'tc_body_left'},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodyDescription.xml'}},{T:1,N:'w2:textbox',A:{escape:'false',id:'',label:'[group > E > onclick]<br/><br/>group 을 클릭하면 onclick 이벤트가 발생하는지 테스트한다.',style:''}},{T:1,N:'w2:wframe',A:{id:'',src:'/frame/page/test_bodyDescription.xml',style:''}},{T:1,N:'w2:textbox',A:{escape:'false',id:'',label:'(여기에는 API 가이드 문서에 기재된 대표적인 예제 몇 개만 작성)<br/>1. grp_1 영역(aqua)를 클릭한다.<br/>[확인] => #####grp_1_onclick 이벤트 발생#####<br/>e:[object PointerEvent]<br/>e.altKey:false<br/><br/>2. "그룹하위버튼" 을 클릭한다.<br/>[확인] => #####btn_1_onclick 이벤트 발생#####<br/>e:[object PointerEvent]<br/>e.altKey:false<br/>#####grp_1_onclick 이벤트 발생#####<br/>e:[object PointerEvent]<br/>e.altKey:false',style:''}}]},{T:1,N:'xf:group',A:{class:'tc_body_right',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodyCondition.xml'}},{T:1,N:'xf:group',A:{id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'}},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'},E:[{T:1,N:'w2:button',A:{id:'btn_set_condition',label:'조건 설정',style:'','ev:onclick':'scwin.btn_set_condition_onclick',class:'tc_btn_basic',disabled:'true'}}]}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'group2'},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodySample.xml'}},{T:1,N:'xf:group',A:{style:'',id:'grp_comp'}},{T:1,N:'xf:group',A:{style:'margin-top: 10px;',id:'grp_etc'},E:[{T:1,N:'xf:select1',A:{allOption:'',appearance:'minimal',chooseOption:'',id:'sbx_disabledValue',ref:'',style:'width: 100px;'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'false'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'0'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'true'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'1'}]}]}]}]},{T:1,N:'w2:button',A:{id:'btn_setDisabled',label:'setDisabled()',style:'',class:'tc_btn_basic','ev:onclick':'scwin.btn_setDisabled_onclick'}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'',class:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'wf_return',src:'/frame/page/test_bodyReturn.xml'}}]}]}]}]}]}]})