import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from "framer-motion"

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
  const constraintsRef = useRef(null);
  const x = useMotionValue(0)

  return(
    <div>
      <h1>Swipe Card</h1>
      <SwipeArea ref={constraintsRef}>
        <ReaderArea/>
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
              if (info.offset.x >= 1000) {
                console.log('Swiped too far')
              }
            }
          }
          onDragEnd={
            (event, info) => {
              if (info.offset.x >= 700 && info.offset.x <= 1000) {
                setIsSwiped(true)
              } else {
                setIsSwiped(true)
                setIsSwiped(false)
              }
              setTimeout(() => {
                setIsSwiped(false)
              }, 300)
            }
          }/>
      </SwipeArea>
    </div>
  )
}

export default SwipeCard;
