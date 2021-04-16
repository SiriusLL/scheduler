import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 7,
//     time: '9am'
//   },
//   // {
//   //   id: 3,
//   //   time: "2pm",
//   //   interview: {
//   //     student: "James Bee",
//   //     interviewer: {
//   //       id: 2,
//   //       name: "Andy Allstar",
//   //       avatar: "https://i.imgur.com/Nmx0Qxo.png",
//   //     },
//   //   },
//   // },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Lilo Stitch",
//       interviewer: {
//         id: 3,
//         name: "Cpt. Hook",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       },
//     },
//   },
//   {
//     id:5,
//     time:'12pm',
//     interview: {
//       student: "Lilo Stitch",
//       interviewer: {
//         id: 3,
//         name: "Cpt. Hook",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       },
//     },
//   },
//   {
//     id: 6,
//     time: "1pm",
//     interview: {
//       student: "Lumen Love",
//       interviewer: {
//         id: 4,
//         name: "John Luke",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
// ];

// // const days = [
// //   {
// //     id: 1,
// //     name: "Monday",
// //     spots: 2,
// //   },
// //   {
// //     id: 2,
// //     name: "Tuesday",
// //     spots: 5,
// //   },
// //   {
// //     id: 3,
// //     name: "Wednesday",
// //     spots: 0,
// //   },
// // ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
      
    // axios.get(daysUrl).then(response => {
      
    //   setState(priorState => ({...priorState, days: [...response.data]}))
    // }, [])

  }, [])
  console.log('*******', state.interviewers)
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log(appointment)
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
      />
    );
    
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
