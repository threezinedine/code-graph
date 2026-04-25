import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe } from "node:test";
import { expect, it } from "vitest";

describe("App", () => {
	it("renders the starter heading", () => {
		render(<App />);
		expect(
			screen.getByRole("heading", {
				name: /Electron \+ React \+ TypeScript/i,
			}),
		).toBeInTheDocument();
	});
});
