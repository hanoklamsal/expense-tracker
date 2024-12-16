import React from 'react'
import Transaction from '../Transaction/Transaction'
import TopExpenses from '../TopExpenses/TopExpenses'
import styles from './Main.module.css'

const Main = () => {
  return (
    <div className={styles.mainContainer}>
      <Transaction/>
      <TopExpenses/>
    </div>
  )
}

export default Main