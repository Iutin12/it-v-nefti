import { Text } from '@consta/uikit/Text';
import { User } from '@consta/uikit/User';
import './Header.css'

const Header = () => {

    return <header>
            <Text size={'xl'} className={'header-title'}>Система построения моделей скважин</Text>
            <User withArrow={true} size={'l'} ></User>
        </header>
}

export default Header