import './app.css';
import App from './App.svelte';
import { SurrealUi } from './util/surrealNamespace';

window.SurrealUi = window.SurrealUi || SurrealUi;

const app = new App({
	target: document.getElementById('app')
});

export default app;
