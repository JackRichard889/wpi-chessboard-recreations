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

<div class="grid grid-cols-5 items-start gap-5">
	<div class="relative col-span-3 aspect-square max-h-[70vh] max-w-[70vh] overflow-hidden rounded-xl shadow-md">
		<Chessboard {sizeX} {sizeY} onTileClicked={onPositionChange}>
			<!-- Show board size as overlay. -->
			{#snippet layers(tileSize)}
				{#if step === 1}
					<Knight
						asset={KnightAsset}
						{tileSize}
						x={positionX * tileSize + tileSize / 2}
						y={positionY * tileSize + tileSize / 2}
					/>
				{/if}
			{/snippet}
		</Chessboard>

		{#if step === 0}
			<div class="absolute inset-0 flex items-center justify-center bg-black/40">
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

	<div class="col-span-2 flex flex-col gap-4">
		<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			{#if step === 0}
				<h2 class="mb-1.5 text-base font-semibold text-gray-800">Choose a board size</h2>
				<p class="mb-4 text-sm text-gray-500">
					Use the sliders on the board to set the width and height. Any size from 5×5 to 12×12 is
					supported.
				</p>
			{:else if step === 1}
				<h2 class="mb-1.5 text-base font-semibold text-gray-800">Choose a starting position</h2>
				{#if failed}
					<p class="mb-4 text-sm text-red-600">
						No complete tour was found from this square. Try a different position, or click Retry —
						the algorithm uses random tie-breaking so the result may vary.
					</p>
				{:else}
					<p class="mb-4 text-sm text-gray-500">
						Click any square on the board to place the knight's starting position.
					</p>
				{/if}
			{/if}

			<div class="flex justify-end gap-2">
				{#if step === 0}
					<button
						class="cursor-pointer rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
						onclick={() => (step = 1)}>Next →</button
					>
				{:else if step === 1}
					<button
						class="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200"
						onclick={() => {
							failed = false;
							step = 0;
						}}>← Back</button
					>
					<button
						class="cursor-pointer rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
						onclick={onStart}>{failed ? 'Retry' : 'Start'}</button
					>
				{/if}
			</div>
		</div>

		<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<WarnsdorffTour />
		</div>
	</div>
</div>
