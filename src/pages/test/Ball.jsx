import styles from './Ball.less'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { calculateIntersectionPoints } from '../../utils'
import { useInterval } from 'ahooks'

const colorMap = {
    0: '#CCFFFF',
    1: '#FFFFCC',
    2: '#0099CC',
    3: '#FF9999',
    4: '#FFCCCC',
    5: '#336633',
    6: '#CC9999',
    7: '#CC9966',
    8: '#CCCC99',
    9: '#99CCCC',
}



const Ball = ({colorIdx = 0, id = '', updateLoc}) => {

    
    const ballRef = useRef()

    const [hasInit, setHasInit] = useState(false)
    //如果到达了边缘 重新生成targetLoc
    const [isToEdge, setIsToEdge] = useState(true)
    console.log("🚀 ~ file: Ball.jsx ~ line 30 ~ Ball ~ isToEdge", isToEdge)

    const [currentLoc, setCurrentLoc] = useState()

    const [targetLoc, setTargetLoc] = useState()

    const keyframe = useMemo(()=> {
        if(currentLoc && targetLoc){
            return `@keyframes ball-run-${id} {
                0%{
                    left: ${currentLoc?.x}px;
                    top: ${currentLoc?.y}px;
                }
                100%{
                    left: ${targetLoc?.x}px;
                    top: ${targetLoc?.y}px;
                }
            }`
        }
        return ''
    }, [currentLoc, targetLoc, id])

    // console.log('loc----->', currentLoc?.x, currentLoc?.y, targetLoc?.x, targetLoc?.y)

    useEffect(() => {
        if(isToEdge){
            //先清除head里面旧的keyframe
            const head = document.head;
            // 获取 head 标签内的所有 style 标签
            const styleTags = head.querySelectorAll('style');
            // 遍历所有 style 标签，删除内容中包含 @keyframes 的标签
            styleTags.forEach(tag => {
                const content = tag.textContent;
                    if (content.includes(`@keyframes ball-run-${id}`)) {
                        tag.parentNode.removeChild(tag);
                        console.log('移除keyframe')
                }
            });
        }
    }, [isToEdge])

    useEffect(()=> {
        if(keyframe){
            const style = document.createElement('style');
            // 将 keyframes样式写入style内
            style.innerHTML = keyframe;
            // 将style样式存放到head标签
            style.sheet?.insertRule(keyframe)
            document.getElementsByTagName('head')[0].appendChild(style);
            setIsToEdge(false)
        }
    }, [keyframe, id])

    useEffect(()=> {
        //只会执行一次，是给小球第一次运动的终点位置赋值
        if(isToEdge && currentLoc){
            const wrapper = document.querySelector(`.${styles.screenSaver}`)
            const angle = Number.parseInt(360 * Math.random())
            const {x, y} = calculateIntersectionPoints(currentLoc.x, currentLoc.y, angle, wrapper.clientWidth, wrapper.clientHeight)
            setIsToEdge(false)
            setTargetLoc({x, y})
        }
    }, [isToEdge, keyframe, currentLoc])

    //第一步 给小球一个随机的初始位置，同时给currentLoc赋值
    useEffect(() => {
        if(ballRef?.current && !hasInit) {
            const wrapper = document.querySelector(`.${styles.screenSaver}`)
            let startX = Number.parseInt(wrapper.clientWidth * Math.random())
            let startY = Number.parseInt(wrapper.clientHeight * Math.random())
            //避免产生滚动条
            if(startX + 80 >= wrapper.clientWidth){
                startX = wrapper.clientWidth - 80
            }
            if(startY + 80 >= wrapper.clientHeight){
                startY = wrapper.clientHeight - 80
            }
            ballRef.current.style.left = `${startX}px`
            ballRef.current.style.top = `${startY}px`
            setCurrentLoc({x: startX, y: startY})
            setHasInit(true)
        }
    }, [hasInit])

    
    useInterval(()=> {
        const wrapper = document.querySelector(`.${styles.screenSaver}`)
        const rect = ballRef?.current.getBoundingClientRect();
        const x = Number.parseInt(rect.left)
        const y = Number.parseInt(rect.top)
        console.log('当前位置', x, y)
        if(!isToEdge && (x <= 1 || x >= wrapper.clientWidth - 79 || y <= 1 || y >= wrapper.clientHeight - 79)){
            console.log('到达边界', x, y)
            setIsToEdge(true)
            setCurrentLoc(targetLoc)
            setTargetLoc(undefined)
        }
        updateLoc(id, x, y)
    }, 1000)

    return (
        <div id={id} ref={ballRef} className={classNames(styles.ball)} style={{backgroundColor: colorMap[colorIdx], 
            animation: `ball-run-${id} 5s infinite`}}>
            {/* animation: `ball-run-${id} 3s ${isToEdge ? 'paused' : 'running'} 1`}}> */}
        </div>
    )
}

export default Ball