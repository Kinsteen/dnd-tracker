<script>
	/**
	 * @type {string}
	 */
	export let stat_name;
	/**
	 * @type {number}
	 */
	export let stat_value;
	const stat_bonus = Math.floor(stat_value / 2 - 5);
</script>

<div class="border-2 rounded-lg border-slate-500 flex flex-col items-center gap-2 py-1">
	<span class="font-semibold">{stat_name}</span>
	<p class="text-2xl w-fit">{stat_bonus > 0 ? '+' + stat_bonus : stat_bonus}</p>
	<p class="text-sm w-fit">{stat_value}</p>
</div>
