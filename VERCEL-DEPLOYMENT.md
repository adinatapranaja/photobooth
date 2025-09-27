This project was prepared for deployment to Vercel without changing existing app files.

What I added:
- `vercel.json` to route `/save.php` to a serverless function
- `api/save.js` implementing the same save logic as `save.php`, saving to `/tmp/photos` on Vercel (ephemeral)

Important notes:
- Vercel's filesystem is ephemeral. Files written to `/tmp` are available during the function's lifetime but won't persist long-term. For production you should use an external storage (S3, Cloud Storage) and update `save.php` or client calls to point there.
- I intentionally didn't modify your existing `index.php`, `capture.js`, or `save.php`. The client will continue to POST to `/save.php` and Vercel will route it to `api/save.js`.

How to deploy:
1. Install Vercel CLI (optional) and login:
   brew install vercel || npm i -g vercel
   vercel login
2. From project root run:
   vercel --prod

What to test after deploy:
- Open the deployed URL and verify the UI loads.
- Take a photo, generate a collage, and click "Save to Server". The app will show a URL pointing to `tmp/photos/...` (ephemeral).

Next steps (recommended):
- Replace ephemeral storage with S3 or another provider and update `api/save.js` to upload there.
- Add a route to serve files from S3 or use signed URLs.
