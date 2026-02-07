// frontend/src/socket/socket.js
import { io } from "socket.io-client";
const URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:6002";
const socket = io(URL, { transports: ['websocket'] });
export default socket;