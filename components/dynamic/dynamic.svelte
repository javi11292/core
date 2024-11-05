<script lang="ts">
	import type { Component, ComponentProps } from "svelte";

	let {
		component,
		...props
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}: ComponentProps<any> & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component: () => Promise<{ default: Component<any> }>;
	} = $props();

	let DynamicComponent = $state<Component>();

	$effect(() => {
		component().then((value) => (DynamicComponent = value.default));
	});
</script>

{#if DynamicComponent}
	<DynamicComponent {...props} />
{/if}
