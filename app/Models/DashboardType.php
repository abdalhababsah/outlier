<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DashboardType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
    ];

    /**
     * Get the roles associated with this dashboard type.
     */
    public function roles(): HasMany
    {
        return $this->hasMany(Role::class);
    }

    /**
     * Get the permissions associated with this dashboard type.
     */
    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class);
    }

    /**
     * Get dashboard type by name
     */
    public static function getByName(string $name): ?self
    {
        return static::where('name', $name)->first();
    }

    /**
     * Get administration dashboard type
     */
    public static function administration(): ?self
    {
        return static::getByName('administration');
    }

    /**
     * Get staff dashboard type
     */
    public static function staff(): ?self
    {
        return static::getByName('staff');
    }

    /**
     * Get project dashboard type
     */
    public static function project(): ?self
    {
        return static::getByName('project');
    }
}
