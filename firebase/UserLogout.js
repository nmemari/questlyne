import React, { useState, useContext } from 'react'
import Link from 'next/link'

import { confirmAlert } from 'react-confirm-alert'

import { auth } from './firebaseConfig'
import { signOut } from 'firebase/auth'

import { AppContext } from '@/context/AppContext'

import BtnWhite from '@/components/BtnWhite'

export default function UserLogout() {
    const { quests, setQuests, userName, setUserName, setDisplay } = useContext(AppContext);

    const logout = async () => {
        await signOut(auth);
    }

    const alert = () => {
        if(confirm("Are you sure you want to log out?") === true) {
            logout();
            setDisplay("signin");
            setQuests([]);
            setUserName("");
        } else return null;
    }

    return <Link style={{ textDecoration: "none" }} href={"/"}>
        <BtnWhite style={{ marginRight: 50 }} width={100} text={'Log Out'} onClick={alert} />
    </Link>
}
