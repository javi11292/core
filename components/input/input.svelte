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
		disableGrow?: boolean;
		disableFocusLabel?: boolean;
		disabled?: boolean;
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
			<div class:shrink={value || disableGrow} class:disable-shrink={disableShrink} class="label">
				{label}
			</div>
		{/if}
	</div>

	{#if props.rows !== undefined}
		<textarea {...props} class:disabled oninput={handleInput} aria-label={label} {value} {disabled}
		></textarea>
	{:else}
		<input {...props} class:disabled oninput={handleInput} aria-label={label} {value} {disabled} />
	{/if}

	{#if icon}
		<div class="icon">
			{@render icon()}
		</div>
	{/if}
</div>

<style lang="scss">
	@use "$lib/core/styles" as *;

	input,
	textarea {
		grid-column-start: 1;
		grid-row-start: 2;
		padding: 0.25rem 0;
		width: 100%;
		transition: all;
		transition-duration: 200ms;
	}

	.input {
		display: grid;
		transition: all 200ms;
		border-bottom: 0.1rem solid currentColor;
		position: relative;

		&:focus-within {
			border-color: $primaryColor;
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
		height: 1.6rem;
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
		top: 1.6rem;
		transform-origin: left;
		white-space: nowrap;
		will-change: translate, scale;
		transition: all 200ms;
		padding: 0.25rem 0;
		color: $textColorDisabled;
	}

	.shrink:not(.disable-shrink) {
		translate: 0 calc(-50% - 0.8rem);
		scale: 0.75;
	}

	.disabled {
		color: $textColorDisabled;
	}
</style>
