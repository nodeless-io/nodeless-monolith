import React, { useEffect, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import "./css/style.css";
// import "./charts/ChartjsConfig";
import { APP_ROUTES } from "./pages/app.routes";
import PrivateRoutes from "./pages/Private.routes";
import AuthRoutes from "./pages/Auth.routes";
import StoreIndex from "./pages/store/index/StoreIndex";
import StoreDashboard from "./pages/store/dashboard/Dashboard";
import NodelessAddressIndex from "./pages/nodeless-address/index/NodelessAddressIndex";
import NodelessAddressDashboard from "./pages/nodeless-address/dashboard/NodelessAddressDashboard";
import "chart.js/auto";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { checkIfRouteCanBeStored } from "./utils/helpers";

dayjs.extend(relativeTime);

const PageNotFound = lazy(() => import("./pages/page-not-found/PageNotFound"));

const ResetPassword = lazy(() =>
  import("./pages/reset-password/ResetPassword")
);

const PrivacyPolicy = lazy(() =>
  import("./pages/privacy-policy/PrivacyPolicy")
);

const TermsAndConditions = lazy(() =>
  import("./pages/terms-and-conditions/TermsAndConditions")
);

const VulnerabilityPolicy = lazy(() =>
  import("./pages/vulnerability-policy/VulnerabilityPolicy")
);

const Checkout = lazy(() => import("./pages/checkout/Checkout"));

const DonationPage = lazy(() =>
  import("./pages/donation-page/index/DonationPageIndex")
);

const DonationPageDashboard = lazy(() =>
  import("./pages/donation-page/dashboard/DonationPageDashboard")
);

const DonationPageSettings = lazy(() =>
  import("./pages/donation-page/settings/DonationPageSettings")
);

// const DonationPageAppearance = lazy(() =>
//   import(
//     "./pages/donation-page/checkout-appearance/DonationPageCheckoutAppearance"
//   )
// );

const DonationPageWebhooks = lazy(() =>
  import("./pages/donation-page/webhooks/DonationPageWebhooks")
);

const PublicDonationPage = lazy(() =>
  import("./pages/public-donation-page/PublicDonationPage")
);

const PaywallDashboard = lazy(() =>
  import("./pages/paywall/dashboard/PaywallDashboard")
);

const PaywallRequests = lazy(() =>
  import("./pages/paywall/requests/PaywallRequests")
);

const PaywallPaywalls = lazy(() =>
  import("./pages/paywall/paywalls/PaywallPaywalls")
);

const PaywallRequestDashboard = lazy(() =>
  import("./pages/single-paywall/dashboard/SinglePaywallDashboard")
);

const PaywallRequestsWebhooks = lazy(() =>
  import("./pages/single-paywall/webhooks/PaywallRequestsWebhooks")
);

const PaywallRequestsSettings = lazy(() =>
  import("./pages/single-paywall/settings/SinglePaywallSettings")
);

const SinglePaywallRequest = lazy(() =>
  import("./pages/single-paywall/requests/SinglePaywallRequest")
);

const PublicPaywall = lazy(() =>
  import("./pages/public-paywall/PublicPaywall")
);

const Login = lazy(() => import("./pages/login/Login"));

const Signup = lazy(() => import("./pages/signup/Signup"));

const ForgotPassword = lazy(() =>
  import("./pages/forgot-password/ForgotPassword")
);

const StoreInvoice = lazy(() => import("./pages/store/invoices/StoreInvoice"));

const StoreSettings = lazy(() =>
  import("./pages/store/settings/StoreSettings")
);

const StoreWebhooks = lazy(() =>
  import("./pages/store/webhooks/StoreWebhooks")
);

// const StoreCheckoutAppearance = lazy(() =>
//   import("./pages/store/checkout-appearance/StoreCheckoutAppearance")
// );

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

const Transactions = lazy(() =>
  import("./pages/transactions/all/AllTransactions")
);

const DonationsTransactions = lazy(() =>
  import("./pages/transactions/donations/DonationsTransactions")
);

const NodelessAddressTransactions = lazy(() =>
  import("./pages/transactions/nodeless-address/NodelessAddressTransactions")
);

const StoreTransactions = lazy(() =>
  import("./pages/transactions/store/StoreTransactions")
);

const WithdrawalTransactions = lazy(() =>
  import("./pages/transactions/withdrawal/WithdrawalTransactions")
);

const PaywallRequestTransactions = lazy(() =>
  import("./pages/transactions/paywall-requests/PaywallRequestTransactions")
);

const ReferralFeesTransactions = lazy(() =>
  import("./pages/transactions/referral-fees/ReferralFeesTransactions")
);

const LightningAddressPaymentTransactions = lazy(() =>
  import(
    "./pages/transactions/lightning-address/LightningAddressPaymentTransactions"
  )
);

const WithdrawDashboard = lazy(() =>
  import("./pages/withdraw/dashboard/WithdrawDashboard")
);

const WithdrawSettings = lazy(() =>
  import("./pages/withdraw/settings/WithdrawSettings")
);

// const Paywall = lazy(() => import("./pages/paywall/Paywall"));

const SettingsAccount = lazy(() =>
  import("./pages/profile/account/AccountProfile")
);

const ProfileTwoFactor = lazy(() =>
  import("./pages/profile/two-factor/TwoFactorSettings")
);

const ProfileNotifications = lazy(() =>
  import("./pages/profile/notifications/ProfileNotifications")
);

const SettingsAPIToken = lazy(() =>
  import("./pages/profile/api-keys/SettingsAPIToken")
);

const ProfileReferrals = lazy(() =>
  import("./pages/profile/referrals/ProfileReferrals")
);

const NodelessAddressSettings = lazy(() =>
  import("./pages/nodeless-address/settings/NodelessAddressSettings")
);

const NodelessAddressWebhooks = lazy(() =>
  import("./pages/nodeless-address/webhooks/NodelessAddressWebhooks")
);

const NodelessAddressMessages = lazy(() =>
  import("./pages/nodeless-address/messages/NodelessAddressMessages")
);

const GatedInboxRequest = lazy(() =>
  import("./pages/gated-inbox-request/GatedInboxRequest")
);

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (checkIfRouteCanBeStored(pathname)) {
      window.localStorage.setItem("page", pathname);
    }

    window.scroll({ top: 0 });
  }, [pathname]);

  return (
    <Routes>
      <Route
        path={APP_ROUTES.GATED_INBOX_REQUEST}
        element={<GatedInboxRequest />}
      />

      <Route path={APP_ROUTES.PUBLIC_PAYWALL} element={<PublicPaywall />} />

      <Route path={APP_ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />

      <Route
        path={APP_ROUTES.TERMS_AND_CONDITIONS}
        element={<TermsAndConditions />}
      />

      <Route
        path={APP_ROUTES.VULNERABILITY_POLICY}
        element={<VulnerabilityPolicy />}
      />

      <Route
        path={APP_ROUTES.STORES_INVOICES}
        element={
          <PrivateRoutes>
            <StoreInvoice />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.DONATION_PAGE_INDEX}
        element={
          <PrivateRoutes>
            <DonationPage />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.DONATION_PAGE_DASHBOARD}
        element={
          <PrivateRoutes>
            <DonationPageDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.DONATION_PAGE_SETTINGS}
        element={
          <PrivateRoutes>
            <DonationPageSettings />
          </PrivateRoutes>
        }
      />
      {/* <Route
        path={APP_ROUTES.DONATION_PAGE_APPEARANCE}
        element={
          <PrivateRoutes>
            <DonationPageAppearance />
          </PrivateRoutes>
        }
      /> */}
      <Route
        path={APP_ROUTES.DONATION_PAGE_WEBHOOKS}
        element={
          <PrivateRoutes>
            <DonationPageWebhooks />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.PUBLIC_DONATION_PAGE}
        element={<PublicDonationPage />}
      />
      <Route
        path={APP_ROUTES.RESET_PASSWORD}
        element={
          <AuthRoutes>
            <ResetPassword />
          </AuthRoutes>
        }
      />
      <Route path={APP_ROUTES.ERROR} element={<PageNotFound />} />
      {/* New Routes */}

      <Route
        path={APP_ROUTES.TRANSACTIONS}
        element={
          <PrivateRoutes>
            <Transactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.DONATION_TRANSACTIONS}
        element={
          <PrivateRoutes>
            <DonationsTransactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.NODELESS_ADDRESS_TRANSACTIONS}
        element={
          <PrivateRoutes>
            <NodelessAddressTransactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.STORE_TRANSACTIONS}
        element={
          <PrivateRoutes>
            <StoreTransactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.WITHDRAWAL_TRANSACTIONS}
        element={
          <PrivateRoutes>
            <WithdrawalTransactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_REQUEST_TRANSACTIONS}
        element={
          <PrivateRoutes>
            <PaywallRequestTransactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.REFERRAL_FEES_TRANSACTIONS}
        element={
          <PrivateRoutes>
            <ReferralFeesTransactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.LIGHTNING_ADDRESS_PAYMENT_TRANSACTIONS}
        element={
          <PrivateRoutes>
            <LightningAddressPaymentTransactions />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.DASHBOARD}
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.WITHDRAW_DASHBOARD}
        element={
          <PrivateRoutes>
            <WithdrawDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.WITHDRAW_SETTINGS}
        element={
          <PrivateRoutes>
            <WithdrawSettings />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.PROFILE_ACCOUNT}
        element={
          <PrivateRoutes>
            <SettingsAccount />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.PROFILE_TWO_FACTOR}
        element={
          <PrivateRoutes>
            <ProfileTwoFactor />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.PROFILE_NOTIFICATIONS}
        element={
          <PrivateRoutes>
            <ProfileNotifications />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PROFILE_API_KEYS}
        element={
          <PrivateRoutes>
            <SettingsAPIToken />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.PROFILE_REFERRALS}
        element={
          <PrivateRoutes>
            <ProfileReferrals />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_DASHBOARD}
        element={
          <PrivateRoutes>
            <PaywallDashboard />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_REQUESTS}
        element={
          <PrivateRoutes>
            <PaywallRequests />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_SINGLE_PAYWALL_DASHBOARD}
        element={
          <PrivateRoutes>
            <PaywallRequestDashboard />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_SINGLE_PAYWALL_WEBHOOKS}
        element={
          <PrivateRoutes>
            <PaywallRequestsWebhooks />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_SINGLE_PAYWALL_SETTINGS}
        element={
          <PrivateRoutes>
            <PaywallRequestsSettings />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_SINGLE_PAYWALL_REQUESTS}
        element={
          <PrivateRoutes>
            <SinglePaywallRequest />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.PAYWALL_PAYWALLS}
        element={
          <PrivateRoutes>
            <PaywallPaywalls />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.SIGNUP}
        element={
          <AuthRoutes>
            <Signup />
          </AuthRoutes>
        }
      />
      <Route
        path={APP_ROUTES.FORGOT_PASSWORD}
        element={
          <AuthRoutes>
            <ForgotPassword />
          </AuthRoutes>
        }
      />
      <Route
        path={APP_ROUTES.LOGIN}
        element={
          <AuthRoutes>
            <Login />
          </AuthRoutes>
        }
      />
      <Route
        path={APP_ROUTES.STORES_INDEX}
        element={
          <PrivateRoutes>
            <StoreIndex />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.STORES_DASHBOARD}
        element={
          <PrivateRoutes>
            <StoreDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.STORES_SETTINGS}
        element={
          <PrivateRoutes>
            <StoreSettings />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.STORES_WEBHOOKS}
        element={
          <PrivateRoutes>
            <StoreWebhooks />
          </PrivateRoutes>
        }
      />
      {/* <Route
        path={APP_ROUTES.STORES_CHECKOUT_APPEARANCE}
        element={
          <PrivateRoutes>
            <StoreCheckoutAppearance />
          </PrivateRoutes>
        }
      /> */}
      <Route
        path={APP_ROUTES.NODELESS_ADDRESS_INDEX}
        element={
          <PrivateRoutes>
            <NodelessAddressIndex />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.NODELESS_ADDRESS_DASHBOARD}
        element={
          <PrivateRoutes>
            <NodelessAddressDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.NODELESS_ADDRESS_SETTINGS}
        element={
          <PrivateRoutes>
            <NodelessAddressSettings />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.NODELESS_ADDRESS_WEBHOOKS}
        element={
          <PrivateRoutes>
            <NodelessAddressWebhooks />
          </PrivateRoutes>
        }
      />
      <Route
        path={APP_ROUTES.NODELESS_ADDRESS_MESSAGES}
        element={
          <PrivateRoutes>
            <NodelessAddressMessages />
          </PrivateRoutes>
        }
      />

      <Route
        path={APP_ROUTES.CHECKOUT_INVOICE_DETAILS}
        element={<Checkout />}
      />
    </Routes>
  );
}

export default App;
