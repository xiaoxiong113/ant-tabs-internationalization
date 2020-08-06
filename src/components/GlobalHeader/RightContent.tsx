import React from 'react';
import { connect, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';
import { useModel, SelectLang, setLocale } from 'umi';

import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const changeLang = (lang: string) => {
    setLocale(lang, true);
  }
  return (
    <div className={className}>
      <Avatar />
      {/* <SelectLang className={styles.action} />
       */}
       <a onClick={() => changeLang('zh-CN')}> 中文</a>
       <a onClick={() => changeLang('en-US')}>英文</a>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
