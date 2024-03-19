<script>
  import { signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Admin from "./_components/Admin.svelte";
  import User from "./_components/User.svelte";
  import Login from "./_components/Login.svelte";

  let response = false;
  onMount(loadUi);

  async function loadUi() {
    if (!$page.data.session) return console.log("not signed in");
    let res = await fetch("/api");
    response = await res.json();
  }
  function signOutWithGoogle() {
    signOut("google");
  }
</script>

<main>
  {#if $page.data.session}
  <div></div>
  <header>
    <img src="{$page.data.session.user?.image}" alt="User Icon" />
    <p>{$page.data.session.user?.name ?? "User"}</p>
    <span on:click="{signOutWithGoogle}" class="material-symbols-outlined">
      logout
    </span>
  </header>
  {#if response}
  <button id="reload">
    <span on:click="{loadUi}" class="material-symbols-outlined">
      refresh
    </span>
  </button>
  {#if response.isAdmin}
  <Admin data="{response.busStopRequests}" />
  {:else}
  <User data="{response.busStopRequests}" />
  {/if} 
  {/if} 
  <div></div>
  {:else}
    <Login />
  {/if}
</main>

<style lang="scss">
  main {
    @include sans;
    @include section(auto, 100vw);
    @include absolute;
    @include flex(column);
    @include cover("background.svg");
    color: $light;

    min-height: 100vh;
  }
  div {
    @include section(20vh, 100vw);
  }
  header {
    @include fixed(0, 0);
    @include section(10vh, 100vw);
    background: rgba(0,0,0,0.2);
    backdrop-filter: saturate(180%) blur(8px);

    display: inline-flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 3;

    img {
      border-radius: 50%;
      aspect-ratio: 1;
      height: 50px;
    }
  }

  #reload {
    @include shadow;
    @include blur;

    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 10;

    outline: none;
    color: $light;
    border: none;
    border-radius: 40%;

    span {
      font-size: 40px;
    }
  }
</style>
