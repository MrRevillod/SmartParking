"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const URL =
    process.env.NEXT_PUBLIC_MODE === "PRODUCTION"
        ? process.env.NEXT_PUBLIC_SOCKET_PROD
        : process.env.NEXT_PUBLIC_SOCKET_DEV;

let socket;
export default function Page() {
    useEffect(() => {
        console.log("useEffec");


        const token = localStorage.getItem("token");
        const socket = io(URL, {
            auth: {
                token,
            },
        });

        socket.on("welcome",(msg) => {
          console.log(msg);
        })

    }, []);

    return (
        <>
            <div>xd</div>
        </>
    );
}
    