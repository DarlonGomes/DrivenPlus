import styled from "styled-components";
import axios from "axios";
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";

function SignUp () {
const navigate = useNavigate();

const [registerName, setRegisterName] = useState("");
const [registerCPF, setRegisterCPF] = useState("");
const [registerEmail, setRegisterEmail] = useState("");
const [registerPassword, setRegisterPassword] = useState("");

const [isDisabled, setIsDisabled] = useState(false);

function register(event){
    event.preventDefault();
    setIsDisabled(true)

    const body ={
            email: registerEmail,
            name: registerName,
            cpf: registerCPF,
            password: registerPassword
        }
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', body)
        .then(response =>{
            setIsDisabled(false);
            navigate("/")
        })
        .catch(response => alert("Dados não válidos, tente outra vez."))
        
}

function toggleButton () {
    if(isDisabled === true){
        return (
            <button><ThreeDots  color="#FFFFFF" height={17} width={299} /></button>
        )
    }

    return(
        <button type="submit">CADASTRAR</button>
    )
}

const Toggle = toggleButton();

    return(
        <Page>
        <form onSubmit={(event)=>register(event)}>
        <input
        type="text"
        value={registerName}
        onChange={e=> setRegisterName(e.target.value)}
        placeholder= "Nome"
        required
        ></input>
        <input
        type="text"
        value={registerCPF}
        onChange={(e)=> setRegisterCPF(e.target.value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            .substring(0, 14))}
        placeholder= "CPF"
        required
        ></input>
        <input
        type="email"
        value={registerEmail}
        onChange={e=> setRegisterEmail(e.target.value)}
        placeholder= "E-mail"
        required
        ></input>
        <input
        type="password"
        value={registerPassword}
        onChange={e => setRegisterPassword(e.target.value)}
        placeholder= "Senha"
        required
        ></input>
        {Toggle}
        </form>
        <Link to="/" >
        <p>Já possui uma conta? Faça login</p>
        </Link>
    </Page>
    )
}
export default SignUp

const Page = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: #0E0E13;
    
    form{
        width: 300px;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 14px;
        color: #7E7E7E;
    }
    img{
        width: 294px;
        height: 48px;
        margin-bottom: 100px;
    }
    input{
        width: 300px;
        height: 45px;
        background: ${(props) => props.isDisabled ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 16px;
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
    p{
        font-family: 'Roboto';
        font-weight: 400;
        text-decoration-line: underline;
        color: #FFFFFF;
        margin-top: 25px;
    }
`;