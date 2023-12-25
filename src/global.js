import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { LocalStorage } from './LocalStorage';

export const storage = new LocalStorage();

export const level = storage.createWritable('level', 0);

export const strength = storage.createWritable('strength', '12');
export const dexterity = storage.createWritable('dexterity', '12');
export const constitution = storage.createWritable('constitution', '13');
export const intelligence = storage.createWritable('intelligence', '13');
export const wisdom = storage.createWritable('wisdom', '18');
export const charisma = storage.createWritable('charisma', '9');

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

export const skillsData = [
	{ name: 'Acrobatics', rawStat: get(dexterity) },
	{ name: 'Animal Handling', rawStat: get(wisdom) },
	{ name: 'Arcana', rawStat: get(intelligence) },
	{ name: 'Athletics', rawStat: get(strength) },
	{ name: 'Deception', rawStat: get(charisma) },
	{ name: 'History', rawStat: get(intelligence) },
	{ name: 'Insight', rawStat: get(wisdom) },
	{ name: 'Intimidation', rawStat: get(charisma) },
	{ name: 'Investigation', rawStat: get(intelligence) },
	{ name: 'Medicine', rawStat: get(wisdom) },
	{ name: 'Nature', rawStat: get(intelligence) },
	{ name: 'Perception', rawStat: get(wisdom) },
	{ name: 'Performance', rawStat: get(charisma) },
	{ name: 'Persuasion', rawStat: get(charisma) },
	{ name: 'Religion', rawStat: get(intelligence) },
	{ name: 'Sleight of Hand', rawStat: get(dexterity) },
	{ name: 'Stealth', rawStat: get(dexterity) },
	{ name: 'Survival', rawStat: get(wisdom) }
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
