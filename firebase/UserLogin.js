import React, { useState, useContext } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

import { AppContext } from '@/context/AppContext';

import InputBox from '@/components/InputBox';

import styles from './firebase.module.css'
import BtnBlack from '@/components/BtnBlack';
import BtnWhite from '@/components/BtnWhite';

export default function UserRegister() {
    const { quests, setQuests, userName, setUserName, setDisplay } = useContext(AppContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInUser = async () => {
        try { 
            await signInWithEmailAndPassword(auth, email, password); 
        }
        catch (error) { 
            alert(error);
            setEmail("");
            setPassword("");
        }
    }

    const getUser = async () => {
        try {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const user = docSnap.data();
                setUserName(user.username);
                setQuests(user.quests);
            } else console.log("No such document!");

            setDisplay("home");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={styles.container}>
            <h1>QuestLyne</h1>

            <div className={styles.inputCont}>
                <InputBox placeholder={"Enter your Email..."} width={"100%"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputBox placeholder={"Enter your Password..."} width={"100%"} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>


            <div className={styles.btnCont}>
                <BtnBlack width={"85%"} text={"Log In"} onClick={() => {
                    signInUser();
                    getUser();
                }} />
                <BtnWhite text={"Continue as Guest"} width={"85%"} onClick={() => { setDisplay("home") }} />
                <p>Don't have an account? <span onClick={() => setDisplay("register")}>Register</span></p>
            </div>

        </div>
    )
}
