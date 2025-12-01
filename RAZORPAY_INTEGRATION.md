# Razorpay Integration Guide

## Overview
The checkout page is fully integrated with Razorpay for payment processing. The system supports both demo mode and live Razorpay integration.

## Environment Configuration

### Required Environment Variables

Add these to your `.env.local` file:

```env
# Razorpay Test Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_test_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

### Getting Razorpay Test Keys

1. **Create Razorpay Account**: Go to [https://razorpay.com](https://razorpay.com) and sign up
2. **Access Dashboard**: Login to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
3. **Get Test Keys**: Navigate to **Settings** → **API Keys**
4. **Download Keys**: Copy your **Key ID** and **Key Secret** (Test Mode)

## Integration Features

### ✅ **Implemented Features**

1. **Order Creation API** (`/api/create-order`)
   - Creates Razorpay orders server-side
   - Handles both demo and live modes
   - Proper error handling and logging

2. **Payment Processing**
   - Razorpay checkout UI integration
   - Automatic script loading
   - Payment success/failure handling

3. **Demo Mode**
   - Automatically activates when no valid keys are provided
   - Simulates payment flow for testing
   - Safe for development without real credentials

4. **Order Persistence** (`/api/save-order`)
   - Saves completed orders to database
   - Includes payment verification

### 🔧 **Configuration Modes**

#### Demo Mode (Default)
- Activates when `RAZORPAY_KEY_ID` is missing or contains placeholder
- Shows demo payment success after 2 seconds
- No real payments processed
- Perfect for development and testing

#### Live Mode
- Activates when valid Razorpay credentials are provided
- Processes real test payments (in test mode)
- Full Razorpay checkout experience

## Testing the Integration

### Option 1: Test Pages
Visit these pages to test the integration:

1. **`/razorpay-integration-test`** - Comprehensive integration test
2. **`/razorpay-test`** - Basic API test
3. **`/checkout?service=business-intelligence`** - Full checkout flow

### Option 2: Manual Testing

1. **Test Order Creation**:
   ```bash
   curl -X POST http://localhost:3001/api/create-order \
     -H "Content-Type: application/json" \
     -d '{"amount": 100, "currency": "INR"}'
   ```

2. **Test Full Checkout**:
   - Visit `/checkout?service=business-intelligence`
   - Add some add-ons
   - Click "Pay Now"

## Test Card Numbers

When using Razorpay test mode, use these test card numbers:

### Successful Payments
- **Visa**: `4111 1111 1111 1111`
- **Mastercard**: `5555 5555 5555 4444`
- **Rupay**: `6076 2001 0000 0007`

### Failed Payments
- **Insufficient Funds**: `4000 0000 0000 0002`
- **Card Declined**: `4000 0000 0000 0069`

### Test Details
- **CVV**: Any 3 digits (e.g., `123`)
- **Expiry**: Any future date (e.g., `12/25`)
- **Name**: Any name
- **OTP**: `123456` (for test cards)

## Payment Flow

1. **User clicks "Pay Now"** → Triggers `handlePayment()` in checkout
2. **Order Creation** → POST to `/api/create-order` with amount
3. **Razorpay Script Load** → Dynamically loads Razorpay checkout
4. **Payment Processing** → Opens Razorpay modal for payment
5. **Success Handler** → Saves order via `/api/save-order`
6. **Redirect** → User redirected to success page

## Security Notes

### ⚠️ **Important Security Practices**

1. **Never expose secrets**: Keep `RAZORPAY_KEY_SECRET` on server-side only
2. **Use environment variables**: Store credentials in `.env.local`
3. **Test vs Live keys**: Always use test keys in development
4. **Verify payments**: Always verify payment signatures on server-side
5. **HTTPS required**: Use HTTPS in production for security

### 🔒 **Production Checklist**

- [ ] Replace test keys with live keys
- [ ] Enable webhook signature verification
- [ ] Set up proper error logging
- [ ] Configure payment failure notifications
- [ ] Test with real bank accounts (small amounts)

## Troubleshooting

### Common Issues

1. **"Failed to create order"**
   - Check if environment variables are set correctly
   - Verify Razorpay API credentials are active
   - Check server logs for detailed error messages

2. **"Payment cancelled"**
   - User closed the payment modal
   - Check if test card details are correct
   - Verify Razorpay account is active

3. **Demo mode activation**
   - Check if `RAZORPAY_KEY_ID` is set correctly
   - Ensure no placeholder values in environment variables
   - Restart development server after changing env vars

### Support

- **Razorpay Docs**: [https://razorpay.com/docs](https://razorpay.com/docs)
- **Test Integration**: Visit `/razorpay-integration-test` page
- **API Status**: Check `/razorpay-status` page

## Next Steps

1. **Get Razorpay Account**: Sign up and get test credentials
2. **Configure Environment**: Add your test keys to `.env.local`
3. **Test Integration**: Use the test pages to verify everything works
4. **Go Live**: Replace with live credentials when ready for production