<script lang="ts">
    import { page } from '$app/stores';
</script>
<div class="party">
    <h2 class="title">My LAN-Party</h2>
    <span>Hello {$page.data.username}</span>
    <div class="double-container">
        <div>
            Attendees
            <ul>
                <li>Thomas</li>
                <li>Domink</li>
                <li>Joyce</li>
                <li>Lukas</li>
            </ul>
        </div>
        <div>
            Games
            <ul>
                <li>Team Fortress 2</li>
                <li>Left 4 Dead 2</li>
                <li>Halo: Infinite</li>
            </ul>
        </div>
    </div>
</div>
<style>
    .party {
        min-width: 600px;
        min-height: 600px;
        background: #121212;
        color: white;
        border: 1px solid gray;
        padding: 25px;
    }

    .party > .title {
        text-align: center;
    }
    .party .double-container {
        display: flex;
        gap: 5px;
    }

    .party .double-container div {
        flex: 1;
        min-height: 30px;
        box-shadow: 0px 2px 4px black;
        color: white;
        background-color: rgba(255, 255, 255, 0.05);
    }
</style>