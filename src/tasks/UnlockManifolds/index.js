import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { shuffleArray } from '../../utils/shuffle';

import TaskName from '../../components/TaskName';
import ResetButton from '../../components/ResetButton';
import ScoreCounter from '../../components/ScoreCounter';
import Runtime from '../../components/Runtime';

const GameContainer = styled.div`
`

const BoardContainer = styled.div`
  padding: 40px;
  border: 10px solid #454545;
  background: #ABABAB;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
`

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 110px);
  grid-template-rows:110px;
  box-sizing: border-box;
  margin-left: -10px;
`

const GameSquare = styled.div`
  border: 10px solid #345CBF;
  height: 100px;
  width: 100px;
  background: ${props => props.activated ? "#008E41" : "#8FA1CF"};
  display: flex;
  justify-content: center;
  align-items: center;
`

const GameNumber = styled.div`
  font-size: 36px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

const UnlockManifolds = () => {
  const initialArray = shuffleArray([1,2,3,4,5,6,7,8,9,10]);
  const [orderArray, setOrderArray] = useState(initialArray);
  const [gameProgress, setGameProgess] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [lapse, setLapse] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const scoreRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(scoreRef.current)
  }, [])

  useEffect(() => {
    if (gameProgress === 10) {
      clearInterval(scoreRef.current);
      setTimerRunning(false);
      scoreRun(lapse);
    }
    return;
  }, [gameProgress])

  function onClickSquare(value) {
    if (value < gameProgress) {
      return;
    } else if (value === gameProgress+1) {

      if (timerRunning === false) {
        const startTime = Date.now() - lapse;
        setTimerRunning(true);
        scoreRef.current = setInterval(() => {
          setLapse(Date.now() - startTime)
        }, 0)
      }

      setGameProgess(gameProgress+1);
    } else {
      setGameProgess(0);
    }
  }

  function scoreRun(runTime) {
    if (highscore === 0 || runTime < highscore) {
      setHighscore(runTime);
    }
  }

  function resetGame(e){
    e.preventDefault();
    setOrderArray(shuffleArray([1,2,3,4,5,6,7,8,9,10]));
    setGameProgess(0);
    clearInterval(scoreRef.current);
    setLapse(0);
    setTimerRunning(false);
  }

  return(
    <GameContainer>
      <TaskName>Unlock Manifolds</TaskName>
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
      <ScoreCounter>
        <strong>Current Time:</strong> <Runtime pace={lapse <= highscore}>{lapse}ms</Runtime> || <strong>Fastest Time:</strong> {highscore}ms
      </ScoreCounter>
      <BoardContainer>
        <GameBoard>
          { orderArray.map((value) =>
          <GameSquare key={value} onClick={() => onClickSquare(value)} activated={value <= gameProgress}>
            <GameNumber>
              {value}
            </GameNumber>
          </GameSquare>
          ) }
        </GameBoard>
      </BoardContainer>
    </GameContainer>
  )
}

export default UnlockManifolds;
