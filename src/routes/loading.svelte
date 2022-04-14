<script>
    import { onMount } from 'svelte';
    import '../app.css';

    let angle = "0deg";
    let angleNum = 0;
    let colors = [
        "#6D7CFF",
        "#F54968",
        "#51087e",
        "#fe7f9c"
    ];
    let index = 1;
    $: dots = 0;
    let loading
    let color1 = colors[(index-1)%4];
    let color2 = colors[index%4];
    
    let percent1num = 25;
    let percent2num = 75;
    let percent1 = "25%";
    let percent2 = "75%";
    let count = 0
    percent1 = percent1num.toString() + "%"
    percent2 = percent2num.toString() + "%"
    onMount(() => {
        setInterval(() => {
            angleNum += .33;
            angle = angleNum.toString() + "deg";
            percent1num -= .7;
            percent2num -= .7;
            percent1 = percent1num.toString() + "%"
            percent2 = percent2num.toString() + "%"
            count += 1
            if (count == 30) {
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
            setBackground();
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

</script>

<body>
    <h1 class="Loading mx-auto">searching for <br>a match{".".repeat(dots)}</h1>
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
