export default function App() {
    function handleClick() {
        alert("버튼을 클릭했어요.");
    }
  
    return (
        <button onClick={handleClick}>
            클릭하기
        </button>
    );
}