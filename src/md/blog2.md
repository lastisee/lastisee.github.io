### 通过useMemo包裹异步函数，更加简洁地更新子组件的数据

```javascript
import { useState } from "react"
import { Input } from "antd"
import { useEffect } from "react"
import { useMemo } from "react"
const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

const fakeReq = async (str, delay) => {
    await sleep(delay)
    return `${str}--->${str.split('').reverse().join('')}`
}
//模拟项目中出现的发送两次请求的情况
//子组件中的数据是根据父组件中的a来组装参数，并发送请求的
//当父组件中的a发生变化时，子组件应当随时变化
const StateTest = () => {
    const [a, setA] = useState('')

    return (
        <div style={{margin: '80px auto', width: '300px'}}>
            <h2>父组件输入的值</h2>
            <Input value={a} onChange={e=> setA(e.target.value)} />
            {/* <SonCompA a={a} /> */}
            <SonCompB a={a} />
        </div>
    )
}

const SonCompA = ({a}) => {
    const [b, setB] = useState(undefined)
    //为表达方便，假想一个时间序列
    //当时间为0时，这个effect执行，因为setState异步的，所以当时间为1时，b的值才被改为null
    useEffect(()=> {
        //为了在a更新的时候，重新拉取数据，故需要重置b
        if(a){
            console.log('重置b')
            //其实这里重置为undefined的话，也只会发送一个请求，但是这样处理逻辑稍显混乱，尽量使用下面的useMemo方式
            setB(null)
        }
    }, [a])

    useEffect(()=> {
        //当时间为0.5时，这个effect执行，但是此时数据还没有回来
        //当时间为1时，b从undefined变为null，满足if里面的条件，此effect再次执行，完成了项目中发送两次请求的bug复现
        if(a && !b){
            const fetchData = async () => {
                console.log('Fetching data')
                const text = await fakeReq(a, 2000)
                setB(text)
            }
            fetchData()
        }
    }, [a, b])

    //这个effect是同步的，执行到这里的时候，第一个effect里面的setState和这里的setState时间非常接近，react合并为同一个
    //所以这个effect监听不到b从undefined到null的变化，所以同步的情况下这样使用是没问题的
    // useEffect(()=> {
    //     if(a && !b){
    //         const text = `${a}--->${a.split('').reverse().join('')}`
    //         setB(text)
    //     }
    // }, [a, b])

    useEffect(()=> {
        console.log('监控b', b)
    }, [b])

    return (
        <div style={{margin: '12px'}}>
            <h4>这是子组件的值</h4>
            <span>{b}</span>
        </div>
    )
}

const SonCompB = ({a}) => {
    const [b, setB] = useState(undefined)

    //使用useMemo包裹获取数据的函数
    const fetchData = useMemo(()=> {
        return async () => {
            console.log('memo---Fetching data--->')
            const result = await fakeReq(a, 2000)
            setB(result)
        }
    }, [a])

    useEffect(()=> {
        //使用if判断，避免挂载的时候，a没值的情况下也发送请求
        if(a){
            fetchData()
        }
    }, [a])

    useEffect(()=> {
        console.log('监控b', b)
    }, [b])

    return (
        <div style={{margin: '12px'}}>
            <h4>这是子组件的值</h4>
            <span>{b}</span>
        </div>
    )
}

export default StateTest
```