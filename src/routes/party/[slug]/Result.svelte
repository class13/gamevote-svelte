<script lang="ts">
    import { page } from '$app/stores';
    export let data
</script>
<div class="results">
    <ul>
        {#each $page.data.results as result}
            <li>
                {result.option}: {result.votes}
            </li>
        {/each}
    </ul>
</div>