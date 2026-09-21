/*
 * 제목 : null과 undefined
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/17 14:17:52 / week1-typescript/6/1_null_undefined]
 */

type StudyMember = {
    name: string;
    githubId?: string;
};

const members: StudyMember[] = [
    { name: "광수", githubId: "gwangsoo" },
    { name: "지수" },
];

let selectedMember: StudyMember | null = null;
const foundMember = members.find((member) => member.name === "현우");
//1개만 가져옴
//found_member = next((m for m in members if m.name == "현우"), None)
//next(generator, 기본)
//과 동일

console.log(selectedMember); // null
console.log(foundMember); // undefined



console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("false")); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true
//이런 비직관적인 내용 때문에 직접 비교가 안전

// foundMember가 undefined.
// githubId가 undefined로 반환
const githubId = foundMember?.githubId;
// const githubId2 = foundMember.githubId;
// 'foundMember'은(는) 'undefined'일 수 있습니다.ts(18048)




const studyHour: number | undefined = 0;

console.log(studyHour || 1); // 1
//studyHour가 falsy => 1씀
console.log(studyHour ?? 1); // 0
//studyHour가 null | undefined => 1씀
//즉, 모든 falsy 대체하려면 ||


const nickname: string | null = "";

console.log(nickname || "닉네임 없음"); // "닉네임 없음"
console.log(nickname ?? "닉네임 없음"); // ""


const displayGithubId = foundMember?.githubId ?? "등록되지 않음";
//undefined ?? "등록되지 않음"; => "등록되지 않음"
console.log(displayGithubId);

// ! <- 반드시 값이 있다. non-null
// const tmp = foundMember!.name;
// console.log(tmp);
// 그러나 undefined 였으니 컴파일에서 오류남