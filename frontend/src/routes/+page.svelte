<script lang="ts">
    import {Stage, Layer, Rect, Circle, Line, Text} from 'svelte-konva';
    import {EulerTour} from "$lib";
    import {onMount} from "svelte";
    import Konva from "konva";

    const animationSpeed: number = 2000; // Frame time to complete one animation.
    const boardSize = 8; // n x n board.
    const tileSize = 50; // Size in pixels of each board tile.

    // Initialize coordinates to world space.
    const coordinates: number[][] = EulerTour;
    const localCoordinates: number[][] = coordinates.map(x => x.map(pos => pos * tileSize + (tileSize / 2)));

    let coordinateIndex: number = 0;
    let knight: ReturnType<typeof Circle>;
    let knightPath: number[] = [];

    onMount(() => {
        // Seed the knight path array with the starting position.
        knightPath[0] = localCoordinates[0][0];
        knightPath[1] = localCoordinates[0][1];

        // Create the knight movement and path animation.
        const animation = new Konva.Animation(function(frame) {
            coordinateIndex = Math.trunc(frame!.time / animationSpeed);

            const coordinate = localCoordinates[Math.min(coordinateIndex, localCoordinates.length - 1)];
            const next = localCoordinates[Math.min(coordinateIndex + 1, localCoordinates.length - 1)];
            const delta = Math.min(frame!.time % animationSpeed / animationSpeed * 2, 1.0);

            const x = coordinate[0] + ((next[0] - coordinate[0]) * delta);
            const y = coordinate[1] + ((next[1] - coordinate[1]) * delta);
            knight.node.position({ x, y });

            knightPath[(coordinateIndex + 1) * 2] = x;
            knightPath[(coordinateIndex + 1) * 2 + 1] = y;
        }, knight.node.getLayer());

        animation.start();
    });
</script>

<div class="mb-4">
    <h1 class="text-xl">WPI Chessboard Recreations</h1>
    <p>Visualization of the knight's tour.</p>
</div>

<Stage width={ tileSize * boardSize } height={ tileSize * boardSize }>
    <!-- Chessboard layer. -->
    <Layer>
        {#each {length: boardSize ** 2} as _, position}
            {@const xPosition = (position % boardSize) }
            {@const yPosition = (position / boardSize | 0) }
            {@const tileColor = (xPosition + yPosition) % 2 === 0 ? 'maroon' : 'tan' }

            <Rect x={ xPosition * tileSize } y={ yPosition * tileSize }
                  width={ tileSize } height={ tileSize }
                  fill={ tileColor } />
        {/each}
    </Layer>

    <!-- Knight path layer. -->
    <Layer>
        <Line points={ knightPath } stroke="yellow" />
    </Layer>

    <!-- Knight path numbering layer. -->
    <Layer>
        {#each {length: boardSize ** 2} as _, position}
            {@const xPosition = (position % boardSize) }
            {@const yPosition = (position / boardSize | 0) }
            {@const index = coordinates.findIndex(x => xPosition === x[0] && yPosition === x[1]) }

            {#if index <= coordinateIndex }
                <Text text={ `${index + 1}` } x={ xPosition * tileSize } y={ yPosition * tileSize }
                      fontSize={ tileSize / 3 } fill="white" />
            {/if}
        {/each}
    </Layer>

    <!-- Knight layer. -->
    <Layer>
        <Circle bind:this={knight} width={ tileSize / 2 } height={ tileSize / 2 } fill="black" />
    </Layer>
</Stage>