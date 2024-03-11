dir=./users_dir
newroot=$dir/$1
sudo mkdir $dir/$1
sudo mkdir -p $newroot/proc
sudo mkdir -p $newroot/bin
sudo mkdir -p $newroot/lib
sudo mkdir -p $newroot/lib64
sudo debootstrap buster $newroot