<script>
  import { onMount } from "svelte";

  let msg = "";
  async function requestBus(loc) {
    const data = JSON.stringify({ 
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude
    })

    let res = await fetch("/api", { method: "POST", body: data });
    res = await res.json();
    if (res.success) msg = "Request confirmed for " + res.stopName;
    else msg = res.msg;
    console.log(res)
  }

  function request() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(requestBus, console.error);
    } else console.error("geolocation not supported");
  }

  async function deleteRequest() {
    let res = await fetch("/api", { method: "DELETE" });
    res = await res.json();

    if (res.success) msg = "Request Cancelled";
    else msg = res.msg;
    console.log(res) 
  }
</script>

<section>
  <button on:click={request}> 
    Request 
  </button>
  <button on:click={deleteRequest}> 
    Cancel
  </button>
</section>

<style lang="scss">
  section {
    @include section(10vh, 80vw);
    @include grid(3fr 2fr, 1fr);
    column-gap: 10px;
    padding: 10px;

    button {
      @include blur;
      @include sans;

      font-size: 1rem;
      background: $hl;
      border: none;
      border-radius: 10px;
    }
  }
</style>
