/*
 * 제목 : interface 테스트
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/17 12:54:20 / week1-typescript/4/4_interface]
 */

type StudentName = string;

interface StudyMember {
  name: StudentName;
}

interface StudyMember {
  level: number;
} //override 및 

const member: StudyMember = {
  name: "광수",
  level: 1,
};



interface Parent { a: string; }
interface Child extends Parent { b: number; } // Parent와 Child는 별개의 존재
interface Child2 extends Parent { a: string; }
// interface Child2 extends Parent { a: number; }
// 후속 속성 선언에 같은 형식이 있어야 합니다. 
// 'a' 속성이 'string' 형식이어야 하는데 여기에는 'number' 형식이 있습니다.ts(2717)



interface asdf { a: string; }
// 여기서 새로운 걸 만드는 게 아니라, 원래 있던 asdf 자체가 커짐
interface asdf { b: number; }


//오류 테스트
interface tmp {a: string};
const b:tmp = {a : 'ㅇㅇ'};
console.log(b);

interface tmp {a: string};
// 그냥 불필요한 코드가 되어버림.
console.log(b);



interface tmp2 {a: string};
// interface tmp2 {a: number};
// 후속 속성 선언에 같은 형식이 있어야 합니다. 
// 'a' 속성이 'string' 형식이어야 하는데 여기에는 'number' 형식이 있습니다.ts(2717)

//type은 &(override)에서 오류 안남. 값 대입할 때만 오류남
//interface는 override에서 오류 남. << 이게 장점



// 1. 두 타입이 같은지 판별하는 유틸리티 타입 (Conditional Type 활용)
type IsEqual<T, U> = 
  (<G>() => G extends T ? 1 : 2) extends 
  (<G>() => G extends U ? 1 : 2) 
    ? true 
    : false;


// --- 테스트용 인터페이스 ---
interface tmp1 {
  a: string;
}

interface tmp2 {
  a: string; // tmp1과 완전히 같은 내용
}

interface tmp3 {
  a: string;
  b: number; // 내용이 다른 확장된 인터페이스
}


// --- 2. 비교 실행 및 결과 확인 ---

// Case 1: 완전히 같은 타입인 경우 (tmp1과 tmp2)
type Result1 = IsEqual<tmp1, tmp2>; 
// true (마우스 올려보면 true로 나옴)

// Case 2: 내용이 다른 경우 (tmp1과 tmp3)
type Result2 = IsEqual<tmp1, tmp3>; 
//  false (내용이 다르므로 false)







interface asdf {
  name: string;
}

// 📸 [핵심] 이 시점의 tmp 상태를 'Snapshot1'에 박제해 둡니다.
type Snapshot1 = asdf; 


// 2. 다른 곳에서 interface를 또 선언하여 속성 추가 (After)
interface asdf {
  age: number;
}

// 📸 [핵심] 병합이 완료된 이 시점의 tmp 상태를 'Snapshot2'에 박제해 둡니다.
type Snapshot2 = asdf;


// --- 3. 최종 비교 실행 ---

type Result4 = IsEqual<Snapshot1, Snapshot2>;

type Result5 = IsEqual<asdf, Snapshot2>; 

type Result6 = IsEqual<asdf, Snapshot1>; 
//다 true







//interface는 위아래가 없다 (동시에 읽음)
interface qwer {
    name: string;
}

// const dataBefore: qwer = {
//     name: "철수",
// };
// interface는 중간 상태가 없다고 볼 수 있어서 오류가 남. 하단에서 age가 중복되어 선언되기에 age란이 필요.

const dataBefore: qwer = {
    name: "철수",
    age: 12,
};

interface qwer {
    age: number;
}


const dataAfter: qwer = {
    name: "철수",
    age: 12,
};

console.log(dataBefore === dataAfter); //false.