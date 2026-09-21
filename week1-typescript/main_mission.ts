/*
 * 제목 : 필수 미션
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/18 13:39:20 / week1-typescript/main_mission]
 */

//회원의 ID, 이름, 역할과 선택 값인 GitHub 아이디를 타입으로 표현하고, 서로 다른 정보를 가진 회원 두 명 이상을 작성해요.
type typeMember = {
    ID : number,
    name : string,
    githubID? : string,
};

const dataMember: typeMember[] = [
    {ID:1, name:"ㅇㅇ"},
    {ID:2, name:"ㄴㄴ", githubID:"nono"},
]

//회원 ID로 정보를 찾아 안내 문구를 만들고, GitHub 아이디가 없는 회원과 존재하지 않는 회원도 오류 없이 처리해요.
function getMemeberByID(targetID: number): typeMember | undefined
{
    return dataMember.find((member) => member.ID === targetID);
}

function getInfoTextByMember(targetMember: typeMember | undefined): string
{
    if(typeof targetMember === "undefined")
    {
        return `회원이 존재하지 않습니다.`
    }
    return `ID : ${targetMember.ID}
    Name : ${targetMember.name}
    GithubID : ${targetMember.githubID ?? "없음"}
    `
}

//회원 ID 1, 2, 999를 전달한 결과를 확인하고 pnpm exec tsc --noEmit, 컴파일과 실행을 모두 완료해요.
const IDsToCheck: number[] = [1, 2, 999];

IDsToCheck.forEach(targetID => {
    console.log(`ID : ${targetID}인 회원을 확인 중..`);
    const targetMember = getMemeberByID(targetID);
    const infoText = getInfoTextByMember(targetMember);

    console.log(infoText);
});


/*
ID : 1인 회원을 확인 중..
ID : 1
    Name : ㅇㅇ
    GithubID : 없음
    
ID : 2인 회원을 확인 중..
ID : 2
    Name : ㄴㄴ
    GithubID : nono
    
ID : 999인 회원을 확인 중..
회원이 존재하지 않습니다.
*/


