<script lang="ts">
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import Icon from "../icon/icon.svelte";
	import LoadingIcon from "../loading-icon/loading-icon.svelte";

	let {
		element = "button",
		children,
		onclick,
		disabled,
		mirror,
		icon,
		href,
		text,
		loading,
	}: {
		element?: string;
		children?: Snippet;
		disabled?: boolean;
		loading?: boolean;
		mirror?: boolean;
		icon?: string;
		onclick?: EventHandler;
		href?: string;
		text?: boolean;
	} = $props();

	let elementProps = $derived.by(() => {
		if (href) {
			return { href, disabled: disabled || loading };
		}

		if (element === "button") {
			return { onclick, disabled: disabled || loading };
		}

		return { role: "button", tabindex: 0, onclick };
	});
</script>

<svelte:element this={href ? "a" : element} {...elementProps} class="button">
	<div class:icon class:disabled class:loading class:text class="element">
		<div class="content" class:mirror>
			{#if icon}
				<Icon {icon} />
			{:else if children}
				{@render children()}
			{/if}
		</div>

		{#if loading}
			<div class="loading-icon">
				<LoadingIcon />
			</div>
		{/if}
	</div>
</svelte:element>

<style lang="scss">
	@use "$lib/core/styles";

	.button {
		border-radius: 100px;
		overflow: hidden;
		font-size: 0.75rem;
		font-weight: 700;
		display: block;
		text-align: center;
	}

	.element {
		@extend %scale;
		color: styles.$textColorInverse;
		background: styles.$primaryColor;
		padding: 0.65rem 1rem;
		text-transform: uppercase;
		border-radius: inherit;
		overflow: inherit;
	}

	.icon {
		border-radius: 50%;
		padding: 0.5rem;
		font-size: 1.5rem;
	}

	.loading-icon {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
	}

	.mirror {
		rotate: 180deg;
	}

	.text {
		background: none;
		color: styles.$textColor;
	}

	.disabled {
		pointer-events: none;
		background: styles.$primaryColorDisabled;
		color: styles.$textColorDisabled;
	}

	.loading {
		pointer-events: none;

		.content {
			opacity: 0;
		}
	}

	.content {
		transition: opacity 200ms;
	}
</style>