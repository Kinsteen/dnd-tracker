<script>
	/**
	 * @type {any}
	 */
	export let className = '';
	export let checked = false;
	export let disabled = false;
	/**
	 * @type {(checked: boolean) => void}
	 */
	export let callback = (_) => {};
</script>

<input
	{checked}
	{disabled}
	class="{className} appearance-none rounded-full bg-transparent border-2 border-slate-700 w-4 h-4
before:block before:w-2 before:h-2 before:rounded-full before:content-[''] before:bg-slate-700 before:invisible checked:before:visible
before:m-[0.125rem]
"
	type="checkbox"
	value=""
	id="checkboxDefault"
	on:click={(e) => {
		if (callback != null) {
			callback(e.target.checked);
		}
	}}
/>
