import styles from './Task.less'
import { atom, useAtom } from 'jotai'
import { Descriptions, Empty } from 'antd'

export const taskListAtom = atom([])

const TaskList = () => {

    const [taskListData, setTaskListData] = useAtom(taskListAtom)

    return (
        <div className={styles.taskWrapper}>
            <div className={styles.taskLeft}>
                <div className={styles.taskMsgBox}>
                    <div className={styles.msgTitle}>
                        任务列表
                    </div>
                    <div className={styles.msgContent}>
                        {taskListData.length > 0 ? taskListData.map(item => {
                            return <TaskItem key={item.time} obj={item} />
                        }) : <Empty />}
                    </div>
                </div>
            </div>
            <div className={styles.taskRight}>
                <div className={styles.taskMsgBox}>
                    <div className={styles.msgTitle}>
                        任务处理日志
                    </div>
                    <div className={styles.msgContent}></div>
                </div>
            </div>

        </div>
    )
}

const TaskItem = ({ obj }) => {
    return (
        <div className={styles.taskItem}>
            <Descriptions title={new Date(obj.time).toLocaleString()}>
                <Descriptions.Item label="目标楼层">{obj.targetFloor}</Descriptions.Item>
                <Descriptions.Item label="当前位于">{obj.curFloor}</Descriptions.Item>
                <Descriptions.Item label="方向">{obj.direction === 'up' ? '上行' : '下行'}</Descriptions.Item>
            </Descriptions>
        </div>
    )

}
export default TaskList