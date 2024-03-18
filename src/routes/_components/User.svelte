<script>
  import Request from "./Request.svelte";
  export let data;
  console.log(data);
</script>

<h1>User Dashboard</h1>

<table>
  <tr>
    <td>Stop Name</td>
    <td>Count</td>
  </tr>
  {#each Object.keys(data) as stop}
  <tr>
    <td>{stop}</td>
    <td>{data[stop].count + (data[stop].fullfilled ? " (incoming)": "") }</td>
  </tr>
  {/each}
</table>

<Request />
