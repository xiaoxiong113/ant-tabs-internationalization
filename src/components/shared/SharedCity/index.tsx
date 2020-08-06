/*
 * @description: 城市查询功能，根据省、市 id 来查询列表
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-26 15:21:33
 * @LastEditTime: 2020-07-20 14:34:36
 */ 
import CITY_LIST from 'statics/address/city'

type List = typeof CITY_LIST

interface QueryProps {
  id: number
  list: List
}

interface SharedCity {
  province: QueryProps
  city: QueryProps
  address: QueryProps
}

const crateInitailData = (): SharedCity => {
  return {
    province: { id: 0, list: CITY_LIST },
    city: { id: 0, list: [] },
    address: { id: 0, list: [] }
  }
}

const INITIAL_DATA = crateInitailData()

// 查询当前省份下的市区列表数据
const queryCity = (provinceId: number, provinceList: List) => provinceList.find(p => p.value === provinceId)!.areaList as List

// 查询当前市区下的区县列表数据
const queryAddress = (cityId: number, cityList: List) => cityList.find(p => p.value === cityId)!.areaList as List

export default class SharedCityQuery {
  province: QueryProps

  city: QueryProps

  address: QueryProps

  constructor () {
    this.province = INITIAL_DATA.province
    this.city = INITIAL_DATA.city
    this.address = INITIAL_DATA.address
  }

  // 查询省份，接受省份 id
  queryProvince = (provinceId: number | undefined) => {
    const { id, list } = this.province
    // 清空市、区列表
    if (!provinceId) {
      this.city = INITIAL_DATA.city
      this.address = INITIAL_DATA.address
    }
    // 清空市、区列表
    if (provinceId && provinceId !== id) {
      this.city.list = queryCity(provinceId, list)
      this.address = INITIAL_DATA.address
    }
    this.province.id = provinceId || 0
    return this
  }

  // 查询市区，接受市区 id
  queryCity = (cityId: number | undefined) => {
    const { id, list } = this.city
    // 清空区列表
    if (!cityId) {
      this.address = INITIAL_DATA.address
    }
    if (cityId && cityId !== id) {
      this.address.list = queryAddress(cityId, list)
    }
    this.city.id = cityId || 0
    return this
  }

  // 查询区，接受区县 id
  queryAddress = (addressId: number | undefined) => {
    this.address.id = addressId || 0
    return this
  }

  /**
   * @description: 将省市区的 id 转为目标省市区对象
   * @param {type} 参数列表，调用格式例如 queryAll(5827, 6542, 6544)
   * @return: 返回由 province, city, address 组成的对象
   */
  queryAll = (...rest: Array<number | undefined>) => {
    const { province, city, address } = this
    const [provinceId = province.id, cityId = city.id, addressId = address.id] = rest
    if (provinceId) {
      province.id = provinceId
      city.list = queryCity(provinceId, CITY_LIST)
      if (cityId) {
        city.id = cityId
        address.list = queryAddress(cityId, city.list)
        if (addressId) {
          address.id = addressId
        }
      }
    }
    return { province, city, address }
  }
}
