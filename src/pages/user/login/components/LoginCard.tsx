/*
 * @description: login 登录表单
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-18 15:12:10
 * @LastEditTime: 2020-08-05 15:10:50
 */ 
import React from 'react'
import { Card, Row, Col } from 'antd'
import LoginForm from './LoginForm'

import PIC_MCD from '@assets/images/placeholder.png'

import styles from './LoginCard.less'

const LoginCard = () => {
  return (
    <Card className={styles.content}>
     
      <Row justify="space-between" >
        <Col span={12}>
          {/* <img src={PIC_MCD} alt="" /> */}
        </Col>
        <Col span={12}>
          <LoginForm />
        </Col>
      </Row>
    </Card>
  )
}

export default LoginCard
