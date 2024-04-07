import io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000"; // Replace with your actual WebSocket URL

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    this.socket = io(SOCKET_URL, {
      query: { token },
    });

    this.socket.on("connect", () => console.log("Socket connected"));
    this.socket.on("disconnect", () => console.log("Socket disconnected"));
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(event, func) {
    if (this.socket) {
      this.socket.on(event, func);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  off(event, func) {
    if (this.socket) {
      this.socket.off(event, func);
    }
  }
}

const socketService = new SocketService();

export default socketService;
