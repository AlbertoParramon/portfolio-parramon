# PortfolioParramon
This is a configurable porfolio web. 
Example: https://portfolio-albertoparramon.netlify.app/

## Preview
<img width="1846" height="925" alt="screenshot1" src="https://github.com/user-attachments/assets/d097c067-30e0-4aa2-8d59-240572b4563b" />

<img width="850" height="928" alt="screenshot2" src="https://github.com/user-attachments/assets/5308b890-2472-48bd-a8f1-9f971c0b61c4" />


## Dependencies
```bash
# NodeJS
nvm install node
nvm install 24.5.0
nvm use 24.5.0

# Angular
npm install -g @angular/cli

# pnpm (better than npm)
npm install -g pnpm
```

## How to use it:
```bash
# 1. Clone the repository. For example:
WORK_DIR=~/Documentos/PORTFOLIO
cd $WORK_DIR
git clone git@github.com:AlbertoParramon/portfolio-parramon.git 
cd portfolio-parramon

# 2. Use the NodeJS version needed
nvm use node  #or v24.5.0

# 3. Launch the project
pnpm install # first time you launch it
./start_project.sh AlbertoParramon
```

Now you can change the directory src/assets/AlbertoParramon for your own directory (For example: PepitoGrillo) with your own config and launch it with
```bash
./start_project.sh PepitoGrillo
```


