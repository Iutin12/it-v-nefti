import './InputForm.css';
import ParamAndValue from "../ParamAndValue/ParamAndValue";
import {Text} from "@consta/uikit/Text";
import {Grid, GridItem} from "@consta/uikit/Grid";
import {Button} from "@consta/uikit/Button";
import data from '../../data';
import {Layout} from "@consta/uikit/Layout";
import React, {useState} from "react";
import {Modal} from "@consta/uikit/Modal";
import IWellsAndOilfieldData from "../../types/wellsAndOilfield.type";
import ApiService from "../../service/ApiService";
import IPointsData from "../../types/points.type";


const initialState = data.reduce((prev, curr) => {
    prev[curr.id] = {value: null, min: curr.min, max: curr.max}

    return prev
}, {} as { [key: string]: { value: number | null, min: number, max: number } })

interface InputFormProps {
    disabled: boolean,
    selects: IWellsAndOilfieldData | null,
    setPoints: (points: IPointsData | null) => void,
}

const InputForm: React.FC<InputFormProps> = (props) => {
    const [value, setValue] = useState(0)
    const [valid, setValid] = useState(true)
    const [isModalClearOpen, setIsModalClearOpen] = useState(false);
    const [isModalCalcOpen, setIsModalCalcOpen] = useState(false);

    const [form, setForm] = useState(initialState)

    const isValid = Object.values(form).every(({value, min, max}) => value && value >= min && value <= max)

    const onChange = (name: string, value: number | null) => {
        setForm((prev) => ({...prev, [name]: {...prev[name], value}}))
    }

    const onReset = () => {
        setForm(initialState);
        setIsModalClearOpen(false);
    }

    const sendData = () => {
        const measurements = Object.entries(form).reduce((prev, [key, value]) => {
            prev[key] = value.value
            return prev
        }, {} as any)

        console.log(measurements);

        const data = {StartPwl: 0, EndPwf: 200, StepPwf: 15, WellId: props.selects?.well.id, ...measurements}
        ApiService.postCalc(data).then((response: any) => {
            props.setPoints(response.data);
        }).catch(error => {
            console.error('Error occurred:', error);
        });
        setIsModalCalcOpen(true);

    }

    return <Layout>
        {/* Форма для заполнения данных для графика */}
        <Grid cols={2} gap="s" className={'input-form'}>
            {/* Название столбцов */}
            <GridItem><Text size={'l'} align={'center'}>Параметр</Text></GridItem>
            <GridItem><Text size={'l'} align={'center'}>Значение</Text></GridItem>

            {/* Формы */}
            {data.map((item, index) => <ParamAndValue value={form[item.id].value} id={item.id} text={item.text}
                                                      min={item.min} max={item.max} measure={item.measure} key={item.id}
                                                      disabled={props.disabled}
                                                      onChange={onChange}/>)}
            {/* Кнопки */}
            <GridItem col={2} className={'input-form-btns'}>
                <Button className={'input-form-btn-clear'} label="Очистить"
                        onClick={() => setIsModalClearOpen(true)}></Button>
                <Button className={'input-form-btn-calc'} label="Рассчитать"
                        onClick={() => setIsModalCalcOpen(true)} disabled={!isValid}></Button>
            </GridItem>
        </Grid>


        <Modal
            isOpen={isModalClearOpen}
            hasOverlay
            onEsc={() => setIsModalClearOpen(false)}
            className={'modal'}
        >
            <Text as="p" size="m" view="secondary" lineHeight="m">
                Вы точно хотите очистить?
            </Text>
            <div className={'modal-btns'}>
                <Button
                    size="m"
                    view="primary"
                    label="Да"
                    onClick={onReset}
                />
                <Button
                    size="m"
                    view="secondary"
                    label="Нет"
                    onClick={() => setIsModalClearOpen(false)}
                />
            </div>
        </Modal>
        <Modal
            isOpen={isModalCalcOpen}
            hasOverlay
            onEsc={() => setIsModalCalcOpen(false)}
            className={'modal'}
        >
            <Text as="p" size="m" view="secondary" lineHeight="m">
                Вы точно хотите рассчитать?
            </Text>
            <div className={'modal-btns'}>
                <Button
                    size="m"
                    view="primary"
                    label="Да"
                    onClick={sendData}
                />
                <Button
                    size="m"
                    view="secondary"
                    label="Нет"
                    onClick={() => setIsModalCalcOpen(false)}
                />
            </div>
        </Modal>
    </Layout>
}

export default InputForm
