import {useState} from "react";

export default function App()
{
    const [value, setValue] = useState(0);
    const MAX_VALUE = 5, MIN_VALUE = 0;

    function changeValue(updater : Function){
        let nextVal = updater(value);
        
        nextVal = Math.max(Math.min(nextVal, MAX_VALUE), MIN_VALUE);
        setValue(nextVal);
    }
    
    return (
        <>
            <h1>카운터 : {value}</h1>
            <p>max : {MAX_VALUE} / min : {MIN_VALUE}</p>
            {
                (value < MAX_VALUE) && 
                <button onClick={() => changeValue(a => a+1)}>
                    +1
                </button>
            }
            {   
                (value > MIN_VALUE) &&  
                <button onClick={() => changeValue(a => a-1)}>
                    -1
                </button>
            }
        </>
    );
}

/*
// 입력받은 값(a)에 1을 더해서 리턴하는 함수
const myUpdater = function(a) {
    return a + 1;
};
// function 키워드를 지우고 인수 뒤에 => 를 붙입니다.
const myUpdater2 = (a) => {
    return a + 1;
};
console.log(myUpdater(1));
console.log(myUpdater2(1));
//똑같다
*/

/*
    // 우리가 쓴 축약형
    () => changeValue(a => a + 1)

    // 이걸 전통적인 함수 형태로 길게 풀어쓰면
    function() {
        return changeValue(a => a + 1);
    }
*/