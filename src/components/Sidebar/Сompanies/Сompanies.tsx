import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterState, setCompany } from '../../../reducers/filtersReducer';

import style from './Сompanies.module.scss';

const Companies = () =>  {
    const company = useSelector((state: FilterState) => state.filter.company);
    const dispatch = useDispatch();

    const companyData = [
        { id: 'all', value: 'all', label: 'Все компании' },
        { id: 'pobeda', value: 'pobeda', label: 'Победа' },
        { id: 'redWings', value: 'redWings', label: 'Red Wings' },
        { id: 'S7', value: 'S7', label: 'S7 Airlines' },
    ];

    const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCompany({ value: e.currentTarget.value, selected: true }));
    };

    return (
        <div className={style.wrapper}>
            <div className={style.company}>
                <p className={style.title}>Компании</p>
                <div className={style.radio}>
                    {companyData.map(({ id, value, label }) => (
                        <div key={id} className={style.item}>
                            <label className={style.label} htmlFor={id}>
                                <input
                                    className={`${style.circle}`}
                                    name='company'
                                    type='radio'
                                    value={value}
                                    checked={company.value === value}
                                    onChange={handleRadio}
                                    id={id}
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

export default Companies;
