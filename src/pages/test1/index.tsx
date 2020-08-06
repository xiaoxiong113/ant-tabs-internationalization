/*
 * @description: 麦基金首页
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-11 19:11:09
 * @LastEditTime: 2020-08-05 15:28:34
 */
import React, { useState, useEffect, FC } from 'react'
import { history, connect } from 'umi'
import { Row, Col, Select, Card } from 'antd'

import { $POST, MOMERY, Toast } from '@utils/index'

import APIS from '@/Apis'


import styles from './index.less'

import { BaseProps, KeyValue } from 'typings/common'

const { Option } = Select



const MCDHome: FC<BaseProps> = (props) => {
  const { dispatch } = props
  const { accountType, orgId: defaultId } = MOMERY.memoInfo.USER_INFO
  const isChinaFund = accountType < 1

  const [searchId, setSearchId] = useState<string>((!isChinaFund && defaultId) || '')
  const [allOrgList, setOrgList] = useState<KeyValue[]>([])
  const [queryList, setQueryList] = useState<KeyValue>({})

  const isSelectedChinaFund = Number(searchId) === 1 // 是否选中中国麦基金角色

  

 
  useEffect(() => {
    dispatch({
      type: 'global/setBreadCrumb',
      payload: [{ path: '/layouts/home', name: '首页', type: 'link' }]
    })
   
  }, [])

 

  
  const { sumFamily, sumVolunteer, sumDonor, sumAmount, sumGoods } = queryList

  return (
    <div className={styles.mcds_home}>
      test
      111111111111111
    </div>
  )
}

export default connect(({ global }: any) => ({ global }))(MCDHome)
