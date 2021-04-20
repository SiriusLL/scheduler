import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    spots: '',
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    console.log('Start', state.days)
    setState(priorState => ({ ...priorState, day: day }))
    console.log('End', state.days)
  };

  useEffect(() => {
    const daysPromise = axios.get(`http://localhost:8001/api/days`);
    const appointmentsPromise = axios.get(`http://localhost:8001/api/appointments`);
    const interviewersPromise = axios.get(`http://localhost:8001/api/interviewers`);
    const promises = [daysPromise, appointmentsPromise, interviewersPromise];

    Promise.all(promises)
      .then((all) => {
    
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })

  }, [])

  const getSpotsForDay = function (dayObj, appointments) {
    
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      console.log('appointment.interview', appointment.interview)
      if (!appointment.interview) {
        spots++;
      }
    }
    console.log('spots', spots)
    console.log('dayObj', dayObj)
    return spots;
  }
  
  //return number of spots for a day
  function updateSpots(dayName, days, appointments) {
     
    //find the day Object
    const dayObj = days.find(day => day.name === dayName);

    //calculate spot for this day
    const spots = getSpotsForDay(dayObj, appointments);
    console.log('return', days.map(day => day.name === dayName ? { ...dayObj, spots} : day))
    return days.map(day => day.name === dayName ? { ...day, spots} : day);
    
  }

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //const dayCount = updateSpots(state.day, state.days, appointments)

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState({ ...state, appointments, days: updateSpots(state.day, state.days, appointments)}))
    // .catch(error => console.error(error));
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    //const dayCount = updateSpots(state.day, state.days, appointments)
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => setState({ ...state, appointments, days: updateSpots(state.day, state.days, appointments)}))
    // .catch(error => console.error(error));
  }
  return { bookInterview, cancelInterview,
    setDay, state }
}