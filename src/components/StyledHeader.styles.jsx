import styled from "styled-components"

export const StyledHeader = styled.header`
    color: #fff;
    background-color: #3277d5;
    height: 50px;
    padding: 10px;
    margin-bottom: 20px;

	-webkit-box-shadow: 0 8px 6px -6px black;
	   -moz-box-shadow: 0 8px 6px -6px black;
	        box-shadow: 0 8px 6px -6px black;

`

export const Logo = styled.div`
    font-size: 20px;
    float: left;
`

export const Menu = styled.div`

    margin: 5px 0 0 100px;
    float: left;

    a {
        text-decoration: none;
        color: #fff;
        padding: 10px;
    }

    a:hover {
        color: #000;
    }
`