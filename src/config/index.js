// import world from "./world.json"
// import '../../node_modules/echarts/map/js/world.js'
import nameMap from "./country-name-zh"
// import {handleScatterData} from '../utils/index'
// ****************
//饼图
export const pieChart = {
  option : {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['苹果', '安卓', 'WEB', 'IPad', '其他']
    },
    series: [
        {
            name: 'sidus图表',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show:false,
                position: 'center',
            },
            emphasis: {
                show:false,
                label: {
                    show: false,
                },
            },
            selectedMode:'single',
            select:{
                show: true,
                label:{
                    show: true,
                    formatter:'{c}',
                    fontSize: '30',
                    fontWeight: 'bold',
                }
                
                
            },
            data: [
                {value: 335, name: '苹果'},
                {value: 310, name: '安卓'},
                {value: 234, name: 'WEB'},
                {value: 135, name: 'IPad'},
                {value: 1548, name: '其他'}
            ]
        }
    ]
  }
}
// ****************
//动态柱状图
var barRaceDataArr = [];
for (let i = 0; i < 5; ++i) {
    barRaceDataArr.push(Math.round(Math.random() * 200));
}
export const barRaceData = {
    
    
}

//柱状图
export const barChart = {
  option:{
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
  }
}
// ****************
//折线图
export const lineChart = {
  option:{
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
  }
}
// ****************
//散点图需要的数组
const worldMapScatterData = [
    {name:'中国',value:80},
    {name:'巴西',value:40},
    {name:'加拿大',value:30},
    {name:'英国',value:50},
    {name:'日本',value:16},
    {name:'韩国',value:7},
    {name:'俄罗斯',value:70},
    {name:'美国',value:90},
    {name:'德国',value:60}
]
// ****************
//地图加上散点图的数据。
// export const mapWorldChart = {
//     option:{
//         tooltip: {
//             trigger: 'item',
//             formatter: '{b}'
//         },
//         // geoMap:'world',
//         geo:{
//             map: 'world', 
//             show:true,
//             roam: false,
//             label: {
//                 normal: {         // 默认的文本标签显示样式
//                     show: false,
//                 },
//                 emphasis: {
//                     show: false
//                 }
//             },
//             // center: [115.97, 29.71],
//             itemStyle: {        // 每个区域的样式 
//                 normal: {
//                     borderColor: '#F6F6F6',//区域边框颜色
//                     areaColor: '#F6F6F6',
//                 },
//                 emphasis: {
//                     show: false,
//                 },
//             },
//         },
//         visualMap:{
//             type:'piecewise',
//             splitNumber:5,
//             pieces:[
//                 {min: 90, max: 100},
//                 {min: 80, max: 89},
//                 {min: 70, max: 79},
//                 {min: 60, max: 69},
//                 {min: 50, max: 59},
//                 {min: 40, max: 49},
//                 {min: 30, max: 39},
//                 {min: 20, max: 29},
//                 {min: 10, max: 19},
//                 {min: 0, max: 9},
//             ],
//             // min: 0,
//             // max: 100,
//             inRange:{
//                 // color:['#00A686', '#0BB998', '#13C5A3', '#26CBAB', '#41D8BA', '#4DDDC0', '#7FE2CE','#9FEADB','#C1F1E7'],
//                 color:['#C1F1E7','#9FEADB','#7FE2CE','#4DDDC0','#41D8BA','#26CBAB','#13C5A3','#0BB998','#00A686',]
//             }
//         },
//         series: [
//             //地图
//             {
//                 type: 'map',
//                 name: '世界地图',
//                 mapType: 'world', // 自定义扩展图表类型
//                 coordinateSystem: 'geo',
//                 data:worldMapScatterData,
//                 nameMap:nameMap,
//                 itemStyle: {
//                     borderWidth:0,
//                     normal: { label: { show: false },borderWidth:0 }, // 普通状态下，显示标签
//                     emphasis: { label: { show: false } ,areaColor:'#A4EDBA'} // 高亮状态下，显示标签（默认）
//                 },
//                 roam: false, // 放大缩小、平移
//             },
            
