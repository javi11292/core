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

<div class:disabled class:focus-label={!disableFocusLabel} class="input">
	{#if label}
		<div class="label-space"></div>
	{/if}

	<div class:with-icon={icon} class="label-container">
		{#if label}
			<div class:shrink={value || disableGrow} class:disable-shrink={disableShrink} class="label">
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

<style lang="scss">
	@use "$lib/core/styles" as *;

	$labelHeight: 1.6rem;

	input,
	textarea {
		grid-column-start: 1;
		grid-row-start: 2;
		padding: 0.25rem 0;
		width: 100%;
		transition: all 200ms;
	}

	.input {
		display: grid;
		transition: all 200ms;
		border-bottom: 0.1rem solid currentColor;
		position: relative;

		&:focus-within {
			border-color: $primaryColor;
		}

		&:has(.error) {
			border-color: red;
		}
	}

	.icon {
		grid-column-start: 1;
		grid-row-start: 2;
		margin-left: auto;
		align-self: center;
	}

	.with-icon {
		padding-right: 2rem;
	}

	.label-space {
		height: $labelHeight;
		grid-column-start: 1;
		grid-row-start: 1;
	}

	.label-container {
		pointer-events: none;
		position: relative;
		grid-column-start: 1;
		grid-row-start: 1;
		grid-row-end: 3;
		overflow: hidden;
	}

	.focus-label {
		&:focus-within {
			.label {
				@extend .shrink;
				color: $primaryColor;
			}
		}
	}

	.label {
		position: absolute;
		top: $labelHeight;
		transform-origin: left;
		white-space: nowrap;
		will-change: translate, scale;
		transition: all 200ms;
		padding: 0.25rem 0;
		color: $textColorDisabled;
	}

	.shrink:not(.disable-shrink) {
		translate: 0 calc(-50% - calc($labelHeight / 2));
		scale: 0.75;
	}

	.disabled {
		color: $textColorDisabled;
	}

	.error {
		color: red;
		font-size: 1.2rem;
		position: absolute;
		right: 0;
		bottom: 0;
		translate: 0 100%;
	}
</style>
