import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, QRCode } from 'antd';
import { useState, useEffect } from 'react';
const About = () => {
    const [size, setSize] = useState(260);
    const increase = () => {
        setSize((prevSize) => {
            const newSize = prevSize + 10;
            if (newSize > 300) {
                return 300;
            }
            return newSize;
        });
    };
    const decline = () => {
        setSize((prevSize) => {
            const newSize = prevSize - 10;
            if (newSize < 48) {
                return 48;
            }
            return newSize;
        });
    };

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
        <div className='about-container' style={{ display: 'flex', flexDirection: 'column', margin: 120, marginBottom: 30, marginTop: 30, padding: 50, alignItems: 'center', backgroundColor: '#121212', borderRadius: '3%', color: '#bdbdbd', fontSize: 20 }}>
            <p>Welcome to RevoltGRep, your ultimate destination for an unparalleled gaming experience! At RevoltGRep, we understand the passion and excitement that gaming brings to life, and we're thrilled to introduce a revolutionary game renting platform designed with gamers in mind.</p>
            <p>Dive into a world where gaming knows no bounds, and the possibilities are as vast as your imagination. Whether you're a seasoned gamer looking to explore new titles or a casual player eager to try out the latest releases, RevoltGRep is here to redefine how you access and enjoy your favorite games.</p>
            <p>Our platform boasts an extensive and ever-growing library of the hottest and most sought-after titles across various gaming platforms. From action-packed adventures to immersive simulations, we've curated a diverse collection to cater to every gaming preference.</p>
            <p>RevoltGRep is not just a place to rent games; it's a community that celebrates the love for gaming. Discover a user-friendly interface, seamless navigation, and innovative features that make your gaming journey enjoyable from start to finish. Say goodbye to the hassle of purchasing expensive games and hello to the freedom of exploring new titles at a fraction of the cost.</p>
            <p>Join the gaming revolution with RevoltGRep and unlock a world of gaming possibilities right at your fingertips. Your next gaming adventure is just a click away!</p>
        </div>
    );
};
export default About;