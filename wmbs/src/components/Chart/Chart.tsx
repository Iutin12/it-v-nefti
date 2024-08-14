import React from 'react';

import ReactECharts from 'echarts-for-react';
import {useRef} from 'react';
import {Text} from '@consta/uikit/Text';

import '../Chart/Chart.css'
import IPointsData from "../../types/points.type";

const dataX: number[] = [0, 100, 200, 300, 400, 500]
const dataVLP: number[] = [200, 175, 150, 125, 100, 75, 50, 50, 25, 0]
const dataIRP: number[] = [170, 170, 170, 170, 170, 170, 170, 170, 170]
const pointIntersection: number[][] = [[120, 170], [1,1]]

// const dataX: number[] = []
// const dataVLP: number[] = []
// const dataIRP: number[] = []
// const pointIntersection: number[][] = []

interface IChartProps {
    points: IPointsData | null
}

//const points = {"point":[60,390.1838746583323],"vlp":{"pwf":[70.54182221840831,70.46682936495094,70.3598808668522,70.22396521725214,70.06301463850215,69.8819050781926,69.68645620482158,69.48343140348776,69.28053777205795,69.08642611833744,68.91069095883351,68.76387051978514,68.65744674119583,68.60384528468404,68.61643554604038],"q":[449.520592924346,440.75494136232123,427.94360446397735,411.08658222931433,390.1838746583323,365.23548175103105,336.2414035074108,303.2016399274713,266.11619101121283,224.98505675863512,179.80823716973836,130.5857322445225,77.31754198298742,20.00366638513339,-41.35589454903987]},"irp":{"Q":[449.520592924346,440.75494136232123,427.94360446397735,411.08658222931433,390.1838746583323,365.23548175103105,336.2414035074108,303.2016399274713,266.11619101121283,224.98505675863512,179.80823716973836,130.5857322445225,77.31754198298742,20.00366638513339,-41.35589454903987],"p_wf":[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210]}}

const Chart: React.FC<IChartProps> = ({points}) => {
    const chartRef = useRef<ReactECharts>(null)

    const newQ: number[] | undefined = points?.vlp.q.map(value => Number(value.toFixed(2)))

    const dataFuncIRP: number[][] | undefined = newQ?.map((value, index) => [value, Number(points?.vlp.pwf[index].toFixed(2))])
    const dataFuncVLP: number[][] | undefined = newQ?.map((value, index) => [value, Number(points?.irp.p_wf[index].toFixed(2))])

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
            data: dataFuncVLP || dataFuncIRP ? ['VLP', 'IRP'] : [],
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
            data: newQ,
            splitLine: {
                show: true, 
                lineStyle: {
                    type: 'dashed'
                }
            }
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
            splitLine: {
                show: true, 
                lineStyle: {
                    type: 'dashed'
                }
            }
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

            points?.point ?
                    {
                    name: `point${1}`,
                    type: 'scatter',
                    data: [[Number(points?.point[1].toFixed(2)), Number(points?.point[0].toFixed(2))]],
                    symbolSize: 10,
                    itemStyle: {
                        color: 'red',
                    },
                    zlevel: 1
                } : {}

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
        <div className={points == null ? 'hide' : ''}>
            <ReactECharts ref={chartRef} option={options} className='chart'/>

            {points?.point ?
                [points?.point].map((value, index) => (<Text size='l' align='left' key={index} className='text-under-chart'>Точка пересечения {index + 1}
                        : ({Number(value[1].toFixed(2))}; {Number(value[0].toFixed(2))})</Text>)) : <Text>Точек пересечения нет</Text>}
        </div>
    )
}
export default Chart