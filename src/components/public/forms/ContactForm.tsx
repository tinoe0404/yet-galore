'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { submitEnquiry } from '@/actions/enquiry';
import { Heading, BodyText } from '@/components/ui/Typography';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  type: z.enum(['GENERAL', 'PRODUCT', 'WHOLESALE']),
  message: z.string().min(10, "Message must be at least 10 characters"),
  botField: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: 'GENERAL',
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError('');
    const result = await submitEnquiry(data);
    
    if (result.success) {
      setIsSuccess(true);
      reset();
    } else {
      setServerError(result.error || 'Failed to submit form.');
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-beige p-8 md:p-12 border border-border text-center space-y-4">
        <Heading>Message Sent</Heading>
        <BodyText className="text-muted">
          Thank you for reaching out. A member of our team will be in touch within 24 hours.
        </BodyText>
        <div className="pt-6">
          <Button variant="outline" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <input type="text" {...register('botField')} className="hidden" tabIndex={-1} autoComplete="off" />

      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 font-sans text-sm">
          {serverError}
        </div>
      )}

      <Input 
        label="Name" 
        {...register('name')} 
        error={errors.name?.message} 
      />
      
      <Input 
        label="Email" 
        type="email" 
        {...register('email')} 
        error={errors.email?.message} 
      />

      <div className="flex flex-col gap-2">
        <label className="font-sans text-xs uppercase tracking-widest text-black/60">Subject</label>
        <select 
          {...register('type')}
          className="w-full px-4 py-3 font-sans text-sm border border-border bg-transparent focus:outline-none focus:border-black transition-colors rounded-none appearance-none cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
        >
          <option value="GENERAL">General Enquiry</option>
          <option value="PRODUCT">Product Enquiry</option>
          <option value="WHOLESALE">Wholesale</option>
        </select>
        {errors.type && <span className="text-red-500 font-sans text-xs">{errors.type.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-sans text-xs uppercase tracking-widest text-black/60">Message</label>
        <textarea 
          {...register('message')}
          className="w-full min-h-[150px] p-4 font-sans text-sm border border-border bg-transparent focus:outline-none focus:border-black transition-colors rounded-none resize-none"
        />
        {errors.message && <span className="text-red-500 font-sans text-xs">{errors.message.message}</span>}
      </div>

      <Button type="submit" variant="primary" className="w-full py-4" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit Message'}
      </Button>
    </form>
  );
}
