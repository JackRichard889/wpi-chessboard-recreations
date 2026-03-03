<script lang="ts">
	import { Image, Layer } from 'svelte-konva';
	let { asset, tileSize, x, y } = $props();

	let knight: ReturnType<typeof Image>;
	let knightAsset: HTMLImageElement | undefined = $state(undefined);

	$effect(() => {
		const img = document.createElement('img');
		img.src = asset;
		img.onload = () => (knightAsset = img);
	});
</script>

<Layer>
	<Image
		bind:this={knight}
		{x}
		{y}
		width={tileSize / 1.5}
		height={tileSize / 1.5}
		offsetX={-tileSize / 6}
		offsetY={-tileSize / 6}
		image={knightAsset}
	></Image>
</Layer>