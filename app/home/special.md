# sm @media (width >= 640px)

# md >=768

# lg >= 1024

# xl >=1280

# 2xl >=1536

# box-sizing: content-box; 盒子以内容为主

## css height 就是 content height

# box-sizing: border-box; 盒子以边框为主

## css height = content height + padding

# terminals important field

**termial config**

```
{
    type: 'source', //  handle类型，source一般指输出点
    id: 'output-6', // 最终handle的id
    rawId: '6', // 原始id，一般用来生成 最终handle的id
    group: '6', // 所在分组
    backendPortId: 'p2',// 接口所需的id, 通过nodetype找到terminals config, 再通过handleId找到backendPortId
    contactType: 'no', // 常开 或 常闭
}
```

**传给接口的component**

```
{
    id: "comp_001"， // component id
    displayType: "acPower"， // 后端需要的元器件 类型
    state: 'normal', // 元器件当前的状态
    ports: [], // handle句柄
    displayName: "POWER"，// UI界面展示的名字
    type: "generic", // 目前都是generic
    metadata: {}, // 注册时的元数据 ==> 默认值中的元数据 ==> node.data中和元数据字段相同的数据 ==> 元数据
    position: {x: 115, y: -555}, // UI界面展示的位置
    nodeData: {label: "POWER"} // reactflow node 的data
},
```

**传给接口的connection**

```
{
    id:"conn_002", // connection id
    sourceId:"comp_001", // 源node id
    sourcePortId:"p2", // 后端需要的 源node的id
    targetId:"comp_008", // 目标node id
    targetPortId:"contact1_no" //  后端需要的 目标node的id
}
```
