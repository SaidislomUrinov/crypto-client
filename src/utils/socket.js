import { io } from 'socket.io-client';
import { API } from './req';
const socket = (userId) => {
    return io(API, {
        extraHeaders:{
            'Authorization': userId
        }
    });
};

export default socket;