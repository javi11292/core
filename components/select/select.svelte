<script lang="ts">
	import { Icon } from "../icon";
	import { arrowDown } from "../icon/icons";
	import { Input } from "../input";
	import { Menu } from "../menu";
	import type { Option } from "./types";

	type Props = {
		options: Option[];
		label?: string;
		selected?: Option;
		name?: string;
	};

	let { options, label, name, selected = $bindable() }: Props = $props();

	const handleSelect = (option: Option) => () => {
		selected = option;
	};
</script>

<div class="select">
	{#if name}
		<input {name} hidden value={selected?.value} />
	{/if}

	<Menu
		disableHover
		elements={options.map((option) => ({ label: option.label, onclick: handleSelect(option) }))}
	>
		<Input readonly disableFocusLabel value={selected?.label || ""} {label}>
			{#snippet icon()}
				<Icon icon={arrowDown} />
			{/snippet}
		</Input>
	</Menu>
</div>

<style>
	@import "./select.scss";
</style>
