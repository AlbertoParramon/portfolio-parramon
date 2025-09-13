# PortfolioParramon

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


