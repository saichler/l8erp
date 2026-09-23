/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Environment configuration for the e2e suite.
//
// Defaults target the KIND cluster stood up by k8s/kind-start.sh, addressed
// through the stable host port mapping in k8s/kind-cluster.yaml (containerPort
// 2773 -> hostPort 2773). PostImplementationE2ETesting is explicit about this:
// KIND hands the worker node a fresh IP on every recreate, so the suite points
// at localhost:<port> and never at a node IP.

function env(name: string, fallback: string): string {
    const v = process.env[name];
    return v === undefined || v === '' ? fallback : v;
}

export const ENV = {
    /** Root of the deployed app. Self-signed cert -- see ignoreHTTPSErrors. */
    baseURL: env('L8ERP_BASE_URL', 'https://localhost:2773'),

    /** API prefix from login.json `app.apiPrefix`. */
    apiPrefix: env('L8ERP_API_PREFIX', '/erp'),

    /**
     * Credentials. Defined in plaintext in
     * ../l8secure/go/secure/plugin/erp/erp_config.go; erp.json holds only the
     * salted hashes. `operator` carries the wildcard allow rule, so it sees
     * every module -- the right account for full-coverage smoke runs.
     */
    user: env('L8ERP_USER', 'operator'),
    pass: env('L8ERP_PASS', 'Oper123!'),

    /** A deliberately narrow account, used by the permission specs. */
    limitedUser: env('L8ERP_LIMITED_USER', 'hrclerk'),
    limitedPass: env('L8ERP_LIMITED_PASS', 'hrClerk123!'),

    /** Shell paths. Mobile is the real mobile bundle, never a resized desktop. */
    desktopShell: '/app.html',
    mobileShell: '/m/app.html',
    loginShell: '/l8ui/login/index.html',

    /** Portal shells served by the same web server (PortalsSameWebServer). */
    portals: ['/ess.html', '/mgr.html', '/customer.html', '/vendor.html',
              '/partner.html', '/projclient.html'],

    /**
     * How long a freshly-restarted cluster is given to answer. The vnic mesh
     * reconnects for a few seconds after a pod restart; PostImplementationE2ETesting
     * calls this out as infra churn rather than a regression.
     */
    apiTimeoutMs: Number(env('L8ERP_API_TIMEOUT_MS', '30000'))
};

export function apiUrl(endpoint: string): string {
    const path = endpoint.startsWith(ENV.apiPrefix) ? endpoint : ENV.apiPrefix + endpoint;
    return ENV.baseURL + path;
}
