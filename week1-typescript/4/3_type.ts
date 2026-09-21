/*
 * 제목 : type override 살펴보기
 * 
 * < 요약 >
 * 같은 타입이면 never 오류 안남. 다른 타입이면 오류남.
 * 즉, 타입&이름을 검사. 따라서 내용 override는 주의해야 할 듯
 * 
 * [2026/09/17 12:43:00 / week1-typescript/4/3_type]
 */

type MemberProfile = {
    name: string;
};
  
type GithubProfile = {
    githubId: string;
};

type MemberWithGithub = MemberProfile & GithubProfile;

const gwangsooProfile: MemberWithGithub = {
    name: "광수",
    githubId: "gwangsoo",
};

console.log(gwangsooProfile.name, gwangsooProfile.githubId);

//override test
type a = {age:number, name:number};
type b = {name:string};
type c = a & b;
// let tmp:c = {age:1, name:12};
// 'number' 형식은 'never' 형식에 할당할 수 없습니다.ts(2322)


type tmp = number & string;
// any로 우회하여 "임의의 값"을 주입
const dummy = "test" as any as tmp;
//test 를 any로 변환
//any를 tmp(never)로 변환. 이를 허용해줌

// 자바스크립트 실행 시점의 타입을 출력 (결과는 "string")
console.log(typeof dummy); 



type IsEqual<T, U> = 
  (<G>() => G extends T ? 1 : 2) extends 
  (<G>() => G extends U ? 1 : 2) 
    ? true 
    : false;
/*T extends U (T가 U에 포함되는가?)라고 물어보면, 
타입스크립트가 자기 마음대로 유니온 타입(A | B) 같은 
복잡한 걸 쑥쑥 쪼개면서 "어? 비슷하네? 참(true)!" 
하고 대충 넘어가는 버그가 생깁니다. 

1. G라는 빈 상자(제네릭)를 만듭니다.
2. 그 상자에다가 "네가 가진 타입 T와 똑같이 반응하는지 테스트해 볼게"라고 시킵니다.
3. 그리고 그 테스트 결과를 함수 타입으로 감싸버립니다.

이렇게 함수 타입 안으로 T와 U를 숨겨버리면, 
타입스크립트는 유니온 타입 등을 제멋대로 쪼개지 못하고 
오직 두 타입의 구조가 완벽하게 일치할 때만 같다고 인정하게 됩니다.
*/


type tmp1 = {
    a: string;
}

type tmp2 = {
    a: string;
}
type tmp1andtmp2 = tmp1 & tmp2;

type tmp3 = {
    a: string;
    b: number; // 내용이 다른 확장된 인터페이스
}

//내용 같음
type Result1 = IsEqual<tmp1, tmp1andtmp2>; 
// false

// Case 2: 내용이 다른 경우 (tmp1과 tmp3)
type Result2 = IsEqual<tmp1, tmp3>; 
// false