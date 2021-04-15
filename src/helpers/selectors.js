
export default function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  const found = state.days.find(dayApp => dayApp.name === day);

  if (!found) {
    return [];
  }
    
  const newArr = found.appointments.map(appId => {
    if(state.appointments[appId]) {
      return {...state.appointments[appId]}
    }
  })

  return newArr;
  
}

