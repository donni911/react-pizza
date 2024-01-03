import React from 'react'

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1 >Нічого не знайдено :(</h1>
            <p className={styles.description}>На жаль такої сторінки немає.</p>
        </div>
    )
}

export default NotFoundBlock