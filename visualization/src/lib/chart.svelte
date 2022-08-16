<script>
    export let title;
    export let cur;
    export let theme;
    export let frames;
</script>

<main style="background-color: {theme}">
    <h1>{title}</h1>
    <div class="container">
        {#each frames[cur].cells as row}
        <div class="row">
            {#each row as cell}
            <div class="cell" style="background-color: rgba(255, 255, 255, {cell / 4})"/>
            {/each}
        </div>
        {/each}
    </div>
    <div class="foot">
        <p>Days: {Math.floor(cur / 10)}</p>
        <p>Merged: {frames[cur].merged}</p>
    </div>
</main>

<style>
main {
    display: inline-flex;
    flex-direction: column;
}
h1 {
    text-align: center;
    margin-top: 2rem;
    font-size: 1rem;
    margin: auto;
}
p {
    font-size: 0.8rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: bold;
}
.container {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
}
.row {
    display: flex;
    flex-direction: row;
}
.cell {
    width: 15px;
    height: 15px;
}
.foot {
    display: flex;
    justify-content:space-around;
    flex-direction: row;
    margin: auto;
}
</style>
  