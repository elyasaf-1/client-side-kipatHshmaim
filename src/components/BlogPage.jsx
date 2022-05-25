import styled from "styled-components";
import {AddToBlogButton, CardRow, CityCard, CityDesc, CityImg, CityName, WebsiteHeader} from "./HomePage";
import {useParams, useLocation, useHistory} from "react-router-dom";
import {Amsterdam, citiesArray, London} from "../citesData";
import React, {useCallback, useState} from "react";
import { Autocomplete } from "./Autocomplete";
import {SubNav} from "./SubNav";
import {getCityBlogData, uploadCityBlog} from "../APIService";

const BlogContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const BlogImg = styled.img`
  align-self: flex-start;
  width: 420px;
  height: 350px;
  margin-top: 140px;
  margin-left: 200px;
  float: left;
  position: absolute;
  z-index: -1;
  border-radius: 5px;
  @media screen and (max-width: 1280px) {
    width: 30%;
  }
`;


export const BlogWideImg = styled.img`
  //align-self: flex-start;
  width: 90%;
  //height: 350px;
  margin-top: 24px;
  //margin-left: 200px;
  float: left;
  //position: absolute;
  z-index: -1;
  border-radius: 5px;
  //@media screen and (max-width: 1280px) {
  //  width: 50%;
  //  margin-top: -300px;
  //}
`;

export const CityTitle = styled.div`
  font-family: 'Bellefair', serif;
  font-size: 72px;
  align-self: flex-end;
  margin: 30px 100px 0 0;
`;

export const CityText = styled.div`
  font-family: "Al Bayan";
  font-size: 24px;
  max-width: 900px;
  text-align: right;
  //white-space: nowrap;
  overflow: hidden;
  //text-overflow: ellipsis;
  //align-self: flex-end;
  margin: 30px 100px 0 0;
  @media screen and (max-width: 1280px) {
    width: 30%;
  }
`;


export const SubmitButton = styled.button`
  font-family: "Al Bayan";
  font-size: 18px;
  width: 70px;
  align-self: flex-end;
  margin: 30px 100px 30px 0;
  background-color: #61dafb;
  border-radius: 12px;
  @media screen and (max-width: 1280px) {
    width: 30%;
  }
`;

export const AddImg = styled.input`
  width: 60px;
  height: 30px;
  background-color: #61dafb;
`

export const AddCity = styled.input`
  justify-content: right;
  align-self: flex-end;
  margin-right: 100px;
  font-size: 30px;
  font-family: "Academy Engraved LET";
  text-align: right;
  width: 400px;
  height: 55px;
  margin-top: 45px;
  display: inline-block;
  border: 4px solid #658ccb;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 7px 0;
  background-color: rgba(175, 229, 255, 0.42);


  :focus {
    background-color: #ffffff;
    box-shadow: 0px 3px 5px 0px rgba(69, 42, 167, 0.5);
  }
`;

export const AddCityDesc = styled.textarea`
  justify-content: right;
  align-self: flex-end;
  margin-right: 100px;
  font-size: 30px;
  font-family: "Academy Engraved LET";
  text-align: right;
  width: 1200px;
  height: 400px;
  margin-top: 45px;
  display: inline-block;
  border: 4px solid #658ccb;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 7px 0;
  background-color: rgba(175, 229, 255, 0.42);


  :focus {
    background-color: #ffffff;
    box-shadow: 0px 3px 5px 0px rgba(69, 42, 167, 0.5);
  }
`;

export const EmptyState = styled.div`
    font-size: 54px;
    color: darkblue;
  margin-top: 130px;
`;

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const BlogPage = () => {
    const [cityBlogData, setCityBlogData] = useState(null);
    const [cityName, setCityName] = useState("")
    const [cityDesc, setCityDesc] = useState("")

    const onTextCityDescChange = useCallback(
        (e) => {
            setCityDesc(e.target.value);
        },[]);

    const onTextCityNameChange = useCallback(
        (e) => {
            setCityName(e.target.value);
        },[]);

    const handleBlogClick = useCallback(
        () => {
            setCityBlogData(null);
        },[]);

    const onSubmit = useCallback(async() => {
        await uploadCityBlog(cityName, cityDesc);
        const response = await getCityBlogData(cityName);
        setCityBlogData(response);
    },[cityName, cityDesc])

    const onCardClick = useCallback((idx) => {
        const newDataArray = cityBlogData?.slice(idx, idx + 1);
        setCityBlogData(newDataArray)
    },[cityBlogData])

    const history = useHistory();
    const myId = parseInt(useQuery().get("id"));
    const currentCity = citiesArray.find( city => city.id === myId);

    const ResultToRender = () => {
        if (cityBlogData.length < 1) {
            return <EmptyState>{"מצטערים. לא מצאנו מידע כרגע :( "}</EmptyState>
        } else if (cityBlogData.length > 1) {
            const cards = cityBlogData.map( (city, idx) => {
                if (idx < 6) {
                    return (
                        <CityCard onClick={() => onCardClick(idx)}>
                            <CityImg src={city?.img} />
                            <CityName>{city.city}</CityName>
                            <CityDesc>{city.description}</CityDesc>
                        </CityCard>
                        )
                    }
                })

            return (
                        <CardRow>
                            {cards}
                        </CardRow>
            )
        }
        else {
            return (
                <>
                    {cityBlogData[0]?.imgSrc && (<BlogWideImg src={cityBlogData[0]?.img} />)}
                    <CityTitle>{cityBlogData[0]?.city}</CityTitle>
                    <CityText>{cityBlogData[0]?.description}</CityText>
                </>
            )
        }
    }

    const AddToBlogToRender = () => {
        return (
            <>
                <CityTitle>{"הוסף עיר לבלוג"}</CityTitle>
                <AddCity onChange={onTextCityNameChange} placeholder={" ?שם העיר שתרצה להוסיף "} />
                <AddCityDesc onChange={onTextCityDescChange} placeholder={" ספר קצת על העיר... "} />
                <SubmitButton onClick={onSubmit}>{"שלח"}</SubmitButton>
            </>
        )
    }

    return (
        <BlogContainer>
            <WebsiteHeader onClick={() => history.push(`/Home`)}>כיפת השמיים</WebsiteHeader>
            <SubNav current={"blog"} onBlogClick={handleBlogClick} />
            <Autocomplete setData={setCityBlogData} state={"blog"}/>
            {cityBlogData ? ResultToRender() : AddToBlogToRender()}
        </BlogContainer>

    )
}