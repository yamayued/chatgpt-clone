# ChatGPT Clone
A conversational AI system that listens, learns, and challenges

開発者: 山本祐揮 (株式会社こころび)

<img width="1470" alt="image" src="https://user-images.githubusercontent.com/98614666/232768610-fdeada85-3d21-4cf9-915e-a0ec9f3b7a9f.png">

## 機能
- OpenAI APIを使用したチャットインターフェース
- 複数のモデル選択（GPT-3.5, GPT-4, GPT-4o）
- 会話履歴の管理
- テーマ切り替え機能
- Web検索機能
- Jailbreakモード

## To do
- [x] 会話削除時の確認ダイアログ
- [x] ユーザー設定の保存
- [x] テーマ変更機能
- [ ] 会話のインポート/エクスポート
- [ ] 音声入出力機能
- [ ] ファイル読み込み機能
- [ ] ドキュメントの改善
- [ ] React化・バックエンドの高速化

## Getting Started
このプロジェクトを始めるには、リポジトリをクローンして仮想環境を設定する必要があります。

### 前提条件
Pythonがシステムにインストールされている必要があります。公式サイトからダウンロードできます: https://www.python.org/downloads/

### リポジトリのクローン
以下のコマンドでリポジトリをクローンします:
```
git clone https://github.com/yamayued/chatgpt-clone.git
```

### 仮想環境のセットアップ
仮想環境を設定するには、以下の手順に従ってください:

1. プロジェクトのルートディレクトリに移動します:
```
cd chatgpt-clone
```
2. 新しい仮想環境を作成します:
```
python -m venv venv
```
3. 仮想環境をアクティベートします:
```
source venv/bin/activate
```
Fishシェルを使用している場合:
```
source venv/bin/activate.fish
```
Windowsの場合:
```
venv\Scripts\activate
```
4. 必要な依存関係をインストールします:
```
pip install -r requirements.txt
```

### アプリケーションの設定
アプリケーションを設定するには、環境変数またはconfig.jsonでいくつかのプロパティを設定できます。環境変数が優先されます。

| フィールド               | 環境変数        | config.json     | 例                                                 |
|---------------------|-----------------|-----------------|----------------------------------------------------|
| OpenAI APIキー      | OPENAI_API_KEY  | openai_key      | sk-...                                             
| OpenAIベースURL     | OPENAI_API_BASE | openai_api_base | https://api.openai.com <br> http://my-reverse-proxy/ 

ベースURLは、リバースプロキシ（[このような](https://github.com/stulzq/azure-openai-proxy)AzureのOpenAIエンドポイントを通じてクエリを実行するもの）を使用する必要がある場合に使用します。

### アプリケーションの実行
アプリケーションを実行するには、仮想環境がアクティブであることを確認し、以下のコマンドを実行します:
```
python run.py
```

### Docker
ChatGPT Cloneを実行する最も簡単な方法はDockerを使用することです:
```
docker-compose up
```

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。

## 貢献
プルリクエストや改善提案を歓迎します。お気軽にissueを作成してください。

## お問い合わせ
株式会社こころび  
開発者: 山本祐揮  
GitHub: https://github.com/yamayued/chatgpt-clone