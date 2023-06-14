import { Link } from 'react-router-dom'
import styles from './BlogList.less'

const BlogList = ({ archiveName}) => {
    return (
        <div className={styles.blogList}>
            <h3>文章列表组件</h3>
            <span>{archiveName}</span>
            <Link to='/blog'>查看文章</Link>
        </div>
    )
}

export default BlogList