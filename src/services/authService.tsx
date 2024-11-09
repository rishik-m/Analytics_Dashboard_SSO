import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { localisable } from "../utils/localisable";
import { navPaths } from "../utils/nav";

interface AuthServiceProps {
  children: ReactNode;
}

export const initializeAuth0 = ({
  children,
}: AuthServiceProps): JSX.Element => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  if (!domain || !clientId) {
    throw new Error(localisable.error.errorMissingEnvVariables);
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}${navPaths.dashboard}`,
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
