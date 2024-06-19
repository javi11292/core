<script lang="ts">
	import { classes } from "$lib/core/utils";
	import styles from "./icon.module.scss";

	type Props = { icon: string; class?: string };

	let { icon, class: className }: Props = $props();
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class="icon {classes(styles.icon, className)}">
	<use href={`${icon}#icon`} />
</svg>
