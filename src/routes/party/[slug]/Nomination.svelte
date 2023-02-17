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
        <h4>Attendees</h4>
        <ul>
            {#each $page.data.party.attendees as attendee}
                <li>{attendee} {#if $page.data.username === attendee}(You){/if}</li>
            {/each}
        </ul>
    </div>
    <div class="glasspanel">
        <h4>Options</h4>
        <ul class="options">
            {#each $page.data.party.options as option, index}
                <li>
                    <span>{option}</span>
                    <form action="?/deleteOption" method="post">
                        <input type="hidden" value={index} name="id"/>
                        <button type="submit">🗑️</button>
                    </form>
                </li>
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
    h4{
        margin: 0;
        font-size: 15px;
        margin-top: 5px;
    }
    .options {
        display: table;
    }

    .options li {
        display: table-row;
    }
    .options li span{
        display: table-cell;
        vertical-align: middle;
    }
    .options li form{
        display: table-cell;
    }
    .options button {
        display: inline-block;
        background: none;
        border: none;
        box-shadow: none;
        padding: 3px 4px 4px 3px;
        border-radius: 50px;
        border: 1px solid transparent;
        vertical-align: top;
    }
    .options button:hover {
        box-shadow: 0 0 5px maroon;
        border-color: maroon;
    }

    .options form {
        display: inline-block;
        float: right;
    }
</style>