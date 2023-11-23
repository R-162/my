import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

const HomePage = () => {
  const [date, setDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState(''); 
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const addHabit = () => {
    if (newHabit.trim() !== '') {
      const newHabitObj = { habit: newHabit, status: 'N.A.' };

      const updatedHabits = habits.map((habit) =>
        habit.date.toDateString() === date.toDateString()
          ? { ...habit, habits: [...habit.habits, newHabitObj] }
          : habit
      );

      if (updatedHabits.every((habit) => habit.date.toDateString() !== date.toDateString())) {
        setHabits([
          ...updatedHabits,
          { date, habits: [newHabitObj] }
        ]);
      } else {
        setHabits(updatedHabits);
      }

      setNewHabit('');
    }
  };

  const deleteHabit = (dateIndex, habitIndex) => {
    const updatedHabits = [...habits];
    updatedHabits[dateIndex].habits.splice(habitIndex, 1);
    setHabits(updatedHabits.filter((habit) => habit.habits.length > 0));
  };

  const updateStatus = (dateIndex, habitIndex, newStatus) => {
    const updatedHabits = [...habits];
    updatedHabits[dateIndex].habits[habitIndex].status = newStatus;
    setHabits(updatedHabits);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addHabit();
    }
  };

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date, habits]);

  return (
    <div className='full'>
    <div className="app">
      <h1 className='head'>YOUR HABIT TRACK</h1>
      
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
        <div className="clock-container">
        <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
      </div>
      </div>
      
      <div className="habits-container">
      
      <h1 className='list-name'>YOUR HABIT LIST</h1>
        <h2>{date.toDateString()}</h2>
        <ul className='sucess'>
          {habits.map((habit, dateIndex) =>
            habit.date.toDateString() === date.toDateString() ? (
              habit.habits.map((h, habitIndex) => (
                <li key={habitIndex}>
                  <h3>{h.habit}</h3>
                  <label className='gre'>
                    <input
                      type="checkbox"
                      checked={h.status === 'Done'}
                      onChange={() => updateStatus(dateIndex, habitIndex, 'Done')}
                    />
                    Done
                  </label>
                  <label className='re'>
                    <input
                      type="checkbox"
                      checked={h.status === 'Not Done'}
                      onChange={() => updateStatus(dateIndex, habitIndex, 'Not Done')}
                    />
                    Not Done
                  </label>
                  <label className='bla'>
                    <input
                      type="checkbox"
                      checked={h.status === 'N.A.'}
                      onChange={() => updateStatus(dateIndex, habitIndex, 'N.A.')}
                    />
                    Forget
                    <br></br>
                  </label>
                  <button className='del' onClick={() => deleteHabit(dateIndex, habitIndex)}>Delete</button>
                </li>
              ))
            ) : null
          )}
        </ul>
        <div className="add-habit-container">
          <h1 className='list'>Have a good day</h1>
          <input
          className='place'
            type="text"
            placeholder="Add new habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className='but' onClick={addHabit}>Add Habit</button>
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default HomePage;
