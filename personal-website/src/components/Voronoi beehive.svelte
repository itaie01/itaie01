<script>
    import { scaleLinear, Delaunay } from 'd3';

    let screenWidth, screenHeight;
    let voronoi;
    let delaunay;

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

    const generateBeeHivePoints = (width, height, loose) => {
        const points = [];
        const col = { width: screenWidth / width, height: screenHeight / height};
        for(let i = -1; i < width + 1; i++) {
            for(let j = -1; j < height + 1; j++) {
                let point = {x: i, y: j};
                point.x = point.x / width * screenWidth + col.width / 2;
                point.y = point.y / height * screenHeight + col.height / 2;
                if(j % 2) {
                    point.x = point.x + (col.width / 2);
                }
                if(loose) {
                    point.x = point.x + (col.width / 4) * Math.random() - col.width / 4;
                    point.y = point.x + (col.height / 4) * Math.random() - col.height / 4;
                }
                if (point.x > 0)
                    points.push(point.x);
                if (point.y > 0)
                    points.push(point.y)
            }
	    }
	    return points;
    }

    $: renderedData = generateBeeHivePoints(screenWidth / 200, screenHeight / 200, true)


    $: if (screenWidth && screenWidth) {
        delaunay = new Delaunay(renderedData)
        voronoi = delaunay.voronoi([0, 0, screenWidth, screenWidth])
    };

    $: console.log(renderedData)
</script>

<main
    bind:clientWidth={screenWidth}
    bind:clientHeight={screenHeight}
    on:mousemove={handleMouseMove}
>
    <svg
        width={screenWidth}
        height={screenHeight}
    >

    {#if voronoi}
        {#each renderedData as datum, index}
            <circle
                cx={datum.x}
                cy={datum.y}
                r="3"
                fill="purple"
                stroke="none"
            />

            <path
                d={voronoi.renderCell(index)}
                fill="none"
                stroke="steelblue"
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
    }
</style>