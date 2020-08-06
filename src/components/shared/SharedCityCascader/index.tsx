/*
 * @description: 城市级联选择组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-25 13:45:24
 * @LastEditTime: 2020-07-15 10:17:04
 */
import React from 'react'
import { Row, Col, Select } from 'antd'

import CITY_LIST from 'statics/address/city'

import styles from './index.less'

interface BaseCascaderProps {
  width?: string
  value?: Array<number | undefined>
  onChange?: (idList: Array<number | undefined>) => any
}

interface BaseCascaderState {
  cityList: any[]
  addressList: any[]
  idList: Array<number | undefined>
}

const { Option } = Select

class BaseSharedCityCascader extends React.Component<BaseCascaderProps, BaseCascaderState> {
  constructor (props: BaseCascaderProps) {
    super(props)
    this.state = {
      cityList: [],
      addressList: [],
      idList: []
    }
  }

  // componentWillReceiveProps (newProps: BaseCascaderProps) {
  //   const { value = [] } = newProps
  //   const { cityList, addressList } = this.transformDataFromId(value)
  //   this.setState({
  //     cityList: [...cityList],
  //     addressList: [...addressList],
  //     idList: [...value]
  //   })
  // }

  // transformDataFromId = (idList: Array<number | undefined>) => {
  //   const [provinceId, cityId] = idList
  //   let cityList: any[] = []
  //   let addressList: any[] = []
  //   if (provinceId) {
  //     cityList = CITY_LIST.find(p => p.value === provinceId)!.areaList
  //     if (cityId) {
  //       addressList = cityList.find(p => p.value === cityId)!.areaList
  //     }
  //   }
  //   return {
  //     cityList,
  //     addressList
  //   }
  // }

  getNewCityList = (id: number, type: number) => {
    const { onChange } = this.props
    const { idList, cityList } = this.state

    // 省份变动，清空区，读取最新市列表
    if (type === 1) {
      idList.splice(0)
      idList[0] = id
      // 获取城市列表
      this.setState({ cityList: CITY_LIST.find(p => p.value === id)!.areaList })
    } else if (type === 2) {
      idList.splice(1)
      idList[1] = id
      this.setState({ addressList: cityList.find(p => p.value === id)!.areaList })
    } else {
      idList[2] = id
    }
    onChange && onChange(idList)
    this.setState({ idList })
  }

  render () {
    const {
      props: { width = '0.47rem' },
      state: { cityList, addressList, idList },
      getNewCityList
    } = this
    const selectStyle = { width }
    return (
      <Row  className={styles.city_cascader_wrapper}>
        <Col>
          <Select
            getPopupContainer={triggerNode => triggerNode.parentElement}
            style={selectStyle}
            placeholder="省"
            onChange={(id: number) => getNewCityList(id, 1)}
            defaultValue={idList[0]}
            value={idList[0]}>
            {CITY_LIST.map(province => <Option key={province.value} value={province.value}>{province.name}</Option>)}
          </Select>
        </Col>
        <Col>
          <Select
            getPopupContainer={triggerNode => triggerNode.parentElement}
            style={selectStyle}
            placeholder="市"
            onChange={(id: number) => getNewCityList(id, 2)}
            defaultValue={idList[1]}
            value={idList[1]}>
            {cityList.map(c => <Option key={c.value} value={c.value}>{c.name}</Option>)}
          </Select>
        </Col>
        <Col>
          <Select
            getPopupContainer={triggerNode => triggerNode.parentElement}
            style={selectStyle}
            placeholder="区"
            onChange={(id: number) => getNewCityList(id, 3)}
            defaultValue={idList[2]}
            value={idList[2]}>
            {addressList.map(c => <Option key={c.value} value={c.value}>{c.name}</Option>)}
          </Select>
        </Col>
      </Row>
    )
  }
}

export default BaseSharedCityCascader
