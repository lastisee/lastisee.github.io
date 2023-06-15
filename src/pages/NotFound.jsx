import { Link } from 'react-router-dom'
import styles from './NotFound.less'

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.title}>
                404---&gt;something error
            </div>
            <div className={styles.desc}>
            页面不存在或者页面已被移除...
            </div>
            <div className={styles.link}>
                <Link to='/'>返回首页</Link>
            </div>
        </div>
    )
}

export default NotFound