import SelectWithAdd from "../SelectWithAdd/SelectWithAdd";
import './InputForm.css';
import ParamAndValue from "../ParamAndValue/ParamAndValue";
import {Text} from "@consta/uikit/Text";
import {Grid, GridItem} from "@consta/uikit/Grid";
import {Button} from "@consta/uikit/Button";
import data from '../../data';
import {Layout} from "@consta/uikit/Layout";
import { useState } from "react";


const initialState = data.reduce((prev, curr) => {
    prev[curr.id] = null
    return prev
}, {}as {[key:string]:number| null})

const InputForm = () => {
    const [value, setValue] = useState(0)
    const [valid, setValid] = useState(true)

    const [form, setForm] = useState(initialState)

    const onChange = (name:string, value:number|null) => {
        setForm((prev) => ({...prev, [name]:value}))
    }

    console.log(form)
    return <Layout>
        {/* Форма для заполнения данных для графика */}
        <Grid cols={2} gap="s" className={'input-form'}>
            {/* Название столбцов */}
            <GridItem><Text size={'l'} align={'center'}>Параметр</Text></GridItem>
            <GridItem><Text size={'l'} align={'center'}>Значение</Text></GridItem>

            {/* Формы */}
            {data.map((item, index) => <ParamAndValue value={form[item.id]} id={item.id} text={item.text} min={item.min} max={item.max} measure={item.measure} key={index} onChange={onChange}/>)}
            {/* Кнопки */}
            <GridItem col={2} className={'input-form-btns'}>
                <Button className={'input-form-btn-clear'} label="Очистить"></Button>
                <Button className={'input-form-btn-calc'} label="Рассчитать"></Button>
            </GridItem>
        </Grid>
    </Layout>
}

export default InputForm
