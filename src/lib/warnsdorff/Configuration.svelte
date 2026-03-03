<script lang="ts">
	import Chessboard from '$lib/canvas/Chessboard.svelte';
	import Knight from '$lib/canvas/Knight.svelte';
	import KnightAsset from '$lib/assets/knight.png';

	let step: number = 0;

	let sizeX: number = 8;
	let sizeY: number = 8;

	let positionX: number;
	let positionY: number;

	function onPositionChange(x: number, y: number): void {
		positionX = x;
		positionY = y;
	}
</script>

<div class="p-8">
	{#if step === 0}
		<h2 class="mb-3 text-xl font-bold">Choose a board size</h2>
	{:else if step === 1}
		<h2 class="mb-3 text-xl font-bold">Choose a starting position</h2>
	{/if}

	<div class="grid grid-cols-[30rem_1rem] items-center justify-items-center gap-3 pb-5">
		<div class="relative h-120 w-120 shadow-md">
			<Chessboard {sizeX} {sizeY} onTileClicked={onPositionChange}>
				<!-- Show board size as overlay. -->
				{#snippet layers(tileSize)}
					{#if step === 1}
						<Knight asset={KnightAsset} {tileSize} x={positionX * tileSize} y={positionY * tileSize}
						></Knight>
					{/if}
				{/snippet}
			</Chessboard>

			{#if step === 0}
				<div
					class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/40"
				>
					<p class="text-5xl font-bold text-white">{sizeX}×{sizeY}</p>
				</div>
			{/if}
		</div>

		{#if step === 0}
			<input
				bind:value={sizeY}
				type="range"
				min="3"
				max="12"
				class="h-72 w-2 cursor-pointer appearance-none rounded-lg border-transparent bg-gray-200 accent-primary-600 [writing-mode:vertical-lr]"
			/>
			<input
				bind:value={sizeX}
				type="range"
				min="3"
				max="12"
				class="h-2 w-72 cursor-pointer appearance-none rounded-lg border-transparent bg-gray-200 accent-primary-600"
			/>
		{/if}
	</div>

	<div class="flex justify-end">
		{#if step === 0}
			<button
				class="cursor-pointer rounded-md bg-primary-600 px-5 py-2 font-bold text-white hover:bg-primary-700"
				onclick={() => (step = 1)}>Next</button
			>
		{:else if step === 1}
			<button
				class="cursor-pointer rounded-md bg-primary-600 px-5 py-2 font-bold text-white hover:bg-primary-700"
				>Start</button
			>
		{/if}
	</div>
</div>
