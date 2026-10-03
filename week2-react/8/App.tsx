/*
코드 작성 순서를 주석으로 표시할게용
*/

//1
import { createContext, useContext, useState } from "react";

//2
type StudyMode = "focus" | "break";
//3
const initialStudyMode: StudyMode = "focus";
//4
const StudyModeContext = createContext<StudyMode>(initialStudyMode);

//8
function ModeStatus() {
    const mode = useContext(StudyModeContext);

    return (
        <h3>
            {mode === "focus" ? "집중중..." : "휴식중!!!"}
        </h3>
    )
}

//5
export default function App() {
    //6
    const [mode, setMode] = useState<StudyMode>(initialStudyMode);

    //10
    function toggleMode() {
        setMode((now) =>
            (now === "focus") ? "break" : "focus"
        );
    }

    return (
        //7
        <StudyModeContext.Provider value={mode}> 
            <h1>학습모드</h1>
            <ModeStatus></ModeStatus>
            <button onClick={toggleMode}>
                변경하기
            </button>
            {/* 9 */}
        </StudyModeContext.Provider>
    )
}