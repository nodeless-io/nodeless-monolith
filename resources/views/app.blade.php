<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:100,400,500,600,700" rel="stylesheet" />

    <title>Nodeless</title>

    @viteReactRefresh
    @vite(['resources/react/main.tsx', 'resources/react/css/style.css'])
</head>

<body class="font-inter antialiased bg-slate-100 text-slate-600">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script>
        if (localStorage.getItem('sidebar-expanded') == 'true') {
            document.querySelector('body').classList.add('sidebar-expanded');
        } else {
            document.querySelector('body').classList.remove('sidebar-expanded');
        }
    </script>
    <div id="root"></div>
  </body>

</html>
