<script>
	/**
	 * @type {string}
	 */
	export let skill_name;
</script>

<div class="flex items-center gap-1">
	<input
		class="appearance-none rounded-full bg-transparent border-2 border-slate-700 w-4 h-4
    before:block before:w-2 before:h-2 before:rounded-full before:content-[''] before:bg-slate-700 before:invisible checked:before:visible
    before:m-[0.125rem]
    "
		type="checkbox"
		value=""
		id="checkboxDefault"
	/>

	<p>{skill_name}</p>
</div>
