<script>
  export let data;
  export let select = false;

  let stopNames = Object.keys(data);
  if (select) {
    data[select.stop].selected = true;
    stopNames = stopNames.filter((a) => a != select.stop);
    stopNames.unshift(select.stop);
  }
  console.log(select, stopNames);
</script>

<section>
  <h2>Bus stop's</h2>
  {#each stopNames as stop}
  <div class="{data[stop].selected ? 'selected' : 'notselected'}">
    <strong> {stop} </strong>
    <p>
      <span class="text">
        <span class="material-symbols-outlined"> groups </span>
        {data[stop].count}
      </span>
      {#if data[stop].fullfilled}
      <span class="text">
        <span class="material-symbols-outlined"> directions_bus </span>
        {Math.floor((Date.now() - data[stop].fullfilled) / 60000)}min
      </span>
      {:else}
      <span class="material-symbols-outlined"> bus_alert </span>
      {/if}
    </p>
  </div>
  {/each}
</section>

<style lang="scss">
  h2 {
    border-bottom: 1px solid $hl;
  }

  section {
    @include flex(column);
    @include flex-center;
    gap: 10px;

    div {
      @include section(10vh, 80vw);
      @include blur;

      padding: 10px;
      border-radius: 10px;

      .text {
        padding-right: 30px;
      }
    }
  }

  .selected {
    border: 2px solid $hl;
  }
</style>
