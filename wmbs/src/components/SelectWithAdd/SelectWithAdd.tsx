import {Select} from "@consta/uikit/Select";
import {useState} from "react";
import {Button} from "@consta/uikit/Button";
import {IconAdd} from '@consta/icons/IconAdd';
import {TextField} from "@consta/uikit/TextField";
import './SelectWithAdd.css';
import {Text} from "@consta/uikit/Text";
import {Modal} from "@consta/uikit/Modal";

interface SelectWithAddProps {
    label: string;
}

const SelectWithAdd: React.FC<SelectWithAddProps> = (props) => {

    type Item = {
        label: string;
        id: number;
    };

    const items: Item[] = [
        {
            label: 'Первый',
            id: 1,
        },
        {
            label: 'Второй',
            id: 2,
        },
        {
            label: 'Третий',
            id: 3,
        },
    ];

    const [value, setValue] = useState<Item | null>();
    const [hide, setHide] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <div className={'select-and-add'}>
        <div className={'select-div'}>
            <Select
                label={props.label}
                placeholder="Выберите значение"
                items={items}
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
            <TextField placeholder="Введите название" size={'s'}
                       onChange={(val) => setValue(val as Item | null | undefined)}/>
            <Button className={'input-div-btn'} label="Добавить" size={'s'} onClick={() => setIsModalOpen(true)}/>
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