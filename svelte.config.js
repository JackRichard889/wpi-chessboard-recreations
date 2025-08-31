import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isDevelopment = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		appDir: 'app',
		adapter: adapter({
			fallback: 'index.html',
			pages: 'build/'
		}),
		paths: {
			base: isDevelopment ? '' : process.env.BASE_PATH,
		}
	}
};

export default config;
