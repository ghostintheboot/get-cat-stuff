import React from 'react';


export default function DecisionButtons(props) {
  return (
    <div className="decision-buttons">
      {!props.showjsondata && <button className="left-btn" onClick={props.left}>Left!</button>}
      {!props.showjsondata && <button className="right-btn" onClick={props.right}>Right!</button>}
      {props.showjsondata && <button className="retry-btn" onClick={props.reset}>Try Again</button>}
    </div>
  )
}
