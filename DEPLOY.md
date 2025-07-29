# GitHub Pages デプロイ手順

## 1. GitHubでリポジトリを作成
1. GitHubにログイン
2. 新しいリポジトリを作成: https://github.com/new
   - Repository name: `chatgpt-clone`
   - Public を選択
   - 「Create repository」をクリック

## 2. ローカルからプッシュ
```bash
# プロジェクトディレクトリで実行
cd /mnt/c/Users/owner/OneDrive/デスクトップ/my_project/chatgpt-clone-main

# Git初期化
git init

# リモートリポジトリを追加
git remote add origin https://github.com/yamayued/chatgpt-clone.git

# ファイルを追加
git add .

# コミット
git commit -m "Initial commit - 株式会社こころび AI Chat System"

# mainブランチに変更
git branch -M main

# プッシュ
git push -u origin main
```

## 3. GitHub Pages を有効化
1. リポジトリページで「Settings」タブを開く
2. 左メニューから「Pages」を選択
3. Source で「Deploy from a branch」を選択
4. Branch で「main」「/ (root)」を選択
5. 「Save」をクリック

## 4. アクセス
数分後、以下のURLでアクセス可能になります：
https://yamayued.github.io/chatgpt-clone/

## 注意事項
- このデモ版はバックエンドサーバーが必要なため、実際のAI応答は動作しません
- OpenAI APIキーが設定されていない場合のデモメッセージが表示されます
- 完全に動作させるには、バックエンドサーバーをどこかにホスティングする必要があります