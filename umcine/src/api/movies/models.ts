interface TmdbMovie {
    // adult: boolean;
    backdrop_path: string | null;
    
    id: number;
    original_language: string;
    original_title: string;
    
    overview: string;
    title: string;
    popularity: number;

    poster_path: string | null;
    release_date: string;

    softcore: boolean;

    vote_average: number;
    vote_count: number;
  }
  
  interface TmdbMovieListItem extends TmdbMovie {
    genre_ids: number[];
  }
  
  interface TmdbMovieListResponse {
    page: number;
    results: TmdbMovieListItem[];
    total_pages: number;
    total_results: number;
  }
  
  interface TmdbGenre {
    id: number;
    name: string;
  }
  
  interface TmdbMovieDetail extends TmdbMovie {
    genres: TmdbGenre[];
    runtime: number | null;
    tagline: string;
  }
  
  export type {
    TmdbGenre,
    TmdbMovie,
    TmdbMovieDetail,
    TmdbMovieListItem,
    TmdbMovieListResponse,
  };