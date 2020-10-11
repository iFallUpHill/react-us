import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { randomNumInRange } from '../../utils/randomRange';

const GameBoard = styled.div`
  width: 600px;
  display: flex;
  background: #7A7A70;
  border: 3px solid #3D3731;
  border-radius: 0.25rem;
  padding: 40px
`

const GameColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 350px;
  background: ${props => props.color || 'blue'};
  border: 10px solid #575853;
  border-radius: 0.5rem;
  margin: 5px;
`

const ColumnHeading = styled.div`
  text-align: center;
  font-size: 36px;
  background: #68746A;
  color: #fff;
`

const Temperature = styled.div`
  font-size: 48px;
  color: #fff;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

const TemperatureButton = styled.button`
  font-size: 36px;
  padding: 1rem;
  outline: none;
  margin: 0 0.5rem;
  background: rgba(255,255,255,0.6);
  border: 3px solid rgba(255,255,255,0.8);
  color: white;

  &:disabled {
    background: rgba(255,255,255,0.4);
    border: 3px solid rgba(255,255,255,0.6);
  }

  ${props => props.position === "upper" 
    ?
      `
        margin-top: 0.25em;
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;

      `
    :
      `
        margin-bottom: 0.25em;
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;

      `
  }
`

const ResetButton = styled.button`
  padding: 0.5em 1em;
  margin-bottom: 1em;
`

const Runtime = styled.span`
  color: ${props => props.pace ? "green" : "red"};
`

const ScoreCounter = styled.div`

`

const RecordTemperature = () => {
  const firstTemp = randomNumInRange(250, 350)
  const firstTarget = Math.random() > 0.5 ? firstTemp + randomNumInRange(1,50) : firstTemp - (randomNumInRange(1, 50));
  const [logValue, setLogValue] = useState(firstTemp);
  const [targetValue, setTargetValue] = useState(firstTarget);
  const [deltaIsPositive, setDeltaIsPositive] = useState((firstTarget - firstTemp) > 0)
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [lapse, setLapse] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const scoreRef = useRef(null);
  const incrementRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(scoreRef.current);
      clearInterval(incrementRef.current);
    }
  }, [])

  function startTimer() {
    if (timerRunning === false) {
      const startTime = Date.now() - lapse;
      setTimerRunning(true);
      scoreRef.current = setInterval(() => {
        setLapse(Date.now() - startTime)
      }, 0)
    }
  }

  function onLogValueClick(changeValue) {
    startTimer();
    setLogValue(logValue + changeValue);
  }

  function startLogValueChange(changeValue) {
    startTimer();
    incrementRef.current = setInterval(() => {
      setLogValue(prevLogValue => prevLogValue + changeValue);
    }, 100)
  }

  function stopLogValueChange() {
    clearInterval(incrementRef.current);
  }

  useEffect(() => {
    if (logValue === targetValue || ( (deltaIsPositive && (logValue > targetValue)) || (!deltaIsPositive && (logValue < targetValue) ))) {
      setButtonsDisabled(true);
      clearInterval(scoreRef.current);
      clearInterval(incrementRef.current);
      setTimerRunning(0);
      scoreRun(lapse);
    }
    return;
  }, [logValue])

  function scoreRun(runTime) {
    if (highscore === 0 || runTime < highscore) {
      setHighscore(runTime);
    }
  }

  function resetGame(e){
    e.preventDefault();

    const newFirstTemp = randomNumInRange(250, 350)
    const newTargetTemp = Math.random() > 0.5 ? newFirstTemp + randomNumInRange(1,50) : newFirstTemp - (randomNumInRange(1, 50));
    setLogValue(newFirstTemp)
    setTargetValue(newTargetTemp);
    setDeltaIsPositive((newTargetTemp - newFirstTemp) > 0);

    clearInterval(scoreRef.current);
    clearInterval(incrementRef.current);
    setLapse(0);
    setTimerRunning(false);
    setButtonsDisabled(false);
  }

  return(
    <div>
      <h1>Record Temperature</h1>
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
      <ScoreCounter>
        <strong>Current Time:</strong> <Runtime pace={lapse <= highscore}>{lapse}ms</Runtime> || <strong>Fastest Time:</strong> {highscore}ms
      </ScoreCounter>
      <GameBoard>
        <GameColumn color="#3DAF53">
          <ColumnHeading>Log</ColumnHeading>
          <TemperatureButton position="upper" disabled={buttonsDisabled} onClick={() => onLogValueClick(1)} onMouseDown={() => startLogValueChange(1)} onMouseUp={stopLogValueChange}>
            <span role="img" aria-label="up">△</span>
          </TemperatureButton>
          <Temperature>{logValue}</Temperature>
          <TemperatureButton position="lower" disabled={buttonsDisabled} onClick={() => onLogValueClick(-1)} onMouseDown={() => startLogValueChange(-1)} onMouseUp={stopLogValueChange}>
            <span role="img" aria-label="down">▽</span>
          </TemperatureButton>
        </GameColumn>
        <GameColumn color="#742234">
          <ColumnHeading>Reading</ColumnHeading>
          <Temperature>{targetValue}</Temperature>
        </GameColumn>
      </GameBoard>
    </div>
  )
}

export default RecordTemperature;
