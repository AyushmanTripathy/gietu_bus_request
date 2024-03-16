<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let msg = "";

  async function requestBus(loc) {
    if (!$page.data.session.user) {
      msg = "You are not signed in!";
      return;
    }

    const data = new FormData();
    data.append("loc", JSON.stringify({ 
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude
    }));

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
  <p> {msg} </p>
  <button on:click={request}> Request </button>
  <button on:click={deleteRequest}> Cancel </button>
</section>

<style lang="scss">

</style>
