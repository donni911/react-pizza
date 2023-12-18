import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import PizzaBlock, { Pizza } from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("https://657c4add853beeefdb991d87.mockapi.io/items")
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
                setIsLoading(false)
            });
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {isLoading ?
                    [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map((item: Pizza) => <PizzaBlock key={item.id} pizza={item} />)}
            </div>
        </>
    )
}

export default Home