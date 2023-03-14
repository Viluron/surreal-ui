declare global {
	interface Window {
		SurrealUi: SurrealUi;
	}
}

interface SurrealUi {
	logs: Array<Record<string, any>>;

	log(message: string, ...optionalParams: any[]);
}

export const SurrealUi: SurrealUi = {
	logs: [],

	log(message: string, ...optionalParams: any[]) {
		if (import.meta.env.VITE_ENV === 'development') {
			SurrealUi.logs.push({ message, data: optionalParams });
			console.log(message, ...optionalParams);
		}
	}
};
