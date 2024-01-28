import { useDispatch, useSelector } from 'react-redux';

import { FilterState, setConnections } from '../../../reducers/filtersReducer';
import { useWindowSize } from '../../../hooks/use-window-size/useWindowSize';

import style from './Connections.module.scss';

const Connections = () => {
    const connections = useSelector((state: FilterState) => state.filter.connections);
    const dispatch = useDispatch();

    const checkboxData = [
        { id: 'nonStop', value: 0, label: 'Без пересадок' },
        { id: '1Connection', value: 1, label: '1 пересадка' },
        { id: '2Connections', value: 2, label: '2 пересадки' },
        { id: '3Connections', value: 3, label: '3 пересадки' },
    ];

    const handleCheckbox = (value: number, selected: boolean) => {
        dispatch(setConnections({ value, selected }));
    };

    const  { isMobile} = useWindowSize();

    return (
        <div className={style.wrapper}>
            <div className={style.transfer}>
                <p className={style.title}>{isMobile ? 'Кол-во пересадок' : 'Количество пересадок'}</p>
                <div className={style.checkbox}>
                    {checkboxData.map(({ id, value, label }) => (
                        <div key={id} className={style.item}>
                            <label className={style.label} htmlFor={id}>
                                <input
                                    className={style.check}
                                    type='checkbox'
                                    value={value}
                                    checked={connections[value].selected}
                                    onChange={(e) => handleCheckbox(value, e.currentTarget.checked)}
                                />
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Connections;
