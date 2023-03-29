import React from "react"
import { nanoid } from "nanoid"
import "./Quiz.css"

export default function Quiz(props) {
  const answersElement = props.quiz.answers.map((answer) => {
    let id = ""
    if (props.quiz.answered) {
      if (props.quiz.correct === answer) {
        id = "correct"
      } else if (props.quiz.selected === answer) {
        id = "not-correct"
      } else {
        id = "not-selected"
      }
    }

    return (
      <span
        key={nanoid()}
        id={id}
        onClick={() => props.handleClick(props.id, answer)}
        className={props.selected === answer ? "answer selected" : "answer"}
      >
        {atob(answer)}
      </span>
    )
  })

  return (
    <div>
      <div className="ques-container">
        <h3>{atob(props.question)}</h3>
        <div>{answersElement}</div>
        <hr />
      </div>
    </div>
  )
}
