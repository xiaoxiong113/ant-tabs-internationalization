/*
 * @description: 表格组件
 * @author: huxianghe
 * @Date: 2020-05-24 13:43:53
 * @lastEditors: huxianghe
 * @LastEditTime: 2020-07-30 15:30:46
 */
import React from 'react'
import { EmptyTable } from '../index'
import { Table, ConfigProvider, Button } from 'antd'

import { ComUtil, TypesUtils, REQUEST } from '@utils/index'

import styles from './index.less'

import { ColumnProps } from 'antd/lib/table'
import { PaginationProps } from 'antd/lib/pagination'
import { KeyValue } from 'typings/common'

type RowSelectionType = 'checkbox' | 'radio'
type RequestMethod = 'post' | 'get'

interface BaseTableProps {
  url: string
  method?: RequestMethod
  rowKey: string | { (record: KeyValue): any }
  columns: ColumnProps<any>[]
  searchParams: object
  // 每页条数
  pageSize?: number
  // 是否设置列表序号，默认 true
  index?: boolean
  scroll?: {
    x?: boolean | number | string
    y?: boolean | number | string
    scrollToFirstRowOnChange?: boolean
  }
  // 是否开启多选模式
  rowSelection?: any
  // 第一列是否设置为左浮动，默认 true
  rowSelectionFixed?: boolean
  // 设置表格是单选还是多选，默认多选
  rowSelectionType?: RowSelectionType
  // 新增 key，和 rowKey 一致，但是只能是字符串类型，例如 id，默认 id
  filterKey?: string
  // 是否开启单击表单任意行选中/取消选中当前行
  onRow?: boolean
  // 是否获取表格中选中的行数据
  getSelectedRow?: (selectedRowKeys: any[], selectedRows: KeyValue[]) => void
  getRemoveSelect?: Function // 删除的选中信息
  getRemoveSelectAll?: Function // 删除的选中信息: 全部选中或取消的时候
  // 是否显示边框
  bordered?: boolean
  // 是否显示分页
  isPagination?: boolean
  // 获取当前页最新数据
  onGetCurrentPageData?: Function
}

interface BaseTableState {
  dataSource: any[]
  pagination: PaginationProps
  selectedRowKeys: any[]
  selectedRows: KeyValue[]
}

const diffProps = (newProps: object, oldProps: object) => {
  const newKeys = Object.keys(newProps).filter(k => k && !TypesUtils.isEmpty(newProps[k])).sort()
  const oldKeys = Object.keys(oldProps).filter(k => k && !TypesUtils.isEmpty(oldProps[k])).sort()
  if (newKeys.length !== oldKeys.length) return false
  for (let i = 0; i < newKeys.length; i += 1) {
    const key1 = newKeys[i]
    const key2 = oldKeys[i]
    if (TypesUtils.isPlainObj(newProps[key1])) { // 对象递归判断
      if (diffProps(newProps[key1], oldProps[key2])) {
        //
      } else {
        return false
      }
    } else if (newProps[key1] !== oldProps[key2]) {
      return false
    }
  }
  return true
}

// table 的数据 分页的数据
export default class BaseTable extends React.Component<BaseTableProps, BaseTableState> {
  columns: ColumnProps<any>[] = []

  static defaultProps = {
    index: true,
    method: 'post',
    filterKey: 'id',
    onRow: true,
    rowSelection: true,
    rowSelectionFixed: false,
    rowSelectionType: 'checkbox',
    bordered: false,
    isPagination: true
  }

