import "./App.scss";

function App(): JSX.Element {
	return (
		<div className="app-shell min-h-screen bg-slate-950 text-slate-100">
			<div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
				<section className="app-card w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur">
					<p className="app-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
						Electron renderer
					</p>
					<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
						Electron + React + TypeScript
					</h1>
					<p className="mt-4 max-w-2xl text-lg text-slate-300">
						Tailwind CSS is active for utility styling, and SCSS is
						active for component-level styling.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
							Tailwind v4
						</span>
						<span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
							SCSS enabled
						</span>
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
