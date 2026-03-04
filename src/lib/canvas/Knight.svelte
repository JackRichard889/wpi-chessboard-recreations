<script lang="ts">
	import { Image, Layer } from 'svelte-konva';

	interface Props {
		asset: string;
		tileSize: number;
		x: number;
		y: number;
		opacity?: number;
	}

	let { asset, tileSize, x, y, opacity = 1 }: Props = $props();

	let knightAsset: HTMLImageElement | undefined = $state(undefined);

	$effect(() => {
		const img = document.createElement('img');
		img.src = asset;
		img.onload = () => (knightAsset = img);
	});
</script>

<Layer>
	<Image
		{x}
		{y}
		{opacity}
		width={tileSize / 1.5}
		height={tileSize / 1.5}
		offsetX={tileSize / 3}
		offsetY={tileSize / 3}
		image={knightAsset}
	></Image>
</Layer>
