import { hydrate, type ComponentType } from "svelte";

class SvelteIsland extends HTMLElement {
	constructor() {
		super();
	}

	async connectedCallback() {
		const { default: Component }: { default: ComponentType } = await import(
			this.getAttribute("href")!
		);

		hydrate(Component, { target: this, props: JSON.parse(this.getAttribute("props")!) });
	}
}

customElements.define("svelte-island", SvelteIsland);
