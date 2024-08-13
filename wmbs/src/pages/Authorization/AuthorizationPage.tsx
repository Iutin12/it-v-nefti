import React from 'react';
import {Button} from '@consta/uikit/Button';
import {TextField} from '@consta/uikit/TextField';
import { useNavigate } from 'react-router';
import Flex from '@react-css/flex';
import {Text} from "@consta/uikit/Text";

// interface AuthorizationProps {
//     login: string;
//     password: number;
// }

const AuthorizationPage = () => {

    const navigate = useNavigate();

    const handleInClick = () => {
        navigate('/');
    };

    return (
        <Flex flexDirection='column' justifyContent='space-between' alignItems='center'>
            <Text>Вход</Text>
            <TextField placeholder="Введите логин" type="text" form="defaultBrick" size="m"/>
            <TextField placeholder="Введите пароль"/>
            <Button label="Отправить" onClick={handleInClick}/>
        </Flex>
    );
}

export default AuthorizationPage;
