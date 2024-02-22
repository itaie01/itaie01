<script>
    import { scaleLinear, Delaunay } from 'd3';
    import '../styles/global.css';


    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    let themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    let darkModeEnabled = darkModeQuery.matches;

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.add('hidden');
        darkModeEnabled = false;
    } else {
        themeToggleDarkIcon.classList.add('hidden');
        darkModeEnabled = true;
    }

    const toggleDarkMode = () => {
        // toggle icons inside button
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                darkModeEnabled = true;
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                darkModeEnabled = false;
            }

        // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                darkModeEnabled = false;
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                darkModeEnabled = true;
            }
        }
    }

    darkModeQuery.addEventListener('change', event => {
        toggleDarkMode()
    });

    let themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        toggleDarkMode()
    });

    $: randomColor = () => {
        let randomNum = Math.floor(scaleLinear().domain([0, 1]).range([0, 2])(Math.random()));
        switch (randomNum) {
            case 0:
                return darkModeEnabled ? '#2E3440' : '#ECEFF4';
            case 1:
                return darkModeEnabled ? '#3B4252' : '#E5E9F0';
            // case 2:
            //     return !darkModeEnabled ? '#D8DEE9' : '#434C5E';
            default:
                return 'steelblue';
        }
    }
    
    let width, height;
    let voronoi;

    const data = Array.from({length: 15}).map(() => {
        return {
            a: Math.random(),
            b: Math.random()
        }
    });

    const handleMouseMove = (event) => {
        const { layerX, layerY } = event;
        renderedData = [
            {
                x: layerX,
                y: layerY
            },
            ...renderedData.slice(1)
        ];
    };

    // scales values between 0 and 1 to 0 and width
    $: xScale = scaleLinear()
        .domain([0, 1])
        .range([0, width]);

    $: yScale = scaleLinear()
        .domain([0, 1])
        .range([0, height]);

    $: renderedData = data.map(d => {
        return {
            x: xScale(d.a),
            y: yScale(d.b)
        };
    });

    $: if (width && height) {
        const delaunay = Delaunay.from(renderedData, d => d.x, d => d.y)
        voronoi = delaunay.voronoi([0, 0, width, height])
    };
</script>

<main
    bind:clientWidth={width}
    bind:clientHeight={height}
>
    <!-- on:mousemove={handleMouseMove} -->
    <svg
        width={width}
        height={height}
    >

    {#if voronoi}
        {#each renderedData as datum, index}
            <circle
                cx={datum.x}
                cy={datum.y}
                r="3"
                fill="none"
                stroke="none"
            />

            <path 
                d={voronoi.renderCell(index)}
                fill={randomColor()}
                stroke="none"
                stroke-width="1"
            />
        {/each}
    {/if}
    
    </svg>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: absolute;
        z-index: -10;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>