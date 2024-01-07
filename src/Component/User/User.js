import React from 'react'
import { Col, Avatar } from 'antd';
import { useEffect, useState } from 'react'
import "../../Css/User.css"
import { InstagramOutlined, MailOutlined, FacebookOutlined } from "@ant-design/icons";

import userImg from "../../images/user.png"

const User = ({ user }) => {
    console.log(user)

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

    return (
        <div className="container-user" style={{ height: screenHeight, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card-user">
                <div className="img-avatar">
                    {
                        user?.avt ? <img src={user?.avt} /> : <img src={userImg} />
                    }

                </div>
                <div className="card-text">
                    <div className="portada">
                    </div>
                    <div className="title-total">
                        <div className="title">Member</div>
                        <h2>{user?.userName}</h2>
                        <div className="desc">Email: &nbsp;{user?.email}</div>
                        <div className="actions">
                            <a href='https://www.instagram.com/kvintebet/'>
                                <InstagramOutlined style={{ fontSize: "200%", color: '#b1014c' }} />
                            </a>
                            <a href='https://www.facebook.com/profile.php?id=100040202079254'>
                                <FacebookOutlined style={{ fontSize: "200%", color: '#0866ff', paddingLeft: '5px' }} />
                            </a>
                            <a href='https://mail.google.com/mail/u/0/#inbox?compose=jrjtXDzgdjwvSRpsgrCJCJtPpSkgdXBtnbprmkjSNZpHLvpBrKzRBbDWrgQBShmpwNLxNCxL'>
                                <MailOutlined style={{ fontSize: "200%", color: '#c62522', paddingLeft: '5px' }} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default User