/*
 * 제목 : 객체에 커스텀 타입 붙이기
 * 
 * < 요약 >
 * type 으로 정의 가능
 * 
 * [2026/09/17 00:43:03 / 1_typedef.ts]
 */

const student: {name:string, age:number} = {name:"ㅇㅇ", age:0};

type studentType = {name:string, age:number, gender?: boolean}; //python의 class 느낌
type studentType2 = {name:string; age:number, gender?: boolean}; //comma 대신 semicolon 써도 ㄱㅊ

const gildong: studentType = {
    name : "길동",
    age : 1,
} //instance 느낌
console.log(gildong);
//{ name: '길동', age: 1 }
//undefined로 설정되지 않고 아예 없다.

const gildong2: studentType = {
    name : "길동",
    age : 1,
    gender: true,
}
console.log(gildong2);
//{ name: '길동', age: 1, gender: true }