<script lang="ts">
	import '../app.css';
    import wpi from '$lib/assets/wpi.svg';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="p-5">
    <div class="flex flex-wrap items-center mb-4">
        <img src={wpi} alt="WPI logo" class="h-8 mr-5" />
        <h1 class="font-serif font-semibold text-primary-500 text-xl">Chessboard Recreations</h1>
    </div>

    {@render children?.()}
</div>
