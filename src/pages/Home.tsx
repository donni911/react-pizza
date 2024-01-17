import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Sort, { sortList } from '../components/Sort.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';

import Pagination from '../components/Pagination/index.tsx';
import { FilterSliceState, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice.ts';
import qs from 'qs';
import { fetchPizzaz, FetchPizzasArgs } from '../redux/slices/pizzaSlice.ts';
import { Pizza } from '../redux/slices/cartSlice.ts';
import { useAppDispatch } from '../redux/store.ts';


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    // @ts-ignore
    const { categoryId, sort, currentPage, searchValue } = useSelector(state => state.filter);
    // @ts-ignore
    const { items, status } = useSelector(state => state.pizza);

    const sortType = sort.sortProperty;


    const pizzaz = items.map((item: Pizza) => <PizzaBlock key={item.id} pizza={item} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id));
    };

    const getPizzaz = async () => {

        const params: FetchPizzasArgs = {};

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

        dispatch(fetchPizzaz({ ...params }));
    };

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num));
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
            // @ts-ignore
            const params:FilterSliceState = qs.parse(window.location.search.substring(1));
            // @ts-ignore
            const sort = sortList.find(el => el.sortProperty === params.sortProperty);

            dispatch(setFilters({
                // @ts-ignore
                searchValue: String(params.search),
                // @ts-ignore
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || sortList[0],
            }));

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