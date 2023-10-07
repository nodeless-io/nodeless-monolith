
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Nodeless: Accept Bitcoin Payments [Lightning API]</title>
    <!-- Bootstrap CSS -->
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/bootstrap-selector/css/bootstrap-select.min.css') }}">
    <!--icon font css-->
    <link rel="stylesheet" href="{{ asset('vendors/themify-icon/themify-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/flaticon/flaticon.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/animation/animate.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/owl-carousel/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/slick/slick.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/slick/slick-theme.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/magnify-pop/magnific-popup.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/nice-select/nice-select.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/scroll/jquery.mCustomScrollbar.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/elagent/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/responsive.css') }}">

    <meta property="og:title" content="Nodeless: Accept Bitcoin Payments [Lightning API]" />
    <meta property="og:image" content="{{ asset('img/nodeless-og.png') }}" />
    <meta property="og:url" content="https://nodeless.io" />
    <meta property="og:description" content="Accept Bitcoin and Lightning payments in your online store, charity or fundraiser, all without all the complexities of managing a lightning node. Get payments sent directly to your cold storage or lightning address." />
</head>

<body data-spy="scroll" data-target="header" data-offset="80">
    <div id="preloader">
      <div id="ctn-preloader" class="ctn-preloader">
        <div class="animation-preloader">
          <div class="spinner"></div>
          <div class="txt-loading">
            <span data-text-preloader="N" class="letters-loading"> N </span>
            <span data-text-preloader="O" class="letters-loading"> O </span>
            <span data-text-preloader="D" class="letters-loading"> D </span>
            <span data-text-preloader="E" class="letters-loading"> E </span>
            <span data-text-preloader="L" class="letters-loading"> L </span>
            <span data-text-preloader="E" class="letters-loading"> E </span>
            <span data-text-preloader="S" class="letters-loading"> S </span>
            <span data-text-preloader="S" class="letters-loading"> S </span>
          </div>
          <p class="text-center">Syncing Timechain</p>
        </div>
        <div class="loader">
          <div class="row">
            <div class="col-3 loader-section section-left">
              <div class="bg"></div>
            </div>
            <div class="col-3 loader-section section-left">
              <div class="bg"></div>
            </div>
            <div class="col-3 loader-section section-right">
              <div class="bg"></div>
            </div>
            <div class="col-3 loader-section section-right">
              <div class="bg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body_wrapper">
      <header class="header_area">
        <nav class="navbar navbar-expand-lg menu_one" id="landing_page">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"
              ><img
                src="{{ asset('img/nodelesslogo.svg') }}"
                srcset="{{ asset('img/nodelesslogo.svg') }}"
                height="25"
                alt="logo"
            /></a>
            <a class="btn_get btn_hover mobile_btn ms-auto" href="#get-app"
              >Get Started</a
            >
            <button
              class="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="menu_toggle">
                <span class="hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span class="hamburger-cross">
                  <span></span>
                  <span></span>
                </span>
              </span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="nav navbar-nav me-auto ms-auto menu">
                <li class="nav-item">
                  <a class="nav-link" href="#features">Features</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#integrations">Integrations</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#benefits">Benefits</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#pricing">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://support.nodeless.io" target="_blank">Help</a>
                  </li>
                <li class="nav-item">
                  <a class="nav-link" href="/api-docs" target="_blank">API Docs</a>
                </li>
              </ul>
              <div class="tracking_btn">
                <a class="navbtn" href="/app/signup"
                  >Sign Up</a
                >
              </div>
              <div class="tracking_btn">
                <a class="navbtn" href="/app/login"
                  >Login</a
                >
              </div>
            </div>
          </div>
        </nav>
      </header>
      <section
        class="banner_area d-flex flex-column align-items-center pb-2"
        id="apps_craft_animation"
      >
        <div class="container d-flex justify-content-center align-items-center pt-4 pb-5">
