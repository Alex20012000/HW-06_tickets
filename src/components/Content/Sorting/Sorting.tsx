import {Fragment} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FilterState, setSorting } from '../../../reducers/filtersReducer';

import style from './Sorting.module.scss';

const Sorting = () => {
    const criteria = useSelector((state: FilterState) => state.filter.criteria);
    const dispatch = useDispatch();

    const sortingOptions = [
        { id: 'cheapest', value: 'cheapest', label: 'Самый дешевый' },
        { id: 'fastest', value: 'fastest', label: 'Самый быстрый' },
        { id: 'optimal', value: 'optimal', label: 'Самый оптимальный' },
    ];

    const handleClick = (value: string) => {
        dispatch(setSorting({ value }));
    };

    return (
        <div className={style.sorting}>
            {sortingOptions.map(option => (
                <Fragment key = {option.id}>
                    <input
                        className = {style.input}
                        type = 'radio'
                        name = {'criteria'}
                        value = {option.value}
                        id = {option.id}
                        onChange = {() => handleClick(option.value)}
                        checked = {criteria.value === option.value}
                    />
                    <label htmlFor = {option.id} className = {style.item}>
                        {option.label}
                    </label>
                </Fragment>
            ))}
        </div>
    );
}

export default Sorting
