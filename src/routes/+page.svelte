<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";

  import Request from "./Request.svelte";
  import { onMount } from "svelte";

  let waiting = false;
  onMount(async () => {
    let res = await fetch("/api");
    waiting = await res.json();
  });

  function signInWithGoogle() {
    signIn("google");
  }
</script>

<main>
  {#if $page.data.session}
  <img src="{$page.data.session.user?.image}" alt="User Icon">
  <h1> {$page.data.session.user?.name ?? "User"}</h1>
  {#if waiting}
  <table>
    <tr>
      <td>Stop Name</td>
      <td>Count</td>
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
  {:else}
  <button on:click="{signInWithGoogle}">Sign in with google</button>
  {/if}
</main>

<style lang="scss">
  main {
    @include fullscreen;
    @include absolute;
    background: $pri;
    color: $light;
  }
</style>
