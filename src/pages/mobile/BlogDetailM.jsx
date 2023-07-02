import { useEffect, useState, useMemo } from 'react'
import {marked} from 'marked'
import styles from './BlogDetailM.less'
import { useParams } from 'react-router-dom'
import fileList from '../../md/fileList.json'
import { addClassToPreTags } from '../BlogDetail'

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