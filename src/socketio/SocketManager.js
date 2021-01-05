import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_ENDPOINT, {
  transports: ["websocket"],
  upgrade: false,
});

let socketManager = {
  openSocket: function () {
    socket = io(process.env.REACT_APP_ENDPOINT);
    return socket;
  },
  getSocket: function () {
    // if (socket === undefined) {
    //   this.openSocket();
    // }
    return socket;
  },
  closeSocket: function () {
    socket.disconnect();
    socket.off();
    console.log(socket);
  },
};

export default socketManager;
