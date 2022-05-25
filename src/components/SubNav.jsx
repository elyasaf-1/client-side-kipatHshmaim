import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {useCallback} from "react";

const SubNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 54px;
  width: 100%;
  background-color: rgb(83, 188, 255);
  margin-top: 70px;
`;

const SubNavEl = styled.div`
  display: flex;
  font-size: 24px;
  font-family: "Academy Engraved LET";
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  width: 50%;

  ${({ current }) => current ? "box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;": null}
  
  :hover {
    background-color: rgb(24, 61, 84);
  }
`;

export const SubNav = ({current, onBlogClick}) => {

    const history = useHistory();

    const onNavClick = useCallback( (state) => {
        onBlogClick()
        history.push(state);
    }, [])

    return(
        <SubNavContainer>
            <SubNavEl onClick={() => onNavClick(`/`)} current={current === "home"}>{"מידע"}</SubNavEl>
            <SubNavEl onClick={() => onNavClick(`/Blog`)} current={current === "blog"}>{"בלוגים"}</SubNavEl>
        </SubNavContainer>
    )

}