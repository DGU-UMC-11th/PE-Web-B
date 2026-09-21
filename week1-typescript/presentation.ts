/*
 * 제목 : 
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/19 17:39:33 / week1-typescript/presentation]
 */


//1
type Student_type = {
    name: string,
    level: number,
};

interface Student_interface {
    name: string,
    level: number,
}


const Student1: Student_type = {name: "ㅇ", level:0}
const Student2: Student_interface = {name: "ㅇ", level:0}
console.log(Student1, Student2);




//2
type a = {age:number, name:string};
type b = {name:string};
type c = a & b;


// type a = {age:number, name:number};
// type b = {name:string};
// type c = a & b;
// let tmp:c = {age:1, name:12};
// 'number' 형식은 'never' 형식에 할당할 수 없습니다.ts(2322)




type test = number & string;






// const neverTest:never = "안녕";
// const neverTest1:never = "안녕" as any;
const neverTest2:never = "안녕" as any as never;


let a = "ㅎㅇ" as any;

const numberTest:number = "안녕" as any as number;
const numberTest1:number = "안녕" as any as any as any as number;







type IsEqual<T, U> = 
  (<G>() => G extends T ? 1 : 2) extends 
  (<G>() => G extends U ? 1 : 2) 
    ? true 
    : false;
// ??



type tmp1 = {
    a: string;
}

type tmp2 = {
    a: string;
}
type tmp1andtmp2 = tmp1 & tmp2;



type Result1 = IsEqual<tmp1, tmp1andtmp2>; 
//false

const test1: tmp1 = {a:"ㅇㅇ"};
const test2: tmp1andtmp2 = {a:"ㅇㅇ"};
console.log(test1 === test2);
//false
/* js에서는 동일
const test1 = { a: "ㅇㅇ" };
const test2 = { a: "ㅇㅇ" };
*/





//2
// interface tmp {a: string};
// interface tmp {a: number};



interface a1 {a: string}
interface a2 {a: string} // a1과 완전히 같은 내용



type Result2 = IsEqual<a1, a2>;







interface qwer {
    name: string;
}





// const dataBefore: qwer = {
//     name: "철수",
// };

interface qwer {
    age: number;
}



interface aaa { a: string; }
interface aaa2 extends aaa { a: string; }





interface bbb { a: string; }
// interface bbb2 extends aaa { a: number; }







function nametest(name: unknown)
{
    if(typeof name === "string")
    {
        return name.toUpperCase();
    }
}

nametest("a")


function name_unknown(name: unknown)
{
    if (typeof name === "string")
    {
        return name;
    }
    name //unknown
    if (typeof name === "string")
    {
        name //string
    }
}

function name_string_number(name: string | number)
{
    if (typeof name === "string")
    {
        return name;
    }
    name // number
    if (typeof name === "string")
    {
        name //never
    }
}


function name_unknown2(name: unknown)
{
    if (typeof name === "string")
    {
        return name;
    }
    name //unknown
    if (typeof name === "string")
    {
        name //string
        if (typeof name === "number")
        {
            name //never
        }
    }
}






function isString(val: unknown): val is string {
    // return이 true면, val은 string이다
    return true;
}
/*
function 함수이름(매개변수: 타입): [매개변수이름] is [바뀌길 원하는 타입] {
    return 참/거짓;
}
*/
console.log(typeof isString("ㅇ")) //boolean

function unknownTest(a: unknown) {
    if (isString(a)) {
        // 컴파일러는 여기서 a가 string이라고 믿지만, 실제 값은 아닐 수 있음
        a //string
        // a.toUpperCase();
    }
}

unknownTest(12); //런타임 에러




type NamedMember = {
    name: string;
};

function getMemberName<T extends NamedMember>(member: T) {
    return member.name;
}

// getMemberName({age:1});//에러
getMemberName({name:"ㅇ", age:1});


getMemberName({age:1} as any);
getMemberName<any>({age:1});