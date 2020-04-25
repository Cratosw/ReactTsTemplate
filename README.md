### 请求数据
- useRequest [https://github.com/umijs/hooks/blob/master/packages/use-request/index.zh-CN.md]

  ## 基础 API

  ```
  const {
    data,
    error,
    loading,
    run,
    params,
    cancel,
    refresh,
    mutate,
    fetches,
  } = useRequest(service, {
    manual,
    initialData,
    refreshDeps,
    onSuccess,
    onError,
    formatResult,
    cacheKey,
    loadingDelay,
    defaultParams,
    pollingInterval,
    pollingWhenHidden,
    fetchKey,
    refreshOnWindowFocus,
    focusTimespan,
    debounceInterval,
    throttleInterval,
  });
  ```

  ### Result

  | 参数    | 说明                                                         | 类型                                                         |
  | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | data    | service 返回的数据，默认为 `undefined`。如果有 `formatResult`, 则该数据为被格式化后的数据。 | `undefined / any`                                            |
  | error   | service 抛出的异常，默认为 `undefined`                       | `undefined / Error`                                          |
  | loading | service 是否正在执行                                         | `boolean`                                                    |
  | run     | 手动触发 service 执行，参数会传递给 servicedebounce 模式与 throttle 模式返回值为 `Promise<null>` | `(...args: any[]) => Promise`                                |
  | params  | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]` | `any[]`                                                      |
  | cancel  | 取消当前请求如果有轮询，停止                                 | `() => void`                                                 |
  | refresh | 使用上一次的 params，重新执行 service                        | `() => Promise`                                              |
  | mutate  | 直接修改 data                                                | `(newData) => void / ((oldData)=>newData) => void`           |
  | fetches | 默认情况下，新请求会覆盖旧请求。如果设置了 `fetchKey`，则可以实现多个请求并行，`fetches` 存储了多个请求的状态。外层的状态为最新触发的 fetches 数据。 | `{[key:string]: {loading,data,error,params,cancel,refresh,mutate,run}}` |

  ### Params

  所有的 Options 均是可选的。

  | 参数                 | 说明                                                         | 类型                                    | 默认值  |
  | -------------------- | ------------------------------------------------------------ | --------------------------------------- | ------- |
  | manual               | 默认 `false`。 即在初始化时自动执行 service。如果设置为 `true`，则需要手动调用 `run` 触发执行。 | `boolean`                               | false   |
  | initialData          | 默认的 data                                                  | `any`                                   | -       |
  | refreshDeps          | 在 `manual = false` 时，`refreshDeps` 变化，会触发 service 重新执行 | `any[]`                                 | `[]`    |
  | formatResult         | 格式化请求结果                                               | `(response: any) => any`                | -       |
  | onSuccess            | service resolve 时触发，参数为 `data` 和 `params`如果有 `formatResult` ，则 `data` 为格式化后数据。 | `(data: any, params: any[]) => void`    | -       |
  | onError              | service 报错时触发，参数为 `error` 和 `params`。             | `(error: Error, params: any[]) => void` | -       |
  | fetchKey             | 根据 params，获取当前请求的 key，设置之后，我们会在 `fetches` 中同时维护不同 `key` 值的请求状态。 | `(...params: any[]) => string`          | -       |
  | cacheKey             | 请求唯一标识。如果设置了 `cacheKey`，我们会启用缓存机制我们会缓存每次请求的 `data` , `error` , `params` , `loading`在缓存机制下，同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新 | `string`                                | -       |
  | defaultParams        | 如果 `manual=false` ，自动执行 `run` 的时候，默认带上的参数  | `any[]`                                 | -       |
  | loadingDelay         | 设置显示 loading 的延迟时间，避免闪烁                        | `number`                                | -       |
  | pollingInterval      | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run` | `number`                                | -       |
  | pollingWhenHidden    | 在页面隐藏时，是否继续轮询。默认为 `true`，即不会停止轮询如果设置为 `false` , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询 | `boolean`                               | `true`  |
  | refreshOnWindowFocus | 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 `false`，即不会重新发起请求。如果设置为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。 | `boolean`                               | `false` |
  | focusTimespan        | 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求需要配置 `refreshOnWindowFocus` 使用。 | `number`                                | `5000`  |
  | debounceInterval     | 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。             | `number`                                | -       |
  | throttleInterval     | 节流间隔, 单位为毫秒，设置后，请求进入节流模式。             | `number`                                | -       |

  ## 扩展用法

  基于基础的 useRequest，我们可以进一步封装，实现更高级的定制需求。当前 useRequest 内置了 `集成请求库`，`分页` 和 `加载更多` 三种场景。你可以参考代码，实现自己的封装。参考 [useRequest](https://github.com/umijs/hooks/blob/master/packages/use-request/src/useRequest.ts)、[usePaginated](https://github.com/umijs/hooks/blob/master/packages/use-request/src/usePaginated.ts)、[useLoadMore](https://github.com/umijs/hooks/blob/master/packages/use-request/src/useLoadMore.ts) 的实现。

  ### 集成请求库

  如果 service 是 `string` 、 `object` 、 `(...args)=> string|object`, 我们会自动使用 [umi-request](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md) 来发送网络请求。umi-request 是类似 axios、fetch 的请求库。

  ```
  // 用法 1
  const { data, error, loading } = useRequest('/api/userInfo');
  ```
  // 用法 2
  const { data, error, loading } = useRequest({
    url: '/api/changeUsername',
    method: 'post',
  });
  ```
  // 用法 3
  const { data, error, loading } = useRequest((userId)=> `/api/userInfo/${userId}`);
  ```
```
  // 用法 4
  const { loading, run } = useRequest((username) => ({
    url: '/api/changeUsername',
    method: 'post',
    data: { username },
  }), {
    manual: true,
  });
```
  API


  //https://2019.stateofjs.com/zh/front-end-frameworks/  颜色样式

