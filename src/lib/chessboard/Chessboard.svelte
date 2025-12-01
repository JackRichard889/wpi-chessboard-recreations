<script lang="ts">
	import { Stage, Layer, Rect, Line, Text, Image } from 'svelte-konva';
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import type { Tour } from '$lib';

	const { tour }: { tour: Tour } = $props();
	const animationSpeed = 500;

	let isPlaying: boolean = $state(true);
	let showNumbers: boolean = $state(true);
	let showPath: boolean = $state(true);

	let animation: Konva.Animation;
	let containerSize: number = $state(0);

	let TourComponent = $derived(tour.component);

	// Initialize coordinates to world space.
	let localCoordinates = $derived(
		tour.path.map((x) => x.map((pos) => pos * tileSize + tileSize / 2))
	);

	// Size in pixels of each board tile.
	let tileSize = $derived(containerSize / Math.max(tour.boardSize.x, tour.boardSize.y));

	$effect(() => {
		if (isPlaying) {
			animation?.start();
		} else {
			animation?.stop();
		}
	});

	let coordinateIndex: number = $state(0);
	let knight: ReturnType<typeof Image>;
	let knightAsset: HTMLImageElement | undefined = $state(undefined);
	let knightPosX: number = $state(0);
	let knightPosY: number = $state(0);

	$effect(() => {
		const img = document.createElement('img');
		img.src = tour.asset;
		img.onload = () => (knightAsset = img);
	});

	onMount(initAnimation);

	function initAnimation() {
		// Seed the knight path array with the starting position.
		knightPosX = localCoordinates[0][0];
		knightPosY = localCoordinates[0][1];

		// Create the knight movement and path animation.
		animation = new Konva.Animation(function (frame) {
			coordinateIndex = Math.trunc(frame!.time / animationSpeed);

			const coordinate = localCoordinates[Math.min(coordinateIndex, localCoordinates.length - 1)];
			const next = localCoordinates[Math.min(coordinateIndex + 1, localCoordinates.length - 1)];
			const delta = Math.min(((frame!.time % animationSpeed) / animationSpeed) * 2, 1.0);

			const x = coordinate[0] + (next[0] - coordinate[0]) * delta;
			const y = coordinate[1] + (next[1] - coordinate[1]) * delta;
			const opacity = Math.max(0, 1 - (frame!.time / animationSpeed - localCoordinates.length - 1));

			knight.node.position({ x, y });
			knight.node.opacity(opacity);

			knightPosX = x;
			knightPosY = y;
		}, knight.node.getLayer());

		if (isPlaying) {
			animation.start();
		}
	}

	function restartAnimation() {
		animation.stop();
		isPlaying = false;

		coordinateIndex = 0;
		knight.node.position({ x: localCoordinates[0][0], y: localCoordinates[0][1] });
		knight.node.opacity(1);

		initAnimation();
	}
</script>

<div class="col-span-3 grid grid-cols-5 items-start justify-between gap-4 bg-gray-100 p-4">
	<div bind:clientWidth={containerSize} class="col-span-3 grow shadow-md">
		<Stage width={tileSize * tour.boardSize.x} height={tileSize * tour.boardSize.y}>
			<!-- Chessboard layer. -->
			<Layer>
				{#each { length: tour.boardSize.x * tour.boardSize.y } as _, position (position)}
					{@const xPosition = position % tour.boardSize.x}
					{@const yPosition = (position / tour.boardSize.y) | 0}
					{@const tileColor = (xPosition + yPosition) % 2 === 0 ? '#8f242e' : 'white'}

					<Rect
						x={xPosition * tileSize}
						y={yPosition * tileSize}
						width={tileSize}
						height={tileSize}
						fill={tileColor}
					/>
				{/each}
			</Layer>

			<!-- Knight path layer. -->
			<Layer>
				{#if showPath}
					<Line
						points={[
							...localCoordinates.slice(0, coordinateIndex + 1).flat(),
							knightPosX,
							knightPosY
						]}
						stroke="#eb818a"
						lineCap="round"
						lineJoin="round"
						strokeWidth={5}
					/>
				{/if}
			</Layer>

			<!-- Knight path numbering layer. -->
			<Layer>
				{#if showNumbers}
					{#each { length: tour.boardSize.x * tour.boardSize.y } as _, position (position)}
						{@const xPosition = position % tour.boardSize.x}
						{@const yPosition = (position / tour.boardSize.y) | 0}
						{@const textColor = (xPosition + yPosition) % 2 === 0 ? 'white' : '#8f242e'}
						{@const index = tour.path.findIndex((x) => xPosition === x[0] && yPosition === x[1])}

						{#if index <= coordinateIndex}
							<Text
								text={`${index + 1}`}
								x={xPosition * tileSize}
								y={yPosition * tileSize}
								width={tileSize}
								height={tileSize}
								fontSize={tileSize / 2.5}
								fill={textColor}
								align="center"
								verticalAlign="middle"
								fontStyle="bold"
							/>
						{/if}
					{/each}
				{/if}
			</Layer>

			<!-- Knight layer. -->
			<Layer>
				<Image
					bind:this={knight}
					width={tileSize / 1.5}
					height={tileSize / 1.5}
					offsetX={tileSize / 3}
					offsetY={tileSize / 3}
					image={knightAsset}
				></Image>
			</Layer>
		</Stage>
	</div>

	<div class="col-span-2 flex flex-col gap-5">
		<div class="col-span-2 rounded-lg bg-white p-6 shadow-md">
			<div class="mb-4 flex">
				<button
					type="button"
					title={isPlaying ? 'Pause' : 'Play'}
					aria-label={isPlaying ? 'Pause' : 'Play'}
					onclick={() => (isPlaying = !isPlaying)}
					class="{isPlaying
						? 'bg-primary-700 hover:bg-primary-800'
						: 'bg-primary-500 hover:bg-primary-600'} me-2 inline-flex cursor-pointer items-center rounded-lg p-2 text-center text-sm font-medium text-white"
				>
					{#if isPlaying}
						<svg
							class="h-6 w-6"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else}
						<svg
							class="h-6 w-6"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</button>

				<button
					type="button"
					title="Stop"
					aria-label="Stop"
					onclick={restartAnimation}
					class="me-2 inline-flex cursor-pointer items-center rounded-lg bg-gray-200 p-2 text-center text-sm font-medium text-white hover:bg-gray-300"
				>
					<svg
						class="h-6 w-6 text-gray-800"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Z" />
					</svg>
				</button>
			</div>

			<div class="mt-3 flex items-center">
				<input
					id="show-numbers"
					type="checkbox"
					bind:checked={showNumbers}
					class="h-4 w-4 cursor-pointer rounded-sm border-gray-300 bg-gray-100 accent-primary-500"
				/>
				<label for="show-numbers" class="ms-2 text-sm font-semibold text-gray-900"
					>Show Numbers?</label
				>
			</div>

			<div class="mt-3 flex items-center">
				<input
					id="show-path"
					type="checkbox"
					bind:checked={showPath}
					class="h-4 w-4 cursor-pointer rounded-sm border-gray-300 bg-gray-100 accent-primary-500"
				/>
				<label for="show-path" class="ms-2 text-sm font-semibold text-gray-900">Show Path?</label>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-md">
			<TourComponent />
		</div>
	</div>
</div>
