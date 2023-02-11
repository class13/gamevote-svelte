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
<div class="nomination">
<div class="double-container">
    <div class="glasspanel">
        Attendees
        <ul>
            {#each $page.data.party.attendees as attendee}
                <li>{attendee} {#if $page.data.username === attendee}(You){/if}</li>
            {/each}
        </ul>
    </div>
    <div class="glasspanel">
        Options
        <ul>
            {#each $page.data.party.options as option}
                <li>{option}</li>
            {/each}
            <li>
                <form on:keydown={onKeydownAttendee} action="?/addOption" method="POST">
                    <input name="option" type="text" bind:value={option} bind:this={optionInput} autofocus >
                </form>
            </li>

        </ul>
    </div>
</div>
</div>
<style>

    .nomination > .title {
        text-align: center;
    }
    .nomination .double-container {
        display: flex;
        gap: 5px;
    }

    .nomination .double-container div {
        flex: 1;
    }
    li {
        display: block;
        padding: 5px 2px;
    }
    li input {
        background: rgb(255, 255, 255, 15%);
        color: rgb(255, 255, 255, 60%);
    }
</style>