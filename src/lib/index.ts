import type { Component } from 'svelte';
import EulerKnightTour from '$lib/tours/EulerKnightTour.svelte';
import DeMoivreTour from '$lib/tours/DeMoivreTour.svelte';
import RogetTour1 from '$lib/tours/RogetTour1.svelte';
import KingMagicTour from '$lib/tours/KingMagicTour.svelte';
import RogetTour2 from '$lib/tours/RogetTour2.svelte';
import Euler6x6Tour from '$lib/tours/Euler6x6Tour.svelte';
import Knight7x7Tour from '$lib/tours/Knight7x7Tour.svelte';
import Knight5x5Tour from '$lib/tours/Knight5x5Tour.svelte';
import WarnsdorffTour from '$lib/tours/WarnsdorffTour.svelte';
import KnightAsset from '$lib/assets/knight.png';
import KingAsset from '$lib/assets/king.png';

export interface Tour {
	id: number;
	name: string;
	component: Component;
	asset: string;
	path: number[][];
	boardSize: { x: number, y: number };
}

export const Tours: Tour[] = [
	{
		id: 1,
		name: "Euler's Knight Tour",
		component: EulerKnightTour,
		asset: KnightAsset,
		path: [
			[4, 0], [6, 1], [7, 3], [5, 2], [6, 4], [7, 6], [5, 7], [4, 5],
			[3, 7], [1, 6], [0, 4], [2, 5], [1, 3], [0, 1], [2, 0], [3, 2],
			[5, 1], [7, 0], [6, 2], [4, 3], [3, 1], [1, 0], [2, 2], [0, 3],
			[2, 4], [0, 5], [1, 7], [3, 6], [4, 4], [6, 5], [7, 7], [5, 6],
			[3, 5], [2, 7], [0, 6], [1, 4], [0, 2], [2, 3], [1, 1], [3, 0],
			[4, 2], [5, 0], [7, 1], [6, 3], [7, 5], [5, 4], [6, 6], [4, 7],
			[2, 6], [0, 7], [1, 5], [3, 4], [4, 6], [6, 7], [5, 5], [7, 4],
			[5, 3], [7, 2], [6, 0], [4, 1], [3, 3], [1, 2], [0, 0], [2, 1]
		],
		boardSize: { x: 8, y: 8 }
	},
	{
		id: 2,
		name: "DeMoivre's Knight Tour",
		component: DeMoivreTour,
		asset: KnightAsset,
		path: [
			[7, 0], [6, 2], [7, 4], [6, 6], [4, 7], [2, 6], [0, 7], [1, 5],
			[0, 3], [1, 1], [3, 0], [5, 1], [7, 2], [6, 4], [7, 6], [5, 7],
			[3, 6], [1, 7], [0, 5], [1, 3], [0, 1], [2, 0], [4, 1], [6, 0],
			[5, 2], [7, 3], [6, 5], [7, 7], [5, 6], [3, 7], [1, 6], [0, 4],
			[1, 2], [0, 0], [2, 1], [4, 0], [6, 1], [4, 2], [5, 0], [7, 1],
			[6, 3], [7, 5], [6, 7], [4, 6], [2, 7], [0, 6], [1, 4], [0, 2],
			[1, 0], [3, 1], [2, 3], [3, 5], [5, 4], [3, 3], [2, 5], [4, 4],
			[3, 2], [2, 4], [4, 5], [5, 3], [3, 4], [2, 2], [4, 3], [5, 5],
		],
		boardSize: { x: 8, y: 8 }
	},
	{
		id: 3,
		name: "Roget's Knight Tour 1",
		component: RogetTour1,
		asset: KnightAsset,
		path: [
			[4, 3], [5, 1], [7, 0], [6, 2], [7, 4], [6, 6], [4, 7], [5, 5],
			[3, 4], [2, 6], [0, 7], [1, 5], [0, 3], [1, 1], [3, 0], [2, 2],
			[4, 1], [6, 0], [7, 2], [5, 3], [4, 5], [6, 4], [7, 6], [5, 7],
			[3, 6], [1, 7], [0, 5], [2, 4], [3, 2], [1, 3], [0, 1], [2, 0],
			[1, 2], [0, 0], [2, 1], [3, 3], [5, 2], [4, 0], [6, 1], [7, 3],
			[6, 5], [7, 7], [5, 6], [4, 4], [2, 5], [3, 7], [1, 6], [0, 4],
			[2, 3], [0, 2], [1, 0], [3, 1], [5, 0], [7, 1], [6, 3], [4, 2],
			[5, 4], [7, 5], [6, 7], [4, 6], [2, 7], [0, 6], [1, 4], [3, 5]
		],
		boardSize: { x: 8, y: 8 }
	},
	{
		id: 4,
		name: "Roget's Knight Tour 2",
		component: RogetTour2,
		asset: KnightAsset,
		path: [
			[3, 4], [1, 5], [0, 7], [2, 6], [1, 4], [0, 6], [2, 7], [3, 5],
			[4, 7], [6, 6], [7, 4], [5, 5], [6, 7], [7, 5], [5, 4], [4, 6],
			[6, 5], [7, 7], [5, 6], [4, 4], [3, 6], [1, 7], [0, 5], [2, 4],
			[1, 6], [0, 4], [2, 5], [3, 7], [4, 5], [5, 7], [7, 6], [6, 4],
			[4, 3], [6, 2], [7, 0], [5, 1], [6, 3], [7, 1], [5, 0], [4, 2],
			[3, 0], [1, 1], [0, 3], [2, 2], [1, 0], [0, 2], [2, 3], [3, 1],
			[1, 2], [0, 0], [2, 1], [3, 3], [4, 1], [6, 0], [7, 2], [5, 3],
			[6, 1], [7, 3], [5, 2], [4, 0], [3, 2], [2, 0], [0, 1], [1, 3]
		],
		boardSize: { x: 8, y: 8 }
	},
	{
		id: 5,
		name: 'Knight Tour (7x7)',
		component: Knight7x7Tour,
		asset: KnightAsset,
		path: [
			[0, 6], [1, 4], [2, 2], [3, 0], [4, 5], [5, 3], [6, 1],
			[1, 2], [2, 0], [3, 5], [4, 3], [5, 1], [6, 6], [0, 4],
			[2, 5], [3, 3], [4, 1], [5, 6], [6, 4], [0, 2], [1, 0],
			[3, 1], [4, 6], [5, 4], [6, 2], [0, 0], [1, 5], [2, 3],
			[4, 4], [5, 2], [6, 0], [0, 5], [1, 3], [2, 1], [3, 6],
			[5, 0], [6, 5], [0, 3], [1, 1], [2, 6], [3, 4], [4, 2],
			[6, 3], [0, 1], [1, 6], [2, 4], [3, 2], [4, 0], [5, 5],
		],
		boardSize: { x: 7, y: 7 }
	},
	{
		id: 6,
		name: "Euler's Knight Tour (6x6)",
		component: Euler6x6Tour,
		asset: KnightAsset,
		path: [
			[0, 5], [2, 4], [4, 5], [5, 3], [4, 1], [2, 0],
			[0, 1], [2, 2], [0, 3], [1, 5], [3, 4], [5, 5],
			[4, 3], [5, 1], [3, 0], [1, 1], [2, 3], [4, 2],
			[5, 0], [3, 1], [1, 0], [0, 2], [1, 4], [3, 5],
			[5, 4], [3, 3], [5, 2], [4, 0], [2, 1], [0, 0],
			[1, 2], [0, 4], [2, 5], [4, 4], [3, 2], [1, 3]
		],
		boardSize: { x: 6, y: 6 }
	},
	{
		id: 7,
		name: 'Knight Tour (5x5)',
		component: Knight5x5Tour,
		asset: KnightAsset,
		path: [
			[0, 4], [1, 2], [2, 0], [3, 3], [4, 1],
			[4, 2], [0, 0], [1, 3], [2, 1], [3, 4],
			[3, 0], [4, 3], [0, 1], [1, 4], [2, 2],
			[2, 3], [3, 1], [4, 4], [0, 2], [1, 0],
			[1, 1], [2, 4], [3, 2], [4, 0], [0, 3]
		],
		boardSize: { x: 5, y: 5 }
	},
	{
		id: 8,
		name: "King's Magic Tour",
		component: KingMagicTour,
		asset: KingAsset,
		path: [
			[4, 0], [5, 0], [6, 0], [7, 0], [7, 1], [6, 2], [5, 1], [4, 1],
			[3, 2], [2, 2], [1, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3],
			[3, 4], [2, 4], [1, 4], [0, 4], [0, 5], [1, 6], [2, 5], [3, 5],
			[4, 6], [5, 6], [6, 5], [7, 6], [7, 7], [6, 7], [5, 7], [4, 7],
			[3, 7], [2, 7], [1, 7], [0, 7], [0, 6], [1, 5], [2, 6], [3, 6],
			[4, 5], [5, 5], [6, 6], [7, 5], [7, 4], [6, 4], [5, 4], [4, 4],
			[4, 3], [5, 3], [6, 3], [7, 3], [7, 2], [6, 1], [5, 2], [4, 2],
			[3, 1], [2, 1], [1, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0]
		],
		boardSize: { x: 8, y: 8 }
	}
];

