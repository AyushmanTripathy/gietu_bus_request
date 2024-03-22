<script>
  import BusInfo from "./BusInfo.svelte";
  import Modal from "./Modal.svelte";
  import { routes } from "$lib/info.js";
  export let data;

  let showMsg; 
  const routesCount = [];
  for (let i = 0; i < routes.length; i++) {
    routesCount[i] = 0;
    for (let j = 0; j < routes[i].length; j++)
      routesCount[i] += data[routes[i][j]].count;
  }

  async function sendBus() {
    let res = await fetch("/api", {
      method: "PATCH",
      body: JSON.stringify(this),
    });
    res = await res.json();
    if (res.success) showMsg("Added Bus successfully" ,true)
    else showMsg("Failed to add Bus", false);
  }
</script>

<Modal bind:showMsg={showMsg} />

<section>
  <h2>Select Route</h2>
  {#each routes as route, no}
  <button on:click="{sendBus.bind(no)}">
    <h3>
      Route {no + 1} has {routesCount[no]}
      <span class="material-symbols-outlined"> groups </span>
    </h3>
    <br />
    <span>
      {#each route as stop, i} {(i != 0 ? " -> " : "") + stop} {/each}
    </span>
  </button>
  <br />
  {/each}
</section>

<BusInfo data="{data}" />

<style lang="scss">
  h2 {
    border-bottom: 1px solid $hl;
  }

  section {
    @include flex(column);
    @include section(auto, 100vw);
    @include flex-center;

    gap: 10px;

    button {
      @include sans;
      @include section(auto, 80vw);
      @include blur;

      color: $light;
      padding: 15px;

      text-align: left;
      border: none;
      outline: none;
      border-radius: 10px;
    }
  }
</style>
