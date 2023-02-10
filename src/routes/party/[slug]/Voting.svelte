<script lang="ts">
    import { page } from '$app/stores';
    export let data
</script>
<div class="voting">
    <h2 class="title">My LAN-Party</h2>
    <span>Hello {$page.data.username}</span>
    <div class="double-container">
        <div>
            Attendees
            <ul>
                {#each $page.data.party.attendees as attendee}
                    <li>{attendee}</li>
                {/each}
            </ul>
        </div>
        <div>
            Options
            <ul>
                {#each $page.data.party.options as option}
                    <li>{option}</li>
                {/each}
                <form on:keydown={onKeydownAttendee} action="?/addOption" method="POST">
                    <input name="option" type="text" bind:value={option} bind:this={optionInput} autofocus >
                </form>
            </ul>
        </div>
    </div>
</div>