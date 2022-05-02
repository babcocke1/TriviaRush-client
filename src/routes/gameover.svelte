<script>
import { goto } from "$app/navigation";

import { get } from "svelte/store";

    import {stateStore } from "../stores"
    let win=false;
    let stateVal = get(stateStore);
</script>
<!-- <div class="flex flex-row w-full">
    <div class="flex flex-column justify-middle w-full">
        <div>
        <p> {stateVal.text == "win" ? "You Win!" : "L + Ratio"} </p>    
        </div>
    </div>
    <div class="flex flex-row justify-middle"><div class="flex flex-column justify-middle w-full">
        <div>
        <img src="static/L.gif" alt="Computer man" style="width:48px;height:48px;">
    </div>
    </div>
    </div>
    <div class="flex flex-row">
        <button on:click={()=> {goto("/")}}> play again? </button>
    </div>
</div> -->
<h2> Game Over </h2>
<p>You {stateVal.text == "win" ? "win" : "suck"}</p>