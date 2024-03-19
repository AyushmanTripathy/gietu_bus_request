<script>
  import { signIn } from "@auth/sveltekit/client";

  const signInWithGoogle = () => signIn("google");
</script>

<header> 
  <img src="/gietu_logo.png" alt="">
</header>
<main>
  <button on:click={signInWithGoogle}> Continue With Google </button>
  <p> Please use your official mail id :) </p>
</main>

<style lang="scss">
  header {
    @include blur;
    @include section(10vh, 100vw);
    @include flex(column);
    @include flex-center;

    img {
      aspect-ratio: 1;
      height: 60px;
    }
  } 

  main {
    @include flex(column);
    @include flex-center;
    @include section(90vh, 100vw);

    button {
      @include section(10vh, 80vw);
      @include blur;
      @include sans;

      border-radius: 20px;
      background: $hl;
      outline: none;
      border: none;
    }
  }
</style>
