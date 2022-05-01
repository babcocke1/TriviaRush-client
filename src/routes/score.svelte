<script>
    import {socketStore, stateStore} from "../stores";
    import { tweened } from 'svelte/motion';
    import "../app.css"
    import { answerQuestion as aq, isValidGame } from "../socketHelpers";
    import { onMount } from "svelte"
    onMount(() => {
        isValidGame();
    })
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
    stateStore.subscribe(val => stateVal = val);
    $: console.log(stateVal)
    const progress = tweened(0, {
		duration: 30000,
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
    
    // stateStore.subscribe((state) => stateVal=state);
</script>
    <!-- score -->
    <div class="h-5 "> </div>
    <div class="flex flex-row  w-full center justify-center m-15 ">
        <h1 class="text-8xl text-center text-white  rounded-lg w-fit  object-center m-15">  Current Score  </h1>
    </div> 
    <div class="h-5 "> </div>
    <div class="h-5 "> </div>

    <div class="flex flex-row  w-full center justify-center rounded-lg">
        <div class="  w-1/3   justify-center rounded-lg">
            <h1 class="text-5xl text-center text-white  ">{stateVal.you.name}:</h1>
            <h1 class="text-5xl text-center text-white  ">{stateVal.you.score}:</h1>

        </div>
        <div class="w-2"></div>    
        <div class="  w-1/3   justify-center rounded-lg">
            <h1 class="text-5xl text-center text-white ">{stateVal.opponent.name}:</h1>
            <h1 class="text-5xl text-center text-white ">{stateVal.opponent.score}:</h1>

        </div>
    </div>
    

<div class="bg">

</div> 
    


<style>

    .bg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: -1;
    	background:#3f35ff;

    }
</style>    