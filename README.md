# react-e2e-playwright

git 저장소에 애플리케이션과 playwright test를 할 수 있는 내용이 모두 담겨져있습니다.

git clone 받은 후, 각각 폴더로 접근하여 실행합니다.

우선, 애플리케이션을 실행해야합니다.
실행하는 방법. npm run dev

다음, playwright test 하는 방법입니다.
npx playwright test

UI 화면으로 보면서 테스트하는 방법
npx playwright test --ui

to-do) 테스트 데이터 모아서 그라파나로 모으는 방법


# playwright - otel 연동
npm install @opentelemetry/sdk-node @opentelemetry/instrumentation @opentelemetry/exporter-trace-otlp-http
