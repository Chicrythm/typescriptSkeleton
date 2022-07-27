import React from 'react';
import defaultStyle from './index.module.scss';
import { ConfigProvider, Breadcrumb, TableColumnType, Statistic, Input, Select, DatePicker, Button, Table, Checkbox } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { GetRowKey, TablePaginationConfig } from 'antd/lib/table/interface';
import { TableLayout } from 'rc-table/lib/interface';
import { Moment } from 'moment';

const { Option } = Select
const { RangePicker } = DatePicker

interface defaultInterface {
  className?: string
  style?: React.CSSProperties 
  [propName:string]:any
}

export interface BreadCrumbItem extends defaultInterface {
  href?: string
  link?: string
  text: string
}

export interface BreadCrumb extends defaultInterface {
  separator?: string
  childrens: Array<BreadCrumbItem>
}

export interface Statistics extends defaultInterface {
  title: string
  value: number | string
  valueStyle?: React.CSSProperties
}

export interface FilterInputItem extends defaultInterface {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  allowClear?: boolean
}

export interface SelectOption extends defaultInterface {
  text: string
  value: string | number
}

export interface FilterSelectItem extends defaultInterface {
  onChange?: Function
  placeholder?: string
  defaultValue?: string | number
  showSearch?: boolean
  childrens: Array<SelectOption>
}

export interface FilterDatePickerItem extends defaultInterface {
  onChange?: (values: Moment, formatString:string) => void
  value?: Moment
  defaultValue?: Moment
  showTime?: boolean
  allowClear?: boolean
  format?: string
  picker?: "time" | "date" | "week" | "month" | "quarter" | "year"
}

export interface FilterRangePickerItem extends defaultInterface {
  onChange?: (values: [Moment, Moment], formatString: [string, string]) => void
  value?: [Moment, Moment]
  defaultValue?: [Moment, Moment]
  showTime?: boolean
  allowClear?: boolean
  separator?: string
  format?: string
  picker?: "time" | "date" | "week" | "month" | "quarter" | "year"
}

export interface FilterButtonItem extends defaultInterface {
  onClick?: React.MouseEventHandler<HTMLElement>
  type?: "default" | "link" | "text" | "ghost" | "primary" | "dashed"
  text?: string,
}

export interface FilterCheckBoxItem extends defaultInterface {
  onChange?: Function
  defaultChecked?: boolean
  checked?: boolean
  text?:string
}

export interface Filter extends defaultInterface {
  text?: string
  type: "input" | "select" | "datepicker" | "rangepicker" | "button" | "checkbox"
  item: FilterInputItem & FilterSelectItem & FilterDatePickerItem & FilterRangePickerItem & FilterButtonItem & FilterCheckBoxItem
  isNewline?: boolean
}

export interface Tables extends defaultInterface {
  bordered?: boolean
  columns?: (TableColumnType<object>)[]
  dataSource?: Array<object>
  rowKey?: string | GetRowKey<object>
  rowSelection?: object
  pagination?: false | TablePaginationConfig
  loading?: boolean
  tableLayout?: TableLayout
}

export interface BatchButton extends defaultInterface {
  onClick?: React.MouseEventHandler<HTMLElement>
  type?: "default" | "link" | "text" | "ghost" | "primary" | "dashed"
  text?: string
  attribute?: object
}

export interface Props extends defaultInterface {
  breadCrumb?: BreadCrumb
  statistic?: Array<Statistics>
  filters?: Array<Filter>
  slotTableTop?: JSX.Element
  table?: Tables
  slotTableBottom?: JSX.Element
  batchButton?: BatchButton
}

function PageSkeleton({ className, style, breadCrumb, statistic, filters, slotTableTop, table, slotTableBottom, batchButton }: Props): JSX.Element {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={`${defaultStyle["ele-page-skeleton"]}`}>
        <div className={`${defaultStyle["ele-page-skeleton-main"]} ${className}`} style={style}>
          {/* 面包屑导航部分 */}
          {breadCrumb ?
            <Breadcrumb {...breadCrumb}>
              {breadCrumb.childrens.map(item => {
                if (item.link) {
                  return (
                    <Breadcrumb.Item className={item.className} style={item.style} key={item.link}>
                      <Link to={item.link}>{item.text}</Link>
                    </Breadcrumb.Item>
                  )
                } else {
                  return (
                    <Breadcrumb.Item className={item.className} style={item.style} key={item.href} href={item.href}>
                      {item.text}
                    </Breadcrumb.Item>
                  )
                }
              })}
            </Breadcrumb>
            : null}
          {/* 数据统计部分 */}
          {statistic ?
            <div className={defaultStyle["ele-page-skeleton-statistics"]}>
              {statistic.map(item => {
                return <Statistic {...item} />
              })}
            </div>
            : null
          }
          {/* 数据筛选部分 */}
          {filters ?
            <div className={defaultStyle["ele-page-skeleton-filters"]}>
              {filters.map(v => {
              const { text, type, item, isNewline } = v
              let obj: JSX.Element;
              switch (type) {
                case 'input':
                  obj = <Input {...item} />
                  break;
                case 'select':
                  obj = (<Select {...item}>
                    {item.childrens.map(option => {
                      return <Option className={option.className} style={option.style} value={option.value}>{option.text}</Option>
                    })}
                  </Select>)
                  break;
                case 'datepicker':
                  obj = <DatePicker {...item} />
                  break;
                case 'rangepicker':
                  obj = <RangePicker className={`${defaultStyle["ele-page-skeleton-filters-rangepicker"]} ${item.className}`} style={item.style} value={item.value} defaultValue={item.defaultValue} onChange={item.onChange} showTime={item.showTime} allowClear={item.allowClear} separator={item.separator} format={item.format} picker={item.picker} />
                  break;
                case 'button':
                  obj = <Button className={`${defaultStyle["ele-page-skeleton-filters-button"]} ${item.className}`} style={item.style} type={item.type} onClick={item.onClick}>{item.text}</Button>
                  break;
                case 'checkbox':
                  obj = <Checkbox className={`${item.className}`} style={item.style} onChange={item.onChange} checked={item.checked} defaultChecked={item.defaultChecked}>{item.text}</Checkbox>
                  break;
              }
              return (
                <>
                  {isNewline?<div></div>:null}
                  {text ? <span>{text}</span> : null}
                  {obj}
                </>
              )
            })}
            </div>
            : null
          }
          {/* 表格顶部插槽 */}
          {slotTableTop ? slotTableTop : null}
          {/* 数据展示部分 */}
          {table ? (<Table {...table} />) : null}
          {/* 表格底部插槽 */}
          {slotTableBottom ? slotTableBottom : null}
          {/* 批量删除按钮 */}
          {batchButton ? <Button className={`${defaultStyle["ele-page-skeleton-button"]} ${batchButton.className}`} style={batchButton.style} onClick={batchButton.onClick} type={batchButton.type} {...batchButton.attribute}>{batchButton.text ? batchButton.text : '批量操作'}</Button> : null}
        </div>
      </div>
    </ConfigProvider>
  )
}

export default PageSkeleton