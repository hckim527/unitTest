/*amd /sample/group/group_M_invoke_1.xml 10815 b97e60b7473e7aedbf3ed73b14c4c6f6b7b8d87851be79213c9620fc1785cc1a */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:historyInfo',E:[{T:1,N:'w2:history',A:{}},{T:1,N:'w2:history',A:{}}]},{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){let cFuncName = "";
let cParam = "";
let cOptions = {};
let objReturn = wf_return.getObj("tbx_return");
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
  scwin.grp_1 = await $p.dynamicCreate("grp_1", "group", {
    style: "display: flex; flex-direction: row; gap:10px;"
  }, grp_comp);
  scwin.ibx_1 = await $p.dynamicCreate("ibx_1", "input", {
    initValue: "input1"
  }, grp_1);
  scwin.tbx_1 = await $p.dynamicCreate("tbx_1", "textbox", {
    label: "textbox",
    style: "width:200px;height:35px;border:1px solid black;"
  }, grp_1);
  scwin.grp_2 = await $p.dynamicCreate("grp_2", "group", {
    text: "group",
    style: "width:230px;height:100px;border:1px solid black;"
  }, grp_1);
  scwin.ibx_2 = await $p.dynamicCreate("ibx_2", "input", {
    initValue: "group_input"
  }, grp_2);
  scwin.wf_1 = await $p.dynamicCreate("wf_1", "wframe", {
    style: "border: solid blue 1px; width: 250px; height: 100px;"
  }, grp_1);
  scwin.btn_1 = await $p.dynamicCreate("btn_1", "button", {
    label: "wframe_button"
  }, wf_1);

  //데이터 리스트 생성 및 정의 
  let option = {
    "id": "dataList1",
    "type": "dataList",
    "option": {
      "baseNode": "list",
      "repeatNode": "map"
    },
    "columnInfo": [{
      "id": "col1",
      "name": "name1",
      "dataType": "text"
    }, {
      "id": "col2",
      "name": "name2",
      "dataType": "text"
    }, {
      "id": "col3",
      "name": "name3",
      "dataType": "text"
    }]
  };
  $p.data.create(option);
  //데이터 리스트 데이터 값 세팅 
  dataList1.setJSON([{
    "col1": "20250711",
    "col2": "data1",
    "col3": "data2"
  }, {
    "col1": "20250712",
    "col2": "data3",
    "col3": "data4"
  }, {
    "col1": "20250713",
    "col2": "data5",
    "col3": "data6"
  }, {
    "col1": "20250714",
    "col2": "data7",
    "col3": "data8"
  }]);
  let gridViewStr = "";
  gridViewStr += '<w2:gridView xmlns="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:w2="http://www.inswave.com/websquare" xmlns:xf="http://www.w3.org/2002/xforms" dataList="dataList1" scrollByColumn="false" summaryAuto="false" scrollByColumnAdaptive="false" keyMoveEditMode="true" enterKeyMove="down" id="gridView1" style="width: 500px;height: 150px;"  ignoreCellClick="false" ignoreToggleOnDisabled="false" fixedColumnWithHidden="true" mergeCells="byrow" useShiftKey="true">';
  gridViewStr += '<w2:header id="header1" style="">';
  gridViewStr += '<w2:row id="row1" style="">';
  gridViewStr += '<w2:column blockSelect="false" id="column5" style="height:20px" inputType="text" width="100" displayMode="label" value="name1"></w2:column>';
  gridViewStr += '<w2:column blockSelect="false" id="column3" style="height:20px" inputType="text" width="70" displayMode="label" value="name1"></w2:column>';
  gridViewStr += '<w2:column blockSelect="false" id="column1" style="height:20px" width="70" inputType="text" displayMode="label" value="name3"></w2:column>';
  gridViewStr += '</w2:row>';
  gridViewStr += '</w2:header>';
  gridViewStr += '<w2:gBody id="gBody1" style="">';
  gridViewStr += '<w2:row id="row2" style="">';
  gridViewStr += '<w2:column blockSelect="false" id="col1" style="height:20px" inputType="calendar" width="100" ></w2:column>';
  gridViewStr += '<w2:column blockSelect="false" id="col2" style="height:20px" inputType="text" width="70" ></w2:column>';
  gridViewStr += '<w2:column blockSelect="false" id="col3" style="height:20px" width="70" inputType="text" ></w2:column>';
  gridViewStr += '</w2:row>';
  gridViewStr += '</w2:gBody>';
  gridViewStr += '</w2:gridView>';
  scwin.grv_1 = await $p.dynamicCreate("grv_1", "gridView", gridViewStr, grp_1);
};

// comp 초기화
scwin.btn_set_condition_onclick = function (e) {
  scwin.set_condition_1();
  scwin.set_condition_2();
  scwin.set_condition_3();
};

// 조건1 값 저장
scwin.set_condition_1 = function () {
  cFuncName = con_funcName.getValue();
};

// 조건2 값 저장
scwin.set_condition_2 = function () {
  if (con_param_sub.getText() == "parameter") cParam = con_param.getValue();else if (con_param_sub.getText() == "user_method") cParam = eval('(' + con_param.getValue() + ')');else cParam = undefined;
};

