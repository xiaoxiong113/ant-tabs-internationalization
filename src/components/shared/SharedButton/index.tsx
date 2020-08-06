/*
 * @description: 基于 Button 按钮封装的组件
 * @author: huxianghe
 * @Date: 2020-05-24 15:52:36
 * @lastEditors: huxianghe
 * @LastEditTime: 2020-07-03 15:05:31
 */
import React from 'react'
import { Button, Icon } from 'antd'

import {
  IconButtonAdd, IconButtonDownload, IconButtonExport, IconButtonImport,
  IconButtonSearch
} from '../../Icons'

import buttonStyles from './index.less'

import { ButtonProps } from 'antd/lib/button'
import IconSerach from '@/assets/images/icons/components/button/serach.png'
import IconAdd from '@/assets/images/icons/components/button/add.png'
import IconImport from '@/assets/images/icons/components/button/import.png'
import IconExport from '@/assets/images/icons/components/button/export.png'
import IconDownload from '@/assets/images/icons/components/button/download.png'
import IconProject from '@/assets/images/icons/components/button/project.png'
import IconWorkingHours from '@/assets/images/icons/components/button/working_hours.png'
import IconRest from '@/assets/images/icons/components/button/rest.png'
import IconRestWhite from '@/assets/images/icons/components/button/rest_white.png'
import IconStop from '@/assets/images/icons/components/button/stop_icon.png'
import IconImportWhite from '@/assets/images/icons/components/button/import_icon.png'
import IconAuthority from '@/assets/images/icons/components/button/authority.png'

import IconOpening from '@/assets/images/icons/components/button/opening_icon.png'


declare const ButtonIconTypes: ['add', 'download', 'export', 'import', 'search', 'project', 'working_hours', 'rest', 'rest_white','stop', 'import_white', 'opening', 'authority']
type ButtonIconType = typeof ButtonIconTypes[number]

// 按钮的背景颜色，目前仅有两种
type ButtonTheme = 'yellow' | 'blue'

interface BaseButtonProps extends ButtonProps {
  btnTxt: string
  styles?: object
  width?: number
  handleClick?: Function
  icon?: React.ReactNode
  iconType?: ButtonIconType,
  theme?: ButtonTheme
}

const mapIcon = (iconType: ButtonIconType) => {
  switch (iconType) {
    case 'add': return IconAdd
    case 'download': return IconDownload
    case 'export': return IconExport
    case 'import': return IconImport
    case 'search': return IconSerach
    case 'project': return IconProject
    case 'working_hours': return IconWorkingHours
    case 'rest': return IconRest
    case 'rest_white': return IconRestWhite
    case 'stop': return IconStop
    case 'import_white': return IconImportWhite
    case 'opening': return IconOpening
    case 'authority': return IconAuthority
    default: null
  }
  return null
}

class SharedButton extends React.PureComponent<BaseButtonProps> {
  static defaultProps = {
    theme: 'blue'
  }
 
  createButton = () => {
    const { type = 'primary', width, btnTxt, handleClick, styles, icon, iconType, theme, ...restProps } = this.props
    const Icon = mapIcon(iconType)

    const btnStyles = theme === 'yellow' ? { background: '#FAB400', borderColor: '#FAB400' } : {}
    return (
      <Button
        {...restProps}
        className={buttonStyles.mcds_button_wrapper}
        type={type}
        style={styles ? { width: `${width}px`, ...btnStyles, ...styles } : { width: `${width}px`, ...btnStyles }}

        onClick={() => handleClick && handleClick()} >
        <img className={buttonStyles.icon} src={Icon}  />
        {btnTxt}
      </Button>
    )
  }
}

export class BaseSharedButton extends SharedButton {
  render() {
    return this.createButton()
  }
}
