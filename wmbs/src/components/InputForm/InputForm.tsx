import './InputForm.css';
import ParamAndValue from "../ParamAndValue/ParamAndValue";
import {Text} from "@consta/uikit/Text";
import {Grid, GridItem} from "@consta/uikit/Grid";
import {Button} from "@consta/uikit/Button";
import data from '../../data';
import {Layout} from "@consta/uikit/Layout";
import {useState} from "react";
import {Modal} from "@consta/uikit/Modal";


const initialState = data.reduce((prev, curr) => {
    prev[curr.id] = null
    return prev
}, {}as {[key:string]:number| null})

const InputForm = () => {
    const [isModalClearOpen, setIsModalClearOpen] = useState(false);
    const [isModalCalcOpen, setIsModalCalcOpen] = useState(false);
    const [valid, setValid] = useState(true)

    const [form, setForm] = useState(initialState)

    const onChange = (name:string, value:number|null) => {
        setForm((prev) => ({...prev, [name]:value}))
    }

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
                <Button className={'input-form-btn-clear'} label="Очистить"
                        onClick={() => setIsModalClearOpen(true)}></Button>
                <Button className={'input-form-btn-calc'} label="Рассчитать"
                        onClick={() => setIsModalCalcOpen(true)}></Button>
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
                    // onClick={}
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
                    // onClick={}
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
