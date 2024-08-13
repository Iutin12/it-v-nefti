import SelectWithAdd from "./components/SelectWithAdd/SelectWithAdd";

const data = [
    {
        text: 'Давление на устье скважины, бар',
        min: 1,
        max: 20,
        step: 1,
    },
    {
        text: 'Глубина скважины, м',
        min: 1000,
        max: 3000,
        step: 1,
    },
    {
        text: 'Cжимаемость флюида (воды), 1/Па (e-9)',
        min: 4,
        max: 6,
        step: 0.1,
    },
    {
        text: 'Плотность флюида, кг/м3',
        min: 700,
        max: 1000,
        step: 1,
    },
    {
        text: 'Диаметр трубы, м',
        min: 0.09,
        max: 0.2,
        step: 0.01,
    },
    {
        text: 'Угол наклона скважины к горизонту, градусы',
        min: 0,
        max: 90,
        step: 1,
    },
    {
        text: 'Участков скважины, ед',
        min: 1,
        max: 1000,
        step: 1,
    },
    {
        text: 'Коэффициент трения Муди',
        min: 0.1,
        max: 0.9,
        step: 0.1,
    },
    {
        text: 'Начальный дебит жидкости, м3/сут',
        min: 0,
        max: 100,
        step: 1,
    },
    {
        text: 'Проницаемость пласта, мД',
        min: 1,
        max: 100,
        step: 1,
    },
    {
        text: 'Толщина пласта, м',
        min: 0.1,
        max: 100,
        step: 0.1,
    },
    {
        text: 'Вязкость флюида, сП',
        min: 0.1,
        max: 100,
        step: 0.1,
    },
    {
        text: 'Объемный коэффициент флюида',
        min: 1,
        max: 2.1,
        step: 0.1,
    },
    {
        text: 'Давление насыщения, бар',
        min: 1,
        max: 100,
        step: 1,
    },
    {
        text: 'Среднее пластовое давление, бар',
        min: 100,
        max: 300,
        step: 1,
    },
    {
        text: 'Радиус контура питания скважины, м',
        min: 100,
        max: 1000,
        step: 1,
    },
    {
        text: 'Радиус скважины, м',
        min: 0.05,
        max: 0.3,
        step: 0.01,
    },
    {
        text: 'Скин-фактор скважины',
        min: -3,
        max: 10,
        step: 1,
    },
];

export default data;