"use client";

import { useCallback, useEffect, useState } from "react";

import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Building2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

type PaymentMethod = "card" | "transfer" | "none";
type FlowStep = "selection" | "input" | "processing" | "success" | "error";

interface PaymentProps {
  taskId: string;
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export default function Payment({
  amount,
  isOpen = false,
  onClose,
  taskId,
  userEmail = "client@example.com",
}: PaymentProps) {
  const [step, setStep] = useState<FlowStep>("selection");
  const [method, setMethod] = useState<PaymentMethod>("none");
  const [isCopied, setIsCopied] = useState(false);

  const handleClose = useCallback(() => {
    setStep("selection");
    setMethod("none");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, handleClose]);

  const simulatePayment = () => {
    setStep("processing");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      setStep(isSuccess ? "success" : "error");
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 font-sans text-[#1a365d]">
      <div
        className="absolute inset-0 bg-[#1a365d]/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-100 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#f7fafc] p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {step === "input" && (
              <button
                onClick={() => setStep("selection")}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#718096]" />
              </button>
            )}
            <div>
              <p className="text-[10px] font-bold text-[#2b6cb0] uppercase tracking-[0.15em] leading-tight">
                Secured by TaskPay
              </p>
              <p className="text-[13px] text-[#718096] font-medium leading-none mt-1">
                {userEmail}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#718096] uppercase font-bold tracking-wider">
              Amount
            </p>
            <p className="text-base font-extrabold text-[#1a365d]">
              ${amount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 min-h-85 flex flex-col justify-center">
          {step === "selection" && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#1a365d] text-center tracking-tight">
                Choose a payment method
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setMethod("card");
                    setStep("input");
                  }}
                  className="w-full p-4 border border-gray-100 rounded-xl flex items-center justify-between hover:border-[#4fd1c5] hover:bg-[#f7fafc] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2b6cb0]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[#1a365d]">
                        Pay with Card
                      </p>
                      <p className="text-xs text-[#718096] font-medium">
                        Visa, Mastercard, Verve
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#4fd1c5] transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    setMethod("transfer");
                    setStep("input");
                  }}
                  className="w-full p-4 border border-gray-100 rounded-xl flex items-center justify-between hover:border-[#4fd1c5] hover:bg-[#f7fafc] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-[#4fd1c5]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[#1a365d]">
                        Bank Transfer
                      </p>
                      <p className="text-xs text-[#718096] font-medium">
                        Direct bank payment
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#4fd1c5] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {step === "input" && method === "card" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] font-bold text-[#718096] uppercase tracking-widest ml-1 mb-1 block">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full p-3.5 border border-gray-200 rounded-lg text-lg font-medium tracking-widest focus:ring-2 focus:ring-[#4fd1c5] outline-none placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#718096] uppercase tracking-widest ml-1 mb-1 block">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full p-3.5 border border-gray-200 rounded-lg outline-none font-medium focus:ring-2 focus:ring-[#4fd1c5]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#718096] uppercase tracking-widest ml-1 mb-1 block">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3.5 border border-gray-200 rounded-lg outline-none font-medium focus:ring-2 focus:ring-[#4fd1c5]"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={simulatePayment}
                className="w-full bg-[#2b6cb0] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-[#1a365d] transition-all active:scale-[0.98] shadow-md shadow-blue-100"
              >
                Authorize Payment
              </button>
            </div>
          )}

          {step === "input" && method === "transfer" && (
            <div className="space-y-6 text-center animate-in fade-in">
              <p className="text-sm font-medium text-[#718096]">
                Transfer exactly{" "}
                <span className="font-bold text-[#1a365d]">${amount}</span> to:
              </p>

              <div className="bg-[#f7fafc] p-6 rounded-2xl border border-dashed border-[#4fd1c5]">
                <p className="text-[10px] text-[#718096] uppercase font-bold tracking-[0.2em] mb-1">
                  Kuda Bank
                </p>
                <h2 className="text-3xl font-mono font-bold text-[#1a365d] tracking-tight">
                  0992384102
                </h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("0992384102");
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  className="mt-3 text-[11px] font-bold text-[#2b6cb0] hover:text-[#4fd1c5] uppercase tracking-widest transition-colors"
                >
                  {isCopied ? "Account Copied!" : "Copy Account Number"}
                </button>
              </div>

              <button
                onClick={simulatePayment}
                className="w-full bg-[#4fd1c5] text-[#1a365d] font-bold py-4 rounded-xl text-sm uppercase tracking-widest hover:opacity-90 transition-all"
              >
                I&apos;ve Sent the Money
              </button>
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center text-center space-y-4">
              <Loader2 className="w-10 h-10 text-[#2b6cb0] animate-spin stroke-[3px]" />
              <p className="text-sm font-bold text-[#1a365d] tracking-tight">
                Verifying your transaction...
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center text-center space-y-4 animate-in zoom-in">
              <CheckCircle2 className="w-16 h-16 text-[#4fd1c5] stroke-[1.5px]" />
              <div>
                <h3 className="text-xl font-extrabold text-[#1a365d] tracking-tight">
                  Payment Successful
                </h3>
                <p className="text-sm font-medium text-[#718096] mt-1">
                  Redirecting to your dashboard...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 flex justify-center items-center gap-2 border-t border-gray-100">
          <Lock className="w-3 h-3 text-[#718096]" />
          <span className="text-[9px] font-bold text-[#718096] uppercase tracking-[0.25em]">
            Secure SSL Encryption
          </span>
        </div>
      </div>
    </div>
  );
}
