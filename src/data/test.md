# simpleNote

这是一个基于create-react-app脚手架的在线笔记，预计可以实现从前端到后台完整的功能，页面设计参考[Simplenote](https://simplenote.com/)。

## todolist
- hover时的延迟出现的标签提示

## 笔记暂存
### 只用CSS实现将单个元素置于底层
```css
containerEle:before { //用伪元素+flex-box的order属性来填充
                content: '';
                display: flex;
                flex-grow: 1;
                order: 3;
            }
```
- 使用伪元素+flex-grow(膨胀占据不用的空间)+order(伪元素自动排最后或者最前，故需要order来重新排序，达到让某个元素被挤到最后的效果)