import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { randomNumInRange } from '../../utils/randomRange';

import TaskName from '../../components/TaskName';
import ResetButton from '../../components/ResetButton';
import ScoreCounter from '../../components/ScoreCounter';
import Runtime from '../../components/Runtime';

const ShipBackground = styled.div`
  background: #3755C2;
  height: 350px;
  width: 250px;
  position: relative;
  margin: 50px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

const RepairContainer = styled.div`
  position: absolute;
  height: 150px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => {
    const horizontalOffset = "-20px";
    const verticalOffset = "-30px";

    switch(props.corner){
      case 0:
        return `
          top: ${verticalOffset};
          left: ${horizontalOffset};
        `
      case 1:
        return `
          top: ${verticalOffset};
          right: ${horizontalOffset};
        `
      case 2:
        return `
          bottom: ${verticalOffset};
          left: ${horizontalOffset};
        `
      case 3:
        return `
          bottom: ${verticalOffset};
          right: ${horizontalOffset};
        `
      default:
        break;
    }

  }}
`

const RepairTarget = styled.div`
  box-sizing: border-box;
  border: 5px solid #D0345A;
  background: rgba(208, 52, 90, 0.5);
  height: ${props => (60 + (props.value * 10))}%;
  width: ${props => (60 + (props.value * 10))}%;
  display: ${props => props.value === 0 ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
`

const RepairText = styled.div`
  font-size: 36px;
  color: rgba(255,255,255,0.7);
  margin-top: 6px;
`
const StatusContainer = styled.div`
  width: 350px;
  margin-top: -12px;
  font-size: 24px;
  text-align: center;
`

const Status = styled.span`
  color: ${props => props.status === "BAD" ? "red" : "green"};
`

const RepairDrill = () => {
  const startingCorners = [randomNumInRange(3,4),randomNumInRange(3,4),randomNumInRange(3,4), randomNumInRange(3,4)];
  const [corners, setCorners] = useState(startingCorners);
  const [timerRunning, setTimerRunning] = useState(false);
  const [status, setStatus] = useState("BAD");
  const [lapse, setLapse] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const scoreRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(scoreRef.current)
  }, [])

  useEffect(() => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    if(corners.reduce(reducer) === 0) {
      clearInterval(scoreRef.current);
      setTimerRunning(false);
      setStatus("FINE");
      scoreRun(lapse);
    }
    return;
  }, [corners])

  function onTargetClick(index) {
    if (corners[index] === 0) return;

    if (timerRunning === false) {
      const startTime = Date.now() - lapse;
      setTimerRunning(true);
      scoreRef.current = setInterval(() => {
        setLapse(Date.now() - startTime)
      }, 0)
    }

    const newTargetValues = corners.map( (val, idx) => idx === index ? --val : val );
    setCorners(newTargetValues);
  }

  function scoreRun(runTime) {
    if (highscore === 0 || runTime < highscore) {
      setHighscore(runTime);
    }
  }

  function resetGame(e){
    e.preventDefault();
    setCorners([randomNumInRange(3,4),randomNumInRange(3,4),randomNumInRange(3,4), randomNumInRange(3,4)]);
    clearInterval(scoreRef.current);
    setLapse(0);
    setStatus("BAD");
    setTimerRunning(false);
  }

  return(
    <div>
      <TaskName>Repair Drill</TaskName>
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
      <ScoreCounter>
        <strong>Current Time:</strong> <Runtime pace={lapse <= highscore}>{lapse}ms</Runtime> || <strong>Fastest Time:</strong> {highscore}ms
      </ScoreCounter>
      <ShipBackground>
        {corners.map((value, idx) => 
          <RepairContainer key={idx} corner={idx}>
            <RepairTarget value={value} onClick={() => onTargetClick(idx)}>
              <RepairText>
                <span role="img" aria-label="Warning Marker">❗</span>
              </RepairText>
            </RepairTarget>
          </RepairContainer>
        )}
      </ShipBackground>
      <StatusContainer>
        Status: <Status status={status}>{status}</Status>
      </StatusContainer>
    </div>
  )
}

export default RepairDrill;
