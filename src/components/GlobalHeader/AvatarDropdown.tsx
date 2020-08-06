import React from 'react';
import { history, connect } from 'umi'
import { Avatar, Row, Col, Menu } from 'antd';

import { MOMERY, Toast, $POST } from '@utils/index'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import APIS from '@/Apis'
import HeaderDropdown from '../HeaderDropdown';

import IconAvatar from '@assets/images/icons/login/icon_avatar.svg'
import IconLoginOut from '@assets/images/logout.png'

import styles from './avatar.less';

const { API_LOGIN_INDEX_OUT } = APIS.API_LOGIN_INDEX

const AvatarDropdown = (props: any) => {
  const loginOut = () => {
    // return
    history.replace('/user/login')
    return
    $POST(API_LOGIN_INDEX_OUT).then(({ code }) => {
      if (code === 200) {
        MOMERY.clearCache()
        Toast.toast('退出成功')
        history.replace('/user/login')
      }
    })
  }

  const { USER_INFO } = MOMERY.memoInfo
  const menu = true
  const onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      // const { dispatch } = props;

      // if (dispatch) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      // }
      loginOut()
      return;
    }

    history.push(`/account/${key}`);
  };
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <Row className={styles.avatar_container}>
      <Col>
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <div className={styles.avatar_hover}>
          <Avatar size="small" className={styles.avatar} src={IconAvatar} alt="avatar" />
          <span className={styles.name}>Hi,{USER_INFO && USER_INFO.name}</span>
            {/* <span className={styles.name}>注销</span> */}
          </div>
        </HeaderDropdown>
        
      </Col>
      {/* <Col onClick={loginOut}>
        
        
      </Col> */}
    </Row>
  )
}

export default connect()(AvatarDropdown) 



