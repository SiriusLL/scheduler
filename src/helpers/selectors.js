import state from "./selectors.test"

export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  const found = state.days.find(dayApp => dayApp.name === day);

  if (!found) {
    return [];
  }
    
  const newArr = found.appointments.map(app => {
    if(state.appointments[app]) {
      return {...state.appointments[app]}
    }
  })

  return newArr;
}

