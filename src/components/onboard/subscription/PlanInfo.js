import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { Grid } from "react-loader-spinner";
import { useParams,Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import sheet from "../../../assets/sheet.png";
import money from "../../../assets/money.png";
import back from "../../../assets/back.png";
import close from "../../../assets/close.png";
import axios from "axios";
function PlanInfo () {
    const navigate = useNavigate();

    const {token, data, setData} = useContext(UserContext);
    const planID = useParams();
    const [plan, setPlan] = useState(null);

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [cardExpiration, setCardExpiration] = useState("");
    const [body, setBody] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

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
                <form onSubmit={(event)=>{validate(event)}}>
                    <input
                    type="text"
                    value={cardName}
                    onChange={(e)=> setCardName(e.target.value)}
                    placeholder= "Nome impressso no cartão"
                    required
                    >
                    </input>
                    <input
                    type="text"
                    value={cardNumber}
                    onChange={(e)=> setCardNumber(e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
                        .substring(0, 19))}
                    placeholder= "Dígitos do cartão"
                    required
                    >
                    </input>
                    <input className="minor"
                    type="text"
                    value={cardCVV}
                    onChange={e => setCardCVV(e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{3})/, "$1")
                        .substring(0, 3))}
                    placeholder= "Código de segurança"
                    required
                    >
                    </input>
                    <input className="minor-space"
                    type="text"
                    value={cardExpiration}
                    onChange={e => setCardExpiration(e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{2})(\d{4})/, "$1/$2")
                        .substring(0, 7))}
                    placeholder= "Validade"
                    required
                    >
                    </input>
                    <button type="submit">ASSINAR</button>
                    </form>
            </Content>
            )
        }
        else{
            return(
                <Loading><Grid color="#FF4791" height={80} width={80} /></Loading>
            )
        }
    }

    function printModal (){
        if(isModalVisible === true){
            return(
                <Modal>
                    <img onClick={()=>{setIsModalVisible(false)}} src={close} alt="Fechar aba"/>
                    <Card>
                        <p>Tem certeza que deseja assinar o plano <br/>Driven Plus (R$ {plan.price}) ?</p>
                        <div className="buttons">
                            <button onClick={()=>{setIsModalVisible(false)}}>Não</button>
                            {isDisabled ? <button className="confirm"><ThreeDots color="#FFFFFF" height={14} width={95} /></button> : <button onClick={()=>{purchase()}} className="confirm">SIM</button>}
                        </div>
                    </Card>
            </Modal>
            )
        }
        return(
            <>
            </>
        )
    }

    function validate(event){
        event.preventDefault();
        setIsModalVisible(true);
        setBody({
            membershipId: parseInt(planID.planID),
            cardName: cardName,
            cardNumber: cardNumber,
            securityNumber: parseInt(cardCVV),
            expirationDate: cardExpiration
        })   
    }

    function purchase(){
        setIsDisabled(true);
        axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', body, token)
            .then((response)=>{
                setIsDisabled(false);
                const newObj = {...data, membership: response.data.membership};
                setData(newObj);
                navigate("/home");
            })
            .catch((res) =>{
                setIsDisabled(false);
                setIsModalVisible(false);
                setCardCVV("");
                setCardExpiration("");
                setCardName("");
                setCardNumber("");
                alert("Cheque suas credenciais e tente novamente.")
            })
        
    }

    const Load = loadIt();
    const PopUp = printModal();

    return(
        <Page>
            {Load}
            {PopUp}
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
    form{
        display: flex;
        flex-wrap: wrap;
        width: 300px;
        margin-top: 34px;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 14px;
        color: #7E7E7E;
    }
    input{
        width: 300px;
        height: 45px;
        background: ${(props) => props.isDisabled ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 8px;
        box-sizing: border-box;
        padding: 0 10px;
        pointer-events: ${(props) => props.isDisabled ? "none" : "all"};
    }
    button{
        width: 300px;
        height: 45px;
        background: #FF4791;
        border: none;
        border-radius: 5px;
        margin-top: 8px;
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 14px;
        color: #FFFFFF;
        pointer-events: ${(props) => props.isDisabled ? "none" : "all"};
    }
    .minor{
        width: 145px;
        
    }
    
    .minor-space {
        width: 145px;
        margin-left: 10px;
    }
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
const Modal = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);

    img{
        position: absolute;
        top: 25px;
        right: 30px;
    }
`;

const Card = styled.div`
    width: 248px;
    height: 210px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 12px;

    p{
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    color: #000000;
    margin: 33px 0 47px;
    }

    button{
    width: 95px;
    height: 52px;
    background: #CECECE;
    border-radius: 8px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    border: none;
    }

    .buttons{
        display: flex;
        gap: 14px;
    }

    .confirm{
        background-color: #FF4791;
        font-weight: 700;
    }
`;
export default PlanInfo;