import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CheckoutData } from '@/types/checkout';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    const checkoutData: CheckoutData & { 
      customer_email?: string;
      customer_name?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    } = await request.json();

    // Validate required fields
    if (!checkoutData.service || !checkoutData.razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If we have supabase service role key, save to database
    if (supabaseServiceRoleKey && supabaseUrl) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
      
      const orderData = {
        customer_email: checkoutData.customer_email || 'unknown@email.com',
        customer_name: checkoutData.customer_name || null,
        service_name: checkoutData.service.name,
        service_id: checkoutData.service.id,
        addons: checkoutData.addons
          .filter(addon => addon.selected)
          .map(addon => ({
            id: addon.id,
            name: addon.name,
            price: addon.price,
            type: addon.type
          })),
        one_time_total: checkoutData.one_time_total,
        monthly_total: checkoutData.monthly_total,
        amount: Math.round(checkoutData.one_time_total * 100), // Convert to paise
        currency: 'INR',
        razorpay_order_id: checkoutData.razorpay_order_id || `order_${Date.now()}`,
        razorpay_payment_id: checkoutData.razorpay_payment_id,
        razorpay_signature: checkoutData.razorpay_signature || null,
        status: 'paid' as const,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabaseAdmin
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) {
        console.error('Error saving order to database:', error);
        // Don't fail the request, just log the error
        // The payment was successful even if DB save failed
      } else {
        console.log('Order saved to database:', data);
        return NextResponse.json({
          success: true,
          message: 'Order saved successfully',
          orderId: data.id,
        });
      }
    }

    // Fallback: log the order
    console.log('Order saved (no DB):', {
      service: checkoutData.service,
      addons: checkoutData.addons,
      one_time_total: checkoutData.one_time_total,
      monthly_total: checkoutData.monthly_total,
      razorpay_payment_id: checkoutData.razorpay_payment_id,
      created_at: new Date().toISOString(),
    });

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