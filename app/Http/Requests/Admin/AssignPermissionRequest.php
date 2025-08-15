<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\BaseRequest;

class AssignPermissionRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        
        // Always authorize super admin
        if ($user && $user->isSuperAdmin()) {
            return true;
        }
        
        return $user && $user->canDo('permission-assignment-manage');
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'role_id' => [
                'required',
                'exists:roles,id'
            ]
        ];
    }
}
