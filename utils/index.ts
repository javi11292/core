export * from "./fetch";
export * from "./transition";

export const classes = (...names: (string | undefined | null | false)[]) => {
	let className = "";

	for (const name of names) {
		if (!name) continue;

		if (!className) {
			className = name;
			continue;
		}

		className = `${className} ${name}`;
	}

	return className;
};
