<script>
    import { browser } from '$app/env';
    import { socketStore } from "../stores";
    import { checkName } from "../homePageHelpers"
    import '../app.css';
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    
    
    // bind to text input
    let name = "";
    let playerObject = {};
    let socket;
    socketStore.subscribe(sock => {socket = sock});
    onMount(() => {
        // onStartHomePage();    
    })
    let playGame = () => {
        if(!checkName(name)) {
            browser && alert("-- Name must start with a letter\n" +
            "-- Name must be 3-12 characters\n" + 
            "-- Name can include numbers and underscores")
        }  
        else {
            playerObject.name = name;
            // socket.emit("enterQueue", playerObject);
            socket.emit("enterQueue", playerObject);

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
