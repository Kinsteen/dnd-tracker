<script>
	import { abilities, bonus, proficiencyBonus } from '../global';
	import Checkbox from './Checkbox.svelte';

	/**
	 * @type {string}
	 */
	export let skill_name;
	/**
	 * @type {number}
	 */
	export let raw_stat;
	export let proficiency_bonus = $proficiencyBonus;
	export let proficient = false;
	/**
	 * @type {(checked: boolean) => void}
	 */
	export let callback = (_) => {};

	$: stat_bonus = bonus($abilities[raw_stat].value, proficient, parseInt(proficiency_bonus));
</script>

<div class="flex items-center gap-1">
	<Checkbox {callback} checked={proficient} />
	<span class="font-mono">{stat_bonus}</span>
	<p>{skill_name}</p>
</div>
