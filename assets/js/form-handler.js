/*
  Site-wide form handler using EmailJS REST API

  Setup steps (required):
  1. Create an account at https://www.emailjs.com/ and add a new Email Service (Gmail via SMTP).
  2. Create an email template that accepts variables used below (e.g. from_name, from_email, to_email, subject, message, phone, page).
  3. Copy your `service_id`, `template_id`, and `user_id` (public key) and set them in the CONFIG section below.
  4. In EmailJS service settings verify `vishalchaudharylawoffice@gmail.com` as the sender (or configure SMTP using that Gmail account).

  Security note: Do NOT embed SMTP passwords in client-side code. Use EmailJS or a server-side endpoint for production.
*/

(function(){
  'use strict';

  // CONFIG - replace these with your EmailJS values
  const CONFIG = {
    service_id: 'service_zfgwo7x',
    template_id: 'template_vg6puy9',
    user_id: 'vifUthlAhMBDHopJV', // public key
    // Destination email (site owner)
    to_email: 'info@vishalchaudharyslawoffice.com',
    // Visible sender email - configure this in your EmailJS SMTP settings
    from_email: 'vishalchaudharylawoffice@gmail.com'
  };

  // endpoint
  const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

  function jsonPost(url, body){
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(r => r.json().catch(()=>r));
  }

  function sendEmail(templateParams){
    const payload = {
      service_id: CONFIG.service_id,
      template_id: CONFIG.template_id,
      user_id: CONFIG.user_id,
      template_params: templateParams
    };
    return fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(resp => {
      if (!resp.ok) return resp.text().then(text => Promise.reject(new Error(text || resp.status)));
      return resp.json().catch(()=>({status: 'ok'}));
    });
  }

  function handleSubmit(e, formType){
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; }

    // Quick config check: warn if placeholders not replaced
    function notConfigured() {
      return CONFIG.service_id.indexOf('YOUR_') === 0 || CONFIG.template_id.indexOf('YOUR_') === 0 || CONFIG.user_id.indexOf('YOUR_') === 0;
    }
    if (notConfigured()){
      alert('Email service is not configured. Please set EmailJS service_id, template_id and user_id in assets/js/form-handler.js');
      if (submitBtn) { submitBtn.disabled = false; }
      return;
    }

    // Gather common fields
    const getVal = id => {
      const el = form.querySelector('#' + id) || form.querySelector('[name="' + id + '"]');
      return el ? el.value.trim() : '';
    };

    const page = window.location.pathname || location.href;

    let templateParams = {
      to_email: CONFIG.to_email,
      from_email: CONFIG.from_email,
      page: page
    };

    if (formType === 'consultation'){
      templateParams.from_name = getVal('consultationName') || getVal('name');
      templateParams.from_email = getVal('consultationEmail') || getVal('email');
      templateParams.phone = getVal('consultationPhone') || getVal('phone');
      templateParams.subject = getVal('consultationSubject') || 'Consultation Request';
      templateParams.message = getVal('consultationMessage') || '';
    } else if (formType === 'contact'){
      templateParams.from_name = getVal('name');
      templateParams.from_email = getVal('email');
      templateParams.phone = getVal('phone');
      templateParams.subject = 'Website Contact Form';
      templateParams.message = getVal('message');
    } else if (formType === 'newsletter'){
      templateParams.from_name = '';
      templateParams.from_email = getVal('email') || getVal('newsletter-email');
      templateParams.subject = 'Newsletter Signup';
      templateParams.message = 'Please subscribe this email to newsletter.';
    } else {
      // generic fallback: serialize form inputs
      const data = new FormData(form);
      data.forEach((v,k) => templateParams[k] = v);
      templateParams.subject = templateParams.subject || 'Website Form Submission';
    }

    // send
    sendEmail(templateParams).then(() => {
      try { alert('Thank you — your message was sent. We will contact you soon.'); } catch(e){}
      form.reset();
    }).catch(err => {
      console.error('Email send error', err);
      try { alert('Sorry — an error occurred while sending the message.'); } catch(e){}
    }).finally(() => {
      if (submitBtn) { submitBtn.disabled = false; }
    });
  }

  function init(){
    // Consultation forms (many pages use id='consultationForm')
    document.querySelectorAll('form#consultationForm').forEach(f => {
      f.addEventListener('submit', e => handleSubmit(e, 'consultation'));
    });

    // Contact forms
    document.querySelectorAll('form#contact').forEach(f => {
      f.addEventListener('submit', e => handleSubmit(e, 'contact'));
    });

    // Blog newsletter
    document.querySelectorAll('form#blogNewsletterForm, form.blog-newsletter-form').forEach(f => {
      f.addEventListener('submit', e => handleSubmit(e, 'newsletter'));
    });

    // Attach to any other forms with data-emailjs="true"
    document.querySelectorAll('form[data-emailjs="true"]').forEach(f => {
      f.addEventListener('submit', e => handleSubmit(e, 'generic'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

})();
