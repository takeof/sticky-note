export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png","smui.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-cbf3848e.js","imports":["_app/immutable/start-cbf3848e.js","_app/immutable/chunks/index-79404d3a.js","_app/immutable/chunks/singletons-e305392e.js","_app/immutable/chunks/index-e9bace29.js"],"stylesheets":[]},
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
