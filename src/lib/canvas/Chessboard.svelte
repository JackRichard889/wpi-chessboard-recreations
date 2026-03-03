<script lang="ts">
	import { Layer, Rect, Stage } from 'svelte-konva';
	let { sizeX, sizeY, layers, onTileClicked, ...props } = $props();

	let containerSize: number = $state(0);
	let tileSize = $derived(containerSize / Math.max(sizeX, sizeY));
</script>

<div bind:clientWidth={containerSize} {...props}>
	<Stage width={tileSize * sizeX} height={tileSize * sizeY}>
		<Layer>
			{#each { length: sizeX * sizeY } as _, position (position)}
				{@const xPosition = position % sizeX}
				{@const yPosition = (position / sizeX) | 0}
				{@const tileColor = (xPosition + yPosition) % 2 === 0 ? '#8f242e' : 'white'}

				<Rect
					x={xPosition * tileSize}
					y={yPosition * tileSize}
					width={tileSize}
					height={tileSize}
					fill={tileColor}
					onclick={() => onTileClicked(xPosition, yPosition)}
				/>
			{/each}
		</Layer>

		{@render layers(tileSize)}
	</Stage>
</div>