import React, { useState, useContext } from 'react'
import { AppContext } from '@/context/AppContext';

import Image from 'next/image';

import styles from './QuestBox.module.css';

import Trash from '@/public/icons/Trash.svg';
import Edit from '@/public/icons/Edit.svg';
import BtnBlack from '../BtnBlack';
import BtnWhite from '../BtnWhite';

export default function QuestBox({
  quest = {}
}) {
  const {deleteQuest, updateQuest, setEditing, setFormActive} = useContext(AppContext);
  
  const [branchesDone, setBranchesDone] = useState(0);

  const date = new Date();
  const month = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"];

  const handleDone = () => {
    const time = (month[date.getMonth()]) + " " + (date.getDate()) + " " + (date.getFullYear());

    updateQuest({
      ...quest,
      done: !quest.done,
      timeDone: time
    });
  }

  return (
    <div className={styles.container}>
        <div className={styles.questHead}>
          <div className={styles.questTitle}>
            <h1>{quest.title}</h1>
            <Image src={Edit} width={25} height={25} onClick={() => {
              setEditing(quest.id);
              setFormActive(true);
            }}/>
            <Image src={Trash} width={25} height={25} onClick={() => deleteQuest(quest.id)}/>
          </div>
          
          {branchesDone < quest.branches.length ? <></> : <BtnWhite style={{marginRight: 10}} text="Done" width={100} height={35} onClick={handleDone}/>}
        </div>
        <div className={styles.questBody}>
          {
            quest && quest.branches.map((b, index) => {
              const [branchDone, setBranchDone] = useState(false);

              return <div className={styles.subquest} key={index}>
                <div className={styles.subquestHead}>
                  <h2>{b.title}</h2>
                  {branchDone ? <BtnBlack text={"Undo"} width={80} onClick={() => {
                    setBranchDone(false);
                    setBranchesDone(branchesDone - 1);
                  }}/> : <BtnWhite text={"Done"} width={80} onClick={() => {
                    setBranchDone(true);
                    setBranchesDone(branchesDone + 1);
                  }}/>}
                </div>
                <p>{b.desc}</p>
              </div>
            })
          }
        </div>
    </div>
  )
}
