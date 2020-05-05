export const environment = {
  production: false,
  client_id: '<YOUR CLIENT ID>',
  client_secret: '<YOUR CLIENT SECRET>',
  loginUrl: 'https://<YOUR DOMAIN NAME>/login?' +
    'client_id=<YOUR CLIENT ID>&' +
    'response_type=code&' +
    'scope=openid+email+phone' +
    '&redirect_uri=http://localhost:4200/callback',

  cognitoTokenURL: 'https://<YOUR DOMAIN NAME>/oauth2/token',

  redirectURL: 'http://localhost:4200/callback',
  logout: 'https://<YOUR DOMAIN NAME>.amazoncognito.com/logout?' +
    'client_id=<YOUR CLIENT ID>&' +
    'response_type=code&' +
    'scope=openid+email+phone' +
    '&redirect_uri=http://localhost:4200/callback'
};