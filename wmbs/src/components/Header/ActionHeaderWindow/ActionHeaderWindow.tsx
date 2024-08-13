import React from 'react'; 
import { Button } from '@consta/uikit/Button';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { TextField } from '@consta/uikit/TextField';
import Flex from '@react-css/flex';
import {Text} from "@consta/uikit/Text";
import './ActionHeaderWindow.css'
import { Layout } from '@consta/uikit/Layout';

const ActionHeaderWindow = () => {
    return (
    <Layout className='header-arrow'>
        <Flex flexDirection='column' justifyContent='between' alignItems='center'>
            <Text>Вход</Text>
            <Button label="Отправить" />
        </Flex>
    </Layout>
    )
   
}

export default ActionHeaderWindow