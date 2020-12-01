### 描述：

这是一个 playcanvas 的点击事件和鼠标事件的简单封装；

### 用法：

带有 camera 组件的 entity 绑定这个脚本，其他脚本直接 entity.on 使用,事件名称为"event:+事件名称"；

#### 具体：

```
this.entity.on('event:EVENT_MOUSEDOWN',function(event){
  //do something
})
```

### 支持的事件：

#### 鼠标：

'EVENT_MOUSEDOWN','EVENT_MOUSEMOVE','EVENT_MOUSEMOVE','EVENT_MOUSEWHEEL'

#### 手机 touch：

'EVENT_TOUCHSTART','EVENT_TOUCHMOVE','EVENT_TOUCHEND','EVENT_TOUCHCANCEL'
