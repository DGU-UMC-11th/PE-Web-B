/*
 * 제목 : union type
 * 
 * < 요약 >
 * ts 컴파일러 생각보다 더 똑똑함
 * 오류를 사전에 정말 잘 막아준다.
 * 
 * [2026/09/17 13:54:55 / week1-typescript/5/1_uniontype]
 */

function printMemberId(memberId: string | number) {
    console.log(memberId);
}

printMemberId("member-01");
printMemberId(1);

function formatMemberId(memberId: string | number) {
    if (typeof memberId === "number" || typeof memberId === "string")
    {
        memberId //(parameter) memberId: string | number
    }
    if (typeof memberId === "string") {
        return memberId.toUpperCase();
    }
    if(typeof memberId === "function")
    {
        memberId
        //(parameter) memberId: never
    }
    if (typeof memberId === "number" || typeof memberId === "string")
    {
        memberId
        // 여기서 memberId가 number로만 나오는 이유
        //위에서 memberId가 string이면 return해서 나가기 때문에.

        if (typeof memberId === "string") {
            memberId
            //그러니 number인데 string => never 됨
        }
    }

    return "MEMBER-" + memberId;
}




type MemberRole = "leader" | "member";
type AttendanceStatus = "present" | "late" | "absent";

const gwangsooRole: MemberRole = "leader";
const todayStatus: AttendanceStatus = "present";

const tmp: MemberRole = "leader";
// const tmp2: MemberRole = "asdfasf";
// '"asdfasf"' 형식은 'MemberRole' 형식에 할당할 수 없습니다.ts(2322)
//오타 막아줘서 아주 중요한 듯




