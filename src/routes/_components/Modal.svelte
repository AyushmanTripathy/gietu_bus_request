<script>
  let ids = [], modal = false, top = "0";
  export let showMsg = (message, success) => {
    modal = { message, success };
    ids.push(setTimeout(() => top = "10", 100));
    ids.push(setTimeout(() => top = "0", 2900));
    ids.push(setTimeout(hideModal, 3000));  
  }
  function hideModal() {
    modal = false;
    top = "0";
    clearTimeout(ids.pop());
    clearTimeout(ids.pop());
    clearTimeout(ids.pop());
  }
</script>

{#if modal}
<div style="top:{top}vh" on:click={hideModal}> 
  {#if modal.success}
  <span class="material-symbols-outlined">
    check_circle
  </span> 
  {:else}
  <span class="material-symbols-outlined">
    error
  </span>
  {/if}
  <br>
  <strong>
    {modal.message} 
  </strong>
</div>
{/if}

<style lang="scss">
  div {
    @include section (10vh, 80vw);
    @include flex(column);
    @include flex-center;
    @include blur;

    transition: top 1s;
    text-align:center;
    border-radius: 10px;
    position: fixed;
    left: 10vw;
    z-index: 5;
  }
</style>
