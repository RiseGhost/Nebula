dir=../users_dir
newroot=$dir/$1
mkdir $dir/$1
mkdir -p $newroot/proc
mkdir -p $newroot/bin
mkdir -p $newroot/lib
mkdir -p $newroot/lib64
sudo debootstrap buster $newroot