  constructor(props: BaseTableProps) {
    super(props)
    const { columns, pageSize = 15 } = props
    this.formatColumsList(columns)
    this.state = {
      dataSource: [], // 保存前的数据
      pagination: {
        current: 1, // 当前的页
        pageSize, // 每页显示的条数
        total: 1,
        size: 'small',
        showQuickJumper: true,
        pageSizeOptions: ['15', '20', '50', '100'],
        showSizeChanger: true,
        onChange: (page: number) => {
          const { pagination } = this.state
          pagination.current = page
          this.setState({ pagination })
          this.loadingTableData()
        },
        itemRender: (current: number, type: string, originalElement: any) => {

          if (type === 'prev') {
            return <Button size="small" style={{ margin: '0 6px' }}>上一页</Button>
          } if (type === 'next') {
            return <Button size="small" style={{ margin: '0 6px' }}>下一页</Button>
          }
          return originalElement
        },
        onShowSizeChange: (current: number, size: number) => {
          const { pagination } = this.state
          pagination.current = current
          pagination.pageSize = size
          this.setState({ pagination })
          this.loadingTableData()
        },
        showTotal: (total: any) => `总条数：${total}`
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  }

  /**
   * 初始化数据
   */
  componentDidMount() {
    this.loadingTableData()
  }

  async componentWillReceiveProps(props: BaseTableProps) {
    if (!diffProps(props.searchParams, this.props.searchParams)) {
      const { pagination } = this.state
      pagination.current = 1
      await this.setState({
        pagination,
        selectedRowKeys: [],
        selectedRows: []
      })
      this.loadingTableData(props)
    }
  }

  // 加载表格数据
  loadingTableData = (props: BaseTableProps = this.props) => {
    const { state: { pagination, selectedRows, selectedRowKeys } } = this
    const { url, method, searchParams, index, onGetCurrentPageData, filterKey } = props
    const page = pagination.current!
    const pageSize = pagination.pageSize!
    const params = { page, pageSize, ...searchParams }
    // 是否存在收集的数据
    const hasSelected = !!selectedRowKeys.length
    REQUEST.request<any>(url!, method!, params).then(({ data }) => {
      let dataObj = []
      if (TypesUtils.isArrayFn(data)) {
        dataObj = data
      } else {
        pagination.total = ((data || {}).data || {}).totalNum || (data || {}).totalNum
        dataObj = ((data || {}).data || {}).data || (data || {}).data || []
      }
      if (index) {
        dataObj.forEach((item: any, i: number) => {
          item.index = (i + 1) + (page - 1) * pageSize
          const newKey = item[filterKey!]
          // 更新选中的数据
          if (hasSelected) {
            selectedRowKeys.forEach((oldKey, n) => {
              if (newKey === oldKey) {
                selectedRows.splice(n, 1, item)
              }
            })
          }
        })
      }
      onGetCurrentPageData && onGetCurrentPageData(dataObj)
      this.setState({
        dataSource: dataObj,
        pagination,
        selectedRows,
        selectedRowKeys
      })

    })
  }

  // 点击表格任意一行选中或者取消选中
  selectedCurrentRow = (row: KeyValue) => {
    const key = this.props.filterKey!
    const currentVal = row[key]
    const type = this.props.rowSelectionType
    const { selectedRowKeys } = this.state
    const { selectedRows } = this.state
    if (type === 'radio') {
      selectedRowKeys.splice(0)
      selectedRows.splice(0)
      selectedRowKeys.push(currentVal)
      selectedRows.push(row)
    } else {
      const { include, index } = ComUtil.inArray(currentVal, selectedRowKeys)
      if (include) {
        selectedRows.some((item, i) => {
          if (currentVal === item[key]) {
            selectedRowKeys.splice(index, 1)
            selectedRows.splice(i, 1)
            return true
          }
          return false
        })
      } else {
        selectedRowKeys.push(currentVal)
        selectedRows.push(row)
      }
    }
    this.setState({
      selectedRowKeys,
      selectedRows
    })
    this.submitSelectedRow(selectedRowKeys, selectedRows)
  }

  // 提供该接口，以供父组件可能需要用到表格选中的数据
  submitSelectedRow = (selectedRowKeys: (string | number)[], selectedRows: KeyValue[]) => {
    const { rowSelection, getSelectedRow } = this.props
    rowSelection && getSelectedRow && getSelectedRow(selectedRowKeys, selectedRows)
  }

  // 删除/更新 表格数据之后调用该方法
  updateTableData = async () => {
    await this.setState({
      selectedRowKeys: [],
      selectedRows: []
    })
    this.loadingTableData()
  }


  // 格式化 Table 组件 column 属性
  formatColumsList(columns: ColumnProps<any>[]) {
    columns.forEach(item => {
      if (!item.render) item.render = (text: string) => (<span>{(TypesUtils.isEmpty(text) && '/') || text}</span>)
    })
    this.columns = columns
  }

  render() {
    const { columns, state, props } = this
    const { onRow, scroll, rowKey, filterKey, rowSelection, rowSelectionFixed, rowSelectionType, bordered, isPagination } = props
    const { dataSource, pagination, selectedRowKeys } = state

    const hasData = dataSource.length > 0
    let isOnRow; let isRowSelection
    // 设置点击当前行任意位置取消/选中行
    if (onRow && rowSelection) {
      isOnRow = (row: KeyValue) => {
        return {
          onClick: () => {
            this.selectedCurrentRow(row)
          }
        }
      }
    }
    // 设置第一列为多选
    if (rowSelection) {
      isRowSelection = {
        type: rowSelectionType,
        fixed: hasData && rowSelectionFixed,
        selectedRowKeys,
        onChange: async (rowKeys: (string | number)[], selectedRows: KeyValue[]) => {
          const rowList = [...this.state.selectedRows, ...selectedRows]
          const row = rowList.filter((item, i, arr) => {
            const { include } = ComUtil.inArray(item[filterKey!], rowKeys)
            return include && arr.indexOf(item) === i && item
          })
          const list = [...new Set([...rowKeys, ...selectedRowKeys])]
          await this.setState({
            selectedRowKeys: list,
            selectedRows: row
          })
          this.submitSelectedRow(list, selectedRows)
        },
        onSelect: (record: any, selected: any, selectedRows: any) => {
          if (!selected) {
            const { selectedRowKeys } = this.state
            let index
            selectedRowKeys.forEach((v, i) => {
              if (v === record.id) index = i
            })
            const list = selectedRowKeys.splice(index, 1)
            this.setState({
              selectedRowKeys: list
            })
          }
          const { getRemoveSelect } = this.props
          if (getRemoveSelect) {
            getRemoveSelect(record, selected, selectedRows)
          }
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {

          const newList = changeRows.map(v => v.id)
          const list = JSON.parse(JSON.stringify(this.state.selectedRowKeys))
          if (selected) {
            this.setState({
              selectedRowKeys: [...new Set([...newList, ...list])]
            })
          } else {
            changeRows.forEach(el => {
              const index = list.indexOf(el.id)
              if (index >= 0) {
                list.splice(index, 1)
              }
            });
            this.setState({
              selectedRowKeys: list
            })
          }
          const { getRemoveSelectAll } = this.props
          if (getRemoveSelectAll) {
            getRemoveSelectAll(selected, selectedRows, changeRows)
          }
        }
      }
    }

    return (
      <div className={styles.mcds_table_wrapper}>
        <ConfigProvider renderEmpty={EmptyTable}>
          <Table
            className={`${styles.table} ${onRow && rowSelection ? styles.select_row : null}`}
            onRow={isOnRow}
            rowSelection={isRowSelection}
            scroll={scroll as any}
            rowKey={rowKey}
            columns={columns}
            bordered={bordered}
            pagination={(isPagination && hasData) ? pagination : false}
            dataSource={dataSource} />
        </ConfigProvider>
      </div>
    )
  }
}
