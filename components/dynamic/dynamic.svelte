<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Component } from "svelte";

	let {
		component,
		...props
	}: T & {
		component: () => Promise<{ default: Component<T> }>;
	} = $props();

	let DynamicComponent = $state<Component<T>>();

	$effect(() => {
		component().then((value) => (DynamicComponent = value.default));
	});
</script>

{#if DynamicComponent}
	<DynamicComponent {...props as unknown as T} />
{/if}
