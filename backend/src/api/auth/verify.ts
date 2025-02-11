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

export const verifyRegistry = new OpenAPIRegistry();

/* const requestSchema = z.object({
  message: z.string(),
  signature: z.string(),
}); */

// TODO: define the schema better
const responseObjectSchema = z.object({ address: z.string(), chainId: z.number() });

export const authVerifyRouter: Router = (() => {
  const router = express.Router();

  verifyRegistry.registerPath({
    method: 'post',
    path: '/verify',
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

  router.post('/', async (req: Request, res: Response) => {
    console.log('/verify');

    try {
      if (!req.body.message) {
        return res.status(400).json({ error: 'SiweMessage is undefined' });
      }
      const message = req.body.message;
      const address = getAddressFromMessage(message) as `0x${string}`; // TODO: use zod validation instead
      let chainId = getChainIdFromMessage(message);

      // we are going to use https://viem.sh/docs/actions/public/verifyMessage.html
      const publicClient = createPublicClient({
        transport: http(`https://rpc.walletconnect.org/v1/?chainId=${chainId}&projectId=${env.SIWE_SESSION_SECRET}`),
      });
      const isValid = await publicClient.verifyMessage({
        message,
        address,
        signature: req.body.signature,
      });
      // end o view verifyMessage

      if (!isValid) {
        // throw an error if the signature is invalid
        throw new Error('Invalid signature');
      }
      if (chainId.includes(':')) {
        chainId = chainId.split(':')[1];
      }
      // Convert chainId to a number
      const chainIdNumber = Number(chainId);

      if (isNaN(chainIdNumber)) {
        throw new Error('Invalid chainId');
      }

      console.log({ address, chainId: chainIdNumber });
      // save the session with the address and chainId (SIWESession)
      req.session.siwe = { address, chainId: chainIdNumber };
      req.session.save(() => {
        console.log('here', { session: req.session });
        const serviceResponse = new ServiceResponse(
          ResponseStatus.Success,
          'Success',
          { session: req.session },
          StatusCodes.OK
        );
        handleServiceResponse(serviceResponse, res);
      });
    } catch (e) {
      console.log('catch', e);

      // clean the session
      req.session.siwe = null;
      req.session.nonce = null;
      req.session.save(() => {
        console.log(e.message);
        const serviceResponse = new ServiceResponse(ResponseStatus.Failed, 'e.message', null, StatusCodes.UNAUTHORIZED);
        handleServiceResponse(serviceResponse, res);
      });
    }
  });

  return router;
})();
