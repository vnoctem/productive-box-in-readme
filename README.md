<p align="center">
  <img width="500" alt="poster" src="https://user-images.githubusercontent.com/63318084/151737557-937925c2-de07-4084-923e-cd2776e61a58.png">
  <h3 align="center">📌✨productive-box-in-readme</h3>
  <h4 align="center">(fork of https://github.com/maxam2017/productive-box)</h4>
</p>
<p align="center">
   <img src="https://img.shields.io/badge/language-typescript-blue?style"/>
   <img src="https://img.shields.io/github/license/vnoctem/productive-box-in-readme"/>
   <img src="https://img.shields.io/github/stars/vnoctem/productive-box-in-readme"/>
   <img src="https://img.shields.io/github/forks/vnoctem/productive-box-in-readme"/>
</p>

<p align="center">
   Are you an early 🐤 or a night 🦉?
   <br/>
   When are you most productive during the day?
   <br/>
   Let's check out in your profile README!
</p>

---

## Overview
This project uses GitHub graphQL API to get the commit histories and write into the gist by [rest.js](https://github.com/octokit/rest.js#readme)

## Setup

### Prep work
Create a token with the `repo` scope and copy it. (https://github.com/settings/tokens/new)
 > enable `repo` scope seems **DANGEROUS**<br/>
 > but this GitHub Action only accesses your commit timestamp in repository you contributed.

### Project setup

1. Fork this repo
1. Open the "Actions" tab of your fork and click the "enable" button
1. Edit the [environment variables](https://github.com/vnoctem/productive-box-in-readme/blob/main/.github/workflows/schedule.yml#L16-L18) in `.github/workflows/schedule.yml`:

   - **TIMEZONE:** The timezone of your location, eg. `Asia/Taipei` for Taiwan, `America/New_York` for New York in America, etc.
   - **OWNER_REPO:** Your GitHub username.
   - **PATH:** Path to your README file (default is `README.md`; should not need to be changed).

1. Go to the repo **Settings > Secrets**
1. Add the following environment variables:
   - **GH_TOKEN:** The GitHub token generated above.
