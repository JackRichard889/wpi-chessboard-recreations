import type { Component } from 'svelte';
import EulerKnightTour from '$lib/tours/EulerKnightTour.svelte';
import DeMoivreTour from '$lib/tours/DeMoivreTour.svelte';
import RogetTour1 from '$lib/tours/RogetTour1.svelte';
import KingMagicTour from '$lib/tours/KingMagicTour.svelte';
import RogetTour2 from '$lib/tours/RogetTour2.svelte';
import Euler6x6Tour from '$lib/tours/Euler6x6Tour.svelte';
import Knight7x7Tour from '$lib/tours/Knight7x7Tour.svelte';
import Knight5x5Tour from '$lib/tours/Knight5x5Tour.svelte';

interface Tour {
	id: number;
	name: string;
	component: Component;
	path: number[];
	boardSize: number;
}

export const Tours: Tour[] = [
	{
		id: 1,
		name: "Euler's Knight Tour",
		component: EulerKnightTour,
		path: [
			15, 27, 48, 36, 57, 78, 86, 65, 84, 72, 51, 63, 42, 21, 13, 34, 26, 18, 37, 45, 24, 12, 33,
			41, 53, 61, 82, 74, 55, 67, 88, 76, 64, 83, 71, 52, 31, 43, 22, 14, 35, 16, 28, 47, 68, 56,
			77, 85, 73, 81, 62, 54, 75, 87, 66, 58, 46, 38, 17, 25, 44, 32, 11, 23
		],
		boardSize: 8
	},
	{
		id: 2,
		name: "DeMoivre's Knight Tour",
		component: DeMoivreTour,
		path: [
			18, 37, 58, 77, 85, 73, 81, 62, 41, 22, 14, 26, 38, 57, 78, 86, 74, 82, 61, 42, 21, 13, 25,
			17, 36, 48, 67, 88, 76, 84, 72, 51, 32, 11, 23, 15, 27, 35, 16, 28, 47, 68, 87, 75, 83, 71,
			52, 31, 12, 24, 43, 64, 56, 44, 63, 55, 34, 53, 65, 46, 54, 33, 45, 66
		],
		boardSize: 8
	},
	{
		id: 3,
		name: "Roget's Knight Tour 1",
		component: RogetTour1,
		path: [
			45, 26, 18, 37, 58, 77, 85, 66, 54, 73, 81, 62, 41, 22, 14, 33, 25, 17, 38, 46, 65, 57, 78,
			86, 74, 82, 61, 53, 34, 42, 21, 13, 32, 11, 23, 44, 36, 15, 27, 48, 67, 88, 76, 55, 63, 84,
			72, 51, 43, 31, 12, 24, 16, 28, 47, 35, 56, 68, 87, 75, 83, 71, 52, 64
		],
		boardSize: 8
	},
	{
		id: 4,
		name: "King's Magic Tour",
		component: KingMagicTour,
		path: [
			15, 16, 17, 18, 28, 37, 26, 25, 34, 33, 22, 31, 41, 42, 43, 44, 54, 53, 52, 51, 61, 72, 63,
			64, 75, 76, 67, 78, 88, 87, 86, 85, 84, 83, 82, 81, 71, 62, 73, 74, 65, 66, 77, 68, 58, 57,
			56, 55, 45, 46, 47, 48, 38, 27, 36, 35, 24, 23, 32, 21, 11, 12, 13, 14
		],
		boardSize: 8
	},
	{
		id: 5,
		name: "Roget's Knight Tour 2",
		component: RogetTour2,
		path: [
			54, 62, 81, 73, 52, 71, 83, 64, 85, 77, 58, 66, 87, 68, 56, 75, 67, 88, 76, 55, 74, 82, 61,
			53, 72, 51, 63, 84, 65, 86, 78, 57, 45, 37, 18, 26, 47, 28, 16, 35, 14, 22, 41, 33, 12, 31,
			43, 24, 32, 11, 23, 44, 25, 17, 38, 46, 27, 48, 36, 15, 34, 13, 21, 42
		],
		boardSize: 8
	},
	{
		id: 6,
		name: "Euler's Knight Tour (6x6)",
		component: Euler6x6Tour,
		path: [
			61, 53, 65, 46, 25, 13, 21, 33, 41, 62, 54, 66, 45, 26, 14, 22, 43, 35, 16, 24, 12, 31, 52,
			64, 56, 44, 36, 15, 23, 11, 32, 51, 63, 55, 34, 42
		],
		boardSize: 6
	},
	{
		id: 7,
		name: 'Knight Tour (7x7)',
		component: Knight7x7Tour,
		path: [
			71, 52, 33, 14, 65, 46, 27, 32, 13, 64, 45, 26, 77, 51, 63, 44, 25, 76, 57, 31, 12, 24, 75,
			56, 37, 11, 62, 43, 55, 36, 17, 61, 42, 23, 74, 16, 67, 41, 22, 73, 54, 35, 47, 21, 72, 53,
			34, 15, 66
		],
		boardSize: 7
	},
	{
		id: 8,
		name: 'Knight Tour (5x5)',
		component: Knight5x5Tour,
		path: [
			51, 32, 13, 44, 25, 35, 11, 42, 23, 54, 14, 45, 21, 52, 33, 43, 24, 55, 31, 12, 22, 53, 34,
			15, 41
		],
		boardSize: 5
	}
];