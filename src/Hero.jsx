import React from "react"
import "./Hero.css"

export default function Hero(props) {
  const styles = {
    display: props.display ? "none" : "block",
  }
  return (
    <div className="hero-container" style={styles}>
      <h1 className="hero-title">Quizzical</h1>
      <p>Let's test your Knowledge</p>
      <button className="startBtn" onClick={props.clickBtn}>
        Start Quiz
      </button>
    </div>
  )
}
