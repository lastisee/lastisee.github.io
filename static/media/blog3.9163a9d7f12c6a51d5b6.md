### umi3升级umi4注意事项

- layout组件里面的props.children统一替换成

  ```javascript
  import {Outlet} from 'umi'
      <Outlet />
  ```

​	其它组件依然使用props.children

- umi4大小写敏感，git对文件夹大小写不敏感，所以本地开发需要把文件夹改成驼峰命名，首字母小写

- umi4废弃了document.ejs HTML模板文件，所以需要自行拼凑HTMl模板文件，比如需要引入的外部js资源等，需要在项目根目录下面的plugin.ts文件里面进行注册，umi会自动识别该文件

- /src/app.tsx 该文件默认注册为运行时配置文件，可以实现复写render，修改路由标题等操作

- 由于umi4使用webpack5，webpack5不需要配置file-loader，如果需要加载本地资源，在config.ts里面的webpack配置部分使用

  ```javas
  .type("asset/resource")
  ```

  即可

- 全局样式覆盖文件使用overrides.less
