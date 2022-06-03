import styled from "styled-components";
import axios from "axios";
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../../../context/UserContext'
import { ThreeDots } from "react-loader-spinner";
function Home () {
    const {data} = useContext(UserContext);

    return(
        <Page>
            
        </Page>
    )
}
const Page = styled.div``;
export default Home