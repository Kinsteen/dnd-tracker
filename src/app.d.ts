// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export interface CustomCounter {
	displayIndex: number;
	name: string;
	used: number;
	total: number;
}

export interface SpellSlot {
	level: number;
	used: number;
	total: number;
}

export interface Skill {
	name: string;
	rawStat: number; // TODO score key?
	proficient: boolean;
}

export {};
