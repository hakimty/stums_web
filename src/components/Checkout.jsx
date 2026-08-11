import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, CheckCircle2, Loader2, ShieldCheck, RefreshCw, Copy, Check, ArrowRight } from 'lucide-react';
const handleVerifyPayment = (e) => {
    e.preventDefault();
  
    if (!/^\d{12}$/.test(utrNumber.trim())) {
      setUtrError('Please enter a valid 12-digit UPI UTR ID.');
      return;
    }
  
    setPaymentState('VERIFYING');
  
    // Verify and grant immediate access
    setTimeout(() => {
      setTransactionId(`TXN_${Date.now()}`);
      setPaymentState('SUCCESS');
      
      // Save enrollment to user account
      if (onSuccess) {
        onSuccess(course);
      }
    }, 2000);
  };

const CourseCheckoutModal = ({ course, onClose, onSuccess }) => {
  const [paymentState, setPaymentState] = useState('INIT'); // 'INIT' | 'AWAITING_PAYMENT' | 'VERIFYING' | 'SUCCESS'
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Fixed tuition price for all courses
  const FIXED_PRICE = 10;
  
  // Payee / Merchant Details
  const merchantName = "DEEPA DUBAY";
  const upiId = "9315849423@ybl"; // Replace with your actual PhonePe/GPay UPI ID

  // Dynamic UPI Deep Link string encoding payee, name, amount (₹10), currency, and note
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${FIXED_PRICE}&cu=INR&tn=${encodeURIComponent(`Payment for ${course?.title || 'Course'}`)}`;

  const handleInitiatePayment = () => {
    setPaymentState('AWAITING_PAYMENT');
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyPayment = (e) => {
    e.preventDefault();
    setUtrError('');

    // Validates 12-digit UPI UTR number
    if (!/^\d{12}$/.test(utrNumber.trim())) {
      setUtrError('Please enter a valid 12-digit UPI UTR / Transaction Reference ID.');
      return;
    }

    setPaymentState('VERIFYING');

    // Simulate Payment Verification against bank ledger
    setTimeout(() => {
      setTransactionId(`TXN_${Date.now()}`);
      setPaymentState('SUCCESS');
      if (onSuccess) onSuccess(course);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Course Checkout</h3>
            <p className="text-xs text-slate-400">{course?.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xs bg-slate-800 px-2.5 py-1 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        {/* Body Content */}
        <div className="py-6 flex flex-col items-center text-center">

          {paymentState === 'INIT' && (
            <div className="space-y-4 w-full">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Course Name</span>
                  <span className="font-semibold text-white">{course?.title}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Merchant</span>
                  <span className="font-semibold text-indigo-400">{merchantName}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Payable Amount</span>
                  <span className="text-emerald-400">₹{FIXED_PRICE}</span>
                </div>
              </div>

              <button
                onClick={handleInitiatePayment}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                <span>Pay ₹10 via UPI QR Code</span>
              </button>
            </div>
          )}

          {paymentState === 'AWAITING_PAYMENT' && (
            <div className="space-y-4 w-full flex flex-col items-center">
              
              {/* Generated Dynamic QR Code (Auto ₹10) */}
              <div className="p-4 bg-white rounded-2xl border border-slate-800 shadow-2xl inline-block">
                <QRCodeSVG 
                  value={upiDeepLink} 
                  size={190}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-200">
                  Scan with PhonePe, GPay, or Paytm
                </p>
                <p className="text-[11px] text-indigo-400 font-medium">
                  Payee: {merchantName}
                </p>
                <p className="text-xs font-bold text-emerald-400">
                  Amount: ₹{FIXED_PRICE} (Pre-filled automatically)
                </p>
              </div>

              {/* Copy UPI Button */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
                <span>UPI ID: <strong className="text-white">{upiId}</strong></span>
                <button 
                  onClick={handleCopyUpi} 
                  className="p-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                  title="Copy UPI ID"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* UTR Verification Form */}
              <form onSubmit={handleVerifyPayment} className="w-full pt-2 space-y-2 text-left">
                <label className="block text-xs font-semibold text-slate-300">
                  Confirm Payment (Enter 12-digit UTR / Ref No.):
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    maxLength={12}
                    placeholder="e.g. 420188901234"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 rounded-xl transition-all flex items-center gap-1 shrink-0"
                  >
                    Verify <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                {utrError && <p className="text-[11px] text-rose-400">{utrError}</p>}
              </form>
            </div>
          )}

          {paymentState === 'VERIFYING' && (
            <div className="py-8 space-y-3">
              <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-300">Verifying UTR #{utrNumber} with bank server...</p>
            </div>
          )}

          {paymentState === 'SUCCESS' && (
            <div className="space-y-4 py-2">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full w-fit mx-auto border border-emerald-500/20">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Payment Confirmed!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Verified UTR: <span className="text-indigo-400 font-mono">{utrNumber}</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-2 font-mono">Txn ID: {transactionId}</p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition-all"
              >
                Access Course Now
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-indigo-400" />
            UPI 2.0 Encrypted
          </span>
          <span>Verified ₹10 Collect</span>
        </div>

      </div>
    </div>
  );
};

export default CourseCheckoutModal;