/*
 * @description: 解析环境变量
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-13 10:48:24
 * @LastEditTime: 2020-05-13 13:14:00
 */
import Dotenv from 'dotenv'

import { resolvePath } from './parse-path'

const envPath = resolvePath(`.env.${process.env.MODE}`)

Dotenv.config({ path: envPath })
