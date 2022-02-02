import styled from "styled-components";

const StyledTimer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${props => (props.timertype === 'session' ? '5px solid #2B4C5D' : '5px solid #558257')};
  border-radius: 50%;
  width: 250px;
  height: 250px;
  color: ${props => (props.timertype === 'session' ? '#2B4C5D' : '#558257')};
  opacity:0.7;

  .display-time {
    font-size: 50px;
  }

  & p {
    margin: 10px 0;
  }

  & span {
    font-size: 24px;
  }
`;

const Timer = (props) => {
  const displayTime = `${String(props.minute).padStart(2, '0')}:${String(props.second).padStart(2, '0')}`;

  return (
    <StyledTimer timertype={props.timerType}>
      <div className="display-time">
        {displayTime}
      </div>
      <p>{props.roundInfo}</p>
      <span>{props.timerType}</span>
    </StyledTimer>
  );
};

export default Timer;