import React from "react";
import FullAppFrame, { Base, ViewPort, AppFrame } from "./index";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

describe("AppFrame", () => {
	let props, toggle, reset;
	beforeEach(() => {
		props = {
			applications: [{ src: "/", label: "This", id: "current" }],
			applicationId: "current",
			pages: [],
			menuLabel: "TestLabel",
			menuItems: [],
			linkHOC: x => x,
		};

		toggle = () => {};
		reset = () => {};
	});

	it("renders a viewport, top bar and sidebar", () =>
		expect(
			<AppFrame {...props} {...{ toggle, reset }} />,
			"to render as",
			<Base>
				<Topbar
					linkHOC={props.linkHOC}
					applications={props.applications}
					applicationId={props.applicationId}
					menuLabel={props.menuLabel}
					menuItems={props.menuItems}
				/>
				<Sidebar linkHOC={props.linkHOC} pages={props.pages} />
				<ViewPort />
			</Base>,
		));

	it("propagates open flag, toggle and reset functions", () =>
		expect(
			<AppFrame open {...props} />,
			"to render as",
			<Base>
				<Topbar onClick={expect.it("to be", props.reset)} />
				<Sidebar open toggle={expect.it("to be", props.toggle)} />
				<ViewPort open onClick={expect.it("to be", props.reset)} />
			</Base>,
		));

	describe("ViewPort", () => {
		it("does not translate when closed", () =>
			expect(
				<ViewPort />,
				"to render style rules",
				"not to contain",
				"translateX",
			));

		it("translates to the side when open", () =>
			expect(
				<ViewPort open />,
				"to render style rules",
				"to contain",
				"transform: translateX(150px);",
			));
	});

	describe("with state handling", () => {
		it("adds toggleable and resettable open flag", () =>
			expect(
				<FullAppFrame {...props} />,
				"to render as",
				<AppFrame
					{...props}
					open={false}
					toggle={expect.it("to be a function")}
					reset={expect.it("to be a function")}
				/>,
			));
	});

	describe("global styles", () => {
		it("ensures required styling on html element to make IE11 happy", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"html",
					"as a selector to have style rules",
					"to match",
					/html\s*\{\s*height: 100%;\s*\}/,
				),
			));

		it("ensures required body styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"body",
					"as a selector to have style rules",
					"to match",
					/body\s*\{\s*height: 100%;\s*margin: 0;\s*overflow: hidden;\s*\}/,
				),
			));

		it("ensures required viewport styling", () =>
			// render any component from AppFrame.js to ensure jsdom has styles injected
			expect(<Base />, "when deeply rendered").then(() =>
				expect(
					"#app",
					"as a selector to have style rules",
					"to match",
					/#app\s*\{\s*height: 100%;\s*\}/,
				),
			));
	});
});
