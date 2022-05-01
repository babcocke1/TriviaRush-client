<script>
    // import { socketStore } from "../stores" 
    import { onMount } from 'svelte';
    import '../app.css';
    import { stateStore } from "../stores";
    import { browser } from "$app/env";

    let matchStarting = false;
    let opponentName
    let stateVal;
    stateStore.subscribe((value) => stateVal = value);
    $: console.log(stateVal)
    $: if (browser && stateVal.currentState === "MatchFound") {
        console.log("ayooo")
        matchStarting = true;
        opponentName = stateVal.opponent.name;
    } 
    let countdown = 3;

    // socketStore.subscribe(sock => socket = sock)
    
    // initialize ui stuff
    let angle = "0deg"; // angle for background gradient

    let angleNum = 0; // num for changing angle
    
    let colors = [
        "#6D7CFF",
        "#F54968",
        "#51087e",
        "#fe7f9c"
    ];
    
    let index = 1; // index used to pick colors for background
    
    $: dots = 0; // num of dots on loading screen
    $: searching = "searching for <br>a match" + ".".repeat(dots);
    
    let matchString = "Match Starting:<br>";
    let color1 = colors[(index-1)%4]; // two colors on display at all times
    let color2 = colors[index%4];
    
    // percents for gradient

    let percent1num = 25; 
    let percent2num = 75;
    let percent1 = "25%";
    let percent2 = "75%";
    let count = 0;
    percent1 = percent1num.toString() + "%"
    percent2 = percent2num.toString() + "%"
    
    
    let interval;
    onMount(() => {
        console.log("gello?")
        interval = setInterval(() => {
            angleNum += .33;
            angle = angleNum.toString() + "deg";
            percent1num -= .7;
            percent2num -= .7;
            percent1 = percent1num.toString() + "%"
            percent2 = percent2num.toString() + "%"
            count += 1
            if (count >= 30) {
                dots = (dots + 1) % 4;
                count = 0;
            }
            if (angleNum > 360) {
                angleNum -= 360;
                
            }
            if (percent2num <= 0) {
                percent1 = percent1num.toString() + "%"
                percent2 = percent2num.toString() + "%"
                color1 = color2;
                percent1num = 100;
                percent2num = 150;
                percent1 = percent1num.toString() + "%"
                percent2 = percent2num.toString() + "%"                
                
                index += 1;
                index = index%4;
                color2 = colors[index];
            }
            try {
                setBackground();
            } catch {
                // stop the animation on navigate to other page.
                clearInterval(interval)
            }
        }, 20);
    });
    let setBackground;
    onMount( () => {
        setBackground = () => {
            let background = document.getElementById("background");
            background.style.setProperty("--color1", color1);
            background.style.setProperty("--color2", color2);
            background.style.setProperty("--angle", angle);
            background.style.setProperty("--percent1", percent1);
            background.style.setProperty("--percent2", percent2);
        }
    });

    export const onStart = {
        toggl() {
        matchStarting = true;
        setTimeout(() => {
            countdown -1;
        }, 1000);
        setTimeout(() => {
            countdown -1;
        }, 2000);
    }

    };
    export const test = {};
</script>

<body>
    {#if !matchStarting}
        <h1 class="Loading mx-auto">{@html searching}</h1>
    {:else}
        <h1 class="Loading mx-auto">{@html matchString} {opponentName}</h1>
        
    {/if}
    <!-- <button on:click={onPress}>yooooo</button> -->
    <!-- <h1>hi{storeVal}</h1> -->
</body>

<div class="bg" id="background"></div>

<style>
    h1 {
        font-size: 80px;

    }
    .Loading{
        color: white;
    }
    .bg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: -1;
   
        background: linear-gradient(var(--angle),var(--color1) var(--percent1), var(--color2) var(--percent2));
    }
    body {
        position: absolute;
        height: 100%;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        top: 0;
        display: flex;
    }
</style>
