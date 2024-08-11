'use client';

import { useState } from 'react';
import { auth, googleAuth, signInWithPopup, createUserWithEmailAndPassword } from '../firebase/Firebase';
import { useRouter } from 'next/navigation';

function SignUp() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();

    const googleClick = () => {
        signInWithPopup(auth, googleAuth)
            .then((result) => {
                alert(`SignUp Successful: ${result.user.email}`);
                router.push('/homepage');
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
                router.push('/login');
            })
            .catch((error) => {
                console.error(error);
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className="bg-slate-950 flex flex-col justify-center items-center h-[100vh] text-white">
            <h2 className="text-5xl font-[600] relative z-[1]">SignUp to zoomNote</h2>
            <form className="w-[30%] flex flex-col mt-4 mb-2" onSubmit={signup}>
                <div className="formContent mb-4">
                    <label htmlFor="fname" className="text-[13px] pl-2">First name</label>
                    <input
                        className="block w-full input bg-slate-700 py-4 px-5 text-[14px]"
                        style={{ border: '2px solid white' }}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id="fname"
                        placeholder="First name"
                        required />
                </div>
                <div className="formContent mb-4">
                    <label htmlFor="lname" className="text-[13px] pl-2">Last name</label>
                    <input
                        className="block w-full input bg-slate-700 py-4 px-5 text-[14px]"
                        style={{ border: '2px solid white' }}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id="lname"
                        placeholder="Last name"
                        required />
                </div>
                <div className="formContent mb-4">
                    <label htmlFor="email" className="text-[13px] pl-2">Enter Email</label>
                    <input
                        className="block w-full input bg-slate-700 py-4 px-5 text-[14px]"
                        style={{ border: '2px solid white' }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="example@gmail.com"
                        required />
                </div>
                <div className="formContent mb-4">
                    <label htmlFor="pwd" className="text-[13px] pl-2">Password</label>
                    <input
                        className="block w-full input bg-slate-700 py-4 px-5 text-[14px]"
                        style={{ border: '2px solid white' }}
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        id="pwd"
                        placeholder="Password should include symbols"
                        required />
                </div>
                <button type="submit" className="mt-5 text-center bg-slate-900 w-full py-4 rounded-[20px]">SignUp</button>
            </form>
            <button onClick={googleClick} className="my-1 text-center bg-slate-900 w-auto px-24 py-4 rounded-[20px]">Continue with Google</button>
        </div>
    );
}

export default SignUp;
