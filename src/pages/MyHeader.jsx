import styles from './MyHeader.less'
import { Link } from 'react-router-dom'
const MyHeader = () => {
    return (
        <div className={styles.myHeader}>
            <Link to='/'>Home</Link>
            <Link to='/javascript'>Javascript</Link>
            <Link to='/react'>React</Link>
            <Link to='/note'>随记</Link>
        </div>
    )
}

export default MyHeader