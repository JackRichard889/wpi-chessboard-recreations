<script lang="ts">
	import { Layer, Line, Text } from 'svelte-konva';
	import { onMount } from 'svelte';
	import Konva from 'konva';

	const animationSpeed = 500;

	let { isPlaying, showNumbers, showPath, sizeX, sizeY, tileSize } = $props();

	let animation: Konva.Animation;
	let coordinateIndex: number = $state(0);
	let knightPosX: number = $state(0);
	let knightPosY: number = $state(0);

	let localCoordinates = $derived(
		tour.path.map((x) => x.map((pos) => pos * tileSize + tileSize / 2))
	);

	$effect(() => {
		if (isPlaying) {
			animation?.start();
		} else {
			animation?.stop();
		}
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

<Layer>
	{#if showNumbers}
		{#each { length: sizeX * sizeY } as _, position (position)}
			{@const xPosition = position % sizeX}
			{@const yPosition = (position / sizeX) | 0}
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