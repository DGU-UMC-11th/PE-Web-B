// src/book.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { DATABASE_CONNECTION } from './database.provider.js';

//ex) 레시피가 있음
@Injectable() // NestJS 컨테이너에 "나 주입 가능한 부품이야!"라고 등록
export class BookRepository {
  constructor(
    // 2단계에서 우리가 등록해둔 DB 커넥션 풀(DATABASE_CONNECTION)을 가져옵니다.
    @Inject(DATABASE_CONNECTION) private readonly pool: Pool, //안전하게 readonly
    /* 재료의 위치를 가리키는 스티커 */
  ) {}

  async findAll(): Promise<any> {
    const sql = 'SELECT * FROM book';
    
    // pool.query()는 [조회된 행들, 메타데이터 필드들] 형태의 배열을 돌려줍니다.
    // 우리는 실제 행 데이터만 필요하므로 구조 분해 할당으로 [rows]만 쏙 꺼냅니다.
    const [rows] = await this.pool.query(sql);
    return rows;
  }

  async findBooksByCategoryID(categoryID: number): Promise<any> {
    const sql = 'SELECT * FROM book WHERE category_id = ?;';

    const [rows] = await this.pool.execute(sql, [
        categoryID,
    ]);
    
    return rows;
  }



  async create(body: Record<string, any>): Promise<any> {
    const sql = 'INSERT INTO book (category_id, title, description, is_available) VALUES (?, ?, ?, true)';
  
    // 두 번째 인자로 넘긴 배열이 ? 자리에 순서대로 안전하게 바인딩됩니다.
    const [result] = await this.pool.execute(sql, [
      body.categoryId,
      body.title,
      body.description,
    ]);
    return result;
  }
}
/*
새 Promise 생성
- const p = new Promise((resolve, reject) => { ... resolve(value) 또는 reject(error) ... })
then으로 결과 받기
- p.then(value => { ... return값 } ).catch(err => { ... })
async 함수는 항상 Promise를 반환합니다.
함수 내부에서 await로 Promise가 해결될 때까지 기다립니다.
- async function getData() { const data = await fetchSomething(); return data; }
- getData().then(d => console.log(d)).catch(e => console.error(e));
*/

/*
constructor
class Person {
constructor(name: string, age: number) {
this.name = name;
this.age = age;
}
}
처럼 new Person('길동', 20) 처럼
 */