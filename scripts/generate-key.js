import { generateKey } from "node:crypto";

generateKey("hmac", { length: 512 }, (_, key) => {
	console.log(key.export().toString("hex"));
});
