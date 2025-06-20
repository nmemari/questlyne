import React, { useState, useContext } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig';

import { AppContext } from '@/context/AppContext';
import { doc, setDoc } from 'firebase/firestore';

import InputBox from '@/components/InputBox';

import styles from './firebase.module.css'
import BtnBlack from '@/components/BtnBlack';
import BtnWhite from '@/components/BtnWhite';

export default function UserRegister() {
    const { quests, userName, setUserName, setDisplay } = useContext(AppContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const addUser = async () => {
        if (email && password && userName) {
            try {
                const results = await createUserWithEmailAndPassword(auth, email, password);
                console.log(results.user);

                const userRef = doc(db, "users", results.user.uid);

                setDoc(
                    userRef,
                    {
                        username: userName,
                        quests: quests
                    }, { merge: true }
                )

                setDisplay("home");
            } catch (error) {
                alert(error)
            }
        } else alert("Please Fill in All Fields");
    }

    return (
        <div className={styles.container}>
            <h1>QuestLyne</h1>

            <div className={styles.inputCont}>
                <InputBox placeholder={"Enter your Desired Username..."} width={"100%"} value={userName} onChange={(e) => setUserName(e.target.value)} />
                <InputBox placeholder={"Enter your Email..."} width={"100%"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputBox placeholder={"Enter a Strong Password..."} width={"100%"} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>


            <div className={styles.btnCont}>
                <BtnBlack width={"85%"} text={"Register"} onClick={() => {
                    addUser();
                }} />
                <BtnWhite width={"85%"} text={"Continue as Guest"} onClick={() => { setDisplay("home") }} />
                <p>Already have an account? <span onClick={() => setDisplay("signin")}>Sign In</span></p>
            </div>

        </div>
    )
}
