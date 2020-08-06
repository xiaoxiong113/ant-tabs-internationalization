/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link, connect, Dispatch, history, useIntl } from 'umi';

import { Breadcrumb, Menu, Tabs, Layout } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getAuthorityFromRouter } from '@/utils/utils';
import { isIncludeAuthority } from '@utils/authority'

import { MOMERY } from '@utils/index'

import NoFoundPage from '../pages/404'

import { Breadcrumb as BreadcrumbProps } from '@/models/global'

import IconCollapsedLogo from '@assets/logo.svg'

import {
  IconMenuHome, IconMenuTwo, IconMenuThree, IconMenuFour,
  IconMenuFive, IconMenuSix, IconMenuSeven, IconMenuAuth,
  IconMenuDot
} from '@components/Icons'

import {
  AppstoreOutlined,
  BuildOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  SettingOutlined,
  FileAddOutlined,
  TeamOutlined,
  MenuFoldOutlined as LegacyIcon,
} from '@ant-design/icons';

import styles from './BasicLayout.less'
import positionIcon from '@assets/images/position.png'
import logosmall from '@assets/images/logo1.png'


const { SubMenu } = Menu;
const headerStyle = { background: '#fff', padding: 0 };
const { TabPane } = Tabs;

interface MenuDataItemExtends extends MenuDataItem {
  iconAlias?: string
}
export interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch
  collapsed: boolean
  breadCrumb: BreadcrumbProps[],
  tabKey: string
}

const ICON_MAP = {
  'home': IconMenuHome,
  'base': IconMenuTwo,
  'mcds': IconMenuThree,
  'volunteer': IconMenuFour,
  'donation': IconMenuFive,
  'family': IconMenuSix,
  'staff': IconMenuSeven,
  'auth': IconMenuAuth,
  'dot': IconMenuDot,

  'org': IconMenuTwo,
  'people': IconMenuThree,
  'device': IconMenuFour,
}
const { Item } = Breadcrumb

type ActionType = "add" | "remove"
// @ts-ignore
type TargetKey = string | MouseEvent<HTMLElement, MouseEvent>


