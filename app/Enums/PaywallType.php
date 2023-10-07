<?php

namespace App\Enums;

enum PaywallType: string
{
    case DOWNLOAD = 'download';
    case REDIRECT = 'redirect';
    case CONTENT = 'content';
    case WP_ARTICLE = 'wp_article';
}
