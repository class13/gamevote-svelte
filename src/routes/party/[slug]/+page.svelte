<script lang="ts">
    import Nomination from "./Nomination.svelte";
    import Voting from "./Voting.svelte";
    import Result from "./Result.svelte";
    import {browser} from "$app/environment";
    import {invalidateAll} from "$app/navigation";
    export let data
    export let popup = null
    export let timeout
    function showPopup(text: String) {
        popup = text
        if (timeout != null) clearTimeout(timeout)
        timeout = setTimeout(() => popup = null, 2000);
    }
    export async function copyCodeToClipboard() {
        let baseUrl = data.baseUrl
        await copyToClipboard(`${baseUrl}/party/${data.party.code}`)

        showPopup("Link copied to clipboard!")
    }
    export let showRankings = false
    export function enterHover() {
        showRankings = true
    }

    export function leaveHover() {
        showRankings = false
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard) {
            // Use the modern Clipboard API if it's available
            try {
                await navigator.clipboard.writeText(text);
            } catch (error) {
                console.error("Could not copy text: ", error);
            }
        } else {
            // Use a fallback approach for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand("copy");
                console.log("Text copied to clipboard");
            } catch (error) {
                console.error("Could not copy text: ", error);
            } finally {
                document.body.removeChild(textArea);
            }
        }
    }
    if (browser) {
        let asdf = () => {
            invalidateAll()
            setTimeout(asdf, 500)
        }
        setTimeout(asdf, 500)
    }
</script>

<div class="party">
    <div class="header">
        <div class="code">
            <span>{data.party.code}</span>
            <button on:click={copyCodeToClipboard}>
                📋
            </button>
            <div class="popup" class:hidden={popup == null}>{popup}</div>
        </div>
        <form action="?/addBeer" method="post">
            <button type="submit" on:mouseenter={enterHover} on:mouseleave={leaveHover}>
                {data.party.beerCount} 🍺
            </button>
            <div class="glasspanel beer-rankings" class:shown={showRankings}>
                {#each Object.entries(data.party.beerPerAttendee) as entry, i}
                    <div class:bold={i === 0}>
                        {entry[0]}: {entry[1]}
                        {#if i === 0} 👑{/if}
                    </div>
                {/each}
            </div>
        </form>



        <form method="POST">
            <button formaction="?/startNomination"
                    disabled="{data.statusButtons.nomination.disabled}"
                    class:selected={data.statusButtons.nomination.selected}>
                Nomination
            </button>
            <button formaction="?/startVoting"
                    disabled="{data.statusButtons.voting.disabled}"
                    class:selected={data.statusButtons.voting.selected}>
                Voting
            </button>
            <button formaction="?/startResults"
                    class:hidden={data.statusButtons.results.disabled}
                    class:selected={data.statusButtons.results.selected}>
                <!-- todo: bug: when clicking on results from votes it goes to nomination -->
                Results
            </button>
        </form>
    </div>

    {#if data.party.status === "NOMINATION"}
        <Nomination/>
    {:else if data.party.status === "VOTING"}
        <Voting/>
    {:else}
        <Result/>
    {/if}
</div>
<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header button {
        margin: 0;
    }
    button {
        border: 2px solid rgb(255, 255, 255, 5%);
    }
    button.selected {
        border: 2px solid rgb(255, 255, 255, 40%);
        background: rgb(255, 255, 255, 5%);
    }
    .header {
        margin-bottom: 30px;
    }
    .hidden {
        visibility: hidden;
    }
    .code {
        display: flex;
        background: rgb(255, 255, 255, 80%);
        color: rgb(0, 0, 0, 80%);
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: monospace;
        font-size: 20px;
        border-radius: 4px;
    }
    .code span{
        display: inline-block;
        padding: 4px 10px;
    }
    .code button {
        background: rgb(0, 0, 0, 60%);
        margin: 0 !important;
        padding: 1px 1px;
        font-size: 20px;
        line-height: 25px;
        border-radius: 0px;
    }
    .popup {
        display: inline-block;
        position: absolute;
        color: rgb(255, 255, 255, 60%);
        font-size: 14px;
        margin-left: 320px;

    }
    .beer-component {
        display: inline-block;
    }
    .beer-rankings {
        position: absolute;
        display: none;
    }
    .shown {
        display: block;
    }
    .bold {
        font-weight: bold;
    }
</style>
