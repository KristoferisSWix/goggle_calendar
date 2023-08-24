import Dropdown from '../Dropdown/Dropdown';

const HeaderTimeframe = () => {
  return (
    <Dropdown
      skin="standard"
      id="timeframe"
      defaultValue="week"
      optionArr={[
        {
          value: 'day',
          text: 'Day',
        },
        {
          value: 'week',
          text: 'Week',
        },
        {
          value: 'month',
          text: 'Month',
        },
        {
          value: 'year',
          text: 'Year',
        },
        {
          value: 'schedule',
          text: 'Schedule',
        },
        {
          value: '4-days',
          text: '4 days',
        },
      ]}
    />
  );
};

export default HeaderTimeframe;
