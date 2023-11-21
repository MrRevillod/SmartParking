import { useEffect } from 'react';

import { SocketContext } from './socketContext.jsx';

import { Toast } from './Toast.jsx';

export const SocketContextProvider = ({ children, socket }) => {


    useEffect(() => {

        socket.on("connect", () => {
            
            Toast({ msg: 'Socket Connected' })

            socket.on("new-reservation", (msg) => {
                Toast({ msg: msg })
            })

            socket.on("disconnect", () => {
                Toast({ msg: 'Socket Disconnected' })
            })


        });
        return () => socket.close();
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};