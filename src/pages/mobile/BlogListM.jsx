import { useNavigate } from 'react-router-dom'
import styles from './BlogListM.less'
import { useMemo } from 'react'
import { ErrorBlock } from 'antd-mobile'
import fileList from '../../md/fileList.json'

const BlogListM = ({ archiveName}) => {

    const currentList = useMemo(() =>{
        return fileList.filter(f => f.archive === archiveName).reverse()
    }, [archiveName])
    return (
        <div className={styles.blogListM}>
            {currentList?.length > 0 ? currentList.map(item => {
                return <BlogItem key={item.title} {...item} />
            }) : <ErrorBlock status='empty' />}
        </div>
    )
}

const BlogItem = ({title, createDate, author, id}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.blogItemM}>
            <div className={styles.title} onClick={()=> navigate(`/blog/${id}`)}>
                {title}
            </div>
            <div className={styles.info}>
                <div className={styles.author}>{author}</div>
                <div className={styles.date}>{createDate}</div>
            </div>
        </div>
    )
}

export default BlogListM