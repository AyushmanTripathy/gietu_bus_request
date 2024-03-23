<script>
  import Request from "./Request.svelte";
  import BusInfo from "./BusInfo.svelte";

  export let data;
  console.log(data);
</script>

<main>
  <Request />
  {#if data.currentStop}
  <p>
    You requested for {data.currentStop.stop}, {Math.floor((Date.now() -
    data.currentStop.time) / 60000)} mins ago.
  </p>
  {:else}
  <p>No request from you yet!</p>
  {/if}
  <BusInfo select={data.currentStop} data="{data.busStopRequests}" />
</main>

<style lang="scss">
  main {
    @include flex(column);
    align-items: center;
  }
</style>
