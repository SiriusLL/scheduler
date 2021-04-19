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

  //return number of spots for a day
  function updateSpots(day) {
      
    console.log('state',state)
        console.log('day', day)
        if (state.appointments) {
        const dayFound = state.days.find(eachDay => eachDay.name === day);
        console.log('dayFound', dayFound)
        const emptyAppointments = dayFound.appointments.filter((appointmentId, id) => state.appointments[appointmentId].interview === null)
        console.log('dayFound.appointments', dayFound.appointments)
        console.log('emptyApp', emptyAppointments)
       
        //return emptyAppointments.length;
        const daysSpots = [ ...state.days ];

       //found.spots = emptyAppointments.length
       console.log('daySpots',daysSpots)
       dayFound.spots = emptyAppointments.length
        
       return daysSpots
        
      }
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
    //updateSpots(id, 'sub')
    const dayCount = updateSpots(state.day, id)
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState(prev => ({ ...state, appointments, days: dayCount})))
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
    console.log('here',state.day)
    //const count = updateSpots(id)
    const dayCount = updateSpots(state.day, id)
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => setState({ ...state, appointments, dayCount}))
    // .catch(error => console.error(error));
  }
  return { bookInterview, cancelInterview,
    setDay, state }
}