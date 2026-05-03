# devu Landing Video Recording Guide

Use fake demo data only. Do not record real business or client data.

## Files

Place final compressed videos in `landing/public/media/` with these exact names:

- `hero-today.mp4`
- `calendar-flow.mp4`
- `client-profile.mp4`
- `whatsapp-reminders.mp4`

The landing page already has fallback mockups, so it will work before these files exist.

## Demo Account Setup

Use a polished appointment-based service business scenario:

- Business: `Nişantaşı Studio`
- Practitioners: `Deniz Arslan`, `Mert Kaya`, `Elif Demir`
- Clients: `Ayşe Koç`, `Emre Arslan`, `Selin Aydın`, `Burak Şahin`
- Example causes: `Cilt bakımı`, `Fizyoterapi`, `Danışmanlık`, `Saç bakımı`
- Include at least one client alert: `Hassas cilt notu var`
- Include WhatsApp states: sent, pending, confirmed

## Demo Time Override

For web Today recordings, you can make the app behave as if the current time is
09:00 without changing your computer clock. Open the browser console on the web
app and run:

```js
localStorage.setItem('devu_demo_now', '2026-05-02T09:00:00+03:00');
location.reload();
```

Clear the override after recording:

```js
localStorage.removeItem('devu_demo_now');
location.reload();
```

The override is enabled only in local development unless
`VITE_ENABLE_DEMO_TIME=true` is set for a deployed demo build.

## Clips

Keep every clip short, calm, and deliberate. Aim for 8-12 seconds.

### `hero-today.mp4`

Show the Today operations flow:

1. Open Today.
2. Show a past-due or needs-attention appointment.
3. Tap call or WhatsApp.
4. Mark the appointment as attending or completed.

### `calendar-flow.mp4`

Show scheduling clarity:

1. Open Calendar.
2. Switch month/day if useful.
3. Open filters.
4. Filter by practitioner or status.

### `client-profile.mp4`

Show client context:

1. Open a client profile.
2. Show alert, notes, photos, and appointment history.
3. Switch between profile tabs.

### `whatsapp-reminders.mp4`

Show reminder confidence:

1. Open WhatsApp or an appointment detail with reminders.
2. Show sent/pending reminder state.
3. Show a message/history detail if available.

## Export Settings

- Desktop crop: 1440 x 1000 or 1600 x 1000.
- Mobile crop: 430 x 932 for optional future phone-specific videos.
- Format: MP4, H.264.
- Audio: none.
- Autoplay-safe: videos must be muted.
- Target size: under 6 MB per file when possible.

Recommended tools:

- Screen Studio for polished cursor and zoom.
- CleanShot X for fast Mac recordings.
- QuickTime Player for simple free recording.
- iOS Simulator command for mobile:

```bash
xcrun simctl io booted recordVideo demo.mov
```

Stop recording with `Ctrl+C`.
