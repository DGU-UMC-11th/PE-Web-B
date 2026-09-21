/*
 * 제목 : print
 * 
 * < 요약 >
 * python과 비슷함
 * +로 할 수 있으나, python의 fstring처럼 ${}로 내부에 작성 가능
 * 그러나, `(하이픈, ~에 있는 친구)를 써야함
 * 
 * [2026/09/16 11:22:09]
 */

const courseName = "TypeScript";
console.log("이번 주 학습 주제: " + courseName);
console.log(`이번 주 학습 주제: ${courseName}`);