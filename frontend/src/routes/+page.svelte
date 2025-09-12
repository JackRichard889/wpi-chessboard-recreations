<script lang="ts">
    import {Stage, Layer, Rect, Circle, Line} from 'svelte-konva';
    import {onMount} from "svelte";
    import Konva from "konva";

    const boardSize = 8;
    const tileSize = 40;

    let knight: ReturnType<typeof Circle>;
    let points: number[] = [];

    onMount(() => {
        // Initialize coordinates to world space.
        const coordinates: number[][] = [[0,4],[1,6],[3,7],[2,5],[4,6],[6,7],[7,5],[5,4],[7,3],[6,1],[4,0],[5,2],[3,1],[1,0],[0,2],[2,3],[1,5],[0,7],[2,6],[3,4],[1,3],[0,1],[2,2],[3,0],[4,2],[5,0],[7,1],[6,3],[4,4],[5,6],[7,7],[6,5],[5,3],[7,2],[6,0],[4,1],[2,0],[3,2],[1,1],[0,3],[2,4],[0,5],[1,7],[3,6],[5,7],[4,5],[6,6],[7,4],[6,2],[7,0],[5,1],[4,3],[6,4],[7,6],[5,5],[4,7],[3,5],[2,7],[0,6],[1,4],[3,3],[2,1],[0,0],[1,2]].map(x => x.map(pos => pos * tileSize + (tileSize / 2)));

        // Represents time to complete one animation.
        const animationSpeed: number = 2000;

        // Seed the knight path array with the starting position.
        points[0] = coordinates[0][0];
        points[1] = coordinates[0][1];

        // Create the knight movement and path animation.
        const animation = new Konva.Animation(function(frame) {
            const coordinateIndex = Math.trunc(frame!.time / animationSpeed);
            const coordinate = coordinates[Math.min(coordinateIndex, coordinates.length - 1)];
            const next = coordinates[Math.min(coordinateIndex + 1, coordinates.length - 1)];
            const delta = Math.min(frame!.time % animationSpeed / animationSpeed * 2, 1.0);

            const x = coordinate[0] + ((next[0] - coordinate[0]) * delta);
            const y = coordinate[1] + ((next[1] - coordinate[1]) * delta);
            knight.node.position({ x, y });

            points[(coordinateIndex + 1) * 2] = x;
            points[(coordinateIndex + 1) * 2 + 1] = y;
        }, knight.node.getLayer());

        animation.start();
    });
</script>

<div class="mb-4">
    <h1 class="text-xl">WPI Chessboard Recreations</h1>
    <p>Visualization of the knight's tour.</p>
</div>

<Stage width={ tileSize * boardSize } height={ tileSize * boardSize }>
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
    <Layer>
        <Line points={ points } stroke="yellow" />
    </Layer>
    <Layer>
        <Circle bind:this={knight} width={ tileSize / 2 } height={ tileSize / 2 } fill="black" />
    </Layer>
</Stage>