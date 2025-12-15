import {useEffect, useState} from "react";

export const ConnectingToAnExternalSystem  = ({roomId}: {roomId: number}) => {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');

    useEffect(() => {
        const connection = createConnection(roomId, serverUrl);
        connection.connect();

        return () => connection.disconnect();
    }, [serverUrl, roomId]);

    return <>
        Chat № {roomId}
        <button onClick={() => {
            setServerUrl('https://localhost:1235');
        }}>Поменять сервер</button>
    </>
};












const createConnection = (id: number, setServerUrl: string) => {
    return {
        id,
        connect() {
            console.log(`Chat ${this.id} connected on ${setServerUrl}`);
        },
        disconnect() {
            console.log(`Chat ${this.id} disconnected on ${setServerUrl}`);
        }
    }
}
