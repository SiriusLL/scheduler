import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState(priorState => ({ ...priorState, day: day }));

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

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState({ ...state, appointments}))
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

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => setState({ ...state, appointments}))
    // .catch(error => console.error(error));
  }
  return { bookInterview, cancelInterview,setDay, state }
}