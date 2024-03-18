<script>
  import { routes } from "$lib/info.js";
  export let data;

  const routesCount = [];
  for (let i = 0; i < routes.length; i++) {
    routesCount[i] = 0;
    for (let j = 0; j < routes[i].length; j++)
      routesCount[i] += data[routes[i][j]].count;
  }

  async function sendBus() {
    let res = await fetch("/api", { method: "PATCH", body: JSON.stringify(this) });
    res = await res.json();
    console.log(res);
  }
</script>

<h1> Admin Dashboard </h1>
<section>
  {#each routes as route, no}
    <button on:click={sendBus.bind(no)}>
      Route {no + 1} has {routesCount[no]}
      <br>
      <span>
      {#each route as stop, i}
        {(i != 0 ? " -> " : "") + stop}
      {/each}
      </span>
    </button>
    <br>
  {/each}
</section>

<style lang="scss">
  button {
    text-align: left;
  }
</style>
