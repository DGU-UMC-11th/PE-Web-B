/*
 * 제목 : 오류찾기
 * 
 * < 요약 >
 * type 안 맞게 하면 오류
 * 
 * [2026/09/17 00:29:36]
 */

// Before
/*function introduceStudent(studentName: string, currentLevel: number) {
    return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
  }
  
  introduceStudent("광수", "1");*/

// After
function introduceStudent(studentName: string, currentLevel: number) {
return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
}

introduceStudent("광수", 1);