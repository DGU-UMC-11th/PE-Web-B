/*
 * 제목 : 미니미션
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/18 01:12:38 / week1-typescript/7/2_mini_mission]
 */

function formatStudyWeek(val : unknown)
{
    if(typeof val === "number")
    {
        return `현재 ${val}주차에요.`;
    }
    if(typeof val === "string")
    {
        return `입력한 주차: ${val}`;
    }
    return "주차를 확인할 수 없어요."
}

console.log(formatStudyWeek(1));
console.log(formatStudyWeek("1"));
console.log(formatStudyWeek(true));
console.log(typeof formatStudyWeek(true)); //string