import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    spots: "",

    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState((priorState) => ({ ...priorState, day: day }));
  };

  useEffect(() => {
    const daysPromise = axios.get(`/api/days`);
    const appointmentsPromise = axios.get(`/api/appointments`);
    const interviewersPromise = axios.get(`/api/interviewers`);
    const promises = [daysPromise, appointmentsPromise, interviewersPromise];

    Promise.all(promises).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const getSpotsForDay = function (dayObj, appointments) {
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];

      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };

  //return number of spots for a day
  function updateSpots(dayName, days, appointments) {
    //find the day Object
    const dayObj = days.find((day) => day.name === dayName);

    //calculate spot for this day
    const spots = getSpotsForDay(dayObj, appointments);

    return days.map((day) => (day.name === dayName ? { ...day, spots } : day));
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() =>
      setState({
        ...state,
        appointments,
        days: updateSpots(state.day, state.days, appointments),
      })
    );
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then(() =>
      setState({
        ...state,
        appointments,
        days: updateSpots(state.day, state.days, appointments),
      })
    );
  }
  return { bookInterview, cancelInterview, setDay, state };
}
