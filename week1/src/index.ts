interface Member {
  id: number;
  name: string;
  role: "leader" | "member";
  githubId?: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "승구리",
    role: "leader",
    githubId: "shinisme",
  },
  {
    id: 2,
    name: "챌린저",
    role: "member",
  },
];

function introduceMember(id: number): string {
  const member = members.find((person) => person.id === id);

  if (member === undefined) {
    return "해당 회원이 없습니다.";
  }

  const github = member.githubId ?? "등록 안 함";

  return `${member.name} / 역할: ${member.role} / GitHub: ${github}`;
}

console.log(introduceMember(1));
// 승구리 / 역할: leader / GitHub: shinisme

console.log(introduceMember(2));
// 챌린저 / 역할: member / GitHub: 등록 안 함

console.log(introduceMember(999));
// 해당 회원이 없습니다.