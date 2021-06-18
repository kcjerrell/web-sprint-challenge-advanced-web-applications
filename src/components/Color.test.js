import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const testColor = {
	color: "lilac",
	code: {
		hex: "#9a99dd",
	},
	id: 5,
};

const blankColor = {
	color: "",
	code: {
		hex: ""
	},
	id: null
}

test("Renders without errors with blank color passed into component", () => {
	render(<Color color={blankColor} />);
});

test("Renders the color passed into component", () => {
	render(<Color color={testColor} />);

	const name = screen.getByText(testColor.color);

	expect(name).toBeVisible();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
	const deleteColor = jest.fn();
	const toggleEdit = jest.fn();

	render(<Color color={testColor} deleteColor={deleteColor} toggleEdit={toggleEdit} />);

	expect(deleteColor).not.toHaveBeenCalled();
	expect(toggleEdit).not.toHaveBeenCalled();

	const xButton = screen.getByTestId("delete");
	userEvent.click(xButton);

	expect(toggleEdit).toHaveBeenCalled();
	expect(toggleEdit.mock.calls[0][0]).toBe(false);
	expect(deleteColor).toHaveBeenCalled();
	expect(deleteColor.mock.calls[0][0]).toBe(testColor);

});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
	const setEditColor = jest.fn();
	const toggleEdit = jest.fn();

	render(<Color color={testColor} setEditColor={setEditColor} toggleEdit={toggleEdit} />);

	expect(setEditColor).not.toHaveBeenCalled();
	expect(toggleEdit).not.toHaveBeenCalled();

	const colorName = screen.getByText(testColor.color);
	userEvent.click(colorName);

	expect(toggleEdit).toHaveBeenCalled();
	expect(toggleEdit.mock.calls[0][0]).toBe(true);
	expect(setEditColor).toHaveBeenCalled();
	expect(setEditColor.mock.calls[0][0]).toBe(testColor);
});
