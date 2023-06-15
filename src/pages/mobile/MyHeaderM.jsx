import styles from './MyHeaderM.less'
import { Popup } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {UnorderedListOutline} from 'antd-mobile-icons'

const MyHeaderM = () => {

    const [visible, setVisible] = useState(false)

    const menuList = (
        <div className={styles.menuList}>
            <div className={styles.menuItem}>
                <Link to='/'>Home</Link>
            </div>
            <div className={styles.menuItem}>
                <Link to='/javascript'>JavaScript</Link>
            </div>
            <div className={styles.menuItem}>
                <Link to='/react'>React</Link>
            </div>
            <div className={styles.menuItem}>
                <Link to='/note'>随记</Link>
            </div>
        </div>
    )
    return (
        <div className={styles.headerM}>
            <div className={styles.title}>
                lastisee
            </div>
            <div className={styles.icon} onClick={()=> setVisible(true)}>
                <UnorderedListOutline />
            </div>
            <Popup
              visible={visible}
              onMaskClick={() => {
                setVisible(false)
              }}
              onClose={() => {
                setVisible(false)
              }}
              position='right'
              bodyStyle={{ width: '60vw', backgroundColor: '#f5f5f5' }}
            >
              {menuList}
            </Popup>
        </div>
    )
}



export default MyHeaderM