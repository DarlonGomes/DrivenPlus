import styled from "styled-components";
import axios from "axios";
import {useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from '../../../context/UserContext'
import { Grid} from "react-loader-spinner";
function Subscription () {
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    const [plans, setPlans] = useState(null);
    
    useEffect(()=>{
       const promise = axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', token)
        promise.then(response => setPlans(response.data))
    },[])

    function loadIt (){
        if(plans === null){
            return(
                <Loading><Grid color="#FF4791" height={80} width={80} /></Loading>
            )
        }
        else{
            return(
                <>
                    {plans.map((element)=>{
                    <Link to={`/subscriptions/${element.id}`}>
                    <Plan key={element.id} onClick={()=> choose(element.id)}>
                    <img src={element.image} alt="Icone da Driven Plus"/> 
                    <p>R$ {element.price}</p>
                    </Plan>
                    </Link>
                    })}
                </>
            )
        }
    }

    function choose (id){
        navigate(`/subscriptions/${id}`)
    }

    const Load = loadIt();

    return(
        <Page>
            <h1>Escolha seu Plano</h1>
            {Load}
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
    font-family: 'Roboto';
    font-weight: 700;
    color: #FFFFFF;

    h1{
        font-size: 32px;
        margin-bottom: 24px;
    }
`;

const Plan = styled.div`
    width: 290px;
    height: 180px;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Roboto';
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 10px;

    p{
        font-size: 24px;
    }

`;

const Loading = styled.div`
    width: 290px;
    height: 570px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Subscription