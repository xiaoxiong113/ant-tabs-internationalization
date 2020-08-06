/*
 * @description: 共享的弹窗业务组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-22 17:33:56
 * @LastEditTime: 2020-07-29 09:40:11
 */
import React from 'react'
import { Row, Col } from 'antd'
import { BaseModal } from '@/components/index'
import { BaseModalProps } from '@components/BaseModal'

import { ReactComponent as IconModalWarn } from '@assets/images/icons/components/modal/icon_modal_warn.svg'
import { ReactComponent as IconModalError } from '@assets/images/icons/components/modal/icon_modal_error.svg'

import styles from './index.less'

interface SharedModalProps extends BaseModalProps {
  warnType?: 'error' | 'warn' // 弹窗的类型
  closable?: boolean // 是否显示右上角关闭
  bodyTitle?: string | React.ReactElement // 模态框 body 标题
  bodySubTitle?: string | React.ReactElement // 模态框 body 二级标题
  bodyTips?: string | React.ReactElement // 模态框 body 描述性文字
  centered?: boolean // 是否垂直居中展示 modal
  title?: string | React.ReactElement // 模态框标题
  footer?: any | React.ReactElement // 模态框脚部
  headerStyle?: object // 模态框头部样式，默认为
  footerStyle?: object // 模态框脚部样式
  confirmBtnTxt?: string // 确认按钮文本
  cancleBtnTxt?: string // 取消按钮文本
  width?: number | string // 模态框宽度
  destroyOnClose?: boolean // 是否在模态框关闭的时候销毁内部组件或 dom
  handleOk?: Function
  handleCancel?: Function
  sumbitBtnLoading?: boolean // 提交按钮是否有loading
}

interface ModalParams {
  paramTitle?: string | React.ReactElement // 模态框标题
  paramBodyContent?: string | React.ReactElement // 模态框 body
  paramFooter?: string | React.ReactElement // 模态框脚部
}

// 仅包含 body 和 footer 的基础模态框
class SharedModal extends React.Component<SharedModalProps> {
  baseModalRef = React.createRef<BaseModal>()

  constructor(props: SharedModalProps) {
    super(props)
    this.state = {
      // visible: true
    }
  }

  componentDidMount() {
    // this.baseModalRef.current!.showModal()
  }

  showModal = () => {
    this.baseModalRef.current!.showModal()
  }

  hideModal = () => {
    this.baseModalRef.current!.hideModal()
  }

  handleCancel = () => {
    const { handleCancel } = this.props
    this.hideModal()
    handleCancel && handleCancel()
  }

  handleConfirm = () => {
    const { handleOk } = this.props
    handleOk && handleOk()
  }

  createdBaseModal = ({ paramTitle, paramBodyContent, paramFooter }: ModalParams = {}) => {
    const {
      baseModalRef,
      props: { title, centered, closable, width, destroyOnClose, footer, children, sumbitBtnLoading, closeModal, ...restProps },
      handleCancel, handleConfirm
    } = this
    return (
      <div className={styles.shared_modal_wrapper}>
        <BaseModal
          {...restProps}
          title={paramTitle || title}
          centered={centered}
          closable={closable}
          width={width}
          closeModal={closeModal}
          destroyOnClose={destroyOnClose}
          footer={paramFooter || footer}
          ref={baseModalRef}
          handleOk={handleConfirm}
          sumbitBtnLoading={sumbitBtnLoading}
          handleCancel={handleCancel} >
          {paramBodyContent || children}
        </BaseModal>
      </div>
    )
  }
}

export class BaseSharedModal extends SharedModal {
  render() {
    return this.createdBaseModal()
  }
}

/* 参考蓝湖设计规范，仅包含 body 和 footer 的警告和错误公用弹窗 */
export class BaseSharedHigherModal extends SharedModal {
  render() {
    const { warnType, bodyTitle, bodySubTitle, bodyTips } = this.props
    const BodyContent = () => {
      return (
        <div className={styles.body_wrapper}>
          <h3>{bodyTitle}</h3>
          <Row justify="start" align="middle">
            {
              warnType &&
              <Col>
                {warnType === 'error' ? <IconModalError /> : <IconModalWarn />}
              </Col>
            }
            <Col className={styles.tips_wrapper}>
              <h6>{bodySubTitle}</h6>
              <p>{bodyTips}</p>
            </Col>
          </Row>
        </div>
      )
    }
    return this.createdBaseModal({
      paramBodyContent: BodyContent()
    })
  }
}
