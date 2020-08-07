/*
 * @description: 麦基金首页
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-11 19:11:09
 * @LastEditTime: 2020-08-07 15:58:49
 */
import React, { useState, useEffect, FC } from 'react'
import { history, connect, useIntl, getLocale, getAllLocales } from 'umi'
import { Row, Col, Select, Card } from 'antd'

import { $POST, MOMERY, Toast, formatMessage } from '@utils/index'

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
  // formatMessage('menu.dashboard')
  console.log(
    '%c 🥑 formatMessage(menu.dashboard): ',
    'font-size:20px;background-color: #3F7CFF;color:#fff;',
    formatMessage('menu.dashboard'),
  )
  console.log(
    '%c 🍼️ getLocale: ',
    'font-size:20px;background-color: #6EC1C2;color:#fff;',
    getLocale(),
  )

  const name = formatMessage('menu.dashboard')
  useEffect(() => {
    dispatch({
      type: 'global/setBreadCrumb',
      payload: [
        {
          path: '/layouts/home',
          name: name,
          type: 'link',
          zh: '首页',
          en: 'home',
        },
      ],
    })
    dispatch({
      type: 'tabs/ChangeTabsEffect',
      payload: {
        tabKey: '/layouts/home',
        title: name,
        params: '/layouts/home',
      },
    })
  }, [])

  // console.log('%c 🍩 getAllLocales: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', getAllLocales());
  // console.log('%c 🍌 getLocale: ', 'font-size:20px;background-color: #465975;color:#fff;', getLocale());

  const { sumFamily, sumVolunteer, sumDonor, sumAmount, sumGoods } = queryList

  return <div className={styles.mcds_home}>{name}</div>
}

export default connect(({ global, tabs }: any) => ({ global, tabs }))(MCDHome)
