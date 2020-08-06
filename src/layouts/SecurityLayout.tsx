import React from 'react';
import { connect, ConnectProps } from 'umi';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  render() {
    const { children } = this.props;
    return children;
  }
}

export default connect()(SecurityLayout);
