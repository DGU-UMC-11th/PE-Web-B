/*
 * 제목 : generic
 * 
 * < 요약 >
 * 객체 만들 때 {value} 면 {value : value의값} 으로 됨
 * type이 오른쪽으로 흐름
 * 
 * [2026/09/18 01:15:44 / week1-typescript/8/1_generic]
 */

function keepVal<theType>(value: theType): theType
{
    return value;
}

console.log(typeof keepVal<string>("ㅎㅇ")); //string




function tmp<T>(value: T)
{
    return { value };
}

function tmp2<T>(value: T): {value: T}
{
    return { value: value };
    // tmp 함수랑 같음
}

console.log(tmp("ㅎㅇ").value);
console.log(tmp2(123).value);

console.log(tmp<string>("ㅎㅇ").value);
console.log(tmp2<number>(123).value);





function createBox(value: any) {
    return { value };
}

const box = createBox(100).value;
// (property) value: any
// ts가 에러를 잡아주지 못함! (런타임에 터짐)




type NamedMember = {
    name: string;
};

function getMemberName<T extends NamedMember>(member: T) {
    return member.name;
}

//getMemberName({age:1});
//'{ age: number; }' 형식의 인수는 
//'NamedMember' 형식의 매개 변수에 할당될 수 없습니다.
//최소 조건인 name:string이 없음.

console.log(getMemberName({age:1} as any));
//빨간 줄 안 뜸
//undefined

console.log(getMemberName<any>({age:1}));
//undefined

console.log(getMemberName({name:"ㅎㅇ", age:1}));