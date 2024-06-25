import styles from './Elevator.less'
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'

const Elevator = ({eleName, floorList})=> {
    return (
        <div className={styles.elevator}>
            <div className={styles.eleName}>{eleName}</div>
            {[...floorList].reverse().map(item=> {
                return (
                    <FloorItem floorObj={item} key={`${item.id}-${eleName}`} />
                )
            })}
        </div>
    )
}

const FloorItem =({floorObj})=>{
    return (
        <div className={styles.floorItem}>
            <div className={styles.floorNum}>{floorObj.floor}</div>
            <div className={styles.upBtn}><ArrowUpOutlined /></div>
            <div className={styles.downBtn}><ArrowDownOutlined /></div>
        </div>
    )
}

export default Elevator