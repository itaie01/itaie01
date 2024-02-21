<script>
    import { scaleLinear, Delaunay } from 'd3';
    import '../styles/global.css';

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    let darkModeEnabled = darkModeQuery.matches;
    darkModeQuery.addEventListener('change', event => {
        darkModeEnabled = !darkModeEnabled;
        // console.log('Theme changed to:', event.matches ? 'dark' : 'light');
    });


    $: randomColor = () => {
        let randomNum = Math.floor(scaleLinear().domain([0, 1]).range([0, 2])(Math.random()));
        switch (randomNum) {
            case 0:
                return !darkModeEnabled ? '#ECEFF4' : '#2E3440';
            case 1:
                return !darkModeEnabled ? '#E5E9F0' : '#3B4252';
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