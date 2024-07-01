<script lang="ts">
	type Props = {
		label: string;
		name?: string;
		value?: boolean;
	};

	let { label, name, value = $bindable() }: Props = $props();
</script>

<span>
	<input type="checkbox" bind:checked={value} {name} />
	{label}
</span>

<style>
	@import "./checkbox.scss";
</style>
