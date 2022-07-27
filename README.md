##### 通用页面布局组件
通过 typescript 进一步封装 antd，进一步规范页面布局

##### 使用方法
```jsx
let tableTemplate =  breadCrumb={{
    childrens:[{
      text: 'xxx模块'
    }, {
      text: 'xxx功能'
    }]
  }}
  statistic={[{
    title: '当天所有用户',
    value: this.state.day_all,
    valueStyle: {color: '#2ecc71', fontSize: 20}
  }, {
    title: '当天未审核用户',
    value: this.state.day_undo,
    valueStyle: {color: '#2980b9', fontSize: 20}
  }, {
    title: '所有未审核用户',
    value: this.state.all_undo,
    valueStyle: {color: '#273c75', fontSize: 20}
  }, {
    title: '超时未审核作品数量',
    value: this.state.expire_num == null ? '0' : this.state.expire_num,
    valueStyle: {color: '#33ccff', fontSize: 20}
  }, {
    title: '最早未审核时间',
    value: this.state.earliest_time == null ? '暂无' : this.state.earliest_time,
    valueStyle: {color: '#9933ff', fontSize: 20}
  }]}
  filters={[{
    text: '审核状态: ',
    type: 'select',
    item: {
      onChange: this.handleSelectHumanResChange1.bind(this),
      showSearch: true,
      // style: {width: 200},
      placeholder: '请选择筛选条件',
      defaultValue: `${this.state.human_result}`,
      childrens: [{
        value: '-1',
        text: '所有'
      }, {
        value: '0',
        text: '待审核'
      }, {
        value: '1',
        text: '通过'
      }, {
        value: '2',
        text: '不通过'
      }]}
  }, {
    text: '审核商: ',
    type: 'select',
    item: {
      onChange: this.handleSelectSupplierChange.bind(this),
      showSearch: true,
      // style: {width: 200},
      placeholder: '请先选择审核商',
      defaultValue: this.state.supplier,
      childrens: [{
      value: "A",
      text: "A"
    }, {
      value: "B",
      text: "B"
    }, {
      value: "C",
      text: "C"
    }, {
      value: "REVIEW",
      text: "REVIEW"
    }]}
  }, {
    text: '可疑用户ID: ',
    type: 'input',
    item: {
      onChange: this.setUserId.bind(this),
      // style: {width: 200},
      allowClear: true
    }
  }, {
    text: '时间: ',
    type: 'datepicker',
    item: {
      onChange: ([start, end]) => { this.onStartDateChange(start); this.onEndDateChange(end) },
      defaultValue: [Moment(this.state.start_time), Moment(this.state.end_time)],
      allowClear: true,
      // style: {marginRight: '10px'},
      showTime: true,
    }
  }, {
    type: 'button',
    item: {
      type: 'primary',
      // style: {borderRadius: '5px'},
      onClick: () => this.initdata(1),
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
    // style: {position: 'fixed', right: '30px', bottom: '15px', borderRadius: '5px'},
    onClick: () => this.handleBatchWithdraw(),
    text: '批量提交',
    type: 'primary'
  }}
```


```jsx
<PageSkeleton 
  {...tableTemplate}
  />
```

