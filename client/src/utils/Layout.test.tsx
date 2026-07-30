import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import Layout from "../Routes/Layout";
import { MemoryRouter } from "react-router-dom";

describe("Layout Test For Desktop and Mobile", () => {
	it("Tests whether the desktop navigation menu loads on component mount", () => {
		render(
			<MemoryRouter>
				<Layout />
			</MemoryRouter>
		);
		expect(screen.queryByRole("navigation", { name: /topnav/i }))
			.toBeInTheDocument;
	});

	it("Tests whether mobile navigation is hidden on desktop site", async () => {
		render(
			<MemoryRouter>
				<Layout />
			</MemoryRouter>
		);
		const mainElement = screen.getByRole("main");
		expect(mainElement).toBeFalsy();
	});

	it("Tests whether mobile nav menu displays on click of burger icon", async () => {
		window.innerWidth = 375;
		window.innerHeight = 667;
		window.dispatchEvent(new Event("resize"));

		render(
			<MemoryRouter>
				<Layout />
			</MemoryRouter>
		);

		expect(screen.getByRole("main")).toBeInTheDocument();
		await userEvent.click(screen.getByRole("menu"));
		expect(
			screen.getByRole("main", { name: "hidden-links-container" })
		).toBeInTheDocument();

		await userEvent.click(screen.getByLabelText("close-button"));
		expect(screen.queryByRole("main", { name: "hidden-links-container" })).toBeFalsy();
	});
});
