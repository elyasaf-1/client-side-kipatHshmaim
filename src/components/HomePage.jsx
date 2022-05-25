import '../App.css';
import styled from "styled-components";
import {Amsterdam, Athene, London, NewYork, Paris, Rome} from "../citesData";
import React, {useCallback, useMemo, useState} from "react";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "./Autocomplete";
import {CityText, CityTitle, EmptyState} from "./BlogPage";
import {getCityData} from "../APIService";
import {SubNav} from "./SubNav";

export const Credit = styled.div`
  margin-top: 24px;
  font-family: "Academy Engraved LET";
  font-size: 28px;
  text-align: center;
  color: #282c34;
`;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const WebsiteHeader = styled.div`
  cursor: pointer;
  top: 0;
  font-size: 56px;
  font-family: monospace;
  width: 100%;
  height: 70px;
  font-weight: 900;
  color: #F5F9FD;
  text-align: center;
  background-color: #53BCFF;
  position: fixed;
  box-shadow: 2px 2px 4px gray;
  z-index: 999;
`;

const BlogContainer = styled.div`
  float: right;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const CityImg = styled.img`
  width: 100%;
  height: 130px;
`

export const CityName = styled.div`
  float: right;
  margin: 8px 18px 0 0;
  font-size: 22px;
  font-family: 'Bellefair', serif;
  color: #282c34;
  min-width: 80px;
`

export const CityDesc = styled.div`
  width: 80%;
  font-size: 16px;
  float: right;
  margin: 10px 18px 0 0;
  font-family: "Al Bayan";
  text-align: right;
  color: tan;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const CardRow = styled.div`
  margin-top: 30px;
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  column-gap: 24px;
  row-gap: 40px;
  justify-content: space-between;
`;
export const CityCard = styled.div`
    min-width: 350px;
    max-width: 420px;
    flex-grow: 3;
    flex-shrink: 3;
    height: 300px;
    background-color: #f2fcfe;
    border-radius: 6px 6px;
    box-shadow: 2px 2px 6px #3384af;
    :hover {
      box-shadow: 8px 8px 7px gray;
      transform: translateY(-4px);
    }
`;

export const AddToBlogButton = styled.button`
  float: left;
  display: flex;
  position: absolute;
  align-self: flex-start;
  align-content: center;
  width: 90px;
  font-size: 14px;
  font-weight: 500;
  font-family: "Al Bayan";
  margin: 22px 0 0 30px;
  height: 27px;
  background-color: rgba(64, 120, 168, 0.2);
  border-radius: 20px;
`;

export const ResturantContainer = styled.div`
  display: flex;
  margin-bottom: 18px;
  flex-direction: column;
  max-width: 650px;
  box-shadow: 1px 2px gray;
  background-image: linear-gradient(130deg, #BBDFFB 0%, #53BCFF 100%);
  border-radius: 8px;
  padding: 24px;
`;

const ResturantName = styled.div`
  float: right;
  font-family: "Al Bayan";
  font-size: 18px;
  font-weight: bold;
  text-align: right;
`;

const RestaurantsTitle = styled.div`
  float: right;
  font-family: "Al Bayan";
  text-align: right;
  font-size: 32px;
`;

const ResturantType = styled.div`
  float: right;
  font-family: "Al Bayan";
  text-align: right;
`;

const ResturantsAndGeneralWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-right: 84px;
  justify-content: space-between;
  margin-top: 22px;
  align-self: end;
  //@media screen and (max-width: 1280px) {
  //  margin-top: 700px;
  //  flex-direction: column;
  //}
`;

export const BlogImg = styled.img`
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

const ResultColumn = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 650px;
    margin-right: 24px;
`;

const ResturantAdress = styled.div`
  float: right;
  font-family: "Al Bayan";
  text-align: right;
