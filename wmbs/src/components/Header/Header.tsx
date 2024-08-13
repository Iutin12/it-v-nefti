import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import './Header.css';
import React, {useState} from 'react';

import ActionHeaderWindow from './ActionHeaderWindow/ActionHeaderWindow';

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleUserClick = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <header>
            <Text size={'xl'} className={'header-title'}>Система построения моделей скважин</Text>
            <User withArrow={true} size={'l'} onClick={handleUserClick}></User>
            {isModalOpen && <ActionHeaderWindow />}
        </header>
    );
}

export default Header