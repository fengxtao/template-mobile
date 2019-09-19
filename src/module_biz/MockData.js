/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-08-23 11:06:41   
*/


// PageShowType 
// 1000 弹出“ 查询密码设置” 页面， 且不显示“ 启用验密” 按钮
// 1001 弹出“ 查询密码设置” 页面， 且显示“ 启用验密” 按钮
// 2000 弹出“ 输入查询密码” 页面 
// 3000 直接进入薪资查询页面
// 4000 薪资数据页面

// 查询获得设置页面显示类型
export const GetWXShowPageType = {
    IsSucceed: true,
    PageShowType: 1001,
    Data: {
        CanStartYaer: '2017',
        CanEndYaer: '2019'
    },
    Error: { code: null, msg: '' }
};

//用户档案薪资查询设置
export const SetWageQueryConfig = {
    IsSucceed: true,
    ErrorMsg: { code: null, msg: '设置失败' }
};

//
//用户档案薪资查询设置
export const CheckWagePwd = {
    IsSucceed: true,
    ErrorMsg: { code: 1003, msg: '用户薪资查询密码输入错误' },
    Data: {
        CanStartYaer: "2017",
        CanEndYaer: "2019"
    }
};

//薪资摘要查询
export const QueryWageAbstract = {
    IsSucceed: true,
    ErrorMsg: { code: 1003, msg: '用户薪资查询密码输入错误' },
    Data: {
        Detail: [
            {
                WagePeriod: "2019.07",
                WageClassName: "年度奖金",
                WageClassCode: "02",
                WageID: "1",
                IsTotal: false,
                WageDetails: [
                    {
                        WageCode: "020195",
                        WageName: "实发薪资",
                        WageValue: "6000.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageCode: "020190",
                        WageName: "应发合计",
                        WageValue: "500.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageCode: "020190",
                        WageName: "应扣合计",
                        WageValue: "500.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageCode: "020190",
                        WageName: "扣款合计",
                        WageValue: "500.00000000000000",
                        FieldType: 51526
                    }
                ]
            },
            {
                WagePeriod: "2019.06",
                WageClassName: "年度奖金",
                WageClassCode: "02",
                WageID: "1",
                IsTotal: false,
                WageDetails: [
                    {
                        WageCode: "020195",
                        WageName: "实发薪资",
                        WageValue: "6000.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageCode: "020190",
                        WageName: "应发合计",
                        WageValue: "500.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageCode: "020190",
                        WageName: "应扣合计",
                        WageValue: "500.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageCode: "020190",
                        WageName: "扣款合计",
                        WageValue: "500.00000000000000",
                        FieldType: 51526
                    }
                ]
            },
            {
                WageClassName: "合计",
                IsTotal: true,
                WageDetails: [
                    {
                        WageName: "实发薪资",
                        WageValue: "12000.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageName: "应发合计",
                        WageValue: "536.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageName: "应缴个税",
                        WageValue: "536.00000000000000",
                        FieldType: 51526
                    },
                    {
                        WageName: "扣款合计",
                        WageValue: "536.00000000000000",
                        FieldType: 51526
                    }
                ]
            }
        ],
        CanStartYaer: "2017",
        CanEndYaer: "2019",
        UserName: "张三"
    }
};