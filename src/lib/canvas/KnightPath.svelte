<script lang="ts">
	import { Layer, Line, Text } from 'svelte-konva';
	import { onMount, onDestroy } from 'svelte';
	import Konva from 'konva';
	import type { Tour } from '$lib';
	import Knight from '$lib/canvas/Knight.svelte';

	const BASE_SPEED = 500;
	const END_SPEED = 100;

	interface Props {
		isPlaying: boolean;
		showNumbers: boolean;
		showPath: boolean;
		sizeX: number;
		sizeY: number;
		tileSize: number;
		tour: Tour;
		asset: string;
	}

	let {
		isPlaying = $bindable(),
		showNumbers,
		showPath,
		sizeX,
		sizeY,
		tileSize,
		tour,
		asset
	}: Props = $props();

	let animation: Konva.Animation;
	let elapsedTime = 0;
	let coordinateIndex: number = $state(0);
	let knightPosX: number = $state(0);
	let knightPosY: number = $state(0);
	let knightOpacity: number = $state(1);

	let localCoordinates = $derived(
		tour.path.map((x) => x.map((pos) => pos * tileSize + tileSize / 2))
	);

	let cumTimes = $derived.by(() => {
		const N = localCoordinates.length;
		const r = Math.pow(END_SPEED / BASE_SPEED, 1 / Math.max(N - 1, 1));
		const times = [0];
		for (let i = 0; i < N; i++) {
			times.push(times[i] + BASE_SPEED * Math.pow(r, i));
		}
		return times;
	});

	$effect(() => {
		knightPosX = localCoordinates[0][0];
		knightPosY = localCoordinates[0][1];
		knightOpacity = 1;
		elapsedTime = 0;
		coordinateIndex = 0;
	});

	$effect(() => {
		if (isPlaying) {
			animation?.start();
		} else {
			animation?.stop();
		}
	});

	onMount(initAnimation);
	onDestroy(() => animation?.stop());

	function initAnimation() {
		knightPosX = localCoordinates[0][0];
		knightPosY = localCoordinates[0][1];
		knightOpacity = 1;

		animation = new Konva.Animation(function (frame) {
			elapsedTime += frame!.timeDiff;
			const t = elapsedTime;
			const N = localCoordinates.length;
			const totalTime = cumTimes[N];

			while (coordinateIndex < N - 1 && cumTimes[coordinateIndex + 1] <= t) {
				coordinateIndex++;
			}

			if (t >= totalTime) {
				const last = localCoordinates[N - 1];
				knightPosX = last[0];
				knightPosY = last[1];
				knightOpacity = Math.max(0, 1 - (t - totalTime) / BASE_SPEED);
			} else {
				const stepStart = cumTimes[coordinateIndex];
				const stepDuration = cumTimes[coordinateIndex + 1] - stepStart;
				const delta = (t - stepStart) / stepDuration;

				const coordinate = localCoordinates[coordinateIndex];
				const next = localCoordinates[Math.min(coordinateIndex + 1, N - 1)];
				knightPosX = coordinate[0] + (next[0] - coordinate[0]) * delta;
				knightPosY = coordinate[1] + (next[1] - coordinate[1]) * delta;
				knightOpacity = 1;
			}
		});

		if (isPlaying) {
			animation.start();
		}
	}

	export function restart() {
		animation.stop();
		isPlaying = false;

		elapsedTime = 0;
		coordinateIndex = 0;
		knightPosX = localCoordinates[0][0];
		knightPosY = localCoordinates[0][1];
		knightOpacity = 1;
	}
</script>

<Layer>
	{#if showPath}
		<Line
			points={[...localCoordinates.slice(0, coordinateIndex + 1).flat(), knightPosX, knightPosY]}
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

<Knight {asset} {tileSize} x={knightPosX} y={knightPosY} opacity={knightOpacity} />
