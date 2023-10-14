import io from 'socket.io-client';
import Toast from './lib/Toast';
let socket ; 

export const initiateSocket = () => {
  socket = io('http://localhost:3000')
  Toast({msg:"Socket Connected",pos:"bottom-right"});
  if (socket){ socket.emit('join-admin')};
}

export const disconnectSocket = () => {
  if(socket) socket.disconnect();
  Toast({msg:"Socket Disconnected",pos:"bottom-right"});
}


export const getPeticiones = (callback) => {
    socket.on('all-reservations', data => {
        callback(null, data.reservations);       
    });
}

export const getNew = (callback) => {
    socket.on('new-reservation', data => {
        callback(null, data.reservation);       
    });
}