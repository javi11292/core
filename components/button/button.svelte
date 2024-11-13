<script lang="ts">
	import type { ComponentProps } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { Icon } from "../icon";
	import { LoadingIcon } from "../loading-icon";

	type Props = {
		element?: string;
		disableHover?: boolean;
		loading?: boolean;
		mirror?: boolean;
		icon?: ComponentProps<typeof Icon>["icon"];
		href?: string;
		text?: boolean;
	} & HTMLButtonAttributes;

	let {
		element = "button",
		type = "button",
		disableHover,
		children,
		disabled,
		mirror,
		icon,
		href,
		text,
		loading,
		title,
		...props
	}: Props = $props();

	let elementProps = $derived.by(() => {
		if (href) {
			return { disabled: disabled || loading, href };
		}

		if (element === "button") {
			return { disabled: disabled || loading, type };
		}

		return { role: "button", tabindex: 0 };
	});
</script>

<svelte:element
	this={href ? "a" : element}
	class="button"
	class:disabled
	class:loading
	class:text
	class:hover={!disableHover}
	class:icon={icon && !children}
	{title}
	{...elementProps}
	{...props}
>
	<div class="children">
		{#if icon}
			<Icon {icon} {mirror} />
		{/if}

		{@render children?.()}
	</div>

	{#if loading}
		<div class="loadingIcon">
			<LoadingIcon />
		</div>
	{/if}
</svelte:element>

<style>
	@import "./button.scss";
</style>
