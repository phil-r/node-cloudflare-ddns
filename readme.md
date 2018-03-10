cloudflare-ddns
===============

## Installation

First, make sure you have `node >= 8` and `npm` installed.

To install run

```sh
npm install -g @phil-r/cloudflare-ddns
```

## Usage

following environment variables are required to run:

`CF_KEY` - your cloudflare API key, you can get one [here](https://www.cloudflare.com/a/profile)

`CF_EMAIL` - your cloudflare account email

`ZONE` - domain/website you want to run updates for (e.g. `example.com`)

`SUBDOMAIN` - subdomain/CNAME you want to run updates for

`PROXIED` - whether it should be proxied or not (orange cloud in cloudflare DNS settings)

Example command can look like:

```sh
CF_EMAIL=john@example.com \
CF_KEY=11116x635034x27x111170006x465f1111xxxa \
ZONE=example.com \
SUBDOMAIN=www \
PROXIED=false \
cloudflare-ddns
```
