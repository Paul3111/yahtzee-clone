import { useState, useEffect } from 'react';
import style from './CSS/Room.module.css'

import scoreSelect from './audio/miniRetro-yahtzeeScoreSelect1.mp3'

const Threes = (props) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [scoreSelect1] = useState(new Audio(scoreSelect))
  const [gameOn, setGameOn] = useState(false)

  useEffect(() => {
    if (props.startEffect) {
      setTimeout(() => setGameOn(true), 400)
    }
  }, [props.startEffect])

  const clickAudio = () => {
    scoreSelect1.currentTime = 0;
    if(props.audioEnabled) {
      scoreSelect1.play()
    } else {
      scoreSelect1.pause()
    }
  }

  function threeScore(roll) {
    let three_score = 0
    for (let dice of roll) {
      if (dice === 3) {
        three_score += 3 
      }
    }
    return three_score
  }

  const score = threeScore(props.values)

  useEffect(() => {
    setTimeout(() => {
      if (props.isBot && props.botDecision && !isDisabled && props.botPlayerRooms[2].chosen && props.activePlayer === props.playerNumber) {
        props.onRollDice(score)
        props.updateTotal(score)
        props.updateSubTotal(score)
        props.resetRollCount(0)
        clickAudio()       
        props.resetDice((prevDiceSet) => {
          return [
            { value: prevDiceSet[0].value, locked: false },
            { value: prevDiceSet[1].value, locked: false },
            { value: prevDiceSet[2].value, locked: false },
            { value: prevDiceSet[3].value, locked: false },
            { value: prevDiceSet[4].value, locked: false }
          ]
        })
        setIsDisabled(true)
      }
    }, 1200)
  }, [props.rollCount])

  const useRoom = () => {
    props.onRollDice(score)
    props.updateTotal(score)
    props.updateSubTotal(score)
    props.resetRollCount(0)

    clickAudio()

    props.resetDice((prevDiceSet) => {
      return [
        { value: prevDiceSet[0].value, locked: false },
        { value: prevDiceSet[1].value, locked: false },
        { value: prevDiceSet[2].value, locked: false },
        { value: prevDiceSet[3].value, locked: false },
        { value: prevDiceSet[4].value, locked: false }
      ]
    })
    setIsDisabled(true)
  }

  const rollZero = props.rollCount === 0
  
  return (
    <div className={`${style['room']} ${gameOn && style['game-on']} ${isDisabled && style['is-used']} ${rollZero && !isDisabled && style['is-disabled']} ${score > 0 && !rollZero && style['is-potential']}`}>
      <button onClick={useRoom} disabled={isDisabled || rollZero}>Threes</button>
      <div>
        <p>{rollZero && props.savedScore === 0 ? '0' : isDisabled ? props.savedScore : score}</p>
      </div>
    </div>
  );
};

export default Threes;