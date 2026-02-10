// frontend/src/socket/socket.js
import { io } from "socket.io-client";
const URL = process.env.REACT_APP_SOCKET_URL || "https://api.mathmaster.co.in";
const socket = io(URL, { transports: ['websocket'] });
export default socket;