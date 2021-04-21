import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };
  // console.log("propsrrrrbooty:", props);
  //const interviewer = props.interviewers.map((interviewer) => {
  //console.log("day", interviewers);

  const interviewers = props.interviewers.map((interviewer) => {
    const setInterviewer = () => {
      props.setInterviewer(interviewer.id);
    };

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );

  //});
  //console.log("return", interviewers);
  //return <ul>{interviewer}</ul>;
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
