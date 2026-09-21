/*
 * 제목 : 미니 실습 오류 찾기
 * 
 * < 요약 >
 * 
 * 
 * [2026/09/18 13:03:40 / week1-typescript/9/1_mini_mission]
 */

/*before
type WeeklyGoal = {
  title: string;
  targetCount: number;
};

const weeklyGoal: WeeklyGoal = {
  title: "TypeScript 예제 연습",
  targetCount: "3", <- 여기 틀림
};

function printGoal(goal: WeeklyGoal): string {
  console.log(goal.title); <-리턴이 없음
}
*/

type WeeklyGoal = {
    title: string;
    targetCount: number;
  };
  
const weeklyGoal: WeeklyGoal = {
    title: "TypeScript 예제 연습",
    targetCount: 3
};

function printGoal(goal: WeeklyGoal): string {
    console.log(goal.title);
    return goal.title;
}
//반환 타입 명시한 이유
//보통 프린트 잘 됐는지 체크하려고 씀
//근데 그러면 boolean 리턴이 낫지 않을까?