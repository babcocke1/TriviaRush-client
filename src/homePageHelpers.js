// import { player, setPlayer } from "./stores";
// export const onStartHomePage = () => {
//     let playerVal;
//     player.subscribe(value => {playerVal = value});   
//     if (playerVal != "") {
//         setPlayer("")
//     }
// }

export const checkName = (username) => {
    let rx = /^[a-zA-z]{1}[a-zA-Z0-9_]{2,11}$/;
    return rx.test(username);
}