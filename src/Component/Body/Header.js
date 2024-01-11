import '../../Css/Header.css'
import { useHistory } from 'react-router-dom';
import { Affix, Avatar, Menu, Button } from 'antd';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, LoginOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { react, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Swal from 'sweetalert2'




function Nav({ user, notification }) {
  const history = useHistory();
  const [current, setCurrent] = useState('mail');


  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem("user");
      notification('success', 'Logged out successfully !')
      history.push("/")
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmNotification = (e) => {
    e.preventDefault()
    return Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to sign out?",
      icon: 'warning',
      width: '32em',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        return handleLogout();
      }
    })
  }

  const items = [
    // {
    //   key: '',
    //   icon: <img src='https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/326389384_898057077994777_6756464218359208492_n.png?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEg9cBw5Soi6yfdDkcKQSMWp3CHWaADEPSncIdZoAMQ9Gsixd7wsF_dzAka7CG-NkTxpBBfui-nG2gonEnB28iL&_nc_ohc=QdH7XeW_oDIAX-VSU_L&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfATtRYbiIvpLBQc8i6-yWlPkqYgFDG3fqc0HXmEZ4MbXw&oe=659B7CAF' style={{width: '10%', }} />,
    // },
    {
      // label: 'HOME',
      key: '',
      icon: <img src='https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/326389384_898057077994777_6756464218359208492_n.png?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEg9cBw5Soi6yfdDkcKQSMWp3CHWaADEPSncIdZoAMQ9Gsixd7wsF_dzAka7CG-NkTxpBBfui-nG2gonEnB28iL&_nc_ohc=QdH7XeW_oDIAX-VSU_L&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfATtRYbiIvpLBQc8i6-yWlPkqYgFDG3fqc0HXmEZ4MbXw&oe=659B7CAF' style={{width: '180%' }} />,
      style: {maxWidth: 'min-content', top: '8px', marginRight: '8px'}
      // icon: <HomeOutlined />,
    },
    {
      label: 'CART',
      key: 'cart',
      icon: <ShoppingCartOutlined />,
    },
    {
      label: 'About Us',
      key: 'aboutus',
      icon: <InfoCircleOutlined />,
    },
    !user ?
      {
        label: 'Login/Signup',
        key: 'login',
        icon: <LoginOutlined />,
      } : '',
    user ?
      {
        label:
          <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>
            {
              user?.avt ? <Avatar src={user?.avt} style={{ marginRight: 10 }} /> : <Avatar style={{ marginRight: 10 }} icon={<UserOutlined />} />
            }
            <span>{user?.userName}</span>
          </div>,
        key: 'account',
        children: [
          {
            type: 'group',
            label: 'Profile',
            children: [
              {
                label: 'Information',
                key: 'information-user',
              },
              {
                label: 'Add money',
                key: 'coming-soon',
              },
              {
                label: 'VIP activation',
                key: 'activation',
              },
              user ?
                {
                  label: <div onClick={confirmNotification}>Log out</div>,
                  key: 'logout'
                } : '',
            ],
          },
        ],
      } : '',
  ];

  const onClick = (e) => {
    if (e.key === 'logout') {
      return;
    }
    else if (e.key === 'activation') {
      history.push(`/coming-soon`)
      setCurrent(e.key);
    }
    else {
      history.push(`/${e.key}`)
      setCurrent(e.key);
    }
  };


  return (
    <Affix offsetTop={0}>
      <div style={{ position: 'relative', zIndex: 99999}}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </div>
    </Affix>

  );
};

export default Nav;