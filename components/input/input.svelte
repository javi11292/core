<script lang="ts">
	import type { Snippet } from "svelte";
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		HTMLTextareaAttributes,
	} from "svelte/elements";
	import { fade } from "svelte/transition";

	type Props = {
		regex?: RegExp;
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
		regex,
		label,
		disableShrink,
		disableGrow,
		disableFocusLabel,
		disabled,
		icon,
		error,
		...props
	}: InputProps | TextareaProps = $props();

	const handleInput: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
		const { currentTarget } = event;

		if (!regex || regex.test(currentTarget.value)) {
			value = currentTarget.value;
		} else {
			currentTarget.value = value ?? "";
		}

		(props.oninput as FormEventHandler<HTMLInputElement | HTMLTextAreaElement>)?.(event);
	};
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
		<textarea
			{...props}
			class:disabled
			oninput={handleInput}
			aria-label={label}
			value={value ?? ""}
			{disabled}
		></textarea>
	{:else}
		<input
			{...props}
			class:disabled
			oninput={handleInput}
			aria-label={label}
			value={value ?? ""}
			{disabled}
		/>
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
