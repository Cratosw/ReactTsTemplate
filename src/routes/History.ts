import { createBrowserHistory } from 'history'



export const history = createBrowserHistory();


// 监听当前的地址变换
const unlisten = history.listen(location => {
  console.log(location.pathname)
})
