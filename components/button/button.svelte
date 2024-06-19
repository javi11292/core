<script lang="ts">
	import { classes } from "$lib/core/utils";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { Icon } from "../icon";
	import { LoadingIcon } from "../loading-icon";
	import styles from "./button.module.scss";

	type Props = {
		element?: string;
		disableScale?: boolean;
		loading?: boolean;
		mirror?: boolean;
		icon?: string;
		href?: string;
		text?: boolean;
	} & HTMLButtonAttributes;

	let {
		element = "button",
		type = "button",
		disableScale,
		children,
		onclick,
		disabled,
		mirror,
		icon,
		href,
		text,
		loading,
		title,
		class: className,
		...props
	}: Props = $props();

	let elementProps = $derived.by(() => {
		if (href) {
			return { href, disabled: disabled || loading };
		}

		if (element === "button") {
			return { onclick, disabled: disabled || loading, type };
		}

		return { role: "button", tabindex: 0, onclick };
	});
</script>

<svelte:element
	this={href ? "a" : element}
	{title}
	{...elementProps}
	{...props}
	class="button {classes(styles.button, className)}"
>
	<div
		class="element {classes(
			styles.element,
			icon && styles.icon,
			disabled && styles.disabled,
			loading && styles.loading,
			text && styles.text,
			mirror && styles.mirror,
			!disableScale && styles.scale,
			disableScale && styles.background,
		)}"
	>
		<span class="content {styles.content}">
			{#if icon}
				<Icon {icon} />
			{:else if children}
				{@render children()}
			{/if}
		</span>

		{#if loading}
			<div class={styles.loadingIcon}>
				<LoadingIcon />
			</div>
		{/if}
	</div>
</svelte:element>
