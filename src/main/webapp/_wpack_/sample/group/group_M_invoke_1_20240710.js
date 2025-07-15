/*amd /sample/group/group_M_invoke_1_20240710.xml 7766 bb2a5d258107706665e60dc77f68c61a10e55d41e98c6275b8aa7a1220369e92 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:historyInfo',E:[{T:1,N:'w2:history',A:{}},{T:1,N:'w2:history',A:{}}]},{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){let cFuncName = "";
let cParam = "";
let cOptions = {};
scwin.onpageload = function () {
  // 초기 comp 생성
  scwin.comp_init();

  // radio 초기값 설정
  con_param_sub.setSelectedIndex(0);
};

// comp 생성
scwin.comp_init = async function () {
  // 조건값으로 옵션 설정
  let options = {};

  // comp 동적 생성
  scwin.grp_1 = await $p.dynamicCreate("grp_1", "group", options, grp_comp);
  scwin.ibx_1 = await $p.dynamicCreate("ibx_1", "input", {
    initValue: "input"
  }, grp_1);
  scwin.tbx_1 = await $p.dynamicCreate("tbx_1", "textbox", {
    label: "textbox",
    style: "width:200px;height:35px;border:1px solid black;"
  }, grp_1);
};

// comp 초기화
scwin.btn_set_condition_onclick = function (e) {
  scwin.set_condition_1();
  scwin.set_condition_2();
  scwin.set_condition_3();
};

// 조건1 값 저장
scwin.set_condition_1 = function (info) {
  cFuncName = con_funcName.getValue();
};

// 조건2 값 저장
scwin.set_condition_2 = function (info) {
  if (con_param_sub.getText() == "parameter") cParam = con_param.getValue();else if (con_param_sub.getText() == "user_method") cParam = eval('(' + con_param.getValue() + ')');else cParam = undefined;
};

// 조건2 값을 위한 옵션
scwin.con_param_sub_onchange = function (info) {
  if (info.newValue == 0) {
    con_param.setValue("");
    con_param.setDisabled(false);
  } else {
    con_param.setValue("user_method");
    con_param.setDisabled(true);
  }
};

// 조건3 값 저장
scwin.set_condition_3 = function (e) {
  let strOptions = con_options.getValue();
  if (strOptions != "") cOptions = eval('(' + strOptions + ')');else cOptions = {};
};

// 사용자 정의 함수
function user_method() {
  tbx_result.setValue(tbx_result.getValue() + "user method 실행 <br/>");
}

// 테스트 수행
scwin.btn_invoke_onclick = function (e) {
  if (cFuncName != "" && cParam != "" && cOptions != {}) grp_1.invoke(cFuncName, cParam, cOptions);else if (cFuncName != "" && cParam != "") grp_1.invoke(cFuncName, cParam);else if (cFuncName != "") grp_1.invoke(cFuncName);
};

// 리턴 값 삭제
scwin.btn_clear_onclick = function (e) {
  tbx_result.setValue("");
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'tc_body_main',id:'',style:'display: flex;'},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'tc_body_left'},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 설명',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'w2:textbox',A:{id:'',label:'[group > M > invoke]<br/><br/>group 하위 모든 컴포넌트의 API 또는 사용자 정의 함수가 호출되는지 테스트한다.',style:'',escape:'false'}},{T:1,N:'w2:textbox',A:{class:'tc_tbx_label_1',escape:'false',id:'',label:'■ 테스트 방법',style:''}},{T:1,N:'w2:textbox',A:{id:'',label:'(여기에는 API 가이드 문서에 기재된 대표적인 예제 몇 개만 작성)<br/>1. keepDisabled=true, setDisabled=true 로 선택한다.<br/>2. "조건 설정" 버튼을 클릭한다.<br/>=> group 하위의 input 이 비활성화 된다.<br/><br/>3. keepDisabled=false, setDisabled=true 로 선택한다.<br/>4. "조건 설정" 버튼을 클릭한다.<br/>=> group 하위의 input 이 활성화 된다.',style:'',escape:'false'}}]},{T:1,N:'xf:group',A:{class:'tc_body_right',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 조건',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'funcName',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'},E:[{T:1,N:'xf:input',A:{'ev:onchange':'scwin.con_funcName_onchange',id:'con_funcName',style:'width: 200px;'}}]}]},{T:1,N:'xf:group',A:{tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th ',tagname:'th'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:scope',E:[{T:3,text:'row'}]}]},{T:1,N:'w2:textbox',A:{class:'',id:'',label:'param',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',tagname:'td'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:colspan',E:[{T:3,text:'1'}]},{T:1,N:'w2:rowspan',E:[{T:3,text:'1'}]}]},{T:1,N:'xf:select1',A:{appearance:'full',cols:'3','ev:onchange':'scwin.con_param_sub_onchange',id:'con_param_sub',ref:'',rows:'',selectedIndex:'',style:'width: 280px;height: 35px;'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'parameter'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'0'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'user_method'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'1'}]}]}]}]},{T:1,N:'xf:input',A:{id:'con_param',style:'width: 200px;'}}]}]},{T:1,N:'xf:group',A:{tagname:'tr',style:''},E:[{T:1,N:'xf:group',A:{class:'w2tb_th ',tagname:'th'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:scope',E:[{T:3,text:'row'}]}]},{T:1,N:'w2:textbox',A:{class:'',id:'',label:'options',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',tagname:'td'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:colspan',E:[{T:3,text:'1'}]},{T:1,N:'w2:rowspan',E:[{T:3,text:'1'}]}]},{T:1,N:'xf:textarea',A:{'ev:onblur':'scwin.con_options_onblur',id:'con_options',placeholder:'{ excludePlugin : "grid calendar", excludeId : "radio1" } 형태로 options 를 넣어주세요.',style:'width:500px;height:150px;'}}]}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'}},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'},E:[{T:1,N:'w2:button',A:{id:'btn_set_condition',label:'조건 설정',style:'','ev:onclick':'scwin.btn_set_condition_onclick',class:'tc_btn_basic'}}]}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 샘플',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'',id:'grp_comp'}},{T:1,N:'xf:group',A:{style:'margin-top: 10px;',id:'grp_etc'},E:[{T:1,N:'w2:button',A:{style:'',id:'btn_invoke',label:'invoke()','ev:onclick':'scwin.btn_invoke_onclick',class:'tc_btn_basic'}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'',class:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 리턴 값 확인',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'display: flex;justify-content: flex-end',id:''},E:[{T:1,N:'w2:button',A:{style:'',id:'btn_clear',label:'clear',class:'tc_btn_basic','ev:onclick':'scwin.btn_clear_onclick'}}]},{T:1,N:'w2:textbox',A:{style:'min-height: 50px;',id:'tbx_result',label:'',escape:'false',class:'tc_tbx_result_1'}}]}]}]}]}]}]})