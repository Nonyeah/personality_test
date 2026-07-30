import { render, screen, within } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("Integration Test", async () => {
	it("Tests whether user can navigate to question pages and select answers", async () => {
		render(
			<MemoryRouter>
				<App></App>
			</MemoryRouter>
		);
		const topnav = screen.getByRole("navigation", { name: "topnav" });
		const testbutton = within(topnav);
		await userEvent.click(testbutton.getByText(/take the test/i));

		setTimeout(() => {
			expect(
				screen.getByRole("region", { name: /question section/i })
			).toBeInTheDocument();
		}, 1000);

		const button = screen.getAllByRole("button")[0];
		await userEvent.click(button);

		setTimeout(() => {
			expect(button.classList.contains("highlight")).toBeTruthy();
		}, 1000);
	});

	it("Tests whether user is prevented from navigating to the next page if all questions are not answered", async () => {
		render(
			<MemoryRouter>
				<App></App>
			</MemoryRouter>
		);

		const topnav = screen.getByRole("navigation", { name: "topnav" });
		const testbutton = within(topnav);
		await userEvent.click(testbutton.getByText(/take the test/i));

		setTimeout(() => {
			expect(
				screen.getByRole("region", { name: /question section/i })
			).toBeInTheDocument();
		}, 1000);

		const button = screen.getByRole("button", { name: /submit answers/i });
		await userEvent.click(button);
		setTimeout(() => {
			expect(
				screen.getByText(
					/please answer all questions before navigating to the next page/i
				)
			).toBeInTheDocument();
			expect(screen.getByText(/extraversion/i)).toBeInTheDocument();
		}, 1000);
	});
});
