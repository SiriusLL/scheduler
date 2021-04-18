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

  function updateSpots(id, increment) {
        
        const days = [ ...state.days ];
        
        const found = days.find(day => day.appointments.includes(id));
        if (increment === 'sub') {
          found.spots -= 1;
          return found;
        }

        found.spots += 1
        
        return days
        
       
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
    updateSpots(id, 'sub')
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState(prev => ({ ...state, appointments})))
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

    const count = updateSpots(id)

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => setState({ ...state, appointments, count}))
    // .catch(error => console.error(error));
  }
  return { bookInterview, cancelInterview,
    setDay, state }
}