import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pizza } from '../redux/slices/cartSlice';

const PizzaPage: React.FC = () => {
    const { id } = useParams();
    const [data, setData] = useState<Pizza>();

    useEffect(() => {
        const fetchPizza = async () => {
            try {

                const { data } = await axios.get('https://657c4add853beeefdb991d87.mockapi.io/items', {
                    params: { id }
                });
                console.log('pizzas');

                setData(data[0]);

            } catch (error) {
                console.log('Error fetching(');
            }
        };

        fetchPizza();
    }, []);

    if (!data) {
        return 'Loading';
    }

    return (
        <div className='container'>
            <img src={data.imageUrl} alt="" />
            <h2>{data.title}</h2>
            <h4>{data.price}</h4>
        </div>
    );
};

export default PizzaPage;