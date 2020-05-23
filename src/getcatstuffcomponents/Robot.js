import React from 'react';
import both from '../images/both-down.png';
import left from '../images/left-side.png';
import right from '../images/right-side.png';


export default function Robot(props) {
  return (
    <div>
      {props.isNeutral && <img className="robot-image" src={both} alt='both arms down'></img>}
      {props.isLeft && <img className={'robot-image ' + (props.isCorrect ? "move-right" : "")} src={left} alt='left side up'></img>}
      {props.isRight && <img className={'robot-image ' + (props.isCorrect ? "move-right" : "")} src={right} alt='right side up'></img>}
      <div className="images-preloader">
        <img src={left} alt='hidden as a preloader'></img>}
        <img src={right} alt='hidden as a preloader'></img>}
      </div>
    </div>
  )
}


// It's a hacky way to preload images, but it works so whatever.