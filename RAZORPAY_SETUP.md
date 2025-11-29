# Razorpay Integration Setup Guide

## Step 1: Get Razorpay Credentials

1. **Create Razorpay Account**: Go to [https://razorpay.com](https://razorpay.com) and sign up
2. **Access Dashboard**: After verification, access your dashboard
3. **Get API Keys**: 
   - Go to Settings → API Keys
   - Generate Test Keys (for development)
   - Download and save your Key ID and Key Secret

## Step 2: Configure Environment Variables

Update your `.env.local` file with your Razorpay credentials:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

**Important Notes:**
- Use `rzp_test_` prefix for test environment
- Use `rzp_live_` prefix for production
- Never expose the Key Secret on the frontend
- The `NEXT_PUBLIC_` prefix makes the key available to the frontend

## Step 3: Test Integration

### Test Mode Credentials (for development)
You can use these test credentials for initial testing:

```env
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=test_secret_key_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1234567890
```

### Test Cards for Payment Testing
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## Step 4: Production Setup

1. **Complete KYC**: Submit required documents for verification
2. **Get Live Keys**: Generate live API keys after approval
3. **Update Environment**: Replace test keys with live keys
4. **Configure Webhooks**: Set up webhooks for payment notifications (optional)

## Webhook Configuration (Optional)

For production, set up webhooks to handle payment status updates:

1. Go to Settings → Webhooks in Razorpay Dashboard
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Note the webhook secret for verification

## Security Best Practices

1. **Never expose Key Secret**: Keep it server-side only
2. **Validate payments**: Always verify payment status server-side
3. **Use HTTPS**: Ensure all transactions are over secure connections
4. **Implement retry logic**: Handle network failures gracefully
5. **Log transactions**: Keep audit trails for all payments

## Current Integration Features

✅ **Order Creation**: Server-side order creation with Razorpay API
✅ **Payment Processing**: Frontend integration with Razorpay checkout
✅ **Error Handling**: Comprehensive error handling for payment flows
✅ **Order Persistence**: Save successful payments to database
✅ **Mobile Responsive**: Works on all devices
✅ **Type Safety**: Full TypeScript integration

## API Endpoints

- `POST /api/create-order`: Creates Razorpay order
- `POST /api/save-order`: Saves completed order to database

## Testing the Integration

1. **Update Environment**: Add your Razorpay credentials to `.env.local`
2. **Restart Server**: `pnpm dev` to reload environment variables
3. **Test Checkout**: Visit `/checkout?service=bizdev` to test
4. **Use Test Cards**: Use provided test card numbers for testing

## Support

If you encounter issues:
1. Check Razorpay Dashboard for error logs
2. Verify API credentials are correct
3. Ensure proper network connectivity
4. Check browser console for JavaScript errors

## Production Checklist

- [ ] KYC completed and approved
- [ ] Live API keys generated
- [ ] Environment variables updated
- [ ] SSL certificate installed
- [ ] Webhook endpoints configured
- [ ] Payment flows tested
- [ ] Error handling verified
- [ ] Security audit completed