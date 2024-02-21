<script>
    import Tag from "./Tag.svelte";
    export let tagList = [];
    export let imageObj = {};
    const projectTitle = "";
    const projectDescription = "";
    const projectTechnologies = "";
</script>

<div class="pt-[24rem] px-[4rem] ">
    <div class="border-solid border-8 project-pixel-corners border-blue-950 font-pixel text-lg text-wrap dark:text-nordLight0">
        <img src={`../assets/${imageObj.src}`} alt={imageObj.alt} />
    </div>
    <div class="border-l-8 border-b-8 border-r-8 border-solid pixel-corners-bottom border-blue-950">
        {#each tagList as tagItem}
            <Tag text={tagItem} />
        {/each}
    </div>
</div>


<script>
    import Tag from "./Tag.svelte";
    export let tagList = [];
    export let imgSrc = "";
    const projectTitle = "";
    const projectDescription = "";
    const projectTechnologies = "";
</script>

<div class="pt-[24rem] px-[4rem] ">
    <div class="border-l-8 border-b-8 border-r-8 border-solid pixel-corners-bottom border-blue-950">
        {#each tagList as tagItem}
            <Tag text={tagItem} />
        {/each}
    </div>
</div>


