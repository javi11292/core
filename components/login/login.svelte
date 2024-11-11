<script lang="ts">
	import { page } from "$app/stores";
	import { PUBLIC_GOOGLE_CLIENT_ID } from "$env/static/public";
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id={PUBLIC_GOOGLE_CLIENT_ID}
	data-login_uri="{$page.url.origin}/login"
	data-auto_select="true"
></div>

<div class="g_id_signin"></div>

<style>
	@import "./login.scss";
</style>
