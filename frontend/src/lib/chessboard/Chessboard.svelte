<script lang="ts">
    import {Stage, Layer, Rect, Circle, Line, Text} from 'svelte-konva';
    import {onMount} from "svelte";
    import Konva from "konva";

    const { boardSize, coordinates }: { boardSize: number, coordinates: number[][] } = $props();

    // Frame time to complete one animation.
    let animationSpeed: number = $state(2000);
    let isPlaying: boolean = $state(true);
    let showNumbers: boolean = $state(true);
    let showPath: boolean = $state(true);

    let animation: Konva.Animation;
    let containerSize: number = $state(0);

    // Initialize coordinates to world space.
    let localCoordinates: number[][] = $derived(coordinates.map(x => x.map(pos => pos * tileSize + (tileSize / 2))));

    // Size in pixels of each board tile.
    let tileSize = $derived(containerSize / boardSize);

    $effect(() => {
        if (isPlaying) {
            animation?.start();
        } else {
            animation?.stop();
        }
    });

    let coordinateIndex: number = $state(0);
    let knight: ReturnType<typeof Circle>;
    let knightPosX: number = $state(0);
    let knightPosY: number = $state(0);

    onMount(initAnimation);

    function initAnimation() {
        // Seed the knight path array with the starting position.
        knightPosX = localCoordinates[0][0];
        knightPosY = localCoordinates[0][1];

        // Create the knight movement and path animation.
        animation = new Konva.Animation(function(frame) {
            coordinateIndex = Math.trunc(frame!.time / animationSpeed);

            const coordinate = localCoordinates[Math.min(coordinateIndex, localCoordinates.length - 1)];
            const next = localCoordinates[Math.min(coordinateIndex + 1, localCoordinates.length - 1)];
            const delta = Math.min(frame!.time % animationSpeed / animationSpeed * 2, 1.0);

            const x = coordinate[0] + ((next[0] - coordinate[0]) * delta);
            const y = coordinate[1] + ((next[1] - coordinate[1]) * delta);
            knight.node.position({ x, y });

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

        initAnimation();
    }
</script>

<div class="bg-gray-100 col-span-3 grid grid-cols-5 gap-4 items-start justify-between p-4">
    <div bind:clientWidth={containerSize} class="col-span-3 grow shadow-md">
        <Stage width={ tileSize * boardSize } height={ tileSize * boardSize }>
            <!-- Chessboard layer. -->
            <Layer>
                {#each {length: boardSize ** 2} as _, position}
                    {@const xPosition = (position % boardSize) }
                    {@const yPosition = (position / boardSize | 0) }
                    {@const tileColor = (xPosition + yPosition) % 2 === 0 ? '#8f242e' : 'white' }

                    <Rect x={ xPosition * tileSize } y={ yPosition * tileSize }
                          width={ tileSize } height={ tileSize }
                          fill={ tileColor } />
                {/each}
            </Layer>

            <!-- Knight path layer. -->
            <Layer>
                {#if showPath }
                    <Line points={ [...localCoordinates.slice(0, coordinateIndex + 1).flat(), knightPosX, knightPosY] } stroke="#eb818a" lineCap="round"
                          lineJoin="round" strokeWidth={5} />
                {/if}
            </Layer>

            <!-- Knight path numbering layer. -->
            <Layer>
                {#if showNumbers }
                    {#each {length: boardSize ** 2} as _, position}
                        {@const xPosition = (position % boardSize) }
                        {@const yPosition = (position / boardSize | 0) }
                        {@const textColor = (xPosition + yPosition) % 2 === 0 ? 'white' : '#8f242e' }
                        {@const index = coordinates.findIndex(x => xPosition === x[0] && yPosition === x[1]) }

                        {#if index <= coordinateIndex }
                            <Text text={ `${index + 1}` } x={ xPosition * tileSize } y={ yPosition * tileSize }
                                  width={ tileSize } height={ tileSize } fontSize={ tileSize / 2.5 }
                                  fill={textColor} align="center" verticalAlign="middle" fontStyle="bold" />
                        {/if}
                    {/each}
                {/if}
            </Layer>

            <!-- Knight layer. -->
            <Layer>
                <Circle bind:this={knight} width={ tileSize / 2 } height={ tileSize / 2 } fill="black" />
            </Layer>
        </Stage>
    </div>

    <div class="bg-white col-span-2 p-6 rounded-lg shadow-md">
        <div class="flex mb-3">
            <button type="button" title={isPlaying ? 'Pause' : 'Play'} aria-label={isPlaying ? 'Pause' : 'Play'} onclick={() => isPlaying = !isPlaying} class="{isPlaying ? 'bg-primary-700 hover:bg-primary-800' : 'bg-primary-500 hover:bg-primary-600'} text-white font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-2 cursor-pointer">
                {#if isPlaying }
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clip-rule="evenodd"/>
                    </svg>
                {:else}
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
                    </svg>
                {/if}
            </button>

            <button type="button" title="Stop" aria-label="Stop" onclick={restartAnimation} class="text-white bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-2 cursor-pointer">
                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Z"/>
                </svg>
            </button>
        </div>

        <label for="animation-speed" class="block mb-1 text-sm font-semibold text-gray-900">Animation Speed</label>
        <input id="animation-speed" type="range" bind:value={animationSpeed} min="250" max="3000" class="w-full h-2 accent-primary-500 bg-gray-200 rounded-lg appearance-none cursor-pointer">

        <div class="flex items-center mt-3">
            <input id="show-numbers" type="checkbox" bind:checked={showNumbers} class="w-4 h-4 accent-primary-500 bg-gray-100 border-gray-300 rounded-sm cursor-pointer">
            <label for="show-numbers" class="ms-2 text-sm font-semibold text-gray-900">Show Numbers?</label>
        </div>

        <div class="flex items-center mt-3">
            <input id="show-path" type="checkbox" bind:checked={showPath} class="w-4 h-4 accent-primary-500 bg-gray-100 border-gray-300 rounded-sm cursor-pointer">
            <label for="show-path" class="ms-2 text-sm font-semibold text-gray-900">Show Path?</label>
        </div>
    </div>
</div>