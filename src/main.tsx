import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import CustomSignOutButton from "./CustomSignOutButton.tsx";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'us-east-1_qHpxVDXhq',
            userPoolClientId: "dvuc7avd90r205phi7ghmm2r4",
            identityPoolId: "us-east-1:c1e0a316-f69c-4681-bd74-945849fe66a3",
            loginWith: {
                email: true,
            },
            signUpVerificationMethod: "code",
            userAttributes: {
                email: {
                    required: true,
                },
            },
            allowGuestAccess: true,
            passwordFormat: {
                minLength: 8,
                requireLowercase: true,
                requireUppercase: true,
                requireNumbers: true,
                requireSpecialCharacters: true,
            },
        },
    },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <Authenticator loginMechanisms={['email']}>
          {({ signOut}) => (
              <>
                  <main>
                      <CustomSignOutButton signOut={signOut} />
                  </main>
                  <BrowserRouter>
                      <App/>
                  </BrowserRouter>
              </>
          )}
          </Authenticator>
      </StrictMode>
)
