<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\BaseRequest;

class StoreRoleRequest extends BaseRequest
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
        
        return $user && $user->canDo('roles-create');
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:roles,name',
                'regex:/^[a-z_]+$/'
            ],
            'display_name' => [
                'required',
                'string',
                'max:255'
            ],
            'description' => [
                'nullable',
                'string',
                'max:500'
            ],
            'dashboard_type_id' => [
                'required',
                'exists:dashboard_types,id'
            ],
            'permissions' => [
                'array'
            ],
            'permissions.*' => [
                'exists:permissions,id'
            ]
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return array_merge(parent::messages(), [
            'name.regex' => 'The role name may only contain lowercase letters and underscores.',
            'dashboard_type_id.exists' => 'The selected dashboard type is invalid.',
        ]);
    }
}
