<script lang="ts">
	import { Icon, icons } from "../icon";
	import { Input } from "../input";
	import { Menu } from "../menu";
	import type { Option } from "./types";

	type Props = {
		options: Option[];
		label?: string;
		selected?: Option;
	};

	let { options, label, selected = $bindable() }: Props = $props();

	const handleSelect = (option: Option) => () => {
		selected = option;
	};
</script>

<div class="select">
	<Menu
		disableScale
		disableBackground
		elements={options.map((option) => ({ label: option.label, onclick: handleSelect(option) }))}
	>
		<Input readonly disableFocusLabel value={selected?.label || ""} {label}>
			{#snippet icon()}
				<Icon icon={icons.arrowDown} />
			{/snippet}
		</Input>
	</Menu>
</div>

<style>
	@import "./select.scss";
</style>
