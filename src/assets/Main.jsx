import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';

function Main() {
    const [userName , setuserName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5173/api/auth/signUp', {
                userName, 
                password,
                email
            });
    
            console.log(response);
    
            const responseDiv = document.getElementById('responseDiv');
            responseDiv.innerText = response.data.message;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <div id='signUp'>
                <h1>Sign Up</h1>
                <div>
                    <input placeholder='userName' value={userName} onChange={(e) => setuserName(e.target.value)}/>
                    <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input placeholder='Email-ID' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button onClick={handleSubmit}>Submit</button>

                <div id='responseDiv'></div>
            </div>

            {/* <div id='Login'>
                <h1>Login</h1>

                <div>
                    <input placeholder='Email-ID' />
                    <input placeholder='password' />
                </div>

                <button>Submit</button>
            </div> */}
        </Container>
    )
}

export default Main

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(#001223, #004387);
    display: flex;
    justify-content: center;
    align-items: center;

    #signUp {
        margin: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div {
            display: flex;
            flex-direction: column;

            input {
                margin: 20px 0px;
                height: 3vh;
                border-radius: 20px;
                padding: 5px;
                width: 15vw;
                font-size: 1.15rem;
            }

        }
        button {
            border-radius: 20px;
            padding: 5px;
            background-color: orange;
        }
    }

    #Login {
        margin: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div {
            display: flex;
            flex-direction: column;

            input {
                margin: 20px 0px;
                height: 3vh;
                border-radius: 20px;
                padding: 5px;
                width: 15vw;
                font-size: 1.15rem;
            }

        }
        button {
            border-radius: 20px;
            padding: 5px;
            background-color: orange;
        }
    }
`