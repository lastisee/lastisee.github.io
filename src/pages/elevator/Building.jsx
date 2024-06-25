import TaskList from "./TaskList"
import Elevator from "./Elevator"
import styles from './Building.less'
import { floorList1, floorList2, floorList3} from './floorList'

const Building = ()=>{
    return (
        <div className={styles.building}>
            <TaskList />
            <div className={styles.elevatorBox}>
                <Elevator eleName="e-1" floorList={floorList1}/>
                <Elevator eleName="e-2" floorList={floorList2}/>
                <Elevator eleName="e-3" floorList={floorList3}/>
            </div>
        </div>
    )
}

export default Building