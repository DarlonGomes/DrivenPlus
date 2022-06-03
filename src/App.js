import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/authentication/Login"
import SignUp from "./components/authentication/SignUp"
import Plan from "./components/onboard/subscription/Plan"
import Home from "./components/onboard/homepage/Home"
import Subscription from "./components/onboard/subscription/Subscription"


export default function App () {

    return
    (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/subscriptions" element={<Subscription/>} />
            <Route path="/subscriptions/:planID" element={<Plan/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
        </BrowserRouter>
    )
}