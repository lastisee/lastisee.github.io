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
                <Link to='/' onClick={()=>setVisible(false)}>Home</Link>
            </div>
            <div className={styles.menuItem}>
                <Link to='/javascript' onClick={()=>setVisible(false)}>JavaScript</Link>
            </div>
            <div className={styles.menuItem}>
                <Link to='/react' onClick={()=>setVisible(false)}>React</Link>
            </div>
            <div className={styles.menuItem}>
                <Link to='/note' onClick={()=>setVisible(false)}>随记</Link>
            </div>
        </div>
    )
    return (
        <div className={styles.headerM}>
            <div className={styles.title}>
                <Link to='/' className={styles.webSlogan}>lastisee</Link>
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