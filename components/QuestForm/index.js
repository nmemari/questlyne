import React, { useState, useContext } from 'react';
import { nanoid } from 'nanoid';

import { AppContext } from '@/context/AppContext'

import styles from './QuestForm.module.css'

import InputBox from '../InputBox'
import BtnBlack from '../BtnBlack';
import BtnWhite from '../BtnWhite';

export default function QuestForm() {

    const { addQuest, updateQuest, quests, editing, setEditing, formActive, setFormActive } = useContext(AppContext);

    const date = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let initialData = {
        title: '',
        branches: [],
        done: false,
        timeDone: ""
    }

    if (editing !== "new") {
        initialData = quests.find((q) => {
            return q.id === editing;
        })
    }

    const [quest, setQuest] = useState(initialData);
    const [branch, setBranch] = useState({
        title: '',
        desc: '',
        done: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const time = (month[date.getMonth()]) + " " + (date.getDay()) + " " + (date.getFullYear());

        if (quest.title == "" || quest.title == null) {
            alert("Your Quest Needs a Title!");
        } else {
            if (editing === "new") {
                addQuest({
                    ...quest,
                    id: nanoid(),
                    timeAdded: time
                });
                setQuest(initialData);
                setFormActive(false);
                console.log(quests);
            } else {
                updateQuest(quest);
                setQuest(initialData);
                setFormActive(false);
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1>Add a Questline</h1>
            <form className={styles.formCont}>
                <InputBox placeholder={"Enter the Quest's Title..."} width={"75%"} value={quest.title} onChange={(e) => setQuest({ ...quest, title: e.target.value })} />

                {
                    quest && quest.branches.map((b, index) => {
                        return <div className={styles.branchPreview} key={index}>
                            <div className={styles.branchPreviewText}>
                                <h1>{b.title}</h1>
                                <p>{b.desc}</p>
                            </div>
                            <BtnWhite style={{ marginRight: 20 }} text={"Remove Branch"} width={150} href={''} onClick={() => setQuest({ ...quest, branches: quest.branches.filter((i) => { return i != b }) })} />
                        </div>
                    })
                }

                <div className={styles.branchInputs}>
                    <InputBox placeholder={"Branch Title..."} width={"100%"} value={branch.title} onChange={(e) => setBranch({ ...branch, title: e.target.value })} />
                    <InputBox placeholder={"Branch Description..."} width={"100%"} value={branch.desc} onChange={(e) => setBranch({ ...branch, desc: e.target.value })} />
                </div>

                <BtnBlack text={"Add Branch"} width={"80%"} href={''} onClick={() => {
                    if (branch.title == "" || branch.title == null) {
                        alert("Give Your Quest's Branch a Title!");
                    } else if (branch.desc == "" || branch.desc == null) {
                        alert("Give Your Quest's Branch a Description!");
                    } else {
                        setQuest({ ...quest, branches: [...quest.branches, { title: branch.title, desc: branch.desc, done: false }] })
                        setBranch({
                            id: nanoid(),
                            title: '',
                            desc: '',
                            done: false,
                        })
                    }
                }} />

                <div className={styles.btnRow}>
                    <BtnBlack text={"Cancel"} width={"30%"} href={''} onClick={() => {
                        setQuest(initialData);
                        setFormActive(false);
                        setEditing(null);
                    }} />
                    <BtnWhite text={editing == "new" ? "Add QuestLyne" : "Update Questlyne"} width={"60%"} href="" onClick={handleSubmit} />
                </div>
            </form>
        </div>
    )
}
