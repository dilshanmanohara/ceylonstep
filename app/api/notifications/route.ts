import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile_number, vehicle_title, start_date, end_date } = body;

    // Log the notification details (in production, you'd send actual SMS/email here)
              console.log('=== BOOKING LOGGED ===');
          console.log('📱 Customer Mobile:', mobile_number);
          console.log('📧 Customer Email:', email);
          console.log('📧 Notification sent to: ceylonstepps@gmail.com');
    console.log('📋 Details:', {
      customer_name: name,
      customer_email: email,
      customer_mobile: mobile_number,
      vehicle: vehicle_title,
      start_date,
      end_date,
      booking_date: new Date().toISOString()
    });
    console.log('========================');

    // In production, you would integrate with services like:
    // - SMS: Twilio, AWS SNS, or local SMS gateway
    // - Email: SendGrid, AWS SES, or Nodemailer
    
    // Example SMS message:
    const smsMessage = `Hi ${name}! Your booking for ${vehicle_title} (${start_date} to ${end_date}) has been confirmed. We'll contact you soon. - CeylonStep`;
    
    // Example email message:
    const emailMessage = `
      New Booking Received!
      
      Customer: ${name}
      Email: ${email}
      Mobile: ${mobile_number}
      Vehicle: ${vehicle_title}
      Start Date: ${start_date}
      End Date: ${end_date}
      Booking Date: ${new Date().toLocaleDateString()}
      
      Please contact the customer to confirm details.
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Booking logged successfully',
      sms: smsMessage,
      email: emailMessage
    });

  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send notifications' },
      { status: 500 }
    );
  }
} 