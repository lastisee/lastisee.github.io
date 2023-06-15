import { Link, useNavigate } from 'react-router-dom'
import styles from './BlogList.less'
import { useMemo } from 'react'
import fileList from '../md/fileList.json'

console.log("🚀 ~ file: BlogList.jsx ~ line 5 ~ fileList", fileList)

const BlogList = ({ archiveName}) => {


    const currentList = useMemo(() =>{
        return fileList.filter(f => f.archive === archiveName)
    }, [archiveName])
    return (
        <div className={styles.blogList}>
            {currentList.map(item => {
                return <BlogItem key={item.title} {...item} />
            })}
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