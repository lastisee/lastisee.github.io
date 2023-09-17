const myMemo = (fn, [...deps]) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if(cache.has(key)){
            return cache[key];
        }else{
            const result = fn(...args);
            cache.set(key, result);
            return result;
        }
    }
}

const calc = (a, b) => {
    console.log('运行calc', a, b)
    return a + b
}

const memoFn = myMemo(()=> calc(2, 3), [])

const a = memoFn
const b = memoFn
const c = memoFn
console.log('运行结果', a, b, c)