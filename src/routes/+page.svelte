<script>
	import '../app.css';
	import PrimaryStat from '../components/PrimaryStat.svelte';
	import Skill from '../components/Skill.svelte';
	import Checkbox from '../components/Checkbox.svelte';
	import {
		constitution,
		dexterity,
		strength,
		intelligence,
		wisdom,
		charisma,
		level,
		customCounters,
		spellSlots,
		modify,
		skills
	} from '../global';
</script>

<div class="container mx-auto max-w-[48em] flex flex-col">
	<a href="/">Home</a>
	<a href="/edit">Edit</a>
	<div class="flex w-auto items-center justify-around mt-4">
		<p class="font-semibold text-5xl p-6 border-2 rounded-lg border-slate-500">Emily Solis</p>
		<div class="grid grid-cols-2 grid-rows-2 gap-2 border-2 rounded-lg border-slate-500">
			<div class="p-2">Light Cleric</div>
			<div class="p-2">Samaël</div>
			<div class="p-2">GodWalker Râ</div>
			<div class="p-2 flex gap-1">
				<p>300</p>
				<p>900</p>
			</div>
		</div>
		<p>Level: {$level}</p>
	</div>
	<div class="flex">
		<div class="flex flex-col w-28 gap-2 m-2">
			<PrimaryStat stat_name="Strength" stat_value={$strength} />
			<PrimaryStat stat_name="Dexterity" stat_value={$dexterity} />
			<PrimaryStat stat_name="Constitution" stat_value={$constitution} />
			<PrimaryStat stat_name="Intelligence" stat_value={$intelligence} />
			<PrimaryStat stat_name="Wisdom" stat_value={$wisdom} />
			<PrimaryStat stat_name="Charisma" stat_value={$charisma} />
		</div>
		<div class="flex flex-col gap-2 m-2">
			<div class="flex gap-2 p-2 border-2 rounded-lg border-slate-500 text-sm">
				<p>0</p>
				Inspiration
			</div>
			<div class="flex gap-2 p-2 border-2 rounded-lg border-slate-500 text-sm">
				<p>+2</p>
				Proficiency bonus
			</div>
			<div class="flex flex-col gap-0 p-2 border-2 rounded-lg border-slate-500 text-sm">
				<span>+1 Strength</span>
				<span>+1 Dexterity</span>
				<span>+1 Constitution</span>
				<span>+1 Intelligence</span>
				<span>+1 Wisdom</span>
				<span>+1 Charisma</span>
				<p class="self-center pt-2 font-semibold">Saving throws</p>
			</div>
			<div class="flex flex-col gap-0 p-2 border-2 rounded-lg border-slate-500 text-sm">
				{#each $skills as skill}
					<Skill
						skill_name={skill.name}
						raw_stat={skill.rawStat}
						proficient={skill.proficient}
						callback={() => {
							skill.proficient = !skill.proficient;
						}}
					/>
				{/each}
				<p class="self-center pt-2 font-semibold">Skills</p>
			</div>
		</div>
		<div class="flex flex-col w-auto gap-2 m-2">
			<div class="flex flex-col gap-0 p-2 px-5 border-2 rounded-lg border-slate-500 text-sm">
				<ul class="font-mono">
					{#each $spellSlots as spellSlot}
						{#if spellSlot.total > 0}
							<li class="flex gap-1">
								Level {spellSlot.level + 1}:
								{#each { length: spellSlot.total } as _, i}
									<Checkbox
										checked={spellSlot.used > i}
										className={i == 0 && 'ml-1'}
										disabled={i != spellSlot.used && i != spellSlot.used - 1}
										callback={(checked) => {
											spellSlot.used += checked ? 1 : -1;
										}}
									/>
								{/each}
							</li>
						{/if}
					{/each}
				</ul>
				<p class="self-center pt-2 font-semibold">Spell slot counter</p>
			</div>
			{#each $customCounters as counter}
				<div class="flex flex-col gap-1 p-2 px-5 border-2 rounded-lg border-slate-500 text-sm">
					<div class="flex gap-1">
						{#each { length: counter.total } as _, i}
							<Checkbox
								checked={counter.used > i}
								disabled={i != counter.used && i != counter.used - 1}
								callback={(checked) => {
									counter.used += checked ? 1 : -1;
								}}
							/>
						{/each}
					</div>
					<p class="self-center pt-2 font-semibold">{counter.name}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
