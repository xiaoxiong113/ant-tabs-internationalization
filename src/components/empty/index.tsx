/*
 * @description: table 表格为空时占位符
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 14:09:51
 * @LastEditTime: 2020-06-04 15:12:24
 */
import React from 'react'
import empty from '@/assets/images/pictures/components/table/empty.png'

import './index.less'

export const EmptyTable = (props: any) => {
  return (
    <div className="empty-content" style={{ padding: '0.5rem 0' }}>
      <img alt="" src={empty} style={{ paddingBottom: 10 }} />
      <p>{props.tips || '暂无数据'}</p>
    </div>
  )
}
