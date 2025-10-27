<script lang="ts">
    import {slide} from "svelte/transition";
    import {Tours} from "$lib";
    import Chessboard from "$lib/chessboard/Chessboard.svelte";

    let showMenu = $state(false);

    let tour = $state(Tours[0]);
    let TourComponent = $derived(tour.component);
    let tourCoordinates = $derived(tour.path.map(num => {
        const x = Math.floor(num / 10);
        const y = num - 10 * x;
        return [y - 1, x - 1]; // 0-indexed
    }));
</script>

<main class="grid grid-cols-4 bg-white border border-gray-200 rounded-lg shadow-md">
    <div class="relative">
        {#if showMenu}
            <nav transition:slide={{ axis: 'x', duration: 300 }} class="absolute bg-primary-500 top-0 left-0 right-0 bottom-0 overflow-hidden p-6 rounded-l-lg z-10">
                <button class="cursor-pointer text-white text-sm hover:underline" onclick={() => showMenu = false}>Close</button>
                <h2 class="font-bold mb-3 text-white text-xl">Tour Options</h2>

                {#each Tours as option (option.id)}
                    <button class="cursor-pointer block mb-2 text-md text-white whitespace-nowrap hover:underline" onclick={() => tour = option}>{option.name}</button>
                {/each}
            </nav>
        {/if}

        <div class="p-6">
            <button class="cursor-pointer text-primary-500 text-sm hover:underline" onclick={() => showMenu = true}>Show Options</button>
            <TourComponent></TourComponent>
        </div>
    </div>

    <Chessboard boardSize={tour.boardSize} coordinates={tourCoordinates}></Chessboard>
</main>