import { useEffect, useState, useMemo } from 'react'
import {marked} from 'marked'
import styles from './BlogDetailM.less'
import { useParams } from 'react-router-dom'
import fileList from '../../md/fileList.json'
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/school-book.css'
// import 'highlight.js/styles/base16/monokai.css'

marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
}));
  
marked.parse(`
\`\`\`javascript
const highlight = "code";
\`\`\`
`);

const BlogDetail = ({fileName}) => {

    
    const rendererMD = new marked.Renderer();
    marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      });

    const params = useParams()

    const [markdownContent, setMarkdownContent] = useState('') //html内容

    const currentFile = useMemo(()=> {
        if(!params?.id) return
        return fileList.find(f => f.id === Number(params?.id))
    }, [params?.id])

    useEffect(()=> {
        if(currentFile){
            const loadFile = async () => {
                const mdFile = await import(`../../md/${currentFile.fileName}`)
                const filePath = await mdFile.default
                fetch(filePath).then(res => res.text()).then(text => {
                    const html = marked(text)
                    setMarkdownContent(html)
                })
            }
            loadFile()
        }
    }, [currentFile])

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