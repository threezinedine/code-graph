import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TopBar } from "./TopBar";

const TEST_ID = "top-bar";

describe("TopBar", () => {
	it("calls onMinimize when minimize button is clicked", async () => {
		const onMinimize = vi.fn();
		const user = userEvent.setup();

		render(<TopBar testId={TEST_ID} onMinimize={onMinimize} />);

		await user.click(screen.getByTestId(`${TEST_ID}-minimize`));

		expect(onMinimize).toHaveBeenCalledTimes(1);
	});

	it("calls onMaximize when not maximized and the maximize button is clicked", async () => {
		const onMaximize = vi.fn();
		const onResize = vi.fn();
		const user = userEvent.setup();

		render(
			<TopBar
				testId={TEST_ID}
				isMaximized={false}
				onMaximize={onMaximize}
				onResize={onResize}
			/>,
		);

		await user.click(screen.getByTestId(`${TEST_ID}-maximize`));

		expect(onMaximize).toHaveBeenCalledTimes(1);
		expect(onResize).not.toHaveBeenCalled();
	});

	it("calls onResize when maximized and the restore button is clicked", async () => {
		const onMaximize = vi.fn();
		const onResize = vi.fn();
		const user = userEvent.setup();

		render(
			<TopBar
				testId={TEST_ID}
				isMaximized={true}
				onMaximize={onMaximize}
				onResize={onResize}
			/>,
		);

		await user.click(screen.getByTestId(`${TEST_ID}-maximize`));

		expect(onResize).toHaveBeenCalledTimes(1);
		expect(onMaximize).not.toHaveBeenCalled();
	});

	it("calls onClose when close button is clicked", async () => {
		const onClose = vi.fn();
		const user = userEvent.setup();

		render(<TopBar testId={TEST_ID} onClose={onClose} />);

		await user.click(screen.getByTestId(`${TEST_ID}-close`));

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("does not throw when no handlers are provided", async () => {
		const user = userEvent.setup();

		render(<TopBar testId={TEST_ID} />);

		for (const id of [
			`${TEST_ID}-minimize`,
			`${TEST_ID}-maximize`,
			`${TEST_ID}-close`,
		]) {
			await expect(
				user.click(screen.getByTestId(id)),
			).resolves.toBeUndefined();
		}
	});
});
