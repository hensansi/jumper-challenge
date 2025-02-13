import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

import { getTokenBalances, getTokenMetadata, processedTokensBalances } from './util';

export const tokenListRegistry = new OpenAPIRegistry();

export const tokenListRouter: Router = (() => {
  const router = express.Router({ mergeParams: true });

  tokenListRegistry.registerPath({
    method: 'get',
    path: '/address/{walletAddress}/token-list',
    tags: ['Wallet'],
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/', async (req: Request, res: Response) => {
    // Missing validation
    const walletAddress = req.params.walletAddress;
    const tokenList = await getTokenBalances(walletAddress);

    const metadataList = await Promise.all(
      tokenList.map(async (token) => {
        const metadata = await getTokenMetadata(token.contractAddress);
        return [token.contractAddress, metadata];
      })
    );

    const metadataMap = Object.fromEntries(metadataList);
    const processedBalances = processedTokensBalances(tokenList, metadataMap);

    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Success', processedBalances, StatusCodes.OK);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
