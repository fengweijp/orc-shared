import React from "react";
import styled from "styled-components";
import { safeGet } from "../utils";
import Measure from "react-measure";

export const Scrollbox = styled.div`
	height: 100%;
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
`;

const withScrollBox = WrappedComp => ({ onScroll, ...otherProps }) => (
	<Measure bounds>
		{({ measureRef, contentRect }) => (
			<Scrollbox onScroll={onScroll} innerRef={measureRef}>
				<WrappedComp
					{...otherProps}
					height={safeGet(contentRect, "bounds", "height")}
				/>
			</Scrollbox>
		)}
	</Measure>
);

export default withScrollBox;
