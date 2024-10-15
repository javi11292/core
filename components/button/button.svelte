<script lang="ts">
	import type { ComponentProps } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { Icon } from "../icon";
	import { LoadingIcon } from "../loading-icon";

	type Props = {
		element?: string;
		disableBackground?: boolean;
		loading?: boolean;
		mirror?: boolean;
		icon?: ComponentProps<typeof Icon>["icon"];
		href?: string;
		text?: boolean;
	} & HTMLButtonAttributes;

	let {
		element = "button",
		type = "button",
		disableBackground,
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

<svelte:element this={href ? "a" : element} {title} {...elementProps} {...props} class="button">
	<div
		class="content"
		class:icon
		class:disabled
		class:loading
		class:text
		class:background={!disableBackground}
	>
		<div class="children" class:mirror>
			<span>
				{#if icon}
					<Icon {icon} />
				{:else if children}
					{@render children()}
				{/if}
			</span>
		</div>

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
