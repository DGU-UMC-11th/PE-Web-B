type StudyMember = {
  id: number;
  name: string;
  memberRole: "leader" | "member";
  githubId?: string;
};

const member1: StudyMember = {
  id: 1,
  name: "광수",
  memberRole: "leader",
  githubId: "gwangsu",
};

const member2: StudyMember = {
  id: 2,
  name: "철수",
  memberRole: "member",
};

const memberArray: StudyMember[] = [member1, member2];

const printMemberInfo = (member: StudyMember) => {
  console.log(`id: ${member.id}, name : ${member.name}, 
    role: ${member.memberRole}, githubId: ${member.githubId ?? "값이 없습니다."}`);
};

function findMemberById(id: number): void {
  const foundMember = memberArray.find((member) => member.id === id);
  if (foundMember) {
    printMemberInfo(foundMember);
  } else {
    console.log(`id: ${id}에 해당하는 맴버가 없습니다.`);
  }
}

findMemberById(1);
findMemberById(2);
findMemberById(999);
