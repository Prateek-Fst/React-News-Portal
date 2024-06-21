import { combineReducers } from 'redux';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    SET_CATEGORY,
    SET_SEARCH_TERM,
    SET_CURRENT_PAGE
} from './actions';

const initialState = {
    loading: false,
    articles: [],
    totalResults: 0,
    category: 'Business',
    searchTerm: '',
    currentPage: 1,
    error: ''
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload.articles,
                totalResults: action.payload.totalResults,
                error: ''
            };
        case FETCH_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                articles: [],
                totalResults: 0,
                error: action.payload
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                currentPage: 1 // Reset to first page on category change
            };
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
                currentPage: 1 // Reset to first page on new search
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    articles: articlesReducer,
});

export default rootReducer;
