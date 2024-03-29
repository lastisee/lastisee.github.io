### JavaScript中使用组合函数实现管道式调用（参数个数不一致的处理）

- 向chatgpt请教管道操作的时候，其给我举了一个例子，但是这个例子和网上其它例子不一样，其它例子每个函数的参数个数都是固定的，这就导致chatgpt也犯了傻，纠正了多次代码依然错误，我于是进行了一些修改，终于成功运行了

  ```javascript
  const add = (x) =>{
      console.log('add->', x)
      return  x + 1
  }
  const multiply = (x, y) => {
      console.log('multiply->', x, y)
      return x * y
  }
  const square = (x) => {
      console.log('square->', x)
      return x * x
  }
  
  // 定义组合函数
  const compose = (...fns) => (...args) => fns.reduceRight((acc, fn, idx) => {
      //传入的参数个数必定不少于其中任意一个函数的参数个数
      //当前函数的参数个数
      //reduceRight 从右往左，idx: arr.length - 1 ----> 0
      const argLen = fn.length
      console.log('参数个数', argLen,'idx->', idx)
      const curArgs = []
      if(idx === fns.length -1) {
          //如果是第一个(最右边的)函数，根据参数个数将args里面的数据进行压入
          for(let i = 0; i < argLen; i++) {
              curArgs.push(args[i])
          }
      }else {
          //从第二个函数开始，第一个参数必定是前一次的运行结果
          curArgs.push(acc)
          for(let i = 1; i < argLen; i++) {
              curArgs.push(args[i])
          }
      }
      return fn(...curArgs)
  }, args) 
  
  // 使用组合函数实现管道式调用
  const calculate = compose(square, multiply, add);
  
  // 调用 calculate 函数，实现管道式调用
  const result = calculate(2, 3); // 等价于 square(multiply(add(2), 3)) = 81
  //使用管道操作符 结果等于9
  const result2 = add(2) |> square
  
  console.log(result, result2); // 输出 81
  
  ```

  