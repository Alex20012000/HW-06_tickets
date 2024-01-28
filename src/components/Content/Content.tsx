import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from './Ticket/Ticket';
import Sorting from './Sorting/Sorting';
import Sidebar from '../Sidebar/Sidebar';
import ShowMore from './ShowMore/ShowMore';

import { fetchTickets, filterTickets, loadMore, showTickets } from '../../reducers/contentReduser';
import { GlobalSVGSelector } from '../../assets/GlobalSVGSelector';
import { useWindowSize } from '../../hooks/use-window-size/useWindowSize';
import { RootState } from '../../store';

import style from './Content.module.scss';

const Content = () => {
  const { tickets, shown } = useSelector((state: RootState) => state.tickets);
  const { connections, company, criteria } = useSelector((state: RootState) => state.filter);
  const filteredTickets = Array.isArray(tickets) ? filterTickets(tickets, connections, company.value) : [];

  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTickets() as any);
        dispatch(showTickets({ criteria }));
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
  
    fetchData();
  }, [criteria, dispatch]);

  const { isMobile } = useWindowSize();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className = {style.content}>
      <Sorting />
      {isMobile && ( 
        <div className = {style.mobile_dropdown}>
          <div className = {style.menu}>
            <p className = {style.text}>Авиакомпании, кол-во пересадок</p>
            <button 
              className = {style.dropdown}
              onClick = {handleMenuClick}>
              Открыть настройки 
              <span className = {style.arrow}><GlobalSVGSelector id = {isMenuOpen ? 'arrow-up' : 'arrow-down'} /></span>
            </button>
          </div>
          {isMenuOpen && <Sidebar />} 
        </div>
      )}
      {filteredTickets.slice(0, shown).map((ticket) => (
        <Ticket key = {ticket.id} ticket = {ticket} />
      ))}
      <ShowMore loadMoreHandler = {() => dispatch(loadMore())} />
    </div>
  );
}

export default Content;