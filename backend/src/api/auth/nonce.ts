import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateNonce } from 'siwe';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const nonceRegistry = new OpenAPIRegistry();

const nonceSchema = z.object({ nonce: z.string() });

export const authNonceRouter: Router = (() => {
  const router = express.Router();

  nonceRegistry.registerPath({
    method: 'get',
    path: '/nonce',
    tags: ['Auth'],
    responses: createApiResponse(nonceSchema, 'A one-time random string used for wallet authentication.'),
  });

  router.get('/', (_req: Request, res: Response) => {
    const serviceResponse = new ServiceResponse(
      ResponseStatus.Success,
      'Success',
      { nonce: generateNonce() },
      StatusCodes.OK
    );
    console.log('/nonce');
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
