<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Admin from "./_components/Admin.svelte";
  import User from "./_components/User.svelte";

  let response = false;
  onMount(async () => {
    if (!$page.data.session) return console.log("not signed in");
    let res = await fetch("/api");
    response = await res.json();
  });

  function signInWithGoogle() {
    signIn("google");
  }
  function signOutWithGoogle() {
    signOut("google");
  }
</script>

<main>
  {#if $page.data.session}
    <img src="{$page.data.session.user?.image}" alt="User Icon">
    <h1> {$page.data.session.user?.name ?? "User"}</h1>
    {#if response}
      {#if response.isAdmin}
        <Admin data={response.busStopRequests} />
      {:else}
        <User data={response.busStopRequests} />
      {/if}
    {/if}
    <button on:click="{signOutWithGoogle}">Sign out</button>
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
