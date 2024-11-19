import React, { FC, useState } from 'react';
import './Hello.pcss';

type Props = {};

const users = ['AAA', 'BBB', 'CCC']
export const Hello: FC<Props> = ({ }) => {
  const [, update] = useState(0)
  const onClick = (userName: string, timestamp: number) => {
    console.log('onClick: ', userName, timestamp);
  };

  const someUsers = users.slice(0, Date.now() % 4);

  return <div className={'Hello'}>
    <h1>Hello React</h1>
    <button onClick={() => update(Date.now())}>Update ({someUsers.length})</button>
    <hr />
    {someUsers.map((user, index) => <MyButton key={index} onClick={() => onClick(user, Date.now())} />)}
  </div>;
}

const MyButton: FC<{ onClick: () => void }> = React.memo(({ onClick }) => {
  console.log(`### > MyButton${Date.now()}`, { onClick })
  const renderCount = React.useRef(0)
  renderCount.current += 1

  return <button onClick={onClick}>Render Count: {renderCount.current}</button>
})
