type StudyMember = {
  id: number;
  name: string;
  role: 'leader' | 'member';
  githubId?: string;
};

const members: StudyMember[] = [
  {id: 1, name: 'Jisoo', role: 'leader', githubId: 'jisoo123',}, 
  {id: 2, name: 'Jennie', role: 'member'}
];

function getMemberInfo(id: number){
  const member = members.find((member) => member.id === id);
  if (!member) {
    return "해당 ID를 가진 멤버가 없습니다.";
  }
  const gitinfo = member.githubId ?? "깃허브 아이디가 없습니다.";
  return "ID: " + member.id + ", 이름: " + member.name + ", 역할: " + member.role + ", 깃허브 아이디: " + gitinfo;
} 

console.log(getMemberInfo(1));
console.log(getMemberInfo(2));
console.log(getMemberInfo(999));

//선택미션 1
type StudyMemberbytype = {
  id: number;
  name: string;
  role: 'leader' | 'member';
  githubId?: string;
};

interface StudyMemberbyinterface {
  id: number;
  name: string;
  role: 'leader' | 'member';
  githubId?: string;
};

/*
1. 객체의 형태를 정의할 수 있다는 점은 동일함
2. type은 객체 외 유니온이나, 원시 타입 등도 정의할 수 있지만, interface는 객체형태만 정의할 수 있음
3. interface는 선언 병합이 가능하지만, type은 중복 선언이 불가능함
*/

//선택미션 2
const studyHour: number | undefined = 0;
console.log(studyHour || 1); //1
console.log(studyHour ?? 1); //0

/*
||는 모든 falsy 값에 대하여 우측의 값을 사용합니다.
??는 null 또는 undefined일 경우 우측의 값을 사용합니다.
*/

//선택미션 3
function formatMemberId(input: unknown) {
  if (typeof input === 'number') {
    return "ID(number): " + input;
  }
  if (typeof input === 'string') {
    return "ID(string): " + input;
  }
  return "ID를 인식 할 수 없음";
}

console.log(formatMemberId(123)); //ID(number): 123
console.log(formatMemberId("abc")); //ID(string): abc
console.log(formatMemberId(true));  //ID를 인식 할 수 없음