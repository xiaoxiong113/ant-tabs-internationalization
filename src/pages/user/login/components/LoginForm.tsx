/*
 * @description: 登录 Form 表单组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-18 16:02:56
 * @LastEditTime: 2020-08-05 15:12:08
 */
import { history } from 'umi'
import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Button, Form, Input } from 'antd'

import { encryptByRSA, $POST, MOMERY, Toast } from '@utils/index'
import APIS from '@/Apis'
import { BASE_URL } from '@config/index'

import { ReactComponent as IconUser } from '@assets/images/icons/login/icon_user.svg'
import { ReactComponent as IconPassword } from '@assets/images/icons/login/icon_password.svg'
import { ReactComponent as IconCode } from '@assets/images/icons/login/icon_code.svg'
import styles from './LoginForm.less'

const { API_LOGIN_INDEX_GETCAPTCHA, API_LOGIN_INDEX_LOGIN } = APIS.API_LOGIN_INDEX

const { Item } = Form

// 表单初始值
const INITAIL_VALUES = {
  userName: '',
  passwords: '',
  verifyCode: ''
}

const VALIDATE_RULES = {
  userName: [
    { required: true, message: '请输入账号' },
    { pattern: /[A-Za-z0-9]/, message: '请输入英文或数字，最多18个字' }
  ],
  passwords: [
    { required: true, message: '请输入密码' },
    { pattern: /[A-Za-z0-9]/, message: '请输入英文或数字，最多18个字' }
  ],
  verifyCode: [
    { required: true, message: '请输入验证码' }
  ]
}

const LoginForm = () => {
  const [isShowTips, setTipsStatus] = useState(false)
  const [captcha, setCaptcha] = useState('')
  const [errorTips, setErrorTips] = useState('')

  const loginTime = useRef(-1)

  const [form] = Form.useForm()
  const { validateFields } = form

  const getCaptcha = () => {
    loginTime.current = Math.round(new Date().getTime() / 1000)
    setCaptcha(`${BASE_URL}${API_LOGIN_INDEX_GETCAPTCHA}?timestamp=${loginTime.current}`)
  }
  useEffect(() => {
    getCaptcha()
  }, [])

  const submitLogin = async () => {
    try {
      const { userName = '', passwords = '', verifyCode = ''} = await validateFields();
      history.replace('/layouts/home')
    //   const { message, data, code } = await $POST(API_LOGIN_INDEX_LOGIN, {
    //     interceptor: true,
    //     userName,
    //     userPassword: encryptByRSA(passwords),
    //     captcha: verifyCode,
    //     timestamp: loginTime.current
    //   })
    //   if (code !== 200) {
    //     setErrorTips(message[0])
    //     setTipsStatus(true)
    //     if (code === 1022) {
    //       Toast.toast(message[0], 'error')
    //     }
    //   } else {
    //     MOMERY.cachedToMemo('USER_INFO', data)
    //     history.replace('/layouts/home')
    //   }
    } catch (e) {
      console.log('Failed:', e);
    }
  }

  return (
    <div className={styles.login_form}>
      <div className={styles.login_form_body}>
        <Row justify="center">
          <Col span={20}>
            <h2 className={styles.login_title}>登录</h2>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={15} className={styles.login_tips}>
            {isShowTips && <p>{errorTips}</p>}
          </Col>
        </Row>
        <Row justify="center">
          <Col span={15}>
            <Form
              className={styles.login_form_wrapper}
              form={form}
              initialValues={INITAIL_VALUES}>
              <Item
                name='userName'
                className={styles.input}
                rules={VALIDATE_RULES.userName}>
                <Input allowClear size="large" placeholder="请输入账号" maxLength={18} prefix={<IconUser />} />
              </Item>
              <Item
                name='passwords'
                className={styles.input}
                rules={VALIDATE_RULES.passwords}>
                <Input allowClear size="large" placeholder="请输入密码" maxLength={18} type="password" prefix={<IconPassword />} />
              </Item>
              <Item
                name='verifyCode'
                className={styles.input}
                rules={VALIDATE_RULES.verifyCode}>
                <Input allowClear placeholder="请输入验证码" maxLength={4} prefix={<IconCode />} suffix={<img alt="" className={styles.login_captcha} onClick={getCaptcha} src={captcha} />} />
              </Item>
            </Form>
          </Col>
        </Row>
      </div>
      <div className={styles.login_form_footer}>
        <Row justify="center">
          <Col>
            <Button type="primary" className={styles.login_submit} onClick={submitLogin}>登录</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LoginForm
