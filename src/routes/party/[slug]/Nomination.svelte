<script lang="ts">
    import { page } from '$app/stores';
    export let data
    export let option = ""

    let optionInput

    function onKeydownAttendee(event: KeyboardEvent) {
        if(event.key === 'Enter') {
            ((event.target as HTMLElement).parentElement as HTMLFormElement).submit()
        } else {
            return true
        }
    }
</script>
<!-- TODO: create a "voting" and "results" component -->
<div class="nomination">
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
<style>
    .nomination {
        min-width: 600px;
    }

    .nomination > .title {
        text-align: center;
    }
    .nomination .double-container {
        display: flex;
        gap: 5px;
    }

    .nomination .double-container div {
        flex: 1;
        min-height: 30px;
        box-shadow: 0px 2px 4px black;
        color: white;
        background-color: rgba(255, 255, 255, 0.05);
    }
</style>