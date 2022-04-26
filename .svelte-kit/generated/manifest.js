const c = [
	() => import("../runtime/components/layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/gameover.svelte"),
	() => import("../../src/routes/question.svelte"),
	() => import("../../src/routes/loading.svelte"),
	() => import("../../src/routes/score.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/gameover.svelte
	[/^\/gameover\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/question.svelte
	[/^\/question\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/loading.svelte
	[/^\/loading\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/score.svelte
	[/^\/score\/?$/, [c[0], c[6]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];