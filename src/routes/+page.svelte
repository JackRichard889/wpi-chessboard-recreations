<script lang="ts">
	import '../app.css';
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

<div class="flex h-screen overflow-hidden bg-slate-50">
	<aside class="flex w-56 shrink-0 flex-col bg-primary-700 shadow-lg">
		<div class="border-b border-primary-600 px-5 py-5">
			<img src="wpi.svg" alt="WPI logo" class="mb-3 h-8 opacity-90" />
			<h1 class="text-base font-bold text-white">Knight's Tours</h1>
			<p class="mt-0.5 text-xs text-primary-300">Interactive Visualizations</p>
		</div>

		<nav class="flex-1 overflow-y-auto px-3 py-4">
			<p class="mb-2 px-2 text-xs font-semibold tracking-wider text-primary-400 uppercase">
				Historical Tours
			</p>

			{#each Tours as option (option.id)}
				<button
					class="{tourId === option.id
						? 'bg-white/15 text-white'
						: 'text-primary-200 hover:bg-white/10 hover:text-white'} cursor-pointer mb-0.5 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150"
					onclick={() => (tourId = option.id)}>{option.name}</button
				>
			{/each}

			<div class="my-3 border-t border-primary-600"></div>

			<p class="mb-2 px-2 text-xs font-semibold tracking-wider text-primary-400 uppercase">
				Interactive Tours
			</p>
			<button
				class="{tourId === 9
					? 'bg-white/15 text-white'
					: 'text-primary-200 hover:bg-white/10 hover:text-white'} cursor-pointer mb-0.5 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150"
				onclick={() => {
					warnsdorff = undefined;
					tourId = 9;
				}}>Warnsdorff's Tour</button
			>
		</nav>

		<div class="border-t border-primary-600 px-5 py-5 mt-auto">
			<p class="mb-2 text-xs text-primary-300">Credits</p>
			<p class="text-xs text-white/80">This website was developed by Tri Nguyen and Jack Richard as part
				of an Interactive Qualifying Project (IQP) carried out under the direction of Professor P.K. Aravind.<br><br>Comments
				and feedback can be sent to <a class="underline" href="mailto:paravind@wpi.edu">paravind@wpi.edu</a>.</p>
		</div>
	</aside>

	<div class="flex min-w-0 flex-1 flex-col">
		<header
			class="flex h-14 shrink-0 items-center border-b border-gray-200 bg-white px-6 shadow-sm"
		>
			<h2 class="font-semibold text-gray-800">
				{activeTour?.name ?? "Warnsdorff's Tour"}
			</h2>
		</header>

		<main class="flex-1 overflow-auto p-5">
			{#if tourId === 9 && !warnsdorff}
				<Configuration oncomplete={(t) => (warnsdorff = t)} />
			{:else if activeTour}
				<div class="grid grid-cols-5 items-start gap-5">
					<div class="col-span-3 aspect-square max-h-[84vh] max-w-[84vh] overflow-hidden rounded-xl shadow-md">
						<Chessboard
							class="size-full"
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
							/>
						{/snippet}
					</Chessboard>
					</div>

					<div class="col-span-2 flex flex-col gap-4">
						<Controls
							bind:isPlaying
							bind:showNumbers
							bind:showPath
							onRestart={() => knightPath?.restart()}
						/>
						<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
							<TourComponent />
						</div>
					</div>
				</div>
			{/if}
		</main>
	</div>
</div>
