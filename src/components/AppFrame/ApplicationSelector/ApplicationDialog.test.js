import React from "react";
import sinon from "sinon";
import ApplicationDialog, {
	List,
	Block,
	Link,
	Logo,
	Label,
	Indicator,
} from "./ApplicationDialog";

describe("ApplicationDialog", () => {
	let toggle, applications, mockEvent;
	beforeEach(() => {
		toggle = sinon.spy().named("toggle");
		applications = [
			{
				name: "ChosenId",
				iconUri: "/url/to/img1.png",
				url: "/test/url",
				displayName: "Current App",
			},
			{
				name: "OtherId",
				iconUri: "/url/to/img2.png",
				url: "/test/some/other/url",
				displayName: "Other App",
			},
		];
		mockEvent = {
			preventDefault: sinon.spy().named("event.preventDefault"),
		};
	});

	it("renders a dialog structure listing applications", () =>
		expect(
			<ApplicationDialog
				toggle={toggle}
				applications={applications}
				applicationId="ChosenId"
			/>,
			"to render as",
			<List>
				<Block key="ChosenId">
					<Link
						href="/test/url"
						onClick={expect.it("when called with", [mockEvent])}
					>
						<Logo src="/url/to/img1.png" />
					</Link>
					<Label>Current App</Label>
					<Indicator />
				</Block>
				<Block key="OtherId">
					<Link
						href="/test/some/other/url"
						onClick={expect.it("to be a function")}
					>
						<Logo src="/url/to/img2.png" />
					</Link>
					<Label>Other App</Label>
				</Block>
			</List>,
		).then(() =>
			expect.promise.all({
				toggle: expect(toggle, "was called once"),
				"event.preventDefault": expect(
					mockEvent.preventDefault,
					"was called once",
				),
			}),
		));
});
