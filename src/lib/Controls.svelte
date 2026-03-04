<script lang="ts">
	interface Props {
		isPlaying: boolean;
		showNumbers: boolean;
		showPath: boolean;
		onRestart: () => void;
	}

	let {
		isPlaying = $bindable(),
		showNumbers = $bindable(),
		showPath = $bindable(),
		onRestart
	}: Props = $props();
</script>

<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
	<p class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Playback</p>

	<div class="mb-5 flex gap-2">
		<button
			type="button"
			title={isPlaying ? 'Pause' : 'Play'}
			aria-label={isPlaying ? 'Pause' : 'Play'}
			onclick={() => (isPlaying = !isPlaying)}
			class="{isPlaying
				? 'bg-primary-600 hover:bg-primary-700'
				: 'bg-primary-500 hover:bg-primary-600'} cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition-colors"
		>
			{#if isPlaying}
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
						clip-rule="evenodd"
					/>
				</svg>
				Pause
			{:else}
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
						clip-rule="evenodd"
					/>
				</svg>
				Play
			{/if}
		</button>

		<button
			type="button"
			title="Reset"
			aria-label="Reset"
			onclick={() => {
				isPlaying = false;
				onRestart();
			}}
			class="flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200"
		>
			<svg
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2.5"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
				/>
			</svg>
			Reset
		</button>
	</div>

	<div class="border-t border-gray-100 pt-4">
		<p class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Display</p>

		<div class="space-y-3">
			<label class="flex cursor-pointer items-center justify-between">
				<span class="text-sm font-medium text-gray-700">Show Numbers?</span>
				<div class="relative">
					<input
						id="show-numbers"
						type="checkbox"
						bind:checked={showNumbers}
						class="peer sr-only"
					/>
					<div
						class="h-5 w-9 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary-500 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"
					></div>
				</div>
			</label>

			<label class="flex cursor-pointer items-center justify-between">
				<span class="text-sm font-medium text-gray-700">Show Path?</span>
				<div class="relative">
					<input id="show-path" type="checkbox" bind:checked={showPath} class="peer sr-only" />
					<div
						class="h-5 w-9 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary-500 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"
					></div>
				</div>
			</label>
		</div>
	</div>
</div>
