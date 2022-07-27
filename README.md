##### 通用页面布局组件
通过 typescript 进一步封装 antd，进一步规范页面布局

##### 使用方法
```jsx
let tableTemplate =  {
  breadCrumb={{
    childrens:[{
      text: 'xxx模块'
    }, {
      text: 'xxx功能'
    }]
  }}
  statistic={[{
    title: 'xxx用户',
    value: this.state.day_all,
    valueStyle: {color: '#2ecc71', fontSize: 20}
  }, {
    title: 'xxx用户',
    value: this.state.day_undo,
    valueStyle: {color: '#2980b9', fontSize: 20}
  }, {
    title: 'xxx用户',
    value: this.state.all_undo,
    valueStyle: {color: '#273c75', fontSize: 20}
  }]}
  filters={[{
    text: 'xx状态: ',
    type: 'select',
    item: {
      onChange: this.statusOnChange,
      showSearch: true,
      placeholder: '请选择筛选条件',
      defaultValue: this.state.status,
      childrens: [{
        value: '-1',
        text: '所有'
      }, {
        value: '0',
        text: 'xxx'
      }]}
  }, {
    text: 'xxx商家: ',
    type: 'select',
    item: {
      onChange: this,merchantOnChange,
      showSearch: true,
      placeholder: '请先选择审核商',
      defaultValue: this.state.supplier,
      childrens: [{
      value: "-1",
      text: "所有"
    }, {
      value: "0",
      text: "xxx"
    }]}
  } {
    text: '时间: ',
    type: 'datepicker',
    item: {
      onChange: ([start, end]) => { this.onStartDateChange(start); this.onEndDateChange(end) },
      defaultValue: [Moment(this.state.start_time), Moment(this.state.end_time)],
      allowClear: true,
      showTime: true,
    }
  }, {
    type: 'button',
    item: {
      type: 'primary',
      onClick: () => this.initdata(),
      text: '查询'
    }
  }]}
  table={{
    bordered: true,
    columns: this.tableTemplate,
    dataSource: this.state.data,
    rowKey: (record) => record.key,
    pagination: pagination,
    rowSelection: rowSelectionConf
  }}     
  batchButton={{
    onClick: () => this.handleBatchWithdraw(),
    text: '提交按钮',
    type: 'primary'
  }}
}
```


```jsx
<PageSkeleton 
  {...tableTemplate}
  />
```

