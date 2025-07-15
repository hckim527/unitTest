/*amd /sample/group/page_component.xml 2515 4401b157ff0c56019ab78baf3b0ca1ea9800089788a46df5e9c19fa4d9a10db1 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dataList1',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'code',name:'code',dataType:'text'}},{T:1,N:'w2:column',A:{id:'label',name:'label',dataType:'text'}}]},{T:1,N:'w2:data',A:{use:'true'},E:[{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'1'}]},{T:1,N:'label',E:[{T:4,cdata:'가'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'2'}]},{T:1,N:'label',E:[{T:4,cdata:'나'}]}]},{T:1,N:'w2:row',E:[{T:1,N:'code',E:[{T:4,cdata:'3'}]},{T:1,N:'label',E:[{T:4,cdata:'다'}]}]}]}]}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {};
scwin.group1_onblur = function (e) {
  console.log("group1_onblur");
};
scwin.group1_onclick = function (e) {
  console.log("group1_onclick");
};
scwin.group1_onfocus = function (e) {
  console.log("group1_onfocus");
};
scwin.button1_onfocus = function (e) {
  console.log("button1_onfocus");
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'width: 200px;height: 200px;background: red;',id:'group1','ev:onblur':'scwin.group1_onblur','ev:onfocus':'scwin.group1_onfocus','ev:onclick':'scwin.group1_onclick'},E:[{T:1,N:'w2:button',A:{style:'width: 100px;height: 100px;',id:'button1','ev:onfocus':'scwin.button1_onfocus'}}]},{T:1,N:'xf:input',A:{id:'',style:'width: 144px;height: 21px;'}},{T:1,N:'xf:select1',A:{id:'',chooseOption:'',style:'width: 148px;height: 21px;',submenuSize:'auto',allOption:'',disabled:'false',direction:'auto',appearance:'minimal',disabledClass:'w2selectbox_disabled',ref:''},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'가'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'1'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'나'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'2'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'다'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'3'}]}]}]}]}]}]}]})