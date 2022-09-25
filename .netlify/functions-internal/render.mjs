import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	assets: new Set(["favicon.png","smui.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-e95e3cc6.js","imports":["_app/immutable/start-e95e3cc6.js","_app/immutable/chunks/index-02da1b48.js","_app/immutable/chunks/singletons-0a357124.js","_app/immutable/chunks/index-8e2f19e4.js"],"stylesheets":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js')
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "notes",
				pattern: /^\/notes\/?$/,
				names: [],
				types: [],
				page: null,
				endpoint: () => import('../server/entries/endpoints/notes/_server.js')
			},
			{
				id: "notes/[index=integer]",
				pattern: /^\/notes\/([^/]+?)\/?$/,
				names: ["index"],
				types: ["integer"],
				page: null,
				endpoint: () => import('../server/entries/endpoints/notes/_index_integer_/_server.js')
			}
		],
		matchers: async () => {
			const { match: integer } = await import('../server/entries/matchers/integer.js')
			return { integer };
		}
	}
});
