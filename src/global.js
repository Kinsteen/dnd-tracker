import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { LocalStorage } from './LocalStorage';

export const storage = new LocalStorage();

export const characterName = storage.createWritable('name', 'Name');

export const level = storage.createWritable('level', 0);

export const hitPoints = storage.createWritable('hit-points', 10);
export const maxHitPoints = storage.createWritable('max-hit-points', 10);

export const proficiencyBonus = storage.createWritable('proficiency-bonus', 2);

export const bonus = (/** @type {number} */ raw, proficient = false, proficiencyBonus = 2) => {
	const b = Math.floor(raw / 2 - 5) + (proficient ? proficiencyBonus : 0);
	return b >= 0 ? '+' + b : b.toString();
};

export const modify = (
	/** @type {import("svelte/store").Writable<any[]>} */ array,
	/** @type {(arg0: any[]) => void} */ f,
	/** @type {string | null} */ sortKey = null
) => {
	let output = get(array);
	f(output);
	if (sortKey != null && output.length > 1 && sortKey in output[0]) {
		if (typeof output[0][sortKey] === 'string') {
			output.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
		} else if (typeof output[0][sortKey] === 'number') {
			output.sort((a, b) => a[sortKey] - b[sortKey]);
		}
	}

	array.set(output);
};

// Load custom counters and spell slots from local storage

/**
 * @type {import('svelte/store').Writable<import('./app').CustomCounter[]>}
 */
export let customCounters = storage.createArrayWritable('custom-counter', true, 'displayIndex');

/**
 * @type {import('svelte/store').Writable<import('./app').SpellSlot[]>}
 */
export const spellSlots = storage.createArrayWritable('spell-slot');
if (browser) {
	const slotsArray = get(spellSlots).sort((a, b) => a.level - b.level);
	for (let i = 0; i < 9; i++) {
		if (slotsArray.length == i) {
			slotsArray.push({ level: i, used: 0, total: 0 });
		}
		if (slotsArray[i].level != i) {
			slotsArray[i] = { level: i, used: 0, total: 0 };
		}
	}
	spellSlots.set(slotsArray);
}

export const abilitiesData = [
	{ i: 0, name: 'Strength', value: 10, proficient: false },
	{ i: 1, name: 'Dexterity', value: 10, proficient: false },
	{ i: 2, name: 'Constitution', value: 10, proficient: false },
	{ i: 3, name: 'Intelligence', value: 10, proficient: false },
	{ i: 4, name: 'Wisdom', value: 10, proficient: false },
	{ i: 5, name: 'Charisma', value: 10, proficient: false }
];

export const abilities = storage.createArrayWritable('ability');
if (browser) {
	const abilitiesArray = get(abilities).sort((a, b) => a.i - b.i);
	for (let i = 0; i < abilitiesData.length; i++) {
		if (abilitiesArray.length == i) {
			abilitiesArray.push(abilitiesData[i]);
		}
		// TODO ?
	}
	abilities.set(abilitiesArray);
}

export const skillsData = [
	{ name: 'Acrobatics', rawStat: 1 },
	{ name: 'Animal Handling', rawStat: 4 },
	{ name: 'Arcana', rawStat: 3 },
	{ name: 'Athletics', rawStat: 0 },
	{ name: 'Deception', rawStat: 5 },
	{ name: 'History', rawStat: 3 },
	{ name: 'Insight', rawStat: 4 },
	{ name: 'Intimidation', rawStat: 5 },
	{ name: 'Investigation', rawStat: 3 },
	{ name: 'Medicine', rawStat: 4 },
	{ name: 'Nature', rawStat: 3 },
	{ name: 'Perception', rawStat: 4 },
	{ name: 'Performance', rawStat: 5 },
	{ name: 'Persuasion', rawStat: 5 },
	{ name: 'Religion', rawStat: 3 },
	{ name: 'Sleight of Hand', rawStat: 1 },
	{ name: 'Stealth', rawStat: 1 },
	{ name: 'Survival', rawStat: 4 }
];

/**
 * @type {import('svelte/store').Writable<import('./app').Skill[]>}
 */
export const skills = storage.createArrayWritable('skill');
if (browser) {
	const skillsArray = get(skills).sort((a, b) => a.name.localeCompare(b.name));
	for (let i = 0; i < skillsData.length; i++) {
		if (skillsArray.length == i) {
			skillsArray.push({ ...skillsData[i], proficient: false });
		}
		// TODO ?
	}
	skills.set(skillsArray);
}
