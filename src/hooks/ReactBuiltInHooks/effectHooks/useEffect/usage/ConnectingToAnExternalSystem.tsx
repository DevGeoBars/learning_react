import {useEffect, useState} from "react";
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
export const CheckMousePosition: FC<AppProps> = () => {
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
