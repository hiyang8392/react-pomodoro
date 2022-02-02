import React from "react";
import styled from "styled-components";
import {FaPlus, FaMinus} from "react-icons/fa";

const StyledControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  cursor: ${props => (props.isplay ? 'not-allowed' : '')};
  color: ${props => (props.isplay ? '#A1AFBA' : '#2B4C5D')};

  .control-number {
    padding: 0 10px;
  }

  .control-input {
    .plus,
    .minus {
      cursor: ${props => (props.isplay ? 'not-allowed' : 'pointer')};
      border: none;
      width: 30px;
      height: 30px;
      font-size: 16px;
      background-color: #fff;
      color: ${props => (props.isplay ? '#A1AFBA' : '#2B4C5D')};
      opacity: 0.7;

      &:hover,
      &:active {
        opacity: 1;
      }

      &:active {
        transform: ${props => (props.inputnumber === 1 ? 'none' : 'scale(1.1)')};
      }
    }
  }

  @media (max-width: 375px) {
    margin-bottom: 10px;
  }
`;

const Control = (props) => {
  console.log('control');
  const handleMinus = () => {
    props.onMinus(props.type);
  }

  const handlePlus = () => {
    props.onPlus(props.type);
  }

  return (
    <StyledControl isplay={props.isTimerPlay} inputnumber={props.input}>
      <span className="control-label">{props.type}</span>
      <div className="control-input">
        <button className="minus" onClick={handleMinus} disabled={props.isTimerPlay}><FaMinus /></button>
        <span className="control-number">{props.input}</span>
        <button className="plus" onClick={handlePlus} disabled={props.isTimerPlay}><FaPlus /></button>
      </div>
    </StyledControl>
  );
}

export default React.memo(Control);