/*
 * @description: 所属项目下拉框
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-07-14 17:17:00
 * @LastEditTime: 2020-07-30 10:28:24
 */

import React, { FC, useState, useEffect } from 'react'
import { Select } from 'antd'

import { REQUEST, MOMERY } from '@utils/index'

import APIS from '@/Apis'

const { API_COMMON_INDEX_PROJECTS } = APIS.API_COMMON_INDEX

const { Option } = Select

interface SharedProjectProps {
  all?: boolean  // 是否有全部选项
  value?: string
  onChange?: (v: string) => any
}
const BaseSharedProject: FC<SharedProjectProps> = (props) => {
  const [projectList, setProjectList] = useState([])
  const [selectValue, setValue] = useState('')
  const { onChange, all, value } = props
  const { userType } = MOMERY.getCachedFromMemo('USER_INFO')
  useEffect(() => {
    REQUEST.post(API_COMMON_INDEX_PROJECTS, {}).then(({ data, code }) => {
      const newProject = data.projectDtos
      if (code === 200) {
        if (all && userType !== '2') newProject.unshift({ id: '', name: '全部' })
        else setValue(value || newProject[0].id)
        onChange && onChange(value || newProject[0].id)
        setProjectList(newProject)
      }
    })
  }, [])

  const handleChange = (key: string) => {
    onChange && onChange(key)
    setValue(key)
  }



  return (
    <Select
      getPopupContainer={triggerNode => triggerNode.parentElement}
      placeholder="请选择项目"
      onChange={handleChange}
      value={selectValue}>
      {projectList.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
    </Select>

  )
}

export default BaseSharedProject
