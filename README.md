<p align="center">
  <a href="http://lovera.maxam.now.sh/">
    <img src="https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png" alt="screenshot" width="500">
  </a>
  <h3 align="center">📌✨productive-box-in-readme (fork of https://github.com/maxam2017/productive-box)</h3>
</p>
<p align="center">
   <img src="https://img.shields.io/badge/language-typescript-blue?style"/>
   <img src="https://img.shields.io/github/license/maxam2017/productive-box"/>
   <img src="https://img.shields.io/github/stars/maxam2017/productive-box"/>
   <img src="https://img.shields.io/github/forks/maxam2017/productive-box"/>
</p>

<p align="center">
   Are you an early 🐤 or a night 🦉?
   <br/>
   When are you most productive during the day?
   <br/>
   Let's check out in your profile README!
</p>

---

> This project is inspired by an awesome pinned-gist project.<br/>Find more in https://github.com/matchai/awesome-pinned-gists

## Overview
This project uses GitHub graphQL API to get the commit histories and write into the gist by [rest.js](https://github.com/octokit/rest.js#readme)

## Setup

### Prep work
1. Create a token with the `repo` scope and copy it. (https://github.com/settings/tokens/new)
   > enable `repo` scope seems **DANGEROUS**<br/>
   > but this GitHub Action only accesses your commit timestamp in repository you contributed.

### Project setup

1. Fork this repo
1. Open the "Actions" tab of your fork and click the "enable" button
1. Edit the [environment variable](https://github.com/maxam2017/productive-box/blob/master/.github/workflows/schedule.yml#L17-L18) in `.github/workflows/schedule.yml`:

   - **TIMEZONE:** The timezone of your location, eg. `Asia/Taipei` for Taiwan, `America/New_York` for America in New York, etc.
   - **OWNER_REPO:** Your GitHub username.
   - **PATH:** Path to your README file (default is `README.md`; should not need to be changed).

1. Go to the repo **Settings > Secrets**
1. Add the following environment variables:
   - **GH_TOKEN:** The GitHub token generated above.
