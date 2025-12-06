import { NextRequest, NextResponse } from 'next/server'
import { ConsultationService } from '@/lib/consultation-service'
import { ContactFormData } from '@/types/database'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactFormData

    // Basic validation
    if (!body.firstName || !body.email) {
      return NextResponse.json(
        { success: false, error: 'First name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Submit to Supabase
    const result = await ConsultationService.submitConsultationRequest(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    try {
      console.log('Attempting to send email to:', body.email)
      console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY)
      
      const selectedServicesText = body.selectedServices?.length 
        ? body.selectedServices.join(', ') 
        : 'None specified'

      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #156d95; margin-bottom: 20px; font-size: 28px;">Thank You for Your Interest!</h1>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi ${body.firstName},
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to DKP Consulting! We've received your consultation request and our team will review it shortly.
            </p>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #111A4A; margin-bottom: 15px;">Your Request Summary:</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${body.firstName} ${body.lastName || ''}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${body.email}</p>
              ${body.companyName ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${body.companyName}</p>` : ''}
              ${body.designation ? `<p style="margin: 8px 0;"><strong>Designation:</strong> ${body.designation}</p>` : ''}
              ${body.businessField ? `<p style="margin: 8px 0;"><strong>Business Field:</strong> ${body.businessField}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Services:</strong> ${selectedServicesText}</p>
              ${body.otherServiceDescription ? `<p style="margin: 8px 0;"><strong>Other Service:</strong> ${body.otherServiceDescription}</p>` : ''}
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We typically respond within 24 hours. In the meantime, feel free to explore our case studies and learn more about how we help businesses grow.
            </p>

            <p style="font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              The DKP Consulting Team
            </p>
          </div>
        </div>
      `

      // Send confirmation email to the customer
      console.log('Sending customer email to:', body.email)
      const customerEmailResult = await resend.emails.send({
        from: 'DKP Consulting <support@dkpandcompany.com>',
        to: [body.email],
        subject: 'Thank you for contacting DKP Consulting!',
        html: emailContent,
      })
      console.log('✅ Confirmation email sent successfully to:', body.email)
      console.log('Customer email response:', customerEmailResult)

      // Send notification email to DKP Consulting
      console.log('Sending admin notification email to: dkpandcompany@gmail.com')
      const adminEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #156d95; margin-bottom: 20px; font-size: 28px;">New Consultation Request</h1>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              You have received a new consultation request:
            </p>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #111A4A; margin-bottom: 15px;">Contact Details:</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${body.firstName} ${body.lastName || ''}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${body.email}</p>
              ${body.companyName ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${body.companyName}</p>` : ''}
              ${body.designation ? `<p style="margin: 8px 0;"><strong>Designation:</strong> ${body.designation}</p>` : ''}
              ${body.businessField ? `<p style="margin: 8px 0;"><strong>Business Field:</strong> ${body.businessField}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Services Requested:</strong> ${selectedServicesText}</p>
              ${body.otherServiceDescription ? `<p style="margin: 8px 0;"><strong>Other Service Description:</strong> ${body.otherServiceDescription}</p>` : ''}
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Please respond to this request within 24 hours.
            </p>
          </div>
        </div>
      `

      const adminEmailResult = await resend.emails.send({
        from: 'DKP Consulting <support@dkpandcompany.com>',
        to: ['dkpandcompany@gmail.com'],
        subject: `New Consultation Request from ${body.firstName} ${body.lastName || ''}`,
        html: adminEmailContent,
      })
      console.log('✅ Notification email sent successfully to: dkpandcompany@gmail.com')
      console.log('Admin email response:', adminEmailResult)

    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      console.error('Email error details:', {
        message: emailError.message,
        name: emailError.name,
        stack: emailError.stack
      })
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully',
      data: result.data
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const result = await ConsultationService.getAllConsultationRequests()
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}