import { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import useTimer from "../hooks/use-timer";
import Card from "../UI/Card";
import Timer from "./Timer";
import Control from "./Control";
import Action from "./Action";

const StyledPomodoro = styled(Card)`
  padding: 50px;
  margin: 10vh auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  max-width: 500px;
  min-height: 80vh;
  background-color: #fff;

  .title {
    display: flex;
    justify-content: center;
    width:100%;
    & p {
      color: #2B4C5D;
    }
  }

  .controls {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    @media (max-width: 375px) {
      flex-direction: column;
    }
  }
`;

const Pomodoro = () => {
  const {timerState, timerAction} = useTimer();
  const audioSoundRef = useRef();
  const roundInfo = `${timerState.countdownRound} / ${timerState.roundInput}`;

  let isTimerPlay = false;
  let isTimerFinish = false;
  if (timerState.timerPlayStop === 'play') {
    isTimerPlay = true;
  }
  if (timerState.timerPlayStop === 'finish') {
    isTimerFinish = true;
  }

  useEffect(() => {
    if (isTimerPlay) {
      const timer = setInterval(() => {
        timerAction('TIMER_COUNTDOWN');
      }, 1000);

      document.title = `(${String(timerState.countdownMinute).padStart(2, '0')}:${String(timerState.countdownSecond).padStart(2, '0')}) ${timerState.timerType} ! - React Pomodoro`;

      if (timerState.countdownSecond === 0 && timerState.countdownMinute === 0) {
        audioSoundRef.current.play();
      }

      return () => {
        clearInterval(timer);
      }
    }

  }, [timerState, timerAction, isTimerPlay]);

  const handleTimerAction = useCallback(() => {
    timerAction('TIMER_PLAY_STOP');
  }, [timerAction]);

  const handleMinus = useCallback((controlType) => {
    switch (controlType) {
      case 'session':
        timerAction('TIMER_MINUS_SESSION');
        break;
      case 'break':
        timerAction('TIMER_MINUS_BREAK');
        break;
      case 'round':
        timerAction('TIMER_MINUS_ROUND');
        break;
      default:
        break;
    }
  }, [timerAction]);

  const handlePlus = useCallback((controlType) => {
    switch (controlType) {
      case 'session':
        timerAction('TIMER_PLUS_SESSION');
        break;
      case 'break':
        timerAction('TIMER_PLUS_BREAK');
        break;
      case 'round':
        timerAction('TIMER_PLUS_ROUND');
        break;
      default:
        break;
    }
  }, [timerAction]);

  const handleTimerReset = useCallback(() => {
    timerAction('TIMER_RESET');
  }, [timerAction]);

  document.body.onkeyup = (e) => {
    if(e.key === ' '){
        timerAction('TIMER_PLAY_STOP');
    }
  }

  return (
    <StyledPomodoro timertype={timerState.timerType}>
      <Timer minute={timerState.countdownMinute} second={timerState.countdownSecond} timerType={timerState.timerType} roundInfo={roundInfo}/>
      <div className="controls">
        <Control type="session" input={timerState.sessionInput} onMinus={handleMinus} onPlus={handlePlus} isTimerPlay={isTimerPlay} />
        <Control type="break" input={timerState.breakInput} onMinus={handleMinus} onPlus={handlePlus} isTimerPlay={isTimerPlay} />
        <Control type="round" input={timerState.roundInput} onMinus={handleMinus} onPlus={handlePlus} isTimerPlay={isTimerPlay} />
      </div>
      <Action isTimerFinish={isTimerFinish} isTimerPlay={isTimerPlay} onTimerAction={handleTimerAction} onTimerReset={handleTimerReset} />
      <audio src={timerState.timeSound} ref={audioSoundRef} preload='auto' />
    </StyledPomodoro>
  );
}

export default Pomodoro;