##gitCommant

**初始化设置**
***

     $ git config --global user.name "lihuangsuo"
     $ git config --global user.email lihuangsuo@126.com

**设置命令别名**
***
*//系统管理员权限设置*

     $ sudo git config --system alias.st status
     $ sudo git config --system alias.cl commit
     $ sudo git config --system alias.co checkout
     $ sudo git confit --system alias.br branch

*//本用户全局配置*

     $git config --global alias.st status
     $git config --global alias.ci commit
     $git config --global alias.co checkout
     $git config --global alias.br branch

**git命令输出中开启颜色显示**
***
     $git config --global color.ui true

**git版本库初始化**
***
     $git init

**创建文件**
***
     $echo "hello." >welcome.txt


**克隆项目**
***
     $git clone http://

**新文件添加到版本库**
***
     $git add welocme.txt
     $git add .

**提交到本地版本库**
***
     $git commit -m "注释"

**提交到服务器master分支**
***
     $git push origin master

**状态**
***
     $git status

**移除文件**
***
     $git rm tem.txt

**更新远程分支master到本地**
***
     $git pull origin master

**取消本地修改**
***
     $git checkout. //撤销没有缓存的修改
     $git checkout directive//切换到分支directive
     $git checkout -d directive//创建directive分支并切换directive分支

**创建分支**
***
     $git branch//列出所有分支
     $git branch directive //创建一个新分支但并不切换
     $git branch -r//列出所有的远程分枝，"-r"是remote的意思
     $git branch -a//列出所有的本地分枝和远程分枝
     $git branch -d directive//删除本地directive分支，分枝的所有commits没有全部合*并回它fork出来的分枝，则删除失败*
     $git branch -D directive//强行删除本地directive分支，
     $git branch -m branch1 branch2//将分枝branch1的名字改成branch2
     $git push origin :directive//删除远程分枝directive，冒号前面的空格不能少，原理是把一个空分支push到server上，相当于删除该分支

**文件比较**
***
     $git diff

**撤销commit**
***
     $git log  //git log --pretty=oneline
     $git log --oneline //打印日志，--oneline 缩略格式输出
     $git log -p//命令来显示每一次提交与其父节点提交内容之间快照的差异
     $git reset --hard <commit_id> //返回到某个节点，不保留修改。
     $git reset --soft <commit_id> //返回到某个节点。保留修改
     $git push origin HEAD --force
     $git fetch --all//只是下载远程的库的内容，不做任何的合并
     $git reset --hard origin/master//把HEAD指向刚刚下载的最新的版本
     //重写历史
     $git commit --amend //改变最近一次提交
     $git rebase -i HEAD~8//合并8个commit
     /*
     pick f7f3f6d
     squash 310154e
     squash a5f4a0d
     :wq保存退出
     */

**缓存修改**
***

     $git stash  //对当前的暂存区和工作区状态进行保存。
     $git stash list  //列出所有保存的进度列表。
     $git stash pop [--index] [<stash>] //恢复工作进度
        /*--index 参数：不仅恢复工作区，还恢复暂存区
        <stash> 指定恢复某一个具体进度。如果没有这个参数，默认恢复最新进度
        如：以下命令恢复编号为0的进度的工作区和暂存区
        # git stash pop --index stash@{0}*/
     $git stash apply stash@{1}//切换到对应的缓存,但不恢复暂存区
     $git stash clear  //清空Git栈。此时使用gitg等图形化工具会发现，原来stash的哪些节点都消失了。
     $git stash drop stash@{1}// 清除指定的