export function warnsdorffTour(dx: number, dy: number, start_x: number, start_y: number): Tour {
	// --- 1. Constants and Helpers ---

	// All 8 possible knight moves
	const KNIGHT_MOVES = [
		[2, 1],
		[2, -1],
		[-2, 1],
		[-2, -1],
		[1, 2],
		[1, -2],
		[-1, 2],
		[-1, -2]
	];

	const totalSquares = dx * dy;

	// Helper to check if a square is on the board
	function isOnBoard(x: number, y: number) {
		return x >= 0 && x < dx && y >= 0 && y < dy;
	}

	// Helper to pick a random item from an array (for tie-breaking)
	function randomChoice(arr: number[][]) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	// --- 2. Initialization ---

	// Create a 2D array (dy rows, dx cols) filled with 0s.
	// 0 means unvisited. We will store the move number (1, 2, 3...)
	const board = Array.from({ length: dy }, () => Array(dx).fill(0));

	// This list will store the [x, y] coordinates of the path.
	const path = [];

	// Set starting position
	let current_x = start_x;
	let current_y = start_y;

	// Mark the starting square with move number 1
	board[current_y][current_x] = 1;
	path.push([current_x, current_y]);

	// --- 3. Main Tour Loop ---

	// Loop from the 2nd move up to the total number of squares
	for (let moveNumber = 2; moveNumber <= totalSquares; moveNumber++) {
		// Find all valid potential moves from the current position
		const possibleMoves = [];
		for (const [move_x, move_y] of KNIGHT_MOVES) {
			const next_x = current_x + move_x;
			const next_y = current_y + move_y;

			// Check if the move is (1) on the board and (2) unvisited (value is 0)
			if (isOnBoard(next_x, next_y) && board[next_y][next_x] === 0) {
				possibleMoves.push([next_x, next_y]);
			}
		}

		// If there are no moves, the tour is stuck and has failed.
		// We break the loop and the `success` check later will handle it.
		if (possibleMoves.length === 0) {
			break;
		}

		// --- Warnsdorff's Rule ---
		// Score each possible move by how many *onward* moves it has.
		const scoredMoves = [];
		let minScore = 9; // Max possible score is 8, so 9 is a safe start

		for (const [next_x, next_y] of possibleMoves) {
			let onwardMovesCount = 0;

			// "Look ahead" one step to count valid moves from *that* square
			for (const [onward_x, onward_y] of KNIGHT_MOVES) {
				const lookahead_x = next_x + onward_x;
				const lookahead_y = next_y + onward_y;

				if (isOnBoard(lookahead_x, lookahead_y) && board[lookahead_y][lookahead_x] === 0) {
					onwardMovesCount++;
				}
			}

			scoredMoves.push({ move: [next_x, next_y], score: onwardMovesCount });
			if (onwardMovesCount < minScore) {
				minScore = onwardMovesCount;
			}
		}

		// Filter for all moves that tie for the minimum score
		const bestMoves = scoredMoves
			.filter((item) => item.score === minScore)
			.map((item) => item.move);

		// Select the next move.
		// If there's a tie, pick one randomly (as the BASIC code did).
		const [chosen_x, chosen_y]: number[] = randomChoice(bestMoves);

		// Make the move
		current_x = chosen_x;
		current_y = chosen_y;
		board[current_y][current_x] = moveNumber;
		path.push([current_x, current_y]);
	} // --- End of Main Loop ---

	// --- 4. Post-Tour Analysis & Return ---

	// Check 1: Success
	const success = path.length === totalSquares;

	// Check 2: Circuit (Re-entrant)
	let is_circuit = false;
	if (success) {
		const [last_x, last_y] = path[path.length - 1]; // Get last square
		const [first_x, first_y] = path[0]; // Get first square

		const delta_x = Math.abs(last_x - first_x);
		const delta_y = Math.abs(last_y - first_y);

		// Check if the last square is a knight's move from the first
		if ((delta_x === 2 && delta_y === 1) || (delta_x === 1 && delta_y === 2)) {
			is_circuit = true;
		}
	}

	// Check 3: Magic Square
	let is_magic = false;
	if (success) {
		const rowSums = Array(dy).fill(0);
		const colSums = Array(dx).fill(0);

		for (let y = 0; y < dy; y++) {
			for (let x = 0; x < dx; x++) {
				const moveNum = board[y][x];
				rowSums[y] += moveNum;
				colSums[x] += moveNum;
			}
		}

		const magicSum = rowSums[0];
		// Check if all row sums and all col sums match the first row's sum
		const allRowSumsEqual = rowSums.every((sum) => sum === magicSum);
		const allColSumsEqual = colSums.every((sum) => sum === magicSum);

		if (allRowSumsEqual && allColSumsEqual) {
			is_magic = true;
		}
	}

	// Return the final result object
	return {
		id: 9,
		name: "Warnsdorff's Algorithm",
		component: WarnsdorffTour,
		asset: KnightAsset,
		path: path,
		boardSize: { x: dx, y: dy }
	};
}
