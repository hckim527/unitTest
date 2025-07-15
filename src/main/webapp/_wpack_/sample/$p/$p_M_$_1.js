/*amd /sample/$p/$p_M_$_1.xml 5114 0e957d3234111e93550f3178ae124b61bd8219c6ae6da6cc4a07509c824d699c */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:historyInfo',E:[{T:1,N:'w2:history',A:{}},{T:1,N:'w2:history',A:{}}]},{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_selector',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'code',name:'code',dataType:'number'}},{T:1,N:'w2:column',A:{id:'label',name:'label',dataType:'text'}}]},{T:1,N:'w2:data',A:{use:'true'},E:[{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'1'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'2'}]},{T:1,N:'label',E:[{T:4,cdata:'id'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'3'}]},{T:1,N:'label',E:[{T:4,cdata:'class'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'4'}]},{T:1,N:'label',E:[{T:4,cdata:'tag'}]}]}]}]}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){let cSelector = "";
scwin.onpageload = function () {
  // 초기 comp 생성
  scwin.comp_init();
};

// comp 생성
scwin.comp_init = async function () {
  // 조건값으로 옵션 설정
  let options = {};

  // comp 동적 생성
  scwin.grp_1 = await $p.dynamicCreate("grp_1", "group", options, grp_comp);
  scwin.ibx_1 = await $p.dynamicCreate("ibx_1", "input", {
    initValue: "인스웨이브",
    setDisabled: false
  }, grp_1);
};

// comp 초기화
scwin.set_condition_onclick = function () {
  // 기존 component 삭제
  scwin.grp_1.remove();

  //조건 설정
  scwin.set_condition_1();

  // comp_init
  scwin.comp_init();
};

// 조건1 값 저장
scwin.set_condition_1 = function (info) {
  cSelector = con_selector.getText();
};

// 테스트 수행
scwin.btn_$_onclick = function (e) {
  if (cSelector == "id") $p.$("#mf_ibx_1").wq("setDisabled", true);else if (cSelector == "class") $p.$(".w2input").wq("setDisabled", true);else if (cSelector == "tag") $p.$("input").wq("setDisabled", true);else return;
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'tc_body_main',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'tc_body_left'},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 설명',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'w2:textbox',A:{id:'',label:'jQuery Selector 로 찾은 객체를 제어 가능한지 테스트한다.',style:'',escape:'false'}},{T:1,N:'w2:textbox',A:{class:'tc_tbx_label_1',escape:'false',id:'',label:'■ 테스트 방법',style:''}},{T:1,N:'w2:textbox',A:{id:'',label:'(여기에는 API 가이드 문서에 기재된 대표적인 예제 몇 개만 작성)<br/>1. selector=id 로 선택한다.<br/>2. "조건 설정" 버튼을 클릭한다.<br/>3. $() 함수로 input 비활성화 처리<br/>=> input 이 비활성화 된다.<br/><br/>4. selector=class 로 선택한다.<br/>5. "조건 설정" 버튼을 클릭한다.<br/>6. $() 함수로 input 비활성화 처리<br/>=> input 이 비활성화 된다.<br/><br/>7. selector=tag 로 선택한다.<br/>8. "조건 설정" 버튼을 클릭한다.<br/>9. $() 함수로 input 비활성화 처리<br/>=> input 이 비활성화 된다.',style:'',escape:'false'}}]},{T:1,N:'xf:group',A:{class:'tc_body_right',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 조건',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:button',A:{style:'width: 30%;background: none;border: none;',id:'',label:'selector'}}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'xf:select1',A:{ref:'',appearance:'minimal',style:'width: 30%;',id:'con_selector',allOption:'','ev:onchange':'scwin.con_selector_onchange'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:itemset',A:{nodeset:'data:dlt_selector'},E:[{T:1,N:'xf:label',A:{ref:'label'}},{T:1,N:'xf:value',A:{ref:'code'}}]}]}]},{T:1,N:'w2:button',A:{'ev:onclick':'scwin.set_condition_onclick',style:'height:35px;',id:'set_condition',label:'조건 설정'}}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 샘플',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'',id:'grp_comp'}},{T:1,N:'xf:group',A:{style:'',id:'grp_etc'},E:[{T:1,N:'w2:button',A:{style:'height: 30px;',id:'btn_$',label:'$() 함수로 input 비활성화 처리','ev:onclick':'scwin.btn_$_onclick'}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 리턴 값 확인',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'w2:textbox',A:{style:'',id:'tbx_result',label:'//',escape:'false',class:'tc_tbx_result_1'}}]}]}]}]}]}]})