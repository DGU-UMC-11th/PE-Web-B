/*
 * 제목 : 미니미션
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/17 14:27:53 / week1-typescript/6/2_mini_mission]
 */

type StudyMember = {
    name: string;
    githubId?: string;
};

const members: StudyMember[] = [
    { name: "광수", githubId: "gwangsoo" },
    { name: "지수" },
];

const selectedMember: StudyMember | null = null;

const foundMember = members.find((member) => member.name === "현우");
if(foundMember !== undefined)
{
    console.log(foundMember);
}

const studyHour: number = 0;

console.log(studyHour || 123); //123
console.log(studyHour ?? 123); //0

const targetMember: StudyMember = members[1];
console.log(targetMember?.githubId ?? "등록되지 않음");