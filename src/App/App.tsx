import { Provider } from 'react-redux';

import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Sidebar from '../components/Sidebar/Sidebar';

import { store } from '../store';
import { useWindowSize } from '../hooks/use-window-size/useWindowSize';

import style from './App.module.scss';

const App = () => {
  const { isDesktop } = useWindowSize();

  return (
    <Provider store = {store}>
      <div className = {style.container}>
        <Header />
        <div className = {style.main}>
          {isDesktop && <Sidebar />}
          <Content />
        </div>
      </div>
    </Provider>
  );
}

export default App;
