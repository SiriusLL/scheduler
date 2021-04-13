import React from "react";
//import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  console.log('props:', props)
  const interviewerItemClass = `interviewers__item ${props.selected ? "interviewers__item--selected" : ""}`;
  console.log('propssss', props)

  return (
    <li className={interviewerItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}