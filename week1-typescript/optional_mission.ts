/*
 * 제목 : 선택미션
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/18 13:36:30 / week1-typescript/optional_mission]
 */

function formatMemberId(input: unknown): string
{
    if(typeof input === "number")
    {
        return `ID번호 : ${input}`
    }
    if(typeof input === "string")
    {
        return `ID텍스트 : ${input}`
    }
    return `ID?? : ${input}`
}
