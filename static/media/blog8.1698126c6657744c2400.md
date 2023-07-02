### 使用marked-highlight及highlight.js完成md文件的代码高亮

- marked.setOptions({})这个方法里面的highlight配置项在marked 5.0版本之后已经废弃，网上现在的教程多是老版本。

  | highlight (**deprecated**) | `function` | `null` | v0.3.0 | Deprecated in v5.0.0 use [`marked-highlight`](https://www.npmjs.com/package/marked-highlight) to add highlighting to code blocks. |      |
  | -------------------------- | ---------- | ------ | ------ | ------------------------------------------------------------ | ---- |

- 在5.0版本之后推荐使用marked-highlight,官网配置如下：

  ```javascript
  import {marked} from "marked";
  import {markedHighlight} from "marked-highlight";
  import hljs from 'highlight.js';
  
  // or UMD script
  // <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
  // <script src="https://cdn.jsdelivr.net/npm/marked-highlight/lib/index.umd.js"></script>
  // const {markedHighlight} = globalThis.markedHighlight;
  //需要注意，这里的配置需要放到组件外面，如果放在组件内部，会直接渲染成HTML源代码，同时这个配置是全局的，
  //如果有多个页面需要使用marked，只在一处配置即可
  marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  }));
  ```

- 配置完上述代码之后，还需要在组件头部引入code theme对应的css,每个主题的具体效果可以在这里查看

  https://highlightjs.org/static/demo/

  ```javascript
  //可以从base16下方引入，也可以从base16同级目录进行引入
  import 'highlight.js/styles/base16/monokai.css'
  ```

- 此时，可以看到代码已经高亮，但是并没有背景，因为此时生成的HTML文本里面的pre标签确实`class="hljs"`属性,这里使用工具方法对生成的HTML文本进行处理，同时加上padding，padding亦可通过样式文件进行添加

  ```javascript
  export function addClassToPreTags(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const preTags = doc.querySelectorAll('pre:not([class])');
      preTags.forEach(tag => {
        tag.classList.add('hljs');
        //代码段背景样式
        tag.style.padding = '12px'
      });
      return doc.documentElement.outerHTML;
    }
  //或者
  .hljs code{
      display: block;
      padding: 1em;
  }
  ```

- 下方附上完整代码

  ```javascript
  import { useEffect, useState, useMemo } from 'react'
  import {marked} from 'marked'
  import styles from './BlogDetail.less'
  import { useParams } from 'react-router-dom'
  import fileList from '../md/fileList.json'
  import {markedHighlight} from "marked-highlight";
  import hljs from 'highlight.js';
  // import 'highlight.js/styles/vs.css'
  // import 'highlight.js/styles/school-book.css'
  // import 'highlight.js/styles/base16/harmonic16-dark.css'
  import 'highlight.js/styles/base16/monokai.css'
  
  export function addClassToPreTags(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const preTags = doc.querySelectorAll('pre:not([class])');
      preTags.forEach(tag => {
        tag.classList.add('hljs');
      //   tag.style.padding = '12px'
      });
      return doc.documentElement.outerHTML;
    }
  
  //这个设置是全局的，且只能放在组件外，所以移动端详情页不需要做这个配置，直接使用marked即可
  marked.use(markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
      }
  }));
  
  const BlogDetail = ({fileName}) => {
  
      const params = useParams()
  
      const [markdownContent, setMarkdownContent] = useState('') //html内容
  
      const currentFile = useMemo(()=> {
          if(!params?.id) return
          return fileList.find(f => f.id === Number(params?.id))
      }, [params?.id])
  
      useEffect(()=> {
          if(currentFile && !markdownContent){
              const loadFile = async () => {
                  const mdFile = await import(`../md/${currentFile.fileName}`)
                  const filePath = await mdFile.default
                  fetch(filePath).then(res => res.text()).then(text => {
                      //highlight.js处理过后的HTML段的pre标签没有类名，手动加上，同时加上padding
                      const html = addClassToPreTags(marked(text))
                      setMarkdownContent(html)
                  })
              }
              loadFile()
          }
      }, [currentFile, markdownContent])
  
      return (
          <div className={styles.blogDetail}>
              <div className={styles.date}>
                  <span className={styles.title}>发布日期：</span>
                  <span className={styles.text}>{currentFile.createDate}</span>
              </div>
              <div className={styles.content}>
                  <div dangerouslySetInnerHTML={{ __html: markdownContent}}></div>
              </div>
          </div>
      )
  }
  
  export default BlogDetail
  ```

- 最后想多说两句，之前是使用gh-pages将react项目部署到github pages时遇到的坑，如果你的xxx.github.io需要绑定域名，你需要在对应项目的gh-pages分支上根目录添加CNAME文件，同时package.json里面的homepage属性直接改为`http://xxx.com`即可。

  如果不需要绑定域名，直接参照网上现有教程即可。

- 同时如果出现只能访问根路由，比如`http://xxx.com`,如果访问`http://xxx.com/a`即显示页面空白，f12调试发现找不到js文件，此时需要在`public/index.html`里面把所有`%PUBLIC_URL%/`都删除掉，否则打包出来的文件路径是错误的。