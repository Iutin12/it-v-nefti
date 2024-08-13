import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import './Header.css';
import React, {useState} from 'react';

import ActionHeaderWindow from './ActionHeaderWindow/ActionHeaderWindow';
import Flex from '@react-css/flex';

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleUserClick = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <header>
            <Text size={'xl'} className={'header-title'}>Система построения моделей скважин</Text>
            <Flex justifyContent='Center'>
                <User withArrow={true} size={'l'} onClick={handleUserClick}></User>
                {isModalOpen && <ActionHeaderWindow />}
            </Flex>

        </header>
    );
}

export default Header