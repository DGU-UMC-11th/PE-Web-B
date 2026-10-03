export default function App() {
    const movieTitle = "인터스텔라";
    const genre = "SF";
    const releasedDate = new Date('2014-11-06');
  
    return (
      <article className="movie-card">
        <h1>{movieTitle}</h1>
        <p>장르: {genre}</p>
        <p>개봉일: {releasedDate.toLocaleDateString()}</p>
      </article>
    );
  }