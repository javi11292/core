<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";
	import { fade } from "svelte/transition";

	type Props = {
		icon?: Snippet;
		label?: string;
		value?: string;
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
		disableGrow,
		disableFocusLabel,
		disabled,
		autofocus,
		icon,
		error,
		...props
	}: InputProps | TextareaProps = $props();

	let input = $state<HTMLElement>();

	$effect(() => {
		if (autofocus && input) {
			input.focus();
		}
	});
</script>

<div class="input" class:disabled class:focusLabel={!disableFocusLabel}>
	{#if label}
		<div class="labelSpace"></div>
	{/if}

	<div class="labelContainer" class:withIcon={icon}>
		{#if label}
			<div class="label" class:shrink={value || disableGrow}>
				{label}
			</div>
		{/if}
	</div>

	{#if props.rows !== undefined}
		<textarea {...props} class:disabled aria-label={label} bind:this={input} bind:value {disabled}>
		</textarea>
	{:else}
		<input {...props} class:disabled aria-label={label} bind:this={input} bind:value {disabled} />
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
