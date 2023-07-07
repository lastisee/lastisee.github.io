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
  
  

- 经过对比，最终选用了古老的`bootstrap-wysiwyg`插件（很无奈），`jQuery`加`react`真的是不伦不类，我只想说一句：就是这个插件初始化所使用的`jQuery`应当是从react项目中的`html`模板文件头部引入的，如果使用`import $ from 'jquery'`来引入`$`,那么此时的jQuery运行的上下文里面是没有`$('#editor').wysiwyg()`这个方法的，故正确的方式是在代码中直接使用`$`即可，无需引入。