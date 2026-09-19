type StudyMember = {
    id: number;
    name: string;
    role: string;
    githubId?: string;
};

const members: StudyMember[] = [
  { id: 1, name: "광수", role: "프론트엔드", githubId: "gwangsoo" },
  { id: 2, name: "지수", role: "백엔드" },
];

function findMemberById(id: number) {
    const member = members.find((member) => member.id === id);
    if (member) {
        console.log("id: " + id + "인 회원의 이름은 " + member.name + ", GitHub 아이디는 " + (member.githubId ?? "없음") + ", 역할은 " + member.role + "입니다.");
    } else {
        console.log("id: " + id + "인 회원을 찾을 수 없습니다.");
    }
}

findMemberById(1);
findMemberById(2);
findMemberById(999);

// 선택미션 1
type StudyMemberr = {
    id: number;
    name: string;
    role: string;
    githubId?: string;
};

interface StudyMemberrr {
    id: number;
    name: string;
    role: string;
    githubId?: string;
}
// type과 interface는 둘 다 StudyMember 처럼 객체의 구조와 각 속성의 타입을 정의할 수 있다. 
// 둘 다 id, name, role, githubId 같은 속성에 대해 타입 검사를 할 수 있다는 공통점이 있다. 
// 다만 interface는 선언 병합과 extends를 통한 확장에 적합하고, type은 유니언이나 튜플 등 객체 이외의 다양한 타입도 표현할 수 있다는 차이가 있다.


// 선택미션 2
const studyHour: number | undefined = 0;

console.log(studyHour || 1); // 1
console.log(studyHour ?? 1); // 0
// ||는 0을 falsy 값으로 판단해서 1을 반환한다. 
// 반면 ??는 null이나 undefined일 때만 오른쪽 값을 사용하기 때문에 0이 그대로 출력된다.


// 선택미션 3
function formatMemberId(input: unknown) {
  if (typeof input === "number") {
    return "숫자 ID: " + input;
  } else if (typeof input === "string") {
    return "문자열 ID: " + input;
  } else {
    return "올바르지 않은 ID입니다.";
  }
}

console.log(formatMemberId(1));
console.log(formatMemberId("A001"));
console.log(formatMemberId(true));