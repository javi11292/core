<script lang="ts">
	import type { Snippet } from "svelte";
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		HTMLTextareaAttributes,
	} from "svelte/elements";

	type Props = {
		regex?: RegExp;
		icon?: Snippet;
		label?: string;
		value?: string;
		disableShrink?: boolean;
		disableFocusLabel?: boolean;
		disabled?: boolean;
	};

	type InputProps = Props & { rows?: undefined } & HTMLInputAttributes;
	type TextareaProps = Props & { rows: number } & HTMLTextareaAttributes;

	let {
		value = $bindable(),
		regex,
		label,
		disableShrink,
		disableFocusLabel,
		disabled,
		icon,
		...props
	}: InputProps | TextareaProps = $props();

	const handleInput: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({
		currentTarget,
	}) => {
		if (!regex || regex.test(currentTarget.value)) {
			value = currentTarget.value;
		} else {
			currentTarget.value = value ?? "";
		}
	};
</script>

<div class:disabled class:focus-label={!disableFocusLabel} class="input">
	{#if label}
		<div class="label-space"></div>
	{/if}

	<div class:with-icon={icon} class="label-container">
		{#if label}
			<div class:disable-shrink={value || disableShrink} class="label">
				{label}
			</div>
		{/if}
	</div>

	{#if props.rows !== undefined}
		<textarea
			{...props}
			class:disabled
			class:with-icon={icon}
			oninput={handleInput}
			aria-label={label}
			{value}
			{disabled}
		></textarea>
	{:else}
		<input
			{...props}
			class:disabled
			class:with-icon={icon}
			oninput={handleInput}
			aria-label={label}
			{value}
			{disabled}
		/>
	{/if}

	{#if icon}
		<div class="icon">
			{@render icon()}
		</div>
	{/if}
</div>

<style lang="scss">
	@use "$lib/core/styles";

	input,
	textarea {
		all: unset;
		grid-column-start: 1;
		grid-row-start: 2;
		padding: 0.25rem 0;
		box-sizing: border-box;
		width: 100%;
		transition: all;
		transition-duration: 200ms;
	}

	.input {
		display: grid;
		border-bottom: 1px solid;
		transition: all 200ms;
		border-bottom: 1px solid currentColor;
		position: relative;

		&:focus-within {
			border-color: styles.$primaryColor;
		}
	}

	.icon {
		grid-column-start: 1;
		grid-row-start: 2;
		margin-left: auto;
		align-self: center;
	}

	.with-icon {
		padding-right: 1.5rem;
	}

	.label-space {
		height: 1rem;
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
				@extend .disable-shrink;
				color: styles.$primaryColor;
			}
		}
	}

	.label {
		position: absolute;
		top: 1rem;
		transform-origin: left;
		white-space: nowrap;
		transition: all;
		transition-duration: 200ms;
	}

	.disable-shrink {
		translate: 0 -100%;
		font-size: 0.75rem;
		line-height: 1rem;
	}

	.disabled {
		color: styles.$textColorDisabled;
	}
</style>
