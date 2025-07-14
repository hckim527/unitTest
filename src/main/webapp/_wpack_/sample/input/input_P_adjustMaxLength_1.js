/*amd /sample/input/input_P_adjustMaxLength_1.xml 7233 0d3a42f32abf5bd4fc87c9d50c83feae17c31912ea9b4019f72cd4ccb1cb0c89 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:historyInfo',E:[{T:1,N:'w2:history',A:{}},{T:1,N:'w2:history',A:{}}]},{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_dataType',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'code',name:'code',dataType:'number'}},{T:1,N:'w2:column',A:{id:'label',name:'label',dataType:'text'}}]},{T:1,N:'w2:data',A:{use:'true'},E:[{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'1'}]},{T:1,N:'label'}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'2'}]},{T:1,N:'label',E:[{T:4,cdata:'text'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'label',E:[{T:4,cdata:'number'}]},{T:1,N:'code',E:[{T:4,cdata:'3'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'4'}]},{T:1,N:'label',E:[{T:4,cdata:'float'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'5'}]},{T:1,N:'label',E:[{T:4,cdata:'date'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'6'}]},{T:1,N:'label',E:[{T:4,cdata:'time'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'7'}]},{T:1,N:'label',E:[{T:4,cdata:'bigDecimal'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'8'}]},{T:1,N:'label',E:[{T:4,cdata:'euro'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'9'}]},{T:1,N:'label',E:[{T:4,cdata:'rupee'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'10'}]},{T:1,N:'label',E:[{T:4,cdata:'tenge'}]}]}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_adjustMaxLength',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'code',name:'code',dataType:'number'}},{T:1,N:'w2:column',A:{id:'label',name:'label',dataType:'text'}}]},{T:1,N:'w2:data',A:{use:'true'},E:[{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'1'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'2'}]},{T:1,N:'label',E:[{T:4,cdata:'true'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'3'}]},{T:1,N:'label',E:[{T:4,cdata:'false'}]}]}]}]}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){let cDataType = "";
let cMaxLength = "";
let cAdjustMaxLength = "";
scwin.onpageload = function () {
  // 초기 comp 생성
  scwin.comp_init();
};

// comp 생성
scwin.comp_init = async function () {
  // 조건값으로 옵션 설정
  let options = {};
  if (cDataType !== "") options.dataType = cDataType;
  if (cMaxLength !== "") options.maxlength = cMaxLength;
  if (cAdjustMaxLength !== "") options.adjustMaxLength = cAdjustMaxLength;

  // comp 동적 생성
  scwin.ibx_1 = await $p.dynamicCreate("ibx_1", "input", options, grp_comp);
};

// comp 초기화
scwin.set_condition_onclick = function () {
  // 기존 component 삭제
  scwin.ibx_1.remove();

  // 조건 설정
  scwin.set_condition_1();
  scwin.set_condition_2();
  scwin.set_condition_3();

  // comp_init
  scwin.comp_init();
};

// 조건1 값 저장
scwin.set_condition_1 = function (info) {
  cDataType = con_dataType.getText();
};

// 조건2 값 저장
scwin.set_condition_2 = function (info) {
  cMaxLength = con_maxlength.getValue();
};

// 조건3 값 저장
scwin.set_condition_3 = function (info) {
  cAdjustMaxLength = con_adjustMaxLength.getText();
};

// 리턴값 확인용
scwin.btn_getValue_onclick = function (e) {
  rslt = ibx_1.getValue();
  tbx_result.setValue(tbx_result.getValue() + "<br/>" + rslt);
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'tc_body_main',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'tc_body_left'},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 설명',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'w2:textbox',A:{id:'',label:'input 의 첫번째로 입력된 부호(-, +) 를 입력 가능한 최대 글자 수(maxlength) 로 포함하는지 테스트한다.',style:'',escape:'false'}},{T:1,N:'w2:textbox',A:{class:'tc_tbx_label_1',escape:'false',id:'',label:'■ 테스트 방법',style:''}},{T:1,N:'w2:textbox',A:{id:'',label:'(여기에는 API 가이드 문서에 기재된 대표적인 예제 몇 개만 작성)<br/>1. dataType=number, maxlength=5, adjustMaxLength=false 로 선택한다.<br/>2. "조건 설정" 버튼을 클릭한다.<br/>3. input 에 "+12345" 를 입력하고 탭 키를 입력하여 포커스 아웃한다.<br/>=> "+1234" 입력되는지 확인한다.<br/><br/>4. adjustMaxLength=true 로 선택한다.<br/>5. "조건 설정" 버튼을 클릭한다.<br/>6. input 에 "+12345" 를 입력하고 탭 키를 입력하여 포커스 아웃한다.<br/>=> "+12345" 입력되는지 확인한다.',style:'',escape:'false'}}]},{T:1,N:'xf:group',A:{class:'tc_body_right',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 조건',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:button',A:{style:'width: 30%;background: none;border: none;',id:'',label:'dataType'}},{T:1,N:'w2:button',A:{style:'width: 30%;background: none;border: none;',id:'',label:'maxlength'}},{T:1,N:'w2:button',A:{style:'width: 30%;background: none;border: 0;',id:'',label:'adjustMaxLength'}}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'xf:select1',A:{ref:'',appearance:'minimal',chooseOption:'',style:'width: 30%;',id:'con_dataType',allOption:'','ev:onchange':'scwin.con_dataType_onchange'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:itemset',A:{nodeset:'data:dlt_dataType'},E:[{T:1,N:'xf:label',A:{ref:'label'}},{T:1,N:'xf:value',A:{ref:'code'}}]}]}]},{T:1,N:'xf:input',A:{dataType:'number',style:'width: 30%;',id:'con_maxlength','ev:onchange':'scwin.con_maxlength_onchange'}},{T:1,N:'xf:select1',A:{ref:'',appearance:'minimal',chooseOption:'',style:'width: 30%;',allOption:'',id:'con_adjustMaxLength','ev:onchange':'scwin.con_adjustMaxLength_onchange'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:itemset',A:{nodeset:'data:dlt_adjustMaxLength'},E:[{T:1,N:'xf:label',A:{ref:'label'}},{T:1,N:'xf:value',A:{ref:'code'}}]}]}]},{T:1,N:'w2:button',A:{'ev:onclick':'scwin.set_condition_onclick',style:'height:35px;',id:'set_condition',label:'조건 설정'}}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 샘플',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'',id:'grp_comp'}},{T:1,N:'xf:group',A:{style:'',id:'grp_etc'},E:[{T:1,N:'w2:button',A:{style:'height: 35px;',id:'btn_getValue',label:'getValue()','ev:onclick':'scwin.btn_getValue_onclick'}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 리턴 값 확인',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'w2:textbox',A:{style:'',id:'tbx_result',label:'//',escape:'false',class:'tc_tbx_result_1'}}]}]}]}]}]}]})