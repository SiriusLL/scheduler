import React from "react";
// import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  console.log('Eugene', state.days)
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // console.log(appointment)
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
