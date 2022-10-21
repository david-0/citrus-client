const providers: any[] = [
  {provide: "environment", useValue: "Production"},
  {provide: "baseUrl", useValue: "/api"}
];

export const ENV_PROVIDERS = providers;

export const environment = {
  production: true,
  recaptcha: {
    siteKey: '6LdcbJ0iAAAAAPjRv-Jorxzx8saHlCGs2aVkO4Sd',
  }
};
