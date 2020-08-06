/*
 * @description: 
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-11 19:11:09
 * @LastEditTime: 2020-06-22 16:12:02
 */
import React from 'react'
import { Spin } from 'antd'

import styles from './index.less'

// loading components from code split
export default () => {
  return (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  )
};
