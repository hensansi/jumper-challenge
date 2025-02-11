import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { nonceRegistry } from '@/api/auth/nonce';
import { sessionRegistry } from '@/api/auth/session';
import { verifyRegistry } from '@/api/auth/verify';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([healthCheckRegistry, nonceRegistry, sessionRegistry, verifyRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
