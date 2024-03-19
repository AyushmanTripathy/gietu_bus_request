<script>
  import Request from "./Request.svelte";
  export let data;
  console.log(data);
</script>

<main>
  <Request />
  <section>
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
          10min
        </span>
        {/if}
      </p>
    </div>
    {/each}
  </section>
</main>

<style lang="scss">
  main {
    @include flex(column);
    align-items: center;
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
