# cognitoAuth

PS: Images are not dipslayed here, to see the full article that describe this source code check my medium article here:
https://medium.com/@jamalerrakibi/understanding-oauth2-0-openid-authentication-using-cognito-in-angular-559a36adcc8a


# Understanding OAuth2.0, OpenId (authentication) using Cognito in Angular

Here i will share with you the process to set up authorization, authentication for your application using AWS Cognito. AWS Cognito let's you add user sign up , sign in and access control to your web and mobile app, it supports sign-in with social identity provider such as facebook, google and amazon.

1- OAuth2.0: Delegated Authorization
OAuth2.0 is a set of defined process flow that solve the problem of delegated authorization. Mean How can i let a web site access my data without giving it a password ?
Use case : Imagine the scenario when you want to play a game on your mobile, but suddenly the game request access to some resources (email, profile) from Facebook Authorization server.

--------------------------------------

2- OAuth2.0 process flow
This diagram (check link below of my article on medium to see the diagram) may look strange for you at the first time, but no worry. I will explain the process flow behind this diagram. Let's start with some terminology:
Resource owner: You
Client: Your App
Authorization server: Google login server

Process:
1. You click authorize button on your application
2. On clicking on this button, GET request with some param is sent to your provider (Facebook, Amazon Cognito, Google).
Params:
Redirect URI: (https://app.diagrams.net/google) the callback URI, Authorization server call when everything is done successfully.
Response Type: Tell Authorization server what type of grant do we want (code, token, …)
Scope: (Ex: scope = email profile) specifies what resources we want to access in our client app.
3. You are redirected to google login page and asked to enter your credentials;
4. On clicking connect the authorization server return a consent page where you as a resource owner asked to allow access to some data based on scope;
5- An authorization code is sent to your client app then auth server calls redirect URI with code as param (Ex: https://app.diagrams.net/google?code=abcdefgh1234);
6. Client should exchange this code with authorization server to get token (Source code of this step below).

--------------------------------------

3- Fedederated Authentication (OpenID)
Federated Authentication allow you to sign in to a site using your Facebook and google account.
OpenID process flow is a layer over OAuth2.0 with addition of an id-token to access-token.
Rq: OAuth2.0 was designed for delegated Authorization, OpenID can extends OAuth2.0 for federated authentication

--------------------------------------

4- Setting up an Authentication Service using AWS Cognito
You could now use Amazon cognito to add sign-in, sign-up to your mobile & web application without worrying about handling security, building or scaling stuff, the only thing you should do is to configure user pool.
User pools provide principally:
sign-in and sign-up service.
A built-in, customizable template form for sign-in/up
Social sign-in with many identity provider such as facebook, google and amazon.

Steps:
1- Choose Cognito service from AWS management console;
2- Choose Manage User Pools;
3- Enter your pool name and click Review defaults;
4- Click on the pencil icon to modify settings;
5- Let's allow at the first time only sign in with email address, Check 'Allow email addresses'
7- Click create Pool when you finally done;
8- Type an available domain name to get access to your sign-in, sign-up pages hosted by Cognito;
9- Set your application name
10- Copy your app client id and client secret, you will need this information in your angular app;


11- The last step is to configure callback URL (Url which the app should be redirected after a successful sign in, more details below)

--------------------------------------

5- Setting up an your angular app
Your Angular app should have two components, Home Component which is public (No login required), it's the entry page for our app, and the dashboard component that require an access token to get access to.
This source code describe the process of exchanging call back code with access token.
Exchange callback code with tokenYou can check sample code on GitHub for more details.
Thanks for reading. 🍻

Next, I written a whole Article
On how to deploy your application with EC2, Docker, Spring boot using AWS CLI
https://medium.com/@jamalerrakibi/deploy-your-application-with-ec2-docker-spring-boot-using-aws-cli-cb9f81260d29


Resources:
https://speakerdeck.com/nbarbettini/oauth-and-openid-connect-in-plain-english
https://hackernoon.com/demystifying-oauth-2-0-and-openid-connect-and-saml-12aa4cf9fdba
https://lazypandatech.com/blog/AWS/5/SSO-configuration-using-AWS-Cognito
