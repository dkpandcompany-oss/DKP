import { NextRequest, NextResponse } from 'next/server';
import { CheckoutData } from '@/types/checkout';

export async function POST(request: NextRequest) {
  try {
    const checkoutData: CheckoutData = await request.json();

    // Validate required fields
    if (!checkoutData.service || !checkoutData.razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically save to your database
    // For now, we'll just log the data and return success
    console.log('Order saved:', {
      service: checkoutData.service,
      addons: checkoutData.addons,
      one_time_total: checkoutData.one_time_total,
      monthly_total: checkoutData.monthly_total,
      razorpay_payment_id: checkoutData.razorpay_payment_id,
      created_at: new Date().toISOString(),
    });

    // TODO: Implement actual database save logic here
    // Example with Supabase:
    // const { data, error } = await supabase
    //   .from('orders')
    //   .insert({
    //     service: checkoutData.service,
    //     addons: checkoutData.addons,
    //     one_time_total: checkoutData.one_time_total,
    //     monthly_total: checkoutData.monthly_total,
    //     razorpay_payment_id: checkoutData.razorpay_payment_id,
    //     created_at: new Date().toISOString(),
    //   });

    return NextResponse.json({
      success: true,
      message: 'Order saved successfully',
      orderId: `order_${Date.now()}`,
    });

  } catch (error) {
    console.error('Save order error:', error);
    return NextResponse.json(
      { error: 'Failed to save order' },
      { status: 500 }
    );
  }
}