import React from 'react'

import styles from './InputBox.module.css'

export default function InputBox({
    placeholder,
    height,
    width,
    value,
    onChange = () => {}
}) {
  return <input className={styles.input} placeholder={placeholder} value={value} onChange={onChange} style={{width: width, height: height}}/>
}
    