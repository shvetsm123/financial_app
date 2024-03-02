import * as winston from 'winston';

const paymentFormat = winston.format.printf(({ level, message }) => {
  return `${level}: ${message}`;
});

export const paymentLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), paymentFormat),
  transports: [
    new winston.transports.File({
      filename: 'payments.log',
    }),
  ],
});
