type MemberRole = "leader" | "member";

interface StudyMember {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
}

const members: StudyMember[] = [
  { id: 1, name: "광수", role: "leader", githubId: "gwangsoo" },
  { id: 2, name: "지수", role: "member" },
  { id: 3, name: "현우", role: "member", githubId: "hyunwoo" },
];

function findMemberById(memberId: number) {
  return members.find((member) => member.id === memberId);
}

function describeRole(role: MemberRole) {
  if (role === "leader") {
    return "리더";
  }

  return "팀원";
}

function createMemberInfo(memberId: number) {
  const member = findMemberById(memberId);

  if (!member) {
    return `${memberId}번 회원을 찾을 수 없음`;
  }

  const githubId = member.githubId ?? "없음";

  return `${member.id}번 ${member.name}님, ${describeRole(member.role)}, GitHub: ${githubId}`;
}

console.log(createMemberInfo(1));
console.log(createMemberInfo(2));
console.log(createMemberInfo(999)); // 존재하지 않는 회원
