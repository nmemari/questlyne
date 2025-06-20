import "@/styles/globals.css";

import React, { useState, useEffect } from "react";
import { AppContext } from "@/context/AppContext";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App({ Component, pageProps }) {
  const [quests, setQuests] = useState([]);
  const [userName, setUserName] = useState("");
  const [editing, setEditing] = useState(null);
  const [formActive, setFormActive] = useState(false);
  const [display, setDisplay] = useState("");

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) getUser();
    })
  }, [])

  const addQuest = (quest) => {
    if (!auth.currentUser) {
      setQuests([...quests, quest]);
    } else {
      const userRef = doc(db, "users", auth.currentUser.uid);
      setDoc(
        userRef, {
        quests: [...quests, quest],
      }, { merge: true }
      )
      setQuests([...quests, quest]);
    }

    setEditing(null);
  };

  const updateQuest = (quest) => {
    if (!auth.currentUser) {
      setQuests(
        quests.map((q) => {
          if (q.id === quest.id) {
            return quest;
          } else return q;
        })
      );
    } else {
      const userRef = doc(db, "users", auth.currentUser.uid);
      setDoc(
        userRef, {
        quests: quests.map((q) => {
          if (q.id === quest.id) {
            return quest;
          } else return q;
        }),
      }, { merge: true }
      )
      setQuests(
        quests.map((q) => {
          if (q.id === quest.id) {
            return quest;
          } else return q;
        })
      );
    }

    setEditing(null);
  }

  const deleteQuest = (id) => {
    if (!auth.currentUser) {
      setQuests(
        quests.filter((q) => {
          return q.id !== id;
        })
      );
    } else {
      const userRef = doc(db, "users", auth.currentUser.uid);
      setDoc(
        userRef, {
        quests: quests.filter((q) => {
          return q.id !== id;
        }),
      }, { merge: true }
      )
      setQuests(
        quests.filter((q) => {
          return q.id !== id;
        })
      );
    }
  }

  const appContext = {
    addQuest,
    updateQuest,
    deleteQuest,
    quests,
    setQuests,
    editing,
    setEditing,
    formActive,
    setFormActive,
    userName,
    setUserName,
    display,
    setDisplay,
  }

  return (
    <AppContext.Provider value={appContext}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
