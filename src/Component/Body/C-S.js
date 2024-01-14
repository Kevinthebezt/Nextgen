import React from 'react';
import { Empty } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react'


function CS() {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    
    console.log(screenHeight)

    return (
        <div style={{ color: 'gray', paddingTop: '40px', paddingBottom: '40px', minHeight: screenHeight }}>
            <NotificationOutlined style={{ fontSize: '90px' }} />
            <h1>Coming Soon</h1>
        </div>
    )
}

export default CS