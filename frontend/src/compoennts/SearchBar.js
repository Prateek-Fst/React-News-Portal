import React, { useState } from 'react';
import styles from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className={styles.search}>
            <input
                type="text"
                placeholder="Search articles by keyword..."
                value={searchTerm}
                onChange={handleChange}


            />
            <button onClick={handleSearch}>Search</button>

        </div>
    );
}
