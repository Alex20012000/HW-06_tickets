import Connections from './Connections/Connections';
import Companies from './Сompanies/Сompanies';

import style from './Sidebar.module.scss';

const Sidebar = () => {
    return (
        <div className={style.filters}>
            <Connections />
            <Companies />
        </div>
    )
}

export default Sidebar;
