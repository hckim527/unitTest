/*amd /sample/$p/$p_M_$_dynamicCreate_1.xml 6269 7a11440ed2d2541a39f83ee09f72a040fe23e3d9e5916fd87e8eab3f9aad6785 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:historyInfo',E:[{T:1,N:'w2:history',A:{}},{T:1,N:'w2:history',A:{}}]},{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_componentName',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'code',name:'code',dataType:'number'}},{T:1,N:'w2:column',A:{id:'label',name:'label',dataType:'text'}}]},{T:1,N:'w2:data',A:{use:'true'},E:[{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'1'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'2'}]},{T:1,N:'label',E:[{T:4,cdata:'group'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'3'}]},{T:1,N:'label',E:[{T:4,cdata:'input'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'4'}]},{T:1,N:'label',E:[{T:4,cdata:'selectbox'}]}]}]}]}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){let cId = "";
let cComponentName = "";
let cOptions = {};
let cParent = "";
scwin.onpageload = function () {
  scwin.comp_init();
};

// comp 생성
scwin.comp_init = async function () {
  scwin.grp_1 = await $p.dynamicCreate("grp_1", "group", {
    text: "grp_1",
    style: "border: solid black 2px; width: 512px; height: 384px;"
  }, grp_comp);
  scwin.grp_2 = await $p.dynamicCreate("grp_2", "group", {
    text: "grp_2 > wframe1",
    style: "border: solid black 2px; width: 300px; height: 200px;"
  }, grp_comp);
  scwin.wframe1 = await $p.dynamicCreate("wframe1", "wframe", {
    style: "border: solid blue 1px; width: 250px; height: 100px;"
  }, grp_2);
};

// comp 초기화
scwin.set_condition_onclick = async function () {
  if (scwin.dynamic_comp) scwin.dynamic_comp.remove();

  // 조건 설정
  scwin.set_condition_1();
  scwin.set_condition_2();
  scwin.set_condition_3();
  scwin.set_condition_4();
};

// 조건1 값 저장
scwin.set_condition_1 = function (info) {
  cId = con_id.getValue();
};

// 조건2 값 저장
scwin.set_condition_2 = function (info) {
  cComponentName = con_componentName.getText();
};

// 조건3 값 저장
scwin.set_condition_3 = function (e) {
  let strOptions = con_options.getValue();
  if (strOptions != "") cOptions = eval('(' + strOptions + ')');else cOptions = {};
};

// 조건4 값 저장
scwin.set_condition_4 = function (info) {
  parentId = con_parent.getValue();
  cParent = $p.$("#" + parentId)[0];
};

// 테스트 수행
scwin.btn_dynamicCreate_onclick = async function (e) {
  // comp 동적 생성
  scwin.dynamic_comp = await $p.dynamicCreate(cId, cComponentName, cOptions, cParent);
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'tc_body_main',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'tc_body_left'},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 설명',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'w2:textbox',A:{id:'',label:'동적으로 웹스퀘어 객체가 생성되는지 테스트한다.',style:'',escape:'false'}},{T:1,N:'w2:textbox',A:{class:'tc_tbx_label_1',escape:'false',id:'',label:'■ 테스트 방법',style:''}},{T:1,N:'w2:textbox',A:{id:'',label:'(여기에는 API 가이드 문서에 기재된 대표적인 예제 몇 개만 작성)<br/>1. id=ibx_1 로 입력한다.<br/>2. componentName=input 선택한다<br/>3. parent=grp_1 입력한다<br/>4. "조건 설정" 버튼을 클릭한다.<br/>=> 첫번째 group 하위에 input 이 생성된다.',style:'',escape:'false'}}]},{T:1,N:'xf:group',A:{class:'tc_body_right',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:''},E:[{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 조건',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:button',A:{style:'width: 30%;background: none;border: none;',id:'',label:'id'}},{T:1,N:'w2:button',A:{id:'',label:'componentName',style:'width: 30%;background: none;border: none;'}},{T:1,N:'w2:button',A:{id:'',label:'parent',style:'width: 30%;background: none;border: none;'}}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'xf:input',A:{id:'con_id',style:'width: 30%;','ev:onchange':'scwin.con_id_onchange'}},{T:1,N:'xf:select1',A:{ref:'',appearance:'minimal',style:'width: 30%;',allOption:'',id:'con_componentName',chooseOption:'','ev:onchange':'scwin.con_componentName_onchange'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:itemset',A:{nodeset:'data:dlt_componentName'},E:[{T:1,N:'xf:label',A:{ref:'label'}},{T:1,N:'xf:value',A:{ref:'code'}}]}]}]},{T:1,N:'xf:input',A:{style:'width: 30%;',id:'con_parent','ev:onchange':'scwin.con_parent_onchange'}},{T:1,N:'w2:button',A:{'ev:onclick':'scwin.set_condition_onclick',style:'height:35px;',id:'set_condition',label:'조건 설정'}}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:button',A:{style:'width: 60%;background: none;border: none;',id:'',label:'options'}}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'xf:textarea',A:{id:'con_options',style:'width: 60%;height: 150px;','ev:onblur':'scwin.con_options_onblur',placeholder:'{style: "background-color:#B0E0E6; height:30px; margin-bottom:6px;"} 형태로 options 를 넣어주세요.'}}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 샘플',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'xf:group',A:{style:'',id:'grp_comp'}},{T:1,N:'xf:group',A:{style:'',id:'grp_etc'},E:[{T:1,N:'w2:button',A:{style:'height: 35px;',id:'btn_dynamicCreate',label:'dynamicCreate()','ev:onclick':'scwin.btn_dynamicCreate_onclick'}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:''},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'■ 테스트 리턴 값 확인',class:'tc_tbx_label_1',escape:'false'}},{T:1,N:'w2:textbox',A:{style:'',id:'tbx_result',label:'//',escape:'false',class:'tc_tbx_result_1'}}]}]}]}]}]}]})