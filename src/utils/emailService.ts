// Email service simulation for demo purposes
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface VerificationEmailData {
  recipientEmail: string;
  recipientName: string;
  verificationCode: string;
  expirationTime: number;
}

export interface ContactEmailData {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  timestamp: string;
}

export class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendVerificationEmail(data: VerificationEmailData): Promise<boolean> {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const template = this.generateVerificationTemplate(data);
    
    // In demo mode, show the email content
    console.log('📧 Verification Email Sent:');
    console.log('To:', data.recipientEmail);
    console.log('Subject:', template.subject);
    console.log('Code:', data.verificationCode);
    console.log('Expires:', new Date(data.expirationTime).toLocaleString());

    // Show alert for demo
    alert(`Demo Mode - Verification Email Sent!\n\nTo: ${data.recipientEmail}\nCode: ${data.verificationCode}\nExpires: ${new Date(data.expirationTime).toLocaleString()}\n\n(In production, this would be sent via email service)`);

    return true;
  }

  async sendContactMessage(data: ContactEmailData): Promise<boolean> {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('📧 Contact Message Sent:');
    console.log('From:', data.senderName, '<' + data.senderEmail + '>');
    console.log('Subject:', data.subject);
    console.log('Message:', data.message);
    console.log('Timestamp:', data.timestamp);

    return true;
  }

  private generateVerificationTemplate(data: VerificationEmailData): EmailTemplate {
    const expirationDate = new Date(data.expirationTime).toLocaleString();
    
    const subject = 'Email Verification Required - SecureContact';
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Email Verification</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">SecureContact Form</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p>Hello ${data.recipientName},</p>
            
            <p>Thank you for contacting us! To complete your message submission, please verify your email address using the code below:</p>
            
            <div style="background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h2 style="color: #495057; margin: 0 0 10px 0;">Verification Code</h2>
              <div style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 8px; font-family: monospace;">
                ${data.verificationCode}
              </div>
            </div>
            
            <p><strong>Important:</strong> This code will expire on ${expirationDate}.</p>
            
            <p>If you didn't request this verification, please ignore this email.</p>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              This is an automated message from SecureContact. Please do not reply to this email.
            </p>
          </div>
        </body>
      </html>
    `;

    const text = `
      Email Verification - SecureContact
      
      Hello ${data.recipientName},
      
      Thank you for contacting us! To complete your message submission, please verify your email address using the code below:
      
      Verification Code: ${data.verificationCode}
      
      This code will expire on ${expirationDate}.
      
      If you didn't request this verification, please ignore this email.
      
      ---
      This is an automated message from SecureContact.
    `;

    return { subject, html, text };
  }
}