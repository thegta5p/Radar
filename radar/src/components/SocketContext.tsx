import { createContext } from 'react';
import { io } from 'socket.io-client';



const SocketContext = createContext(null);


export default SocketContext;