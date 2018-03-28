// @flow
import React from "react";
import type { Node, StatelessFunctionalComponent } from "react";
import styled from "styled-components";
import Breadcrumbs from "./Breadcrumbs";
import type { PathProp } from "./Breadcrumbs";
import DropMenu from "../DropMenu";
import type { DropMenuProps } from "../DropMenu";

const Wrapper = styled.div`
	padding-left: 50px;
	height: 30px;
	color: #ccc;
	display: flex;
	justify-content: space-between;
`;

const Menu = styled(DropMenu)`
	box-sizing: border-box;
	font-family: Roboto Condensed, sans-serif;
	font-size: 12px;
	text-transform: uppercase;
	height: 30px;
	min-width: 180px;
	padding-top: 9px;
	padding-right: 32px;
`;

export type TopbarConfigProps = PathProp &
	DropMenuProps & { onClick: () => void };

const Topbar: StatelessFunctionalComponent<TopbarConfigProps> = ({
	onClick,
	path,
	...config
}: TopbarConfigProps): Node => {
	return (
		<Wrapper onClick={onClick}>
			<Breadcrumbs path={path} />
			<Menu {...config} />
		</Wrapper>
	);
};

export default Topbar;