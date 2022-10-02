export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png","smui.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-4524812f.js","imports":["_app/immutable/start-4524812f.js","_app/immutable/chunks/index-02da1b48.js","_app/immutable/chunks/singletons-feafa537.js","_app/immutable/chunks/index-8e2f19e4.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
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
				endpoint: () => import('./entries/endpoints/notes/_server.js')
			},
			{
				id: "notes/[index=integer]",
				pattern: /^\/notes\/([^/]+?)\/?$/,
				names: ["index"],
				types: ["integer"],
				page: null,
				endpoint: () => import('./entries/endpoints/notes/_index_integer_/_server.js')
			}
		],
		matchers: async () => {
			const { match: integer } = await import('./entries/matchers/integer.js')
			return { integer };
		}
	}
};
