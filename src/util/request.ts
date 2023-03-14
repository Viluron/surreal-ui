import { invoke } from '@tauri-apps/api/tauri';
import { DATABASE } from 'src/stores/database';
import type { IInfoDB, IInfoKV, IInfoNS, IQueryError, IQueryResponse } from '../constants/types';
import { DATABASE_URL, NAMESPACE, PASSWORD, USERNAME } from '../stores/user';

let url, username, password, namespace, database;

DATABASE_URL.subscribe(value => (url = value));
USERNAME.subscribe(value => (username = value));
PASSWORD.subscribe(value => (password = value));
NAMESPACE.subscribe(value => (namespace = value));
DATABASE.subscribe(value => (database = value));

type Response = IInfoNS | IInfoDB | IInfoKV | IQueryResponse | IQueryError;
type Data = { [key: string]: Response } | IQueryError;

export async function query(query: string): Promise<any> {
	const response: string = await invoke('query', {
		url,
		username,
		password,
		namespace,
		query
	});

	let { data } = JSON.parse(response);

	window.SurrealUi.log(`REQ: "${query}"`, { req: { url, username, password, namespace }, res: JSON.parse(response) });

	return transformData(data);
}

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
export async function httpRequest(method: Method, table: string, data?: any): Promise<any> {
	return JSON.parse(
		await invoke('http', {
			url,
			username,
			password,
			namespace,
			query: table,
			method,
			database,
			data: JSON.stringify(data) || ''
		})
	);
}

function transformData(data: Array<IInfoDB | IInfoNS | IInfoKV | IQueryResponse> | IQueryError): Data {
	if (!Array.isArray(data)) return data;

	const out = {};

	data.forEach(res => {
		const result = res.result;

		if (!result) return;

		const key = Object.keys(result).filter(key => ['db', 'ns', 'tb'].includes(key))[0];

		if (!key) return;

		out[key] = result[key];
	});

	return out;
}
