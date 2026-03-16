import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import mobileImage from "../assets/mobile.png";
export default function LandingPage() {


    const router = useNavigate();

    const createMeeting = () => {
        const code = Math.random().toString(36).slice(2, 10);
        router(`/${code}`);
    };

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>Let's Talk</h2>
                </div>
                <div className='navList'>
                    <p onClick={() => {
                        router("/aljk23")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

                    <p>Meet face to face, share moments, and stay close
                        no matter where you are.</p>
                    <div className="landingActions">
                        <div role='button'>
                            <Link to={"/auth"}>Get Started</Link>
                        </div>
                        <div role='button' onClick={createMeeting}>
                            <p>New Meeting</p>
                        </div>
                    </div>
                </div>
                <div>

                    <img src={mobileImage} alt="image" />

                </div>
            </div>



        </div>
    )
}