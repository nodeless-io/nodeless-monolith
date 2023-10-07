<?php

namespace App\Enums;

trait EnumHelper
{
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function array(): array
    {
        return array_combine(self::names(), self::values());
    }

    public static function fromValue(string $value): self
    {
        foreach (self::cases() as $case) {
            if ($value === $case->value) {
                return $case;
            }
        }
        throw new \ValueError("$value is not a valid backing value for enum " . self::class);
    }

    public static function getClassFromValue(string $value): string
    {
        $enumValues = self::values();

        if (!in_array($value, $enumValues)) {
            throw new \InvalidArgumentException("Invalid value for BitcoinableWebhookType: '$value'");
        }

        return 'App\\Models\\' . str()->studly($value);
    }

    public static function getValueFromClass(string $class): string
    {
        $enumValues = self::values();

        // strip the app\Models\ prefix
        $class = str_replace('App\\Models\\', '', $class);
        $class = str()->snake($class);

        if (!in_array($class, $enumValues)) {
            throw new \InvalidArgumentException("Invalid value for BitcoinableWebhookType: '$class'");
        }

        return $class;
    }
}
