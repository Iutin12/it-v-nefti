import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import './Header.css';
import React from 'react';

import ActionHeaderWindow from './ActionHeaderWindow/ActionHeaderWindow';

const Header = () => {
    const [isModalOpen, setModalOpen] = React.useState(false);

    const handleUserClick = () => {
        setModalOpen(true);
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