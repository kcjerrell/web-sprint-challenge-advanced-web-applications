import React from 'react';
import { act, render, screen, waitFor } from "@testing-library/react";
import BubblePage from './BubblePage';

import fetchColorService from '../services/fetchColorService';
jest.mock('../services/fetchColorService');

const testColors = [{
    color: "lilac2",
    code: {
        hex: "#9a99da",
    },
    id: 0,
}, {
    color: "lilac1",
    code: {
        hex: "#9a99d0",
    },
    id: 1,
}, {
    color: "lilac",
    code: {
        hex: "#9a99dd",
    },
    id: 2,
}]

test("Renders without errors", () => {
    fetchColorService.mockResolvedValueOnce(testColors);
    render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async () => {

    fetchColorService.mockResolvedValueOnce(testColors);
    render(<BubblePage />);

    const colors = await screen.findAllByTestId("color");

    expect(colors).toHaveLength(3);
});
