import React from 'react';
import { Result } from 'antd';
import pic_not_found from '@assets/images/pictures/404.png'

import styles from './404.less'

const NoFoundPage: React.FC<{}> = () => (
  <Result
    className={styles.not_found}
    status={undefined}
    extra={
      <div>
        <img src={pic_not_found} alt=""/>
      </div>
    }
  />
);

export default NoFoundPage;
