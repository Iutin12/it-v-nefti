import React from 'react';

import ReactECharts from 'echarts-for-react';
import { useEffect, useRef, useState } from 'react';

const massivX: number[] = [0, 100, 200, 300, 400, 500]
const massivA: number[] = [200, 175, 150, 125, 100, 75, 50, 50, 25, 0]
const massivB: number[] = [170, 170, 170, 170, 170, 170, 170, 170, 170]
const pointInterspection: number[][] = [[120, 170],[1, 0]]

const Chart: React.FC = () => {
 // let [indexPoint, setIndexPoint] = useState(1)
 const chartRef = useRef<ReactECharts>(null)
 // useEffect(() => {   
 //     for (let i = 0; i<pointInterspection.length; i++) {
 //         chartRef.current?.getEchartsInstance().setOption({
 //             series: [{
 //                 name: `point${i+1}`,
 //                 type:'scatter',
 //                 data: [pointInterspection[i]],
 //                 symbolSize: 10,
 //                 itemStyle: {
 //                     color: 'red',
 //                 },
 //                 zlevel: 1 
 //         }],
 //     })
 //     console.log(i, pointInterspection)
 // }
 // }, [])

 const dataFunc1: number[][] = massivX.map((value, index) => [value, massivA[index]])
 const dataFunc2: number[][] = massivX.map((value, index) => [value, massivB[index]])

 const options = {
     animation: false,
     grid: {
         show: true,
         top: '8%',
         bottom: '12%',
         width: 550, 
         height: 'auto'
       },
       legend: {
         data: ['VLP', 'IRP'],
         selectedMode: false
       },
       xAxis: {
         type: 'value',
         name: 'дебит, м3/сут',
         nameGap: 20,
         nameLocation: 'center',
         nameTextStyle: {
             color: 'black'
         },
         data: massivX,
       },
       yAxis: {
         type: 'value',
         name: 'забойное давление, атм',
         nameGap: 40,
         nameLocation: 'center',
         nameTextStyle: {
             color: 'black'
         },
       },
     series: [
       {
         name: 'IRP',
         data: dataFunc1,
         type: 'line',
         showSymbol: false,
         smooth: true
       },
       {
         name: 'VLP',
         data: dataFunc2,
         type: 'line',
         showSymbol: false,
         smooth: true
       },
     //   { 
     //     name: `point${1}`,
     //     type: 'scatter',
     //     symbolSize: 10,
     //     itemStyle: {
     //         color: 'red',
     //     },
     //     zlevel: 1 
     //   } ,
     //   { 
     //     name: `point${2}`,
     //     type: 'scatter',
     //     symbolSize: 10,
     //     itemStyle: {
     //         color: 'red',
     //     },
     //     zlevel: 1 
     //   } ,
       pointInterspection.map((data, index) => ({
         name: `point${index + 1}`,
         type: 'scatter',
         data: [data],
         symbolSize: 10,
         itemStyle: {
             color: 'red',
         },
         zlevel: 1 
       } )),

     ],
     tooltip: { 
         trigger: 'axis',
         axisPointer: { 
             type: 'cross', 
             crossStyle: { 
                 color: '#999' 
             } 
         }, 
         formatter: function(params:any) { 
             let tooltipContent = ''; 
             params.forEach(function(item:any) { 
                 tooltipContent += `(${item.data[0]}, ${item.data[1]})<br />`; 
             }); 
             return tooltipContent; 
         } 
     },    
     
   };


   console.log(pointInterspection.map((data, index) => ({
     name: `point${index + 1}`,
     type: 'scatter',
     data: [data],
     symbolSize: 10,
     itemStyle: {
         color: 'red',
     },
     zlevel: 1 
   } )))
 //   console.log(chartRef.current?.getEchartsInstance().getOption)

 //   const addInsterseptionMark = (point: number[]) => {


 //     console.log(indexPoint, point)
 //     chartRef.current?.getEchartsInstance().setOption({
 //         series: [{
 //             name: `point`,
 //             type:'scatter',
 //             data: point,
 //             symbolSize: 10,
 //             itemStyle: {
 //                 color: 'red',
 //             },
 //             zlevel: 1 
 //     }],
 //     })
     
 //     console.log(indexPoint, point)
 //   }

 return (
     <>
         <ReactECharts ref={chartRef} option={options} />;
     </>
 )
}
export default Chart