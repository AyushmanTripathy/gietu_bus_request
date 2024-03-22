<script>
  export let data;
</script>

<section>
  <h2>Bus stop's</h2>
  {#each Object.keys(data) as stop}
  <div>
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
</style>
