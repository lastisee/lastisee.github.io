import styles from './Elevator.less'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useAtom } from 'jotai'
import { message, Modal, Radio } from 'antd'
import { useState } from 'react'
import { useInterval } from 'ahooks'
import { taskListAtom, eleStatusAtom } from './TaskList'

const Elevator = ({ eleName, floorList }) => {
    const [taskListData, setTaskListData] = useAtom(taskListAtom)
    const [eleStatus, setEleStatus] = useAtom(eleStatusAtom)
    const [open, setOpen] = useState(false)
    const [chooseFloor, setChooseFloor] = useState()
    const [curFloor, setCurFloor] = useState()
    const [elePosition, setElePosition] = useState(1) //电梯默认处于的楼层索引值
    const [curDirection, setCurDirection] = useState('static')
    const [target, setTarget] = useState()
    const onRadioChange = (e) => {
        const targetObj = floorList.find(item => item.id === e.target.value)
        setChooseFloor(e.target.value)
        setTarget(targetObj)
        console.log("🚀 ~ file: Elevator.jsx ~ line 16 ~ onRadioChange ~ target", target)
    }

    //100ms更新一次电梯的状态
    useInterval(()=> {
        const temp = {...eleStatus}
        temp[eleName].status = curDirection
        temp[eleName].elePosition = elePosition
        setEleStatus(temp)
    }, 100)

    const openModal = (curF, direction) => {
        setCurFloor(curF)
        setCurDirection(direction)
        setOpen(true)
    }
    const handleOk = () => {
        if(curFloor === target.floor){
            message.info('您正处于目标楼层')
        }else{
            const taskObj = {
                curFloor,
                direction: curDirection,
                targetFloor: target.floor,
                targetFloorIdx: floorList.find(f => f.floor === target.floor).floorIdx,
                time: new Date().getTime(),
                initEleName: eleName,
            }
            setTaskListData([...taskListData, taskObj])
        }
        setChooseFloor(undefined)
        setTarget(undefined)
        setOpen(false);
      };
    
      const handleCancel = () => {
        setTarget(undefined)
        setChooseFloor(undefined)
        setOpen(false);
      };
    return (
        <div className={styles.elevator}>
            <div className={styles.eleName}>
                <div className={styles.name}>{eleName}</div>
                <div className={styles.eleScreen}>
                    <div className={styles.eleRunDirection}></div>
                    <div className={styles.elePosition}>{floorList.find(item=> item.floorIdx === elePosition).floor}F</div>
                </div>
            </div>
            {[...floorList].reverse().map(item => {
                return (
                    <FloorItem openModal={openModal} floorObj={item} key={`${item.id}-${eleName}`} />
                )
            })}
            <Modal open={open} title="请选择目标您要前往的楼层" onOk={handleOk} onCancel={handleCancel}>
                <Radio.Group onChange={onRadioChange} value={chooseFloor}>
                    {[...floorList].reverse().map(item => {
                        return <Radio key={item.id} value={item.id}>{item.floor}</Radio>
                    })}
                </Radio.Group>
            </Modal>
        </div>
    )
}

const FloorItem = ({ floorObj, openModal }) => {
    
    return (
        <div className={styles.floorItem}>
            <div className={styles.floorNum}>{floorObj.floor}</div>
            <div className={styles.upBtn}><ArrowUpOutlined onClick={()=> openModal(floorObj.floor, 'up')} /></div>
            <div className={styles.downBtn}><ArrowDownOutlined onClick={()=> openModal(floorObj.floor, 'down')} /></div>
        </div>
    )
}

export default Elevator