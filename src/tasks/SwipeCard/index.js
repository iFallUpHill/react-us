import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';

import TaskName from '../../components/TaskName';
import ScoreCounter from '../../components/ScoreCounter';

const Card = styled(motion.div)`
  height: 150px;
  width: 250px;
  background: #DFDEDF;
  box-sizing: border-box;
  border: 5px solid #ADACAD;

`

const SwipeArea = styled(motion.div)`
  height: 150px;
  width: 950px;
  background: #949395;
`

const ReaderArea = styled.div`
  height: 75px;
  width: 700px;
  margin-left: 125px;
  position: absolute;
  z-index: 9999;
  background: #1B191B;
  display: flex;
  align-items: center;
`

const ReaderMessage = styled.div`
  color: #fff;
  margin: 16px;
  font-size: 24px;
  text-transform: uppercase;
  background: #144C39;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 3px #0B0A0A solid;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

const CurrentSwipeTime = styled.span`
  color: ${props => (props.lapse >= 650 && props.lapse <= 750) ? "green" : "red"};
`

const variants = {
  start: { 
    x: 0,
    transition: { duration: 0.3 },
  },
  end: { 
    x: 700,
    transition: { duration: 0 },
  },
}

const SwipeCard = () => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [swipeTime, setSwipeTime] = useState(0);
  const [successfulSwipes, setSuccessfulSwipes] = useState(0);
  const [totalSwipes, setTotalSwipes] = useState(0);
  const [readerMessage, setReaderMessage] = useState("Please swipe card.");
  const [lapse, setLapse] = useState(0);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0)

  const swipeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(swipeTimerRef.current);
    }
  }, [])

  return(
    <div>
      <TaskName>Swipe Card</TaskName>
      <ScoreCounter>
        <strong>Current Time:</strong> <CurrentSwipeTime lapse={lapse}>{lapse}ms</CurrentSwipeTime> || <strong>Last Successful Swipe:</strong> {swipeTime}ms || <strong>Successful Swipes:</strong> {successfulSwipes}/{totalSwipes} ({totalSwipes > 0 ? Math.round(successfulSwipes * 100/totalSwipes) : 0}%)
      </ScoreCounter>
      <SwipeArea ref={constraintsRef}>
        <ReaderArea>
          <ReaderMessage>
            {readerMessage}
          </ReaderMessage>
        </ReaderArea>
        <Card 
          drag="x" 
          dragElastic={0.3} 
          dragConstraints={constraintsRef}
          animate={isSwiped ? "end" : "start"}
          variants={variants}
          style={{x}}
          onDrag={
            (event, info) => {
              if (info.offset.x >= 700) {
                x.set(700);
              } 
            }
          }
          onDragStart={
            () => {
              const startTime = Date.now() - lapse;
              swipeTimerRef.current = setInterval(() => {
                setLapse(Date.now() - startTime);
              }, 0)
            }
          }
          onDragEnd={
            (event, info) => {
              clearInterval(swipeTimerRef.current);
              setIsSwiped(true);

              if (lapse < 650) {
                setReaderMessage("Too fast. Try again.");
                setIsSwiped(false);
              } else if (lapse > 750) {
                setReaderMessage("Too slow. Try again.");
                setIsSwiped(false);
              } else if (info.offset.x < 700 || info.offset.x > 900) {
                setReaderMessage("Bad read. Try again.");
                setIsSwiped(false);
              } else {
                setReaderMessage("Accepted. Thank you.");
                setSuccessfulSwipes(successfulSwipes + 1);
                setSwipeTime(lapse);
                setTimeout(() => {
                  setIsSwiped(false);
                }, 500)
              }
              setLapse(0);
              setTotalSwipes(totalSwipes + 1);

              setTimeout(() => {
                setReaderMessage("Please swipe card.");
              }, 500)
            }
          }/>
      </SwipeArea>
    </div>
  )
}

export default SwipeCard;
