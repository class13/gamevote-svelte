<script lang="ts">
    import Nomination from "./Nomination.svelte";
    import Voting from "./Voting.svelte";
    import Result from "./Result.svelte";
    export let data

    export let statusButtons = {
        nomination: {
        },
        voting: {
            disabled: false,
        },
        results: {
            disabled: false
        }
    }
    Object.keys(statusButtons).forEach(it => {
        statusButtons[it].selected = data.party.status === it.toUpperCase()
        statusButtons.results.disabled = data.party.status === "NOMINATION"
    })
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

    async function copyToClipboard(text) {
        if (navigator.clipboard) {
            // Use the modern Clipboard API if it's available
            try {
                await navigator.clipboard.writeText(text);
                console.log("Text copied to clipboard");
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


        <form method="POST">
            <button formaction="?/startNomination"
                    disabled="{statusButtons.nomination.disabled}"
                    class:selected={statusButtons.nomination.selected}>
                Nomination
            </button>
            <button formaction="?/startVoting"
                    disabled="{statusButtons.voting.disabled}"
                    class:selected={statusButtons.voting.selected}>
                Voting
            </button>
            <button formaction="?/startResults"
                    class:hidden={statusButtons.results.disabled}
                    class:selected={statusButtons.results.selected}>
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
</style>
