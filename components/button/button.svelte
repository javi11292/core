<script lang="ts">
	import type { ComponentProps } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { Icon } from "../icon";
	import { LoadingIcon } from "../loading-icon";

	type Props = {
		element?: string;
		disableScale?: boolean;
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
		disableScale,
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
		class="element"
		class:icon
		class:disabled
		class:loading
		class:text
		class:scale={!disableScale}
		class:background={disableScale && !disableBackground}
	>
		<div class="content" class:mirror>
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

<style module lang="scss">
	.button {
		border-radius: 10rem;
		font-size: 1.4rem;
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
		padding: 1em;
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
		padding: 0.25em;
		font-size: 2em;
	}

	.loadingIcon {
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

		span {
			vertical-align: middle;
		}
	}
</style>
