<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import "./setup.scss";

	onNavigate(({ from, to, complete }) => {
		if (!document.startViewTransition) return;

		if (from?.url.href === to?.url.href) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await complete;
			});
		});
	});
</script>
