import React from 'react';
import { Carousel, Card, FloatButton, Pagination, Input } from 'antd';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import emptyCart from "../../images/emptyCart.png"
import Swal from 'sweetalert2'


function Cart({ user, notification }) {
    const history = useHistory();

    const [dataCart, setDataCart] = useState([])
    const { Meta } = Card;

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const totalMoney = () => {
        let totalMoney = 0
        if (dataCart.length > 0) {
            dataCart.forEach(element => {
                totalMoney += (element.id * 23)
            });
        }
        localStorage.setItem('totalMoney', totalMoney);
        return totalMoney
    }



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
        <div className='cart-container' style={{ minHeight: screenHeight }}>
            {
                dataCart?.length > 0 ?
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <div>
                                <h1 style={{ color: 'white' }}>Your cart</h1>
                                <Button style={{ backgroundColor: '#252730', width: '100px', color: 'white' }} onClick={() => history.push("/checkout")}>Check Out</Button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <h3 style={{ color: 'white' }}>Subtotal money:&nbsp;</h3>
                                <h3 style={{ color: 'white' }}>{totalMoney().toLocaleString()}$</h3>
                            </div>
                        </div>
                    </div> : ''
            }

            <div className='gameList' >

                {
                    dataCart?.length > 0 ? dataCart?.map((item) => {
                        return (
                            <Card
                                hoverable
                                // onClick={() => history.push(`/game/${item?.id}`)}
                                style={{
                                    width: 280,
                                    height: 405,
                                    // paddingBottom: 10,
                                    marginBottom: 20,
                                    marginRight: 20,
                                }}
                                cover={
                                    <img alt={item?.thumbnail} src={item?.thumbnail} onClick={() => history.push(`/game/${item?.id}`)} />
                                }
                                actions={[
                                    <span style={{ fontWeight: '500', color: 'white' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                                    <Button style={{ backgroundColor: '#CD0000', width: '100px', color: 'white' }} onClick={(e) => confirmNotification(e, item?.id)} >Remove</Button>
                                ]}
                            >
                                <div >
                                    <Meta style={{ color: '#b1b1b5', fontWeight: 'bold', fontSize: 20 }} onClick={() => history.push(`/game/${item?.id}`)}
                                        title={item?.title}
                                    />
                                    <div className="card-description"
                                        style={{
                                            paddingTop: 20,
                                            height: '70px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            color: 'white'
                                        }}>
                                        {item?.short_description}
                                    </div>
                                </div>
                            </Card>
                        )
                    }) : <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img style={{ width: 200 }} src={emptyCart} />
                        <h2 style={{ color: 'white' }}>Cart is empty</h2>
                    </div>
                }
            </div>
        </div>

    );
};

export default Cart;