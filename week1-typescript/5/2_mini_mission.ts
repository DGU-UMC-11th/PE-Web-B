/*
 * 제목 : 미니실습
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/17 14:03:39 / week1-typescript/5/2_mini_mission]
 */

type MemberRole = "leader" | "member";

function getRoleText(role: MemberRole): string
{
    if(role === "leader") return "스터디를 이끌어요."
    return '스터디에 참여해요.'
}

getRoleText("leader");
getRoleText("member");
// getRoleText("hi");
// '"hi"' 형식의 인수는 'MemberRole' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)