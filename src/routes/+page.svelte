<script lang="ts">
	import { Tours, warnsdorffTour } from '$lib';
	import Chessboard from "$lib/chessboard/Chessboard.svelte";

	let tourId = $state(1);
	let tour = $derived(tourId === 9 ? warnsdorffTour(10, 10, 0, 0) : Tours.find(x => x.id === tourId)!);
</script>

<main class="grid grid-cols-4 bg-white border border-gray-200 rounded-lg shadow-md">
    <nav class="bg-primary-500 p-6 rounded-l-lg z-10">
        <h2 class="font-bold mb-3 text-white text-xl">Tour Options</h2>

        {#each Tours as option (option.id)}
            <button class="{tourId === option.id ? 'underline' : ''} cursor-pointer block mb-2 text-md text-white whitespace-nowrap hover:underline" onclick={() => tourId = option.id}>{option.name}</button>
        {/each}

				<button class="{tourId === 9 ? 'underline' : ''} cursor-pointer block mb-2 text-md text-white whitespace-nowrap hover:underline" onclick={() => tourId = 9}>Warnsdorff's Tour</button>
    </nav>

    <Chessboard tour={tour}></Chessboard>
</main>