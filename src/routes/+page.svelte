<script lang="ts">
	import { type Tour, Tours } from '$lib';
	import Chessboard from '$lib/canvas/Chessboard.svelte';
	import KnightPath from '$lib/canvas/KnightPath.svelte';
	import Controls from '$lib/Controls.svelte';
	import Configuration from '$lib/warnsdorff/Configuration.svelte';

	let tourId: number = $state(1);
	let warnsdorff: Tour | undefined = $state(undefined);

	let activeTour: Tour | undefined = $derived(
		tourId === 9 ? warnsdorff : Tours.find((x) => x.id === tourId)
	);

	let isPlaying: boolean = $state(true);
	let showNumbers: boolean = $state(true);
	let showPath: boolean = $state(true);
	let knightPath: { restart: () => void } | undefined = $state();

	let TourComponent = $derived(activeTour?.component);

	$effect(() => {
		if (activeTour) {
			isPlaying = false;
		}
	});
</script>

<main class="grid grid-cols-4 rounded-lg border border-gray-200 bg-white shadow-md">
	<nav class="z-10 rounded-l-lg bg-primary-500 p-6">
		<h2 class="mb-3 text-xl font-bold text-white">Tour Options</h2>

		{#each Tours as option (option.id)}
			<button
				class="{tourId === option.id
					? 'underline'
					: ''} text-md mb-2 block cursor-pointer whitespace-nowrap text-white hover:underline"
				onclick={() => (tourId = option.id)}>{option.name}</button
			>
		{/each}

		<button
			class="{tourId === 9
				? 'underline'
				: ''} text-md mb-2 block cursor-pointer whitespace-nowrap text-white hover:underline"
			onclick={() => {
				warnsdorff = undefined;
				tourId = 9;
			}}>Warnsdorff's Tour</button
		>
	</nav>

	{#if tourId === 9 && !warnsdorff}
		<Configuration oncomplete={(t) => (warnsdorff = t)}></Configuration>
	{:else if activeTour}
		<div class="col-span-3 grid grid-cols-5 items-start justify-between gap-4 bg-gray-100 p-4">
			<Chessboard
				class="col-span-3 grow shadow-md"
				sizeX={activeTour.boardSize.x}
				sizeY={activeTour.boardSize.y}
			>
				{#snippet layers(tileSize)}
					<KnightPath
						bind:this={knightPath}
						tour={activeTour}
						asset={activeTour.asset}
						bind:isPlaying
						{showNumbers}
						{showPath}
						sizeX={activeTour.boardSize.x}
						sizeY={activeTour.boardSize.y}
						{tileSize}
					></KnightPath>
				{/snippet}
			</Chessboard>

			<div class="col-span-2 flex flex-col gap-5">
				<Controls bind:isPlaying bind:showNumbers bind:showPath onRestart={() => knightPath?.restart()}
				></Controls>

				<div class="rounded-lg bg-white p-6 shadow-md">
					<TourComponent />
				</div>
			</div>
		</div>
	{/if}
</main>
