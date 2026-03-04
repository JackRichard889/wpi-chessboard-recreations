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
			onclick={() => {
				isPlaying = false;
				onRestart();
			}}
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
		<label for="show-numbers" class="ms-2 text-sm font-semibold text-gray-900">Show Numbers?</label>
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
