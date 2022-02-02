import { useReducer, useCallback } from "react";
import timeFinishSound from "../assets/sounds/time-finish.mp3";

const defaultTimer = {
  sessionInput: 25,
  breakInput: 5,
  roundInput: 4,
  countdownMinute: 25,
  countdownSecond: 0,
  countdownRound: 1,
  timerType: 'session',
  timerPlayStop: 'stopped',
  timeSound: timeFinishSound,
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'TIMER_PLUS_SESSION':
      return {
        ...state,
        sessionInput: state.sessionInput + 1,
        countdownMinute: state.countdownMinute + 1,
      };

    case 'TIMER_MINUS_SESSION':
      return {
        ...state,
        sessionInput: state.sessionInput <= 1 ? 1 : state.sessionInput - 1,
        countdownMinute: state.countdownMinute <= 1 ? 1 : state.countdownMinute - 1,
      };

    case 'TIMER_PLUS_BREAK':
      return {
        ...state,
        breakInput: state.breakInput + 1,
      };

    case 'TIMER_MINUS_BREAK':
      return {
        ...state,
        breakInput: state.breakInput <= 1 ? 1 : state.breakInput - 1,
      };

    case 'TIMER_PLUS_ROUND':
      return {
        ...state,
        roundInput: state.roundInput + 1,
      };

    case 'TIMER_MINUS_ROUND':
      return {
        ...state,
        roundInput: state.roundInput <= 1 ? 1 : state.roundInput - 1,
      };

    case 'TIMER_PLAY_STOP':
      if (state.timerPlayStop === 'stopped') {
        return {
          ...state,
          timerPlayStop: 'play',
        };
      }
      return {
        ...state,
        timerPlayStop: 'stopped',
      };

    case 'TIMER_COUNTDOWN':
      console.log('countdown');
      const countdownSecond = ((state.countdownMinute * 60) + state.countdownSecond) - 1;
      const countdownMinute = Math.floor(countdownSecond / 60);
      const isSession = state.timerType === 'session';

      if (countdownSecond < 0) {
        if (state.countdownRound === state.roundInput && !isSession) {
          return {
            ...state,
            countdownSecond: 0,
            timerPlayStop: 'finish',
          };
        }

        return {
          ...state,
          countdownMinute: isSession ? state.breakInput : state.sessionInput,
          countdownSecond: 0,
          countdownRound: isSession ? state.countdownRound : state.countdownRound + 1,
          timerType: isSession ? 'break' : 'session',
        };
      }

      return {
        ...state,
        countdownMinute: countdownMinute,
        countdownSecond: countdownSecond - (countdownMinute * 60),
      };

    case 'TIMER_RESET':
      return {
        ...state,
        countdownMinute: state.sessionInput,
        countdownSecond: 0,
        countdownRound: 1,
        timerType: 'session',
        timerPlayStop: 'stopped',
      }

    default:
      return defaultTimer;
  }
}

const useTimer = () => {
  const [timerState, dispatchTimer] = useReducer(timerReducer, defaultTimer);
  const timerAction = useCallback((type) => {
    dispatchTimer({
      type: type,
    })
  }, []);

  return {
    timerState,
    timerAction,
  };
}

export default useTimer;
