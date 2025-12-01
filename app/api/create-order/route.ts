import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const NEXT_PUBLIC_RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

// Test mode fallback
const DEMO_MODE = !RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === 'rzp_test_your_key_id_here';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await request.json();

    console.log('Create order request:', { amount, currency, demoMode: DEMO_MODE });

    if (!amount || amount <= 0) {
      console.error('Invalid amount:', amount);
      return NextResponse.json(
        { error: 'Invalid amount. Amount must be greater than 0.' },
        { status: 400 }
      );
    }

    // Demo mode - return mock order data
    if (DEMO_MODE) {
      console.log('Running in demo mode - returning mock order');
      const mockOrder = {
        orderId: `order_demo_${Date.now()}`,
        amount: Math.round(amount * 100), // Convert to paisa
        currency,
        key: 'rzp_test_demo_key',
      };
      
      return NextResponse.json(mockOrder);
    }

    // Production mode - use actual Razorpay API
    console.log('Environment check:', {
      hasKeyId: !!RAZORPAY_KEY_ID,
      hasKeySecret: !!RAZORPAY_KEY_SECRET,
      keyIdLength: RAZORPAY_KEY_ID?.length || 0,
    });

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials');
      return NextResponse.json(
        { 
          error: 'Razorpay credentials not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env.local file.',
          details: {
            hasKeyId: !!RAZORPAY_KEY_ID,
            hasKeySecret: !!RAZORPAY_KEY_SECRET,
          }
        },
        { status: 500 }
      );
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order
    const orderData = {
      amount: Math.round(amount * 100), // Convert to paisa
      currency,
      receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };

    console.log('Creating Razorpay order with data:', orderData);

    const order = await razorpay.orders.create(orderData);
    console.log('Razorpay order created successfully:', order);
    
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: NEXT_PUBLIC_RAZORPAY_KEY_ID || RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}