/*
 * 제목 : 함수에 type def
 * 
 * < 요약 >
 * python은 class에서 그쳤다면 js는 def의 입출력에 관해서도 class를 지원하는 듯
 * 
 * [2026/09/17 12:34:37 / week1-typescript/4/2_functypedef]
 */

function printGreeting(studentName: string) {
    console.log("반가워요, " + studentName + " 님!");
}
function printGreeting2(studentName: string): void {
    console.log("반가워요, " + studentName + " 님!");
}

const add = (a: number, b: number) => {
    return a + b;
};
const add2 = (a: number, b: number): number => {
    return a + b;
};
const add3 = (a: number, b: number): number => a + b;

type addition = (a: number, b: number) => number;
//숫자, 숫자 입력이고 숫자 리턴할거임
const add4: addition = (c, d) => c + d;
//숫자, 숫자 입력받고 숫자+숫자=(숫자) 리턴