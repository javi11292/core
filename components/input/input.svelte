<script lang="ts">
	import { classes } from "$lib/core/utils";
	import type { Snippet } from "svelte";
	import type {
		FormEventHandler,
		HTMLInputAttributes,
		HTMLTextareaAttributes,
	} from "svelte/elements";
	import { fade } from "svelte/transition";
	import styles from "./input.module.scss";

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
		class: className,
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

<div
	class="input {classes(
		styles.input,
		className,
		disabled && styles.disabled,
		!disableFocusLabel && styles.focusLabel,
	)}"
>
	{#if label}
		<div class="labelSpace {styles.labelSpace}"></div>
	{/if}

	<div class:with-icon={icon} class={classes(styles.labelContainer, icon && styles.withIcon)}>
		{#if label}
			<div
				class="label {classes(
					styles.label,
					(value || disableGrow) && `shrink ${styles.shrink}`,
					disableShrink && styles.disableShrink,
				)}"
			>
				{label}
			</div>
		{/if}
	</div>

	{#if props.rows !== undefined}
		<textarea
			{...props}
			class={classes(disabled && styles.disabled)}
			oninput={handleInput}
			aria-label={label}
			value={value ?? ""}
			{disabled}
		></textarea>
	{:else}
		<input
			{...props}
			class={classes(disabled && styles.disabled)}
			oninput={handleInput}
			aria-label={label}
			value={value ?? ""}
			{disabled}
		/>
	{/if}

	{#if icon}
		<div class={styles.icon}>
			{@render icon()}
		</div>
	{/if}

	{#if error}
		<span in:fade={{ duration: 200 }} class="error {styles.error}">
			{error}
		</span>
	{/if}
</div>
