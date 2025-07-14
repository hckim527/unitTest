/*amd /sample/group/group_P_keepDisabled_1.xml 5723 298fd14cc4d4171a18f4d918166f2a48824cef1d33761dcef3582d73e851f6dd */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:historyInfo',E:[{T:1,N:'w2:history',A:{}},{T:1,N:'w2:history',A:{}}]},{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',id:'dlt_keepDisabled',repeatNode:'map',saveRemovedData:'true',style:''},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{dataType:'number',id:'code',name:'code'}},{T:1,N:'w2:column',A:{dataType:'text',id:'label',name:'label'}}]},{T:1,N:'w2:data',A:{use:'true'},E:[{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'1'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'2'}]},{T:1,N:'label',E:[{T:4,cdata:'true'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'3'}]},{T:1,N:'label',E:[{T:4,cdata:'false'}]}]}]}]}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){let cKeepDisabled = "";
let objReturn = wf_return.getObj("tbx_return");
scwin.onpageload = function () {
  // 초기 comp 생성
  scwin.comp_init();
};

// comp 생성
scwin.comp_init = async function () {
  // 조건값으로 옵션 설정
  let options = {};
  if (cKeepDisabled !== "") options.keepDisabled = cKeepDisabled;

  // comp 동적 생성
  scwin.grp_1 = await $p.dynamicCreate("grp_1", "group", options, grp_comp);
  scwin.ibx_1 = await $p.dynamicCreate("ibx_1", "input", {
    initValue: "인스웨이브"
  }, grp_1);
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

// 테스트 수행
scwin.btn_setDisabled_onclick = function (e) {
  grp_1.setDisabled(sbx_disabledValue.getText());
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'tc_body_main',id:'',style:'display: flex;'},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'tc_body_left'},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodyDescription.xml'}},{T:1,N:'w2:textbox',A:{escape:'false',id:'',label:'[group > P > keepDisabled]<br/><br/>group 하위 컴포넌트의 disabled 상태가 유지되는지 테스트한다.',style:''}},{T:1,N:'w2:wframe',A:{id:'',src:'/frame/page/test_bodyDescription.xml',style:''}},{T:1,N:'w2:textbox',A:{escape:'false',id:'',label:'(여기에는 API 가이드 문서에 기재된 대표적인 예제 몇 개만 작성)<br/>1. keepDisabled=true, setDisabled=true 로 선택한다.<br/>2. "조건 설정" 버튼을 클릭한다.<br/>=> group 하위의 input 이 비활성화 된다.<br/><br/>3. keepDisabled=false, setDisabled=true 로 선택한다.<br/>4. "조건 설정" 버튼을 클릭한다.<br/>=> group 하위의 input 이 활성화 된다.',style:''}}]},{T:1,N:'xf:group',A:{class:'tc_body_right',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodyCondition.xml'}},{T:1,N:'xf:group',A:{id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'keepDisabled',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'},E:[{T:1,N:'xf:select1',A:{ref:'',appearance:'minimal',chooseOption:'',style:'width: 200px;',id:'con_keepDisabled',allOption:'','ev:onchange':'scwin.con_keepDisabled_onchange'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:itemset',A:{nodeset:'data:dlt_keepDisabled'},E:[{T:1,N:'xf:label',A:{ref:'label'}},{T:1,N:'xf:value',A:{ref:'code'}}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'}},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'},E:[{T:1,N:'w2:button',A:{id:'btn_set_condition',label:'조건 설정',style:'','ev:onclick':'scwin.btn_set_condition_onclick',class:'tc_btn_basic'}}]}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodySample.xml'}},{T:1,N:'xf:group',A:{style:'',id:'grp_comp'}},{T:1,N:'xf:group',A:{style:'margin-top: 10px;',id:'grp_etc'},E:[{T:1,N:'xf:select1',A:{allOption:'',appearance:'minimal',chooseOption:'',id:'sbx_disabledValue',ref:'',style:'width: 150px;'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'false'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'0'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'true'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'1'}]}]}]}]},{T:1,N:'w2:button',A:{id:'btn_setDisabled',label:'setDisabled()',style:'',class:'tc_btn_basic','ev:onclick':'scwin.btn_setDisabled_onclick'}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'',class:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'wf_return',src:'/frame/page/test_bodyReturn.xml'}}]}]}]}]}]}]})