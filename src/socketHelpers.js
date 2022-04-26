import { goto } from "$app/navigation";
import { socketStore, state } from "./stores";

let socket;
socketStore.subscribe(sock => {socket = sock});
export const initializeSocketStuff = () => {
    socket.on("startGame", (question) => {
        let stateVal = {
            currentState: "question",
            you: question.you,
            opponent: question.opponent,
            text: question.text,
            answers: question.answers,
            number: question.number
        };
        state.set(stateVal);
        setTimeout(() => {goto("question")}, 3000)
        goto("question");
    });

    socket.on("question", (question) => {
        let stateVal = {
            currentState: "question",
            you: question.you,
            opponent: question.opponent,
            text: question.text,
            answers: question.answers,
            number: question.number
        };
        state.set(stateVal);
        goto("question");
    });
    socket.on("score", (question) => {
        let stateVal = {
            currentState: "question",
            you: question.you,
            opponent: question.opponent,
        };
        state.set(stateVal);
        goto("score");
    });
    socket.on("gameover", (question) => {
    let stateVal = {
        currentState: "question",
        you: question.you,
        opponent: question.opponent,
    };
    state.set(stateVal);
    goto("gameOver");
    });
}