import React from 'react'
import Link from 'next/link'

import styles from './BtnWhite.module.css'

export default function BtnWhite({
    text,
    width,
    height,
    onClick = () => {},
    style
}) {
  return (
    <div className={styles.container} style={{
        ...style,
        width: width,
        height: height,
        paddingBottom: 10
    }}>
        <div onClick={onClick} className={styles.btn}>{text}</div>
    </div>
  )
}