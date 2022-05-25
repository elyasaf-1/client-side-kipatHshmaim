import styled from "styled-components";
import {useCallback, useState} from "react";
import {citiesArray} from "../citesData";
import {useHistory} from "react-router-dom";
import {getCityBlogData, getCityData} from "../APIService";

export const SearchBar = styled.input`
  justify-content: center;
  font-size: 30px;
  font-family: "Academy Engraved LET";
  text-align: right;
  width: 90%;
  height: 55px;
  margin-top: 45px;
  display: inline-block;
  border: 4px solid #658ccb;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 7px 0;
  background-color: rgba(83, 188, 255, 0.42);


  :focus {
    background-color: #ffffff;
    box-shadow: 0px 3px 5px 0px rgba(69, 42, 167, 0.5);
  }
`;

export const Autocomplete = ({setData, state = undefined}) => {
    const history = useHistory();
    const [selectedCity, setSelectedCity] = useState(null)
    const [inputText, setInputText] = useState(null)
    const onChange = useCallback((e) => {
        if (e.target.value === "") {
            setInputText(null);
        }
        setInputText(e.target.value);
    },[])

    const onEnterClick = useCallback( async (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let response;
            if( state === "blog") {
                response = await getCityBlogData(inputText)
            } else {
                response = await getCityData(inputText)
            }
            setData(response);
            // const selectedCityID = citiesArray.find(city => city.nameHebrew === inputText)?.id;
            // history.push(`/Blog?id=${selectedCityID}`);
        }
    },[inputText]);

    return (
        <>
            <SearchBar dir="rtl" placeholder={"חפש עיר..."} onChange={onChange} onKeyDown={onEnterClick}/>
            {/*{selectedCity && <ul>*/}
            {/*    {citiesArray.map((city) => {*/}
            {/*        if (city.nameHebrew.includes(selectedCity)) {*/}
            {/*            return <li key={city.id}>{city.nameHebrew}</li>*/}
            {/*        }*/}
            {/*    })}*/}
            {/*</ul>}*/}
        </>
    )
}