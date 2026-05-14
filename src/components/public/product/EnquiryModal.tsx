'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Heading, BodyText } from '@/components/ui/Typography';
import { submitEnquiry } from '@/actions/enquiry';
import { modalBackdrop, modalContentDesktop, modalContentMobile } from '@/lib/animations';

export function EnquiryModal({ isOpen, onClose, product }: { isOpen: boolean; onClose: () => void; product: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      productId: product.id,
      productName: product.name,
    };

    const result = await submitEnquiry(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
    }
  };

  const contentVariants = isMobile ? modalContentMobile : modalContentDesktop;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            variants={modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />
          {/* Content */}
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full max-w-lg bg-cream p-8 md:p-12 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-black hover:opacity-70">
              <X className="w-6 h-6" strokeWidth={1} />
            </button>

            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <Heading>Thank You</Heading>
                <BodyText className="text-muted">
                  Your enquiry about the {product.name} has been received. Our team will contact you shortly.
                </BodyText>
                <div className="pt-8">
                  <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <Heading>Enquire</Heading>
                  <BodyText className="text-muted">
                    Request information about the {product.name}.
                  </BodyText>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input label="Name" name="name" required />
                  <Input label="Email" name="email" type="email" required />
                  <Input label="Phone Number" name="phone" type="tel" />
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs uppercase tracking-widest text-black/60">Message</label>
                    <textarea 
                      name="message" 
                      required
                      defaultValue={`I am interested in the ${product.name}.`}
                      className="w-full min-h-[120px] p-3 font-sans text-sm border border-border bg-transparent focus:outline-none focus:border-black transition-colors rounded-none resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
