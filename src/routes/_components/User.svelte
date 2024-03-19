<script>
  import Request from "./Request.svelte";
  import BusInfo from "./BusInfo.svelte";

  export let data;
  console.log(data);
</script>

<main>
  <Request />
  <BusInfo data={data}/>
</main>

<style lang="scss">
  main {
    @include flex(column);
    align-items: center;
  }
</style>
