/*
 * 제목 : 미니실습 오류고치기
 * 
 * < 요약 >
 * ...가 python의 unpacking인 *나 **랑 똑같다.
 * 즉, 위에 기본값 쓰고 밑에서 유저 인풋 받으면
 * 자연스레 오버라이드 되면서 기본값 설정 ㄱㄴ
 * 
 * [2026/09/17 13:44:07 / week1-typescript/4/5_mini_mission]
 */

/*before
type StudyMember = {
  name: string;
  level: number;
  isLeader: boolean;
};

const member: StudyMember = {
  name: "광수",
  level: "1",
};

function createMemberCard(studyMember: StudyMember) {
  return studyMember.name + " 님, " + studyMember.level + "레벨";
}

console.log(createMemberCard(member));
*/

type StudyMember = {
    name: string;
    level: number;
    isLeader: boolean;
  };
  
  const member: StudyMember = {
    name: "광수",
    level: 1,
    isLeader: false,
  };
  
  function createMemberCard(studyMember: StudyMember) {
    return studyMember.name + " 님, " + studyMember.level + "레벨";
  }
  
  console.log(createMemberCard(member));


//is Leader 기본값 설정하기
type settings = {
    name: string;
    level: number;
    isLeader?: boolean;
    theme?: "dark" | "light";
};

const input: settings = {
    name: "길동",
    level: 1,
    theme: "dark"
}; //유저가 쓴 것. isLeader는 없다

const final: settings = {
    isLeader: false, //기본값
    theme: "light", //기본값
    ...input
}
console.log(input);
//{ name: '길동', level: 1, theme: 'dark' }
console.log(final);
//{ isLeader: false, theme: 'dark', name: '길동', level: 1 }

//... 은 python의 unpacking (*나 **) 문법이랑 걍 똑같음
