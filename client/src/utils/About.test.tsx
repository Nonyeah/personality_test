import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from '../Routes/About'


describe("Test for general category pages", () => {
    it("Renders 'About Us' header on mount", () => {
        render(<About />);
       expect(screen.getByText(/about us/i)).toBeInTheDocument
      
    })
})