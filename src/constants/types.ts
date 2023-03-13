export interface IQueryError {
	code: number;
	details: string;
	description: string;
	information: string;
}

export interface IQueryResponse {
	time: string;
	status: string;
	result: any;
}

export interface IInfoKV extends Omit<IQueryResponse, 'result'> {
	result: {
		ns: {
			[key: string]: string;
		};
	};
}

export interface IInfoNS extends Omit<IQueryResponse, 'result'> {
	result: {
		db: {
			[key: string]: string;
		};
		nl: {};
		nt: {};
	};
}

export interface IInfoDB extends Omit<IQueryResponse, 'result'> {
	result: {
		dl: {};
		dt: {};
		sc: {};
		tb: {
			[key: string]: string;
		};
	};
}

export type Tab = 'home' | 'query' | 'tables';
