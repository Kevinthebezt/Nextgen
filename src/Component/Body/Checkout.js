import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Empty } from 'antd';
import emptyCart from "../../images/emptyCart.png"
import Swal from 'sweetalert2'
import '../../Css/User.css'
import { Divider, Button } from 'antd';


let discount = Math.floor(Math.random() * (30 - 10) + 10);

const Checkout = ({ user, notification }) => {
    const history = useHistory();


    const [dataCart, setDataCart] = useState([])

    const totalMoney = () => {
        let totalMoney = localStorage.getItem('totalMoney')
        return totalMoney
    }

    const discountedMoney = () => {
        let totalMoney = localStorage.getItem('totalMoney')
        let discountedMoney = Math.floor(totalMoney * (1 - discount / 100) + 1)
        return discountedMoney
    }

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const confirmNotification = (e, id) => {
        e.preventDefault()
        return Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to remove from cart?",
            icon: 'warning',
            width: '32em',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                subtractionCart(id);
            }
        })
    }


    const subtractionCart = (itemId) => {
        const inCart = localStorage.getItem(`carts${user?.uid}`);
        if (user?.uid) {
            if (inCart) {
                let isCart = JSON.parse(inCart);
                let find = false;
                const newData = isCart.filter(item => item?.id !== itemId);
                setDataCart(newData)
                localStorage.setItem(`carts${user?.uid}`, JSON.stringify(newData));
            } else {
                // localStorage.setItem(`carts${user?.uid}`, JSON.stringify([cart]));
                return notification('error', '!')
            }
        } else {
            return notification('error', '!')
        }

    }



    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const inCart = localStorage.getItem(`carts${user?.uid}`);
        if (inCart) {
            setDataCart(JSON.parse(inCart));
        }
    }, [])

    return (
        <div className="container-user" style={{ minHeight: screenHeight, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card-user" style={{ margin: '30px 0' }}>
                <div className="card-text">
                    <div className="portada" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '0 20px' }}>
                        <div className='checkout-total'>
                            <p>
                                Subtotal: {totalMoney()}$
                            </p>
                            <p style={{ fontSize: 'small' }}>
                                Discount today: {discount}%
                            </p>
                        </div>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <div className='checkout-total'>
                            Total: {discountedMoney()}$
                        </div>
                    </div>
                    <div className="title-total" style={{ paddingLeft: '50px', paddingTop: '20px' }}>
                        <div className="title">Checkout</div>
                        <div className='checkout-products-container'>
                        <Divider style={{ backgroundColor: 'black', margin: '10px' }} />
                            {
                                dataCart?.length > 0 ? dataCart?.map((item) => {
                                    return (
                                        <>
                                            <div style={{ display: 'flex', height: '100px', padding: '10px 0' }}>
                                                <div>
                                                    <img alt={item?.thumbnail} src={item?.thumbnail} style={{ width: '100px', height: '100px' }} />
                                                </div>
                                                <div style={{ paddingLeft: '5px' }}>
                                                    {item?.title}
                                                </div>
                                            </div>
                                            <Divider style={{ backgroundColor: 'black', margin: '10px' }} />
                                        </>
                                    )
                                }) : <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={emptyCart} />
                                    <h2 style={{ color: 'white' }}>List is empty</h2>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Checkout