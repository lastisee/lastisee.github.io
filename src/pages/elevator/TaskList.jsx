import styles from './Task.less'

const TaskList = ()=> {

    return (
        <div className={styles.taskWrapper}>
            <div className={styles.taskMsgBox}>
                <div className={styles.msgTitle}>
                    任务处理日志
                </div>
                <div className={styles.msgContent}></div>
            </div>
        </div>
    )
}
export default TaskList