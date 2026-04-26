import "./App.scss";
import { TopBar } from "~/features/top-bar";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

function App(): JSX.Element {
	const [isMaximized, setIsMaximized] = useState(false);

	useEffect(() => {
		if (!window.electronAPI) {
			return;
		}

		window.electronAPI
			.getWindowState()
			.then((state) => {
				setIsMaximized(state.isMaximized);
			})
			.catch(() => {
				setIsMaximized(false);
			});

		const unsubscribe = window.electronAPI.onWindowMaximizedChanged(
			(nextIsMaximized) => {
				setIsMaximized(nextIsMaximized);
			},
		);

		return () => {
			unsubscribe();
		};
	}, []);

	const handleMinimize = useCallback(() => {
		void window.electronAPI?.minimizeWindow();
	}, []);

	const handleMaximize = useCallback(() => {
		void window.electronAPI?.maximizeWindow();
	}, []);

	const handleResize = useCallback(() => {
		void window.electronAPI?.resizeWindow();
	}, []);

	const handleClose = useCallback(() => {
		void window.electronAPI?.closeWindow();
	}, []);

	return (
		<div className={clsx("app-frame")}>
			<TopBar
				forwardClassName={clsx("top-bar")}
				isMaximized={isMaximized}
				onMinimize={handleMinimize}
				onMaximize={handleMaximize}
				onResize={handleResize}
				onClose={handleClose}
			/>

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
