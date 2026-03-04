<script lang="ts">
	import Chessboard from '$lib/canvas/Chessboard.svelte';
	import Knight from '$lib/canvas/Knight.svelte';
	import KnightAsset from '$lib/assets/knight.png';
	import WarnsdorffTour from '$lib/tours/WarnsdorffTour.svelte';
	import { warnsdorffTour, type Tour } from '$lib';

	interface Props {
		oncomplete: (tour: Tour) => void;
	}

	let { oncomplete }: Props = $props();

	let step: number = $state(0);
	let failed: boolean = $state(false);

	let sizeX: number = $state(8);
	let sizeY: number = $state(8);

	let positionX: number = $state(0);
	let positionY: number = $state(0);

	function onPositionChange(x: number, y: number): void {
		positionX = x;
		positionY = y;
		failed = false;
	}

	function onStart(): void {
		const result = warnsdorffTour(sizeX, sizeY, positionX, positionY);
		if (result === null) {
			failed = true;
		} else {
			oncomplete(result);
		}
	}
</script>

<div class="col-span-3 grid grid-cols-5 items-start justify-between gap-4 bg-gray-100 p-4">
	<div class="relative col-span-3 aspect-square grow shadow-md">
		<Chessboard {sizeX} {sizeY} onTileClicked={onPositionChange}>
			<!-- Show board size as overlay. -->
			{#snippet layers(tileSize)}
				{#if step === 1}
					<Knight
						asset={KnightAsset}
						{tileSize}
						x={positionX * tileSize + tileSize / 2}
						y={positionY * tileSize + tileSize / 2}
					></Knight>
				{/if}
			{/snippet}
		</Chessboard>

		{#if step === 0}
			<div
				class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/40"
			>
				<p class="text-7xl font-bold text-white">{sizeX}×{sizeY}</p>

				<input
					bind:value={sizeY}
					type="range"
					min="5"
					max="12"
					class="absolute right-0 mr-8 h-72 w-2 cursor-pointer appearance-none rounded-lg border-transparent bg-gray-200 accent-primary-600 [writing-mode:vertical-lr]"
				/>
				<input
					bind:value={sizeX}
					type="range"
					min="5"
					max="12"
					class="absolute bottom-0 mb-8 h-2 w-72 cursor-pointer appearance-none rounded-lg border-transparent bg-gray-200 accent-primary-600"
				/>
			</div>
		{/if}
	</div>

	<div class="col-span-2 flex flex-col gap-5">
		<div class="rounded-lg bg-white p-6 shadow-md">
			{#if step === 0}
				<h2 class="mb-3 text-xl font-bold">Choose a board size</h2>
				<p class="mb-4">
					Pick a size for the chessboard that the knight will traverse, this can be either square or
					rectangular.
				</p>
			{:else if step === 1}
				<h2 class="mb-3 text-xl font-bold">Choose a starting position</h2>
				{#if failed}
					<p class="mb-4 text-red-600">
						The algorithm couldn't find a complete tour from this position. Try a different starting
						square or click Retry to attempt again with different tie-breaking.
					</p>
				{:else}
					<p class="mb-4">
						Pick the position on the board that the knight will start the tour from. Warnsdorff's
						algorithm can find a path from any point.
					</p>
				{/if}
			{/if}

			<div class="flex justify-end gap-2">
				{#if step === 0}
					<button
						class="cursor-pointer rounded-md bg-primary-600 px-5 py-2 font-bold text-white hover:bg-primary-700"
						onclick={() => (step = 1)}>Next</button
					>
				{:else if step === 1}
					<button
						class="cursor-pointer rounded-md bg-gray-400 px-5 py-2 font-bold text-white hover:bg-gray-500"
						onclick={() => { failed = false; step = 0; }}>Back</button
					>
					<button
						class="cursor-pointer rounded-md bg-primary-600 px-5 py-2 font-bold text-white hover:bg-primary-700"
						onclick={onStart}>{failed ? 'Retry' : 'Start'}</button
					>
				{/if}
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-md">
			<WarnsdorffTour></WarnsdorffTour>
		</div>
	</div>
</div>
