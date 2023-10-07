<?php

namespace App\Enums;

enum ContestType: string
{
    case NOSTR = 'nostr';
    case TWITTER = 'twitter';
    case TIKTOK = 'tiktok';
    case INSTAGRAM = 'instagram';
    case YOUTUBE = 'youtube';
    case TWITCH = 'twitch';
    case DISCORD = 'discord';
    case FACEBOOK = 'facebook';
    case REDDIT = 'reddit';
    case EMAIL = 'email';
    case GITHUB = 'github';
    case LINKEDIN = 'linkedin';
}
