import React from 'react';

import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { Text } from '@consta/uikit/Text';

import '../Chart/Chart.css'

const dataX: number[] = [0, 100, 200, 300, 400, 500]
const dataVLP: number[] = [200, 175, 150, 125, 100, 75, 50, 50, 25, 0]
const dataIRP: number[] = [170, 170, 170, 170, 170, 170, 170, 170, 170]
const pointIntersection: number[][] = [[120, 170]]

// const dataX: number[] = []
// const dataVLP: number[] = []
// const dataIRP: number[] = []
// const pointIntersection: number[][] = []

const Chart: React.FC = () => {
    const chartRef = useRef<ReactECharts>(null)

    const dataFuncVLP: number[][] = dataX.map((value, index) => [value, dataVLP[index]])
    const dataFuncIRP: number[][] = dataX.map((value, index) => [value, dataIRP[index]])

    const options = {
        animation: false,
        grid: {
            show: true,
            top: '8%',
            bottom: '12%',
            width: '80%',
            height: '500px'
        },
        legend: {
            data: dataVLP.length !== 0 || dataIRP.length !== 0 ? ['VLP', 'IRP'] : [],
            textStyle: {
                fontFamily: 'monospace'
            },
            selectedMode: false
        },
        xAxis: {
            type: 'value',
            name: 'Дебит, м3/сут',
            nameGap: 20,
            nameLocation: 'center',
            nameTextStyle: {
                color: 'black',
                fontFamily: 'serif',
                fontSize: 16
            },
            data: dataX,
        },
        yAxis: {
            type: 'value',
            name: 'Забойное давление, атм',
            nameGap: 40,
            nameLocation: 'center',
            nameTextStyle: {
                color: 'black',
                fontFamily: 'serif',
                fontSize: 16
            },
        },
        series: [
            {
                name: 'IRP',
                data: dataFuncVLP,
                type: 'line',
                showSymbol: false,
                smooth: true
            },
            {
                name: 'VLP',
                data: dataFuncIRP,
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
            })) : [])

        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }

            },
            textStyle: {
                color: '#000'
            },
            formatter: function (params: any) {
                if (params) {
                    let tooltipContent = '';
                    params.forEach(function (item: any) {
                        tooltipContent += `${item.seriesName} (${item.data[0]}; ${item.data[1]})<br />`;
                    });
                    return tooltipContent;
                }
            }
        },
    };
    return (
        <>
            <ReactECharts ref={chartRef} option={options} className={'chart'} />
            {pointIntersection ?
                pointIntersection.map((data, index) => (<Text size='l' align='left' key={index} className='text-under-chart'>Точка пересечения {index + 1}
                    : ({data[0]}; {data[1]})</Text>)) : <Text>Точек пересечения нет</Text>}
        </>
    )
}
export default Chart