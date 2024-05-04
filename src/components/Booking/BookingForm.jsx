import React, { useState } from 'react';
import Calendar from './Calendar';
import dayjs from 'dayjs';

const CalendarForm = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    // Handle form submission with selectedDate
  };

  return (
    <form onSubmit={handleSubmit}>
      <Calendar value={selectedDate} onChange={handleDateChange} />
      <button type="submit">Book Venue</button>
    </form>
  );
};

export default CalendarForm;
