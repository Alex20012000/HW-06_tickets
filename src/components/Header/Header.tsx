import logo from '../../assets/logo.svg';

import style from './Header.module.scss';

const Header  = () => {
    return (
        <header className = {style.header}>
            <img className = {style.logo__svg} src = {logo} alt = {'Logo'}/>
            <h1 className = {style.logo__text}>Поиск авиабилетов</h1>
        </header>
    )
}

export default Header;
