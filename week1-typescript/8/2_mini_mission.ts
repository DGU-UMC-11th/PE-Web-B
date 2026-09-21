/*
 * 제목 : 미니 실습
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/18 13:01:36 / week1-typescript/8/2_mini_mission]
 */

type member = {
    name: string
}

function createBox<T>(value: T)
{
    return {value};
}

createBox("12");
createBox(12);

const tmp: member = {name : "ㅎㅇ"};
createBox(tmp);