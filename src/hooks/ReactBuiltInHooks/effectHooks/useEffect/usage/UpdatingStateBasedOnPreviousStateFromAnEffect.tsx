import React, {useEffect, useState} from 'react';


type TUpdatingStateBasedOnPreviousStateFromAnEffectProps = {}

export const UpdatingStateBasedOnPreviousStateFromAnEffect: React.FC<TUpdatingStateBasedOnPreviousStateFromAnEffectProps> = ({}) => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCount(count + 1); You want to increment the counter every second...
  //   }, 1000)
  //   return () => clearInterval(intervalId);
  // }, [count]);  🚩 ... but specifying `count` as a dependency always resets the interval.

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <>{count}</>
}

