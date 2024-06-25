import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import styles from './Articles.module.css';

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [category, setCategory] = useState("Business");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?language=en&category=${category}&q=${searchTerm}&page=${currentPage}&pageSize=5&apiKey=06a09666e4fd49a488dd66c4805ea2c7`);
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data.articles || []);
                setTotalResults(data.totalResults || 0);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category, searchTerm, currentPage]);

    const handleChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleSearch = (keyword) => {
        setSearchTerm(keyword);
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={styles.search}>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.headers}>
                <h4>Sort News By Category:</h4>
                <select id="category" value={category} onChange={handleChange}>
                    {["Business", "Technology", "Entertainment", "Sports"].map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className={styles.articlecon}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <div className={styles.articlelist}>
                            {articles.length > 0 ? (
                                articles.map((article, index) => (
                                    <div key={index} className={styles.article}>
                                        {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                                        <h3>{article.title}</h3>
                                        <p>{article.description}</p>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                    </div>
                                ))
                            ) : (
                                <p>No articles found</p>
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalResults / 5)}
                            paginate={paginate}
                        />
                    </>
                )}
            </div>
        </>
    );
}