import React, {useEffect, useRef, useState} from 'react';

import {withLogger} from "@/HOC";
import {LongSection} from "@/components";
import {
  ButtonWithoutForwardRef,
  BadRef,
  Page,
  SimpleUseRef,
  Stopwatch,
  useEffectWithDepsChangeCheck,
  UseImperativeHandleWithDeps,
  ManipulatingTheDOMWithARef,
  AvoidingRecreatingTheRefContents,
  ChatRoom,
  WebDevSimplified1,
  WebDevSimplified2, CheckMousePosition, Welcome, ModalDialog, Box, useWindowListener, useHideCursor
} from "@/hooks";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';
import {Button} from "primereact/button";



function App() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [objectValue, setObjectValue] = useState<{ name: string }>({name: 'As'});
  const [position, setPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{x: number, y: number, id: number}>>([]);
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);

  // useEffectWithDepsChangeCheck((changes: any) => {
  //   console.log(changes)
  // }, {count, text, objectValue});

  useWindowListener('pointermove', (e: any) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  useHideCursor()
  const demoRef = useRef<any>(null);

  return (
    <div className="App">
      <input type={'number'} onChange={(e) => setCount(+e.target.value)} value={count}/>
      <button onClick={() => {
        console.log('demoRef', demoRef);
      }}>log data
      </button>

      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>



      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',

        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -5,
        top: -5,
        width: 10,
        height: 10,
      }} />


    </div>
  );
}

export const AppWithLogger = withLogger(App);

