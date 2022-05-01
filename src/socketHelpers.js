import { goto } from "$app/navigation";
import { stateStore } from "./stores";
import { browser } from "$app/env";
import { io } from "socket.io-client";
// let sock;
// if (browser) {
//     sock = io("ws://localhost:5000");
//     console.log("socket made" + sock.id)
// }  
// export const socket = sock;

export const initializeSocketStuff = (socket) => {
    socket.on("*", (c) => console.log(c))
    socket.on("startgame", (question) => {
        console.log("startgame");
        let stateVal = {
            currentState: "MatchFound",
            you: question.you,
            opponent: question.opponent,
            text: question.text,
            answers: question.answers,
            number: question.number
        };
        stateStore.set(stateVal);
        
        setTimeout(() => {goto("question")}, 3000)
        // goto("question");
    });

    socket.on("question", (question) => {
        let stateVal = {
            currentState: "Question",
            you: question.you,
            opponent: question.opponent,
            text: question.text,
            answers: question.answers,
            number: question.number
        };
        stateStore.set(stateVal);
        goto("question");
    });
    socket.on("score", (question) => {
        let stateVal = {
            currentState: "Score",
            you: question.you,
            opponent: question.opponent,
            text: "",
            answers: "",
            number: ""
        };
        stateStore.set(stateVal);
        goto("score");
    });
    socket.on("gameover", (question) => {
    let stateVal = {
        currentState: "GameOver",
        you: question.you,
        opponent: question.opponent,
        text: "",
        answers: "",
        number: ""
    };
    stateStore.set(stateVal);
    goto("gameOver");
    });
}