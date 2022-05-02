<script>
    import { browser } from '$app/env';
    import { checkName } from "../homePageHelpers"
    import '../app.css';
    import { socketStore } from "../stores"
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { initializeSocketStuff } from "../socketHelpers"
    // import { socket } from "../socketHelpers"
    import { io } from "socket.io-client";
    // import { socketStore } from '../stores';
    let socket;
    // bind to text input   
    let name = "";
    let playerObject = {};
    onMount(() => {
        if (browser) {
                // socket = io("ws://localhost:5000");
                // socket.emit("message", "peni")
                // // socketStore.set(socket);
                // // console.log(socket.id);
                // console.log(socket)
                // console.log("hello");
            }
    })

    let playGame = async () => {
        if(!checkName(name)) {
            browser && alert("-- Name must start with a letter\n" +
            "-- Name must be 3-12 characters\n" + 
            "-- Name can include numbers and underscores")
        }  
        else {
            console.log("ayo")
            let sock = io("https://trivia-rush-gameserver.herokuapp.com/");
            // let sock = io("ws://localhost:5000");
            sock.emit("message", "client?");
            socketStore.set(sock);
            let s = {};
            socketStore.subscribe(socket => s = socket);
            let numTries = 0;
            while (!s.connected && numTries <= 10){
                await new Promise(r => setTimeout(r, 200));
                numTries += 1
            }
            if (!s.connected) {
                alert("cant connect socket please try again later");
                return;
            }
            playerObject.name = name;
            initializeSocketStuff(s);
            s.emit("enterQueue", playerObject);
                        
            console.log(playerObject);

            goto("loading");
        }
    }
</script>
<body class="Aligner">
    <div class="">
        <div class="container mx-auto">  
            <img src="title.png" alt="Trivia Rush Logo" class="mx-auto">
        </div>
            <div class="container mx-auto  ">
            <div class="form-control  w-full max-w-xs mx-auto">
                <form class="label max-w-sm mx-auto" id="form1" on:submit|preventDefault>
                    <input type="text" placeholder="What should we call you" 
                        class="input input-bordered " bind:value={name} > 
                    <button class="btn btn-ghost prompt border min-w-100" on:click={playGame} >play</button>
                </form >
            </div>
        </div>
    </div>
    
</body>
<div class="bg">

</div>   

<style>
	.Aligner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
    .prompt {
        color:#FFFFFF
    }
    .bg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: -1;
    	background: linear-gradient(81.32deg, #6D7CFF 34%, #F54968 66%);

    }
    body {
        position: absolute;
        top:0;
        height: 100%;
        width: 100%;
    }

</style>
