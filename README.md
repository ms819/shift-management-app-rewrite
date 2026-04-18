# shift-management-app rewrite

React + Vite + Express + SQLite で組み直した、デプロイしやすいシフト管理アプリです。

## 変更ポイント
- backend を routes / services / repositories に分割
- `PORT` と `DB_PATH` を環境変数対応にして本番デプロイしやすくした
- SQLite は本番では `/var/data/shift.db` を使う前提に変更
- frontend は `VITE_API_BASE_URL` で API の接続先を切り替え可能
- API は `/api/shifts` と `/api/payroll` に統一

## ローカル起動
### backend
```bash
cd backend
npm install
npm run dev
```

### frontend
```bash
cd frontend
npm install
npm run dev
```

## 環境変数
### backend
- `PORT` 例: `5000`
- `DB_PATH` 例: `./data/shift.db`
- `CORS_ORIGIN` 例: `http://localhost:5173,https://your-frontend.onrender.com`

### frontend
- `VITE_API_BASE_URL` 例: `https://your-backend.onrender.com`

## Render デプロイ
### backend
- Web Service
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Persistent Disk Mount Path: `/var/data`

### frontend
- Static Site
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`

## 公開URL
https://shift-management-app-rewrite-1.onrender.com

## 概要
シフト登録・一覧表示・給与計算ができるWebアプリです。

## 使用技術
- React
- Vite
- Express
- SQLite
- Render
