
const nativeConfig ={
  OrderEdit:{
  text: '下销售订单',
  redirectCfg: 'REDIRECT_ORDER',
  showKey: 'MB1007001',
  authName:'SaleOrderFieldAuth',
  authKey:'IsAdd'
},
SaleDeliveryEdit:{
  text: '下销货单',
  redirectCfg: 'REDIRECT_SALEDELIVERY',
  showKey: 'MB1007002',
  authName:'SaleDeliveryFieldAuth',
  authKey:'IsAdd'
},
SaleRejectedDeliveryEdit:{
  text: '下退货单',
  redirectCfg: 'REDIRECT_REJECTED_SALEDELIVERY',
  showKey: 'MB1007002',
  authName:'SaleDeliveryFieldAuth',
  authKey:'IsAdd'
},
OrderList:{
  text: '关联销售订单',
  redirectCfg: 'REDIRECT_ASSOCIATED_ORDER',
  showKey: 'MB1007003',
},
SaleDeliveryList:{
  text: '关联销货单',
  redirectCfg: 'REDIRECT_ASSOCIATED_SALEDELIVERY',
  showKey: 'MB1007004',
}}

export {nativeConfig}
