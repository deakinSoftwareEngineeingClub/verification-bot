# Discord Verification Bot  
**Verifies Club Membership Automatically**

---

## Overview
This Discord Verification Bot is an open-source project designed to automatically verify student club members using data stored in a connected database. It streamlines the onboarding process by checking membership details such as **Full Name** and **Student ID** securely and efficiently via discord's modals.

---

## Setup

### Setup Discord Bot Profile on Discord Developers

Note: This setup assumes that you have already either installed docker and/or have knowledge with javascript. 
	  To contribute, you need to create your own Discord Bot profile and test it yourself in another server.

1. Open [Discord Developers](https://discord.com/developers) and click on "Get Started"
2. Create a New Application, with any name you like
3. Navigate to `Bot` on the left sidebar
   - Note down the `Token`, the code of your bot will require it.
   - Enable the Intent `Message Content`
     - This is required by Discord to ensure popular discord bots do not scrape server message contents without permission.
4. Generate a Discord Bot URL:
   1. Navigate to `OAuth2` on the left sidebar
   2. Scroll down to `OAuth2 URL Generator`
   3. Under Scopes, select `bot`
   4. Scroll down to `Bot Permissions`
   5. Select permissions, or later override it in the invite link.
     - Verification Bot's Permission integer is `139855219776`.
   6. Copy the Generated URL, and invite your bot to your Discord server.

    OR 
    1. `https://discord.com/oauth2/authorize?client_id=DISCORD_BOT_ID&permissions=139855219776&integration_type=0&scope=bot`

### Setup Discord Bot on your machine

Javascript with Nodejs
1. Navigate to directory on your machine
2. `git clone https://github.com/deakinSoftwareEngineeingClub/verification-bot`

(Inside of src/ directory do the following.)
4. Create `.env` file according to `.env.example` inside of src/ directory
  - You can ask the committee (or Milad) for the environment variables on Discord.
4. Run ``` npm install ``` then ``` npm install @supabase/supabase-js discord.js ```
5. Run ```node deploy-commands.js``` to deploy/refresh commands
6. Run ```node index.js```  to run the bot. Then your done!

Or Use Docker
1. Make sure Docker engine is running.
   - On Windows, open Docker Desktop.
   - On debian, run ```sudo systemctl start docker``` in terminal to start docker.
2. Run the following commands inside of verification-bot/ directory
```
docker compose build
docker compose up -d
docker compose logs -f bot
```

## Rules

### General Rules
- Follow DSEC Server Rules
- Follow Deakin Code of Conduct
- Follow Discord Terms of Services

### Programming Rules
- Do not test in Production
- Do not write malicious code (unless you have obtained permission for white hat hacking)
- Do not spam pull requests
- Do not add your own code formatter, affecting the whole files you edit


---

## Dependencies
- SupaBase-js
		```
			npm install @supabase/supabase-js
		```
- Discord.js
		```
			npm install discord.js
		```
		
## Credits

* Helped with development advice and repository structure : [RythonDev] (https://github.com/liyunze-coding)
