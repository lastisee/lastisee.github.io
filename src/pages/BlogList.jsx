import { useNavigate } from 'react-router-dom'
import styles from './BlogList.less'
import { useMemo } from 'react'
import { Empty } from 'antd'
import fileList from '../md/fileList.json'

const BlogList = ({ archiveName}) => {


    const currentList = useMemo(() =>{
        return fileList.filter(f => f.archive === archiveName).reverse()
    }, [archiveName])
    return (
        <div className={styles.blogList}>
            {currentList?.length > 0 ? currentList.map(item => {
                return <BlogItem key={item.title} {...item} />
            }) : <Empty />}
        </div>
    )
}

const BlogItem = ({title, createDate, author, id}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.blogItem}>
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

export default BlogList