import {Select} from "@consta/uikit/Select";
import {useState} from "react";
import {Button} from "@consta/uikit/Button";
import { IconAdd } from '@consta/icons/IconAdd';
import {TextField} from "@consta/uikit/TextField";
import './SelectWithAdd.css';

interface SelectWithAddProps {
    label: string;
}

const SelectWithAdd = (props: SelectWithAddProps) => {

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

    return <div className="select-and-add">
        <div className={'select-div'}>
            <Select
                label={props.label}
                caption={value?.label}
                placeholder="Выберите значение"
                items={items}
                value={value}
                onChange={setValue}
                form={'round'}
                size={'s'}
            />
            <Button className={'select-div-btn'} form="round" iconLeft={IconAdd} onlyIcon size={'s'} disabled={!hide} onClick={() => setHide(false)}/>
        </div>
        <div className={hide ? 'input-div hide': 'input-div'}>
            <TextField placeholder="Введите название" size={'s'}/>
            <Button className={'input-div-btn'} label="Добавить" size={'s'}/>
        </div>

    </div>;
}

export default SelectWithAdd