"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEmailTemplate = void 0;
const buildEmailTemplate = (title, bodyContent, source, cancelLink) => {
    const isUniverse = source === 'universe';
    const teamName = isUniverse ? 'UniVerse Team' : 'InternTional Team';
    const primaryColor = '#27628C';
    const brandName = isUniverse ? 'UniVerse' : 'InternTional';
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7fa; color: #333333;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7fa; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <tr>
                <td align="center" style="background-color: ${primaryColor}; padding: 30px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">${brandName}</h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 40px 40px 30px 40px; font-size: 16px; line-height: 1.6;">
                  ${bodyContent}
                  ${cancelLink ? `
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center;">
                      <p style="font-size: 13px; color: #777777;">If you'd like to cancel your subscription, you can do so by clicking the button below:</p>
                      <a href="${cancelLink}" style="display: inline-block; margin-top: 10px; font-size: 13px; color: #dc2626; text-decoration: underline;">Cancel My Subscription</a>
                    </div>
                  ` : ''}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #f8fafc; padding: 25px 40px; border-top: 1px solid #edf2f7; font-size: 14px; color: #64748b;">
                  <p style="margin: 0;">Best regards,</p>
                  <p style="margin: 5px 0 0 0; font-weight: 600;">The ${teamName}</p>
                  <p style="margin: 15px 0 0 0; font-size: 12px;">© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
exports.buildEmailTemplate = buildEmailTemplate;
//# sourceMappingURL=email-template.js.map