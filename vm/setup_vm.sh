echo "Install utils"
sudo apt-get -y update
sudo apt-get -y install tree
sudo apt -y install docker.io

sudo systemctl start docker
sudo systemctl enable docker

source ~/.bashrc

# echo "Install Anaconda"
# anaconda_url=https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
# cd /tmp
# curl -O $anaconda_url
#sudo bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda
# bash Miniconda3-latest-Linux-x86_64.sh

#Altera owner da pasta, apenas se a instalação for feita pelo sudo
#sudo chown -R 1001:1002 $HOME/.conda
