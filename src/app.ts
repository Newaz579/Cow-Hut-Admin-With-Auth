import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import { UsersRoutes } from './app/modules/users/users.route';
// import { CowRoutes } from './app/modules/cow/cow.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import ApiError from './errors/ApiError';
import router from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application Routes
// app.use('/api/v1/users/', UsersRoutes);
// app.use('/api/v1/cow', CowRoutes);

app.use('/api/v1/', router);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   res.send('Working Successfully');
//   // throw new ApiError(400,'ore baba error')
//   Promise.reject(new Error('unhandled promise rejection'));
// });

// Global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
