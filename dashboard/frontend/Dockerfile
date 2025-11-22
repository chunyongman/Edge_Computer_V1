# Frontend Dockerfile for ESS HMI System
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 먼저 복사 (Docker 캐시 활용)
COPY package*.json ./

# npm 패키지 설치
RUN npm install

# 소스 코드는 볼륨 마운트로 관리 (개발 시)
# 프로덕션 배포 시에는 아래 주석 해제
# COPY . .
# RUN npm run build

# 포트 노출
EXPOSE 5173

# Vite 개발 서버 실행 (HMR 활성화)
# --host 옵션으로 외부 접속 허용
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
