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
		class:icon
		class:disabled
		class:loading
		class:text
		class:scale={!disableScale}
		class:background={disableScale}
		class="element"
	>
		<span class="content" class:mirror>
			{#if icon}
				<Icon {icon} />
			{:else if children}
				{@render children()}
			{/if}
		</span>

		{#if loading}
			<div class="loading-icon">
				<LoadingIcon />
			</div>
		{/if}
	</div>
</svelte:element>

<style lang="scss">
	.button {
		border-radius: 10rem;
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
		padding: 1rem 1.6rem;
		border-radius: inherit;
		overflow: hidden;
	}

	.element:not(:where(.text)) {
		box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.4);
		background: $primaryColor;
		color: $textColorInverse;
	}

	.icon {
		border-radius: 50%;
		padding: 0.8rem;
		font-size: 2em;
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
		vertical-align: middle;
	}
</style>
