import styles from './MyHeader.less'
import { Link } from 'react-router-dom'


const MyHeader = () => {
    return (
        <div className={styles.myHeader}>
            <div className={styles.title}><Link to='/' className={styles.webSlogan}>lastisee</Link></div>
            <div className={styles.link}>
                <Link to='/'>Home</Link>
                <Link to='/javascript'>JavaScript</Link>
                <Link to='/react'>React</Link>
                <Link to='/note'>随记</Link>
            </div>
            <div className={styles.poem}>
                <span>行到水穷处，坐看云起时</span>
            </div>
            
        </div>
    )
}

export default MyHeader