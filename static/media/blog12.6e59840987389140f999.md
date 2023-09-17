### 兼容ie8的前端解决方案

#### 前期选型

- nerv.js 这是京东的项目，和taro是同一个公司的项目，这个最终未能运行
- anujs，这是司徒正美大神的作品，尝试了许久，仍然未能运行
- layui，最终选用这个js库进行开发

#### layui使用注意点

- 按照官网示例，兼容ie8需要在文件开头引入如下代码段

  ```xml
  <!--[if lt IE 9]>
          <script src="https://cdn.bootcdn.net/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
  	<script src="https://cdn.bootcdn.net/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
  	<![endif]-->
  ```

- 注意，layui的模块定义与导入在ie8/9上是不支持的，所以不用考虑抽离公共模块的代码了，老老实实cv吧。

- 页面代码的分离，由于没有怎么写过这种原生js的项目，所以我这里采用通过ajax拉取子页面的HTML文件的方式来实现，比如一个页面由sider和content组成，sider是一致的，content会根据sider的变化而变化，所以切换content的逻辑就放到sider里面，将获取到的HTML文件赋值给content的父容器即可。

- ie8对于下拉框，即select-option标签的处理有点特殊，如果初始状态没有option，需要手动给一个空的option，否则会报错，示例如下

  ```html
  <select><option></option></select>
  ```

- ie8对于对象数组的处理也有点特殊，对于数组中最后一个对象，末尾不要加上逗号，否则ie会认为多出来一个undefined元素
- 跨域调试的处理，在调用Ajax之前，加上一句`jQuery.support.cors = true`
- 代码整洁度，需要检查有无未关闭的div标签等，chrome不会报错，ie会报错。
- js语法，es5/6的语法就不要用了，老老实实for循环吧，字符串处理及数组处理的一些api使用之前也要考虑一下兼容性。