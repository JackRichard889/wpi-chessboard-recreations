<script lang="ts">
	import '../app.css';
    import wpi from '$lib/assets/wpi.svg';
	import favicon from '$lib/assets/favicon.svg';
    import Chessboard from "$lib/chessboard/Chessboard.svelte";
    import {EulerTour} from "$lib";

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

    <div class="grid grid-cols-4 bg-white border border-gray-200 rounded-lg shadow-md">
        {@render children?.()}

        <Chessboard boardSize={8} coordinates={EulerTour}></Chessboard>
    </div>
</div>
