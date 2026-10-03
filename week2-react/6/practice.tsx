import { useState } from "react";
/* 왜 useState를 쓸까?

//리렌더링 함수가 있었으나, 후에 추적하기 어려워 삭제
//forceUpdate()
//또, 한 부분만 업데이트 하면 되기에 특수한 함수를 이용
//그냥 변수는 상수 처리로, 업데이트가 되지 않음.
let count: number = 0;

export default function App() {
    const [forceData, forceUpdate] = useState(0);

    function add() {
        count += 1;
        forceUpdate((forceData) => forceData + 1);
    }

    return (
        <>
            <p>{count}</p>
            <button onClick={
                add
            }>
                +1
            </button>
        </>
    )
}
*/

/* 기본 코드
export default function App() {
    const [count, setCount] = useState(0);
    // : [number, React.Dispatch<React.SetStateAction<number>>]

    return (
        <>
            <h1>카운터</h1>
            <p>{count}</p>
            <button onClick={() => setCount((val) => val + 1)}>
                +1
            </button>
            <button onClick={() => setCount((val) => val - 1)}>
                -1
            </button>
            <button onClick={() => setCount(0)}>
                리셋
            </button>
        </>
    )
}*/


// useState의 함수를 쓸 때, a => a+1 해야하는 이유
export default function App() {
    const [count, setCount] = useState(0);
    function add1() {
        setCount(a => a+1);
        setCount(a => a+1);
        setCount(a => a+1);
        // +3이 됨
    }

    function add2() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        // +1이 됨
    }
    return (
        <>
            <p>{count}</p>
            <button onClick={add1}>add1</button>
            <button onClick={add2}>add2</button>
            </>
    );
}