# Cloudflare R2 Custom Subdomain Setup Guide

This guide outlines the steps to connect your custom subdomain `images.yetgalore.co.zw` to your Cloudflare R2 bucket (`yet-galore`) while keeping your primary hosting on Vercel's Free (Hobby) tier.

---

## Current Status
* **Main Website**: Hosted on Vercel (`yetgalore.co.zw` / `www.yetgalore.co.zw`).
* **Storage Bucket**: Cloudflare R2 (`yet-galore`).
* **Subdomain Goal**: `images.yetgalore.co.zw` pointing directly to R2 instead of Vercel.
* **DNS Provider**: Migrating from Vercel DNS to Cloudflare DNS.
* **Environment Variables**: Updated in `.env` to:
  ```env
  NEXT_PUBLIC_R2_PUBLIC_URL="https://images.yetgalore.co.zw"
  ```

---

## Step-by-Step Instructions

### Step 1: Add Domain to Cloudflare
1. Log in to [Cloudflare](https://dash.cloudflare.com/).
2. Click **Add a site** or **+ Add** on your account home.
3. Enter your domain: `yetgalore.co.zw` and select the **Free** plan.
4. Cloudflare will automatically scan and import your existing DNS records from Vercel.

### Step 2: Clean up DNS Records in Cloudflare
During the DNS review step on Cloudflare:
1. Scroll down to the list of imported records.
2. Locate the record named **`images`** (this is the old Vercel A record pointing to `76.76.21.21`).
3. **Delete this `images` record** (we need this subdomain clear so R2 can bind to it).
4. Verify that your root (`@`) and `www` records point to Vercel (e.g. `76.76.21.21` or `cname.vercel-dns.com`).
5. Click **Continue**.

### Step 3: Change Nameservers at your Domain Registrar (WebZim)
To give Cloudflare control over the DNS directory (while keeping your hosting on Vercel):
1. Log in to your registrar [WebZim](https://portal.webzim.co.zw/).
2. Go to **Domains** > **My Domains**.
3. Click the **wrench icon** (or **Manage Domain**) next to `yetgalore.co.zw`.
4. In the left sidebar under *Manage*, click **Nameservers**.
5. Select **Use custom nameservers** and enter the two nameservers provided by Cloudflare:
   * **`anuj.ns.cloudflare.com`**
   * **`evangeline.ns.cloudflare.com`**
6. Click **Change Nameservers** to save.

> [!NOTE]
> DNS propagation can take anywhere from a few minutes up to 24 hours (usually within an hour). Cloudflare will email you once the domain activation is complete.

### Step 4: Connect the Subdomain to R2
Once Cloudflare confirms your site is active:
1. In your Cloudflare dashboard, go to **R2** > **Overview**.
2. Click on your bucket: `yet-galore`.
3. Go to the **Settings** tab.
4. Scroll down to **Public Access** > **Custom Domains** and click **Connect Domain**.
5. Type `images.yetgalore.co.zw` and click **Continue**.
6. Cloudflare will automatically handle the DNS record generation and SSL certificate provisioning for your subdomain.

---

## How it Works After Setup
* **Pushing Code**: Your workflow is untouched. Pushing code to GitHub will still trigger automatic Vercel builds and updates.
* **Main Website**: Visitors going to `yetgalore.co.zw` are directed by Cloudflare to Vercel's servers.
* **Images & Assets**: Any image URL starting with `https://images.yetgalore.co.zw` goes directly to your Cloudflare R2 bucket.
