import { Component, createMemo, createSignal, For } from 'solid-js';

const users = ['AAA', 'BBB', 'CCC']

export const Hello: Component = () => {
  const [count, setCount] = createSignal(0);
  const onClick = (userName: string, timestamp: number) => {
    console.log('onClick: ', userName, timestamp);
  };

  // 使用createMemo创建一个依赖于count的计算值
  const someUsers = createMemo(() => {
    console.log('someUsers is recalculating...');
    return users.slice(0, count() % 4);
  });

  return (
    <div class='Hello'>
      <h1>Hello SolidJS</h1>
      <button onClick={() => setCount(c => c + 1)}>Update ({someUsers().length})</button>
      <div>Count: {count()}</div>
      <hr />
      <For each={someUsers()}>
        {(user) => <MyButton onClick={() => onClick(user, Date.now())} />}
      </For>
    </div>
  );
}

const MyButton: Component<{ onClick: () => void }> = (props) => {
  console.log(`### > MyButton${Date.now()}`, { onClick: props.onClick })

  const [renderCount, setRenderCount] = createSignal(0);

  return (
    <button onClick={() => {
      setRenderCount(c => c + 1);
      props.onClick();
    }}>
      Render Count: {renderCount()}
    </button>
  );
}
