import './InputForm.css';
import ParamAndValue from "../ParamAndValue/ParamAndValue";
import {Text} from "@consta/uikit/Text";
import {Grid, GridItem} from "@consta/uikit/Grid";
import {Button} from "@consta/uikit/Button";
import data from '../../data';
import {Layout} from "@consta/uikit/Layout";
import {useState} from "react";
import {Modal} from "@consta/uikit/Modal";

const InputForm = () => {
    const [isModalClearOpen, setIsModalClearOpen] = useState(false);
    const [isModalCalcOpen, setIsModalCalcOpen] = useState(false);

    return <Layout>
        <Grid cols={2} gap="s" className={'input-form'}>
            <GridItem><Text size={'l'} align={'center'}>Параметр</Text></GridItem>
            <GridItem><Text size={'l'} align={'center'}>Значение</Text></GridItem>

            {data.map((item, index) => <ParamAndValue text={item.text} min={item.min} max={item.max}
                                                      step={item.step} value={item.min.toString()} key={index}/>)}
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