const menuDataRender = (menuList: MenuDataItemExtends[]): MenuDataItemExtends[] => {

  if (!isIncludeAuthority(1)) {
    // const index = menuList.findIndex(item => item.name === '人员管理')
    // menuList.splice(index, 1)
  }
  const res = menuList.map(item => {
    const { iconAlias } = item
    let Icon: any
    if (iconAlias) {
      Icon = ICON_MAP[iconAlias]
    } else {
      Icon = ICON_MAP.dot
    }

    item.icon = <Icon />
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    // return Authorized.check(item.authority, localItem, null) as MenuDataItemExtends;
    return localItem
  });
  return res
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const [ state, setState ] = useState({
    collapsed: false
  }) 
  const { dispatch, children, settings, collapsed, location, breadCrumb, tabKey, tabs }: any = props
  const handleMenuCollapse = (payload: boolean): void => {
    dispatch && dispatch({ type: 'global/changeLayoutCollapsed', payload });
  }

  const authorized = getAuthorityFromRouter(props.route.routes, location!.pathname || '/') || {
    authority: undefined,
  };

  useEffect(() => {
    MOMERY.memoInfo.USER_INFO && dispatch({ type: 'global/setUserInfo', payload: MOMERY.memoInfo.USER_INFO })
  }, [])

  const remove = (targetKey: TargetKey, action: ActionType) => {
    dispatch({
      type: 'tabs/ReduceTabEffect',
      payload: targetKey,
    });
  }
  const { tabList, currentKey, closeType } = tabs;
  
  const onChange = (activeKey: string, title?: string) => {
    
    let params = tabList.filter((v: any) => v.tabKey === activeKey)[0]
    dispatch({
      type: 'tabs/ChangeTabsEffect',
      payload: { ...params },
    })
    history.push(activeKey);
  };

  const menuClick = (menuItemProps: any) => {
    const { key, name, path } = menuItemProps
    
    // return
    dispatch({
      type: 'tabs/ChangeTabsEffect',
      payload: {tabKey: key, title: name, params: path},
    })
  

  }
  const Header = () => {

    return (
      <div className={styles.mcd_header}>
        <div className={styles.header_l}>
          <Tabs className={styles.tabPanel1}
              hideAdd
              onEdit={remove}
              onChange={onChange}
              activeKey={currentKey}
              type={closeType}
              tabBarGutter={0}
            >
              {tabList.map((panel: any) => (
                <TabPane tab={panel.title} key={panel.tabKey} >
                  {/* {
                    getTabsComponent(panel.tabKey).component
                  } */}
                </TabPane>
              ))}
          </Tabs>
        </div>
        
        <div style={{ flex: `1 1 0%` }}> </div>
        11111
        <RightContent />
      </div>
    )
  }

  // 去除相同的元素
  const reomoteSameObj = (arr: any[]) => {
    const obj: any = {}
    const newArr: any = arr.reduce((item: any, next: any) => {
      obj[next.name] ? ' ' : obj[next.name] = true && item.push(next)
      return item
    }, [])
    return newArr
  }

  /**
   * 面包屑的等级
   * @param level
   */
  // const changeBreadcrumb = (level: number) => {
    
  //   const newBreadCrumbList = JSON.parse(JSON.stringify(reomoteSameObj(breadCrumb)))
  //   if (level === 0) newBreadCrumbList.splice(1, 2)
  //   else if (level === 1) newBreadCrumbList.splice(2, 1)
  //   // 更新面包屑
  //   dispatch({
  //     type: 'peopleManagement/saveData',
  //     payload: {
  //       addPeopleStatus: true
  //     }
  //   })
  //   if (newBreadCrumbList[0].name === '人员管理' && !level) {
  //     dispatch({
  //       type: 'global/setBreadCrumb',
  //       payload: {
  //         breadCrumbList: [
  //           { path: `/layouts/peopleManagement`, name: '人员管理', type: 'link' },
  //           { path: `/layouts/peopleManagement`, name: '员工列表', type: 'text' }
  //         ],
  //         tabKey: '1'
  //       }
  //     })
  //   } else {
  //     dispatch({
  //       type: 'global/setBreadCrumb',
  //       payload: {
  //         breadCrumbList: newBreadCrumbList,
  //         tabKey
  //       }
  //     })
  //   }
  // }
  const toggle = () => {
    const { collapsed } = state;
    setState({
      collapsed: !collapsed,
    });
    handleMenuCollapse(!collapsed)
  }
  const { formatMessage } = useIntl();

  return (
    <ProLayout
      {...props}
      {...settings}
      formatMessage={formatMessage}
      // logo={logo}
      className={`${styles.mcds_layouts_container} ${collapsed ? styles.collapsed : styles.un_collapsed}`}
      // className={`${styles.mcds_layouts_container}`}
      // logo={IconCollapsedLogo}
      onCollapse={handleMenuCollapse}
      menuDataRender={menuDataRender}
      menuHeaderRender={(logoSvg, title) => {
        return (
          <div className='logo' onClick={() => { history.push("/layouts/home") }}>
            {
              !collapsed ?
              <a  style={{color: '#fff'}}>聪算</a> 
              : null
            }
            <LegacyIcon
              className={styles.trigger}
              // type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />
          </div>
        )
      }}
      menuItemRender={(menuItemProps) => {
        

        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return <div className={styles.menu_title}>
            {menuItemProps.icon}
            <span>{menuItemProps.name}</span>
          </div>
        }
        return (
          <Link to={menuItemProps.path} onClick={() => menuClick(menuItemProps)}>
            <div className={styles.menu_title}>
              {menuItemProps.icon}
              <span>{menuItemProps.name}</span>
            </div>
          </Link>
        )
      }}
      headerRender={Header}>
      <Authorized authority={authorized!.authority} noMatch={<NoFoundPage />}>
        <div className={styles.mcds_layouts_wrapper}>
          {/* 面包屑 */}
          {/* <div className={`${styles.mcds_layouts_breadcrumb_wrapper}`}>
            <Breadcrumb
              separator=">"
              className={`${!!breadCrumb.length && styles.mcds_breadcrumb}`}
            >
              {
                breadCrumb?.map((item: any, index: number) => {
                  const { path, name } = item
                  const loca = breadCrumb?.indexOf(item)
                  const isFirst = loca === 0
                  const isLast = loca === breadCrumb?.length - 1
                  if (isFirst) return <Item key={item.name}><img src={positionIcon} alt="" className={styles.m_r_5} /><Link onClick={() => changeBreadcrumb(index)} to={path}>{name}</Link></Item>
                  if (isLast) return <Item key={item.name}><span className={`${styles.current_level} ${styles.lasttitle}`}>{name}</span></Item>
                  return <Item key={item.name}><Link onClick={() => changeBreadcrumb(index)} to={path}>{name}</Link></Item>
                })
              }

            </Breadcrumb>
          </div> */}
          {/* 面包屑 */}
          <div className={styles.mcds_layouts_content_wrapper}>
            {children}
          </div>
        </div>
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings, tabs }: ConnectState) => ({
  collapsed: global.collapsed,
  breadCrumb: global.breadCrumb,
  tabKey: global.tabKey,
  settings,
  tabs
}))(BasicLayout);
