import styled from "styled-components";
import axios from "axios";
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../../../context/UserContext'
import { ThreeDots } from "react-loader-spinner";
function Home () {
    const {data, membership} = useContext(UserContext);
    console.log(membership);
    return(
        <Page>
            
        </Page>
    )
}
const Page = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: #0E0E13;
`;
export default Home