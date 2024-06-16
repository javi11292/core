<script lang="ts">
	let { open }: { open: boolean } = $props();
</script>

<section class:open>HOLA CARACOLA</section>

<style lang="scss">
	section {
		background: white;
		position: fixed;
		left: 0;
		height: 100%;
		transition: translate 200ms;

		&:not(.open) {
			translate: -100%;
		}
	}
</style>
