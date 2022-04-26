import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { io } from "socket.io-client";
import { readable } from "svelte/store";

export const socketStore = readable({}, set => {
    if (browser) {
        const socket = io("ws://localhost:5000");
        set(socket);
        
        return () => { socket.close() };
    }
    else return () => {};
});

export const state = writable({});


// export const player = writable(
//     let socket;
//     if (browser) {
//         socket = io("ws://localhost:5000");
//         socket.on("start", () => {
//             console.log("startGame!")
//         }
//     }
//     } 
// )
// player.subscribe((val) => browser && sessionStorage.setItem("player", val));

export const opponent = writable(
    browser && (sessionStorage.getItem("opponent")) || ""
)
opponent.subscribe((val) => browser && sessionStorage.setItem("opponent", val));

// export const setPlayer = (value) => {
//     player.update(() => {return value});
// };

// import { readable } from "svelte/store";

// export const socketStore = readable({}, set => {
//     const socket = new WebSocket("ws://localhost:5000/ws/ping");

//     socket.addEventListener("message", function (event) {
//       const data = JSON.parse(event.data);
//       set(data);
//     });

//     return () => { socket.close() };
// });