# UMC 11th PE-Web-B 미션 진행상황

## 개발환경

`mission/`을 pnpm workspace 루트로 사용합니다. 주차별 미션은 개별 패키지이고, 공통 설정(TypeScript, tsconfig)은 루트에서 공유합니다.

```
mission/
├── pnpm-workspace.yaml     # packages: ['week*/*']
├── package.json            # 공통 devDependencies
├── tsconfig.base.json      # 공통 컴파일러 옵션
├── .gitignore
├── progress.md
└── week<N>/mission<M>/
    ├── package.json        # 이름 + 스크립트 + 주차 전용 의존성
    ├── tsconfig.json       # extends ../../tsconfig.base.json
    └── src/
```

### 자주 쓰는 명령어

프로젝트 루트(`PE-Web-B/`)에서 실행합니다.

| 명령어 | 설명 |
| --- | --- |
| `pnpm -C mission install` | 전체 의존성 설치 |
| `pnpm -C mission run typecheck` | 전체 주차 타입 검사 |
| `pnpm -C mission run build` | 전체 주차 빌드 |
| `pnpm -C mission/week1/mission1 run dev` | 해당 미션 watch 모드 |
| `pnpm -C mission/week1/mission1 run start` | 해당 미션 실행 |

### 새 주차 추가 방법

1. `mission/week<N>/mission<M>/` 폴더 생성
2. `package.json` 작성 — `name`은 `week<N>-mission<M>` 형태로 중복되지 않게
3. `tsconfig.json`에 `"extends": "../../tsconfig.base.json"` 지정
4. 루트에서 `pnpm -C mission install`

공통으로 쓸 패키지는 `pnpm -C mission add -D <pkg> -w`, 특정 주차 전용은 `pnpm -C mission/week<N>/mission<M> add <pkg>`.

### 환경 정보

- Node 22.14.0 / pnpm 12.5.1
- TypeScript 7.0.2, `@types/node` 22

## 주차별 진행상황

| 주차 | 미션 | 상태 | 비고 |
| --- | --- | --- | --- |
| 1주차 | 필수 미션 | 완료 | 스터디 회원 관리 프로그램 |
| 1주차 | 선택 미션 | 진행 안 함 | |
| 1주차 | 핵심 키워드 | 노션에 작성 | |
| 1주차 | 트러블 슈팅 | 진행 안 함 | |

### 1주차 - TypeScript 핵심 문법 및 타입 시스템

- **브랜치**: `yoshi/week1/mission1`
- **경로**: `mission/week1/mission1`

#### 필수 미션 - 스터디 회원 관리 프로그램

요구사항과 구현을 대응시키면 다음과 같다.

| 요구사항 | 구현 |
| --- | --- |
| ID, 이름, 역할 + 선택값 GitHub 아이디를 타입으로 표현 | `interface StudyMember` + 옵셔널 프로퍼티 `githubId?` |
| 역할은 정해진 선택지 | `type MemberRole = "leader" \| "member"` |
| 서로 다른 정보의 회원 2명 이상 | `members` 3명 (GitHub 아이디 있음 2명 / 없음 1명) |
| ID로 회원 찾기 | `findMemberById()` — `find()`는 못 찾으면 `undefined` |
| 존재하지 않는 회원 처리 | `if (!member)` 조건문으로 먼저 반환 (타입 좁히기) |
| GitHub 아이디 없는 회원 처리 | `member.githubId ?? "없음"` |
| 안내 문구 생성 | `createMemberInfo()` |

객체의 모양은 `interface`, 문자열 선택지는 `type`으로 작성했다 (워크북 4단원 규칙). 반환 타입은 모두 추론에 맡기고 명시하지 않았다.

**최종 확인 결과**

```bash
$ pnpm exec tsc --noEmit     # 오류 없음 (exit 0)
$ pnpm exec tsc              # dist/index.js 생성
$ node dist/index.js
1번 광수님, 리더, GitHub: gwangsoo
2번 지수님, 팀원, GitHub: 없음
999번 회원을 찾을 수 없음
```

**추론된 타입** (`tsc --declaration`으로 확인)

```ts
function findMemberById(memberId: number): StudyMember | undefined
function describeRole(role: MemberRole): "리더" | "팀원"
function createMemberInfo(memberId: number): string
```

`describeRole`은 `string`이 아니라 **문자열 리터럴 유니언**으로 추론된다. 반환하는 값이 리터럴 두 개뿐이라 TypeScript가 더 좁은 타입을 알아낸 것이다.

## 참고: 확인해 본 오류

`find()` 결과를 확인 없이 사용하면 어떤 오류가 나는지 재현해 봤다.

```ts
const member = members.find((m) => m.id === memberId);
return member.name + " / " + member.githubId.toUpperCase();
```

```
error TS18048: 'member' is possibly 'undefined'.
error TS18048: 'member.githubId' is possibly 'undefined'.
```

워크북 예시에는 `Object is possibly 'undefined'.`로 적혀 있으나, TypeScript 7에서는 변수 이름을 포함한 `TS18048` 형태로 출력된다.

## 기록

- 2026-09-20 — pnpm workspace 기반 개발환경 구성. 폴더명 `misssion1` → `mission1` 정정.
- 2026-09-20 — 1주차 필수 미션 완료. 타입 검사 / 컴파일 / 실행 모두 확인.
