const fs = require('fs');
const axios = require('axios');

(async () => {
  try {
    // Loki 주소
    const lokiUrl = 'http://192.168.10.1:3100/loki/api/v1/push';

    // 로그 파일 읽기
    const logData = fs.readFileSync('playwright-results.log', 'utf-8');
    const logLines = logData.split('\n').filter(line => line.trim() !== '');

    // Loki가 수신할 JSON 데이터 생성
    const streams = logLines.map(line => ({
      stream: {
        job: 'playwright-tests',
        level: 'info',
      },
      values: [
        [Date.now() * 1e6 + '', line], // 타임스탬프를 나노초로 변환
      ],
    }));

    const lokiPayload = { streams };

    // Loki로 데이터 전송
    const response = await axios.post(lokiUrl, lokiPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Loki response:', response.data);
  } catch (error) {
    console.error('Failed to send logs to Loki:', error.message);
  }
})();