// 조건2 값을 위한 옵션
scwin.con_param_sub_onchange = function (info) {
  if (info.newValue == 0) {
    con_param.setValue("");
    con_param.setDisabled(false);
    con_funcName.setValue("");
    con_funcName.setDisabled(false);
  } else {
    con_param.setValue("user_method");
    con_param.setDisabled(true);
    con_funcName.setValue("assert");
    con_funcName.setDisabled(true);
  }
};

// 조건3 값 저장
scwin.set_condition_3 = function (e) {
  let strOptions = con_options.getValue();
  if (strOptions != "") cOptions = eval('(' + strOptions + ')');else cOptions = {};
};

// 사용자 정의 함수
function user_method() {
  objReturn = wf_return.getObj("tbx_return");
  objReturn.setValue(objReturn.getValue() + "user method 실행 <br/>");
}

// 테스트 수행
scwin.btn_invoke_onclick = function (e) {
  if (cFuncName != "" && cParam != "" && cOptions != {}) grp_1.invoke(cFuncName, cParam, cOptions);else if (cFuncName != "" && cParam != "") grp_1.invoke(cFuncName, cParam);else if (cFuncName != "") grp_1.invoke(cFuncName);
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'tc_body_main',id:'',style:'display: flex;'},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'tc_body_left'},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodyDescription.xml'}},{T:1,N:'w2:textbox',A:{escape:'false',id:'',label:'[group > M > invoke]<br/><br/>group 하위 모든 컴포넌트의 API 또는 사용자 정의 함수가 호출되는지 테스트한다.',style:''}},{T:1,N:'w2:wframe',A:{id:'',src:'/frame/page/test_bodyDescription.xml',style:''}},{T:1,N:'w2:textbox',A:{escape:'false',id:'',label:'(여기에는 API 가이드 문서에 기재된 대표적인 예제 몇 개만 작성)<br/>1. funcName 을 "setValue" 로 입력한다.<br/>2. param 의 라디오 버튼을 parameter 로 선택하고 오른쪽 입력창에 "WebSquare" 를 입력한다.<br/>3. "조건 설정" 버튼을 클릭한다.<br/>4. "invoke()" 버튼을 클릭한다.<br/>[확인] => input(첫번째), textbox(두번째) 의 값이 "WebSuquare" 로 입력된다.<br/><br/>5. param 의 라디오 버튼을 user_method 로 선택한다.<br/>6. "조건 설정" 버튼을 클릭한다.<br/>7. "invoke()" 버튼을 클릭한다.<br/>[확인] => 리턴 값으로 "user method 실행" 이 출력된다.',style:''}}]},{T:1,N:'xf:group',A:{class:'tc_body_right',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodyCondition.xml'}},{T:1,N:'xf:group',A:{id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'funcName',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'},E:[{T:1,N:'xf:input',A:{id:'con_funcName',style:'width: 200px;'}}]}]},{T:1,N:'xf:group',A:{tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th ',tagname:'th'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:scope',E:[{T:3,text:'row'}]}]},{T:1,N:'w2:textbox',A:{class:'',id:'',label:'param',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',tagname:'td'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:colspan',E:[{T:3,text:'1'}]},{T:1,N:'w2:rowspan',E:[{T:3,text:'1'}]}]},{T:1,N:'xf:select1',A:{appearance:'full',cols:'3',id:'con_param_sub',ref:'',rows:'',selectedIndex:'',style:'width: 280px;height: 35px;','ev:onchange':'scwin.con_param_sub_onchange'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'parameter'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'0'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'user_method'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'1'}]}]}]}]},{T:1,N:'xf:input',A:{id:'con_param',style:'width: 200px;'}}]}]},{T:1,N:'xf:group',A:{tagname:'tr',style:''},E:[{T:1,N:'xf:group',A:{class:'w2tb_th ',tagname:'th'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:scope',E:[{T:3,text:'row'}]}]},{T:1,N:'w2:textbox',A:{class:'',id:'',label:'options',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',tagname:'td'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:colspan',E:[{T:3,text:'1'}]},{T:1,N:'w2:rowspan',E:[{T:3,text:'1'}]}]},{T:1,N:'xf:textarea',A:{id:'con_options',placeholder:'{ excludePlugin : "grid calendar", excludeId : "radio1" } 형태로 options 를 넣어주세요.',style:'width:500px;height:150px;'}}]}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'}},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'},E:[{T:1,N:'w2:button',A:{id:'btn_set_condition',label:'조건 설정',style:'','ev:onclick':'scwin.btn_set_condition_onclick',class:'tc_btn_basic'}}]}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'',src:'/frame/page/test_bodySample.xml'}},{T:1,N:'xf:group',A:{style:'',id:'grp_comp'}},{T:1,N:'xf:group',A:{style:'margin-top: 10px;',id:'grp_etc'},E:[{T:1,N:'w2:button',A:{style:'',id:'btn_invoke',label:'invoke()','ev:onclick':'scwin.btn_invoke_onclick',class:'tc_btn_basic'}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'',class:''},E:[{T:1,N:'w2:wframe',A:{style:'',id:'wf_return',src:'/frame/page/test_bodyReturn.xml'}}]}]}]}]}]}]})