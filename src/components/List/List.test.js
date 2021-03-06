import React from "react";
import { List, Table } from "./index";
import Row from "./Row";
import HeadRow from "./HeadRow";

const generateRows = count => {
	const rows = [];
	for (let i = 0; i < count; i += 1) {
		rows.push({ key: (i + 1).toString() });
	}
	return rows;
};

describe("List", () => {
	it("renders nothing if no columnDefs", () =>
		expect(<List rows={[{}]} />, "when rendered").then(render =>
			expect(render.getRenderOutput(), "to equal", null),
		));

	it("renders a table", () =>
		expect(<List columnDefs={[{}]} />, "to render as", <Table />));

	it("renders a row for each row data object", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const rowOnClick = () => {};
		return expect(
			<List
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
			/>,
			"when rendered",
			"to contain",
			<tbody>
				<Row
					key="a"
					rowId="a"
					row={expect.it("to be", rows[0])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
				<Row
					key="b"
					rowId="b"
					row={expect.it("to be", rows[1])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
				<Row
					key="c"
					rowId="c"
					row={expect.it("to be", rows[2])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
			</tbody>,
		);
	});

	it("renders a header based on column definitions", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const selection = ["a"];
		return expect(
			<List
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				selection={selection}
			/>,
			"when rendered",
			"to contain",
			<thead>
				<HeadRow
					columnDefs={columnDefs}
					rowIds={["a", "b", "c"]}
					allSelected={false}
				/>
			</thead>,
		);
	});

	it("renders a header with all rows identified when virtual", () => {
		const rows = generateRows(15);
		const columnDefs = [{}];
		const selection = ["4"];
		return expect(
			<List
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				selection={selection}
				virtual
				scrollTop={350}
				height={150}
				scrollBuffer={1}
			/>,
			"when rendered",
			"to contain",
			<thead>
				<HeadRow
					columnDefs={columnDefs}
					rowIds={[
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10",
						"11",
						"12",
						"13",
						"14",
						"15",
					]}
					allSelected={false}
				/>
			</thead>,
		);
	});

	it("renders a header when all rows are selected", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const selection = ["a", "b", "c"];
		return expect(
			<List
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				selection={selection}
			/>,
			"when rendered",
			"to contain",
			<thead>
				<HeadRow allSelected={true} />
			</thead>,
		);
	});

	describe("virtual scrolling", () => {
		let rows, columnDefs;
		beforeEach(() => {
			rows = generateRows(15);
			columnDefs = [{}];
		});

		it("renders at top", () =>
			expect(
				<List
					virtual
					scrollTop={0}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
				/>,
				"when rendered",
				"to contain with all children",
				<tbody>
					<Row key="1" />
					<Row key="2" />
					<Row key="3" />
					<Row key="4" />
					<tr style={{ height: 561 }} />
				</tbody>,
			));

		it("renders near top", () =>
			expect(
				<List
					virtual
					scrollTop={150}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
				/>,
				"when rendered",
				"to contain with all children",
				<tbody>
					<tr style={{ height: 51 }} />
					<Row key="2" />
					<Row key="3" />
					<Row key="4" />
					<Row key="5" />
					<Row key="6" />
					<Row key="7" />
					<tr style={{ height: 408 }} />
				</tbody>,
			));

		it("renders in the middle", () =>
			expect(
				<List
					virtual
					scrollTop={350}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
				/>,
				"when rendered",
				"to contain with all children",
				<tbody>
					<tr style={{ height: 255 }} />
					<Row key="6" />
					<Row key="7" />
					<Row key="8" />
					<Row key="9" />
					<Row key="10" />
					<tr style={{ height: 255 }} />
				</tbody>,
			));

		it("renders near end", () =>
			expect(
				<List
					virtual
					scrollTop={550}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
				/>,
				"when rendered",
				"to contain with all children",
				<tbody>
					<tr style={{ height: 408 }} />
					<Row key="9" />
					<Row key="10" />
					<Row key="11" />
					<Row key="12" />
					<Row key="13" />
					<Row key="14" />
					<tr style={{ height: 51 }} />
				</tbody>,
			));

		it("renders at end", () =>
			expect(
				<List
					virtual
					scrollTop={656}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
				/>,
				"when rendered",
				"to contain with all children",
				<tbody>
					<tr style={{ height: 561 }} />
					<Row key="12" />
					<Row key="13" />
					<Row key="14" />
					<Row key="15" />
				</tbody>,
			));
	});
});
