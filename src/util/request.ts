import { invoke } from '@tauri-apps/api/tauri';
import { DATABASE_URL, NAMESPACE, PASSWORD, USERNAME } from '../stores/user';

let url, username, password, namespace;

DATABASE_URL.subscribe(value => (url = value));
USERNAME.subscribe(value => (username = value));
PASSWORD.subscribe(value => (password = value));
NAMESPACE.subscribe(value => (namespace = value));

export async function query(query: string) {
	console.log(url, username, password, namespace);

	const response: string = await invoke('query', {
		url,
		username,
		password,
		namespace,
		query
	});

	let data = JSON.parse(response);

	return data;
}
