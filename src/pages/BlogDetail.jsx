import { useEffect, useState } from 'react'
import md from '../md/test.md'
import {marked} from 'marked'
import styles from './BlogDetail.less'

const BlogDetail = () => {

    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    useEffect(()=> {
        fetch(md).then(res => res.text())
        .then(text => {
            let html = marked(text)
            setMarkdownContent(html)
        })
    }, [])

    return (
        <div className={styles.blogDetail}>
            <h3>这是文章详情</h3>
            <div dangerouslySetInnerHTML={{ __html: markdownContent  }}></div>
        </div>
    )
}

export default BlogDetail