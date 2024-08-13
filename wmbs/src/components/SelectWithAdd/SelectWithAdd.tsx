import {Select} from "@consta/uikit/Select";
import {useEffect, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {IconAdd} from '@consta/icons/IconAdd';
import {TextField, TextFieldPropValue} from "@consta/uikit/TextField";
import './SelectWithAdd.css';
import {Text} from "@consta/uikit/Text";
import {Modal} from "@consta/uikit/Modal";
import IOilfieldData from "../../types/oilfield.type";
import {Layout} from "@consta/uikit/Layout";
import ApiService from "../../service/ApiService";
import IWellsData from "../../types/wells.type";

const SelectWithAdd = () => {

    const [valueOilfield, setValueOilfield] = useState<string | null>('');
    const [valueWell, setValueWell] = useState<string | null>('');

    const [selectValueOilfield, setSelectValueOilfield] = useState<IOilfieldData | null>();
    const [selectValueWell, setSelectValueWell] = useState<IWellsData | null>();

    const [hideOilfield, setHideOilfield] = useState<boolean>(true);
    const [hideWell, setHideWell] = useState<boolean>(true);

    const [isModalOilfieldOpen, setIsModalOilfieldOpen] = useState(false);
    const [isModalWellOpen, setIsModalWellOpen] = useState(false);

    const [oilfield, setOilfield] = useState<Array<IOilfieldData>>([]);
    const [wells, setWells] = useState<Array<IWellsData>>([]);

    const getOilfield = () => {
        ApiService.getOilfield()
            .then((response: any) => {
                setOilfield(response.data);
            })
            .catch(error => {
                console.error('Error occurred:', error);
            });
    }

    const getWells = (id: string) => {
        ApiService.getWells(id)
            .then((response: any) => {
                setWells(response.data);
            })
            .catch(error => {
                console.error('Error occurred:', error);
            });
    }

    useEffect(() => {
        getOilfield();
    }, []);

    const addField = () => {
        ApiService.postOilfield(valueOilfield || '').then((response) => {
            getOilfield();
            setSelectValueOilfield(response.data);
            setValueOilfield(null);
        });
        setIsModalOilfieldOpen(false);
        setHideOilfield(true);
    }

    const addWell = () => {
        ApiService.postLinkWell(valueWell || '', selectValueOilfield?.id || '').then((response) => {
            getWells(selectValueOilfield?.id || '');
            console.log(response);
            setSelectValueWell(response.data.well);
            setValueWell(null);
        })
        setIsModalWellOpen(false);
        setHideWell(true);

    }
    const [error, setError] = useState('');

    // Регулярное выражение для проверки кириллицы и латиницы
    const regex = /^[A-Za-zА-Яа-яЁё0-9\s]+$/; // Разрешаем латиницу, кириллицу, цифры и пробелы

    const onClickOilfield = () => {
        // Проверяем, соответствует ли введенное значение регулярному выражению
        if (valueOilfield && regex.test(valueOilfield)) {
            setIsModalOilfieldOpen(true);
        } else {
            setError('Введите только буквы кириллицы или латиницы'); // Устанавливаем сообщение об ошибке
        }
    };

    const onClickWell = () => {
        // Проверяем, соответствует ли введенное значение регулярному выражению
        if (valueWell && regex.test(valueWell)) {
            setIsModalWellOpen(true);
        } else {
            setError('Введите только буквы кириллицы или латиницы'); // Устанавливаем сообщение об ошибке
        }
    };

    const selectChanged = (value: IOilfieldData | null) => {
        setSelectValueOilfield(value);
        value && getWells(value.id);
    }

    return <Layout>
        <div className={'select-and-add'}>
            <div className={'select-div'}>
                <Select
                    getItemLabel={(item) => item.field_name}
                    getItemKey={(item) => item.id}
                    label='Месторождение'
                    placeholder="Выберите значение"
                    items={oilfield}
                    value={selectValueOilfield}
                    onChange={(val) => selectChanged(val)}
                    form={'round'}
                    size={'s'}
                    disabled={!hideOilfield}
                />
                <Button className={'select-div-btn'} form="round" iconLeft={IconAdd} onlyIcon size={'s'}
                        disabled={!hideOilfield}
                        onClick={() => setHideOilfield(false)}/>
            </div>
            <div className={hideOilfield ? 'input-div hide' : 'input-div'}>
                <TextField caption={error} placeholder="Введите название" onChange={setValueOilfield}
                           value={valueOilfield ?? ''}
                           size={'s'}/>
                <Button className={'input-div-btn'} label="Добавить" size={'s'} onClick={() => onClickOilfield()}/>
            </div>

            <Modal
                isOpen={isModalOilfieldOpen}
                hasOverlay
                onEsc={() => setIsModalOilfieldOpen(false)}
                className={'modal-add'}
            >
                <Text as="p" size="m" view="secondary" lineHeight="m">
                    <>
                        Вы точно хотите добавить {valueOilfield}?
                    </>
                </Text>
                <div className={'modal-btns'}>
                    <Button
                        size="m"
                        view="primary"
                        label="Да"
                        onClick={() => addField()}
                    />
                    <Button
                        size="m"
                        view="secondary"
                        label="Нет"
                        onClick={() => setIsModalOilfieldOpen(false)}
                    />
                </div>
            </Modal>

        </div>
        <div className={'select-and-add'}>
            <div className={'select-div'}>
                <Select
                    getItemLabel={(item) => item.well_number}
                    getItemKey={(item) => item.id}
                    label='Скважина'
                    placeholder="Выберите значение"
                    items={wells}
                    value={selectValueWell}
                    onChange={setSelectValueWell}
                    form={'round'}
                    size={'s'}
                    disabled={!hideWell}
                />
                <Button className={'select-div-btn'} form="round" iconLeft={IconAdd} onlyIcon size={'s'}
                        disabled={!hideWell}
                        onClick={() => setHideWell(false)}/>
            </div>
            <div className={hideWell ? 'input-div hide' : 'input-div'}>
                <TextField caption={error} placeholder="Введите название" onChange={setValueWell}
                           value={valueWell ?? ''}
                           size={'s'}/>
                <Button className={'input-div-btn'} label="Добавить" size={'s'} onClick={() => onClickWell()}/>
            </div>

            <Modal
                isOpen={isModalWellOpen}
                hasOverlay
                onEsc={() => setIsModalWellOpen(false)}
                className={'modal-add'}
            >
                <Text as="p" size="m" view="secondary" lineHeight="m">
                    <>
                        Вы точно хотите добавить {valueWell}?
                    </>
                </Text>
                <div className={'modal-btns'}>
                    <Button
                        size="m"
                        view="primary"
                        label="Да"
                        onClick={() => addWell()}
                    />
                    <Button
                        size="m"
                        view="secondary"
                        label="Нет"
                        onClick={() => setIsModalWellOpen(false)}
                    />
                </div>
            </Modal>

        </div>
    </Layout>
}

export default SelectWithAdd