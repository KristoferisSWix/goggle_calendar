import { Dispatch, SetStateAction, createContext } from 'react';
import { UserEvent } from '../types';

const UserEventsContext = createContext<
  [UserEvent[], Dispatch<SetStateAction<UserEvent[]>>]
>([[] as UserEvent[], () => {}]);

export default UserEventsContext;
