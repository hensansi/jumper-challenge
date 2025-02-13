import cors from 'cors';
import express, { Express } from 'express';
import Session from 'express-session';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { tokenListRouter } from './api/address/tokenList';
import { authNonceRouter } from './api/auth/nonce';
import { authSessionRouter } from './api/auth/session';
import { authSignoutRouter } from './api/auth/signout';
import { authVerifyRouter } from './api/auth/verify';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(express.json());
app.use(
  Session({
    name: 'siwe-quickstart',
    secret: env.SIWE_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'lax' },
  })
);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);

// Auth
app.use('/nonce', authNonceRouter);
app.use('/session', authSessionRouter);
app.use('/verify', authVerifyRouter);
app.use('/signout', authSignoutRouter);

// Address
app.use('/address/:walletAddress/token-list', tokenListRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
