"use strict";
const member1 = {
    id: 1,
    name: "광수",
    memberRole: "leader",
    githubId: "gwangsu",
};
const member2 = {
    id: 2,
    name: "철수",
    memberRole: "member",
};
const memberArray = [member1, member2];
const printMemberInfo = (member) => {
    console.log(`id: ${member.id}, name : ${member.name}, 
    role: ${member.memberRole}, githubId: ${member.githubId ?? "값이 없습니다."}`);
};
function findMemberById(id) {
    const foundMember = memberArray.find((member) => member.id === id);
    if (foundMember) {
        printMemberInfo(foundMember);
    }
    else {
        console.log(`id: ${id}에 해당하는 맴버가 없습니다.`);
    }
}
findMemberById(1);
findMemberById(2);
findMemberById(999);
