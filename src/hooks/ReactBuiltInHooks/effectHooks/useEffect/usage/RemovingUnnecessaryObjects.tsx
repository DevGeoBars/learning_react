import {useEffect, useState} from "react";

//Removing unnecessary object or function from dependencies

export const ChatRoom2  = ({roomId}: {roomId: string}) => {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // const options = {
  //   roomId,
  //   serverUrl
  // }; 🚩 This object is created from scratch on every re-render


  // function createOptions() {
  //   return {
  //     serverUrl: serverUrl,
  //     roomId: roomId
  //   };
  // } 🚩 This function is created from scratch on every re-render


  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
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
//#region helpers

const createConnection = ({roomId, serverUrl}: {roomId: string, serverUrl: string}) => {
  return {
    connect() {
      console.log(`Chat ${roomId} connected on ${serverUrl}`);
    },
    disconnect() {
      console.log(`Chat ${roomId} disconnected on ${serverUrl}`);
    }
  }
}
//#endregion