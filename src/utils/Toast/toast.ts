/**
 * @Description: 确认弹框
 * @Author: dongqionghua
 * @Date:
 * @LastEditors:
 * @LastEditTime:
*/
import { Modal, message } from 'antd'

const { confirm: toast } = Modal

export default class Toast {
	static confirm({ title, content, fnOK, okType, fnCancel, okText, cancelText, className }: any) {
		toast({
			title,
			content,
			okText: okText || '确定',
			okType,
			cancelText: cancelText || '取消',

			onOk() {
				fnOK && fnOK()
			},
			onCancel() {
				fnCancel && fnCancel()
			},
			className: className
		})
	}

	static delete(content: string, fnOK: () => void, className: string) {
		Toast.confirm({title: '删除', content, fnOK, okType:'danger', className})
	}

	static error(content: string) {
		message.error(content)
	}

	static success(content: string) {
		message.success(content)
	}
}
