import { create } from "zustand";

type CountState = {
  count: number;
};
type Actions = {
  updateCount: (
    countCallback: (count: CountState["count"]) => CountState["count"]
  ) => void;
};

const useCountStore = create<CountState & Actions>((set) => ({
  count: 0,
  updateCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}));

type State = {
  obj: { count: number };
};
const store = create<State>(() => ({ obj: { count: 0 } }));

export default function MyZustand() {
  const obj = store((state) => state.obj);
  const handleChangeObj = () => {
    store.setState((prev) => ({ obj: { count: prev.obj.count + 1 } }));
  };

  const count = useCountStore((state) => state.count);
  const updateCount = useCountStore((state) => state.updateCount);
  const handleUpdateCount = () => {
    updateCount((a) => {
      console.log(a);

      return a + 1;
    });
  };

  return (
    <div>
      <div>{obj.count}</div>
      <button onClick={handleChangeObj}>change obj</button>
      <div>{count}</div>
      <button className="d-block" onClick={handleUpdateCount}>
        change count
      </button>
    </div>
  );
}
