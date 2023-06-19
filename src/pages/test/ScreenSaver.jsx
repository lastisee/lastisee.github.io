import { generateRandomString } from "../../utils";
import Ball from "./Ball"
import styles from './Ball.less'
import { useEffect, useRef, useState } from "react";

const idxList = Array.from({length: 20}, () => ({num: Math.floor(Math.random() * 10), key: generateRandomString(8)}));

const ScreenSaver = () => {

    const wrapperRef = useRef()

    const [locList, setLocList] = useState([])

    useEffect(() =>{
        setLocList(idxList.map(item => ({id: item.key})))
    }, [])

    // useEffect(() =>{
    //     console.log('locList------->', locList)
    // }, [locList])

    const updateLoc = (id, x, y) => {
        const newList = locList.map(item => {
            if(item.id === id){
                return {
                    ...item,
                    x,
                    y
                }
            }
            return item
        })
        setLocList(newList)
    }

    return (
        <div ref={wrapperRef} className={styles.screenSaver}>
            {idxList.map((item, i) => <Ball updateLoc={updateLoc} id={item.key} key={item.key} colorIdx={item.num} />)}
        </div>
    )
}

export default ScreenSaver