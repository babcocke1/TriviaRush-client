<script>
    import '../app.css';
    import 'path'
    let play = "play";
    export const loadNextPage = () => {}
    
    let m = "ayooo";

    // socketio
    // import { io } from "socket.io-client";

    // const socket = io("localhost:5000");

    let sendMessage = () => {
        // send a message to the server
        // socket.emit("message", m);
        console.log(m);
        play += 'y';
        // window.location.href = "/loading";
    }
    
</script>
<body class="Aligner">
    <div class="">
        <div class="TitleImage ">
            <img src="title.png" alt="Trivia Rush Logo">
        </div>
        <div class="container mx-auto  ">
            <div class="form-control  w-full max-w-xs mx-auto">
                <form class="label max-w-sm mx-auto" id="form1" on:submit|preventDefault>
                    <input type="text" placeholder="What should we call you" 
                        class="input input-bordered "> 
                    <button class="btn btn-ghost prompt border min-w-100" on:click={sendMessage} >{play}</button>
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
