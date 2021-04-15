
export function getAppointmentsForDay(state, day) {

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

export function getInterview(state, interview) {
  
  // const foundDay = state.days.find(eachDay => eachDay.name === day);

  // if (!foundDay) {
  //   return [];
  // }

  // const interviews = foundDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);

  // return interviews;
  //console.log(interview, '--------uiio')

  if (!interview) {
    return null;
  } else {
    // console.log(state, 'the pirate state booty');
    // console.log(state.interviewers, 'interviewers')
    // console.log(state.interviewers[interview.interviewer])

    let intData = state.interviewers[interview.interviewer]

    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: intData.name,
        avatar: intData.avatar
      }
    }
  }
  
}

// exports.module = {getAppointmentsForDay, getInterview}