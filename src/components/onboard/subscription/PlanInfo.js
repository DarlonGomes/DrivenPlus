import styled from "styled-components";
import { Grid } from "react-loader-spinner";
import { useParams,Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import sheet from "../../../assets/sheet.png"
import money from "../../../assets/money.png"
import back from "../../../assets/back.png"
import axios from "axios";
function PlanInfo () {
    const navigate = useNavigate();
    const {token} = useContext(UserContext);
    const planID = useParams();
    const [plan, setPlan] = useState(null);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [cardExpiration, setCardExpiration] = useState("");

    useEffect(()=>{
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planID.planID}`, token)
            .then(response => setPlan(response.data))
    },[])
    
    function loadIt (){
        if(plan !== null){
            return(
            <Content>
                <Header><img onClick={()=>{navigate("/subscriptions")}}src={back} alt="retornar" /></Header>
                <Logo>
                        <img src={plan.image} alt="Logo" />
                        <h1>Driven Plus</h1>
                </Logo>
                <Description>
                    <div className="topic">
                        <img src={sheet} alt="planilha"/> <h1>Benefícios:</h1>
                    </div>
                    {plan.perks.map((item, index)=><p key={item.id}>{index + 1}. {item.title}</p>)}
                    <div className="topic">
                        <img src={money} alt="cédula"/> <h1>Preço:</h1>
                    </div>
                    <p>R$ {plan.price} cobrados mensalmente</p>
                </Description>
            </Content>
            )
        }
        else{
            return(
                <Loading><Grid color="#FF4791" height={80} width={80} /></Loading>
            )
        }
    }

    const Load = loadIt();

    return(
        <Page>
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
    color: #FFFFFF;
`;

const Loading = styled.div`
    width: 290px;
    height: 570px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 300px;
    height: 609px;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    height: 76px;
`;

const Logo = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    img{
        margin: 0;
    }
    h1{
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 32px;
        color: #FFFFFF;
        margin: 12px 0 10px;
    }
`;

const Description = styled.div`
    width: 300px;
    font-family: 'Roboto';
    font-weight: 400;
    color: #FFFFFF;

    .topic{
        display: flex;
        gap: 5px;
        margin: 12px 0;
    }

    h1{
        font-size: 16px;
    }
    p{
        font-size: 14px;
        margin-bottom: 3px;
    }
`;
export default PlanInfo;