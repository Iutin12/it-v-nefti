import React from 'react';

import ReactECharts from 'echarts-for-react';
import {useRef} from 'react';
import {Text} from '@consta/uikit/Text';

import '../Chart/Chart.css'
import IPointsData from "../../types/points.type";

const dataX: number[] = [0, 100, 200, 300, 400, 500]
const dataVLP: number[] = [200, 175, 150, 125, 100, 75, 50, 50, 25, 0]
const dataIRP: number[] = [170, 170, 170, 170, 170, 170, 170, 170, 170]
const pointIntersection: number[][] = [[120, 170], [1, 1]]

// const dataX: number[] = []
// const dataVLP: number[] = []
// const dataIRP: number[] = []
// const pointIntersection: number[][] = []

interface IChartProps {
    points: IPointsData | null
}

const points = {
    "irp": {
        "Q": [
            449.520592924346,
            449.0620819195631,
            448.5855900910633,
            448.09111743884654,
            447.57866396291274,
            447.0482296632621,
            446.4998145398943,
            445.9334185928097,
            445.349041822008,
            444.7466842274894,
            444.1263458092538,
            443.48802656730123,
            442.8317265016317,
            442.1574456122451,
            441.46518389914166,
            440.75494136232123,
            440.02671800178376,
            439.28051381752937,
            438.51632880955793,
            437.7341629778696,
            436.9340163224643,
            436.1158888433419,
            435.27978054050266,
            434.42569141394637,
            433.5536214636732,
            432.663570689683,
            431.7555390919758,
            430.8295266705517,
            429.8855334254105,
            428.92355935655246,
            427.94360446397735,
            426.9456687476853,
            425.92975220767624,
            424.89585484395025,
            423.8439766565073,
            422.77411764534736,
            421.6862778104705,
            420.58045715187654,
            419.4566556695657,
            418.31487336353786,
            417.15511023379304,
            415.97736628033124,
            414.7816415031525,
            413.56793590225675,
            412.33624947764406,
            411.08658222931433,
            409.81893415726773,
            408.5333052615041,
            407.2296955420234,
            405.90810499882593,
            404.5685336319113,
            403.21098144127984,
            401.8354484269313,
            400.4419345888659,
            399.03043992708336,
            397.600964441584,
            396.1535081323676,
            394.6880709994343,
            393.20465304278383,
            391.7032542624166,
            390.1838746583323,
            388.646514230531,
            387.09117297901275,
            385.51785090377757,
            383.92654800482535,
            382.3172642821562,
            380.68999973577013,
            379.044754365667,
            377.38152817184687,
            375.7003211543099,
            374.00113331305585,
            372.2839646480848,
            370.5488151593969,
            368.7956848469919,
            367.02457371087,
            365.23548175103105,
            363.42840896747515,
            361.6033553602024,
            359.7603209292125,
            357.89930567450574,
            356.020309596082,
            354.1233326939413,
            352.20837496808355,
            350.2754364185089,
            348.3245170452172,
            346.35561684820857,
            344.36873582748296,
            342.3638739830403,
            340.34103131488087,
            338.3002078230043,
            336.2414035074108,
            334.1646183681003,
            332.0698524050729,
            329.9571056183284,
            327.82637800786705,
            325.67766957368866,
            323.5109803157933,
            321.326310234181,
            319.1236593288517,
            316.90302759980545,
            314.66441504704216,
            312.407821670562,
            310.1332474703648,
            307.8406924464506,
            305.5301565988194,
            303.2016399274713,
            300.85514243240624,
            298.49066411362423,
            296.10820497112513,
            293.70776500490916,
            291.2893442149761,
            288.85294260132616,
            286.39856016395925,
            283.9261969028754,
            281.43585281807447,
            278.9275279095567,
            276.40122217732187,
            273.8569356213701,
            271.2946682417013,
            268.7144200383155,
            266.11619101121283,
            263.4999811603931,
            260.8657904858564,
            258.2136189876028,
            255.54346666563217,
            252.8553335199446,
            250.14921955054004,
            247.42512475741847,
            244.68304914057995,
            241.92299270002445,
            239.144955435752,
            236.3489373477626,
            233.5349384360562,
            230.70295870063282,
            227.8529981414924,
            224.98505675863512,
            222.0991345520608,
            219.19523152176956,
            216.27334766776133,
            213.3334829900361,
            210.37563748859392,
            207.39981116343475,
            204.40600401455856,
            201.39421604196548,
            198.36444724565538,
            195.3166976256283,
            192.25096718188428,
            189.16725591442327,
            186.06556382324524,
            182.94589090835032,
            179.80823716973836,
            176.65260260740945,
            173.47898722136355,
            170.28739101160068,
            167.07781397812087,
            163.85025612092403,
            160.6047174400103,
            157.34119793537954,
            154.05969760703178,
            150.7602164549671,
            147.4427544791854,
            144.10731167968675,
            140.75388805647114,
            137.3824836095386,
            133.99309833888904,
            130.5857322445225,
            127.160385326439,
            123.71705758463845,
            120.25574901912101,
            116.77645962988659,
            113.27918941693518,
            109.76393838026677,
            106.23070651988141,
            102.67949383577908,
            99.11030032795975,
            95.52312599642347,
            91.9179708411702,
            88.29483486219995,
            84.6537180595128,
            80.99462043310861,
            77.31754198298742,
            73.62248270914935,
            69.90944261159423,
            66.17842169032211,
            62.42941994533312,
            58.662437376627075,
            54.87747398420409,
            51.07452976806411,
            47.25360472820729,
            43.41469886463328,
            39.55781217734248,
            35.682944666334535,
            31.79009633160975,
            27.879267173167918,
            23.95045719100915,
            20.00366638513339,
            16.038894755540685,
            12.056142302230889,
            8.0554090252043,
            4.036694924460571,
            0
        ],
        "p_wf": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            124,
            125,
            126,
            127,
            128,
            129,
            130,
            131,
            132,
            133,
            134,
            135,
            136,
            137,
            138,
            139,
            140,
            141,
            142,
            143,
            144,
            145,
            146,
            147,
            148,
            149,
            150,
            151,
            152,
            153,
            154,
            155,
            156,
            157,
            158,
            159,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            174,
            175,
            176,
            177,
            178,
            179,
            180,
            181,
            182,
            183,
            184,
            185,
            186,
            187,
            188,
            189,
            190,
            191,
            192,
            193,
            194,
            195,
            196,
            197,
            198,
            199,
            200
        ]
    },
    "vlp": {
        "q": [
            449.520592924346,
            449.0620819195631,
            448.5855900910633,
            448.09111743884654,
            447.57866396291274,
            447.0482296632621,
            446.4998145398943,
            445.9334185928097,
            445.349041822008,
            444.7466842274894,
            444.1263458092538,
            443.48802656730123,
            442.8317265016317,
            442.1574456122451,
            441.46518389914166,
            440.75494136232123,
            440.02671800178376,
            439.28051381752937,
            438.51632880955793,
            437.7341629778696,
            436.9340163224643,
            436.1158888433419,
            435.27978054050266,
            434.42569141394637,
            433.5536214636732,
            432.663570689683,
            431.7555390919758,
            430.8295266705517,
            429.8855334254105,
            428.92355935655246,
            427.94360446397735,
            426.9456687476853,
            425.92975220767624,
            424.89585484395025,
            423.8439766565073,
            422.77411764534736,
            421.6862778104705,
            420.58045715187654,
            419.4566556695657,
            418.31487336353786,
            417.15511023379304,
            415.97736628033124,
            414.7816415031525,
            413.56793590225675,
            412.33624947764406,
            411.08658222931433,
            409.81893415726773,
            408.5333052615041,
            407.2296955420234,
            405.90810499882593,
            404.5685336319113,
            403.21098144127984,
            401.8354484269313,
            400.4419345888659,
            399.03043992708336,
            397.600964441584,
            396.1535081323676,
            394.6880709994343,
            393.20465304278383,
            391.7032542624166,
            390.1838746583323,
            388.646514230531,
            387.09117297901275,
            385.51785090377757,
            383.92654800482535,
            382.3172642821562,
            380.68999973577013,
            379.044754365667,
            377.38152817184687,
            375.7003211543099,
            374.00113331305585,
            372.2839646480848,
            370.5488151593969,
            368.7956848469919,
            367.02457371087,
            365.23548175103105,
            363.42840896747515,
            361.6033553602024,
            359.7603209292125,
            357.89930567450574,
            356.020309596082,
            354.1233326939413,
            352.20837496808355,
            350.2754364185089,
            348.3245170452172,
            346.35561684820857,
            344.36873582748296,
            342.3638739830403,
            340.34103131488087,
            338.3002078230043,
            336.2414035074108,
            334.1646183681003,
            332.0698524050729,
            329.9571056183284,
            327.82637800786705,
            325.67766957368866,
            323.5109803157933,
            321.326310234181,
            319.1236593288517,
            316.90302759980545,
            314.66441504704216,
            312.407821670562,
            310.1332474703648,
            307.8406924464506,
            305.5301565988194,
            303.2016399274713,
            300.85514243240624,
            298.49066411362423,
            296.10820497112513,
            293.70776500490916,
            291.2893442149761,
            288.85294260132616,
            286.39856016395925,
            283.9261969028754,
            281.43585281807447,
            278.9275279095567,
            276.40122217732187,
            273.8569356213701,
            271.2946682417013,
            268.7144200383155,
            266.11619101121283,
            263.4999811603931,
            260.8657904858564,
            258.2136189876028,
            255.54346666563217,
            252.8553335199446,
            250.14921955054004,
            247.42512475741847,
            244.68304914057995,
            241.92299270002445,
            239.144955435752,
            236.3489373477626,
            233.5349384360562,
            230.70295870063282,
            227.8529981414924,
            224.98505675863512,
            222.0991345520608,
            219.19523152176956,
            216.27334766776133,
            213.3334829900361,
            210.37563748859392,
            207.39981116343475,
            204.40600401455856,
            201.39421604196548,
            198.36444724565538,
            195.3166976256283,
            192.25096718188428,
            189.16725591442327,
            186.06556382324524,
            182.94589090835032,
            179.80823716973836,
            176.65260260740945,
            173.47898722136355,
            170.28739101160068,
            167.07781397812087,
            163.85025612092403,
            160.6047174400103,
            157.34119793537954,
            154.05969760703178,
            150.7602164549671,
            147.4427544791854,
            144.10731167968675,
            140.75388805647114,
            137.3824836095386,
            133.99309833888904,
            130.5857322445225,
            127.160385326439,
            123.71705758463845,
            120.25574901912101,
            116.77645962988659,
            113.27918941693518,
            109.76393838026677,
            106.23070651988141,
            102.67949383577908,
            99.11030032795975,
            95.52312599642347,
            91.9179708411702,
            88.29483486219995,
            84.6537180595128,
            80.99462043310861,
            77.31754198298742,
            73.62248270914935,
            69.90944261159423,
            66.17842169032211,
            62.42941994533312,
            58.662437376627075,
            54.87747398420409,
            51.07452976806411,
            47.25360472820729,
            43.41469886463328,
            39.55781217734248,
            35.682944666334535,
            31.79009633160975,
            27.879267173167918,
            23.95045719100915,
            20.00366638513339,
            16.038894755540685,
            12.056142302230889,
            8.0554090252043,
            4.036694924460571,
            0
        ],
        "pwf": [
            62.312177127708345,
            62.30822205789899,
            62.30411615523122,
            62.299859912188246,
            62.295453839842004,
            62.29089846785495,
            62.28619434448162,
            62.28134203656811,
            62.276342129552205,
            62.27119522746657,
            62.26590195293638,
            62.260462947181686,
            62.25487887001921,
            62.249150399860284,
            62.24327823371377,
            62.237263087187664,
            62.23110569448745,
            62.224806808418364,
            62.218367200385934,
            62.21178766039703,
            62.20506899706174,
            62.19821203759269,
            62.19121762780601,
            62.184086632123496,
            62.176819933573164,
            62.16941843379056,
            62.16188305301785,
            62.1542147301072,
            62.14641442252199,
            62.13848310633503,
            62.13042177623211,
            62.122231445512575,
            62.113913146090454,
            62.105467928494654,
            62.09689686187151,
            62.088201033984966,
            62.07938155121716,
            62.07043953857272,
            62.06137613967575,
            62.05219251677206,
            62.04288985073445,
            62.033469341057426,
            62.02393220586365,
            62.014279681902025,
            62.004513024551635,
            61.99463350781974,
            61.98464242434575,
            61.97454108540193,
            61.96433082089255,
            61.954012979359625,
            61.94358892797823,
            61.933060052563704,
            61.92242775756883,
            61.911693466087605,
            61.90085861985425,
            61.88992467924668,
            61.87889312328657,
            61.86776544964089,
            61.85654317462485,
            61.845227833199296,
            61.83382097897691,
            61.82232418421942,
            61.81073903984097,
            61.79906715541047,
            61.78731015914956,
            61.775469697937574,
            61.763547437310365,
            61.75154506146226,
            61.73946427324879,
            61.72730679418635,
            61.71507436445377,
            61.702768742893596,
            61.69039170701446,
            61.67794505299041,
            61.66543059566496,
            61.65285016855057,
            61.64020562382784,
            61.627498832352074,
            61.61473168365055,
            61.60190608592403,
            61.589023966049254,
            61.57608726958023,
            61.563097960747356,
            61.55005802246254,
            61.53696945631544,
            61.52383428257925,
            61.510654540209124,
            61.49743228684316,
            61.48416959880592,
            61.47086857110655,
            61.45753131744297,
            61.444159970200324,
            61.430756680453236,
            61.417323617966424,
            61.40386297119676,
            61.390376947293284,
            61.37686777209728,
            61.363337690146395,
            61.34978896467217,
            61.33622387760225,
            61.32264472956179,
            61.3090538398745,
            61.29545354656159,
            61.281846206345165,
            61.26823419464643,
            61.254619905588115,
            61.241005751995665,
            61.2273941653957,
            61.2137875960196,
            61.200188512801326,
            61.186599403379,
            61.17302277409695,
            61.1594611500043,
            61.14591707485648,
            61.1323931111146,
            61.1188918399481,
            61.10541586123169,
            61.09196779354968,
            61.07855027419277,
            61.065165959160424,
            61.05181752316108,
            61.03850765961014,
            61.02523908063334,
            61.01201451706394,
            60.99883671844423,
            60.985708453026234,
            60.972632507769575,
            60.95961168834262,
            60.946648819123006,
            60.933746743195755,
            60.92090832235442,
            60.90813643709989,
            60.89543398664114,
            60.88280388889254,
            60.87024908047663,
            60.85777251672117,
            60.845377171658825,
            60.83306603802698,
            60.82084212726856,
            60.80870846952759,
            60.79666811365117,
            60.784724127189115,
            60.77287959639031,
            60.761137626203606,
            60.74950134027626,
            60.73797388095345,
            60.726558409275405,
            60.715258104977664,
            60.70407616649002,
            60.6930158109322,
            60.68208027411666,
            60.671272810543456,
            60.66059669340005,
            60.65005521455983,
            60.639651684579846,
            60.629389432698254,
            60.6192718068339,
            60.609302173584325,
            60.599483918219775,
            60.58982044468727,
            60.58031517560351,
            60.570971552253354,
            60.56179303459031,
            60.55278310122923,
            60.54394524944728,
            60.53528299518017,
            60.526799873018824,
            60.51849943620745,
            60.51038525663922,
            60.50246092485457,
            60.49473005003597,
            60.48719626000832,
            60.47986320123084,
            60.472734538797575,
            60.46581395643099,
            60.45910515648046,
            60.45261185991662,
            60.44633780632897,
            60.44028675392055,
            60.43446247950523,
            60.42886877850129,
            60.42350946492973,
            60.41838837140864,
            60.41350934914749,
            60.408876267943995,
            60.404493016179316,
            60.400363500811636,
            60.39649164737316,
            60.39288139996333,
            60.389536721244355,
            60.386461592435325,
            60.383660013307306,
            60.38113600217749,
            60.37889359590294,
            60.376936849875335,
            60.37526983801349,
            60.37389665276082,
            60.372821405074575,
            60.372048224421206,
            60.37158125877179,
            60.371424674592184
        ]
    },
    "point": [
        61,
        388.646514230531
    ]
}

const Chart: React.FC<IChartProps> = ({}) => {
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
                [points?.point].map((value, index) => (
                    <Text size='l' align='left' key={index} className='text-under-chart'>Точка пересечения {index + 1}
                        : ({Number(value[1].toFixed(2))}; {Number(value[0].toFixed(2))})</Text>)) :
                <Text>Точек пересечения нет</Text>}
        </div>
    )
}
export default Chart