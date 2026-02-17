import React, {useEffect, useRef, useState} from 'react';

import {withLogger} from "@/HOC";
import {LongSection} from "@/components";
import {
  ButtonWithoutForwardRef,
  BadRef,
  PageUseEffect,
  SimpleUseRef,
  Stopwatch,
  useEffectWithDepsChangeCheck,
  UseImperativeHandleWithDeps,
  ManipulatingTheDOMWithARef,
  AvoidingRecreatingTheRefContents,
  ChatRoom,
  WebDevSimplified1,
  WebDevSimplified2,
  CheckMousePosition,
  Welcome,
  ModalDialog,
  Box,
  useWindowListener,
  useHideCursor,
  UpdatingStateBasedOnPreviousStateFromAnEffect, MeasuringLayoutBeforeBrowserRepaintsScreen
} from "@/hooks";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';
import {Button} from "primereact/button";
import { Map } from "@/hooks/ReactBuiltInHooks/effectHooks/useEffect/usage/ControllingANonReactWidget";



function App() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [objectValue, setObjectValue] = useState<{ name: string }>({name: 'As'});
  const [position, setPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{x: number, y: number, id: number}>>([]);
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);


  const demoRef = useRef<any>(null);

  return (
    <div className="App">

      <MeasuringLayoutBeforeBrowserRepaintsScreen />
    </div>
  );
}

export const AppWithLogger = withLogger(App);