`

const Home = () => {
    const [cityData, setCityData] = useState(null);

    const history = useHistory();

    const onNavClick = useCallback( async (id) => {
        history.push(`/Blog`);
    }, [])

    const handleInfoClick = useCallback(
        () => {
            setCityData(null);
        },[]);

    const onCardClick = useCallback( async (id) => {
        // history.push(`/Blog?id=${id}`);
        const response = await getCityData(id)
        setCityData(response);
    }, [])

    const onAddToBlogClick = useCallback((id) => {
        history.push(`/AddCity`);
    }, [])

    const ResultToRender = () => {
        if (cityData.restaurants.length === 0 && cityData.general.length === 0) {
            return <EmptyState>{"מצטערים. לא מצאנו מידע כרגע :( "}</EmptyState>
        }
        const restaurants = cityData.restaurants?.map( rest => {
                return (
                    <ResturantContainer>
                        <ResturantName>{rest.name}</ResturantName>
                        <ResturantType>{rest.type}</ResturantType>
                        <ResturantAdress>{rest.adress}</ResturantAdress>
                    </ResturantContainer>
                )
        })
        const generals = cityData.general?.map( gen => {
                return (
                    <ResturantContainer>
                        <ResturantName>{gen.name}</ResturantName>
                        <ResturantType>{gen.type}</ResturantType>
                        <ResturantAdress>{gen.adress}</ResturantAdress>
                    </ResturantContainer>
                )
        })
        return(
            <BlogContainer>
                <BlogImg src={cityData.img} />
                <CityTitle>{cityData.name}</CityTitle>
                <ResturantsAndGeneralWrapper>
                    <ResultColumn>
                        <RestaurantsTitle>{"כללי"}</RestaurantsTitle>
                        <div>{generals}</div>
                    </ResultColumn>
                    <ResultColumn>
                        <RestaurantsTitle>{"מסעדות"}</RestaurantsTitle>
                        <div>{restaurants}</div>
                    </ResultColumn>
                </ResturantsAndGeneralWrapper>
            </BlogContainer>
        )
    }

    return (
        <HomeContainer>
            <WebsiteHeader onClick={() => setCityData(null)}>
                {"כיפת השמיים"}
            </WebsiteHeader>
            <SubNav current={"home"} onBlogClick={handleInfoClick}/>
            <Autocomplete setData={setCityData} />
            {cityData ? <ResultToRender/> : (
                <>
                    <CardRow>
                        <CityCard onClick={() => onCardClick(London.nameHebrew)}>
                            <CityImg src={London.imgSrc} />
                            <CityName>{London.nameHebrew} ({London.nameEnglish})</CityName>
                            <CityDesc>{London.description}</CityDesc>
                        </CityCard>
                        <CityCard onClick={() => onCardClick(NewYork.nameHebrew)}>
                            <CityImg src={NewYork.imgSrc} />
                            <CityName>{NewYork.nameHebrew} ({NewYork.nameEnglish})</CityName>
                            <CityDesc>{NewYork.description}</CityDesc>
                        </CityCard>
                        <CityCard onClick={() => onCardClick(Paris.nameHebrew)}>
                            <CityImg src={Paris.imgSrc} />
                            <CityName>{Paris.nameHebrew} ({Paris.nameEnglish})</CityName>
                            <CityDesc>{Paris.description}</CityDesc>
                        </CityCard>
                        <CityCard onClick={() => onCardClick(Athene.nameHebrew)}>
                            <CityImg src={Athene.imgSrc} />
                            <CityName>{Athene.nameHebrew} ({Athene.nameEnglish})</CityName>
                            <CityDesc>{Athene.description}</CityDesc>
                        </CityCard>
                        <CityCard onClick={() => onCardClick(Amsterdam.nameHebrew)}>
                            <CityImg src={Amsterdam.imgSrc} />
                            <CityName>{Amsterdam.nameHebrew} ({Amsterdam.nameEnglish})</CityName>
                            <CityDesc>{Amsterdam.description}</CityDesc>
                        </CityCard>
                        <CityCard onClick={() => onCardClick(Rome.nameHebrew)}>
                            <CityImg src={Rome.imgSrc} />
                            <CityName>{Rome.nameHebrew} ({Rome.nameEnglish})</CityName>
                            <CityDesc>{Rome.description}</CityDesc>
                        </CityCard>
                    </CardRow>
                    <Credit>הפרויקט בשיתוף איציק ויס אליסף גבאי ואהרון ריפס </Credit>
                </>)
            }
        </HomeContainer>
    );
}

export default Home;