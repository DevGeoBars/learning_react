import React, {useEffect, useRef, useState, type FC, type Ref, forwardRef, useId, useImperativeHandle} from 'react';

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
  const [now, setNow] = useState<number | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  let secondPassed = 0;

  const handleStart = () => {
    setStartTime(Date.now());
    setNow(Date.now());
    intervalIdRef.current && clearInterval(intervalIdRef.current);
    intervalIdRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, 10);

  };

  const handleStop = () => {
    intervalIdRef.current && clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }

  if (now && startTime) {
    secondPassed = (now - startTime) / 1000;
  }


  return <>
    <h1>Time passed: {secondPassed.toFixed(3)}</h1>
    <Button onClick={handleStart}> start</Button>
    <Button onClick={handleStop}> stop</Button>
  </>
}


interface CounterProps {}

export const Counter: FC<CounterProps> = () => {
  const ref = useRef<number>(0);

  const handleClick = () => {
    ref.current = ref.current + 1;
    alert(`You clicked ${ref.current} times!`);
  };

  return (
      <button onClick={handleClick}>
        Click me!
      </button>
  );
};

export const ManipulatingTheDOMWithARef = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const ref = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  };

  return (
      <>
        <button onClick={handleClick}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <video
            width="250"
            ref={ref}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        >
          <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
          />
        </video>
      </>
  );
}



export const AvoidingRecreatingTheRefContents = () => {
  const [count, setCount] = useState(0);
  const usersRef = useRef(getUsers()); // 🚩 Будет вызываться каждый раз при ререндере, хоть и не влияет  ни на что

  return <button onClick={() => setCount(c => ++c)}>count</button>

}


export const BadRef: FC<{}> = () => {
  const myRef = useRef<number>(0);
  const [count, setCount] = useState(0);

  // 🚩 Не записывайте в реф во время рендеринга
  myRef.current += 1;

  // 🚩 Не читайте реф во время рендеринга
  return <>
    <h1>{myRef.current}</h1>
    <button  onClick={() => setCount(c => ++c)}>we update the state value, but if it is used incorrectly, the ref value is also updated.</button>
  </>
};


const getUsers = () => {
  debugger
  return [{id: 2, name: 'as'}, {id: 2, name: 'Geo'}];
}

export * from './useImperativeHandle';
export * from './forwardRef';