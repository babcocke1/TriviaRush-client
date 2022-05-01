import { goto } from "$app/navigation";
import { socketStore, stateStore } from "./stores";
import { get } from "svelte/store";
import { browser } from "$app/env";
import { Socket } from "socket.io-client";
// let sock;
// if (browser) {
//     sock = io("ws://localhost:5000");
//     console.log("socket made" + sock.id)
// }  
// export const socket = sock;

export const initializeSocketStuff = (socket) => {
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
    goto("gameover");
    });
    socket.on("gameended", (question) => {
        goto("")
        socket.disconnect();
        alert("game disconnected");
        goto("")

    });
    socket.on("disconnect", (question) => {
        goto("/")
        socket.disconnect();
        console.log("opponent disconnected")
        goto("/")

    });
};

export const answerQuestion = (socket, answer, number) => {
    let playerResponse = {}
    playerResponse.playerChoice = answer;
    playerResponse.number = number;
    console.log(playerResponse)
    socket.emit("answer", playerResponse);
}

export const isValidGame = async () => {
    let socket = {};
    socketStore.subscribe(s => socket=s)
    if (socket.hasOwnProperty("connected") && socket.connected) {
        return true;
    }
    else {
        goto("/")
        alert("Not connected to server")
        return false;
    }
}