//         ]
//     }
// }
//这是地图按数值来区分区域颜色
export const handleMapNumSizeColor = (type) => {
    let height = 24
    let width = 16
    let fontSize = 10
    let gap= 2
    if(type !=='HelloWorldThree'){
        height = 12
        width = 8
        gap = 2
        fontSize = 6
    }
    
    return {
        option:{
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            // geoMap:'world',
            geo:{
                map: 'world', 
                show:true,
                roam: false,
                label: {
                    show: false,
                },
                // center: [115.97, 29.71],
                itemStyle: {        // 每个区域的样式 
                    borderColor: '#F6F6F6',//区域边框颜色
                    areaColor: '#F6F6F6',
                },
                emphasis: {
                    label:{
                        show: false,
                    }, 
                },
            },
            visualMap:{
                type:'piecewise',
                pieces:[
                    {min: 90, max: 100},
                    {min: 80, max: 89},
                    {min: 70, max: 79},
                    {min: 60, max: 69},
                    {min: 50, max: 59},
                    {min: 40, max: 49},
                    {min: 30, max: 39},
                    {min: 20, max: 29},
                    {min: 10, max: 19},
                    {min: 0, max: 9},
                ],
                itemWidth:height,
                itemHeight:width,
                itemGap:gap,
                textStyle:{
                    fontSize : fontSize
                },
                inRange:{
                    // color:['#00A686', '#0BB998', '#13C5A3', '#26CBAB', '#41D8BA', '#4DDDC0', '#7FE2CE','#9FEADB','#C1F1E7'],
                    color:['#C1F1E7','#9FEADB','#7FE2CE','#4DDDC0','#41D8BA','#26CBAB','#13C5A3','#0BB998','#00A686'],
                    symbolSize: [60, 100]
                }
            },
            series: [
                //地图
                {
                    type: 'map',
                    name: '世界地图',
                    map: 'world', // 自定义扩展图表类型
                    coordinateSystem: 'geo',
                    data:worldMapScatterData,
                    nameMap:nameMap,
                    tooltip:{
                        formatter:function (params){
                            let title = `<p>${params.name}2021年产品激活数:</p>
                            <p>数值：${params.value?params.value:0}</p>`
                            return title
                        },
                        padding:[5,10],
                        textStyle:{
                            align:'left'
                        }
                    },
                    itemStyle: {
                        borderWidth:0,
                        label: { show: false },
                    },
                    emphasis: { 
                        label: { show: false },
                        itemStyle:{
                            areaColor:'#A4EDBA' // 高亮状态下，显示标签（默认）
                        }
                    },   
                    roam: false, // 放大缩小、平移
                },
                
            ]
        }
    }
}
// ****************

//这是地图加散点图
// export const handleSymbolSize = (type)=>{
//     let size = 1
//     if(type !=='HelloWorldThree'){
//         size = 2
//     }
//     return {
//         option:{
//             tooltip: {
//                 trigger: 'item',
//                 formatter: '{b}'
//             },
//             // geoMap:'world',
//             color:['#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48', '#8378EA', '#96BFFF'],
//             // legend:{
//             //     show:true,
//             //     selectedMode :false,
//             //     // data:worldMapScatterData
//             // },
//             // visualMap:{
//             //     show:false,
//             //     type: 'continuous', 
//             //     // min: 0,
//             //     // max: 100,
//             //     // splitNumber: 5,
//             //     inRange: {
//             //         color: ['#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48', '#8378EA', '#96BFFF'].reverse()
//             //     },
//             //     // seriesIndex: 0
//             // },
//             geo:{
//                 map: 'world', 
//                 show:true,
//                 roam: false,
//                 label: {
//                     normal: {         // 默认的文本标签显示样式
//                       show: false,
//                     },
//                     emphasis: {
//                       show: false
//                     }
//                 },
//                 // center: [115.97, 29.71],
//                 itemStyle: {        // 每个区域的样式 
//                     normal: {
//                       borderColor: '#F6F6F6',//区域边框颜色
//                       areaColor: '#F6F6F6',
//                     },
//                     emphasis: {
//                       show: false,
//                     },
//                 },
//             },
           
//             series: [
//                 //散点图
//                 // {
//                 //     name: '产品激活数',
//                 //     type: 'scatter',
//                 //     coordinateSystem: 'geo', 
                      
//                 //     data: handleScatterData(worldMapScatterData),
//                 //     symbolSize: function (val) {
//                 //         return val[2]/size;
//                 //     },
//                 //     trigger:'item',
//                 //     zlevel: 3,
//                 //     encode: {
//                 //         value: 2
//                 //     },
//                 //     tooltip:{
//                 //         position:'right',
//                 //         formatter:function (params) {
//                 //             // console.log('params',params)
//                 //             let title = `<p>${params.data.name}2021年激活数:</p>
//                 //                 <div style="text-align: center;">数值：${params.data.value[2]}</div>   
//                 //             `
//                 //             return title
//                 //         },
//                 //     },
//                 //     label: {
//                 //         formatter: '{b}',
//                 //         position: ['100%', '100%'],
//                 //         show: true,
//                 //         color:"#000",
//                 //         fontSize :10
//                 //     },
//                 //     itemStyle: {
//                 //         normal: {                  // 默认的文本标签显示样式
//                 //             // color: '#FD6B67',
//                 //             color:function(params){
//                 //                 if(params.value[2]>10&&params.value[2]< 15){
//                 //                     return '#00ff00';
//                 //                 }else if(params.value[2]>=15&&params.value[2]< 20){
//                 //                     return '#ffff00';
//                 //                 }else if(params.value[2]>=20){
//                 //                     return '#FD6B67';
//                 //                 }
//                 //             },
//                 //             show: true,
//                 //             position: 'top',      // 标签显示的位置
//                 //             formatter: '{b}'       // 标签内容格式器
//                 //         },
//                 //     },
//                 //     emphasis: {
//                 //         label: {
//                 //             show: true
//                 //         }
//                 //     }
//                 // },
//                 //地图
//                 {
//                     type: 'map',
//                     name: '世界地图',
//                     mapType: 'world', // 自定义扩展图表类型
//                     coordinateSystem: 'geo',
//                     nameMap: nameMap,
//                     itemStyle: {
//                         normal: { label: { show: false },borderWidth:0}, // 普通状态下，显示标签
//                         emphasis: { label: { show: false },areaColor: '#C5C5C5', }, // 高亮状态下，显示标签（默认）
//                     },
//                     roam: false, // 放大缩小、平移
//                 },
                
//             ]
//         }
//     }
// }