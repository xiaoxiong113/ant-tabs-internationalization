/*
 * @description: 项目主题配置，覆盖地址： https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-13 13:57:42
 * @LastEditTime: 2020-08-05 16:27:49
 */
const themeColor = '#2E1954'
const whiteColor = '#ffffff'
const colorLight = '#ffffff'

export default {
  'primary-color': themeColor, // 全局主色
  'link-color': themeColor, // 链接色
  'success-color': '#3BB200', // 成功色
  'warning-color': '#F7A400', // 警告色
  'error-color': '#F5222D', // 错误色
  'font-size-base': '16px', // 主字号
  'heading-color': '#333333', // 标题色
  'text-color': 'rgba(0, 0, 0, .65)', // 主文本色
  'text-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
  'disabled-color': '#DCDDDE', // 失效色
  'border-radius-base': '5px', // 组件/浮层圆角
  'border-color-base': '#d9d9d9', // 边框色
  'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)', // 浮层阴影
  // 表单组件的基础高度
  'height-base': '32px',
  // Button
  'btn-default-color': themeColor,
  'btn-default-bg': whiteColor,
  'btn-default-border': themeColor,
  'btn-disable-color': whiteColor,
  'btn-disable-bg': '#DCDDDE',
  // Input
  'input-disabled-bg': '#F5F5F5',
  // Layout
  'layout-header-height': '64px',
  'layout-body-background': '#F0F2F5',
  'layout-header-background': whiteColor,
  'layout-header-padding': '0 20px',
  'layout-header-color': '#333333',
  'layout-sider-background': themeColor,
  // 'layout-trigger-height': '24px',
  // 'layout-trigger-background': '#ff0000',
  // 'layout-trigger-color': '#0000ff',
  // 'layout-sider-background-light': '#FAB400',
  // 'layout-trigger-background-light': '#00ff00',
  // 'layout-trigger-color-light': '#FCD000',
  // Modal
  'modal-body-padding': '20px',
  'modal-header-border-color-split': '#ECECEC',
  'modal-footer-border-color-split': '#ECECEC',
  'modal-footer-padding-vertical': '20px',
  'modal-footer-padding-horizontal': '20px',
  // Menu
  'menu-bg': themeColor,
  'menu-popup-bg': 'rgba(7,144,239,1)', // 鼠标悬浮到菜单颜色
  'menu-item-color': whiteColor, // 字体颜色
  'menu-highlight-color': colorLight, // 字体高亮颜色
  'menu-item-active-bg': 'rgba(7,144,239,1)', // 菜单选中的背景色
  'menu-item-active-border-width': '0px', // 选中菜单边框宽度
  'menu-inline-toplevel-item-height': '50px', // 一级菜单高度
  'menu-item-height': '50px', // 二级及以下菜单高度
  'menu-collapsed-width': '60px', // 菜单折叠后宽度
  'menu-item-group-title-color': whiteColor,
  'menu-item-vertical-margin': '0px', // 菜单的上下 margin
  'menu-item-boundary-margin': '0px',
  'menu-dark-color': whiteColor,
  'menu-dark-bg': themeColor,
  'menu-dark-submenu-bg': themeColor, //'rgba(7,144,239,1)',
  'menu-dark-highlight-color': colorLight,
  'menu-dark-item-active-bg': 'rgba(7,144,239,1)',
  'menu-dark-selected-item-icon-color': colorLight,
  'menu-dark-selected-item-text-color': colorLight,
  'menu-dark-item-hover-bg': 'rgba(7,144,239,1)',
  // Form
  'label-color': '#333333',
  'form-item-margin-bottom': '30px',
  'form-item-label-font-size': '12px',
  // Table
  'table-row-hover-bg': '#F1F9FF',
  // 'table-padding-horizontal': '0.15rem',
  //  -----------------------------------------------
  'pagination-item-size': '32px',
  'btn-padding-base': '0 11px 1px',
  // ---------------------------------------------------
  'input-hover-border-color': themeColor,
  // --------------------------------------
  'tabs-card-head-background': whiteColor,
  'tabs-card-height': '38px',
  'tabs-card-active-color': '#FF9E00',
  'tabs-title-font-size': '14px',
  // 'tabs-bar-margin': '',
  'tabs-scrolling-size': '16px',
  // 'tabs-highlight-color': '',
  'tabs-hover-color': '#FF9E00',
  'tabs-active-color': '#FF9E00',
  // ---------------------定位z-index-----------------
  'zindex-modal': '1053',
  'zindex-modal-mask': '1053',
  'zindex-message': '1054'
}
