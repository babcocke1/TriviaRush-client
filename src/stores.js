import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { readable } from "svelte/store";
import { io } from "socket.io-client"
// export const socketStore = writable({});

export const stateStore = writable({
    currentState: "None",
    you: {},
    opponent: {},
    text: {},
    answers: {},
    number: {}
});

export const socketStore = writable({}, set => {
    if (browser) {
        // const socket = io("https://trivia-rush-gameserver.herokuapp.com/");
        const socket = io("ws://localhost:5000");

        socket.emit("message", "connection");
        set(socket)
        return () => { socket.close() };
    }
    return () => {}; 
});
 
// export const opponent = writable(
//     browser && (sessionStorage.getItem("opponent")) || ""
// )
// opponent.subscribe((val) => browser && sessionStorage.setItem("opponent", val));

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