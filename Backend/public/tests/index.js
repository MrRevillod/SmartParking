

// const getToken = async () => {
//     const response = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: "lrevillod2022@alu.uct.cl",
//             password: "!a1234567A",
//         })
//     })

//     if (!response.ok) {
//         const { message } = await response.json()
//         throw new Error(message)
//     }

//     const result = await response.json()
//     return result.token

// }

// const token = await getToken()

// const socket = io("http://localhost:3000", {
//     auth: {
//         token
//     },
// });

    // socket.on("connect", () => {
    //     console.log("Conectado al servidor de sockets");
    // });

// socket.on("disconnect", () => {
//     console.log("Desconectado del servidor de sockets");    
// }); 

// socket.emit("miEvento", { data: "Algo importante" });