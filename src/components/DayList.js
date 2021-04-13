import React from "react";
import DayListItem from "components/DayListItem";
//import classnames from "classnames";
//import "components/DayListItem.scss";

export default function DayList(props) {
  console.log('props:', props.days)
  const day = props.days.map((day) => {
    console.log('day', day)
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    )
  })
  console.log('return', day);
  return (<ul>{day}</ul>);
}