# デプロイ手順書

## GitHubへのプッシュ手順

### 1. GitHubでリポジトリを作成
1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名: `kazu-horse-training`（または任意の名前）
4. **Public**または**Private**を選択
5. **「Initialize this repository with a README」はチェックしない**
6. 「Create repository」をクリック

### 2. ローカルのリポジトリをGitHubにプッシュ

```bash
# リモートリポジトリを追加（YOUR_USERNAME をあなたのGitHubユーザー名に置き換え）
git remote add origin https://github.com/YOUR_USERNAME/kazu-horse-training.git

# メインブランチをmainに設定（既にmainの場合は不要）
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**注意**: `YOUR_USERNAME`を実際のGitHubユーザー名に置き換えてください。

---

## Vercelでのデプロイ手順

### 方法1: Vercelのウェブサイトから（推奨）

1. **Vercelにログイン**
   - https://vercel.com にアクセス
   - 「Sign Up」→ GitHubアカウントでログイン

2. **プロジェクトをインポート**
   - ダッシュボードから「Add New」→「Project」をクリック
   - GitHubリポジトリ一覧から `kazu-horse-training` を選択
   - 「Import」をクリック

3. **プロジェクト設定**
   - **Framework Preset**: Vite を選択（自動検出されるはず）
   - **Root Directory**: `./`（デフォルト）
   - **Build Command**: `npm run build`（自動設定）
   - **Output Directory**: `dist`（自動設定）

4. **環境変数の設定**（Gemini APIを使用する場合）
   - 「Environment Variables」セクションを開く
   - 変数名: `GEMINI_API_KEY`
   - 値: あなたのGemini APIキー
   - 「Add」をクリック

5. **デプロイ**
   - 「Deploy」をクリック
   - 数分でデプロイが完了します
   - デプロイ完了後、URLが表示されます（例: `https://kazu-horse-training.vercel.app`）

### 方法2: Vercel CLIを使用

```bash
# Vercel CLIをインストール（まだの場合）
npm install -g vercel

# プロジェクトディレクトリで実行
cd "/Users/kawashimakazuma/Desktop/カズホーストレーニング/カズホーストレーニングWEBサイト"
vercel

# 初回はログインを求められます
# プロジェクト設定は対話形式で進みます
```

---

## デプロイ後の確認事項

### ✅ 確認すること
1. サイトが正常に表示されるか
2. 画像が正しく表示されるか
3. ナビゲーションが動作するか
4. 「体験予約」ボタンで電話番号にリンクするか
5. レスポンシブデザインが正しく動作するか（スマホ・タブレット・PC）

### 🔧 環境変数の設定
Vercelのダッシュボードから環境変数を追加・編集できます：
- **Settings** → **Environment Variables**
- `GEMINI_API_KEY` を追加（AIチャットボットを使用する場合）

### 🔄 自動デプロイ
GitHubにプッシュすると、Vercelが自動的にデプロイします。

---

## トラブルシューティング

### 画像が表示されない場合
- Pexelsの画像URLが正しいか確認
- ブラウザのコンソールでエラーを確認

### ビルドエラーが発生する場合
- `npm run build`をローカルで実行してエラーを確認
- Vercelのデプロイログを確認

### 環境変数が設定されていない場合
- Vercelのダッシュボードで環境変数を確認
- 再デプロイを実行

