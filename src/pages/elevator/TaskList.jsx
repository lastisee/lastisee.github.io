import styles from './Task.less'
import { atom, useAtom } from 'jotai'
import { Descriptions, Empty } from 'antd'
import { useEffect } from 'react'

export const taskListAtom = atom([])

export const runTaskListAtom = atom([])

export const eleStatusAtom = atom({
        'e-1': {
            status: 'static',
            elePosition: 1,
        },
        'e-2': {
            status: 'static',
            elePosition: 1,
        },
        'e-3': {
            status: 'static',
            elePosition: 1,
        }
    },
)

const TaskList = () => {

    const [taskListData, setTaskListData] = useAtom(taskListAtom)
    const [runTaskList, setRunTaskList] = useAtom(runTaskListAtom)
    const [eleStatus, setEleStatus] = useAtom(eleStatusAtom)

    const calcDistance = (task)=> {
        let distance = 999
        for(const key in eleStatus){
            if(distance >= eleStatus[key].elePosition){
                distance = eleStatus[key].elePosition
            }
        }
    }

    useEffect(()=> {
        if(taskListData.length > 0){
            //过滤出没有处理的任务
            const tempArr = taskListData.filter(item => !item?.hasProcessed)
            //取出任务队列中最新的任务
            const [latestTask] = [...tempArr].slice(-1)
            //找出离该任务最近的一台电梯
            //如果创建任务的电梯自身处于静止状态，那么这个任务就由
            if(eleStatus[latestTask.initEleName].status === 'static'){

            }
        }
    }, [eleStatus, taskListData])

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
            <Descriptions title={`${obj.initEleName}--->${new Date(obj.time).toLocaleString()}`}>
                <Descriptions.Item label="目标楼层">{obj.targetFloor}</Descriptions.Item>
                <Descriptions.Item label="当前位于">{obj.curFloor}</Descriptions.Item>
                <Descriptions.Item label="方向">{obj.direction === 'up' ? '上行' : '下行'}</Descriptions.Item>
            </Descriptions>
        </div>
    )

}
export default TaskList