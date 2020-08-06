/*
 * @description: 将行内样式 px 转为 rem，1px 和 字体大小不需要转的，需要将单位设置为 Px/PX
 * @author: huxianghe
 * @Date: 2020-05-24 15:04:27
 * @lastEditors: huxianghe
 * @LastEditTime: 2020-05-24 15:04:27
 */
const reg = /(\d)+(px)/gi

export default source => {
  const unitList = source.match(reg)
  if (unitList && unitList.length) {
    for (let i = 0, len = unitList.length; i < len; i++) {
      const unit = unitList[i]
      if (/Px|PX/.test(unit)) source = source.replace(unit, unit.toLowerCase())
      else source = source.replace(unit, parseFloat((parseInt(unit) / 192).toFixed(2)) + 'rem')
    }
  }
  return source
}
