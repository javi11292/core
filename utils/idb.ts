import { browser } from "$app/environment";

let db: IDBDatabase;

export const getTransaction = (store: string) =>
	db.transaction(store, "readwrite").objectStore(store);

export const createStore = (stores: string[]) => {
	if (!browser) {
		return;
	}

	const request = indexedDB.open("database");

	request.onupgradeneeded = () => {
		stores.forEach((store) => {
			request.result.createObjectStore(store, { keyPath: "id" });
		});
	};

	request.onsuccess = () => {
		db = request.result;
	};
};
