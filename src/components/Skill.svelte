<script>
	import Checkbox from './Checkbox.svelte';

	/**
	 * @type {string}
	 */
	export let skill_name;
	export let raw_stat = 15;
	export let proficiency_bonus = 2;
	export let proficient = false;
	/**
	 * @type {(checked: boolean) => void}
	 */
	export let callback = (_) => {};

	$: stat_bonus = Math.floor(raw_stat / 2 - 5) + (proficient ? proficiency_bonus : 0);
</script>

<div class="flex items-center gap-1">
	<Checkbox {callback} checked={proficient} />
	<span class="font-mono">{stat_bonus > 0 ? '+' + stat_bonus : stat_bonus}</span>
	<p>{skill_name}</p>
</div>
