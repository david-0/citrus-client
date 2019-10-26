const providers: any[] = [
  {provide: "environment", useValue: "Production"},
  {provide: "baseUrl", useValue: "https://shop.el-refugio-denia.com/api"}
];

export const ENV_PROVIDERS = providers;

export const environment = {
  production: true
};
