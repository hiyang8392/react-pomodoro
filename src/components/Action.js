import React from "react";
import styled from "styled-components";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const StyledAction = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 3px solid #2B4C5D;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: #fff;
    color: #2B4C5D;
    opacity:0.7;
    font-size: 16px;
    transition: all 0.1s ease-in-out;

    &:hover,
    &:active,
    &.active {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @media (max-width: 375px) {
    width: 100%;
  }
`;

const Action = (props) => {
  console.log('action');
  let timerIcon = <FaPlay />;
  if (props.isTimerPlay) {
    timerIcon = <FaPause />;
  }

  return (
    <StyledAction>
      {!props.isTimerFinish && <button onClick={props.onTimerAction}>{timerIcon}</button>}
      <button onClick={props.onTimerReset}><FaRedo /></button>
    </StyledAction>
  );
}

export default React.memo(Action);