# GEMINI のための AI 協働ガイド

## 開発ベストプラクティス

このドキュメントでは、本プロジェクトで求められる慣習的なコーディングパターンと品質基準について規定します。  
複雑でトリッキーな実装や過度な共通化よりも、「削除しやすく」「読みやすい」コードを優先します。  
これらのプラクティスは、日常の開発およびコードレビュープロセスの指針となります。

### 早期リターン（ガード節）

関数の先頭で例外処理、不正な入力、境界条件をチェックし、早期に `return` または `throw` を行います。このパターンは「ガード節 (Guard Clause)」と呼ばれます。

- **ネストの削減**: コード構造をフラットに保ち、過度なインデント（アローアンチパターン）を防ぎます。
- **可読性の向上**: 最初に例外処理を完了させることで、条件分岐の層を追う必要がなくなり、メインのビジネスロジックに集中できます。
- **「ハッピーパス」の明確化**: 関数の成功ケース（ハッピーパス）がネストされたブロックに埋もれず、関数の末尾に明確に示されます。
- **認知負荷の低減**: 例外ケースを処理した後は、その条件を考慮から外して以降のコードを読めるようになります。

```tsx
function validateAndProcess(user: User | null) {
  // ガード節: 入力が null の場合は即座に処理を終了/例外を発生
  if (!user) {
    throw new Error('無効なユーザーが指定されました。');
  }

  // ガード節: 必要な権限のチェック
  if (!user.hasPermission('processData')) {
    return { status: 'denied', message: '権限がありません。' };
  }

  // ハッピーパス: ネストのないメインロジックを実行
  processData(user);
  return { status: 'success' };
}
```

### カスタムフックによるロジックのカプセル化

コンポーネントのロジックは「Custom Hook」と呼ばれる再利用可能な関数へ抽出します。慣例として、Custom Hook の名前は `use` から始めます。UIコンポーネントから複雑なロジック、副作用（データ取得やサブスクリプション等）、状態管理を分離・抽象化できます。

- **再利用性**: 重複したコードを書くことなく、同じ状態ロジックを複数のコンポーネントに適用できます。
- **関心事の分離**: ビジネスロジックと描画ロジックを綺麗に分離し、コンポーネントの役割を見た目（プレゼンテーション）に特化させます。
- **可読性の向上**: ロジックの実装詳細がフック内にカプセル化されるため、コンポーネントが宣言的で読みやすくなります。
- **テスト可能性の向上**: フックは標準的なJavaScript関数であるため、コンポーネントから独立して単体テストが可能です。
- **コンポジション**: カスタムフック内で他のフック（`useState`, `useEffect` や別のカスタムフック）を使用でき、柔軟にロジックを組み合わることができます。

```tsx
// hooks/useTimer.ts
import { useState, useEffect } from 'react';

export function useTimer(limit: number) {
  const [timeLeft, setTimeLeft] = useState(limit);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeLeft };
}

// components/Timer.tsx
import { useTimer } from '@/hooks/useTimer';

function Timer() {
  const { timeLeft } = useTimer(60);
  return <div>残り時間: {timeLeft}秒</div>;
}
```

### 高度な型定義とジェネリックコンポーネント

TypeScript のジェネリクス等の高度な機能を活用し、柔軟で型安全なコンポーネントを構築します。プロジェクトで採用されている重要なパターンの一つが Polymorphic (ポリモーフィック) コンポーネントです（`as` プロップによって実装されます）。これにより、プロップの厳密な型チェックを維持したまま、異なるHTML要素としてレンダリングできます。

- **柔軟性と型安全性**: 型安全性を損なうことなく、基盤となる要素を切り替えられるコンポーネント（例: `<button>` としても `<a>` としても機能するボタン）を作成できます。選択した要素に応じて自動補完やバリデーション対象のプロップが変化します。
- **優れた開発者体験 (DX)**: 適切な IntelliSense やコンパイルエラーを提供し、コンポーネントの正しい利用をガイドします。例えば `as="a"` を指定した場合は `href` プロップが必須となります。
- **堅牢性**: 不正なプロップの組み合わせを開発時に検出できるため、実行時バグを未然に防ぎます。
- **シンプルで統一された API**: 要素ごとに個別のコンポーネント（例: `LinkButton`, `RegularButton`）を用意するのではなく、一つの強力な API を提供します。

```tsx
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

// コンポーネント固有のプロップと描画対象要素のプロップをマージ
type PolymorphicProps<T extends ElementType> = ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>;

function Button<T extends ElementType = 'button'>({ as, children, ...props }: PolymorphicProps<T>) {
  const Component = as ?? 'button';
  return <Component {...props}>{children}</Component>;
}

// 使用例:
// <Button onClick={() => {}}>標準ボタン</Button>
// <Button as="a" href="/home">ボタン風スタイルのリンク</Button>
```

### Jotai によるアトミックな状態管理

本プロジェクトでは状態管理に Jotai を採用し、状態を「atom」と呼ばれる最小単位に分割して管理するアトミックアプローチをとっています。単一の巨大な状態オブジェクトを作成するのではなく、複数の atom を組み合わせてアプリケーションの状態を構築します。このパターンにより、状態ロジックをコンポーネントツリーから分離し、パフォーマンスと保守性を高めます。

