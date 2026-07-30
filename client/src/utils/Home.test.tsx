import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../Routes/Home'


describe("Home Component", () => {
    it("Test whether summary container loads when home component mounts", () => {
        render(<Home />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    })
})