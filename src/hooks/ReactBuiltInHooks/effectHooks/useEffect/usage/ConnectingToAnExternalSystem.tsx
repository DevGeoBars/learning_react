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
