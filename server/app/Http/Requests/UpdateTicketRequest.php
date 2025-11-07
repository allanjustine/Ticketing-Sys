<?php

namespace App\Http\Requests;

use App\Models\TicketCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ticket_transaction_date'                  => ['required', 'date', 'before_or_equal:today'],
            'ticket_category'                          => ['required', Rule::exists('ticket_categories', 'ticket_category_id')],
            'ticket_type'                              => ['nullable'],
            'purpose'                                  => ['required_if:ticket_type,sql_ticket', 'max:255', 'min:2'],
            'from'                                     => ['required_if:ticket_type,sql_ticket', 'max:255', 'min:2'],
            'to'                                       => ['required_if:ticket_type,sql_ticket', 'max:255', 'min:2'],
            'ticket_reference_number'                  => ['required_if:ticket_type,sql_ticket', 'max:255', 'min:2']
        ];
    }

    public function messages(): array
    {
        return [
            'purpose.required_if'                      => 'Purpose is required.',
            'purpose.max'                              => 'Purpose must be less than 255 characters.',
            'purpose.min'                              => 'Purpose must be at least 2 characters.',
            'from.required_if'                         => 'From is required.',
            'from.max'                                 => 'From must be less than 255 characters.',
            'from.min'                                 => 'From must be at least 2 characters.',
            'to.required_if'                           => 'To is required.',
            'to.max'                                   => 'To must be less than 255 characters.',
            'to.min'                                   => 'To must be at least 2 characters.',
            'ticket_reference_number.required_if'      => 'Ticket reference number is required.',
            'ticket_reference_number.max'              => 'Ticket reference number must be less than 255 characters.',
            'ticket_reference_number.min'              => 'Ticket reference number must be at least 2 characters.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $ticketCategory = TicketCategory::with('subCategories')->where('ticket_category_id', $this->ticket_category)->first();

            if ($ticketCategory && $ticketCategory->subCategories()->count() > 0) {
                if (!$this->ticket_sub_category) {
                    $validator->errors()->add('ticket_sub_category', 'The ticket sub category is required.');
                }
            }
        });
    }
}
