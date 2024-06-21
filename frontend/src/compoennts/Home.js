import React from 'react';
import ArticleList from './ArticleList';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div>
            <h1 className={styles.head}>Welcome to the News Portal</h1>
            <ArticleList />
        </div>
    );
}
