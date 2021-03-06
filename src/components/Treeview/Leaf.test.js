import React from "react";
import { Root, Leaf } from "./Leaf";

describe("Root", () => {
	it("renders a <li>", () => expect(<Root />, "to render as", <li />));
});

describe("Leaf", () => {
	it("renders a <Root>", () => expect(<Leaf />, "to render as", <Root />));

	it("sets styling for a branch structure", () =>
		expect(
			<Leaf
				theme={{
					treeSettings: {
						branchIndent: 10,
						branchLength: 12,
						branchHeight: 14,
					},
				}}
			/>,
			"to render style rules",
		).then(styles =>
			expect(styles, "to match", /:before {[^}]*left: -12px;[^}]*}/)
				.and("to match", /:before {[^}]*width: 12px;[^}]*}/)
				.and("to match", /:before {[^}]*bottom: 14px;[^}]*}/)
				.and("to match", /:last-child::after {[^}]*left: -13px;[^}]*}/)
				.and("to match", /:last-child::after {[^}]*height: 14px;[^}]*}/),
		));
});
