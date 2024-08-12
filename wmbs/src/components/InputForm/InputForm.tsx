import SelectWithAdd from "../SelectWithAdd/SelectWithAdd";
import './InputForm.css';
import ParamAndValue from "../ParamAndValue/ParamAndValue";
import {Text} from "@consta/uikit/Text";
import {Grid, GridItem} from "@consta/uikit/Grid";
import {Button} from "@consta/uikit/Button";

const InputForm = () =>{
    return <Grid cols={2} gap="xl" className={'input-form'}>
        <GridItem col={2}><SelectWithAdd label={'Месторождение'}/></GridItem>
        <GridItem col={2}><SelectWithAdd label={'Скважина'}/></GridItem>
        <GridItem><Text size={'l'} align={'center'}>Параметр</Text></GridItem>
        <GridItem><Text size={'l'} align={'center'}>Значение</Text></GridItem>
        <ParamAndValue text={'Давление на устье скважины, бар'}/>
        <ParamAndValue text={'Глубина скважины, м'}/>
        <ParamAndValue text={'Cжимаемость флюида (воды), 1/Па'}/>
        <ParamAndValue text={'Плотность флюида, кг/м3'}/>
        <ParamAndValue text={'Диаметр трубы, м'}/>
        <ParamAndValue text={'Угол наклона скважины к горизонту, градусы'}/>
        <ParamAndValue text={'Участков скважины, ед'}/>
        <ParamAndValue text={'Коэффициент трения Муди'}/>
        <ParamAndValue text={'Начальный дебит жидкости, м3/сут'}/>
        <ParamAndValue text={'Проницаемость пласта, мД'}/>
        <ParamAndValue text={'Толщина пласта, м'}/>
        <ParamAndValue text={'Вязкость флюида, сП'}/>
        <ParamAndValue text={'Объемный коэффициент флюида'}/>
        <ParamAndValue text={'Давление насыщения, бар'}/>
        <ParamAndValue text={'Среднее пластовое давление, бар'}/>
        <ParamAndValue text={'Радиус контура питания скважины, м'}/>
        <ParamAndValue text={'Радиус скважины, м'}/>
        <ParamAndValue text={'Скин-фактор скважины'}/>
        <GridItem col={2} className={'input-form-btns'}>
            <Button className={'input-form-btn-clear'} label="Очистить"></Button>
            <Button className={'input-form-btn-send'} label="Отправить"></Button>
        </GridItem>

    </Grid>
}

export default InputForm