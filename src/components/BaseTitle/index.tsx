/*
 * @description: 二级页面中的导航标题组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-25 13:04:54
 * @LastEditTime: 2020-06-28 17:53:07
 */ 
import React, { FC } from 'react'
import { Row, Col } from 'antd'

import styles from './index.less'

const BaseTitle: FC<{ title?: string }> = (props) => {
  const { title, children } = props
 

  return (
    <Row className={styles.mcds_title_wrapper}>
      <Col>
        <h2>{title}</h2>
      </Col>
      <Col>
        {children}
      </Col>
    </Row>
  )
}

export default BaseTitle
