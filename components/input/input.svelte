<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";
	import { fade } from "svelte/transition";

	type Props = {
		icon?: Snippet;
		label?: string;
		value?: string;
		disableShrink?: boolean;
		disableGrow?: boolean;
		disableFocusLabel?: boolean;
		disabled?: boolean;
		error?: string;
	};

	type InputProps = Omit<HTMLInputAttributes, "value"> & Props & { rows?: undefined };
	type TextareaProps = Omit<HTMLTextareaAttributes, "value"> & Props & { rows: number };

	let {
		value = $bindable(),
		label,
		disableShrink,
		disableGrow,
		disableFocusLabel,
		disabled,
		icon,
		error,
		...props
	}: InputProps | TextareaProps = $props();
</script>

<div class="input" class:disabled class:focusLabel={!disableFocusLabel}>
	{#if label}
		<div class="labelSpace"></div>
	{/if}

	<div class="labelContainer" class:withIcon={icon}>
		{#if label}
			<div class="label" class:shrink={(value || disableGrow) && !disableShrink}>
				{label}
			</div>
		{/if}
	</div>

	{#if props.rows !== undefined}
		<textarea {...props} class:disabled aria-label={label} bind:value {disabled}></textarea>
	{:else}
		<input {...props} class:disabled aria-label={label} bind:value {disabled} />
	{/if}

	{#if icon}
		<div class="icon">
			{@render icon()}
		</div>
	{/if}

	{#if error}
		<span in:fade={{ duration: 200 }} class="error">
			{error}
		</span>
	{/if}
</div>

<style>
	@import "./input.scss";
</style>
