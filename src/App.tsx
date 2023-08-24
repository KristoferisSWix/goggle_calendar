import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import DateContext from './context/DateContext';
import Header from './components/Header/Header';
import SidebarCalendar from './components/SidebarCalendar/SidebarCalendar';
import MainCalendar from './components/MainCalendar/MainCalendar';
import DateProvider from './utils/DateProvider';

import UserEventsContext from './context/UserEventsContext';
import { UserEvent } from './types';
import styles from './App.module.scss';

const App = () => {
  const dateProvider = useState(new DateProvider(0));
  const userEvents = useState<UserEvent[]>([]);

  return (
    <DateContext.Provider value={dateProvider}>
      <UserEventsContext.Provider value={userEvents}>
        <Header />
        <main className={styles.main}>
          <SidebarCalendar />
          <MainCalendar />
        </main>
      </UserEventsContext.Provider>
    </DateContext.Provider>
  );
};

const container = document.getElementById('root');

if (!container) {
  throw new Error('no container to render to');
}

const root = createRoot(container);
root.render(<App />);
