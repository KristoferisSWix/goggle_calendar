import { useContext } from "react";
import Event from "../Event/Event";
import UserEventsContext from "../../context/UserEventsContext";
import useEvents from "../../utils/useEvents";

const EventList = () => {
  const [userEvents] = useContext(UserEventsContext);

  useEvents();

  return (
    <>
      {userEvents.map((data) => {
        return <Event key={data.id} data={data} />;
      })}
    </>
  );
};

export default EventList;
