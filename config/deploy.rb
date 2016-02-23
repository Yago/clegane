# config valid only for Capistrano 3.1
lock '3.2.1'

set :user, 'root'
set :host, '37.139.9.168'
set :home, '/root'
set :configfile, 'application.php'

role :app, %w{root@37.139.9.168}
role :web, %w{root@37.139.9.168}
role :db,  %w{root@37.139.9.168}

server '37.139.9.168'
set :tmp_dir, "/root/tmp"

set :repo_url, 'git@github.com:Yago/clegane.git'

set :deploy_via, :remote_cache
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules"]
set :scm, :git
set :use_sudo, false
set :log_level, :info

set :keep_releases, 5

namespace :app do
  task :env do
    on roles(:web) do
      execute "cp #{shared_path}/.env #{current_path}/.env"
    end
  end
  task :dep do
    on roles(:web) do
      execute "cp #{current_path}/package.json #{shared_path}/package.json"
      execute "cd #{shared_path} && npm set progress=false && npm install"
      execute "ln -s #{shared_path}/node_modules #{current_path}/node_modules"
    end
  end
  task :build do
    on roles(:web) do
      execute "cd #{current_path} && ./node_modules/.bin/gulp --production"
    end
  end

  task :start do
    on roles(:app), in: :sequence, wait: 5 do
      execute "forever stopall"
      execute "forever --spinSleepTime 10000 --minUptime 1000 start #{current_path.join('server.js')}"
    end
  end
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "forever stopall"
      execute "forever restart #{current_path.join('server.js')}"
    end
  end
  task :stop do
    on roles(:app), in: :sequence, wait: 5 do
      execute "forever stopall"
    end
  end
end
before "deploy:publishing", "app:env"
after "app:env", "app:dep"
after "app:dep", "app:build"
after "app:build", "app:start"

