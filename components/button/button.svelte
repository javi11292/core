<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { Icon } from "../icon";
	import { LoadingIcon } from "../loading-icon";

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

<svelte:element this={href ? "a" : element} {title} {...elementProps} {...props} class="button">
	<div
		class="element"
		class:icon
		class:disabled
		class:loading
		class:text
		class:mirror
		class:scale={!disableScale}
		class:background={disableScale}
	>
		<span class="content">
			{#if icon}
				<Icon {icon} />
			{:else if children}
				{@render children()}
			{/if}
		</span>

		{#if loading}
			<div class="loadingIcon">
				<LoadingIcon />
			</div>
		{/if}
	</div>
</svelte:element>

<style>
	@import "./button.scss";
</style>
