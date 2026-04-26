import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
	it("calls onClick once when clicked", async () => {
		const onClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={onClick}>Click</Button>);

		await user.click(screen.getByRole("button"));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("calls onClick for every click", async () => {
		const onClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={onClick}>Click</Button>);

		const button = screen.getByRole("button");
		await user.click(button);
		await user.click(button);
		await user.click(button);

		expect(onClick).toHaveBeenCalledTimes(3);
	});

	it("does not call onClick when disabled", async () => {
		const onClick = vi.fn();
		const user = userEvent.setup();

		render(
			<Button onClick={onClick} disabled>
				Click
			</Button>,
		);

		await user.click(screen.getByRole("button"));

		expect(onClick).not.toHaveBeenCalled();
	});

	it("supports async onClick handlers", async () => {
		const onClick = vi.fn(async () => {
			return Promise.resolve();
		});
		const user = userEvent.setup();

		render(<Button onClick={onClick}>Click</Button>);

		await user.click(screen.getByRole("button"));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("does not throw when onClick is not provided", async () => {
		const user = userEvent.setup();

		render(<Button>Click</Button>);

		await expect(
			user.click(screen.getByRole("button")),
		).resolves.toBeUndefined();
	});
});
