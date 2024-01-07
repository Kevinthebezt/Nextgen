import React from 'react';
import { Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import {InstagramOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';


function Footer({ user, notification }) {
    const history = new useHistory();
    const astyle = {color: 'white',
     textDecoration: 'none',
     display: 'flex',
     justifyContent: 'left',
     paddingTop: '10px' }

    return (
        <div className='footer-container' style={{ backgroundColor: '#121418' }}>
            <div className='footer-content' style={{ width: '1200px', margin: 'auto' }}>
                <Row style={{ color: 'white', textAlign: 'left', padding: '0 0 30px 0', backgroundColor: '#121418' }}>
                    <Col span={6}>
                        <h1>Support</h1>
                        <Col span={12}>
                            <p style={astyle}>
                                Address:
                                75 Bui Thi Xuan
                                District 1, Vietnam
                            </p>
                        </Col>
                        <Col span={12}>
                            <p style={astyle}>
                                Email: kienvan0108@gmail.com
                            </p>
                        </Col>
                    </Col>

                    <Col span={6}>
                        <h1>Shopping</h1>
                        <Col span={8}>
                            <a type="primary" style={astyle} onClick={() => history.push("/aboutus")}>
                                About Us
                            </a>
                        </Col>
                        <Col span={8}>
                            <a type="primary" style={astyle} onClick={() => history.push("/cart")}>
                                Cart
                            </a>
                        </Col>
                        <Col span={8}>
                            <a type="primary" style={astyle} onClick={() => history.push("/")}>
                                Shop
                            </a>
                        </Col>
                    </Col>

                    <Col span={6}>
                        <h1>Account</h1>
                        <Col span={8}>
                            <a type="primary" style={astyle} onClick={() => history.push("/information-user")}>
                                Information
                            </a>
                        </Col>
                        <Col span={8}>
                            <a type="primary" style={astyle} onClick={() => history.push("/login")}>
                                Login
                            </a>
                        </Col>
                        <Col span={8}> 
                            <a type="primary" style={astyle} onClick={() => history.push("/signup")}>
                                Sign up
                            </a>
                        </Col>
                    </Col>

                    <Col span={6}>
                        <h1>Follow Us</h1>
                        <Col span={12}>
                            <a href='https://www.instagram.com/kvintebet/'>
                                <InstagramOutlined style={{fontSize: "300%", color:'#b1014c'}}/>
                            </a>
                            <a href='https://www.facebook.com/profile.php?id=100040202079254'>
                                <FacebookOutlined style={{fontSize: "300%", color:'#0866ff', paddingLeft: '10px'}}/>
                            </a>                            <a href='https://mail.google.com/mail/u/0/#inbox?compose=jrjtXDzgdjwvSRpsgrCJCJtPpSkgdXBtnbprmkjSNZpHLvpBrKzRBbDWrgQBShmpwNLxNCxL'>
                                <MailOutlined style={{fontSize: "300%", color:'#c62522', paddingLeft: '10px'}}/>
                            </a>
                        </Col>
                    </Col>
                </Row>
            </div>
        </div>
    )
};
export default Footer;