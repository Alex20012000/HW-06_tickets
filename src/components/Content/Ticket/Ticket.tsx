import { ITicket } from '../../../types/types';
import { formatDuration, formatPrice } from '../../../utils';
import { companies } from '../../../data/MockData';

import style from './Ticket.module.scss';

interface Props {
    ticket: ITicket;
}

const Ticket: React.FC<Props> = ({ ticket }) => {
    const { price, company, from, to, startTime, endTime, duration, connectionAmount } = ticket;
    const companyLogo = companies[company].logo;
    const companyAlt = companies[company].alt;

    return (
        <div className={style.ticket}>
            <div className={style.top_content}>
                <div className={style.price}>{formatPrice(price)} руб.</div>
                <img className={style.logo} src={companyLogo} alt={companyAlt} />
            </div>

            <div className={style.bottom_content}>
                <div className={style.bottom_content__wrapper}>
                    <div className={style.bottom_content__title}>{from} - {to}</div>
                    <div className={style.bottom_content__value}>{startTime} - {endTime}</div>
                </div>

                <div className={style.bottom_content__wrapper}>
                    <div className={style.bottom_content__title}>В пути:</div>
                    <div className={style.bottom_content__value}>{formatDuration(duration)}</div>
                </div>

                <div className={style.bottom_content__wrapper}>
                    <div className={style.bottom_content__title}>Пересадки:</div>
                    <div className={style.bottom_content__value}>
                        {connectionAmount === 0
                            ? 'Без пересадок'
                            : `${connectionAmount} ${connectionAmount === 1 ? 'пересадка' : 'пересадки'}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