- **コンポーネントと状態の分離**:
  状態定義 (`atoms`) は機能ごとの `stores` ディレクトリ（または関連する共有ロジックの隣）にまとめて配置します。これによりUIと状態が明確に分離され、それぞれのテストや理解が容易になります。
- **再レンダリングの最適化**: コンポーネントは必要な atom のみにサブスクライブします。その結果、依存している特定の atom が更新された場合のみ再レンダリングされ、Context ベースの状態管理で発生しがちなパフォーマンス低下を回避できます。
- **拡張性と柔軟性**: atom は高い合成可能性を持ちます。他の atom から派生（compute）した値を定義することも容易です。また、動的要素のリストを扱う複雑なユースケースでは、`atomFamily` を利用してボイラープレートなしで動的に atom を生成できます。
- **ロジックの簡素化**: 状態更新のロジックを atom 自体の内部にカプセル化できます（書き込み専用 atom や読み書き atom を利用）。UI コンポーネント側は実装詳細を知る必要がなく、アクションの呼び出しや値の読み取りに集中できます。

```tsx
import { atom, useAtom } from 'jotai';

// stores/game-state.ts
export const scoreAtom = atom(0);

// 派生された読み取り専用 atom
export const canPlayAtom = atom((get) => get(scoreAtom) > -5);

// スコアをリセットする書き込み専用 atom
export const resetScoreAtom = atom(null, (_, set) => {
  set(scoreAtom, 0);
});

// components/Scoreboard.tsx
import { useAtomValue } from 'jotai';
import { scoreAtom } from '@/stores/game-state';

function Scoreboard() {
  // スコアの参照のみを行うため useAtomValue を使用
  // scoreAtom が変更された場合のみ再レンダリングされる
  const score = useAtomValue(scoreAtom);
  return <div>スコア: {score}</div>;
}
```

## ディレクトリ構造と命名規則

このドキュメントでは、本プロジェクトにおけるファイルおよびフォルダの組織化基準について定義します。  
開発者がリソースを効率的に配置・検索できるように、予測可能で直感的な構造を維持することを目的としています。  
命名規則と配置の一貫性を保つことが、アーキテクチャ上の技術的負債を減らす鍵となります。

### `*/index.ts`

ディレクトリ内のコンポーネントを一括インポートするためのエントリーポイントとして機能します。  
該当するすべてのディレクトリに配置します。

### `src` ディレクトリ構造

#### `src/components`

すべての React コンポーネントを配置するディレクトリです。

#### `src/components/common`

複数の機能間で共有される汎用コンポーネントを配置します。  
共通コンポーネントが複数の関連ファイル（例: `button.tsx`, `styles.ts`）で構成される場合は、`src/components/common/button/` のようなサブディレクトリにグループ化します。

#### `src/components/games`

特定のゲームや機能に関連するコンポーネントを専用ディレクトリにグループ化します。  
たとえば、「神経衰弱 (Concentration)」ゲームのすべてのコンポーネントは `src/components/games/concentration` に配置されます。

- 機能ディレクトリは以下のように構成されます:
  - `content.tsx`: 該当機能を組み立てるメインコンポーネント。
  - `hooks/`: 該当機能専用の React フック。
    - `use-*.ts`: 1ファイルにつき1つのカスタムフックを定義。
  - `stores/`: 該当機能の状態管理ロジック (Jotai)。
    - `game-state.ts`: ゲーム全体のステート（`isPlaying`, `isGameOver` など）。
    - `play-state.ts`: プレイ中の詳細なステート（プレイヤーの位置、スコアなど）。
  - `ui/`: 機能を構成するUIパーツコンポーネント。
    - `*.tsx`: 個々のUIコンポーネント。

#### `src/hooks`

アプリケーション全体で共有される React フックを配置します。

- 複雑で専用の状態管理を必要とするフックの場合は、サブディレクトリを作成します（例: `src/hooks/use-timer/`）。

#### `src/pages`

アプリケーションのルーティングを定義する Astro ページコンポーネントを配置します。

- トップページは `src/pages/index.astro` です。
- 各ゲームのページは `src/pages/game/` 配下に配置されます。

#### `src/utils`

特定フレームワークや機能に依存しない汎用ユーティリティ関数を配置します。

#### `src/assets`

ソースコードからインポートして使用する画像などの静的アセットを配置します。

#### `src/layouts`

Astro のレイアウトコンポーネントを配置します。

### Tailwind CSS

- `src/index.css`: Tailwind CSS v4 のディレクティブ (`@import "tailwindcss";`) およびカスタムテーマデザイントークン (`@theme`) を設定するメイン CSS エントリーポイントです。

### アセット

- `public`: ビルド出力に直接コピーされる静的アセットです。ビルドパイプラインによる処理を必要とせず、絶対パスで参照されるファイル（例: favicon, robots.txt）を配置します。
- `src/assets`: ビルドプロセス中に最適化およびハッシュ化される静的アセットです。ソースコード内で `import` して使用する画像を配置します。