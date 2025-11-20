import { useEffect, useRef, useState, type FC, useCallback } from 'react';
import { UseImperativeHandle } from "@/hooks/ReactBuiltInHooks/refs/UseImperativeHandle";
import { Button } from "primereact/button";


type TSimpleUseRefProps = {};

const objectLiteralOutComponent = { name: 'ge' };

export const SimpleUseRef: FC<TSimpleUseRefProps> = ({}) => {
  const [count, setCount] = useState(0);

  const objectLiteralInComponent = { name: 'ge' };

  const simpleRef = useRef(0);
  const objectRef = useRef(objectLiteralInComponent);
  const objectRef2 = useRef(objectLiteralOutComponent);
  const domRef = useRef(null);
  const refForChildrenComponent = useRef(null);


  useEffect(() => {
    console.log('simpleRef', simpleRef);
    console.log('objectRef', objectRef.current === objectLiteralInComponent);
    console.log('objectRef2', objectRef2.current === objectLiteralOutComponent);
    console.log('domRef', domRef);
    console.log('refForChildrenComponent', refForChildrenComponent);
  }, [count]);
  return (
    <>
      <br/>
      <input type={'number'} onChange={(e) => setCount(+e.target.value)} value={count}/>
      <UseImperativeHandle ref={refForChildrenComponent}/>

      <Button onClick={() => {
        console.log('simpleRef', simpleRef);
        console.log('objectRef', objectRef.current === objectLiteralInComponent);
        console.log('objectRef2', objectRef2.current === objectLiteralOutComponent);
        console.log('domRef', domRef);
        console.log('refForChildrenComponent', refForChildrenComponent);
      }}>get refs values</Button>
      <div ref={domRef}>test</div>
    </>
  );
}


export const Stopwatch: FC<{}> = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  let secondPassed = 0;

  const handleStart = useCallback(() => {
    setStartTime(Date.now());
    setNow(Date.now());
    intervalIdRef.current && clearInterval(intervalIdRef.current);
    intervalIdRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, 10);

  }, [paused]);

  const handlePause = () => {
    if(!paused) {
      intervalIdRef.current && clearInterval(intervalIdRef.current)
      setPaused(true)
    } else {
      intervalIdRef.current && clearInterval(intervalIdRef.current)
      intervalIdRef.current = window.setInterval(() => {
        setNow(Date.now());
      }, 10);
    }

  }

  const handleStop = () => {
    intervalIdRef.current && clearInterval(intervalIdRef.current);

    intervalIdRef.current = null;
  };

  if (now && startTime) {
    secondPassed = (now - startTime) / 1000;
  }


  return <>
    <h1>Time passed: {secondPassed.toFixed(3)}</h1>
    <Button onClick={handleStart}> start</Button>
    <Button onClick={handlePause}> pause </Button>
    <Button onClick={handleStop}> stop</Button>
  </>
}