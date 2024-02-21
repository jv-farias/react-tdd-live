import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Header from "./header";

describe("Header Component", () => {
    it("should logo on header", () => {
        render (<Header />)
        expect(screen.getByText("todo")).toBeInTheDocument();
    })
})