<script lang="ts">
    import '../app.css';

    let { children } = $props();
</script>

<div class="p-5">
    <header class="flex flex-wrap items-center mb-4">
        <img src="/wpi.svg" alt="WPI logo" class="h-8 mr-5" />
        <h1 class="font-serif font-semibold text-primary-500 text-xl">Chessboard Recreations</h1>
    </header>

    {@render children?.() }
</div>