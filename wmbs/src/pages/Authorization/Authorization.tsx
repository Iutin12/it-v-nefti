import React from 'react'; 
import { Button } from '@consta/uikit/Button';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { TextField } from '@consta/uikit/TextField';
import Flex from '@react-css/flex';
import {Text} from "@consta/uikit/Text";
import { Layout } from '@consta/uikit/Layout';

interface AuthorizationProps {
    login: string;
    password: number;
}

const Authorization  = (props: AuthorizationProps) => {
    return (
        <Theme preset={presetGpnDefault}>
            <Flex flexDirection='column' justifyContent='between' alignItems='center'>
                    <Text>Вход</Text>
                    <TextField placeholder="Введите логин" type="text" form="defaultBrick" size="m"/>
                    <TextField placeholder="Введите пароль" />
                    <Button label="Отправить" />
            </Flex>
        </Theme>

    );
}

export default Authorization;
