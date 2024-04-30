<script lang="ts">
	import type { ComponentType } from "svelte";

	let {
		this: component,
		href,
		...props
	}: { this: ComponentType; href: string } & Record<string, unknown> = $props();
</script>

<svelte-island {href} props={JSON.stringify(props)}>
	<svelte:component this={component} {...props} />
</svelte-island>
