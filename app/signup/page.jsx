'use client';

import { useState } from 'react';
import { auth, googleAuth, signInWithPopup, createUserWithEmailAndPassword } from '../firebase/Firebase';

function SignUp() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const googleClick = () => {
        signInWithPopup(auth, googleAuth)
            .then((result) => {
                alert(`SignUp Successful: ${result.user.email}`);
                 window.location.href = '/homepage'
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    };

    const signup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pwd)
            .then((res) => {
                alert(`SignUp Successful: ${res.user.email}`);
                 window.location.href = '/login'
            })
            .catch((error) => {
                console.error(error);
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className="bg-slate-950 flex flex-col justify-center items-center h-[100vh] text-white">
            <h2 className="text-5xl font-[600] relative z-[1]">SignUp to zoomNote</h2>
            <input type="text" className="zoomInput shadow block w-full input bg-slate-700 py-3 px-5" disabled />
            <hr />
            <form className="w-[30%] flex lg:w-[90%] mt-4 mb-2 justify-center" onSubmit={signup}>
                <div className="">                <div className="formContent gap-4 justify-center">
                    <div>
                        <label htmlFor="fname" className="text-[13px] pl-2">First name</label>
                        <input className="block w-[95%] input bg-slate-700 py-4 px-5 text-[14px]"
                        style={
                            {border: '2px solid white'}
                        }
                            type="text"
                            name="fname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="fname"
                            placeholder="First name"
                            required />
                    </div>
                    <div>
                        <label htmlFor="lname" className="text-[13px] pl-2">Last name</label>
                        <input className="block w-[95%] input bg-slate-700 py-4 px-5 text-[14px]"
                          style={
                            {border: '2px solid white'}
                        }
                            type="text"
                            name="lname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            id="lname"
                            placeholder="Last name"
                            required />
                    </div>
                </div>
                <div className="formContent">
                    <label htmlFor="email" className="text-[13px] pl-2">Enter Email</label>
                    <input className="block w-[95%] input bg-slate-700 py-4 px-5 text-[14px]"
                      style={
                        {border: '2px solid white'}
                    }
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required />
                </div>
                <div className="formContent">
                    <label htmlFor="pwd" className="text-[13px] pl-2">Password</label>
                    <input className="block w-[95%] input bg-slate-700 py-4 px-5 text-[14px]"
                      style={
                        {border: '2px solid white'}
                    }
                        type="password"
                        name="pwd"
                        id="pwd"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Password should include symbols"
                        required />
                </div>
                <div className="formContent">
                    <label htmlFor="file" className="text-[13px] pl-2">Choose profile</label>
                    <input type="file" name="file" id="file" placeholder="file" className="block w-[95%] input bg-slate-700 py-4 px-5 text-[14px]"
                    
                    style={
                        {border: '2px solid white'}
                    }/>
                </div>
             
                </div>
                <div className="my-6  w-[30%] text-center bg-slate-900 py-4 rounded-[20px] h-full flex flex-col items-center justify-center gap-[50px]">
                    
                <button onClick={googleClick} >Continue with Google</button>
                <button>Continue with Github</button>
                <button>Continue with Facebook</button>
                <button>Continue with Github</button>
                <button>Continue with Github</button>
                </div>
                
            </form>
        </div>
    );
}

export default SignUp;
