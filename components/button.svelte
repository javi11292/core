<script lang="ts">
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import Icon from "./icon.svelte";
	import LoadingIcon from "./loading-icon.svelte";

	let {
		element = "button",
		children,
		onclick,
		disabled,
		icon,
		href,
		text,
		loading,
	}: {
		element?: string;
		children?: Snippet;
		disabled?: boolean;
		loading?: boolean;
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

<svelte:element this={href ? "a" : element} {...elementProps}>
	<div class:icon class:disabled class:loading class:text class="button">
		<div class="content">
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
	@use "../styles/hover";
	@use "../styles/theme";

	.button {
		@extend %scale;
		color: theme.$textColorInverse;
		background: theme.$primaryColor;
		padding: 0.65rem 1rem;
		border-radius: 100px;
		overflow: hidden;
		text-transform: uppercase;
		font-size: 0.75rem;
		font-weight: bold;
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

	.text {
		background: none;
		color: theme.$textColor;
	}

	.disabled {
		pointer-events: none;
		background: theme.$primaryColorDisabled;
		color: theme.$textColorDisabled;
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
