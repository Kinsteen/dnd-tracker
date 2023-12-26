<script>
	import '../../app.css';
	import {
		customCounters,
		modify,
		spellSlots,
		hitPoints,
		maxHitPoints,
		abilities,
		proficiencyBonus
	} from '../../global';
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
							counter.name = e.target.innerText.replace(/\n$/, '');
						}}
					>
						{counter.name}
					</div>
					<span class="font-semibold">total:</span>
					<button
						class="border-[1px] border-slate-800 rounded-full w-4 h-4 leading-[0]"
						on:click={() => {
							counter.total--;
						}}>-</button
					>
					<span class="font-mono">{counter.total}</span>
					<button
						class="border-[1px] border-slate-800 rounded-full w-4 h-4 leading-[0]"
						on:click={() => {
							counter.total++;
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
							spellSlot.total--;
						}}>-</button
					>
					<span class="mx-0.5 font-mono">{spellSlot.total}</span>
					<button
						on:click={() => {
							spellSlot.total++;
						}}>+</button
					>
				</div>
			{/each}
			<p class="self-center pt-2 font-semibold">Spell slots</p>
		</div>

		<div class="flex flex-col gap-2 p-2 border-2 rounded-lg border-slate-500">
			<div class="grid grid-cols-2 max-w-64">
				{#each $abilities as ability}
					<p>{ability.name}</p>
					<div class="flex gap-1">
						<button
							on:click={() => {
								ability.value--;
							}}>-</button
						>
						<p class="font-mono">{ability.value.toString().padStart(2, '0')}</p>
						<button
							on:click={() => {
								ability.value++;
							}}>+</button
						>
					</div>
				{/each}
			</div>
			<p class="self-center pt-2 font-semibold">Stats</p>
		</div>
		<div class="flex flex-col gap-2 p-2 border-2 rounded-lg border-slate-500">
			<div class="flex self-center gap-2">
				<button
					on:click={() => {
						$maxHitPoints--;
					}}>-</button
				>
				<span class="mx-0.5 font-mono"
					>{$hitPoints.toString().padStart(2, '0')}/{$maxHitPoints
						.toString()
						.padStart(2, '0')}</span
				>
				<button
					on:click={() => {
						$maxHitPoints++;
					}}>+</button
				>
			</div>
			<p class="self-center pt-2 font-semibold">Max hit points</p>
		</div>
		<div class="flex flex-col gap-2 p-2 border-2 rounded-lg border-slate-500">
			<div class="flex self-center gap-2">
				<button
					on:click={() => {
						$proficiencyBonus--;
					}}>-</button
				>
				<span class="mx-0.5 font-mono">{$proficiencyBonus}</span>
				<button
					on:click={() => {
						$proficiencyBonus++;
					}}>+</button
				>
			</div>
			<p class="self-center pt-2 font-semibold">Proficiency bonus</p>
		</div>
	</div>
</div>
