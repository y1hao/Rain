<script>
  import { createFrames } from "./lib/createFrames";
  import Chart from "./lib/chart.svelte";
  import dotnet from "../../data/aspnetcore.json";
  import kubernetes from "../../data/kubernetes.json";
  import redis from "../../data/redis.json";
  import terraform from "../../data/terraform.json";
  import kafka from "../../data/kafka.json";
  import react from "../../data/react.json";
  import vue from "../../data/vue.json";
  import svelte from "../../data/svelte.json";

  const items = [
    {
      title: "dotnet/aspnetcore",
      theme: "#512bd4",
      frames: createFrames(dotnet)
    },
    {
      title: "kubernetes/kubernetes",
      theme: "#3371e3",
      frames: createFrames(kubernetes)
    },
    {
      title: "redis/redis",
      theme: "#c40c02",
      frames: createFrames(redis)
    },
    {
      title: "hashicorp/terraform",
      theme: "rgb(132, 79, 186)",
      frames: createFrames(terraform)
    },
    {
      title: "apache/kafka",
      theme: "black",
      frames: createFrames(kafka)
    },
    {
      title: "facebook/react",
      theme: "#61dafb",
      frames: createFrames(react)
    },
    {
      title: "vuejs/core",
      theme: "#33a06f",
      frames: createFrames(vue)
    },
    {
      title: "sveltejs/svelte",
      theme: "#ff3e00",
      frames: createFrames(svelte)
    },
  ]

  let cur = 0;
  function start() {
    setInterval(() => {
      if (cur < items[0].frames.length) {
        cur++;
      }
    }, 10);
  }
</script>

<main on:click={start}>
  {#each items as item}
    <Chart title={item.title} cur={cur} frames={item.frames} theme={item.theme}></Chart>
  {/each}
</main>

<style>
main {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding-left: 12vw;
  padding-right: 12vw;
}
</style>
