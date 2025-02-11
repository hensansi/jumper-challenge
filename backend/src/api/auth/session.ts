import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const sessionRegistry = new OpenAPIRegistry();

// @TODO: define the schema better
// const sessionSchema = z.object({});
export const authSessionRouter: Router = (() => {
  const router = express.Router();

  sessionRegistry.registerPath({
    method: 'get',
    path: '/session',
    tags: ['Auth'],
    responses: createApiResponse(z.null(), 'Return the siwe session'),
  });

  router.get('/', (req: Request, res: Response) => {
    //console.log('req.session.siwe', req.session.siwe);
    const serviceResponse = new ServiceResponse(
      ResponseStatus.Success,
      'Success',
      { session: req.session },
      StatusCodes.OK
    );
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
