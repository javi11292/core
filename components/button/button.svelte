<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Icon from "../icon/icon.svelte";
	import LoadingIcon from "../loading-icon/loading-icon.svelte";

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
			return { onclick, disabled: disabled || loading };
		}

		return { role: "button", tabindex: 0, onclick };
	});
</script>

<svelte:element this={href ? "a" : element} {title} {...elementProps} {...props} class="button">
	<div
		class:icon
		class:disabled
		class:loading
		class:text
		class:scale={!disableScale}
		class:background={disableScale}
		class="element"
	>
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
	@use "$lib/core/styles" as *;

	.button {
		border-radius: 10rem;
		overflow: hidden;
		font-size: 1.2rem;
		line-height: 1;
		font-weight: 700;
		display: block;
		text-align: center;
		text-transform: uppercase;
		text-wrap: nowrap;
	}

	.scale {
		@extend %scale;
	}

	.background {
		@extend %background;
	}

	.element {
		color: $textColorInverse;
		background: $primaryColor;
		padding: 1rem 1.6rem;
		border-radius: inherit;
		overflow: inherit;
	}

	.icon {
		border-radius: 50%;
		padding: 0.8rem;
		font-size: 2.4rem;
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
		color: $textColor;
	}

	.disabled {
		pointer-events: none;
		background: $primaryColorDisabled;
		color: $textColorDisabled;
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
