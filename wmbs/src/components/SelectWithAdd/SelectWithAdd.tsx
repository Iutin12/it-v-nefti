import {Select} from "@consta/uikit/Select";
import {useState} from "react";
import {Button} from "@consta/uikit/Button";
import {IconAdd} from '@consta/icons/IconAdd';
import {TextField, TextFieldPropValue} from "@consta/uikit/TextField";
import './SelectWithAdd.css';
import {Text} from "@consta/uikit/Text";
import {Modal} from "@consta/uikit/Modal";

interface SelectWithAddProps {
    label: string;
}

const SelectWithAdd: React.FC<SelectWithAddProps> = (props) => {

    const [value, setValue] = useState<string | null>('');
    const [hide, setHide] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    // Регулярное выражение для проверки кириллицы и латиницы
    const regex = /^[A-Za-zА-Яа-яЁё0-9\s]+$/; // Разрешаем латиницу, кириллицу, цифры и пробелы

    const onClick = () => {
        // Проверяем, соответствует ли введенное значение регулярному выражению
        if (value && regex.test(value)) {
            setIsModalOpen(true)
        } else {
            setError('Введите только буквы кириллицы или латиницы'); // Устанавливаем сообщение об ошибке
        }
    };

    return <div className={'select-and-add'}>
        <div className={'select-div'}>
            <Select
                getItemLabel={() => ''}
                getItemKey={() => ''}
                label={props.label}
                placeholder="Выберите значение"
                items={[]}
                value={value}
                onChange={setValue}
                form={'round'}
                size={'s'}
                disabled={!hide}
            />
            <Button className={'select-div-btn'} form="round" iconLeft={IconAdd} onlyIcon size={'s'} disabled={!hide}
                    onClick={() => setHide(false)}/>
        </div>
        <div className={hide ? 'input-div hide' : 'input-div'}>
            <TextField caption={error} placeholder="Введите название" onChange={setValue} value={value ?? '' } size={'s'} />
            <Button className={'input-div-btn'} label="Добавить" size={'s'} onClick={onClick}/>
        </div>

        <Modal
            isOpen={isModalOpen}
            hasOverlay
            onEsc={() => setIsModalOpen(false)}
            className={'modal-add'}
        >
            <Text as="p" size="m" view="secondary" lineHeight="m">
                <>
                    Вы точно хотите добавить {value}?
                </>
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
                    onClick={() => setIsModalOpen(false)}
                />
            </div>
        </Modal>

    </div>;
}

export default SelectWithAdd