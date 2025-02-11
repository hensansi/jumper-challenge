import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { getAddressFromMessage, getChainIdFromMessage } from '@reown/appkit-siwe';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateNonce } from 'siwe';
import { createPublicClient, http } from 'viem';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { env } from '@/common/utils/envConfig';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const signOutRegistry = new OpenAPIRegistry();

/* const requestSchema = z.object({
  message: z.string(),
  signature: z.string(),
}); */

// TODO: define the schema better
const responseObjectSchema = z.object({ address: z.string(), chainId: z.number() });

export const authSignoutRouter: Router = (() => {
  const router = express.Router();

  signOutRegistry.registerPath({
    method: 'get',
    path: '/signout',
    tags: ['Auth'],
    /*     request: {
      body: {
        content: {
          'application/json': requestSchema,
        },
      },
    }, */
    responses: createApiResponse(
      responseObjectSchema,
      'SIWE verification endpoint to check if a wallet-signed message matches the provided address and nonce to authenticate the user.'
    ),
  });

  router.get('/', async (req: Request, res: Response) => {
    req.session.siwe = null;
    req.session.nonce = null;

    req.session.save(() => {
      const serviceResponse = new ServiceResponse(
        ResponseStatus.Success,
        'Success',
        { nonce: generateNonce() },
        StatusCodes.OK
      );
      handleServiceResponse(serviceResponse, res);
    });
  });

  return router;
})();
