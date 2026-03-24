/* ==========================================================================
   DevuApp Landing Page — JavaScript
   Language toggle, scroll animations, mobile menu, nav scroll effect
   ========================================================================== */

const TRANSLATIONS = {
  // Nav
  "nav.features": { tr: "Özellikler", en: "Features" },
  "nav.whatsapp": { tr: "WhatsApp", en: "WhatsApp" },
  "nav.login": { tr: "Giriş Yap", en: "Login" },
  "nav.start": { tr: "Başlayın", en: "Get Started" },

  // Hero
  "hero.badge": {
    tr: "Randevu yönetimi, yeniden tasarlandı",
    en: "Appointment management, redesigned",
  },
  "hero.title": {
    tr: "Randevularınız artık <em>kendini yönetsin.</em>",
    en: "Let your appointments <em>manage themselves.</em>",
  },
  "hero.subtitle": {
    tr: "WhatsApp ile otomatik hatırlatma gönderin, tek mesajla onay alın, takvimi herkes görsün. Randevu kaçırma dönemi bitti.",
    en: "Send automatic WhatsApp reminders, get one-message confirmations, and keep everyone on the same calendar. No more no-shows.",
  },
  "hero.cta.primary": { tr: "Ücretsiz Deneyin", en: "Start Free" },
  "hero.cta.secondary": { tr: "Nasıl Çalışır?", en: "See How It Works" },
  "hero.trust": {
    tr: "Kredi kartı gerekmez <span>·</span> 1 dakikada kurulum",
    en: "No credit card required <span>·</span> Set up in 1 minute",
  },

  // Proof
  "proof.text": {
    tr: "Her türlü randevulu işletme için tasarlandı",
    en: "Designed for every appointment-based business",
  },
  "proof.dental": { tr: "Diş Klinikleri", en: "Dental Clinics" },
  "proof.psychology": { tr: "Psikologlar", en: "Psychologists" },
  "proof.physio": { tr: "Fizyoterapistler", en: "Physiotherapists" },
  "proof.diet": { tr: "Diyetisyenler", en: "Dieticians" },
  "proof.beauty": { tr: "Güzellik Merkezleri", en: "Beauty Centers" },

  // Problem
  "problem.label": { tr: "Sorun", en: "The Problem" },
  "problem.title": { tr: "Tanıdık geldi mi?", en: "Sound familiar?" },
  "problem.1.title": { tr: "Kaçırılan Randevular", en: "Missed Appointments" },
  "problem.1.desc": {
    tr: "Hastanız gelmedi, saatiniz boşa gitti. Her kaçırılan randevu hem gelir kaybı hem zaman kaybı.",
    en: "Your client didn't show up. That's lost revenue and wasted time — every single week.",
  },
  "problem.2.title": { tr: "Manuel Hatırlatmalar", en: "Manual Reminders" },
  "problem.2.desc": {
    tr: "Tek tek WhatsApp mesajı göndermek, aramak, not almak... Asistanınızın zamanının yarısı buna gidiyor.",
    en: "Sending WhatsApp messages one by one, calling, taking notes... Half your assistant's day goes to this.",
  },
  "problem.3.title": { tr: "Dağınık Takip", en: "Scattered Tracking" },
  "problem.3.desc": {
    tr: "Excel, kâğıt ajanda, telefon rehberi... Hasta bilgileri her yerde ama hiçbir yerde düzenli değil.",
    en: "Excel sheets, paper planners, phone contacts... Client info is everywhere but organized nowhere.",
  },

  // Features
  "features.label": { tr: "Özellikler", en: "Features" },
  "features.title": {
    tr: "Tek platformda her şey",
    en: "Everything in one place",
  },
  "features.subtitle": {
    tr: "Randevu, müşteri, hatırlatma, ödeme — hepsi bir arada.",
    en: "Appointments, clients, reminders, payments — all together.",
  },
  "features.1.title": { tr: "Akıllı Takvim", en: "Smart Calendar" },
  "features.1.desc": {
    tr: "Gün, hafta, ay görünümü. Çakışma kontrolu otomatik. Tüm şubeleriniz tek takvimde.",
    en: "Day, week, month views. Automatic conflict detection. All your venues in one calendar.",
  },
  "features.2.title": { tr: "WhatsApp Hatırlatma", en: "WhatsApp Reminders" },
  "features.2.desc": {
    tr: "Otomatik hatırlatma, tek mesajla onay veya iptal. Randevu kaçırma oranınız sıfıra iner.",
    en: "Automatic reminders, one-message confirmation or cancellation. Your no-show rate drops to zero.",
  },
  "features.3.title": { tr: "Müşteri Yönetimi", en: "Client Management" },
  "features.3.desc": {
    tr: "İletişim bilgileri, geçmiş randevular, fotoğraflar, notlar — her müşteri için eksiksiz profil.",
    en: "Contact info, appointment history, photos, notes — a complete profile for every client.",
  },
  "features.4.title": { tr: "Ödeme Takibi", en: "Payment Tracking" },
  "features.4.desc": {
    tr: "Taksit planları, ödeme hatırlatmaları, kalan bakiye — tedavi sürecini finansal olarak da takip edin.",
    en: "Installment plans, payment reminders, remaining balance — track the financial side of treatment.",
  },
  "features.5.title": { tr: "Çoklu Şube", en: "Multi-Venue" },
  "features.5.desc": {
    tr: "Birden fazla lokasyon? Tek hesapla hepsini yönetin, takvimler arası çakışma kontrolu dahil.",
    en: "Multiple locations? Manage them all from one account, with cross-venue conflict detection.",
  },
  "features.6.title": { tr: "Google Takvim", en: "Google Calendar" },
  "features.6.desc": {
    tr: "Randevularınız otomatik olarak Google Takviminize yansır.",
    en: "Your appointments automatically appear in your Google Calendar.",
  },

  // WhatsApp
  "wa.badge": { tr: "En önemli özellik", en: "The key feature" },
  "wa.title": {
    tr: "WhatsApp ile randevu yönetiminin geleceği",
    en: "The future of appointment management with WhatsApp",
  },
  "wa.subtitle": {
    tr: "Sadece hatırlatma değil — tam otomatik, iki yönlü randevu onay sistemi.",
    en: "Not just reminders — a fully automatic, two-way appointment confirmation system.",
  },
  "wa.flow.1.title": { tr: "Otomatik Hatırlatma", en: "Auto Reminder" },
  "wa.flow.1.desc": {
    tr: "Randevudan 24 saat ve 2 saat önce, müşterinize otomatik WhatsApp mesajı gönderilir.",
    en: "Your client automatically receives a WhatsApp message 24 hours and 2 hours before the appointment.",
  },
  "wa.flow.2.title": { tr: "Tek Mesajla Onay", en: "One-Message Confirm" },
  "wa.flow.2.desc": {
    tr: '"Evet" → otomatik onay ✅\n"İptal" → otomatik iptal ❌\nAsistanınız hiçbir şey yapmaz.',
    en: '"Yes" → auto-confirmed ✅\n"Cancel" → auto-cancelled ❌\nYour assistant does nothing.',
  },
  "wa.flow.3.title": { tr: "Kolay Kurulum", en: "Easy Setup" },
  "wa.flow.3.desc": {
    tr: "Meta Business API ile resmi WhatsApp Business hattınızdan mesaj gönderin. 15 dakikada hazır.",
    en: "Send from your official WhatsApp Business number via Meta Business API. Ready in 15 minutes.",
  },
  "wa.cta": { tr: "WhatsApp Kurulum Rehberi →", en: "WhatsApp Setup Guide →" },

  // WA phone mockup
  "wa.phone.name": { tr: "DevuApp", en: "DevuApp" },
  "wa.phone.msg": {
    tr: 'Merhaba Ayşe Hanım 👋\n\nRandevunuzu hatırlatmak isteriz:\n\n📅 25 Mart 2026, Çarşamba\n⏰ 14:30\n👨‍⚕️ Dr. Mehmet Yılmaz\n🏥 Üsküdar Dental\n\nOnaylamak için "Evet",\niptal için "İptal" yazın.',
    en: 'Hello Ayşe 👋\n\nReminder for your appointment:\n\n📅 March 25, 2026, Wednesday\n⏰ 2:30 PM\n👨‍⚕️ Dr. Mehmet Yılmaz\n🏥 Üsküdar Dental\n\nReply "Yes" to confirm,\n"Cancel" to cancel.',
  },
  "wa.phone.reply": { tr: "Evet", en: "Yes" },
  "wa.phone.confirm": {
    tr: "Randevunuz onaylandı ✅",
    en: "Your appointment is confirmed ✅",
  },

  // How it works
  "how.label": { tr: "Nasıl Çalışır", en: "How It Works" },
  "how.title": { tr: "3 adımda başlayın", en: "Start in 3 steps" },
  "how.1.title": { tr: "Hesap Oluşturun", en: "Create Your Account" },
  "how.1.desc": {
    tr: "1 dakikada ücretsiz hesabınızı oluşturun. İşletme kategorinizi seçin, subenizi ekleyin.",
    en: "Set up your free account in 1 minute. Choose your business category, add your venue.",
  },
  "how.2.title": { tr: "Randevuları Girin", en: "Add Your Appointments" },
  "how.2.desc": {
    tr: "Müşterilerinizi ve randevularınızı ekleyin. Akıllı takvim çakışmaları otomatik kontrol eder.",
    en: "Enter your clients and appointments. The smart calendar automatically checks for conflicts.",
  },
  "how.3.title": { tr: "Otomatik Pilot", en: "Go Autopilot" },
  "how.3.desc": {
    tr: "WhatsApp hatırlatmaları otomatik gönderilir. Onaylar otomatik işlenir. Siz işinize odaklanın.",
    en: "WhatsApp reminders sent automatically. Confirmations processed automatically. Focus on your work.",
  },

  // Screenshots
  "screenshots.title": {
    tr: "Masaüstünde veya mobilde",
    en: "Desktop or mobile",
  },
  "screenshots.subtitle": {
    tr: "Web uygulaması ve mobil uygulama ile randevularınıza her yerden erişin.",
    en: "Access your appointments from anywhere with the web and mobile app.",
  },

  // Use cases
  "usecases.label": { tr: "Kimler İçin", en: "Who It's For" },
  "usecases.title": {
    tr: "Her randevulu işletme için",
    en: "Built for every appointment-based business",
  },
  "usecases.subtitle": {
    tr: "İşletme kategorinizi seçin, terminoloji otomatik uyarlanır.",
    en: "Choose your category, and the terminology adapts automatically.",
  },
  "usecases.dental": { tr: "Diş Klinikleri", en: "Dental Clinics" },
  "usecases.dental.desc": { tr: "Hasta, Diş Hekimi", en: "Patient, Dentist" },
  "usecases.psychology": { tr: "Psikologlar", en: "Psychologists" },
  "usecases.psychology.desc": {
    tr: "Danışan, Terapist",
    en: "Client, Therapist",
  },
  "usecases.physio": { tr: "Fizyoterapistler", en: "Physiotherapists" },
  "usecases.physio.desc": {
    tr: "Hasta, Fizyoterapist",
    en: "Patient, Physiotherapist",
  },
  "usecases.diet": { tr: "Diyetisyenler", en: "Dieticians" },
  "usecases.diet.desc": { tr: "Danışan, Diyetisyen", en: "Client, Dietician" },
  "usecases.beauty": { tr: "Güzellik Merkezleri", en: "Beauty Centers" },
  "usecases.beauty.desc": { tr: "Müşteri, Uzman", en: "Customer, Specialist" },
  "usecases.general": { tr: "Diğer İşletmeler", en: "Other Businesses" },
  "usecases.general.desc": {
    tr: "Müşteri, Hizmet Sağlayıcı",
    en: "Client, Service Provider",
  },

  // CTA
  "cta.title": {
    tr: "Randevularınızı kontrol altına alın.",
    en: "Take control of your appointments.",
  },
  "cta.subtitle": {
    tr: "Ücretsiz hesabınızı oluşturun, 2 dakikada kullanmaya başlayın.",
    en: "Create your free account and start using it in 2 minutes.",
  },
  "cta.button": { tr: "Ücretsiz Başlayın", en: "Start Free" },
  "cta.trust": { tr: "Kredi kartı gerekmez", en: "No credit card required" },

  // Footer
  "footer.desc": {
    tr: "Randevu ve müşteri yönetim platformu. Hizmet sektöründeki işletmeler için tasarlandı.",
    en: "Appointment and client management platform. Designed for service-based businesses.",
  },
  "footer.product": { tr: "Ürün", en: "Product" },
  "footer.resources": { tr: "Kaynaklar", en: "Resources" },
  "footer.legal": { tr: "Yasal", en: "Legal" },
  "footer.features": { tr: "Özellikler", en: "Features" },
  "footer.wa-guide": {
    tr: "WhatsApp Kurulum Rehberi",
    en: "WhatsApp Setup Guide",
  },
  "footer.privacy": { tr: "Gizlilik Politikası", en: "Privacy Policy" },
  "footer.terms": { tr: "Kullanım Koşulları", en: "Terms & Conditions" },
  "footer.login": { tr: "Giriş Yap", en: "Login" },
  "footer.register": { tr: "Başlayın", en: "Get Started" },
  "footer.copy": {
    tr: "© 2026 DevuApp. Tüm hakları saklıdır.",
    en: "© 2026 DevuApp. All rights reserved.",
  },

  // ========== WhatsApp Setup Guide ==========
  "wasguide.title": {
    tr: "WhatsApp Kurulum Rehberi",
    en: "WhatsApp Setup Guide",
  },
  "wasguide.subtitle": {
    tr: "Meta Business API ile WhatsApp hatırlatma sistemini adım adım kürün. Tahmini sure: 15 dakika.",
    en: "Set up the WhatsApp reminder system step by step using Meta Business API. Estimated time: 15 minutes.",
  },
  "wasguide.prereq.title": { tr: "Gereksinimler", en: "Prerequisites" },
  "wasguide.prereq.1": { tr: "Bir Facebook hesabı", en: "A Facebook account" },
  "wasguide.prereq.2": {
    tr: "Bir işletme telefon numarası (kişisel WhatsApp'ınızdan farklı olmalı)",
    en: "A business phone number (must be different from your personal WhatsApp)",
  },
  "wasguide.prereq.3link": { tr: "buradan oluşturun", en: "create one here" },

  "wasguide.step1.title": {
    tr: "Meta Business Hesabı Oluşturun",
    en: "Create a Meta Business Account",
  },
  "wasguide.step1.1": {
    tr: '<a href="https://business.facebook.com" target="_blank" rel="noopener">business.facebook.com</a> adresine gidin',
    en: 'Go to <a href="https://business.facebook.com" target="_blank" rel="noopener">business.facebook.com</a>',
  },
  "wasguide.step1.2": {
    tr: '"Hesap Oluştur" butonuna tıklayın',
    en: 'Click "Create Account"',
  },
  "wasguide.step1.3": {
    tr: "İşletme adınızı, adınızı ve is e-posta adresinizi girin",
    en: "Enter your business name, your name, and business email",
  },
  "wasguide.step1.4": {
    tr: "İşletme bilgilerinizi doğrulayın",
    en: "Verify your business information",
  },
  "wasguide.step1.screenshot": {
    tr: "Ekran görüntüsü: Meta Business Suite ana ekranı",
    en: "Screenshot: Meta Business Suite home screen",
  },

  "wasguide.step2.title": {
    tr: "WhatsApp Business Uygulaması Oluşturun",
    en: "Create a WhatsApp Business App",
  },
  "wasguide.step2.1": {
    tr: '<a href="https://developers.facebook.com" target="_blank" rel="noopener">developers.facebook.com</a> adresine gidin',
    en: 'Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener">developers.facebook.com</a>',
  },
  "wasguide.step2.2": {
    tr: '"Uygulamalarım" → "Uygulama Oluştur" seçin',
    en: '"My Apps" → "Create App"',
  },
  "wasguide.step2.3": {
    tr: 'Uygulama turu olarak <strong>"Business"</strong> seçin',
    en: 'Select <strong>"Business"</strong> as app type',
  },
  "wasguide.step2.4": {
    tr: 'Uygulama adını girin (örn: "Kliniğim WhatsApp")',
    en: 'Enter app name (e.g. "My Clinic WhatsApp")',
  },
  "wasguide.step2.5": {
    tr: "Meta Business hesabınızı bağlayın",
    en: "Connect your Meta Business account",
  },
  "wasguide.step2.6": {
    tr: 'Oluşturulan uygulamada <strong>WhatsApp</strong> ürününü ekleyin ("Ürün Ekle" → WhatsApp → "Kur")',
    en: 'Add the <strong>WhatsApp</strong> product to your app ("Add Product" → WhatsApp → "Set Up")',
  },
  "wasguide.step2.screenshot": {
    tr: "Ekran görüntüsü: Meta Developer Portal — uygulama oluşturma",
    en: "Screenshot: Meta Developer Portal — app creation",
  },

  "wasguide.step3.title": {
    tr: "Telefon Numarası Ekleyin",
    en: "Add a Phone Number",
  },
  "wasguide.step3.1": {
    tr: "WhatsApp → Başlangıç (Getting Started) sayfasına gidin",
    en: "Go to WhatsApp → Getting Started",
  },
  "wasguide.step3.2": {
    tr: '"Telefon Numarası Ekle" butonuna tıklayın',
    en: 'Click "Add Phone Number"',
  },
  "wasguide.step3.3": {
    tr: "İşletme telefon numaranızı girin",
    en: "Enter your business phone number",
  },
  "wasguide.step3.4": {
    tr: "SMS veya arama ile doğrulama kodunu alın",
    en: "Receive the verification code via SMS or call",
  },
  "wasguide.step3.5": {
    tr: "Kodu girin ve numaranızı doğrulayın",
    en: "Enter the code and verify your number",
  },
  "wasguide.step3.warning": {
    tr: "⚠️ <strong>Önemli:</strong> Bu numara halihazırda kişisel WhatsApp'ta kayıtlı olmamalıdır. Yeni bir hat almanızı öneririz.",
    en: "⚠️ <strong>Important:</strong> This number must not be registered on personal WhatsApp. We recommend getting a new line.",
  },
  "wasguide.step3.screenshot": {
    tr: "Ekran görüntüsü: Telefon numarası ekleme ekranı",
    en: "Screenshot: Phone number setup screen",
  },

  "wasguide.step4.title": {
    tr: "API Bilgilerini Alın",
    en: "Get Your API Credentials",
  },
  "wasguide.step4.1": {
    tr: "WhatsApp → API Kurulumu (API Setup) sayfasına gidin",
    en: "Go to WhatsApp → API Setup",
  },
  "wasguide.step4.2": {
    tr: "<strong>Phone Number ID</strong> (Telefon Numarası Kimliği) değerini not edin",
    en: "Note your <strong>Phone Number ID</strong>",
  },
  "wasguide.step4.3": {
    tr: "<strong>WhatsApp Business Account ID</strong> değerini not edin",
    en: "Note your <strong>WhatsApp Business Account ID</strong>",
  },
  "wasguide.step4.token": {
    tr: "<strong>Kalıcı Erişim Anahtarı (Permanent Access Token) oluşturun:</strong>",
    en: "<strong>Create a Permanent Access Token:</strong>",
  },
  "wasguide.step4.4": {
    tr: "Business Settings → Users → System Users sayfasına gidin",
    en: "Go to Business Settings → Users → System Users",
  },
  "wasguide.step4.5": {
    tr: "Sistem kullanıcısı oluşturun",
    en: "Create a system user",
  },
  "wasguide.step4.6": {
    tr: "Sistem kullanıcısına <code>whatsapp_business_messaging</code> iznini verin",
    en: "Grant the <code>whatsapp_business_messaging</code> permission to the system user",
  },
  "wasguide.step4.7": {
    tr: "Kalıcı token oluşturun",
    en: "Generate a permanent token",
  },
  "wasguide.step4.screenshot": {
    tr: "Ekran görüntüsü: API bilgileri ve token oluşturma",
    en: "Screenshot: API credentials and token generation",
  },

  "wasguide.step5.title": {
    tr: "DevuApp'ta Yapılandırın",
    en: "Configure in DevuApp",
  },
  "wasguide.step5.1": { tr: "DevuApp'a giriş yapın", en: "Log in to DevuApp" },
  "wasguide.step5.2": {
    tr: "Ayarlar → WhatsApp sayfasına gidin",
    en: "Go to Settings → WhatsApp",
  },
  "wasguide.step5.3": {
    tr: "<strong>Phone Number ID</strong>'yi yapıştırın",
    en: "Paste your <strong>Phone Number ID</strong>",
  },
  "wasguide.step5.4": {
    tr: "<strong>Access Token</strong>'ı yapıştırın",
    en: "Paste your <strong>Access Token</strong>",
  },
  "wasguide.step5.5": {
    tr: '"Etkinleştir" butonunu açın',
    en: 'Toggle "Enable" on',
  },
  "wasguide.step5.6": {
    tr: '"Test Mesajı Gönder" ile çalıştığını doğrulayın',
    en: 'Verify it works with "Send Test Message"',
  },
  "wasguide.step5.screenshot": {
    tr: "Ekran görüntüsü: DevuApp WhatsApp ayarları ekranı",
    en: "Screenshot: DevuApp WhatsApp settings page",
  },

  "wasguide.step6.title": {
    tr: "Webhook Kurulumu (İki Yönlü Mesajlaşma)",
    en: "Webhook Setup (Two-Way Messaging)",
  },
  "wasguide.step6.intro": {
    tr: "Webhook, müşterilerinizin WhatsApp yanıtlarının (onay/iptal) otomatik işlenmesini sağlar.",
    en: "Webhooks enable automatic processing of your clients' WhatsApp replies (confirmations/cancellations).",
  },
  "wasguide.step6.1": {
    tr: "Meta Developer Portal → WhatsApp → Yapılandırma (Configuration) sayfasına gidin",
    en: "Go to Meta Developer Portal → WhatsApp → Configuration",
  },
  "wasguide.step6.2": {
    tr: "Webhook URL olarak girin: <code>https://YOUR_BACKEND_URL/api/whatsapp/webhook</code>",
    en: "Enter the Webhook URL: <code>https://YOUR_BACKEND_URL/api/whatsapp/webhook</code>",
  },
  "wasguide.step6.3": {
    tr: "Doğrulama Token'ı olarak DevuApp'taki \"Webhook Verify Token\" değerini girin",
    en: 'Enter the "Webhook Verify Token" from DevuApp as the Verify Token',
  },
  "wasguide.step6.4": {
    tr: "Abone olunacak alanlar: <code>messages</code> seçin",
    en: "Subscribe to fields: select <code>messages</code>",
  },
  "wasguide.step6.5": {
    tr: '"Dogrula ve Kaydet" butonuna tıklayın',
    en: 'Click "Verify and Save"',
  },
  "wasguide.step6.done": {
    tr: '✅ Artık müşterileriniz "Evet" veya "İptal" yazdığında randevu durumu otomatik güncellenir.',
    en: '✅ Now when your clients reply "Yes" or "Cancel", the appointment status updates automatically.',
  },
  "wasguide.step6.screenshot": {
    tr: "Ekran görüntüsü: Meta webhook yapılandırma ekranı",
    en: "Screenshot: Meta webhook configuration screen",
  },

  "wasguide.trouble.title": { tr: "Sorun Giderme", en: "Troubleshooting" },
  "wasguide.trouble.problem": { tr: "Sorun", en: "Problem" },
  "wasguide.trouble.solution": { tr: "Çözüm", en: "Solution" },
  "wasguide.trouble.1.problem": {
    tr: "Mesaj gönderilmiyor",
    en: "Messages not sending",
  },
  "wasguide.trouble.1.solution": {
    tr: "Token süresinin dolmadığını kontrol edin. Kalıcı token kullandığınızdan emin olun.",
    en: "Check that your token hasn't expired. Make sure you're using a permanent token.",
  },
  "wasguide.trouble.2.problem": {
    tr: "Webhook dogrulanamıyor",
    en: "Webhook verification failing",
  },
  "wasguide.trouble.2.solution": {
    tr: "Verify Token'ın DevuApp ayarlarıyla eşleştiğinden emin olun.",
    en: "Make sure the Verify Token matches the one in DevuApp settings.",
  },
  "wasguide.trouble.3.problem": {
    tr: '"Evet" yazıldıgında onaylanmıyor',
    en: '"Yes" reply not confirming',
  },
  "wasguide.trouble.3.solution": {
    tr: "Webhook'un dogru URL'ye bağlandığını ve <code>messages</code> alanına abone olduğunuzu kontrol edin.",
    en: "Check that the webhook is connected to the correct URL and you've subscribed to the <code>messages</code> field.",
  },

  // ========== Privacy Policy ==========
  "privacy.title": { tr: "Gizlilik Politikası", en: "Privacy Policy" },
  "privacy.updated": {
    tr: "Son güncelleme: Mart 2026",
    en: "Last updated: March 2026",
  },
  "privacy.intro.title": { tr: "1. Giriş", en: "1. Introduction" },
  "privacy.intro.desc": {
    tr: 'DevuApp ("biz", "bizim") olarak kişisel verilerinizin korunmasına önem veriyoruz. Bu Gizlilik Politikası, hizmetlerimizi kullandığınızda hangi verileri topladığımızı, nasıl kullandığımızı ve haklarınızı açıklar.',
    en: 'At DevuApp ("we", "our"), we care about the protection of your personal data. This Privacy Policy explains what data we collect when you use our services, how we use it, and your rights.',
  },
  "privacy.data.title": {
    tr: "2. Topladığımız Veriler",
    en: "2. Data We Collect",
  },
  "privacy.data.account.title": { tr: "Hesap Verileri", en: "Account Data" },
  "privacy.data.account.desc": {
    tr: "Ad, e-posta, şifre (şifrelenmiş), telefon, işletme kategorisi — hesabınızı oluşturmak ve yönetmek için.",
    en: "Name, email, password (encrypted), phone, business category — to create and manage your account.",
  },
  "privacy.data.client.title": { tr: "Müşteri Verileri", en: "Client Data" },
  "privacy.data.client.desc": {
    tr: "Müşteri adları, telefon numaraları, e-postalar, fotoğraflar, randevu geçmişi — işletmenizi yönetmeniz için sizin adınıza işliyoruz.",
    en: "Client names, phone numbers, emails, photos, appointment history — processed on your behalf to manage your business.",
  },
  "privacy.data.appointment.title": {
    tr: "Randevu Verileri",
    en: "Appointment Data",
  },
  "privacy.data.appointment.desc": {
    tr: "Tarih, saat, sure, mekan, uygulayıcı, durum — temel hizmet işlevselliği için.",
    en: "Date, time, duration, venue, practitioner, status — for core service functionality.",
  },
  "privacy.data.payment.title": { tr: "Ödeme Verileri", en: "Payment Data" },
  "privacy.data.payment.desc": {
    tr: "Tutarlar, vade tarihleri, ödeme durumu — ödeme takibi özelliği için.",
    en: "Amounts, due dates, payment status — for the payment tracking feature.",
  },
  "privacy.data.whatsapp.title": {
    tr: "WhatsApp Verileri",
    en: "WhatsApp Data",
  },
  "privacy.data.whatsapp.desc": {
    tr: "Telefon numaraları, mesaj şablonları, teslim durumu — hatırlatma göndermek için (yalnızca sizin yapılandırdığınızda).",
    en: "Phone numbers, message templates, delivery status — for sending reminders (only when configured by you).",
  },
  "privacy.use.title": {
    tr: "3. Verilerinizi Nasıl Kullanıyoruz",
    en: "3. How We Use Your Data",
  },
  "privacy.use.1": {
    tr: "Hizmeti sağlamak ve sürmek",
    en: "Providing and maintaining the service",
  },
  "privacy.use.2": {
    tr: "WhatsApp üzerinden randevu hatırlatmaları göndermek (yalnızca sizin yapılandırdığınızda)",
    en: "Sending appointment reminders via WhatsApp (only when configured by you)",
  },
  "privacy.use.3": {
    tr: "İşlem e-postaları göndermek (doğrulama, şifre sıfırlama)",
    en: "Sending transactional emails (verification, password reset)",
  },
  "privacy.use.4": {
    tr: "Toplulaştırılmış, anonim kullanım kalıplarına dayanarak ürünümüzü iyileştirmek",
    en: "Improving our product based on aggregated, anonymous usage patterns",
  },
  "privacy.use.nosell": {
    tr: "Verilerinizi üçüncü taraflara satmıyoruz. Verilerinizi reklam için kullanmıyoruz.",
    en: "We do not sell your data to third parties. We do not use your data for advertising.",
  },
  "privacy.third.title": {
    tr: "4. Üçüncü Taraf Hizmetleri",
    en: "4. Third-Party Services",
  },
  "privacy.third.service": { tr: "Hizmet", en: "Service" },
  "privacy.third.purpose": { tr: "Amac", en: "Purpose" },
  "privacy.third.shared": { tr: "Paylaşılan Veri", en: "Shared Data" },
  "privacy.third.mongo": {
    tr: "Veritabanı barındırma",
    en: "Database hosting",
  },
  "privacy.third.mongo.data": {
    tr: "Tüm uygulama verileri (durağan şifreli)",
    en: "All application data (encrypted at rest)",
  },
  "privacy.third.cloud": { tr: "Görsel depolama", en: "Image storage" },
  "privacy.third.cloud.data": {
    tr: "Müşteri fotoğrafları",
    en: "Client photos",
  },
  "privacy.third.meta": { tr: "Hatırlatma gönderme", en: "Sending reminders" },
  "privacy.third.meta.data": {
    tr: "Müşteri telefon numaraları, mesaj içeriği",
    en: "Client phone numbers, message content",
  },
  "privacy.third.google": { tr: "Takvim senkronizasyonu", en: "Calendar sync" },
  "privacy.third.google.data": {
    tr: "Randevu detayları",
    en: "Appointment details",
  },
  "privacy.third.resend": {
    tr: "İşlem e-postaları",
    en: "Transactional emails",
  },
  "privacy.third.resend.data": {
    tr: "E-posta adresleri",
    en: "Email addresses",
  },
  "privacy.security.title": {
    tr: "5. Veri Depolama ve Güvenlik",
    en: "5. Data Storage & Security",
  },
  "privacy.security.1": {
    tr: "Veriler MongoDB Atlas'ta depolanır (durağan şifreli, aktarımda TLS)",
    en: "Data is stored on MongoDB Atlas (encrypted at rest, TLS in transit)",
  },
  "privacy.security.2": {
    tr: "Şifreler bcrypt ile hashlenir (12 tuz turu)",
    en: "Passwords are hashed with bcrypt (12 salt rounds)",
  },
  "privacy.security.3": {
    tr: "Kimlik doğrulama için JWT tokenları (7 gün geçerlilik)",
    en: "JWT tokens for authentication (7-day validity)",
  },
  "privacy.security.4": {
    tr: "Tüm bağlantılarda HTTPS zorunlu",
    en: "HTTPS enforced on all connections",
  },
  "privacy.rights.title": {
    tr: "6. Haklarınız (KVKK / GDPR)",
    en: "6. Your Rights (KVKK / GDPR)",
  },
  "privacy.rights.1": {
    tr: "<strong>Erişim:</strong> Verilerinizin bir kopyasını talep edebilirsiniz",
    en: "<strong>Access:</strong> You can request a copy of your data",
  },
  "privacy.rights.2": {
    tr: "<strong>Düzeltme:</strong> Yanlıs verilerin düzeltilmesini talep edebilirsiniz",
    en: "<strong>Rectification:</strong> You can request correction of inaccurate data",
  },
  "privacy.rights.3": {
    tr: "<strong>Silme:</strong> Hesabınızın ve tüm ilişkili verilerin silinmesini talep edebilirsiniz",
    en: "<strong>Erasure:</strong> You can request deletion of your account and all associated data",
  },
  "privacy.rights.4": {
    tr: "<strong>Taşınabilirlik:</strong> Verilerinizi makine tarafından okunabilir formatta talep edebilirsiniz",
    en: "<strong>Portability:</strong> You can request your data in a machine-readable format",
  },
  "privacy.rights.5": {
    tr: "<strong>Geri Çekme:</strong> WhatsApp mesajlasma iznini istediğiniz zaman geri çekebilirsiniz (ayarlardan devre dışı bırakın)",
    en: "<strong>Withdrawal:</strong> You can withdraw WhatsApp messaging consent at any time (disable in settings)",
  },
  "privacy.retention.title": { tr: "7. Veri Saklama", en: "7. Data Retention" },
  "privacy.retention.1": {
    tr: "Aktif hesaplar: Hesap aktif olduğu surece saklanır",
    en: "Active accounts: Retained as long as the account is active",
  },
  "privacy.retention.2": {
    tr: "Silinen hesaplar: 30 gün içinde kalıcı olarak silinir",
    en: "Deleted accounts: Permanently deleted within 30 days",
  },
  "privacy.retention.3": {
    tr: "Arşivlenmiş kayıtlar: Hesap silinene kadar saklanır",
    en: "Archived records: Retained until account deletion",
  },
  "privacy.cookies.title": { tr: "8. Çerezler", en: "8. Cookies" },
  "privacy.cookies.desc": {
    tr: "Yalnızca temel cerezler kullanıyoruz:",
    en: "We only use essential cookies:",
  },
  "privacy.cookies.no": {
    tr: "Takip çerezi yok. Analitik çerezi yok. Üçüncü taraf çerezi yok.",
    en: "No tracking cookies. No analytics cookies. No third-party cookies.",
  },
  "privacy.changes.title": {
    tr: "9. Politika Değişiklikleri",
    en: "9. Policy Changes",
  },
  "privacy.changes.desc": {
    tr: "Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikler hakkında kayıtlı kullanıcıları e-posta yoluyla bilgilendiririz.",
    en: "We may update this policy from time to time. We will notify registered users of significant changes via email.",
  },
  "privacy.contact.title": { tr: "10. İletişim", en: "10. Contact" },
  "privacy.contact.desc": {
    tr: "Gizlilikle ilgili sorularınız için: <strong>destek@devuapp.com</strong>",
    en: "For privacy questions: <strong>[ENTER YOUR EMAIL ADDRESS]</strong>",
  },

  // ========== Terms & Conditions ==========
  "terms.title": { tr: "Kullanım Koşulları", en: "Terms & Conditions" },
  "terms.updated": {
    tr: "Son güncelleme: Mart 2026",
    en: "Last updated: March 2026",
  },
  "terms.accept.title": {
    tr: "1. Koşulların Kabulü",
    en: "1. Acceptance of Terms",
  },
  "terms.accept.desc": {
    tr: "DevuApp hizmetlerini kullanarak bu Kullanım Koşullarını kabul etmis sayılırsınız. Kabul etmiyorsanız, hizmeti kullanmayınız.",
    en: "By using DevuApp services, you agree to these Terms & Conditions. If you do not agree, do not use the service.",
  },
  "terms.service.title": {
    tr: "2. Hizmet Tanımı",
    en: "2. Service Description",
  },
  "terms.service.desc": {
    tr: "DevuApp, randevu ve müşteri yönetimi için tasarlanmıs bir bulut tabanlı yazılımdır (SaaS). Hizmet, randevu takvimleri, müşteri kayıtları, WhatsApp hatırlatmaları, ödeme takibi ve takvim senkronizasyonu içermektedir.",
    en: "DevuApp is a cloud-based software (SaaS) designed for appointment and client management. The service includes appointment calendars, client records, WhatsApp reminders, payment tracking, and calendar synchronization.",
  },
  "terms.account.title": {
    tr: "3. Hesap Oluşturma ve Sorumluluk",
    en: "3. Account Creation & Responsibility",
  },
  "terms.account.1": {
    tr: "Geçerli ve doğru bilgiler vererek hesap oluşturmanız gereklidir",
    en: "You must create an account with valid and accurate information",
  },
  "terms.account.2": {
    tr: "Hesap güvenliği (şifre, erişim) sizin sorumluluğunuzdadır",
    en: "Account security (password, access) is your responsibility",
  },
  "terms.account.3": {
    tr: "Hesabınız üzerinden gerçekleştirilen tüm işlemlerden siz sorumlusunuz",
    en: "You are responsible for all actions performed through your account",
  },
  "terms.account.4": {
    tr: "Hesabınıza yetkisiz erişim olduğunda bizi derhal bilgilendirmelisiniz",
    en: "You must immediately notify us of any unauthorized access to your account",
  },
  "terms.data.title": { tr: "4. Veri Sahipligi", en: "4. Data Ownership" },
  "terms.data.1": {
    tr: "<strong>Sizin Verileriniz:</strong> Hesabınıza girdiğiniz tüm veriler (müşteri kayıtları, randevular, ödeme bilgileri) size aittir",
    en: "<strong>Your Data:</strong> All data you enter into your account (client records, appointments, payment info) belongs to you",
  },
  "terms.data.2": {
    tr: "<strong>Lisans:</strong> Hizmeti sağlamak için verilerinizi isleme, depolama ve yedekleme lisansı verirsiniz",
    en: "<strong>License:</strong> You grant us a license to process, store, and back up your data to provide the service",
  },
  "terms.data.3": {
    tr: "<strong>Dışa Aktarım:</strong> Verilerinizi istediğiniz zaman dışa aktarabilirsiniz",
    en: "<strong>Export:</strong> You can export your data at any time",
  },
  "terms.data.4": {
    tr: "<strong>Silme:</strong> Hesabınızı sildiğinizde tüm verileriniz 30 gün içinde kalıcı olarak silinir",
    en: "<strong>Deletion:</strong> When you delete your account, all your data is permanently deleted within 30 days",
  },
  "terms.use.title": {
    tr: "5. Kabul Edilebilir Kullanım",
    en: "5. Acceptable Use",
  },
  "terms.use.intro": {
    tr: "Asagıdaki eylemleri gerçekleştirmemeyi kabul edersiniz:",
    en: "You agree not to:",
  },
  "terms.use.1": {
    tr: "Hizmeti yasa dışı amaçlarla kullanmak",
    en: "Use the service for illegal purposes",
  },
  "terms.use.2": {
    tr: "WhatsApp özelliğini spam veya toplu pazarlama için kullanmak",
    en: "Use the WhatsApp feature for spam or mass marketing",
  },
  "terms.use.3": {
    tr: "Hizmetin güvenliğini tehlikeye atacak eylemler gerceklestirmek",
    en: "Perform actions that compromise the security of the service",
  },
  "terms.use.4": {
    tr: "Diğer kullanıcıların hizmetten yararlanmasını engellemek",
    en: "Prevent other users from benefiting from the service",
  },
  "terms.use.5": {
    tr: "Otomatik yollarla (bot, scraper) hizmete erismeye çalışmak",
    en: "Attempt to access the service through automated means (bots, scrapers)",
  },
  "terms.whatsapp.title": {
    tr: "6. WhatsApp Entegrasyonu",
    en: "6. WhatsApp Integration",
  },
  "terms.whatsapp.1": {
    tr: "WhatsApp özelliği Meta (WhatsApp) Business API üzerinden çalışır ve Meta'nın kullanım politikalarına tabidir",
    en: "The WhatsApp feature operates via Meta (WhatsApp) Business API and is subject to Meta's usage policies",
  },
  "terms.whatsapp.2": {
    tr: "Mesaj gönderimi için gerekli izinleri almak sizin sorumluluğunuzdadır",
    en: "Obtaining required permissions for message sending is your responsibility",
  },
  "terms.whatsapp.3": {
    tr: "WhatsApp API maliyetleri (varsa) size aittir",
    en: "WhatsApp API costs (if any) are your responsibility",
  },
  "terms.whatsapp.4": {
    tr: "Meta'nın politika değişikliklerinden kaynaklanan hizmet kesintilerinden sorumluluk kabul etmiyoruz",
    en: "We are not responsible for service disruptions caused by Meta's policy changes",
  },
  "terms.avail.title": {
    tr: "7. Hizmet Sürekliliği",
    en: "7. Service Availability",
  },
  "terms.avail.1": {
    tr: "Hizmeti makul ölçüde sürekliliği saglamaya calısıyoruz (%99.9 hedefi)",
    en: "We strive to maintain reasonable uptime (99.9% target)",
  },
  "terms.avail.2": {
    tr: "Bakım, güncelleme veya mücbir sebepler nedeniyle kesinti yaşanabilir",
    en: "Interruptions may occur due to maintenance, updates, or force majeure",
  },
  "terms.avail.3": {
    tr: "Planlı bakım çalışmalarını önceden bildirmeye calısıyoruz",
    en: "We will try to announce planned maintenance in advance",
  },
  "terms.payment.title": { tr: "8. Ücretlendirme", en: "8. Priçing" },
  "terms.payment.desc": {
    tr: "DevuApp şu anda ücretsiz olarak sunulmaktadır. Gelecekte ücretli planlar sunulduğunda, mevcut kullanıcılara makul bir geçiş suresi sağlanacak ve fiyatlandırma değişiklikleri önceden bildirilecektir.",
    en: "DevuApp is currently offered free of charge. When paid plans are introduced in the future, existing users will be given a reasonable transition period and priçing changes will be announced in advance.",
  },
  "terms.payment.note": {
    tr: "Not: Fiyatlandırma planları henüz belirlenmemiştir. Bu bölüm, planlar açıklandığında guncellenecektir.",
    en: "Note: Priçing plans have not been finalized yet. This section will be updated when plans are announced.",
  },
  "terms.liability.title": {
    tr: "9. Sorumluluk Sınırlamaları",
    en: "9. Limitation of Liability",
  },
  "terms.liability.1": {
    tr: 'Hizmet "olduğu gibi" sunulmaktadır. Kesintisiz veya hatasız çalışma garantisi verilmez',
    en: 'The service is provided "as is". No guarantee of uninterrupted or error-free operation',
  },
  "terms.liability.2": {
    tr: "Veri kaybı, is kaybı veya dolaylı zararlardan sorumluluk kabul etmiyoruz",
    en: "We do not accept liability for data loss, business loss, or indirect damages",
  },
  "terms.liability.3": {
    tr: "Üçüncü taraf hizmetlerinin (WhatsApp, Google, Cloudinary) arızalarından sorumluluk kabul etmiyoruz",
    en: "We do not accept liability for failures of third-party services (WhatsApp, Google, Cloudinary)",
  },
  "terms.term.title": {
    tr: "10. Hesap Askıya Alma ve Fesih",
    en: "10. Suspension & Termination",
  },
  "terms.term.1": {
    tr: "Kullanım koşullarını ihlal etmeniz durumunda hesabınızı askıya alabilir veya sonlandırabiliriz",
    en: "We may suspend or terminate your account if you violate these terms",
  },
  "terms.term.2": {
    tr: "Hesabınızı istediğiniz zaman silebilirsiniz",
    en: "You can delete your account at any time",
  },
  "terms.term.3": {
    tr: "Fesih durumunda verilerinizi 30 gün boyunca dışa aktarmanıza izin verilir",
    en: "Upon termination, you are allowed to export your data for 30 days",
  },
  "terms.law.title": { tr: "11. Uygulanacak Hukuk", en: "11. Governing Law" },
  "terms.law.desc": {
    tr: "Bu kosullar Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıklar İstanbul mahkemeleri ve icra dairelerinde çözümlenecektir.",
    en: "These terms are governed by the laws of the Republic of Turkey. Disputes shall be resolved in İstanbul courts.",
  },
  "terms.changes.title": {
    tr: "12. Kosul Değişiklikleri",
    en: "12. Changes to Terms",
  },
  "terms.changes.desc": {
    tr: "Bu koşulları zaman zaman güncelleyebiliriz. Önemli değişiklikler en az 30 gün önce bildirilir. Değişikliklerden sonra hizmeti kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.",
    en: "We may update these terms from time to time. Significant changes will be notified at least 30 days in advance. Continuing to use the service after changes means you accept the new terms.",
  },
  "terms.contact.title": { tr: "13. İletişim", en: "13. Contact" },
  "terms.contact.desc": {
    tr: "Kullanım koşullarıyla ilgili sorularınız için: <strong>destek@devuapp.com</strong>",
    en: "For questions about these terms: <strong>[ENTER YOUR EMAIL ADDRESS]</strong>",
  },
};

