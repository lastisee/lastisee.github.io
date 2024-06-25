import { useEffect, useState, useMemo } from 'react'
import { marked } from 'marked'
import styles from './BlogDetail.less'
import { useParams, useNavigate } from 'react-router-dom'
import fileList from '../md/fileList.json'
import { markedHighlight } from "marked-highlight";
import { Spin } from 'antd'
import hljs from 'highlight.js';
// import 'highlight.js/styles/vs.css'
// import 'highlight.js/styles/school-book.css'
// import 'highlight.js/styles/base16/harmonic16-dark.css'
import 'highlight.js/styles/base16/monokai.css'
import NotFound from './NotFound'

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

const BlogDetail = ({ fileName }) => {

    const params = useParams()
    const navigate = useNavigate()
    const [isNotFound, setIsNotFound] = useState(false)

    const [markdownContent, setMarkdownContent] = useState('') //html内容

    const currentFile = useMemo(() => {
        if (!params?.id) {
            return false
        }else{
            const target = fileList.find(f => f.id === Number(params?.id))
            if(!target) {
                setIsNotFound(true)
            }
            return target ?? false
        }
    }, [params?.id])

    useEffect(() => {
        if (currentFile && !markdownContent) {
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
            {isNotFound ? <NotFound /> :
            <><div className={styles.topInfo}>
                <div className={styles.leftBack} titile="返回" onClick={()=>navigate(-1)}>返回</div>
                <div className={styles.date}>
                    <span className={styles.title}>发布日期：</span>
                    <span className={styles.text}>{currentFile.createDate}</span>
                </div>
            </div>
            {markdownContent && <div className={styles.content}>
                <div dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </div>}
            {!markdownContent && <div className={styles.loading}><Spin tip='数据加载中...'><div className="content" /></Spin></div>}
            </>
            }
        </div>
    )
}

export default BlogDetail