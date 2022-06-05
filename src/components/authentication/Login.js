import styled from "styled-components";
import axios from "axios";
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {UserContext} from "../../context/UserContext";
import { ThreeDots } from "react-loader-spinner";

function Login () {
    const navigate = useNavigate();
    const { setData, setToken, setMembership} = useContext(UserContext)
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    function validate (event){

        event.preventDefault();
        setIsDisabled(true);
        const body = {
            email: email,
            password: password
        }

           axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', body)
                .then((response)=>{
                    setData(response.data);
                    setToken({headers:{
                        Authorization: `Bearer ${response.data.token}`
                   }})
                    if(response.data.membership === null){
                        navigate("/subscriptions")
                      
                    }else{
                        navigate("/home")} 
                })

    }

    function toggleButton () {
        if(isDisabled === true){
            return (
                <button><ThreeDots  color="#FFFFFF" height={17} width={299} /></button>
            )
        }

        return(
            <button type="submit">ENTRAR</button>
        )
    }
const Toggle = toggleButton();
    return(
        <Page>
            <img src={logo} alt="Logo Driven Plus" />
            <form onSubmit={(event)=>validate(event)}>
            <input
            type="email"
            value={email}
            onChange={e=> setEmail(e.target.value)}
            placeholder= "E-mail"
            required
            ></input>
            <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder= "Senha"
            required
            ></input>
            {Toggle}
            </form>
            <Link to="/sign-up" >
            <p>Não possui uma conta? Cadastre-se</p>
            </Link>
            

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
export default Login