// ---------- Language ----------
let currentLang = localStorage.getItem("devu_language") || "tr";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("devu_language", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const t = TRANSLATIONS[key];
    if (t && t[lang]) {
      el.innerHTML = t[lang];
    }
  });

  // Update lang toggle buttons
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.textContent = lang === "tr" ? "EN" : "TR";
  });
}

function toggleLanguage() {
  applyLanguage(currentLang === "tr" ? "en" : "tr");
}

// ---------- Scroll reveal ----------
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".lp-reveal").forEach((el) => observer.observe(el));
}

// ---------- Nav scroll effect ----------
function initNavScroll() {
  const nav = document.querySelector(".lp-nav");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------- Smooth scroll for anchor links ----------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// ---------- Mobile menu ----------
function initMobileMenu() {
  const hamburger = document.querySelector(".lp-nav__hamburger");
  const menu = document.querySelector(".lp-mobile-menu");
  const close = document.querySelector(".lp-mobile-menu__close");
  const overlay = menu;

  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", () => menu.classList.add("is-open"));
  close?.addEventListener("click", closeMobileMenu);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeMobileMenu();
  });

  // Close on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

function closeMobileMenu() {
  document.querySelector(".lp-mobile-menu")?.classList.remove("is-open");
}

// ---------- Init ----------
export function init() {
  applyLanguage(currentLang);
  initScrollReveal();
  initNavScroll();
  initSmoothScroll();
  initMobileMenu();

  // Bind all lang toggle buttons
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", toggleLanguage);
  });
}

// Auto-init when loaded directly (not as module by landing page)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
