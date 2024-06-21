import axios from 'axios';

const API_KEY = "06a09666e4fd49a488dd66c4805ea2c7";

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const fetchArticlesRequest = () => ({
    type: FETCH_ARTICLES_REQUEST,
});

const fetchArticlesSuccess = (articles, totalResults) => ({
    type: FETCH_ARTICLES_SUCCESS,
    payload: { articles, totalResults },
});

const fetchArticlesFailure = (error) => ({
    type: FETCH_ARTICLES_FAILURE,
    payload: error,
});

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: category,
});

export const setSearchTerm = (searchTerm) => ({
    type: SET_SEARCH_TERM,
    payload: searchTerm,
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});

export const fetchArticles = (category, searchTerm, page) => {
    return async (dispatch) => {
        dispatch(fetchArticlesRequest());
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/${searchTerm ? 'everything' : 'top-headlines'}?${searchTerm ? `q=${searchTerm}` : `country=us&category=${category.toLowerCase()}`}&pageSize=5&page=${page}&apiKey=${API_KEY}`
            );
            dispatch(fetchArticlesSuccess(response.data.articles, response.data.totalResults));
        } catch (error) {
            dispatch(fetchArticlesFailure(error.message));
        }
    };
};
