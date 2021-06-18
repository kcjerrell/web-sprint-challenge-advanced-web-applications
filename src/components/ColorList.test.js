import React from 'react';
import { render, screen } from "@testing-library/react";
import ColorList from './ColorList';

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

test("Renders an empty list of colors without errors", () => {
	render(<ColorList colors={[]} />);
});

test("Renders a list of colors without errors", () => {
	render(<ColorList colors={testColors} />)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
	const getEditForm = () => screen.queryByTestId("editMenu");

	const { rerender } = render(<ColorList colors={testColors} />);

	let editForm = getEditForm();
	expect(editForm).toBeNull();

	rerender(<ColorList colors={testColors} editing={true} />);

	editForm = getEditForm();
	expect(editForm).toBeVisible();
});
