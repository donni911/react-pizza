import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories.tsx';
import PizzaBlock, { Pizza } from '../components/PizzaBlock/index.tsx';
import Sort, { sortList } from '../components/Sort.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';

import Pagination from '../components/Pagination/index.tsx';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice.ts';
import qs from 'qs';
import { fetchPizzaz } from '../redux/slices/pizzaSlice.ts';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(state => state.filter);
    const { items, status } = useSelector(state => state.pizza);

    const sortType = sort.sortProperty;


    const pizzaz = items.map((item: Pizza) => <PizzaBlock key={item.id} pizza={item} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const getPizzaz = async () => {

        const params: Params = {};

        if (categoryId > 0) {
            params.category = categoryId;
        }

        if (sortType) {
            params.order = sortType[0] === '-' ? 'desc' : 'asc';
            params.sortBy = sortType.replace('-', '');
        }

        if (searchValue) {
            params.search = searchValue;
        }

        if (currentPage) {
            params.page = currentPage;
        }


        dispatch(fetchPizzaz(params));


    };

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num));
    };

    type Params = {
        category?: number | string,
        order?: string,
        sortBy?: number | string,
        search?: string,
        page?: string;
    };

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, currentPage, sortType]);


    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzaz();
        }

        isSearch.current = false;

    }, [categoryId, searchValue, currentPage, sortType]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(el => el.sortProperty === params.sortProperty);

            dispatch(setFilters({ ...params, sort }));

            isSearch.current = true;
        }
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {status == 'pending' ?
                    skeletons
                    : pizzaz}
            </div>
            {status == 'error' && <div>Щось пішло не так спробйте пізніше.</div>}
            {status == 'success' && pizzaz.length && <h2>На жаль немає піц по заданому параметру</h2>}
            {status == 'success' && <Pagination currentPage={currentPage} onChangePage={onChangePage} />}
        </>
    );
};

export default Home;