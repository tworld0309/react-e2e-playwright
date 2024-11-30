import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

// Set up OpenTelemetry
const tracerProvider = new NodeTracerProvider();
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // OpenTelemetry Collector endpoint
});

tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
tracerProvider.register();

const tracer = trace.getTracer('playwright-tests');

console.log('OpenTelemetry initialized');