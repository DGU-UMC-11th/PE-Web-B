// 확인용 예제예요. src/main.tsx에 import "./examples/fetch-movies"; 를 임시로 추가해서 실행해요.
import { getMoviesWithFetch } from "../api/movies/get-movies-with-fetch";

getMoviesWithFetch(1)
  .then((response) => console.log(response.results))
  .catch((error) => console.error(error));
