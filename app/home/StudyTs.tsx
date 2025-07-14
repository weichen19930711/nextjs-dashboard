import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

/**
 * 1 对象类型
 * 2 联合类型
 * 3 从类型创建类型
 */
// 接口方式定义 对象类型
interface MyButtonProps {
  /** 按钮文字 */
  title: string;
  /** 按钮是否禁用 */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button
      className="bg-blue-100 px-10 py-5 cursor-not-allowed"
      disabled={disabled}
    >
      {title}
    </button>
  );
}

interface State {
  count: number;
}
type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] };
const initalState = { count: 0 }; //隐式
// const initalState: State = { count: 0 }; //显示
type AnyActionArg = [] | [any];
type ActionDispatch<ActionArg extends AnyActionArg> = (
  ...args: ActionArg
) => void;
/**
 * 一般大写字母就是接受泛型类型，让泛型类型 在主体中保持一致，
 *      S 泛型类型
 * 对传递的泛型类型 简单限制
 *      A extends AnyActionArg: 限制了泛型 传递必须是长度为0或1的数组
 */
// function useReducer<S, A extends AnyActionArg>(
//   reducer: (prevState: S, ...args: A) => S,
//   initialState: S,
// ): [S, ActionDispatch<A>];

function MyReducer() {
  /**
   * 泛型：可以分开两部分
   *      useReducer是一个函数
   *      <State, [CounterAction]> 是泛型类型，对该函数的 内容 做限制
   *                    State 限制 该函数的 第二个参数是必须是 State类型
   *          [CounterAction] 限制 该函数的 第一个函数参数 的入参是必须 长度为一的State类型
   */
  const [state, dispatch] = useReducer<State, [CounterAction]>(
    stateReducer,
    initalState
  );
  function stateReducer(state: State, action: CounterAction): State {
    switch (action.type) {
      case "reset":
        return initalState;
      case "setCount":
        return { ...state, count: action.value };
    }
  }
  const reset = () => dispatch({ type: "reset" });
  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  return (
    <div>
      <h1>欢迎来到我的计数器</h1>

      <p>计数： {state.count}</p>
      <button className="bg-blue-500" onClick={addFive}>
        加 5
      </button>
      <button className="bg-gray-500" onClick={reset}>
        重置
      </button>
    </div>
  );
}

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("light");
const useGetTheme = () => useContext(ThemeContext);

function MySubApp() {
  /**
   * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get
   * 有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用。在 JavaScript 中，可以使用 getter 来实现
   * {get prop() { ... } }
   * {get [expression]() { ... } }
   * get语法
   *      get 语法将 对象属性 绑定到查询该属性时将被调用的函数
   */
  const [enabled, setEnabled] = useState<boolean>(() => false);
  const [value, setValue] = useState("Change me");

  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");

  type RequestState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: any }
    | { status: "error"; error: Error };
  const [requestState, setRequestState] = useState<RequestState>({
    status: "success",
    data: { msg: 1 },
  });
  const theme = useGetTheme();

  /**
   * useCallback 函数的类型是根据第一个参数中函数的返回值进行推断的
   */
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValue(event.currentTarget.value);
    },
    [setValue]
  );
  return (
    <div>
      <h1>Welcome to my app</h1>
      <h3>status: {status}</h3>
      <h3>requestState: {JSON.stringify(requestState)}</h3>
      <MyButton title="我是一个禁用按钮" disabled={!enabled} />
      <MyReducer />
      {theme}
      {/*当你需要确定某个类型时，可以先将鼠标悬停在你使用的事件处理器 onChange上，这样可以查看到事件的具体类型。 */}
      <input value={value} onChange={handleChange} />
      <p>值： {value}</p>
    </div>
  );
}

export default function MyApp() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={theme}>
      <MySubApp />
    </ThemeContext.Provider>
  );
}
