type EnvType = {
  DB_HOST: string;
  DB_USER: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  PORT: string | number;
  TZ: string;
  PM2: 'yes';
  NODE_ENV: 'dev' | 'prod';
};

const ENV = process.env as Readonly<Partial<EnvType>>;

export default ENV;
