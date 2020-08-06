/*
 * @description: TMS 图片多张图片上传，内含删除、预览、多选功能
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-22 14:11:42
 * @LastEditTime: 2020-07-31 09:54:57
 */
import * as React from 'react';
import RcUpload from 'rc-upload';
import { ComUtil, Toast } from '@utils/index';
import { Modal } from 'antd';

import { ReactComponent as IconPhoto } from '@assets/images/icons/mcds-home/icon_upload.svg';
import { ReactComponent as IconEdit } from '@assets/images/icons/mcds-home/icon_edit.svg';
import { ReactComponent as IconDel } from '@assets/images/icons/mcds-home/icon_del.svg';
import { ReactComponent as IconLook } from '@assets/images/icons/mcds-home/icon_look.svg';
import styles from './style/BaseUploadPic.less';

export interface PicItem {
  uid: number;
  url: string; // base64 地址或者 网络地址
  shortUrl?: string; // oss 短路径
  file?: File; // file 对象
}

interface BaseUploadPicProps {
  mode?: 'edit' | 'detail' ; // 编辑模式还是详情模式
  className?: string; // 样式类名
  style?: object; // 行内样式
  multiple?: boolean; // 是否多选
  accept?: string | string[]; // 允许上传的类型
  fileSize?: number; // 文件的大小上限，默认值为 3M
  onChange?: (list: PicItem[], type?: string | number) => void; // 成功之后
  value?: PicItem[];
  maxlength?: number; // 多选上传时，允许的上传最大张数，达到上限，隐藏上传按钮，默认不隐藏
  canEdit?: boolean; // 是否可以再次编辑
  canRemove?: boolean; // 是否可以移除，默认为 true
  uploadName: string;
  onError?: Function;
}

interface BaseUploadPicState {
  imgUrl: PicItem[];
  previewImgUrl: string;
  visible: boolean;
}

const filter = (list: PicItem[] | undefined) => {
  if (list) return list.filter((l) => l && l.url);
  return [];
};

export default class BaseUploadPic extends React.Component<BaseUploadPicProps, BaseUploadPicState> {
  editAgainItem: PicItem | undefined = undefined;

  modalRef = React.createRef<Modal>();

  accept = ['.png', '.jpg', '.jpeg', '.JPG', '.PNG', '.JPEG', '.bmp', '.BMP'];

  static defaultProps = {
    mode: 'edit',
    fileSize: 3,
    multiple: false,
    canEdit: false,
    canRemove: true,
    maxlength: Infinity,
    uploadName: '请上传图片',
  };

  constructor(props: BaseUploadPicProps) {
    super(props);
    const { accept, value } = props;
    if (accept) {
      if (typeof accept === 'string') {
        const { include } = ComUtil.inArray(accept, this.accept);
        if (!include) this.accept.push(accept);
      } else {
        this.accept = [...this.accept, ...accept];
      }
    }
    this.state = {
      imgUrl: filter(value),
      previewImgUrl: '',
      visible: false,
    };
  }

  UNSAFE_componentWillReceiveProps(props: BaseUploadPicProps) {
    this.setState({
      imgUrl: filter(props.value),
    });
  }

  beforeUpload = (file: any) => {
    const {
      props: { fileSize },
      accept,
    } = this;
    const { size, name } = file;
    const lastIndex = name.lastIndexOf('.');
    const suffix = (name as string).substring(lastIndex, name.length);
    const { include } = ComUtil.inArray(suffix, accept);
    if (!include) {
      Toast.toast('请上传格式正确的图片', 'error');
      return false;
    }
    // if ((size / 1024 / 1024) > fileSize!) {
    //   Toast.toast(`上传图片的大小不能超过${fileSize}M`, 'error')
    //   return false
    // }
    return true;
  };

  onSuccess = (file: any) => {
    const reader = new FileReader();
    const {
      state: { imgUrl },
      props: { onChange, onError, fileSize },
      editAgainItem,
    } = this;
    const len = imgUrl.length;
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      const imgItem = {
        uid: len > 0 ? imgUrl[len - 1].uid + 1 : 0,
        url: e.target.result,
        file,
      };
      if (editAgainItem) {
        // 再次编辑替换上一张图片
        editAgainItem.url = imgItem.url;
        editAgainItem.file = file;
        editAgainItem.shortUrl = undefined;
        imgUrl.splice(
          imgUrl.findIndex((item) => item.uid === editAgainItem.uid),
          1,
          editAgainItem,
        );
      } else {
        imgUrl.push(imgItem);
      }
      onChange && onChange(imgUrl);
      if (file.size / 1024 / 1024 > fileSize!) {
        onError && onError();
      }
      this.editAgainItem = undefined;
      this.setState({ imgUrl });
    };
  };

  customRequest = (request: any) => {
    const { file } = request;
    request.onSuccess(file);
  };

  // 再次编辑图片
  editPicAgain = (item: PicItem) => {
    this.editAgainItem = item;
  };

  // 预览图片
  previewPicItem = (uid: number) => {
    const {
      state: { imgUrl },
    } = this;
    const previewItem = imgUrl.find((item) => item.uid === uid);
    this.setState(
      {
        visible: true,
      },
      () => {
        this.setState({
          previewImgUrl: previewItem!.url,
        });
      },
    );
  };

  // 删除图片
  removePicItem = (uid: number,type?: string | number) => {
    
    const {
      state: { imgUrl },
      props: { onChange },
    } = this;
    imgUrl.some((item, i, arr) => {
      if (item.uid === uid) {
        arr.splice(i, 1);
        return true;
      }
      return false;
    });
    this.setState({ imgUrl });

    onChange && onChange(imgUrl, type);
  };

  // 关闭图片弹窗
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      accept,
      props: { multiple, canEdit, canRemove, maxlength, uploadName, mode },
      state: { imgUrl },
      onSuccess,
      beforeUpload,
      customRequest,
      editPicAgain,
      removePicItem,
    } = this;
    const { previewImgUrl, visible } = this.state;
    const RcConfit = {
      accept: accept.join(),
      multiple,
      onSuccess,
      beforeUpload,
      customRequest,
    };
    return (
      <div className={styles.upload_pic_container}>
        {!!imgUrl.length &&
          imgUrl.map((item) => {
            const { uid, url } = item;
            return (
              <div className={styles.pic_item} key={uid}>
                <div className={`${styles.photo_wall_warapper} ${styles.pic_wrapper}`}>
                  <img alt="" src={url} className={styles.upload_picture} />
                  <div className={styles.modal}>
                    {mode === 'edit' && (
                      <div className={styles.edit_pic} onClick={editPicAgain.bind(this, item)}>
                        <RcUpload {...RcConfit}>
                          <IconEdit />
                        </RcUpload>
                      </div>
                    )}

                    {mode === 'edit' && (
                      <div className={styles.edit_del} onClick={removePicItem.bind(this, uid, 'del')}>
                        <IconDel />
                      </div>
                    )}
                    <div className={styles.edit_pic} onClick={() => this.previewPicItem(uid)}>
                      <IconLook />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {imgUrl.length < maxlength! && mode !== 'detail' && (
          <RcUpload {...RcConfit}>
            <div className={`${styles.upload_placeholder} ${styles.pic_wrapper}`}>
              <IconPhoto />
              <p style={{ marginTop: '10px' }} className="placeholder">
                {uploadName}
              </p>
            </div>
          </RcUpload>
        )}

        <Modal visible={visible} footer={null} destroyOnClose onCancel={this.handleCancel}>
          <img src={previewImgUrl} style={{ width: '100%', height: '100%' }} />
        </Modal>
      </div>
    );
  }
}
