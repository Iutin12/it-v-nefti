import SelectWithAdd from "../SelectWithAdd/SelectWithAdd";
import './InputForm.css';
import ParamAndValue from "../ParamAndValue/ParamAndValue";
import {Text} from "@consta/uikit/Text";
import {Grid, GridItem} from "@consta/uikit/Grid";
import {Button} from "@consta/uikit/Button";
import data from '../../data';
import {Layout} from "@consta/uikit/Layout";

const InputForm = () => {

    return <Layout>
        <Grid cols={2} gap="s" className={'input-form'}>
            <GridItem><Text size={'l'} align={'center'}>Параметр</Text></GridItem>
            <GridItem><Text size={'l'} align={'center'}>Значение</Text></GridItem>

            {data.map((item, index) => <ParamAndValue text={item.text} min={item.min} max={item.max}
                                                      step={item.step} value={item.min.toString()} key={index}/>)}
            <GridItem col={2} className={'input-form-btns'}>
                <Button className={'input-form-btn-clear'} label="Очистить"></Button>
                <Button className={'input-form-btn-calc'} label="Рассчитать"></Button>
            </GridItem>
        </Grid>
    </Layout>
}

export default InputForm