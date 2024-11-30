import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// Enable OpenTelemetry debugging logs (optional)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Initialize Tracer Provider
const provider = new NodeTracerProvider();

// Configure OTLP HTTP Exporter
const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // OpenTelemetry Collector endpoint
});

// Add Span Processor
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Register the provider globally
provider.register();

console.log('OpenTelemetry initialized');