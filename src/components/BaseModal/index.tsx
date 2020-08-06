/*
 * @description: 基于 modal 封装的弹窗组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-22 16:30:15
 * @LastEditTime: 2020-07-29 09:37:52
 */
import React from 'react'
import { Modal, Row, Col, Button } from 'antd'

import styles from './index.less'

export interface BaseModalProps {
  centered?: boolean // 是否垂直居中展示 modal
  closable?: boolean // 是否显示右上角关闭
  title?: string | React.ReactElement // 模态框标题
  footer?: any | React.ReactElement // 模态框脚部
  headerStyle?: object // 模态框头部样式，默认为
  footerStyle?: object // 模态框脚部样式
  confirmBtnTxt?: string // 确认按钮文本
  cancleBtnTxt?: string // 取消按钮文本
  width?: number | string // 模态框宽度
  destroyOnClose?: boolean // 是否在模态框关闭的时候销毁内部组件或 dom
  handleOk?: () => void
  handleCancel?: () => void
  closeModal?: () => void // 拦截右上角的关闭按钮
  sumbitBtnLoading?: boolean // 提交按钮是否有loading
}

interface BaseModalState {
  visible: boolean
}

class BaseModal extends React.Component<BaseModalProps, BaseModalState> {
  static defaultProps = {
    centered: false,
    closable: false,
    confirmBtnTxt: '确认',
    cancleBtnTxt: '取消',
    width: 480,
    destroyOnClose: true,
    sumbitBtnLoading: false
  }

  constructor(props: BaseModalProps) {
    super(props)
    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  hideModal = () => {
    const { props: { closeModal } } = this
    closeModal && closeModal()
    this.setState({ visible: false })
  }

  renderFooter = () => {
    const { confirmBtnTxt, cancleBtnTxt, handleOk, handleCancel, sumbitBtnLoading } = this.props
    return (
      <Row justify="end" align="middle" className={styles.modal_footer}>
        <Col>
          <Button onClick={handleCancel}>{cancleBtnTxt}</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleOk} loading={sumbitBtnLoading}>{confirmBtnTxt}</Button>
        </Col>
      </Row>
    )
  }

  render() {
    const {
      state: { visible },
      props: { title, centered, width, destroyOnClose, footer, children, closable },
      hideModal, renderFooter
    } = this
    return (
      <div id={styles.mcds_base_modal}>
        <Modal
          title={title}
          getContainer={false}
          closable={closable}
          width={width}
          centered={centered}
          footer={footer === null ? null : renderFooter()}
          wrapClassName={styles.mcds_base_modal_wrapper}
          visible={visible}
          maskClosable={false}
          destroyOnClose={destroyOnClose}
          onCancel={hideModal}
        >
          {children}
        </Modal>
      </div>
    )
  }
}

export default BaseModal
