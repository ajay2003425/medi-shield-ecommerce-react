
import React from "react";
import { render, screen } from "@testing-library/react";
import HealthProducts from "../HealthProducts";

// Mock react-query's useQuery so we can inject product data
jest.mock("@tanstack/react-query", () => {
  const React = require("react");
  return {
    useQuery: () => ({
      data: [
        {
          id: "1",
          name: "Protein Powder",
          brand: "WellnessX",
          manufacturer: "BigHealth Pharma",
          description: "For muscle recovery.",
          image_url: "",
          category_id: "health",
          price: 500,
          original_price: 800,
          discount: 37.5,
          bestseller: true,
          rating: 4.2,
          reviews: [
            { author: "A", comment: "Great!", stars: 5 },
            { author: "B", comment: "Ok", stars: 3 }
          ],
          stock: 14
        }
      ],
      isLoading: false,
      error: null,
    }),
  };
});

describe("HealthProducts component", () => {
  it("renders product card with pricing, badges, rating, reviews", () => {
    render(<HealthProducts />);
    expect(screen.getByText("Protein Powder")).toBeInTheDocument();
    expect(screen.getByText("WellnessX")).toBeInTheDocument();
    expect(screen.getByText("₹500.00")).toBeInTheDocument();
    expect(screen.getByText("-37.5%")).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[0].children.length).toBe(5);
    expect(screen.getByText("(2)")).toBeInTheDocument();
    expect(screen.getByText(/Bestseller/i)).toBeInTheDocument();
  });
});
