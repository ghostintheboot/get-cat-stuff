import React from 'react';


export default function GameResults(props) {
  return (
    <div className="game-results">
      <p>Wins: {props.wins}</p>
      <p>Losses: {props.losses}</p>
      <p>Total Games Played: {props.total}</p>
    </div>
  )
}
