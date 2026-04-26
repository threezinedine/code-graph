import "./App.scss";
import { TopBar } from "~/features/top-bar";
import clsx from "clsx";

function App(): JSX.Element {
	return (
		<div className={clsx("app-frame")}>
			<TopBar forwardClassName={clsx("top-bar")} />

			<div className="app-shell">
				<aside className="left-pane" aria-label="Navigation pane">
					<h2 className="pane-title">Left-side</h2>
				</aside>

				<main className="center-pane" aria-label="Editor pane">
					<h1 className="pane-title">Editor</h1>
				</main>

				<aside className="right-pane" aria-label="Right utilities pane">
					<h2 className="pane-title">Right Panel</h2>
				</aside>
			</div>
		</div>
	);
}

export default App;
