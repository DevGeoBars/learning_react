import {useEffect, useState, FC, useRef, ReactNode,} from "react";

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
export const Welcome: FC<{show: boolean}> = ({show}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const animationRef = useRef<FadeInAnimation | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    animationRef.current = new FadeInAnimation(ref.current);
  }, []);

  useEffect(() => {
    if (!animationRef.current) return;

    if (show) {
      animationRef.current.start(1000);
    } else {
      animationRef.current.stop();
    }
  }, [show]);

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

//Controlling a modal dialog
export const ModalDialog: FC<ModalDialogProps> = ({ isOpen, onClose, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isOpen) {
      ref.current.showModal();
    } else {
      ref.current.close();
      onClose();
    }
  }, [isOpen]);

  return <dialog
    ref={ref}
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.3s ease',
      opacity: isOpen ? 1 : 0,
    }}
    onClose={onClose}
  >
    {children}
  </dialog>;
};

//Tracking element visibility
export const Box: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const div = ref.current;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      console.log(entry.isIntersecting); // true/false - виден ли элемент
      console.log(entry.intersectionRatio); // 0.0 - 1.0 - какая часть видна
      console.log(entry.boundingClientRect); // размеры и позиция элемента

      if (entry.isIntersecting) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        div.style.width = '200px';
      } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        div.style.width = '20px';
      }
    }, {
      threshold: 1.0
    });

    observer.observe(div);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        margin: 20,
        height: 100,
        width: 100,
        border: '2px solid black',
        backgroundColor: 'blue',
        transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    />
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
  private isFadingOut: boolean = false;
  private initialOpacity: number = 0;

  constructor(node: HTMLElement) {
    this.node = node;
    this.initialOpacity = parseFloat(node.style.opacity) || 0;
  }

  start(duration: number): void {
    this.resetAnimation();
    this.duration = duration;
    this.isFadingOut = false;
    this.initialOpacity = parseFloat(this.node.style.opacity) || 0;

    if (this.duration === 0) {
      this.onProgress(1);
    } else {
      this.onProgress(this.initialOpacity);
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  stop(): void {
    this.isFadingOut = true;
    this.initialOpacity = parseFloat(this.node.style.opacity) || 1;
    this.duration = 300; // 300ms для исчезновения
    this.startTime = performance.now();

    if (this.frameId === null) {
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  private resetAnimation(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    this.frameId = null;
    this.startTime = null;
  }

  private onFrame(): void {
    if (this.startTime === null) return;

    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);

    let opacity: number;
    if (this.isFadingOut) {
      opacity = this.initialOpacity * (1 - progress); // Исчезновение от текущей прозрачности
    } else {
      opacity = this.initialOpacity + (1 - this.initialOpacity) * progress; // Появление от текущей прозрачности
    }

    this.onProgress(opacity);

    if (progress < 1) {
      this.frameId = requestAnimationFrame(() => this.onFrame());
    } else {
      this.resetAnimation();
    }
  }

  private onProgress(progress: number): void {
    this.node.style.opacity = Math.max(0, Math.min(1, progress)).toString();
  }
}
//endregion


//region types
interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
//endregion






