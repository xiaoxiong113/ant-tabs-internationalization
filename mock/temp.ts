/*
 * @description: songliubiao
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-11 17:38:15
 * @LastEditTime: 2020-05-18 15:17:00
 */
import { Request, Response } from 'express';

const tempList = (req: Request, res: Response) => {
  res.json([
    {
      id: '1',
      name: '个案资料模版',
      num: 20
    },
    {
      id: '2',
      name: '志愿者模版',
      num: 20
    },
    {
      id: '3',
      name: '捐赠人模版',
      num: 20
    },
    {
      id: '4',
      name: '个案资料模版',
      num: 20
    },
    {
      id: '5',
      name: '服务问卷模版',
      num: 20
    }
  ])
}

export default {
  'GET /api/tempList': tempList,
};
