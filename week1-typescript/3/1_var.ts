/*
 * 제목 : 원시 값, 객체 값, 타입 선언
 * 
 * < 요약 >
 * 원시 값은 value 비교, 객체 값은 주소 비교
 * 그래서 lodash 같은 deep 비교 필요
 * import _ from 'lodash';
 * console.log(_.isEqual(objA, objB));
 * 
 * array라고 하지만 list(dynamic array)임.
 * [] 꼴로 리스트 자주 작성. var는 scope 탈출해서 안 씀.
 * 
 * [2026/09/17 00:32:16]
 */

// 1
const firstMember = { name: "광수" };
const secondMember = { name: "광수" };
const sameMember = firstMember;

console.log(firstMember === secondMember); // false {}로 객체임
console.log(firstMember === sameMember); // true

//2
let a = '123'; // 알아서 string
let b = 123; // 알아서 number
let c: string = '123'; //내가 지정

//3
const tmp: string[] = ["ㅇ"];
tmp.push("ㅎㅇ요"); //const 라고 쓸 수 없는 게 아님. 주소가 고정.

const tmp2: readonly string[] = ["ㅇ"];
// tmp2.push("ㅎㅇ"); //오류남

const studentRecord: [string, number] = ["광수", 1]; //tuple

const num: number[][] = [[1,2],[3]];
const num2: Array<Array<number>> = [[1,2],[3]];
//뭔가 c# 같음. List<int> scores = new List<int>();
// 물론 [] 꼴을 권장

//4
if (true)
{
    var itsvar = '';
    let itslet = '';
}
itsvar; //오류 안남. 즉, scope를 탈출
// itslet; //오류남