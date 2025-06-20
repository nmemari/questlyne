import React, { useState, useContext } from 'react'
import Image from 'next/image'

import { AppContext } from '@/context/AppContext'

import styles from './QuestDoneBox.module.css'

import Undo from '@/public/icons/UndoWhite.svg'
import Trash from '@/public/icons/TrashWhite.svg'

export default function QuestDoneBox({
    quest = {}
}) {
  const { quests, updateQuest, deleteQuest } = useContext(AppContext);

  const handleUndo = () => {
    updateQuest({
      ...quest,
      done: !quest.done,
      timeDone: ""
    })
  }

  return (
    <div className={styles.container}>
        <div className={styles.titleBox}>
            <h1>{quest.title}</h1>
            <p>Completed on {quest.timeDone}</p>
        </div>
        <div className={styles.btnBox}>
            <Image src={Undo} width={30} height={30} onClick={() => {
              if(confirm("Are you sure you want to undo your Questlyne?") === true) {
                handleUndo();
              }
            }}/>
            <Image src={Trash} width={30} height={30} onClick={() => {
              if(confirm("Are you sure you want to delete your Questlyne? \n(You won't able to recover it)") === true) {
                deleteQuest(quest.id);
              }
            }}/>
        </div>
    </div>
  )
}
