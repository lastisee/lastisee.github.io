import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import md from '../md/test.md'
import styles from './BlogDetail.less'

const BlogDetail = () => {

    const [src, setSrc] = useState()
    useEffect(()=> {
        fetch(md).then(res => res.text())
        .then(text => setSrc(text))
    })
    return (
        <div className={styles.blogDetail}>
            <h3>这是文章详情</h3>
            <Markdown children={src} />
        </div>
    )
}

export default BlogDetail