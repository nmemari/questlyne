import React, { useState, useContext } from 'react'
import { AppContext } from '@/context/AppContext'

import Image from 'next/image'
import Link from 'next/link'

import styles from './NavBar.module.css'

import Account from '@/public/icons/Account.svg'
import AddSquare from '@/public/icons/AddSquare.svg'
import Settings from '@/public/icons/Settings.svg'
import Home from '@/public/icons/Home.svg'

export default function Navbar() {
  const { formActive, setFormActive, editing, setEditing } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.iconCont}>
        <Link href={'/'}>
          <Image src={Home} width={45} height={45} />
        </Link>
        <Link href={'/'}>
          <Image src={AddSquare} width={45} height={45} onClick={() => {
            setEditing("new");
            setFormActive(true);
          }} />
        </Link>
        <Link href={'/account'}>
          <Image src={Account} width={45} height={45} />
        </Link>

      </div>
    </div>
  )
}
