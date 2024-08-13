import React from 'react';

import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { Text } from '@consta/uikit/Text';

const massivX: number[] = [0, 100, 200, 300, 400, 500]
const massivA: number[] = [200, 175, 150, 125, 100, 75, 50, 50, 25, 0]
const massivB: number[] = [170, 170, 170, 170, 170, 170, 170, 170, 170]
const pointIntersection: number[][] = [[120, 170]]

const Chart: React.FC = () => {
 const chartRef = useRef<ReactECharts>(null)

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

       ...(pointIntersection ? pointIntersection.map((data, index) => ({
         name: `point${index + 1}`,
         type: 'scatter',
         data: [data],
         symbolSize: 10,
         itemStyle: {
             color: 'red',
         },
         zlevel: 1 
       } )) : [])

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
   console.log(pointIntersection.map((data, index) => ({
     name: `point${index + 1}`,
     type: 'scatter',
     data: [data],
     symbolSize: 10,
     itemStyle: {
         color: 'red',
     },
     zlevel: 1 
   } )))
 return (
     <>
         <ReactECharts ref={chartRef} option={options} />
         {pointIntersection ? pointIntersection.map((data, index) => (<Text size='m' key={index}>Точка пересечения {index+1}: ({data[0]}; {data[1]})</Text>)) : <Text>Точек пересечения нет</Text>}
     </>
 )
}
export default Chart