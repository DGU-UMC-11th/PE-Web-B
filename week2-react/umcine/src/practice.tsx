import { createContext, useState, useContext } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<Theme>("dark");
//전역 변수 같은 Context를 만듦.
//createContext<타입>(기본값)


function ThemeStatus() {
    const theme = useContext(ThemeContext);

    return (
        <p>현재 테마 : {theme}</p>
    );
}

export default function App() {
    const [theme, setTheme] = useState<Theme>("light");

    function handleToggleTheme() {
        setTheme((currentTheme) =>
            currentTheme === "light"
                ? "dark"
                : "light"
        );
    }

    return (
        // .Provider 안 쓰면 위에서 정의한 기본값이 이용됨
        // 정적이고 변하지 않는 설정 값을 공유하는 경우: createContext('기본값')만 설정해 두고 Provider를 생략해도 괜찮습니다.
        <ThemeContext.Provider value={theme}>
            <ThemeStatus></ThemeStatus>
            <button onClick={handleToggleTheme}>
                테마 바꾸기
            </button>
        </ThemeContext.Provider>
    );
    //ThemeContext에서 value를 지정하지 않으면, createContext에서의 값을 씀
    //또는 ThemeContext가 없으면, 이하 동문

    /*
    return에서 <ThemeContext.Provider value={theme}>를 왜 쓰는가?
    Provider는 "이 컨텍스트의 값을 이 아래 트리에 제공한다"는 신호입니다.
    value={theme}로 설정하면, 이 Provider 아래에 있는 모든 컴포넌트가 useContext(ThemeContext)로 이 값을 읽을 수 있습니다.

    즉, 이전에는 prop으로 계속 밑으로 내려가야 했지만,
    이젠 상위 트리에서 정의하면
    밑에서 useContext를 이용해서 값 받기 가능
    */
}