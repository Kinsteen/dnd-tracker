import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';

export class LocalStorage {
	/**
	 * @param {string} key
	 * @param {any} def
	 */
	createWritable(key, def) {
		const w = writable(this.read(key) || def);

		w.subscribe((value) => {
			this.write(key, value);
		});
		return w;
	}

	/**
	 * @param {string} key
	 * @param {string | null} sortKey
	 */
	createArrayWritable(key, clear = false, sortKey = null) {
		let temp = [];
		if (browser) {
			for (let i = 0; i < localStorage.length; i++) {
				let obj = localStorage.key(i);
				if (obj?.startsWith(key)) {
					// @ts-ignore Key always exists
					temp.push(JSON.parse(localStorage.getItem(obj)));
				}
			}
		}

		if (sortKey != null && temp.length > 1 && sortKey in temp[0]) {
			if (typeof temp[0][sortKey] === 'string') {
				temp.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
			} else if (typeof temp[0][sortKey] === 'number') {
				temp.sort((a, b) => a[sortKey] - b[sortKey]);
			}
		}

		const w = writable(temp);

		w.subscribe((values) => {
			if (browser && clear) {
				let toDelete = [];
				for (let i = 0; i < localStorage.length; i++) {
					let obj = localStorage.key(i);
					if (obj?.startsWith(key)) {
						toDelete.push(obj);
					}
				}

				toDelete.forEach((obj) => localStorage.removeItem(obj));
			}

			values.forEach((value, index) => {
				this.write(key + '-' + index, value);
			});
		});

		return w;
	}

	/**
	 * @param {import("svelte/store").Readable<any>} w
	 * @param {any} data
	 */
	pushArrayWritable(w, data) {
		const arr = get(w);
		arr.push(data);
	}

	/**
	 * @param {string} key
	 * @param {any} data
	 */
	write(key, data) {
		if (browser) {
			if (typeof data === 'object') localStorage.setItem(key, JSON.stringify(data));
			else localStorage.setItem(key, data);
		}
	}

	/**
	 * @param {string} key
	 */
	read(key) {
		if (browser) {
			return localStorage.getItem(key);
		} else {
			return null;
		}
	}
}
