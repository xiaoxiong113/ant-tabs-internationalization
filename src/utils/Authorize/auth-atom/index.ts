/*
 * @description: 导出全部的权限原子，文件名需要以小驼峰命名
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-06-08 10:32:38
 * @LastEditTime: 2020-06-08 11:31:40
 */
import AtomType from '../interface'

const files = require.context('.', true, /\.ts$/)

const regFileName = /^\.\/(\w+\/)?|\.ts$/g

const Atom: any = {}

files.keys().forEach((key: string) => {
  if (key === './index.ts') return
  Atom[key.replace(regFileName, '')] = files(key).default
})

export default Atom as AtomType
