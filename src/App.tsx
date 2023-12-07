import { useState } from 'react';
import Header from './components/Header/Header';
import SidebarCalendar from './components/SidebarCalendar/SidebarCalendar';
import MainCalendar from './components/MainCalendar/MainCalendar';
import UserEventsContext from './context/UserEventsContext';
import { UserEvent } from './types';
import styles from './App.module.scss';
import WeekOffsetContext from './context/WeekOffsetContext';

const App = () => {
  const weekOffset = useState(0);
  const userEvents = useState<UserEvent[]>([]);

  return (
    <WeekOffsetContext.Provider value={weekOffset}>
      <UserEventsContext.Provider value={userEvents}>
        <Header />
        <main className={styles.main}>
          <SidebarCalendar />
          <MainCalendar />
        </main>
      </UserEventsContext.Provider>
    </WeekOffsetContext.Provider>
  );
};

export default App;
