import React from "react";
import styled from "styled-components";
import Icon from "../../Icon";

export const MenuIcon = styled(Icon).attrs({ id: "placeholder" })`
	font-size: 24px;
	margin: auto;
`;

export const Wrapper = styled.div`
	width: 50px;
	height: 100%;
	display: flex;
	justify-content: center;
	border-radius: 4px;

	&:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}
`;

const Header = ({ toggle, ...props }) => (
	<Wrapper onClick={toggle} {...props}>
		<MenuIcon />
	</Wrapper>
);

export default Header;
