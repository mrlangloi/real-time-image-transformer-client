import { createContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {

  const socket = socketIOClient(`https://${process.env.REACT_APP_BACKEND_URL}`);
  // const socket = socketIOClient(`ws://localhost:${process.env.REACT_APP_PORT}`);

  // const lastClickedID = useRef(null);
  const [lastClickedID, setLastClickedID] = useState(null);

  // Connect to the websocket when the component mounts
  useEffect(() => {

    const storedID = localStorage.getItem('lastClickedID');
    if (storedID) {
      setLastClickedID(storedID);
    }
    
    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('lastClickedID', lastClickedID);
  }, [lastClickedID]);

  return (
    <WebSocketContext.Provider value={{ socket, lastClickedID, setLastClickedID }}>
      {children}
    </WebSocketContext.Provider>
  );

};

export { WebSocketContext, WebSocketProvider };

