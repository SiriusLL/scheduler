import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  }

  // console.log(props, 'props.interview.student')

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving your request"}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
    </article>
  )
}