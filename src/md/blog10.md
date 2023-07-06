### 如何在内网中使用tinymce富文本组件

- 最近需要在富文本编辑器中完整保留从wps/word文档复制过来的样式，踩坑无数，最后选定`@tinymce/tinymce-react`这个库。

- 这个库的使用有一点需要注意的是，在调用该库提供的`Editor`组件时，如果是在联网的情况下，需要传入`apiKey`，这个key可以自己从 https://tiny.cloud 注册得到，得到这个key之后，该库会使用由这个key作为参数的url去拉取cdn上的资源，如下所示：

  > https://cdn.tiny.cloud/1/yourKey/tinymce/6/tinymce.min.js 

  所以这就注定在内网中，这个key没有意义，无需注册。

- 所以在内网中，我们需要提前把这个cdn资源下载下来，可以在 https://www.tiny.cloud/get-tiny/ 官网首页点击中间右侧按钮`download tinymce sdk`来下载该库运行所需的资源，同时在 https://www.tiny.cloud/get-tiny/language-packages/ 下载中文语言包，这两个压缩包下载完成之后，将sdk压缩包复制到public目录下，选择解压到当前目录，同时将语言包解压之后的js文件放到public目录下，此时，调用`Editor`组件的示例为

  ```javascript
  import { Editor } from '@tinymce/tinymce-react'
  
  const App = () => {
  	return (
  		<div>
  			<h2>hello</h2>
  			<Editor
  				// apiKey={'xxx'} 内网环境该参数无需传入
  				tinymceScriptSrc="tinymce/js/tinymce/tinymce.min.js"
  				initialValue={''}
  				// onInit={init}
  				id="Editor-Component_Container_TinyEditor"
  				// inline={true}
  				scriptLoading={{ async: true }} // 异步加载
  				init={{
  					min_height: 500,
                      // 语言包加载
  					language: 'zh-Hans',
  					language_url: '/zh-Hans.js',
  					//其余配置项省略
  				}}
  			// onDirty={onDirty}
  			></Editor>
  		</div>
  	)
  }
  export default App
  ```
  
  

- 至此，组件初始化完毕，其它api还待后面再详述。