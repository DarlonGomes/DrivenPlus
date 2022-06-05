import styled from "styled-components";
import axios from "axios";
import {useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {UserContext} from '../../../context/UserContext'
import { Grid, ThreeDots } from "react-loader-spinner";
import user from '../../../assets/user.png';

function Home () {
    const navigate = useNavigate();
    const {data, token,} = useContext(UserContext);
    const [onLoad, setOnLoad] = useState(false);
 
    function cancelPlan(){
        setOnLoad(true);
        axios.delete('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', token)
             .then((response)=>{
                 setOnLoad(false);
                 navigate("/subscriptions")
             })
              .catch(res => alert("Algo inesperado aconteceu."))
    }
    
  

    return(
        <Page>
            <Header>
                    <img className="logo" src={data.membership.image} alt="DrivenPlus Logo"/>
                    <img src={user} alt="Usuário"/>
                </Header>
                <Content>
                    <h1>Olá, {data.name}</h1>
                    {data.membership.perks.map((element)=><a href={element.link} target="_blank" key={element.id}>
                        <button>{element.title}</button>
                    </a>)}
                </Content>
                <Footer>
                    <button onClick={()=>{
                        navigate("/subscriptions")
                    }}>Mudar Plano</button>
                    {onLoad ? <button className="cancel"><ThreeDots  color="#FFFFFF" height={17} width={299} /></button> : <button className="cancel" onClick={()=>cancelPlan()}>Cancelar plano</button>}
                </Footer>
        </Page>
    )
}
const Page = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: #0E0E13;
    
    button{
        width: 300px;
        height: 52px;
        margin-bottom: 8px;
        border: none;
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 14px;
        color: #FFFFFF;
        background-color: #FF4791;
        border-radius: 8px;
    }

    .cancel{
        background-color: #FF4747;
        margin-bottom: 12px;
    }
`;
const Header = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: 20px;
    margin: 0 auto;

    .logo{
        width: 60px;
        height: 60px;
        object-fit: fill;
    }
`;
const Content = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 92px;

    h1{
        font-size: 24px;
        margin-bottom: 53px;
    }

`;
const Footer = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
`;

export default Home