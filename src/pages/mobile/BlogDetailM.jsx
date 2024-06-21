import { useEffect, useState, useMemo } from 'react'
import { marked } from 'marked'
import styles from './BlogDetailM.less'
import { useParams, useNavigate } from 'react-router-dom'
import fileList from '../../md/fileList.json'
import { addClassToPreTags } from '../BlogDetail'
import { Spin } from 'antd'

const BlogDetail = ({ fileName }) => {

    const params = useParams()
    const navigate = useNavigate()

    const [markdownContent, setMarkdownContent] = useState('') //html内容

    const currentFile = useMemo(() => {
        if (!params?.id) return
        return fileList.find(f => f.id === Number(params?.id))
    }, [params?.id])

    useEffect(() => {
        if (currentFile && !markdownContent) {
            const loadFile = async () => {
                const mdFile = await import(`../../md/${currentFile.fileName}`)
                const filePath = await mdFile.default
                fetch(filePath).then(res => res.text()).then(text => {
                    const html = addClassToPreTags(marked(text))
                    setMarkdownContent(html)
                })
            }
            loadFile()
        }
    }, [currentFile, markdownContent])

    return (
        <div className={styles.blogDetail}>
            <div className={styles.topInfo}>
                <div className={styles.leftBack} onClick={()=>navigate(-1)}>返回</div>
                <div className={styles.date}>
                    <span className={styles.title}>发布日期：</span>
                    <span className={styles.text}>{currentFile.createDate}</span>
                </div>
            </div>
            {markdownContent && <div className={styles.content}>
                <div dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </div>}
            {!markdownContent && <div className={styles.loading}><Spin tip='数据加载中...'><div className="content" /></Spin></div>}
        </div>
    )
}

export default BlogDetail