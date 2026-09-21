/*
 * 제목 : any랑 unknown
 * 
 * < 요약 >
 * unknown은 검사해야 함.
 * 
 * [2026/09/18 01:02:25 / week1-typescript/7/1_unknown]
 */

function tmp(name: any)
{
    return name.toUpperCase();
    // string 아니면 오류 가능
}

function tmp2(name: unknown)
{
    if(typeof name === "string")
    {
        return name.toUpperCase();
    }
}

// tmp(1) 오류
tmp2("a")




function isActuallyString(val: unknown): val is string {
    // 런타임에는 사실 string이 아니거나 조작된 값을 반환하더라도 
    // 타입 시스템 입장에서는 string이라고 믿게 만듦
    return true;
}
//:변수 is 타입
//이 함수가 true 리턴하면, 변수는 타입
/*
function 함수이름(매개변수: 타입): [매개변수이름] is [바뀌길 원하는 타입] {
    return 참/거짓;
}
*/

function tmp3(a: unknown) {
    if (isActuallyString(a)) {
        // 컴파일러는 여기서 a가 string이라고 믿지만, 실제 값은 아닐 수 있음
        a.toUpperCase(); 
    }
}

// tmp3(12) 오류