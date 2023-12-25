<script>
	import '../../app.css';
	import { customCounters, modify, spellSlots } from '../../global';
</script>

<div class="container mx-auto max-w-[48em] flex flex-col">
	<a href="/">Home</a>
	<a href="/edit">Edit</a>
	<div class="flex flex-col w-auto gap-2 m-2">
		<div class="flex flex-col gap-2 p-2 border-2 rounded-lg border-slate-500">
			{#each $customCounters as counter, i}
				<div class="inline">
					<button
						class="border-[1px] border-slate-800 rounded-full w-5 h-5 leading-none {i == 0 &&
							'opacity-0'}"
						on:click={() => {
							modify(
								customCounters,
								(old) => {
									old[i].displayIndex -= 1;
									old[i - 1].displayIndex += 1;
								},
								'displayIndex'
							);
						}}>&uarr;</button
					>
					<button
						class="border-[1px] border-slate-800 rounded-full w-5 h-5 leading-none {i ==
							$customCounters.length - 1 && 'opacity-0'}"
						on:click={() => {
							modify(
								customCounters,
								(old) => {
									old[i].displayIndex += 1;
									old[i + 1].displayIndex -= 1;
								},
								'displayIndex'
							);
						}}>&darr;</button
					>
					<button
						class="border-[1px] border-slate-800 rounded-full w-5 h-5 leading-none text-red-700"
						on:click={() => {
							modify(
								customCounters,
								(old) => {
									old.splice(i, 1);

									// Flatten display idx
									for (let idx = 0; idx < old.length; idx++) {
										old[idx].displayIndex = idx;
									}
								},
								'displayIndex'
							);
						}}>&#128473;</button
					>
					<div
						class="min-w-6 outline-2 w-fit inline-block font-semibold border-2 rounded-lg p-0.5 border-slate-300"
						role="textbox"
						tabindex="0"
						contenteditable="true"
						on:keydown={(e) => {
							if (e.key == 'Enter') e.preventDefault();
						}}
						on:input={(e) => {
							// TODO temp name to avoid reordering everytime
							modify(
								customCounters,
								(old) => {
									old[i].name = e.target.innerText.replace(/\n$/, '');
								},
								'displayIndex'
							);
						}}
					>
						{counter.name}
					</div>
					<span class="font-semibold">total:</span>
					<button
						class="border-[1px] border-slate-800 rounded-full w-4 h-4 leading-[0]"
						on:click={() => {
							modify(
								customCounters,
								(old) => {
									old[i].total -= 1;
								},
								'displayIndex'
							);
						}}>-</button
					>
					<span class="font-mono">{counter.total}</span>
					<button
						class="border-[1px] border-slate-800 rounded-full w-4 h-4 leading-[0]"
						on:click={() => {
							modify(
								customCounters,
								(old) => {
									old[i].total += 1;
								},
								'displayIndex'
							);
						}}>+</button
					>
				</div>
			{/each}
			<p class="mt-4">Add a new custom counter:</p>
			<div class="flex items-center gap-2">
				<div
					id="new-counter"
					class="min-w-6 outline-2 w-fit inline-block font-semibold border-2 rounded-lg p-0.5 border-slate-300"
					role="textbox"
					tabindex="0"
					contenteditable="true"
					on:keydown={(e) => {
						if (e.key == 'Enter') e.preventDefault();
					}}
				></div>
				<button
					class="border-2 border-slate-200 p-1 rounded-md"
					on:click={() => {
						let newCounterName = document
							.getElementById('new-counter')
							?.innerText.replace(/\n$/, '');
						modify(
							customCounters,
							(/** @type {import('../../app').CustomCounter[]} */ old) => {
								old.push({
									displayIndex: $customCounters.length,
									name: newCounterName ?? '',
									used: 0,
									total: 1
								});
							},
							'displayIndex'
						);
					}}>Add</button
				>
			</div>
			<p class="self-center pt-2 font-semibold">Custom counters</p>
		</div>
		<div class="flex flex-col gap-2 p-2 border-2 rounded-lg border-slate-500">
			{#each $spellSlots as spellSlot, i}
				<div>
					Level: <span class="font-mono">{spellSlot.level + 1}</span>
					Used: <span class="font-mono">{spellSlot.used}</span>
					Total:
					<button
						on:click={() => {
							modify(spellSlots, (old) => {
								old[i].total -= 1;
							});
						}}>-</button
					>
					<span class="mx-0.5 font-mono">{spellSlot.total}</span>
					<button
						on:click={() => {
							modify(spellSlots, (old) => {
								old[i].total += 1;
							});
						}}>+</button
					>
				</div>
			{/each}
			<p class="self-center pt-2 font-semibold">Spell slots</p>
		</div>
	</div>
</div>
