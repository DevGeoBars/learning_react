import {useEffect, useState, FC, useRef, } from "react";

import {s} from "vitest/dist/reporters-w_64AS5f";

// Usage Connecting to an external system
export const ChatRoom  = ({roomId}: {roomId: string}) => {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');

    useEffect(() => {
        const connection = createConnection(roomId, serverUrl);
        connection.connect();

        return () => connection.disconnect();
    }, [serverUrl, roomId]);

    return <>
        <label>
            Server URL:{' '}
            <input
              value={serverUrl}
              onChange={e => setServerUrl(e.target.value)}
            />
        </label>
        <h1>Welcome to the {roomId} room!</h1>
    </>

};


//Listening to a global browser event
export const CheckMousePosition: FC<{  }> = () => {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e: PointerEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('pointermove', handleMove);

        return () => {
            window.removeEventListener('pointermove', handleMove);
        };
    }, []);

    return (
      <div style={{
          position: 'absolute',
          backgroundColor: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
      }} />
    );
};

//Triggering an animation
export const Welcome: FC = () => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = new FadeInAnimation(ref.current);
    animation.start(1000);

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      Welcome
    </h1>
  );
};


//#region helpers

const createConnection = (roomId: string, serverUrl: string) => {
  return {
    connect() {
      console.log(`Chat ${roomId} connected on ${serverUrl}`);
    },
    disconnect() {
      console.log(`Chat ${roomId} disconnected on ${serverUrl}`);
    }
  }
}


export class FadeInAnimation {
  private node: HTMLElement;
  private duration: number = 0;
  private startTime: number | null = null;
  private frameId: number | null = null;

  constructor(node: HTMLElement) {
    this.node = node;
  }

  start(duration: number): void {
    this.duration = duration;

    if (this.duration === 0) {
      this.onProgress(1);
    } else {
      this.onProgress(0);
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  private onFrame(): void {
    if (this.startTime === null) return;

    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);

    if (progress < 1) {
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  private onProgress(progress: number): void {
    this.node.style.opacity = progress.toString();
  }

  stop(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }

    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
//endregion









