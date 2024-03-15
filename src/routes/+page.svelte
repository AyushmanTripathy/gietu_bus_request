<script>
  import Request from "./Request.svelte";
  import { onMount } from "svelte";

  let waiting = false;
  onMount(async () => {
    let res = await fetch("/api");
    waiting = await res.json();
  })
</script>

<main>
  {#if waiting}
  <table>
    <tr>
      <td> Stop Name </td>
      <td> Count </td>
    </tr>
    {#each waiting as stop}
    <tr>
      <td>{stop[0]}</td>
      <td>{stop[1]}</td>
    </tr>
    {/each}
  </table>
  {/if}
  <Request />
</main>

<style lang="scss">
  main {
    @include fullscreen;
    @include absolute;
    background: $pri;
    color: $light;
  }
</style>
