<script>
    import {stateStore} from "../stores";
    import "../app.css"
    let stateVal;
    stateVal = {
        you: {name: "Eric", score: 3},
        opponent: {name: "Carleigh", score: 4},
        text: "What keyword makes a class member visible to child classes but not to outside classes?",
        answers: [
            {answer: "public", correct: false},
            {answer: "private", correct: false},
            {answer: "virtual", correct: true},
            {answer: "static", correct: false}
        ],
        number: 2
    }
    import { tweened } from 'svelte/motion';
    const progress = tweened(0, {
		duration: 20000,
		easing: p=> {return p;} 
	});
    let background = [
        ["", "#6ee7b7"],
        ["", "#fca5a5"],
        ["","#fca5a5"],
        ["","#fca5a5"],
        ["", "bg-blue-400"]
    ];
    let backgroundIdx = 0;
    progress.set(100);
    let disabled= false;
    $: if ($progress == 100) {
        disabled= true;
        backgroundIdx = 1;
    }
    const answer1 = () => {
        backgroundIdx = 1;
        disabled=true;
    }
    const answer2 = () => {
        backgroundIdx = 1;
        disabled= true;

    }

    const answer3 = () => {
        backgroundIdx = 1;
        disabled= true;
    
    }
    
    const answer4 = () => {
        backgroundIdx = 1;
        disabled= true;
    }
    // stateStore.subscribe((state) => stateVal=state);
</script>
<div class="flex flex-col h-screen">
    <!-- score -->
    <div class="h-2"> </div>
    <div class="flex flex-row w-11/12 h-10 justify-between self-center" id="score">
            <div id="player1" class="flex flex-row basis-auto">
                {#each [...Array(stateVal.you.score).keys()] as i}
                <div class="h-8 w-8 green dot"></div>
                {/each}
                {#each [...Array(5 - stateVal.you.score).keys()] as i}
                <div class="h-8 w-8 grey dot "></div>
                {/each}
            </div>
                <progress class="progress progress-primary w-2/5 h-5/6 center timer" 
                    value={100 - $progress} max="100" style="--p: 226 71% 40%"></progress>     
            <div id="player1" class="flex flex-row basis-auto">
                {#each [...Array(stateVal.you.score).keys()] as i}
                <div class="h-8 w-8 red dot"></div>
                {/each}
                {#each [...Array(5 - stateVal.you.score).keys()] as i}
                <div class="h-8 w-8 grey dot "></div>
                {/each}
            </div>        
    </div>
    <div class="h-2"> </div>
    <div class="w-11/12 h-1/3 self-center" style="">
        <div class="w-full bg-blue-800 rounded-xl flex flex-row self-center {background[4][backgroundIdx]}" style="height: 95%">
            <div class="w-full h-1/12  rounded-xl flex flex-col self-center ">

            <p class="text-2xl text-white text-center h-full self-center" style="">How is Carleigh so beautiful??? </p>

            </div>
        </div>
    </div>
    <div class="flex flex-col w-11/12 self-center " style="height:50%">
        <div class="flex flex-row h-1/2 w-full self-center justify-between">
            <button class="btn h-4/5 w-6/12 self-center bg-blue-800 " style="height:95%;width: 48%;--nf: 14 64% 40%;background-color:{background[0][backgroundIdx]}" on:click={answer1} disabled={disabled}>
                Because shes the cutest
            </button>
            <button class="btn h-4/5 w-6/12 self-center bg-blue-800 " style="height:95%;width: 48%;--nf: 218 64% 40%;background-color:{background[1][backgroundIdx]}" on:click={answer1} disabled={disabled}>Shes not even that cute</button>
        </div> 
        <div class="flex flex-row h-1/2 w-full self-center justify-between">
            <button class="btn h-4/5  self-center bg-blue-800" style="height:95%;width: 48%;--nf: 222 64% 40%;background-color:{background[2][backgroundIdx]}" on:click={answer1} disabled={disabled}>She looks weird</button>
            <button class="btn h-4/5  self-center bg-blue-800" style="height:95%;width: 48%;--nf: 222 64% 40%;background-color:{background[3][backgroundIdx]}" on:click={answer1} disabled={disabled}>Shes a 1/10</button>
        </div> 

    </div>
        
        <!-- <span class="dot w-"> </span>
            <progress class="progress progress-primary w-56 h-5/6 center" value="40" max="100"></progress> -->
</div>
        
    

    <!-- <p>
        {stateVal.you.name}
        {stateVal.you.score}
        {stateVal.opponent.name}
        {stateVal.opponent.score}

        {stateVal.opponent}
        {stateVal.text}
        {stateVal.answers[1].answer}
        {stateVal.answers[1].correct}

        {stateVal.number}
    </p> -->

<div class="bg">

</div> 
    


<style>
    .green {
        background-color: #95e69f;
        
    }
    .grey {
        background-color:#C4C4C4;
    }
    .red {
        background-color:#FF0000
    }
    
    .bg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        background: #6D7CFF;
    }
    .dot {
        margin: 2px;
        border-radius: 50%;
        display: inline-block;
    }
    .timer {
        margin: 5px;
        background-color: #C4C4C4 ;
    }
</style>    