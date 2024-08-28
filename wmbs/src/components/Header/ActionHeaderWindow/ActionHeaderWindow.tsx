import {useNavigate} from 'react-router';
import {Text} from "@consta/uikit/Text";
import './ActionHeaderWindow.css';
import {logout} from '../../../index'

const ActionHeaderWindow = () => {

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
    };

    return (
        <div className='header-arrow' onClick={handleLogoutClick}>
            <Text size={'m'} className={'header-arrow-text'}>Выйти из системы</Text>
        </div>
    )

}

export default ActionHeaderWindow