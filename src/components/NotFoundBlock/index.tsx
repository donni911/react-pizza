import React from 'react'

import styles from './NotFoundBlock.module.scss';

console.log(styles);

const NotFoundBlock = () => {
    return (
        <h1 className={styles.root}>Нічого не знайдено :(</h1>
    )
}

export default NotFoundBlock