<img src="{{ asset('img/nodeless_icons_hero.svg') }}" height="400" alt="logo" />
        </div>
        <div class="container" id="hero-text">
          <div class="banner_text">
            <h2 class="wow  text-center" data-wow-delay="0.2s">
              A Unified <span style="color: #ff8000">Bitcoin</span> Platform
              for <br/><mark><span class="typed"></span></mark> and more.
            </h2>
            <p class="wow text-center">
              Accept Bitcoin and Lightning payments in your online store,
              charity or fundraiser, all without all the complexities of
              managing a lightning node. Get payments sent directly to your
              cold storage or lightning address.
            </p>
            <div class="d-flex justify-content-center">
              <a
                href="/app/signup"
                class="dmeo_banner_btn wow  scrolls"
                data-wow-delay="0.6s"
              >
                Sign Up for Free
              </a>
            </div>
          </div>
        </div>


        <!-- <div class="image_mockup"> -->
          <!-- <div class="one_img wow slideInnew" data-wow-delay="0.2s">
            <div class="layer layer2" data-depth="0.5">
              <img src="img/qr-code-scan.png" alt="" />
            </div>
          </div>
          <div class="one_img wow slideInnew" data-wow-delay="0.4s">
            <div class="layer layer2" data-depth="0.25">
              <img src="img/bitcoin-icon.png" alt="" height="200" />
            </div>
          </div> -->

          <!-- <div class="one_img" data-parallax='{"x": 0, "y": 100, "rotateZ":0}'>
            <img class="faa-spin animated" src="img/demo/circle-2.png" alt="" />
          </div> -->
          <!-- <div
            class="one_img"
            data-parallax='{"x": -180, "y": 80, "rotateY":2000}'
          >
            <img src="img/demo/shape_02.png" alt="" />
          </div> -->
          <!-- <div
            class="one_img"
            data-parallax='{"x": 250, "y": 160, "rotateZ":500}'
          >
            <img src="img/demo/shape_03.png" alt="" />
          </div> -->
          <!-- <div
            class="one_img"
            data-parallax='{"x": 20, "y": -100, "rotateZ":0}'
          >
            <img src="img/demo/shape_04.png" alt="" />
          </div> -->
          <!-- <div class="one_img"><img src="img/demo/shape_05.png" alt="" /></div> -->
          <!-- <div class="one_img" data-parallax='{"x": 0, "y": 100, "rotateZ":0}'>
            <img src="img/demo/shape_06.png" alt="" />
          </div> -->
          <!-- <div
            class="one_img"
            data-parallax='{"x": 250, "y": 360, "rotateZ":500}'
          >
            <img src="img/demo/shape_07.png" alt="" />
          </div> -->
          <!-- <div
            class="one_img"
            data-parallax='{"x": -180, "y": 80, "rotateY":2000}'
          >
            <img src="img/demo/shape_08.png" alt="" />
          </div> -->
          <!-- <div class="one_img" data-parallax='{"x": -10, "y": 80, "rotateY":0}'>
            <img src="img/lightning-cloud.png" alt="" height="300" />
          </div> -->
        <!-- </div> -->
        
      </section>

      <section class="demo_features_area sec_pad" id="features">
        <div class="container custom_container_two">
          <div
            class="section_title text-center wow "
            data-wow-delay="0.2s"
          >
            <h2>
              <span>We are obsessed with Bitcoin.</span><br />We make using
              Bitcoin easy.
            </h2>
          </div>
          <div class="row">
            <div
              class="col-lg-3 col-md-6"
            >
            <div class="features_item" data-wow-delay="0.2s">
                <img src="{{ asset('img/nodeless_icons_ecommerce.svg') }}" height="200" alt="" />
                <div class="content">
                  <h3>E-Commerce Payments</h3>
                  <p>
                    Accept Bitcoin on your store today in seconds. Integrates
                    directly with WooCommerce.
                  </p>
                </div>
              </div>
              
            </div>
            <div class="col-lg-4 offset-lg-1 col-md-6">
            <div class="features_item">
                <img src="{{ asset('img/nodeless_icons_ln-address.svg') }}" height="200" alt="" />
                <div class="content">
                  <h3>Nodeless Address</h3>
                  <p>
                    Lightning Address, NIP-05 Identifier and Paywalled Email in one address.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-lg-3 offset-lg-1 col-md-6"
            >
              <div class="features_item" data-wow-delay="0.4s">
                <img src="{{ asset('img/nodeless_icons_donations.svg') }}" height="200" alt="" />
                <div class="content">
                  <h3>Donation Pages</h3>
                  <p>
                    Collect bitcoin donations for your work in open source, a
                    charity or for your fans to leave you a tip. 
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-6"
            >
              <div class="features_item" data-wow-delay="0.6s">
                <img src="{{ asset('img/nodeless_icons_paywall.svg') }}" height="200" alt="" />
                <div class="content">
                  <h3>Paywall Content</h3>
                  <p>
                    Protect your articles, links, videos and other data with a
                    Bitcoin paywall. Integrated with WordPress.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 offset-lg-1 col-md-6">
              <div class="features_item" data-wow-delay="0.8s">
                <img src="{{ asset('img/nodeless_icons_withdrawals.svg') }}" height="200" alt="" />
                <div class="content">
                  <h3>Automated Withdrawals</h3>
                  <p>
                    Bitcoin is sent directly to your cold storage or lightning
                    address automatically when you receive payments.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-lg-3 offset-lg-1 col-md-6"
            >
              <div class="features_item" data-wow-delay="0.9s">
                <img src="{{ asset('img/nodeless_icons_api.svg') }}" height="200" alt="" />
                <div class="content">
                  <h3>Powerful API</h3>
                  <p>
                    Build Bitcoin and Lightning payments directly into your next
                    app with <a href="/api-docs">our API</a> without knowing anything about Bitcoin or Lightning!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="plugin_area" id="integrations">
        <div class="container">
          <h6>Included Integrations</h6>
          <div class="row justify-content-center">
            <div class="col-lg-3 col-md-4 col-sm-4 wow ">
              <div class="plugin_item">
                <div class="img">
                  <a href="https://wordpress.org/plugins/nodeless-for-woocommerce/" target="_blank"><img src="{{ asset('img/woo.png') }}" alt="" width="130" height="130"/></a>
                </div>
                <h4>WooCommerce</h4>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-4 wow ">
              <div class="plugin_item">
                <div class="img">
                  <a href="https://github.com/nodeless-io/nodeless-prestashop" target="_blank"><img src="{{ asset('img/presta.png') }}" alt="" width="130" height="130" /></a>
                </div>
                <h4>Prestashop</h4>
              </div>
            </div>
          </div>
          <h4 class="text-center plugin_sub_title">
            We support <span style="color: #ff8000">ALL</span> Bitcoin Wallets,
            including:
          </h4>
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-4 wow ">
              <div class="plugin_item">
                <img src="{{ asset('img/wallets/cashapp.webp') }}" alt="" height="50" />
                <h4>CashApp</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-4 col-sm-4 wow "
              data-wow-delay="0.8s"
            >
              <div class="plugin_item">
                <img src="{{ asset('img/wallets/zeus.png') }}" alt="" height="50" />
                <h4>Zeus</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-4 col-sm-4 wow "
              data-wow-delay="0.2s"
            >
              <div class="plugin_item">
                <img src="{{ asset('img/wallets/walletofsatoshi.png') }}" alt="" height="50" />
                <h4>Wallet of Satoshi</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-4 col-sm-4 wow "
              data-wow-delay="0.4s"
            >
              <div class="plugin_item">
                <img src="{{ asset('img/alby.webp') }}" alt="" height="50" />
                <h4>Alby</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-4 col-sm-4 wow "
              data-wow-delay="0.6s"
            >
              <div class="plugin_item">
                <img src="{{ asset('img/wallets/strike.webp') }}" alt="" height="50" />
                <h4>Strike</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-4 col-sm-4 wow "
              data-wow-delay="0.4s"
            >
              <div class="plugin_item">
                <img src="{{ asset('img/wallets/bluewallet.png') }}" alt="" height="50" />
                <h4>Blue Wallet</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-4 col-sm-4 wow "
              data-wow-delay="0.6s"
            >
              <div class="plugin_item">
                <img src="{{ asset('img/wallets/phoenix.png') }}" alt="" height="50" />
                <h4>Phoenix</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-4 col-sm-4 wow "
              data-wow-delay="0.8s"
            >
              <div class="plugin_item">
                <img src="{{ asset('img/wallets/breez.png') }}" alt="" height="50" />
                <h4>Breez</h4>
                <p>Lightning Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="shop_area" id="benefits">
        <div class="container">
          <div class="row justify-content-center">
            <!-- <div class="col-lg-6">
              <div class="shop_slider">
                <div class="item">
                  <img src="img/demo/shop/01.png" alt="" />
                </div>
                <div class="item">
                  <img src="img/demo/shop/02.png" alt="" />
                </div>
                <div class="item">
                  <img src="img/demo/shop/03.png" alt="" />
                </div>
                <div class="item">
                  <img src="img/demo/shop/04.png" alt="" />
                </div>
              </div>
            </div> -->
            <div class="col-lg-6">
              <div class="d-flex flex-column align-items-center">
                <div class="section-image">
                  <img src="{{ asset('img/nodeless_icons_new-audience.svg') }}" height="400" />
                </div>
                <h3 class="wow ">E-Commerce Integrated</h3>
                <h2 class="wow  text-center" data-wow-delay="0.1s">
                  Reach a Loyal New Audience
                </h2>
                <p class="wow  text-center" data-wow-delay="0.2s">
                  Bitcoiners go out of their way to support businesses who
                  accept Bitcoin! Nodeless.io integrates seamlessly with
                  WooCommerce.
                </p>
                <ul>
                  <li class="wow " data-wow-delay="0.3s">
                    No Chargebacks, Refunds or Fraud
                  </li>
                  <li class="wow " data-wow-delay="0.4s">
                    Integrates directly with WooCommerce
                  </li>
                  <li class="wow " data-wow-delay="0.5s">
                    Accessible through our App or API
                  </li>
                </ul>
                <!--                            <a href="https://themeforest.net/item/saasland-creative-wordpress-theme-for-saas-business/23362980" class="dmeo_banner_btn wow " data-wow-delay="0.5s">By Saasland</a>-->
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="blog_area">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="d-flex flex-column align-items-center">
                <div class="section-image">
                  <img src="{{ asset('img/nodeless_icons_privacy.svg') }}" height="400" />
                </div>
                <h3>Privacy Focused</h3>
                <h2 class="text-center">We don't collect personal information.</h2>
                <p class="text-center">
                  We only require an email to sign up and will never ask you any
                  personal information.
                </p>
                <!-- <div class="arrow">
                  <i class="ti-arrow-left prev"></i>
                  <i class="ti-arrow-right next"></i>
                </div> -->
              </div>
            </div>
            <!-- <div class="col-lg-7">
              <div class="blog_slider">
                <div class="item">
                  <div class="blog_item">
                    <div class="round">
                      <div class="text">
                        04<sup>+</sup> <br /><span>Layout</span>
                      </div>
                    </div>
                    <div class="img">
                      <img src="img/demo/blog/blog_01.png" alt="" />
                    </div>
                    <div class="img_two">
                      <img src="img/demo/blog/blog_02.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="blog_item">
                    <div class="round">
                      <div class="text">
                        04<sup>+</sup> <br /><span>Layout</span>
                      </div>
                    </div>
                    <div class="img">
                      <img src="img/demo/blog/blog_03.png" alt="" />
                    </div>
                    <div class="img_two">
                      <img src="img/demo/blog/blog_04.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </section>
      <!-- <section class="responsive_area">
        <div class="container custom_container">
          <div class="row">
            <div class="col-lg-8">
              <div class="responsive_device">
                <img
                  class="wow "
                  data-wow-delay="0.2s"
                  src="img/demo/iPhone-8.png"
                  alt=""
                />
                <img
                  class="wow "
                  data-wow-delay="0.4s"
                  src="img/demo/iPhone-8-Plus.png"
                  alt=""
                />
                <img
                  class="wow "
                  data-wow-delay="0.6s"
                  src="img/demo/iPad.png"
                  alt=""
                />
                <img
                  class="wow "
                  data-wow-delay="0.8s"
                  src="img/demo/iPhone-X.png"
                  alt=""
                />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="responsive_content">
                <div class="u_content">
                  <h3>Responsive and Retina Ready</h3>
                  <h2>
                    Consistent and comfortable throughout all major devices.
                  </h2>
                  <div class="row">
                    <div
                      class="col-lg-6 col-md-6 wow fadeInLeft"
                      data-wow-delay="0.2s"
                    >
                      <div class="item">
                        <img src="img/demo/design.png" alt="" />
                        <h5>Responsive layout</h5>
                        <p>
                          SaasLand is built for and tested in major mobile
                          devices and all its demos adapt well in these devices.
                        </p>
                      </div>
                    </div>
                    <div
                      class="col-lg-6 col-md-6 wow fadeInLeft"
                      data-wow-delay="0.4s"
                    >
                      <div class="item">
                        <img src="img/demo/finger.png" alt="" />
                        <h5>Retina ready</h5>
                        <p>
                          Assets in SaasLand are very well optimized for retina
                          displays. All images, graphics look sharp, crisp in
                          those displays.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <!-- typography part code here-->
      <section class="typography_part" id="pricing">
        <div class="container custom_container">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-lg-4 col-md-6">
              <div class="typgraphy_content d-flex flex-column align-center">
                <h5 class="wow  text-center" data-wow-delay="200ms">
                  Simple Pricing Structure
                </h5>
                <h2 class="wow  text-center" data-wow-delay="300ms">
                  <br /><span class="mark_text">100 sats + 1% / transaction</span>
                </h2>
                <p class="wow  text-center" data-wow-delay="400ms">
                  Our pricing structure is simple and predictable. We take care
                  of all the lightning routing fees, on-chain fees, hosting fees
                  to make it as simple as possible for you to run your business
                  or fundraiser.
                </p>
                <a href="/app/signup" class="btn_1 wow  text-center" data-wow-delay="600ms"
                  >Sign up for Free</a
                >
              </div>
            </div>
            <!-- <div class="col-lg-8 col-md-6 wow " data-wow-delay="600ms">
              <div class="typgraphy_img">
                <img
                  src="img/demo/typography_img.png"
                  alt="#"
                  class="img-fluid"
                />
              </div>
            </div> -->
          </div>
        </div>
      </section>
      <!-- typography part code end-->

      <footer class="footer_part">
        <div class="container">
          <a href="/app/signup" class="f_logo"
            ><img
              src="{{ asset('img/demo/f_logo.png') }}"
              srcset="img/demo/f_logo-2.png 2x"
              alt=""
          /></a>
          <h2 class="wow " data-wow-delay="0.2s">
            Grow Your Business<br />
            with Nodeless.io
          </h2>
          <a
            href="/app/signup"
            ><i class="icon_cart_alt"></i>Sign Up for Free
          </a>
        </div>

        {{-- <div class="one_img wow slideInnew footer_shap_1" data-wow-delay="1s">
          <div class="layer layer2" data-depth="0.30">
            <img src="{{ asset('img/demo/shape/footer_shap_1.png') }}" alt="" />
          </div>
        </div>
        <div class="one_img wow slideInnew footer_shap_2" data-wow-delay="0.9s">
          <div class="layer layer2" data-depth="0.10">
            <img src="{{ asset('img/demo/shape/footer_shap_2.png') }}" alt="" />
          </div>
        </div>
        <img
          src="{{ asset('img/demo/shape/footer_shap_3.png') }}"
          alt="#"
          class="footer_shap_3"
        />
        <div class="circle_shape_1"></div> --}}
        
        
      </footer>
      <div class="d-flex flex-wrap justify-content-center align-items-center">
        <div class="m-2 text-center">
          <a href="/app/privacy-policy" class="text-black font-weight-bold">Privacy Policy</a>
        </div>
        <div class="m-2 text-center">
          <a href="/app/terms-and-conditions" class="text-black font-weight-bold">Terms & Conditions</a>
        </div>
        <div class="m-2 text-center">
          <a href="/app/vulnerability-policy" class="text-black font-weight-bold">Vulnerability Policy</a>
        </div>
        <div class="m-2 text-center">
            <a href="https://support.nodeless.io" class="text-black font-weight-bold">Support</a>
          </div>
          <div class="m-2 text-center">
            <a href="https://github.com/utxo-one" class="text-orange font-weight-bold">Made with Love by utxo.one</a>
          </div>
      </div>
      
      

    </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="{{asset('js/jquery-3.6.0.min.js') }}"></script>
    <script src="{{asset('js/popper.min.js') }}"></script>
    <script src="{{asset('js/bootstrap.min.js') }}"></script>
    <script src="{{asset('vendors/wow/wow.min.js') }}"></script>
    <script src="{{asset('vendors/sckroller/jquery.parallax-scroll.js') }}"></script>
    <script src="{{asset('js/parallax.js') }}"></script>
    <script src="{{asset('js/typed.min.js') }}"></script>
    <script src="{{asset('vendors/owl-carousel/owl.carousel.min.js') }}"></script>
    <script src="{{asset('vendors/slick/slick.min.js') }}"></script>
    <script src="{{asset('vendors/imagesloaded/imagesloaded.pkgd.min.js') }}"></script>
    <script src="{{asset('vendors/isotope/isotope-min.js') }}"></script>
    <script src="{{asset('vendors/magnify-pop/jquery.magnific-popup.min.js') }}"></script>
    <script src="{{asset('vendors/bootstrap-selector/js/bootstrap-select.min.js') }}"></script>
    <script src="{{asset('vendors/nice-select/jquery.nice-select.min.js') }}"></script>
    <script src="{{asset('vendors/scroll/jquery.mCustomScrollbar.concat.min.js') }}"></script>
    <script src="{{asset('js/plugins.js') }}"></script>
    <script src="{{asset('js/jquery.easing.1.3.js') }}"></script>
    <script src="{{asset('js/main.js') }}"></script>
</body>

</html>