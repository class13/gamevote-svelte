<script lang="ts">

</script>
<div class="register">
    <form method="POST">
        <div>What's your name?</div>
        <div>
            <input name="username" type="text" autofocus />
            <button type="submit">Enter</button>
        </div>
    </form>
</div>
<style>
    .register>form {
        padding-bottom: 100px;
    }
    .register {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>